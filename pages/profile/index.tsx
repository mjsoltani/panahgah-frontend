import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../../lib/auth-context';

// استایل کامپوننت‌ها
const ComingSoonContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
`;

const ImageContainer = styled.div`
  margin-bottom: 2rem;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: var(--color-gray-600);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
    background-color: var(--color-gray-100);
    border-radius: 8px;
    padding: 1rem;
    min-width: 80px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    
    @media (max-width: 576px) {
      font-size: 2rem;
      min-width: 60px;
      padding: 0.75rem;
    }
  }
  
  .label {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-gray-500);
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
`;

const ReturnButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    color: white;
  }
  
  .icon {
    margin-left: 0.5rem;
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();
  
  // تاریخ فرضی برای راه‌اندازی پروفایل کاربری (۳۰ روز دیگر)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  
  // محاسبه زمان باقی‌مانده
  const today = new Date();
  const timeLeft = launchDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.ceil((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return (
    <>
      <Head>
        <title>پروفایل کاربری - به زودی</title>
        <meta name="description" content="صفحه پروفایل کاربری پناهگاه امن به زودی راه‌اندازی خواهد شد." />
      </Head>
      
      <ComingSoonContainer>
        <ImageContainer>
          <span className="material-symbols-rounded" style={{ fontSize: '6rem', color: 'var(--color-primary)' }}>
            construction
          </span>
        </ImageContainer>
        
        <Title>به زودی راه‌اندازی می‌شود</Title>
        <Description>
          {user ? `${user.full_name} عزیز، ` : ''}
          صفحه پروفایل کاربری در حال توسعه است و به زودی با امکانات بیشتر راه‌اندازی خواهد شد.
          از شکیبایی شما سپاسگزاریم.
        </Description>
        
        <CountdownContainer>
          <CountdownItem>
            <div className="number">{daysLeft}</div>
            <div className="label">روز</div>
          </CountdownItem>
          <CountdownItem>
            <div className="number">{hoursLeft}</div>
            <div className="label">ساعت</div>
          </CountdownItem>
        </CountdownContainer>
        
        <ReturnButton href="/">
          <span className="material-symbols-rounded icon">arrow_back</span>
          بازگشت به صفحه اصلی
        </ReturnButton>
      </ComingSoonContainer>
    </>
  );
};

export default ProfilePage; 