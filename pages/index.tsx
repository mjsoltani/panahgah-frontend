import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

// Security Alert Card Component
const SecurityAlertCard = styled.div`
  display: flex;
  background: linear-gradient(to right, rgba(var(--color-warning-rgb), 0.05), rgba(var(--color-warning-rgb), 0.1));
  border-right: 4px solid var(--color-warning);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-lg);
  }
  
  .alert-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: var(--color-warning);
    border-radius: 50%;
    margin-left: 1.5rem;
    flex-shrink: 0;
    
    span {
      font-size: 30px;
      color: white;
    }
  }
  
  .alert-content {
    flex: 1;
    
    h3 {
      font-size: 1.3rem;
      color: var(--color-warning-dark);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--color-gray-700);
      margin-bottom: 1rem;
    }
    
    .alert-link {
      display: inline-flex;
      align-items: center;
      color: var(--color-warning-dark);
      font-weight: 500;
      transition: color 0.2s ease;
      
      span {
        margin-right: 0.3rem;
        font-size: 1.1rem;
        transition: transform 0.2s ease;
      }
      
      &:hover {
        color: var(--color-warning);
        text-decoration: none;
        
        span {
          transform: translateX(-3px);
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    .alert-icon {
      margin: 0 auto 1rem;
    }
    
    .alert-content {
      text-align: center;
    }
  }
`;

// کامپوننت‌های استایل شده
const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary), var(--color-secondary));
  padding: var(--spacing-12) var(--spacing-4);
  border-radius: var(--border-radius-lg);
  color: var(--color-white);
  text-align: center;
  margin-bottom: var(--spacing-12);
  position: relative;
  overflow: hidden;
  box-shadow: var(--box-shadow-lg);
  margin-top: var(--spacing-6);
  
  &:before {
    content: "";
    position: absolute;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    top: -100px;
    right: -100px;
    z-index: 1;
  }
  
  &:after {
    content: "";
    position: absolute;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    bottom: -50px;
    left: -50px;
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-4);
    color: var(--color-white);
    font-weight: 800;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }
  
  .lead {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-8);
    opacity: 0.9;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
      padding: 0 var(--spacing-2);
    }
  }
  
  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-8);
    opacity: 0.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
      font-size: var(--font-size-base);
      padding: 0 var(--spacing-2);
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-3);
    margin-bottom: var(--spacing-8);
    margin-top: var(--spacing-4);
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  margin-top: var(--spacing-8);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
    margin-top: var(--spacing-6);
  }
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--border-radius-full);
  font-weight: 600;
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
  gap: var(--spacing-2);
  min-width: 180px;
  
  &.primary {
    background-color: var(--color-white);
    color: var(--color-primary);
    box-shadow: var(--box-shadow-md);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--box-shadow-lg);
      text-decoration: none;
    }
  }
  
  &.secondary {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--color-white);
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      text-decoration: none;
    }
  }
  
  .button-icon {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-sm);
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: var(--spacing-6);
  right: var(--spacing-6);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-white);
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-success);
    animation: pulse 2s infinite;
  }
  
  &.alert {
    background-color: rgba(220, 38, 38, 0.2);
    border: 1px solid rgba(220, 38, 38, 0.4);
    font-weight: 700;
    
    &::before {
      background-color: #DC2626;
      animation: alertPulse 1s infinite;
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
  
  @keyframes alertPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
    }
  }
  
  @media (max-width: 768px) {
    top: var(--spacing-4);
    right: var(--spacing-4);
    font-size: var(--font-size-xs);
    padding: var(--spacing-1) var(--spacing-3);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-8);
  position: relative;
  
  h2 {
    display: inline-block;
    position: relative;
    color: var(--color-gray-900);
    font-size: var(--font-size-3xl);
    font-weight: 700;
    padding-bottom: var(--spacing-3);
    
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      border-radius: var(--border-radius-full);
    }
  }
  
  p {
    max-width: 700px;
    margin: var(--spacing-4) auto 0;
    color: var(--color-gray-600);
    font-size: var(--font-size-lg);
  }
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-6);
    
    h2 {
      font-size: var(--font-size-2xl);
    }
    
    p {
      font-size: var(--font-size-base);
      padding: 0 var(--spacing-3);
    }
  }
`;

const ServicesSection = styled.section`
  padding: var(--spacing-12) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-8);
  margin: var(--spacing-8) 0 var(--spacing-12);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    margin: var(--spacing-6) 0 var(--spacing-8);
    padding: 0 var(--spacing-2);
  }
`;

const FeatureCard = styled.div`
  background-color: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--box-shadow-lg);
    
    .card-icon {
      transform: scale(1.1);
    }
  }
  
  h3 {
    font-size: var(--font-size-xl);
    color: var(--color-gray-900);
    margin: var(--spacing-4) 0;
  }
  
  p {
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-6);
    line-height: 1.7;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-6);
    
    h3 {
      font-size: var(--font-size-lg);
    }
    
    p {
      font-size: var(--font-size-sm);
    }
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  transition: all var(--transition-normal);
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  color: var(--color-white);
  box-shadow: 0 10px 20px rgba(var(--color-primary-rgb), 0.3);
  
  .icon {
    font-size: 2.5rem;
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    
    .icon {
      font-size: 2rem;
    }
  }
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-normal);
  
  &:hover {
    background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
    color: var(--color-white);
    text-decoration: none;
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-md);
  }
  
  .link-icon {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
  }
`;

const NewsList = styled.div`
  margin-top: var(--spacing-6);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-4);
    padding: 0 var(--spacing-2);
  }
`;

const NewsCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  border-right: 4px solid var(--color-primary);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) translateX(3px);
    box-shadow: var(--box-shadow-md);
  }
  
  h4 {
    color: var(--color-gray-900);
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-lg);
    font-weight: 600;
    line-height: 1.5;
  }
  
  .news-date {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    color: var(--color-gray-500);
    font-size: var(--font-size-sm);
    
    .date-icon {
      font-size: 1rem;
    }
  }
  
  .news-category {
    position: absolute;
    top: var(--spacing-4);
    left: var(--spacing-4);
    background-color: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: var(--border-radius-full);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    h4 {
      font-size: var(--font-size-base);
    }
    
    .news-category {
      top: var(--spacing-3);
      left: var(--spacing-3);
    }
  }
`;

const EmergencyContactsCard = styled.div`
  background: linear-gradient(135deg, #f44336, #e91e63);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-lg);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
  overflow: hidden;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/emergency-pattern.png') repeat;
    opacity: 0.1;
    z-index: 1;
  }
  
  .card-content {
    position: relative;
    z-index: 2;
  }
  
  .card-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-6);
    
    .emergency-icon {
      font-size: 2rem;
      background-color: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    h3 {
      color: var(--color-white);
      margin: 0;
      font-size: var(--font-size-xl);
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    .card-title {
      margin-bottom: var(--spacing-4);
      
      .emergency-icon {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
      }
      
      h3 {
        font-size: var(--font-size-lg);
      }
    }
  }
`;

const EmergencyContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
  
  .contact-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    
    .contact-icon {
      font-size: 1.5rem;
      background-color: rgba(255, 255, 255, 0.2);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .contact-title {
      font-weight: 600;
      font-size: var(--font-size-base);
    }
  }
  
  .contact-number {
    font-weight: 700;
    color: var(--color-white);
    font-size: var(--font-size-lg);
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.2);
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--border-radius-full);
    transition: all var(--transition-normal);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-3);
    
    .contact-info {
      gap: var(--spacing-2);
      
      .contact-icon {
        font-size: 1.2rem;
        width: 32px;
        height: 32px;
      }
      
      .contact-title {
        font-size: var(--font-size-sm);
      }
    }
    
    .contact-number {
      font-size: var(--font-size-base);
      padding: var(--spacing-1) var(--spacing-3);
    }
  }
`;

const ContentSection = styled.section`
  padding: var(--spacing-12) 0;
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  margin: var(--spacing-8) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) 0;
    margin: var(--spacing-6) 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-8);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  margin-top: var(--spacing-6);
  transition: all var(--transition-normal);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-full);
  
  &:hover {
    background-color: rgba(var(--color-primary-rgb), 0.1);
    transform: translateX(var(--spacing-1));
    text-decoration: none;
  }
  
  .link-icon {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-4);
    font-size: var(--font-size-sm);
  }
`;

// حذف کامپوننت‌های مربوط به دانلود اپلیکیشن
const CTASection = styled.div`
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary), var(--color-secondary));
  padding: var(--spacing-12) 0;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  margin-top: var(--spacing-12);
  
  &:before {
    content: "";
    position: absolute;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    top: -100px;
    right: -100px;
    z-index: 1;
  }
  
  &:after {
    content: "";
    position: absolute;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    bottom: -50px;
    left: -50px;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) 0;
    margin-top: var(--spacing-8);
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-4);
    color: var(--color-white);
    font-weight: 800;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-2xl);
    }
  }
  
  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-8);
    opacity: 0.9;
    
    @media (max-width: 768px) {
      font-size: var(--font-size-base);
      padding: 0 var(--spacing-3);
    }
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--border-radius-full);
  font-weight: 600;
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
  gap: var(--spacing-2);
  min-width: 200px;
  
  &.primary {
    background-color: var(--color-white);
    color: var(--color-primary);
    box-shadow: var(--box-shadow-md);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--box-shadow-lg);
      text-decoration: none;
    }
  }
  
  &.secondary {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--color-white);
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      text-decoration: none;
    }
  }
  
  .button-icon {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-sm);
  }
`;

export default function Home() {
  // اخبار فرضی (در نهایت از API دریافت می‌شود)
  const latestNews = [
    { 
      id: 1, 
      title: 'توصیه‌ امنیتی : هوشیاری نسبت به محیط و افراد ناشناس', 
      date: '1404/03/25',
      category: 'هشدار امنیتی'
    },
    { 
      id: 2, 
      title: 'اطلاعیه: گزارش وسایل نقلیه مشکوک به شماره ۱۱۳', 
      date: '1404/03/26',
      category: 'امنیت عمومی'
    },
    { 
      id: 3, 
      title: 'هیچ نگرانی راجب کمبود بنزین وجود ندارد', 
      date: '1404/03/27',
      category: 'اخبار فوری'
    }
  ];
  
  // شماره‌های اضطراری
  const emergencyNumbers = [
    { name: 'آتش‌نشانی', number: '۱۲۵', icon: 'local_fire_department' },
    { name: 'اورژانس', number: '۱۱۵', icon: 'emergency' },
    { name: 'پلیس', number: '۱۱۰', icon: 'local_police' },
    { name: 'هلال احمر', number: '۱۱۲', icon: 'medical_services' }
  ];

  // خدمات اصلی
  const mainServices = [
    {
      id: 1,
      title: 'یافتن پناهگاه',
      description: 'نزدیک‌ترین پناهگاه‌های امن به موقعیت خود را پیدا کنید و مسیر رسیدن به آن را مشاهده کنید.',
      icon: 'home_work',
      link: '/map'
    },
    {
      id: 2,
      title: 'راهنمای ایمنی',
      description: 'آموزش‌های ضروری برای محافظت از خود و دیگران را در شرایط مختلف اضطراری بیاموزید.',
      icon: 'health_and_safety',
      link: '/safety-guides'
    },
    {
      id: 3,
      title: 'همیاری مردمی',
      description: 'در زمان بحران به کمک یکدیگر بشتابید. درخواست کمک ثبت کنید یا به دیگران کمک کنید.',
      icon: 'volunteer_activism',
      link: '/help'
    },
    {
      id: 4,
      title: 'راستی‌آزمایی',
      description: 'از صحت اخبار و اطلاعات در زمان بحران اطمینان حاصل کنید و از انتشار شایعات جلوگیری کنید.',
      icon: 'fact_check',
      link: '/fact-check'
    },
    {
      id: 5,
      title: 'سلامت روان',
      description: 'از ابزارها و راهنماهای حفظ آرامش و سلامت روان در شرایط بحرانی استفاده کنید.',
      icon: 'psychology',
      link: '/mental-health'
    },
    {
      id: 6,
      title: 'اخبار و هشدارها',
      description: 'از آخرین اخبار، هشدارها و توصیه‌های امنیتی برای حفظ ایمنی خود و خانواده‌تان مطلع شوید.',
      icon: 'campaign',
      link: '/news'
    }
  ];

  return (
    <>
      <Head>
        <title>پناهگاه امن - صفحه اصلی</title>
        <meta name="description" content="سامانه جامع مدیریت بحران و اطلاع‌رسانی به شهروندان برای افزایش آمادگی و تاب‌آوری جامعه در برابر شرایط اضطراری" />
      </Head>
      
      <div className="container">
        <HeroSection>
          <StatusIndicator className="alert">وضعیت: هشدار امنیتی</StatusIndicator>
          <div className="hero-content">
            <h1>پناهگاه امن</h1>
            <p className="lead">سامانه جامع مدیریت بحران و اطلاع‌رسانی به شهروندان</p>
            <p>با استفاده از خدمات پناهگاه امن، آمادگی خود را در برابر شرایط اضطراری افزایش دهید و به افزایش تاب‌آوری جامعه کمک کنید.</p>
            <HeroButtons>
              <HeroButton href="/map" className="primary">
                <span className="material-symbols-rounded button-icon">location_on</span>
                یافتن نزدیک‌ترین پناهگاه
              </HeroButton>
              <HeroButton href="/safety-guides" className="secondary">
                <span className="material-symbols-rounded button-icon">health_and_safety</span>
                راهنمای ایمنی
              </HeroButton>
            </HeroButtons>
          </div>
        </HeroSection>
        
        {/* خدمات اصلی */}
        <ServicesSection>
          <SectionHeader>
            <h2>خدمات پناهگاه امن</h2>
            <p>مجموعه‌ای از ابزارها و خدمات برای افزایش آمادگی شما در برابر شرایط اضطراری</p>
          </SectionHeader>
          
          <CardsGrid>
            {mainServices.map(service => (
              <FeatureCard key={service.id}>
                <CardIcon>
                  <span className="material-symbols-rounded icon">{service.icon}</span>
                </CardIcon>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <StyledLink href={service.link}>
                  مشاهده
                  <span className="material-symbols-rounded link-icon">arrow_forward</span>
                </StyledLink>
              </FeatureCard>
            ))}
          </CardsGrid>
        </ServicesSection>
        
        {/* بخش اخبار و شماره‌های اضطراری */}
        <ContentSection>
          <div className="container">
            <ContentGrid>
              {/* آخرین اخبار */}
              <section>
                <SectionHeader>
                  <h2>آخرین اخبار و هشدارها</h2>
                </SectionHeader>
                
                {/* هشدار امنیتی ویژه */}
                <SecurityAlertCard>
                  <div className="alert-icon">
                    <span className="material-symbols-rounded">warning</span>
                  </div>
                  <div className="alert-content">
                    <h3>هشدار امنیتی ضروری</h3>
                    <p>با توجه به شرایط جنگی فعلی، آمادگی خود را برای واکنش‌های اضطراری حفظ کنید. محل پناهگاه‌های نزدیک را شناسایی و مسیر رسیدن به آنها را مشخص نمایید. به هشدارهای پدافند هوایی توجه کنید.</p>
                    <Link href="/news" className="alert-link">
                      مشاهده دستورالعمل‌های ایمنی در شرایط جنگی
                      <span className="material-symbols-rounded">arrow_forward</span>
                    </Link>
                  </div>
                </SecurityAlertCard>
                
                <NewsList>
                  {latestNews.map(news => (
                    <NewsCard key={news.id}>
                      <span className="news-category">{news.category}</span>
                      <h4>{news.title}</h4>
                      <div className="news-date">
                        <span className="material-symbols-rounded date-icon">calendar_today</span>
                        {news.date}
                      </div>
                    </NewsCard>
                  ))}
                  <div className="text-center">
                    <ViewAllLink href="/news">
                      مشاهده همه اخبار و هشدارها
                      <span className="material-symbols-rounded link-icon">arrow_forward</span>
                    </ViewAllLink>
                  </div>
                </NewsList>
              </section>
              
              {/* شماره‌های اضطراری */}
              <section>
                <SectionHeader>
                  <h2>شماره‌های اضطراری</h2>
                </SectionHeader>
                <EmergencyContactsCard>
                  <div className="card-content">
                    <div className="card-title">
                      <span className="material-symbols-rounded emergency-icon">emergency</span>
                      <h3>تماس‌های ضروری</h3>
                    </div>
                    {emergencyNumbers.map((item, index) => (
                      <EmergencyContact key={index}>
                        <div className="contact-info">
                          <span className="material-symbols-rounded contact-icon">{item.icon}</span>
                          <span className="contact-title">{item.name}</span>
                        </div>
                        <a href={`tel:${item.number}`} className="contact-number">{item.number}</a>
                      </EmergencyContact>
                    ))}
                  </div>
                </EmergencyContactsCard>
              </section>
            </ContentGrid>
          </div>
        </ContentSection>
        
        {/* بخش CTA */}
        <CTASection>
          <div className="container">
            <CTAContent>
              <h2>آمادگی در شرایط جنگی</h2>
              <p>در شرایط فعلی، آگاهی از محل پناهگاه‌ها و نکات ایمنی می‌تواند جان شما و خانواده‌تان را نجات دهد. با استفاده از ابزارهای پناهگاه امن، موقعیت پناهگاه‌های نزدیک خود را شناسایی کنید و با اقدامات پیشگیرانه، آمادگی خود را افزایش دهید.</p>
              <CTAButtons>
                <CTAButton href="/map" className="primary">
                  <span className="material-symbols-rounded button-icon">location_on</span>
                  یافتن نزدیک‌ترین پناهگاه
                </CTAButton>
                <CTAButton href="/news" className="secondary">
                  <span className="material-symbols-rounded button-icon">shield</span>
                  توصیه‌های امنیتی ضروری
                </CTAButton>
              </CTAButtons>
            </CTAContent>
          </div>
        </CTASection>
      </div>
    </>
  );
}