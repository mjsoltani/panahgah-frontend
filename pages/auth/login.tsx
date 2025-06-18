import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAuth } from '../../lib/auth-context';
import { LoginData } from '../../api/auth';
import SpinnerButton from '../../components/SpinnerButton';
import dynamic from 'next/dynamic';

// لود پویای کامپوننت نقشه برای جلوگیری از خطای SSR
const LocationPickerMap = dynamic(
  () => import('../../components/Map/LocationPickerMap'),
  { ssr: false }
);

// استایل‌های کامپوننت‌ها
const MainContainer = styled.div`
  padding: 3rem 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-8);
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-6) var(--spacing-4);
  }
`;

const PageTitle = styled.h1`
  color: var(--color-primary);
  margin-bottom: var(--spacing-6);
  font-size: var(--font-size-2xl);
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-4);
  text-align: right;
  
  label {
    display: block;
    margin-bottom: var(--spacing-2);
    font-weight: 500;
    color: var(--color-gray-700);
  }
  
  input {
    width: 100%;
    padding: var(--spacing-3);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: var(--font-size-base);
    transition: all var(--transition-normal);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  margin-top: var(--spacing-6);
`;

const RegisterLink = styled.div`
  margin-top: var(--spacing-6);
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  
  a {
    color: var(--color-primary);
    font-weight: 500;
    margin-right: var(--spacing-1);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(var(--color-danger-rgb), 0.1);
  color: var(--color-danger);
  padding: var(--spacing-3);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
`;

const SuccessMessage = styled.div`
  background-color: rgba(var(--color-success-rgb), 0.1);
  color: var(--color-success);
  padding: var(--spacing-3);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  .success-icon {
    font-size: 1.2rem;
  }
`;

const LocationTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-gray-800);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-2);
  text-align: right;
`;

const LocationDescription = styled.p`
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  text-align: right;
`;

const LocationHelper = styled.div`
  margin-top: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  text-align: right;
  
  a {
    display: inline-flex;
    align-items: center;
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
    
    .helper-icon {
      margin-left: var(--spacing-1);
      font-size: 1.2rem;
    }
  }
`;

const LocationStatusContainer = styled.div`
  margin-bottom: var(--spacing-4);
`;

const LocationStatus = styled.div<{ success?: boolean; error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  background-color: ${props => 
    props.success ? 'rgba(16, 185, 129, 0.1)' : 
    props.error ? 'rgba(255, 23, 68, 0.1)' : 
    'rgba(59, 130, 246, 0.1)'
  };
  color: ${props => 
    props.success ? 'var(--color-success)' : 
    props.error ? 'var(--color-danger)' : 
    'var(--color-primary)'
  };
  
  .icon {
    font-size: 1.2rem;
    
    &.loading {
      animation: spin 1.5s linear infinite;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RetryButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  text-decoration: underline;
  
  &:hover {
    color: var(--color-primary-dark);
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    full_name: '',
    phone_number: '',
    lat: '',
    lng: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string>('');
  const [locationSuccess, setLocationSuccess] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    detectLocation();
  }, []);
  
  const detectLocation = () => {
    setIsLocationLoading(true);
    setLocationError('');
    setLocationSuccess(false);
    setShowMap(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({ ...prev, lat: String(latitude), lng: String(longitude) }));
          setInitialPosition([latitude, longitude]);
          setLocationSuccess(true);
          setIsLocationLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError('اجازه دسترسی به موقعیت مکانی داده نشد.');
          setIsLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
      setIsLocationLoading(false);
    }
  };
  
  const handleLocationSelect = (lat: string, lng: string) => {
    setFormData(prev => ({ ...prev, lat, lng }));
    setLocationSuccess(true);
    setShowMap(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData);
      
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>ورود به حساب کاربری - پناهگاه</title>
        <meta name="description" content="وارد حساب کاربری خود در پناهگاه شوید" />
      </Head>
      
      <MainContainer>
        <div className="container">
          <AuthCard>
            <PageTitle>ورود به حساب</PageTitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <SuccessMessage>
                <span className="material-symbols-rounded success-icon">check_circle</span>
                ورود با موفقیت انجام شد! در حال انتقال...
              </SuccessMessage>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="full_name">نام و نام خانوادگی</label>
                <input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone_number">شماره تلفن همراه</label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="مثال: 09123456789"
                  required
                />
              </FormGroup>
              
              <LocationTitle>موقعیت مکانی</LocationTitle>
              <LocationDescription>
                برای نمایش منابع نزدیک به شما، لطفاً موقعیت مکانی خود را مشخص کنید.
              </LocationDescription>
              
              <LocationStatusContainer>
                {isLocationLoading && (
                  <LocationStatus>
                    <span className="material-symbols-rounded icon loading">sync</span>
                    در حال دریافت موقعیت مکانی...
                  </LocationStatus>
                )}
                
                {locationError && !isLocationLoading && (
                  <LocationStatus error>
                    <span className="material-symbols-rounded icon">error</span>
                    {locationError}
                    <RetryButton onClick={detectLocation}>تلاش مجدد</RetryButton>
                  </LocationStatus>
                )}
                
                {locationSuccess && !isLocationLoading && !showMap && (
                  <LocationStatus success>
                    <span className="material-symbols-rounded icon">check_circle</span>
                    موقعیت مکانی با موفقیت ثبت شد.
                  </LocationStatus>
                )}
              </LocationStatusContainer>
              
              {!isLocationLoading && !showMap && (
                <LocationHelper>
                  <a href="#" onClick={(e) => { e.preventDefault(); detectLocation(); }}>
                    <span className="material-symbols-rounded helper-icon">my_location</span>
                    تشخیص خودکار موقعیت
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowMap(true); }} style={{marginRight: '1rem'}}>
                    <span className="material-symbols-rounded helper-icon">map</span>
                    انتخاب موقعیت روی نقشه
                  </a>
                </LocationHelper>
              )}
              
              {showMap && (
                <LocationPickerMap onLocationSelect={handleLocationSelect} initialPosition={initialPosition} />
              )}
              
              <FormGrid>
                <FormGroup>
                  <label htmlFor="lat">عرض جغرافیایی</label>
                  <input
                    id="lat"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    placeholder="عرض جغرافیایی"
                    readOnly
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="lng">طول جغرافیایی</label>
                  <input
                    id="lng"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    placeholder="طول جغرافیایی"
                    readOnly
                  />
                </FormGroup>
              </FormGrid>
              
              <ButtonContainer>
                <SpinnerButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading || isLocationLoading || !locationSuccess}
                >
                  ورود به حساب کاربری
                </SpinnerButton>
              </ButtonContainer>
            </form>
            
            <RegisterLink>
              حساب کاربری ندارید؟
              <Link href="/auth/register">ثبت‌نام کنید</Link>
            </RegisterLink>
          </AuthCard>
        </div>
      </MainContainer>
    </>
  );
};

export default LoginPage; 