import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';

// انیمیشن‌ها
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// کامپوننت‌های استایل شده
const MainContainer = styled.div`
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
  
  h1 {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    animation: ${fadeIn} 0.8s ease forwards;
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
  
  p {
    max-width: 800px;
    margin: 1rem auto;
    color: var(--color-gray-600);
    font-size: 1.2rem;
    line-height: 1.8;
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.2s;
    opacity: 0;
    animation-fill-mode: forwards;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const HeroBanner = styled.div`
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease forwards;
  
  &:before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.8s ease forwards;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.3rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.8;
    opacity: 0.9;
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.2s;
    opacity: 0;
    animation-fill-mode: forwards;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }
  
  .hero-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    color: white;
    opacity: 0.9;
    animation: ${pulse} 3s infinite ease-in-out;
    
    @media (max-width: 768px) {
      font-size: 3.5rem;
    }
  }
`;

const QuickTips = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const QuickTip = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  width: calc(33.333% - 1rem);
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: calc(var(--index) * 0.15s);
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .tip-icon {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: var(--color-gray-800);
  }
  
  p {
    color: var(--color-gray-600);
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  @media (max-width: 992px) {
    width: calc(50% - 1rem);
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const SectionContainer = styled.section`
  margin-bottom: 4rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
  opacity: 0;
  animation-fill-mode: forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin: 0;
  padding: 1.5rem;
  background-color: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  
  .icon {
    margin-left: 0.75rem;
    color: var(--color-primary);
    font-size: 1.75rem;
  }
`;

const SectionContent = styled.div`
  padding: 1.5rem;
`;

const TechniquesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TechniqueItem = styled.li`
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-primary-light), var(--color-primary));
    opacity: 0.7;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow);
  }
  
  h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-top: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    .check-icon {
      color: #4CAF50;
      margin-left: 0.5rem;
      font-size: 1.4rem;
    }
  }
  
  p {
    margin: 0.5rem 0;
    color: var(--color-gray-700);
    line-height: 1.6;
  }
  
  ul {
    padding-right: 1.5rem;
    margin: 0.75rem 0;
    
    li {
      margin-bottom: 0.5rem;
      position: relative;
      
      &:before {
        content: "•";
        color: var(--color-primary);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-right: -1em;
      }
    }
  }
  
  .steps {
    margin-top: 1rem;
    
    .step {
      margin: 0.5rem 0;
      display: flex;
      align-items: flex-start;
      
      &:hover .number {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      }
      
      .number {
        background-color: var(--color-primary-light);
        color: var(--color-primary);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: bold;
        margin-left: 0.75rem;
        flex-shrink: 0;
        transition: all 0.2s ease;
      }
    }
  }
`;

const ContactCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-right: 4px solid var(--color-primary);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: var(--color-gray-700);
  }
  
  .phone {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--color-primary);
    display: block;
    margin: 0.75rem 0;
    padding: 0.5rem;
    border-radius: 6px;
    background-color: rgba(var(--color-primary-rgb), 0.05);
    text-align: center;
  }
  
  .hours {
    font-size: 0.9rem;
    color: var(--color-gray-500);
    display: block;
  }
  
  .sources {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-gray-400);
  }
  
  .action-container {
    margin-top: 1rem;
    text-align: center;
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .call-icon {
    margin-left: 0.5rem;
    font-size: 1.1rem;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }
  
  .help-icon {
    font-size: 24px;
  }
  
  @media print {
    display: none;
  }
`;

const FloatingMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 100px;
  left: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 99;
  transition: all 0.3s ease;
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(20px)'};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: var(--color-gray-700);
    padding: 0.5rem;
    width: 100%;
    text-align: right;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 5px;
    
    &:hover {
      background-color: var(--color-gray-100);
      color: var(--color-primary);
    }
    
    .action-icon {
      margin-left: 0.75rem;
      color: var(--color-primary);
    }
  }
  
  @media print {
    display: none;
  }
`;

const PrintableHeader = styled.div`
  display: none;
  
  @media print {
    display: block;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    
    h1 {
      font-size: 24pt;
      color: black;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 12pt;
      color: #555;
    }
  }
`;

const PrintStyles = styled.div`
  @media print {
    .no-print {
      display: none !important;
    }
    
    * {
      color: black !important;
      box-shadow: none !important;
    }
    
    h2, h3 {
      page-break-after: avoid;
    }
    
    li, p {
      page-break-inside: avoid;
    }
    
    html, body {
      width: 210mm;
      height: 297mm;
    }
  }
`;

// Function to format phone number for tel: links
const formatPhoneForCall = (phone: string): string => {
  // Remove any non-digit characters
  return `tel:${phone.replace(/\D/g, '')}`;
};

// Defining the missing components
const HelplineSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--color-primary-rgb), 0.1) 0%, rgba(var(--color-primary-rgb), 0) 70%);
  }
  
  h2 {
    font-size: 1.8rem;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;
    display: inline-block;
    
    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, var(--color-primary-light), var(--color-primary));
      border-radius: 1.5px;
    }
  }
  
  > p {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--color-gray-600);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HelplineCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const EmergencySupportBox = styled.div`
  background: linear-gradient(135deg, #FFEBEE, #FFCDD2);
  border-radius: var(--border-radius);
  padding: 1.75rem;
  margin-top: 2.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(211, 47, 47, 0.1);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 50px 50px 0;
    border-color: transparent rgba(211, 47, 47, 0.2) transparent transparent;
  }
  
  h3 {
    color: #D32F2F;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    
    .warning-icon {
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
  }
  
  ul {
    margin: 0;
    padding-right: 1.5rem;
  }
  
  li {
    margin-bottom: 0.75rem;
    color: var(--color-gray-800);
    font-size: 1.05rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// Progress bar
const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 1000;
  
  @media print {
    display: none;
  }
`;

// Section navigation
const SectionNav = styled.div`
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 992px) {
    display: none;
  }
  
  @media print {
    display: none;
  }
`;

const NavDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.2);
    
    &:after {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &:after {
    content: attr(data-label);
    position: absolute;
    left: 20px;
    top: -3px;
    background-color: var(--color-primary);
    color: white;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
`;

// Feedback form
const FeedbackButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 90;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .feedback-icon {
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
  
  @media print {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    
    span:not(.feedback-icon) {
      display: none;
    }
  }
`;

// Defining sections for navigation
interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'top', label: 'ابتدای صفحه' },
  { id: 'section-1', label: 'تکنیک‌های فوری' },
  { id: 'section-2', label: 'مراقبت‌های روزمره' },
  { id: 'section-3', label: 'حرف زدن' },
  { id: 'section-4', label: 'تغذیه و خواب' },
  { id: 'section-5', label: 'امید و معنا' },
  { id: 'helplines', label: 'خطوط تماس' },
];

const MentalHealth = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handlePrint = () => {
    setIsMenuOpen(false);
    window.print();
  };
  
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle scroll for progress bar and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const newProgress = (scrollPosition / totalHeight);
      setProgress(newProgress);
      
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${newProgress})`;
      }
      
      // Determine active section based on scroll position
      const sectionElements = sections.map(section => 
        section.id === 'top' ? { id: section.id, top: 0 } : 
        { id: section.id, top: document.querySelector(`#${section.id}`)?.getBoundingClientRect().top || 0 }
      );
      
      const activeSections = sectionElements.filter(section => section.top <= 100);
      if (activeSections.length > 0) {
        setActiveSection(activeSections[activeSections.length - 1].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const menu = document.querySelector('#floating-menu');
      const button = document.querySelector('#floating-button');
      
      if (isMenuOpen && menu && button && !menu.contains(target) && !button.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  return (
    <>
      <Head>
        <title>حمایت روانی - پناهگاه امن</title>
        <meta name="description" content="منابع و ابزارهای حمایت روانی برای مقابله با استرس و اضطراب در شرایط بحران" />
      </Head>
      
      {/* Progress bar */}
      <ProgressBar ref={progressBarRef} />
      
      {/* Section navigation */}
      <SectionNav>
        {sections.map(section => (
          <NavDot 
            key={section.id} 
            active={activeSection === section.id} 
            data-label={section.label}
            onClick={() => scrollToSection(section.id)}
          />
        ))}
      </SectionNav>
      
      <PrintStyles />
      
      <PrintableHeader>
        <h1>راهنمای سلامت روان در شرایط بحران</h1>
        <p>منابع و ابزارهای حمایت روانی - پناهگاه امن</p>
      </PrintableHeader>
      
      <MainContainer>
        <PageHeader className="no-print" id="top">
          <h1>حمایت روانی</h1>
          <p>راهنمای جامع برای مراقبت از سلامت روان خود و عزیزانتان در شرایط بحران</p>
        </PageHeader>
        
        <HeroBanner className="no-print">
          <HeroContent>
            <span className="material-symbols-rounded hero-icon">psychology</span>
            <h2>آرامش خود را حفظ کنید</h2>
            <p>در شرایط بحران، مراقبت از سلامت روان به اندازه سلامت جسمی اهمیت دارد. با استفاده از روش‌های زیر می‌توانید به خود و عزیزانتان کمک کنید تا آرامش بیشتری داشته باشید.</p>
          </HeroContent>
        </HeroBanner>
        
        <QuickTips className="no-print">
          <QuickTip style={{"--index": 1} as React.CSSProperties}>
            <span className="material-symbols-rounded tip-icon">air</span>
            <h3>تنفس عمیق</h3>
            <p>۴ ثانیه دم، ۷ ثانیه نگه داشتن، ۸ ثانیه بازدم - این تکنیک ساده می‌تواند به سرعت سطح استرس را کاهش دهد.</p>
          </QuickTip>
          
          <QuickTip style={{"--index": 2} as React.CSSProperties}>
            <span className="material-symbols-rounded tip-icon">schedule</span>
            <h3>روتین منظم</h3>
            <p>ایجاد یک برنامه روزانه منظم به شما احساس کنترل و ثبات می‌دهد، حتی در شرایط نامطمئن.</p>
          </QuickTip>
          
          <QuickTip style={{"--index": 3} as React.CSSProperties}>
            <span className="material-symbols-rounded tip-icon">forum</span>
            <h3>صحبت کنید</h3>
            <p>بیان احساسات و نگرانی‌ها با افراد مورد اعتماد می‌تواند بار روانی را کاهش دهد.</p>
          </QuickTip>
        </QuickTips>
        
        {/* بخش ۱: تکنیک‌های فوری کاهش استرس */}
        <SectionContainer id="section-1" style={{"--index": 1} as React.CSSProperties}>
          <SectionTitle>
            <span className="material-symbols-rounded icon">sprint</span>
            بخش ۱: تکنیک‌های فوری کاهش استرس
          </SectionTitle>
          <SectionContent>
            <TechniquesList>
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">check_circle</span>
                  تنفس عمیق (تنفس ۴-۷-۸)
                </h3>
                <p>تکنیک تنفس عمیق یکی از موثرترین روش‌های کاهش استرس فوری است:</p>
                <div className="steps">
                  <div className="step">
                    <span className="number">۱</span>
                    <span>۴ ثانیه دم - هوا را از بینی به داخل ببرید</span>
                  </div>
                  <div className="step">
                    <span className="number">۲</span>
                    <span>۷ ثانیه نگه داشتن - نفس را در سینه نگه دارید</span>
                  </div>
                  <div className="step">
                    <span className="number">۳</span>
                    <span>۸ ثانیه بازدم - هوا را به آرامی از دهان خارج کنید</span>
                  </div>
                </div>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">check_circle</span>
                  محدود کردن مصرف اخبار
                </h3>
                <p>مصرف بیش از حد اخبار می‌تواند سطح استرس را افزایش دهد:</p>
                <ul>
                  <li>روزی فقط یک‌بار اخبار را چک کنید</li>
                  <li>تنها از منابع معتبر استفاده کنید</li>
                  <li>بعد از ساعت ۷ شب از چک کردن اخبار خودداری کنید</li>
                </ul>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">check_circle</span>
                  تکنیک grounding (زمین‌گیری ذهنی)
                </h3>
                <p>این تکنیک به شما کمک می‌کند تا در لحظه حال بمانید و از افکار اضطراب‌آور دور شوید:</p>
                <div className="steps">
                  <div className="step">
                    <span className="number">۵</span>
                    <span>۵ چیزی که می‌بینی را نام ببر</span>
                  </div>
                  <div className="step">
                    <span className="number">۴</span>
                    <span>۴ چیزی که لمس می‌کنی را حس کن</span>
                  </div>
                  <div className="step">
                    <span className="number">۳</span>
                    <span>۳ چیزی که می‌شنوی را تشخیص بده</span>
                  </div>
                  <div className="step">
                    <span className="number">۲</span>
                    <span>۲ چیزی که بو می‌کنی را مشخص کن</span>
                  </div>
                  <div className="step">
                    <span className="number">۱</span>
                    <span>۱ چیزی که مزه می‌کنی را حس کن</span>
                  </div>
                </div>
              </TechniqueItem>
            </TechniquesList>
          </SectionContent>
        </SectionContainer>
        
        {/* بخش ۲: مراقبت‌های روزمره برای سلامت روان */}
        <SectionContainer id="section-2" style={{"--index": 2} as React.CSSProperties}>
          <SectionTitle>
            <span className="material-symbols-rounded icon">mindfulness</span>
            بخش ۲: مراقبت‌های روزمره برای سلامت روان
          </SectionTitle>
          <SectionContent>
            <TechniquesList>
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">schedule</span>
                  ایجاد یک روتین ثابت
                </h3>
                <p>حتی اگه شرایط بیرونی ناپایداره، داشتن یک روتین روزانه، حس کنترل و امنیت می‌ده.</p>
                <p>سعی کنید برای بیدار شدن، غذا خوردن، کار کردن و خوابیدن ساعات مشخصی را تعیین کنید.</p>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">directions_walk</span>
                  پیاده‌روی کوتاه یا ورزش سبک
                </h3>
                <p>فعالیت فیزیکی حتی به مدت کوتاه می‌تواند تأثیر زیادی در کاهش استرس داشته باشد:</p>
                <ul>
                  <li>حداقل ۱۵ دقیقه در روز ورزش کنید</li>
                  <li>پیاده‌روی، کشش یا حرکات ساده یوگا در خانه</li>
                  <li>بالا و پایین رفتن از پله‌ها نیز موثر است</li>
                </ul>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">edit_note</span>
                  نوشتن احساسات
                </h3>
                <p>تخلیه روانی با نوشتن، خیلی کمک می‌کنه—حتی با موبایل</p>
                <p>روزانه ۵ دقیقه احساسات، نگرانی‌ها و همچنین نکات مثبت روزتان را یادداشت کنید.</p>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">phone_locked</span>
                  فاصله از موبایل و شبکه‌های اجتماعی
                </h3>
                <p>مدیریت مصرف رسانه‌ها به کاهش اضطراب کمک می‌کند:</p>
                <ul>
                  <li>خاموش کردن نوتیف‌ها</li>
                  <li>حذف موقت اپ‌های شبکه‌های اجتماعی</li>
                  <li>تعیین ساعت مشخص برای چک کردن پیام‌ها</li>
                </ul>
              </TechniqueItem>
            </TechniquesList>
          </SectionContent>
        </SectionContainer>
        
        {/* بخش ۳: حرف بزن – سکوت خطرناکه */}
        <SectionContainer id="section-3" style={{"--index": 3} as React.CSSProperties}>
          <SectionTitle>
            <span className="material-symbols-rounded icon">chat</span>
            بخش ۳: حرف بزن – سکوت خطرناکه
          </SectionTitle>
          <SectionContent>
            <TechniquesList>
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">group</span>
                  گفت‌وگو با آدمای امن
                </h3>
                <p>صحبت با افرادی که به آنها اعتماد دارید می‌تواند بار روانی را کاهش دهد.</p>
                <p>به دنبال قضاوت نباشید، بلکه فقط نیاز دارید کسی به حرف‌هایتان گوش دهد.</p>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">headphones</span>
                  تماس صوتی یا تصویری
                </h3>
                <p>با کسی که حالت باهاش بهتر می‌شه تماس بگیرید.</p>
                <p>دیدن یا شنیدن صدای یک فرد آشنا می‌تواند تأثیر زیادی در کاهش تنهایی و استرس داشته باشد.</p>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">psychiatry</span>
                  مشورت با روان‌درمانگر
                </h3>
                <p>در صورت نیاز، از کمک حرفه‌ای دریغ نکنید (حتی آنلاین)</p>
                <p>بسیاری از متخصصان در شرایط بحران، خدمات مشاوره رایگان یا با تخفیف ارائه می‌دهند.</p>
              </TechniqueItem>
            </TechniquesList>
          </SectionContent>
        </SectionContainer>
        
        {/* بخش ۴: نقش تغذیه و خواب */}
        <SectionContainer id="section-4" style={{"--index": 4} as React.CSSProperties}>
          <SectionTitle>
            <span className="material-symbols-rounded icon">restaurant</span>
            بخش ۴: نقش تغذیه و خواب
          </SectionTitle>
          <SectionContent>
            <TechniquesList>
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">lunch_dining</span>
                  غذای سبک و مقوی
                </h3>
                <p>تغذیه مناسب تأثیر مستقیمی بر سلامت روان دارد:</p>
                <ul>
                  <li>مصرف مواد حاوی امگا۳ (ماهی، گردو)</li>
                  <li>غذاهای غنی از ویتامین B (غلات کامل، تخم‌مرغ)</li>
                  <li>مغزها و سبزیجات تازه</li>
                </ul>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">bed</span>
                  خواب منظم
                </h3>
                <p>سعی کن یک ساعت مشخص بخوابی، حتی اگه خوابت نمی‌بره—مغز کم‌کم عادت می‌کنه</p>
                <p>ایجاد روتین قبل از خواب مانند مطالعه، نوشتن یا نوشیدن چای آرامبخش می‌تواند کمک کننده باشد.</p>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">coffee</span>
                  محدود کردن کافئین
                </h3>
                <p>مصرف کافئین به خصوص بعد از ظهر می‌تواند کیفیت خواب را مختل کند:</p>
                <ul>
                  <li>بعد از ساعت ۲ بعدازظهر قهوه، چای پررنگ یا نوشابه‌های انرژی‌زا ننوشید</li>
                  <li>به جای آن از دمنوش‌های گیاهی استفاده کنید</li>
                </ul>
              </TechniqueItem>
            </TechniquesList>
          </SectionContent>
        </SectionContainer>
        
        {/* بخش ۵: امید و معنا */}
        <SectionContainer id="section-5" style={{"--index": 5} as React.CSSProperties}>
          <SectionTitle>
            <span className="material-symbols-rounded icon">self_improvement</span>
            بخش ۵: امید و معنا
          </SectionTitle>
          <SectionContent>
            <TechniquesList>
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">candle</span>
                  فعالیت‌های معنادار و روحانی
                </h3>
                <p>ارتباط با ارزش‌های عمیق‌تر زندگی می‌تواند منبع قدرت درونی باشد:</p>
                <ul>
                  <li>دعا و نیایش</li>
                  <li>مدیتیشن</li>
                  <li>گوش دادن به موسیقی آرامش‌بخش</li>
                </ul>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">volunteer_activism</span>
                  تمرکز روی کارهای کوچیک مفید
                </h3>
                <p>انجام کارهای کوچک اما مفید حس ارزشمندی ایجاد می‌کند:</p>
                <ul>
                  <li>کمک به یک نفر، حتی با یک پیام دلگرم‌کننده</li>
                  <li>یاد گرفتن یه چیز جدید</li>
                  <li>انجام یک کار خلاقانه کوچک</li>
                </ul>
              </TechniqueItem>
              
              <TechniqueItem>
                <h3>
                  <span className="material-symbols-rounded check-icon">now_widgets</span>
                  تمرکز روی لحظه حال
                </h3>
                <p>نه گذشته، نه آینده—فقط همین الان</p>
                <p>تمرین حضور ذهن و توجه به جزئیات لحظه فعلی می‌تواند ذهن را از نگرانی‌های مداوم رها کند.</p>
              </TechniqueItem>
            </TechniquesList>
          </SectionContent>
        </SectionContainer>
        
        {/* خطوط تلفنی و مراکز حمایتی */}
        <HelplineSection id="helplines">
          <h2>خطوط تلفنی و مراکز حمایتی رایگان</h2>
          <p>اگر خیلی تحت فشار هستید یا به کمک تخصصی نیاز دارید، از تماس با خطوط حمایتی دریغ نکنید. این خدمات معمولاً رایگان و محرمانه هستند.</p>
          
          <HelplineCards>
            <ContactCard>
              <h3>خط اورژانس اجتماعی – ۱۲۳</h3>
              <p>تحت نظر بهزیستی، ۲۴ ساعته در دسترسه برای بحران خودکشی، آسیب‌های اجتماعی و مشاوره روانی اولیه</p>
              <span className="phone">۱۲۳</span>
              <span className="hours">۲۴ ساعته - ۷ روز هفته</span>
              <div className="sources">منابع: isna.ir, huzuracad.ir, en.wikipedia.org</div>
              <div className="action-container">
                <CallButton href={formatPhoneForCall("123")}>
                  <span className="material-symbols-rounded call-icon">call</span>
                  تماس با این شماره
                </CallButton>
              </div>
            </ContactCard>
            
            <ContactCard>
              <h3>صدای مشاور بهزیستی – ۱۴۸۰</h3>
              <p>تماس از ۸ صبح تا نیمه‌شب؛ مشاوره تلفنی روانشناسی برای مشکلات روزمره مثل استرس، اضطراب، روابط خانوادگی و غیره</p>
              <span className="phone">۱۴۸۰</span>
              <span className="hours">۸ صبح تا نیمه‌شب - همه روزه</span>
              <div className="sources">منابع: behzisti.ir, huzuracad.ir, isna.ir</div>
              <div className="action-container">
                <CallButton href={formatPhoneForCall("1480")}>
                  <span className="material-symbols-rounded call-icon">call</span>
                  تماس با این شماره
                </CallButton>
              </div>
            </ContactCard>
            
            <ContactCard>
              <h3>سامانه وزارت بهداشت (۴۰۳۰)</h3>
              <p>۲۴ ساعته، تخصصی در زمینه کرونا، ولی همچنین برای سوگ، اضطراب، افسردگی و حتی پیشگیری از خودکشی فعال است</p>
              <span className="phone">۴۰۳۰</span>
              <span className="hours">۲۴ ساعته - ۷ روز هفته</span>
              <div className="sources">منابع: huzuracad.ir, en.wikipedia.org</div>
              <div className="action-container">
                <CallButton href={formatPhoneForCall("4030")}>
                  <span className="material-symbols-rounded call-icon">call</span>
                  تماس با این شماره
                </CallButton>
              </div>
            </ContactCard>
            
            <ContactCard>
              <h3>خط ویژه مشاوره آموزش‌وپرورش – ۱۵۷۰</h3>
              <p>مخصوص دانش‌آموزان و والدین؛ از ۸ صبح تا ۸ شب درباره مسائل تحصیلی و روانی کودکان و نوجوانان هستش</p>
              <span className="phone">۱۵۷۰</span>
              <span className="hours">۸ صبح تا ۸ شب - همه روزه</span>
              <div className="sources">منابع: iranpa.org, huzuracad.ir, isna.ir</div>
              <div className="action-container">
                <CallButton href={formatPhoneForCall("1570")}>
                  <span className="material-symbols-rounded call-icon">call</span>
                  تماس با این شماره
                </CallButton>
              </div>
            </ContactCard>
            
            <ContactCard>
              <h3>مرکز ره‌آوا (روزبه تهران) – ۵۴۴۶۷۰۰۰</h3>
              <p>وابسته به بیمارستان روزبه، همه‌روزه از ۱۴ تا ۲۴ برای مداخله در بحران‌های شدید روانی (خودکشی، بحران شدید)</p>
              <span className="phone">۵۴۴۶۷۰۰۰</span>
              <span className="hours">۱۴ تا ۲۴ - همه روزه</span>
              <div className="sources">منبع: huzuracad.ir</div>
              <div className="action-container">
                <CallButton href={formatPhoneForCall("54467000")}>
                  <span className="material-symbols-rounded call-icon">call</span>
                  تماس با این شماره
                </CallButton>
              </div>
            </ContactCard>
            
            <ContactCard>
              <h3>Iran Crisis Text Line – پیام‌رسانی ۲۴/۷</h3>
              <p>سامانه متن‌محور برای بحران و پیشگیری از خودکشی، رایگان و محرمانه</p>
              <span className="phone">خدمات پیامکی</span>
              <span className="hours">۲۴ ساعته - ۷ روز هفته</span>
              <div className="sources">منابع: darmankade.com, findahelpline.com</div>
            </ContactCard>
          </HelplineCards>
          
          <EmergencySupportBox>
            <h3>
              <span className="material-symbols-rounded warning-icon">warning</span>
              اگر خیلی تحت فشار هستی:
            </h3>
            <ul>
              <li>با کسی صحبت کن—حتی پیام دادن به دوست</li>
              <li>با شماره‌های حمایتی روانی تماس بگیر</li>
              <li>نترس از این‌که بگی "حال روانیم خوب نیست"</li>
            </ul>
          </EmergencySupportBox>
        </HelplineSection>
      </MainContainer>
      
      {/* Floating help button */}
      <FloatingButton id="floating-button" onClick={toggleMenu}>
        <span className="material-symbols-rounded help-icon">help</span>
      </FloatingButton>
      
      {/* Floating menu */}
      <FloatingMenu id="floating-menu" isOpen={isMenuOpen}>
        <ul>
          <li>
            <button onClick={() => scrollToSection('top')}>
              <span className="material-symbols-rounded action-icon">arrow_upward</span>
              بازگشت به بالای صفحه
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('helplines')}>
              <span className="material-symbols-rounded action-icon">call</span>
              خطوط تلفنی اضطراری
            </button>
          </li>
          <li>
            <button onClick={handlePrint}>
              <span className="material-symbols-rounded action-icon">print</span>
              چاپ راهنما
            </button>
          </li>
        </ul>
      </FloatingMenu>
      
      {/* Feedback button */}
      <FeedbackButton onClick={() => alert('نظر شما برای ما ارزشمند است. در آینده امکان ارائه بازخورد در این بخش اضافه خواهد شد.')}>
        <span>ارسال بازخورد</span>
        <span className="material-symbols-rounded feedback-icon">thumbs_up_down</span>
      </FeedbackButton>
    </>
  );
};

export default MentalHealth;