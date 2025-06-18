import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { registerUser, RegisterData, checkAuth } from '../../api/auth';
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
  max-width: 600px;
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
  text-align: center;
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
  
  input, select {
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
`;

const ButtonContainer = styled.div`
  margin-top: var(--spacing-6);
  text-align: center;
`;

const LoginLink = styled.div`
  margin-top: var(--spacing-6);
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  text-align: center;
  
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

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-6);
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

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    full_name: '',
    phone_number: '',
    city: '',
    age: '',
    gender: 'male',
    lat: '',
    lng: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error' | 'manual' | null>(null);
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>(null);
  
  // اگر کاربر قبلاً وارد شده باشد، به صفحه اصلی هدایت می‌شود
  useEffect(() => {
    const user = checkAuth();
    if (user) {
      router.push('/');
    }
  }, [router]);
  
  // دریافت موقعیت مکانی کاربر
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setFormData(prev => ({
            ...prev,
            lat: lat.toString(),
            lng: lng.toString()
          }));
          setInitialPosition([lat, lng]);
          setLocationStatus('success');
        },
        (error) => {
          console.error('خطا در دریافت موقعیت مکانی:', error);
          setLocationStatus('error');
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, []);
  
  // دریافت مجدد موقعیت مکانی کاربر
  const retryLocationDetection = () => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setFormData(prev => ({
            ...prev,
            lat: lat.toString(),
            lng: lng.toString()
          }));
          setInitialPosition([lat, lng]);
          setLocationStatus('success');
        },
        (error) => {
          console.error('خطا در دریافت موقعیت مکانی:', error);
          setLocationStatus('error');
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  // مدیریت انتخاب موقعیت مکانی از روی نقشه
  const handleLocationSelect = (lat: string, lng: string) => {
    setFormData(prev => ({
      ...prev,
      lat,
      lng
    }));
    setLocationStatus('manual');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // اعتبارسنجی فرم
      if (!formData.full_name || !formData.phone_number) {
        throw new Error('لطفاً تمام فیلدهای الزامی را پر کنید');
      }
      
      // اگر موقعیت مکانی وارد نشده باشد، هشدار دهید
      if (!formData.lat || !formData.lng) {
        const confirmLocation = window.confirm(
          'موقعیت مکانی شما وارد نشده است. ثبت موقعیت مکانی برای نمایش منابع نزدیک به شما ضروری است. آیا مایل هستید بدون ثبت موقعیت ادامه دهید؟'
        );
        
        if (!confirmLocation) {
          setIsSubmitting(false);
          return;
        }
      }
      
      console.log('Register attempt with data:', formData);
      
      // ارسال درخواست ثبت‌نام
      await registerUser(formData);
      
      console.log('Register successful, redirecting...');
      
      // نمایش پیام موفقیت
      setSuccess('ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه اصلی...');
      
      // هدایت به صفحه قبلی یا صفحه اصلی پس از مکث کوتاه
      setTimeout(() => {
        const returnUrl = router.query.returnUrl as string || '/';
        router.push(returnUrl);
      }, 1500);
    } catch (err: any) {
      console.error('Register error:', err);
      
      // نمایش پیام خطای مناسب
      if (err.response) {
        // خطای پاسخ سرور
        setError(`خطا در ثبت‌نام: ${err.response.status} - ${err.response.statusText || 'خطای سرور'}`);
        console.error('Server response:', err.response.data);
      } else if (err.request) {
        // خطای عدم پاسخ سرور
        setError('سرور پاسخ نداد. لطفاً اتصال اینترنت خود را بررسی کنید.');
      } else {
        // سایر خطاها
        setError(`خطا در ثبت‌نام: ${err.message || 'خطای نامشخص'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>ثبت‌نام - پناهگاه امن</title>
      </Head>
      
      <MainContainer>
        <div className="container">
          <AuthCard>
            <TitleContainer>
              <PageTitle>ثبت‌نام در پناهگاه امن</PageTitle>
            </TitleContainer>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <SuccessMessage>
                <span className="material-symbols-rounded success-icon">check_circle</span>
                {success}
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
              
              <FormGrid>
                <FormGroup>
                  <label htmlFor="city">شهر</label>
                  <input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="نام شهر خود را وارد کنید"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="age">سن</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="سن خود را وارد کنید"
                  />
                </FormGroup>
              </FormGrid>
              
              <FormGroup>
                <label htmlFor="gender">جنسیت</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                  <option value="other">سایر</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label>موقعیت مکانی</label>
                
                <LocationStatusContainer>
                  {locationStatus === 'loading' && (
                    <LocationStatus>
                      <span className="material-symbols-rounded icon loading">progress_activity</span>
                      در حال دریافت موقعیت مکانی...
                    </LocationStatus>
                  )}
                  
                  {locationStatus === 'success' && (
                    <LocationStatus success>
                      <span className="material-symbols-rounded icon">check_circle</span>
                      موقعیت مکانی با موفقیت دریافت شد.
                    </LocationStatus>
                  )}
                  
                  {locationStatus === 'manual' && (
                    <LocationStatus success>
                      <span className="material-symbols-rounded icon">check_circle</span>
                      موقعیت مکانی با موفقیت انتخاب شد.
                    </LocationStatus>
                  )}
                  
                  {locationStatus === 'error' && (
                    <LocationStatus error>
                      <span className="material-symbols-rounded icon">error</span>
                      خطا در دریافت موقعیت مکانی.
                      <RetryButton type="button" onClick={retryLocationDetection}>
                        تلاش مجدد
                      </RetryButton>
                      یا موقعیت خود را روی نقشه انتخاب کنید.
                    </LocationStatus>
                  )}
                </LocationStatusContainer>
                
                {/* افزودن کامپوننت نقشه برای انتخاب موقعیت */}
                <LocationPickerMap 
                  initialPosition={initialPosition} 
                  onLocationSelect={handleLocationSelect} 
                />
                
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
              </FormGroup>
              
              <ButtonContainer>
                <SpinnerButton
                  type="submit"
                  isLoading={isSubmitting}
                  size="lg"
                  variant="primary"
                  leftIcon={<span className="material-symbols-rounded">person_add</span>}
                >
                  ثبت‌نام
                </SpinnerButton>
              </ButtonContainer>
              
              <LoginLink>
                قبلاً ثبت‌نام کرده‌اید؟ <Link href="/auth/login">ورود به حساب کاربری</Link>
              </LoginLink>
            </form>
          </AuthCard>
        </div>
      </MainContainer>
    </>
  );
};

export default RegisterPage; 