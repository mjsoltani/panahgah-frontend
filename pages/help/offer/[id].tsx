import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { fetchAllProblems, Problem, createSolution, CreateSolutionData } from '../../../api/problems';
import Spinner from '../../../components/Spinner';
import SpinnerButton from '../../../components/SpinnerButton';
import { useAuth } from '../../../lib/auth-context';

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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProblemCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-6);
  height: fit-content;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
  }
  
  h3 {
    margin-bottom: var(--spacing-4);
    color: var(--color-primary);
    font-size: var(--font-size-2xl);
    padding-left: var(--spacing-3);
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: var(--spacing-3);
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, var(--color-primary-light), var(--color-secondary-light));
      border-radius: var(--border-radius-full);
    }
  }
  
  p {
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-4);
    line-height: 1.6;
    padding-left: var(--spacing-3);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    h3 {
      font-size: var(--font-size-xl);
    }
  }
`;

const ProblemDetails = styled.div`
  margin: var(--spacing-4) 0;
  padding: var(--spacing-4);
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-gray-200);
  
  div {
    margin-bottom: var(--spacing-2);
    display: flex;
    flex-wrap: wrap;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    strong {
      min-width: 120px;
      color: var(--color-gray-700);
      font-weight: 600;
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-3);
  }
`;

const FormContainer = styled.div`
  background-color: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-gray-200);
  
  h3 {
    margin-bottom: var(--spacing-6);
    color: var(--color-primary);
    font-size: var(--font-size-2xl);
    text-align: center;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      border-radius: var(--border-radius-full);
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    h3 {
      font-size: var(--font-size-xl);
    }
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

const NotFoundMessage = styled.div`
  text-align: center;
  padding: var(--spacing-8);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  max-width: 600px;
  margin: var(--spacing-10) auto;
  border: 1px solid var(--color-gray-200);
  
  .icon {
    font-size: 4rem;
    color: var(--color-danger);
    margin-bottom: var(--spacing-4);
  }
  
  h2 {
    color: var(--color-danger);
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-2xl);
  }
  
  p {
    margin-bottom: var(--spacing-6);
    color: var(--color-gray-600);
    font-size: var(--font-size-lg);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-6);
    
    .icon {
      font-size: 3rem;
    }
    
    h2 {
      font-size: var(--font-size-xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
`;

interface OfferPageProps {
  problem: Problem | null;
}

export default function OfferPage({ problem }: OfferPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState<CreateSolutionData>({
    Name: problem?.Name ? `پاسخ به: ${problem.Name}` : '',
    Descritpion: '',
    price: problem?.price || '',
    NationalCode: '',
    Family: '',
    Address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
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
    if (!isAuthenticated && router.isReady) {
      router.push(`/auth/login?returnUrl=/help/offer/${id}`);
    }
  }, [isAuthenticated, router, id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log('Request URL:', 'https://n8n.monises.com/webhook/SoloutionState');
      
      await createSolution(submissionData);
      setSuccess(true);
      
      // انتقال به صفحه اصلی همیاری پس از 3 ثانیه
      setTimeout(() => {
        router.push('/help');
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('خطا در ثبت پیشنهاد کمک. لطفا دوباره تلاش کنید.');
      setIsSubmitting(false);
    }
  };
  
  // اگر کاربر احراز هویت نشده باشد، صفحه بارگذاری نمایش داده می‌شود
  if (!isAuthenticated && router.isReady) {
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
  
  if (!problem && !router.isReady) {
    return (
      <div className="container">
        <div style={{padding: '5rem 0', textAlign: 'center'}}>
          <Spinner 
            type="gradient" 
            size="lg" 
            text="در حال بارگذاری اطلاعات..." 
            padding="5rem 0"
          />
        </div>
      </div>
    );
  }
  
  if (!problem) {
    return (
      <div className="container">
        <NotFoundMessage>
          <span className="material-symbols-rounded icon">error</span>
          <h2>درخواستی با این شناسه یافت نشد</h2>
          <p>درخواست مورد نظر شما در سیستم موجود نیست یا حذف شده است.</p>
          <BackLink href="/help">
            <span className="material-symbols-rounded icon">arrow_back</span>
            بازگشت به صفحه همیاری
          </BackLink>
        </NotFoundMessage>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="container">
        <SuccessMessage>
          <span className="material-symbols-rounded icon">check_circle</span>
          <h3>پیشنهاد کمک شما با موفقیت ثبت شد!</h3>
          <p>از اینکه به کمک دیگران شتافتید، سپاسگزاریم. پیشنهاد شما در سیستم ثبت شد و به زودی با شما تماس گرفته خواهد شد.</p>
          <p>تا لحظاتی دیگر به صفحه همیاری منتقل می‌شوید...</p>
        </SuccessMessage>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>پیشنهاد کمک - پناهگاه امن</title>
      </Head>
      
      <MainContainer className="container">
        <BackLink href="/help">
          <span className="material-symbols-rounded icon">arrow_back</span>
          بازگشت به صفحه همیاری
        </BackLink>
        
        <PageHeader>
          <h1>پیشنهاد کمک</h1>
          <p>شما در حال پیشنهاد کمک به یک درخواست هستید. لطفا اطلاعات خود را با دقت وارد کنید.</p>
        </PageHeader>
        
        <ContentWrapper>
          <ProblemCard>
            <h3>{problem.Name}</h3>
            <p>{problem.Descritpion}</p>
            <ProblemDetails>
              <div><strong>قیمت تقریبی:</strong> {problem.price} تومان</div>
              <div><strong>نام و نام خانوادگی:</strong> {problem.Family}</div>
              <div><strong>آدرس:</strong> {problem.Address}</div>
              {problem.createdAt && (
                <div><small style={{ color: 'var(--color-gray-500)' }}>تاریخ ثبت: {problem.createdAt}</small></div>
              )}
            </ProblemDetails>
          </ProblemCard>
          
          <FormContainer>
            <h3>فرم پیشنهاد کمک</h3>
            
            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="Name">عنوان پیشنهاد</label>
                <input
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="Descritpion">توضیحات پیشنهاد</label>
                <textarea
                  id="Descritpion"
                  name="Descritpion"
                  value={formData.Descritpion}
                  onChange={handleChange}
                  placeholder="لطفا توضیح دهید چگونه می‌توانید کمک کنید..."
                  required
                />
              </FormGroup>
              
              <FormGrid>
                <FormGroup>
                  <label htmlFor="price">مبلغ پیشنهادی (تومان)</label>
                  <input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
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
                    placeholder="شماره تلفن همراه"
                    required
                    readOnly={isAuthenticated}
                    style={isAuthenticated ? { backgroundColor: 'var(--color-gray-100)' } : {}}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="Address">آدرس</label>
                  <input
                    id="Address"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    placeholder="آدرس خود را وارد کنید"
                    required
                  />
                </FormGroup>
              </FormGrid>
              
              <ButtonContainer>
                <SpinnerButton
                  type="submit"
                  isLoading={isSubmitting}
                  rounded={true}
                  size="lg"
                  variant="secondary"
                  leftIcon={<span className="material-symbols-rounded">volunteer_activism</span>}
                >
                  ثبت پیشنهاد کمک
                </SpinnerButton>
              </ButtonContainer>
            </form>
          </FormContainer>
        </ContentWrapper>
      </MainContainer>
    </>
  );
}

// دریافت داده‌ها از سرور
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params || {};
    
    if (!id) {
      return {
        props: {
          problem: null
        }
      };
    }
    
    const problems = await fetchAllProblems();
    const problem = problems.find(p => p.id.toString() === id);
    
    return {
      props: {
        problem: problem || null
      }
    };
  } catch (error) {
    console.error('Error fetching problem:', error);
    return {
      props: {
        problem: null
      }
    };
  }
}; 