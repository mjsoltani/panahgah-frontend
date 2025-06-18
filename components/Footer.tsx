import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background-color: var(--color-gray-900);
  color: var(--color-gray-300);
  padding: var(--spacing-16) 0 var(--spacing-8);
  margin-top: auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary));
    background-size: 200% 100%;
    animation: gradient 8s ease infinite;
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-8);
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  color: var(--color-white);
  margin-bottom: var(--spacing-6);
  font-size: var(--font-size-lg);
  position: relative;
  padding-bottom: var(--spacing-3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--color-primary);
    border-radius: var(--border-radius-full);
  }
`;

const FooterLink = styled(Link)`
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-3);
  transition: color var(--transition-normal);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  &:hover {
    color: var(--color-primary-light);
    text-decoration: none;
    transform: translateX(var(--spacing-1));
  }
  
  .link-icon {
    font-size: 1.2rem;
    color: var(--color-gray-500);
  }
`;

const ExternalLink = styled.a`
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-3);
  transition: color var(--transition-normal);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  &:hover {
    color: var(--color-primary-light);
    text-decoration: none;
  }
  
  .link-icon {
    font-size: 1.2rem;
    color: var(--color-gray-500);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-6);
  margin-top: var(--spacing-10);
  text-align: center;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

const FooterDescription = styled.p`
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-6);
  line-height: 1.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-300);
  transition: all var(--transition-normal);
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
    transform: translateY(-3px);
  }
  
  .social-icon {
    font-size: 1.2rem;
  }
`;

const AppBadge = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: var(--spacing-3) var(--spacing-4);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-3);
  transition: all var(--transition-normal);
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .app-icon {
    font-size: 2rem;
    color: var(--color-white);
  }
  
  .app-text {
    display: flex;
    flex-direction: column;
    
    .app-store {
      font-size: var(--font-size-xs);
      color: var(--color-gray-400);
    }
    
    .app-name {
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-white);
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterGrid>
          <FooterColumn>
            <FooterTitle>پناهگاه امن</FooterTitle>
            <FooterDescription>
              سامانه جامع مدیریت بحران و اطلاع‌رسانی به شهروندان برای افزایش آمادگی و تاب‌آوری جامعه در برابر شرایط اضطراری.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="#" aria-label="Instagram">
                <span className="material-symbols-rounded social-icon">photo_camera</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <span className="material-symbols-rounded social-icon">flutter_dash</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Telegram">
                <span className="material-symbols-rounded social-icon">send</span>
              </SocialLink>
              <SocialLink href="#" aria-label="YouTube">
                <span className="material-symbols-rounded social-icon">smart_display</span>
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>دسترسی سریع</FooterTitle>
            <FooterLink href="/">
              <span className="material-symbols-rounded link-icon">home</span>
              صفحه اصلی
            </FooterLink>
            <FooterLink href="/help">
              <span className="material-symbols-rounded link-icon">volunteer_activism</span>
              همیاری مردمی
            </FooterLink>
            <FooterLink href="/safety-guides">
              <span className="material-symbols-rounded link-icon">health_and_safety</span>
              راهنمای ایمنی
            </FooterLink>
            <FooterLink href="/map">
              <span className="material-symbols-rounded link-icon">location_on</span>
              نقشه منابع
            </FooterLink>
            <FooterLink href="/fact-check">
              <span className="material-symbols-rounded link-icon">fact_check</span>
              راستی‌آزمایی
            </FooterLink>
            <FooterLink href="/mental-health">
              <span className="material-symbols-rounded link-icon">psychology</span>
              سلامت روان
            </FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>شماره‌های اضطراری</FooterTitle>
            <ExternalLink href="tel:125">
              <span className="material-symbols-rounded link-icon">local_fire_department</span>
              آتش‌نشانی: ۱۲۵
            </ExternalLink>
            <ExternalLink href="tel:115">
              <span className="material-symbols-rounded link-icon">emergency</span>
              اورژانس: ۱۱۵
            </ExternalLink>
            <ExternalLink href="tel:110">
              <span className="material-symbols-rounded link-icon">local_police</span>
              پلیس: ۱۱۰
            </ExternalLink>
            <ExternalLink href="tel:112">
              <span className="material-symbols-rounded link-icon">medical_services</span>
              هلال احمر: ۱۱۲
            </ExternalLink>
          </FooterColumn>
        </FooterGrid>
        
        <FooterBottom>
          <p>تمامی حقوق محفوظ است &copy; {currentYear} پناهگاه امن | طراحی و توسعه با ❤️ برای ایران</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer; 