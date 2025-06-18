import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { createProblem, CreateProblemData } from '../../api/problems';
import SpinnerButton from '../../components/SpinnerButton';
import FormError from '../../components/FormError';
import { useAuth } from '../../lib/auth-context';
import { validateHelpRequest, ValidationResult } from '../../lib/validation';

// استایل‌های کامپوننت‌ها
const MainContainer = styled.div`
  padding: 3rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  h1 {
    font-size: var(--font-size-3xl);
    color: var(--color-primary);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: "";
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }
  }
  
  p {
    max-width: 700px;
    margin: 2rem auto 0;
    color: var(--color-gray-600);
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: var(--font-size-2xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-primary);
  margin-bottom: var(--spacing-6);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-normal);
  width: fit-content;
  
  &:hover {
    color: var(--color-secondary);
    transform: translateX(-5px);
  }
  
  .icon {
    font-size: 1.2rem;
  }
`;

const FormContainer = styled.div`
  background-color: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--color-gray-200);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-4);
  
  label {
    display: block;
    margin-bottom: var(--spacing-2);
    font-weight: 500;
    color: var(--color-gray-700);
  }
  
  input, textarea {
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
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-6);
`;

const SuccessMessage = styled.div`
  background-color: rgba(var(--color-success-rgb), 0.1);
  border: 1px solid rgba(var(--color-success-rgb), 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  text-align: center;
  margin: var(--spacing-8) auto;
  max-width: 600px;
  
  .icon {
    font-size: 4rem;
    color: var(--color-success);
    margin-bottom: var(--spacing-4);
    background-color: rgba(var(--color-success-rgb), 0.1);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  
  h3 {
    color: var(--color-success);
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-2xl);
  }
  
  p {
    margin-bottom: var(--spacing-4);
    color: var(--color-gray-700);
    font-size: var(--font-size-lg);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    .icon {
      font-size: 3rem;
      width: 60px;
      height: 60px;
    }
    
    h3 {
      font-size: var(--font-size-xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
`;

const InfoBox = styled.div`
  background-color: rgba(var(--color-primary-rgb), 0.05);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  border-radius: var(--border-radius);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  
  h4 {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    color: var(--color-primary);
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-lg);
    
    .icon {
      font-size: 1.5rem;
    }
  }
  
  p {
    color: var(--color-gray-700);
    font-size: var(--font-size-base);
    line-height: 1.6;
  }
  
  ul {
    margin-top: var(--spacing-2);
    padding-right: var(--spacing-4);
    
    li {
      margin-bottom: var(--spacing-1);
      color: var(--color-gray-700);
    }
  }
`;

const ErrorAlert = styled.div`
  background-color: rgba(var(--color-danger-rgb), 0.1);
  border: 1px solid rgba(var(--color-danger-rgb), 0.3);
  border-radius: var(--border-radius);
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  color: var(--color-danger);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  
  .error-icon {
    font-size: 1.2rem;
    margin-top: 2px;
  }
`;

export default function CreateProblemPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<CreateProblemData>({
    Name: '',
    Descritpion: '',
    price: '',
    NationalCode: '',
    Family: '',
    Address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errorMessage: '',
    fieldErrors: {}
  });
  
  // پر کردن خودکار اطلاعات کاربر در صورت احراز هویت
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        NationalCode: user.phone_number || '',
        Family: user.full_name || '',
        Address: user.city || ''
      }));
    }
  }, [isAuthenticated, user]);
  
  // هدایت کاربر به صفحه ورود اگر احراز هویت نشده باشد
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?returnUrl=/help/create');
    }
  }, [isAuthenticated, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // پاک کردن خطای فیلد در صورت تغییر مقدار
    if (validationResult.fieldErrors[name]) {
      setValidationResult(prev => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [name]: ''
        }
      }));
    }
  };
  
  const validateForm = (): boolean => {
    // اعتبارسنجی فرم با استفاده از تابع validateHelpRequest
    const result = validateHelpRequest(formData);
    setValidationResult(result);
    
    if (!result.isValid) {
      setError(result.errorMessage);
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // اعتبارسنجی فرم قبل از ارسال
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Form data before submission:', formData);
      
      // کپی از داده‌ها برای جلوگیری از تغییر مستقیم state
      const submissionData = { ...formData };
      
      // اطمینان از اینکه شماره تلفن در فیلد NationalCode ذخیره شده است
      if (isAuthenticated && user && user.phone_number) {
        submissionData.NationalCode = user.phone_number;
      }
      
      // اطمینان از پر بودن فیلد آدرس
      if (!submissionData.Address || submissionData.Address.trim() === '') {
        if (isAuthenticated && user && user.city) {
          submissionData.Address = user.city;
        } else {
          submissionData.Address = 'نامشخص';
        }
      }
      
      console.log('Final form data for submission:', submissionData);
      
      const result = await createProblem(submissionData);
      console.log('Submission successful:', result);
      
      setSuccess(true);
      
      // انتقال به صفحه اصلی همیاری پس از 3 ثانیه
      setTimeout(() => {
        router.push('/help');
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('خطا در ثبت درخواست. لطفا دوباره تلاش کنید.');
      setIsSubmitting(false);
    }
  };
  
  // اعتبارسنجی فیلد هنگام از دست دادن فوکوس
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // اعتبارسنجی فیلد خاص
    const result = validateHelpRequest({
      ...formData,
      [name]: value
    });
    
    if (result.fieldErrors[name]) {
      setValidationResult(prev => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [name]: result.fieldErrors[name]
        }
      }));
    }
  };
  
  // اگر کاربر احراز هویت نشده باشد، صفحه بارگذاری نمایش داده می‌شود
  if (!isAuthenticated) {
    return (
      <MainContainer className="container">
        <div style={{ textAlign: 'center', padding: 'var(--spacing-8) 0' }}>
          <SpinnerButton
            isLoading={true}
            size="lg"
            variant="primary"
          >
            در حال هدایت به صفحه ورود...
          </SpinnerButton>
        </div>
      </MainContainer>
    );
  }
  
  return (
    <>
      <Head>
        <title>ثبت درخواست کمک - پناهگاه امن</title>
      </Head>
      
      <MainContainer className="container">
        <BackLink href="/help">
          <span className="material-symbols-rounded icon">arrow_back</span>
          بازگشت به صفحه همیاری
        </BackLink>
        
        <PageHeader>
          <h1>ثبت درخواست کمک</h1>
          <p>در این صفحه می‌توانید درخواست کمک خود را برای دریافت کمک از دیگران ثبت کنید</p>
        </PageHeader>
        
        {success ? (
          <SuccessMessage>
            <span className="material-symbols-rounded icon">check_circle</span>
            <h3>درخواست شما با موفقیت ثبت شد!</h3>
            <p>درخواست کمک شما با موفقیت در سیستم ثبت شد و به زودی توسط کاربران مشاهده خواهد شد.</p>
            <p>تا لحظاتی دیگر به صفحه همیاری منتقل می‌شوید...</p>
          </SuccessMessage>
        ) : (
          <FormContainer>
            <InfoBox>
              <h4>
                <span className="material-symbols-rounded icon">info</span>
                راهنمای ثبت درخواست
              </h4>
              <p>برای ثبت درخواست کمک، لطفا به نکات زیر توجه کنید:</p>
              <ul>
                <li>اطلاعات خود را به صورت دقیق و کامل وارد کنید.</li>
                <li>در توضیحات درخواست، جزئیات کافی از نیاز خود را شرح دهید.</li>
                <li>از ذکر اطلاعات حساس و شخصی خودداری کنید.</li>
                <li>از کلمات مناسب و محترمانه استفاده کنید.</li>
                <li>اطلاعات تماس معتبر وارد کنید تا امکان برقراری ارتباط وجود داشته باشد.</li>
              </ul>
            </InfoBox>
            
            {error && (
              <ErrorAlert>
                <span className="material-symbols-rounded error-icon">error</span>
                {error}
              </ErrorAlert>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="Name">عنوان درخواست</label>
                <input
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="مثال: نیاز به دارو برای پدربزرگ"
                  required
                />
                <FormError error={validationResult.fieldErrors.Name} />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="Descritpion">توضیحات درخواست</label>
                <textarea
                  id="Descritpion"
                  name="Descritpion"
                  value={formData.Descritpion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="لطفا توضیحات کامل درخواست کمک خود را بنویسید..."
                  required
                />
                <FormError error={validationResult.fieldErrors.Descritpion} />
              </FormGroup>
              
              <FormGrid>
                <FormGroup>
                  <label htmlFor="price">مبلغ تقریبی مورد نیاز (تومان)</label>
                  <input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="مثال: 500000"
                    required
                  />
                  <FormError error={validationResult.fieldErrors.price} />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="Family">نام و نام خانوادگی</label>
                  <input
                    id="Family"
                    name="Family"
                    value={formData.Family}
                    onChange={handleChange}
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    required
                    readOnly={isAuthenticated}
                    style={isAuthenticated ? { backgroundColor: 'var(--color-gray-100)' } : {}}
                  />
                  <FormError error={validationResult.fieldErrors.Family} />
                </FormGroup>
              </FormGrid>
              
              <FormGrid>
                <FormGroup>
                  <label htmlFor="NationalCode">شماره تلفن</label>
                  <input
                    id="NationalCode"
                    name="NationalCode"
                    value={formData.NationalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="شماره تلفن همراه"
                    required
                    readOnly={isAuthenticated}
                    style={isAuthenticated ? { backgroundColor: 'var(--color-gray-100)' } : {}}
                  />
                  <FormError error={validationResult.fieldErrors.NationalCode} />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="Address">آدرس</label>
                  <input
                    id="Address"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="آدرس یا شهر محل سکونت خود را وارد کنید"
                    required
                  />
                  <FormError error={validationResult.fieldErrors.Address} />
                </FormGroup>
              </FormGrid>
              
              <ButtonContainer>
                <SpinnerButton
                  type="submit"
                  isLoading={isSubmitting}
                  rounded={true}
                  size="lg"
                  variant="primary"
                  leftIcon={<span className="material-symbols-rounded">send</span>}
                >
                  ثبت درخواست کمک
                </SpinnerButton>
              </ButtonContainer>
            </form>
          </FormContainer>
        )}
      </MainContainer>
    </>
  );
} 