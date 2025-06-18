import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { fetchAllProblems } from '../../api/problems';
import { useAuth } from '../../lib/auth-context';

// تعریف تایپ مشکل
interface Problem {
  id: number;
  Name: string;
  Descritpion: string;
  price: string;
  NationalCode: string;
  Family: string;
  Address: string;
  createdAt?: string;
}

// استایل‌های کامپوننت‌ها
const MainContainer = styled.div`
  padding: 3rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  h1 {
    font-size: var(--font-size-4xl);
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
      font-size: var(--font-size-3xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  padding: var(--spacing-8) var(--spacing-6);
  border-radius: var(--border-radius-lg);
  color: var(--color-white);
  margin-bottom: var(--spacing-10);
  position: relative;
  overflow: hidden;
  box-shadow: var(--box-shadow-md);
  
  &:before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    top: -100px;
    right: -100px;
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-6);
    
    @media (max-width: 992px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  .hero-text {
    flex: 1;
    
    h2 {
      font-size: var(--font-size-3xl);
      margin-bottom: var(--spacing-4);
      color: var(--color-white);
      font-weight: 700;
      
      @media (max-width: 768px) {
        font-size: var(--font-size-2xl);
      }
    }
    
    p {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-6);
      opacity: 0.9;
      line-height: 1.7;
      
      @media (max-width: 768px) {
        font-size: var(--font-size-base);
      }
    }
  }
  
  .hero-buttons {
    display: flex;
    gap: var(--spacing-4);
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: var(--spacing-3);
    }
  }
  
  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 100%;
      height: auto;
      max-height: 300px;
      filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
    }
    
    @media (max-width: 992px) {
      margin-top: var(--spacing-6);
      
      img {
        max-height: 200px;
      }
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-8);
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-gray-200);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: var(--spacing-1);
    
    &::-webkit-scrollbar {
      height: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-gray-300);
      border-radius: var(--border-radius-full);
    }
  }
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--font-size-lg);
  cursor: pointer;
  font-weight: ${props => (props.active ? '700' : '500')};
  color: ${props => (props.active ? 'var(--color-primary)' : 'var(--color-gray-600)')};
  border-bottom: ${props =>
    props.active ? '3px solid var(--color-primary)' : '3px solid transparent'};
  transition: all var(--transition-normal);
  position: relative;
  z-index: 2;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-primary-dark)'};
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 3px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    transition: width var(--transition-normal);
    z-index: 3;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--font-size-base);
  }
`;

const ProblemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

const ProblemCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-6);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
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
  
  &:hover {
    transform: translateY(-7px);
    box-shadow: var(--box-shadow-lg);
    border-color: var(--color-gray-300);
  }
  
  h3 {
    margin-bottom: var(--spacing-3);
    color: var(--color-primary);
    padding-left: var(--spacing-3);
    font-size: var(--font-size-xl);
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
    flex-grow: 1;
    line-height: 1.6;
    padding-left: var(--spacing-3);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    h3 {
      font-size: var(--font-size-lg);
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

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--border-radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  margin-top: var(--spacing-3);
  box-shadow: var(--box-shadow-sm);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-md);
    color: var(--color-white);
    text-decoration: none;
  }
  
  .icon {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: var(--spacing-2) var(--spacing-4);
  }
`;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--border-radius-full);
  font-weight: 600;
  font-size: var(--font-size-lg);
  text-decoration: none;
  transition: all var(--transition-normal);
  box-shadow: var(--box-shadow-md);
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-lg);
    color: var(--color-white);
    text-decoration: none;
  }
  
  .icon {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-base);
    width: 100%;
    max-width: 300px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: var(--spacing-10) 0 var(--spacing-6);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-10) var(--spacing-6);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  border: 1px dashed var(--color-gray-300);
  max-width: 700px;
  margin: 0 auto;
  
  .icon {
    font-size: 4rem;
    color: var(--color-gray-400);
    margin-bottom: var(--spacing-4);
  }
  
  h3 {
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-2xl);
  }
  
  p {
    color: var(--color-gray-600);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-6);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-6) var(--spacing-4);
    
    .icon {
      font-size: 3rem;
    }
    
    h3 {
      font-size: var(--font-size-xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
`;

const AuthCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-8);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid var(--color-gray-200);
  
  .icon {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: var(--spacing-4);
    background-color: rgba(var(--color-primary-rgb), 0.1);
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
    margin-bottom: var(--spacing-4);
    color: var(--color-gray-800);
    font-size: var(--font-size-2xl);
  }
  
  p {
    margin-bottom: var(--spacing-6);
    font-size: var(--font-size-lg);
    color: var(--color-gray-600);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-6) var(--spacing-4);
    
    .icon {
      font-size: 2rem;
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

// کامپوننت اصلی
const HelpPage = ({ initialProblems }: { initialProblems: Problem[] }) => {
  const { user, isAuthenticated } = useAuth();
  const [problems, setProblems] = useState<Problem[]>(initialProblems || []);
  const [myProblems, setMyProblems] = useState<Problem[]>([]);
  const [activeTab, setActiveTab] = useState<'problems' | 'my-requests'>('problems');

  console.log('Initial render - Authenticated:', isAuthenticated);
  console.log('Initial render - User:', user);
  console.log('Initial render - Initial Problems:', initialProblems);

  // در یک پروژه واقعی، داده‌ها در فواصل منظم به‌روزرسانی می‌شوند
  useEffect(() => {
    const updateProblems = async () => {
      try {
        const data = await fetchAllProblems();
        console.log('Fetched problems:', data);
        setProblems(data);
        
        // اگر کاربر احراز هویت شده باشد، درخواست‌های مربوط به او را فیلتر می‌کنیم
        if (isAuthenticated && user) {
          console.log('Authenticated user:', user);
          // بهبود فیلتر درخواست‌های کاربر - مقایسه با شماره تلفن کاربر
          const userPhoneNumber = user.phone_number?.toString().trim();
          const userId = user.id?.toString().trim();
          
          const userProblems = data.filter(problem => {
            const problemCode = problem.NationalCode?.toString().trim();
            console.log('Comparing problem:', problemCode, 'with user:', userPhoneNumber, 'or', userId);
            return problemCode === userPhoneNumber || problemCode === userId;
          });
          
          console.log('Filtered user problems:', userProblems);
          setMyProblems(userProblems);
        }
      } catch (error) {
        console.error('خطا در دریافت لیست مشکلات:', error);
      }
    };

    // به‌روزرسانی هر ۳۰ ثانیه
    updateProblems();
    const intervalId = setInterval(updateProblems, 30000);
    return () => clearInterval(intervalId);
  }, [isAuthenticated, user]);

  return (
    <>
      <Head>
        <title>همیاری مردمی - پناهگاه امن</title>
        <meta name="description" content="پلتفرم کمک متقابل - درخواست کمک و پیشنهاد کمک به دیگران" />
      </Head>

      <MainContainer className="container">
        <PageHeader>
          <h1>همیاری مردمی</h1>
          <p>در شرایط بحران، کمک به یکدیگر می‌تواند نجات‌بخش باشد. در این بخش می‌توانید درخواست کمک ثبت کنید یا به دیگران کمک کنید.</p>
        </PageHeader>

        <HeroSection>
          <div className="hero-content">
            <div className="hero-text">
              <h2>با هم قوی‌تر هستیم</h2>
              <p>در شرایط بحران، همبستگی و همیاری مردمی می‌تواند تفاوت بزرگی ایجاد کند. از طریق این پلتفرم می‌توانید نیازهای خود را اعلام کنید یا به کسانی که نیاز دارند کمک کنید.</p>
              <div className="hero-buttons">
                <CreateButton href="/help/create">
                  <span className="material-symbols-rounded icon">add_circle</span>
                  ثبت درخواست جدید
                </CreateButton>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/help-illustration.svg" alt="همیاری مردمی" />
            </div>
          </div>
        </HeroSection>

        <TabsContainer>
          <Tab
            active={activeTab === 'problems'}
            onClick={() => setActiveTab('problems')}
          >
            <span className="material-symbols-rounded">volunteer_activism</span> درخواست‌های کمک
          </Tab>
          <Tab
            active={activeTab === 'my-requests'}
            onClick={() => setActiveTab('my-requests')}
          >
            <span className="material-symbols-rounded">person</span> درخواست‌های من
          </Tab>
        </TabsContainer>

        {activeTab === 'problems' && (
          <>
            {problems.length > 0 ? (
              <>
                <ProblemsList>
                  {problems.map((problem) => (
                    <ProblemCard key={problem.id}>
                      <h3>{problem.Name}</h3>
                      <p>{problem.Descritpion}</p>
                      <ProblemDetails>
                        <div><strong>قیمت تقریبی:</strong> {new Intl.NumberFormat('fa-IR').format(Number(problem.price))} تومان</div>
                        <div><strong>نام و نام خانوادگی:</strong> {problem.Family}</div>
                        <div><strong>آدرس:</strong> {problem.Address}</div>
                        {problem.createdAt && (
                          <div><small style={{ color: 'var(--color-gray-500)' }}>تاریخ ثبت: {problem.createdAt}</small></div>
                        )}
                      </ProblemDetails>
                      <ActionButton href={`/help/offer/${problem.id}`}>
                        <span className="material-symbols-rounded icon">handshake</span>
                        پیشنهاد کمک
                      </ActionButton>
                    </ProblemCard>
                  ))}
                </ProblemsList>
              </>
            ) : (
              <EmptyState>
                <span className="material-symbols-rounded icon">sentiment_neutral</span>
                <h3>در حال حاضر درخواست کمکی ثبت نشده است</h3>
                <p>شما می‌توانید اولین نفری باشید که درخواست کمک ثبت می‌کند. با کلیک بر روی دکمه زیر، درخواست خود را ثبت کنید.</p>
                <CreateButton href="/help/create">
                  <span className="material-symbols-rounded icon">add_circle</span>
                  ثبت درخواست جدید
                </CreateButton>
              </EmptyState>
            )}
            
            {problems.length > 0 && (
              <ButtonContainer>
                <CreateButton href="/help/create">
                  <span className="material-symbols-rounded icon">add_circle</span>
                  ثبت درخواست جدید
                </CreateButton>
              </ButtonContainer>
            )}
          </>
        )}

        {activeTab === 'my-requests' && (
          <>
            {isAuthenticated ? (
              <>
                {myProblems.length > 0 ? (
                  <>
                    <ProblemsList>
                      {myProblems.map((problem) => (
                        <ProblemCard key={problem.id}>
                          <h3>{problem.Name}</h3>
                          <p>{problem.Descritpion}</p>
                          <ProblemDetails>
                            <div><strong>قیمت تقریبی:</strong> {new Intl.NumberFormat('fa-IR').format(Number(problem.price))} تومان</div>
                            <div><strong>نام و نام خانوادگی:</strong> {problem.Family}</div>
                            <div><strong>آدرس:</strong> {problem.Address}</div>
                            {problem.createdAt && (
                              <div><small style={{ color: 'var(--color-gray-500)' }}>تاریخ ثبت: {problem.createdAt}</small></div>
                            )}
                          </ProblemDetails>
                          <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                            <ActionButton href={`/help/edit/${problem.id}`} style={{ backgroundColor: 'var(--color-warning)' }}>
                              <span className="material-symbols-rounded icon">edit</span>
                              ویرایش
                            </ActionButton>
                            <ActionButton href={`/help/status/${problem.id}`}>
                              <span className="material-symbols-rounded icon">visibility</span>
                              مشاهده وضعیت
                            </ActionButton>
                          </div>
                        </ProblemCard>
                      ))}
                    </ProblemsList>
                    
                    <ButtonContainer>
                      <CreateButton href="/help/create">
                        <span className="material-symbols-rounded icon">add_circle</span>
                        ثبت درخواست جدید
                      </CreateButton>
                    </ButtonContainer>
                  </>
                ) : (
                  <EmptyState>
                    <span className="material-symbols-rounded icon">sentiment_neutral</span>
                    <h3>شما هنوز درخواست کمکی ثبت نکرده‌اید</h3>
                    <p>برای ثبت درخواست کمک جدید، روی دکمه زیر کلیک کنید.</p>
                    <CreateButton href="/help/create">
                      <span className="material-symbols-rounded icon">add_circle</span>
                      ثبت درخواست جدید
                    </CreateButton>
                  </EmptyState>
                )}
              </>
            ) : (
              <AuthCard>
                <span className="material-symbols-rounded icon">account_circle</span>
                <h3>ورود به حساب کاربری</h3>
                <p>برای مشاهده درخواست‌های خود، لطفا وارد حساب کاربری خود شوید.</p>
                <CreateButton href="/auth/login">
                  <span className="material-symbols-rounded icon">login</span>
                  ورود به حساب کاربری
                </CreateButton>
              </AuthCard>
            )}
          </>
        )}
      </MainContainer>
    </>
  );
};

// دریافت داده‌ها از سرور
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const problems = await fetchAllProblems();
    return {
      props: {
        initialProblems: problems
      }
    };
  } catch (error) {
    console.error('Error fetching problems:', error);
    return {
      props: {
        initialProblems: []
      }
    };
  }
};

export default HelpPage;
