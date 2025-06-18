import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// کامپوننت‌های استایل شده
const MainContainer = styled.div`
  padding: 3rem 0;
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  
  h1 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    font-family: inherit;
    
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
    font-size: 1.2rem;
    line-height: 1.6;
    font-family: inherit;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
    
    h1 {
      font-size: var(--font-size-3xl);
    }
    
    p {
      font-size: var(--font-size-base);
      margin-top: 1.5rem;
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
      font-family: inherit;
      
      @media (max-width: 768px) {
        font-size: var(--font-size-2xl);
      }
    }
    
    p {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-6);
      opacity: 0.9;
      line-height: 1.7;
      font-family: inherit;
      
      @media (max-width: 768px) {
        font-size: var(--font-size-base);
      }
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

const SectionContainer = styled.div`
  margin-bottom: var(--spacing-10);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-6);
  }
`;

const Section = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  margin-bottom: var(--spacing-6);
  transition: all var(--transition-normal);
  border: 1px solid var(--color-gray-200);
  
  &:hover {
    box-shadow: var(--box-shadow-lg);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-4);
  }
`;

const SectionHeader = styled.button<{ color: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-5) var(--spacing-6);
  background-color: var(--color-white);
  border: none;
  text-align: right;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-family: inherit;
  
  &:hover {
    background-color: var(--color-gray-50);
  }
  
  .icon-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
    margin-left: var(--spacing-4);
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    
    .material-symbols-rounded {
      font-size: 32px;
      color: white;
    }
  }
  
  .content {
    flex-grow: 1;
    text-align: right;
  }
  
  h2 {
    font-size: var(--font-size-xl);
    margin: 0 0 var(--spacing-2) 0;
    color: var(--color-gray-800);
    font-family: inherit;
    font-weight: 600;
  }
  
  p {
    font-size: var(--font-size-base);
    color: var(--color-gray-600);
    margin: 0;
    line-height: 1.5;
    font-family: inherit;
  }
  
  .chevron {
    color: var(--color-gray-400);
    width: 24px;
    height: 24px;
    transition: transform var(--transition-normal);
    margin-right: var(--spacing-4);
    
    .material-symbols-rounded {
      font-size: 28px;
    }
  }
  
  &[aria-expanded="true"] .chevron {
    transform: rotate(180deg);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    
    .icon-container {
      width: 48px;
      height: 48px;
      margin-left: var(--spacing-3);
      
      .material-symbols-rounded {
        font-size: 24px;
      }
    }
    
    h2 {
      font-size: var(--font-size-lg);
    }
    
    p {
      font-size: var(--font-size-sm);
    }
    
    .chevron {
      margin-right: var(--spacing-2);
      
      .material-symbols-rounded {
        font-size: 22px;
      }
    }
  }
`;

const SectionContent = styled.div`
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
  font-family: inherit;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`;

const ItemTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin: var(--spacing-5) 0 var(--spacing-3);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  font-family: inherit;
  
  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 20px;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
    margin-left: var(--spacing-3);
    border-radius: var(--border-radius-sm);
  }
  
  .material-symbols-rounded {
    margin-left: var(--spacing-2);
    font-size: 24px;
    color: var(--color-primary);
  }
  
  &:first-child {
    margin-top: 0;
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin: var(--spacing-4) 0 var(--spacing-2);
  }
`;

const ItemList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ItemDetail = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-3);
  color: var(--color-gray-700);
  line-height: 1.6;
  font-size: var(--font-size-base);
  font-family: inherit;
  
  &:before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    margin-left: var(--spacing-3);
    margin-top: 0.5rem;
    flex-shrink: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-2);
  }
`;

const QuickReference = styled.div`
  background: linear-gradient(45deg, rgba(var(--color-danger-rgb), 0.05), rgba(var(--color-warning-rgb), 0.05));
  border: 1px solid rgba(var(--color-danger-rgb), 0.2);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  margin-top: var(--spacing-10);
  box-shadow: var(--box-shadow);
  
  h3 {
    color: var(--color-danger);
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-5);
    font-size: var(--font-size-2xl);
    font-family: inherit;
    
    .material-symbols-rounded {
      margin-left: var(--spacing-3);
      color: var(--color-danger);
      font-size: 28px;
    }
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-6);
  }
  
  h4 {
    color: var(--color-danger-dark);
    margin-bottom: var(--spacing-3);
    font-size: var(--font-size-lg);
    display: flex;
    align-items: center;
    font-family: inherit;
    
    &:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 16px;
      background-color: var(--color-danger);
      margin-left: var(--spacing-2);
      border-radius: var(--border-radius-sm);
    }
  }
  
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  
  li {
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-2);
    position: relative;
    padding-right: var(--spacing-4);
    font-size: var(--font-size-base);
    font-family: inherit;
    
    &:before {
      content: "•";
      position: absolute;
      right: 0;
      color: var(--color-danger);
      font-weight: bold;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    margin-top: var(--spacing-6);
    
    h3 {
      font-size: var(--font-size-xl);
      margin-bottom: var(--spacing-4);
    }
    
    .grid {
      gap: var(--spacing-4);
    }
    
    h4 {
      font-size: var(--font-size-base);
      margin-bottom: var(--spacing-2);
    }
    
    li {
      font-size: var(--font-size-sm);
    }
  }
`;

const SearchContainer = styled.div`
  margin-bottom: var(--spacing-6);
  
  .input-group {
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-sm);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .input-group-text {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    color: var(--color-primary);
    
    .material-symbols-rounded {
      font-size: 20px;
    }
  }
  
  input {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    padding: var(--spacing-3);
    font-size: var(--font-size-base);
    
    &:focus {
      box-shadow: none;
      border-color: var(--color-primary);
    }
  }
`;

const AdditionalTipsSection = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  margin-top: var(--spacing-10);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-gray-200);
  
  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary);
    margin-bottom: var(--spacing-4);
    display: flex;
    align-items: center;
    font-family: inherit;
    
    .material-symbols-rounded {
      margin-left: var(--spacing-3);
      color: var(--color-primary);
    }
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-6);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-4);
    }
  }
  
  .tip-card {
    background-color: var(--color-gray-50);
    border-radius: var(--border-radius);
    padding: var(--spacing-4);
    border-right: 4px solid var(--color-primary);
    
    h4 {
      font-size: var(--font-size-lg);
      color: var(--color-gray-800);
      margin-bottom: var(--spacing-3);
      display: flex;
      align-items: center;
      font-family: inherit;
      
      .material-symbols-rounded {
        margin-left: var(--spacing-2);
        color: var(--color-primary);
      }
    }
    
    p {
      color: var(--color-gray-700);
      font-size: var(--font-size-base);
      line-height: 1.6;
      margin: 0;
      font-family: inherit;
    }
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: var(--spacing-8) var(--spacing-4);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  
  .material-symbols-rounded {
    font-size: 3rem;
    color: var(--color-gray-400);
    margin-bottom: var(--spacing-4);
  }
  
  h3 {
    font-size: var(--font-size-xl);
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-3);
    font-family: inherit;
  }
  
  p {
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-5);
    font-family: inherit;
  }
  
  button {
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--border-radius-full);
    border: 1px solid var(--color-primary);
    background: transparent;
    color: var(--color-primary);
    font-weight: 500;
    transition: all var(--transition-normal);
    font-family: inherit;
    
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
`;

const ChevronDownIcon = () => (
  <span className="material-symbols-rounded">keyboard_arrow_down</span>
);

const ChevronUpIcon = () => (
  <span className="material-symbols-rounded">keyboard_arrow_up</span>
);

// آیکون‌های مورد استفاده برای سرتیترها
const getItemIcon = (title: string) => {
  const iconMap: {[key: string]: string} = {
    // آمادگی قبل از بحران
    'کیف اضطراری (Go-Bag)': 'backpack',
    'تعیین نقطه ملاقات': 'location_on',
    'آماده‌سازی منزل': 'home',
    
    // حین حمله هوایی
    'اقدامات فوری': 'emergency',
    'در آپارتمان': 'apartment',
    'پس از حمله': 'restore',
    
    // کمک‌های اولیه
    'خونریزی': 'healing',
    'سوختگی': 'local_fire_department',
    'شکستگی': 'orthopedics',
    'احیای قلبی-ریوی (CPR)': 'monitor_heart',
    
    // آب و غذا
    'تصفیه آب': 'water_drop',
    'غذاهای مناسب': 'restaurant',
    'ذخیره‌سازی صحیح': 'inventory_2',
    
    // حملات شیمیایی/بیولوژیک
    'علائم هشدار': 'warning',
    'اقدامات فوری شیمیایی': 'emergency',
    'محافظت تنفسی': 'masks',
    
    // ارتباطات اضطراری
    'رادیو': 'radio',
    'پیام‌رسانی': 'message',
    'برنامه‌ریزی ارتباطی': 'schedule',
    
    // تخلیه اضطراری
    'آمادگی برای تخلیه': 'luggage',
    'هنگام تخلیه': 'directions_run',
    'اولویت‌های همراه بردن': 'checklist',
  };
  
  console.log('Getting icon for title:', title);
  const icon = iconMap[title] || 'circle';
  console.log('Icon found:', icon);
  return icon;
};

const SafetyGuide = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('preparation');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      id: 'preparation',
      title: 'آمادگی قبل از بحران',
      icon: () => <span className="material-symbols-rounded icon">inventory_2</span>,
      color: 'var(--color-primary)',
      content: {
        description: 'مهم‌ترین اقدامات برای آماده‌سازی خانواده و منزل قبل از وقوع بحران',
        items: [
          {
            title: 'کیف اضطراری (Go-Bag)',
            details: [
              '۳ روز آب برای هر نفر (۳ لیتر در روز)',
              'غذاهای غیرفاسدشدنی (کنسرو، بیسکویت، نان خشک)',
              'داروهای ضروری خانواده',
              'کپی اسناد مهم در کیسه ضدآب',
              'چراغ قوه و باتری اضافی',
              'رادیو کوچک',
              'کیت کمک‌های اولیه',
              'لباس گرم و پتو',
              'پول نقد',
              'شماره‌های تماس مهم روی کاغذ'
            ]
          },
          {
            title: 'تعیین نقطه ملاقات',
            details: [
              'یک مکان در محله و یک مکان خارج از شهر',
              'اطمینان از اینکه همه اعضای خانواده آدرس را می‌دانند',
              'تعیین یک تماس خارج از شهر به عنوان مرکز ارتباطی'
            ]
          },
          {
            title: 'آماده‌سازی منزل',
            details: [
              'بررسی و تقویت سازه‌های ضعیف',
              'شناسایی محل شیرهای اصلی گاز، آب و قطع برق',
              'نصب کپسول آتش‌نشانی و دتکتور دود',
              'تثبیت اثاثیه سنگین و بلند به دیوار',
              'ذخیره آب و غذای اضطراری'
            ]
          }
        ]
      }
    },
    {
      id: 'during-attack',
      title: 'حین حمله هوایی',
      icon: () => <span className="material-symbols-rounded icon">warning</span>,
      color: 'var(--color-danger)',
      content: {
        description: 'اقدامات فوری و حیاتی هنگام شنیدن آژیر یا مشاهده علائم حمله',
        items: [
          {
            title: 'اقدامات فوری',
            details: [
              'فوراً به امن‌ترین قسمت ساختمان بروید (زیرزمین یا مرکز ساختمان)',
              'از پنجره‌ها و درهای شیشه‌ای دور شوید',
              'در حالت خمیده قرار بگیرید و سر را محافظت کنید',
              'اگر در خیابان هستید، در نزدیک‌ترین ساختمان محکم پناه بگیرید',
              'از آسانسور استفاده نکنید'
            ]
          },
          {
            title: 'در آپارتمان',
            details: [
              'به طبقه همکف یا زیرزمین بروید',
              'از دیوارهای داخلی و گوشه‌ها استفاده کنید',
              'رادیو را روشن کنید و منتظر دستورات باشید',
              'تا اعلام پایان خطر در مکان امن بمانید'
            ]
          },
          {
            title: 'پس از حمله',
            details: [
              'از سلامت اطرافیان مطمئن شوید',
              'به دنبال آسیب‌های ساختمانی باشید',
              'در صورت استشمام گاز، فوراً محل را ترک کنید',
              'از تلفن فقط برای موارد اضطراری استفاده کنید',
              'به دستورات مقامات گوش دهید'
            ]
          }
        ]
      }
    },
    {
      id: 'first-aid',
      title: 'کمک‌های اولیه',
      icon: () => <span className="material-symbols-rounded icon">favorite</span>,
      color: 'var(--color-success)',
      content: {
        description: 'اقدامات اولیه برای رسیدگی به مصدومین قبل از رسیدن امداد',
        items: [
          {
            title: 'خونریزی',
            details: [
              'فشار مستقیم روی زخم با پارچه تمیز',
              'بالا نگه داشتن عضو آسیب‌دیده',
              'در صورت ادامه خونریزی، پانسمان دوم روی اولی',
              'هرگز اجسام فرورفته را خارج نکنید'
            ]
          },
          {
            title: 'سوختگی',
            details: [
              'آب سرد روی سوختگی (نه یخ)',
              'پوشاندن با پارچه تمیز و خشک',
              'عدم استفاده از روغن یا خمیردندان',
              'در سوختگی‌های شدید فوراً به پزشک مراجعه کنید'
            ]
          },
          {
            title: 'شکستگی',
            details: [
              'حرکت ندادن عضو آسیب‌دیده',
              'آتل‌بندی با وسایل موجود',
              'یخ روی ناحیه متورم (با پارچه)',
              'انتقال سریع به مرکز درمانی'
            ]
          },
          {
            title: 'احیای قلبی-ریوی (CPR)',
            details: [
              'بررسی هوشیاری و تنفس مصدوم',
              'تماس با اورژانس (۱۱۵)',
              'فشردن قفسه سینه با سرعت ۱۰۰-۱۲۰ بار در دقیقه',
              'فشردن به عمق حداقل ۵ سانتی‌متر',
              'اجازه بازگشت کامل قفسه سینه بین فشارها'
            ]
          }
        ]
      }
    },
    {
      id: 'water-food',
      title: 'آب و غذا',
      icon: () => <span className="material-symbols-rounded icon">water_drop</span>,
      color: 'var(--color-info)',
      content: {
        description: 'تأمین و نگهداری آب و غذا در شرایط اضطراری',
        items: [
          {
            title: 'تصفیه آب',
            details: [
              'جوشاندن آب به مدت ۱ دقیقه',
              'استفاده از قرص‌های ضدعفونی‌کننده',
              'صاف کردن با پارچه تمیز قبل از جوشاندن',
              'نگهداری در ظروف تمیز و سرپوش‌دار'
            ]
          },
          {
            title: 'غذاهای مناسب',
            details: [
              'کنسروهای گوشت و ماهی',
              'حبوبات خشک',
              'برنج و پاستا',
              'نان خشک و بیسکویت',
              'آجیل و میوه خشک',
              'عسل و روغن',
              'شیر پودری'
            ]
          },
          {
            title: 'ذخیره‌سازی صحیح',
            details: [
              'نگهداری در مکان خشک و خنک',
              'چرخش منظم ذخایر (استفاده از قدیمی‌ترها و جایگزینی)',
              'بررسی تاریخ انقضا هر ۶ ماه',
              'محافظت از آفات و جوندگان'
            ]
          }
        ]
      }
    },
    {
      id: 'chemical',
      title: 'حملات شیمیایی/بیولوژیک',
      icon: () => <span className="material-symbols-rounded icon">security</span>,
      color: '#9c27b0',
      content: {
        description: 'اقدامات حفاظتی در برابر آلودگی‌های شیمیایی و بیولوژیک',
        items: [
          {
            title: 'علائم هشدار',
            details: [
              'بوی غیرمعمول در هوا',
              'تغییر رنگ گیاهان',
              'مرگ ناگهانی حیوانات',
              'تحریک چشم و تنفس'
            ]
          },
          {
            title: 'اقدامات فوری',
            details: [
              'فوراً وارد ساختمان شوید',
              'درها و پنجره‌ها را ببندید',
              'درزها را با چسب بپوشانید',
              'سیستم تهویه را خاموش کنید',
              'لباس‌ها را عوض کرده و دوش بگیرید',
              'رادیو را گوش دهید'
            ]
          },
          {
            title: 'محافظت تنفسی',
            details: [
              'استفاده از ماسک N95 یا بالاتر',
              'در صورت نبود ماسک، پارچه مرطوب روی بینی و دهان',
              'تنفس آرام و کم‌عمق',
              'خروج از منطقه آلوده با جهت باد'
            ]
          }
        ]
      }
    },
    {
      id: 'communication',
      title: 'ارتباطات اضطراری',
      icon: () => <span className="material-symbols-rounded icon">cell_tower</span>,
      color: 'var(--color-warning)',
      content: {
        description: 'راه‌های برقراری ارتباط در صورت قطع شبکه‌های معمول',
        items: [
          {
            title: 'رادیو',
            details: [
              'رادیو باتری‌دار همیشه در دسترس باشد',
              'فرکانس‌های خبری محلی را بدانید',
              'از رادیو امداد استفاده کنید'
            ]
          },
          {
            title: 'پیام‌رسانی',
            details: [
              'پیامک معمولاً سریع‌تر از تماس ارسال می‌شود',
              'از شبکه‌های اجتماعی محلی استفاده کنید',
              'پیام‌های کوتاه و مفید ارسال کنید'
            ]
          },
          {
            title: 'برنامه‌ریزی ارتباطی',
            details: [
              'تعیین یک فرد رابط خارج از منطقه',
              'توافق بر زمان‌های مشخص برای تماس',
              'آموزش کودکان برای تماس با شماره‌های اضطراری',
              'نگهداری لیست کاغذی شماره‌های مهم'
            ]
          }
        ]
      }
    },
    {
      id: 'evacuation',
      title: 'تخلیه اضطراری',
      icon: () => <span className="material-symbols-rounded icon">directions_run</span>,
      color: '#FF9800',
      content: {
        description: 'راهنمای ترک سریع و امن محل در شرایط اضطراری',
        items: [
          {
            title: 'آمادگی برای تخلیه',
            details: [
              'داشتن کیف اضطراری آماده',
              'شناسایی مسیرهای خروج اضطراری از منطقه',
              'تعیین محل ملاقات خانواده',
              'آگاهی از پناهگاه‌های عمومی در منطقه'
            ]
          },
          {
            title: 'هنگام تخلیه',
            details: [
              'قطع گاز، برق و آب',
              'قفل کردن درها',
              'اطلاع به آشنایان از مقصد',
              'پیروی از مسیرهای تعیین شده توسط مقامات',
              'حفظ آرامش و رعایت نوبت'
            ]
          },
          {
            title: 'اولویت‌های همراه بردن',
            details: [
              'اسناد هویتی و مدارک مهم',
              'داروهای ضروری',
              'آب و غذای کوچک',
              'پوشاک مناسب فصل',
              'وسایل ارتباطی و شارژر'
            ]
          }
        ]
      }
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // فیلتر کردن بخش‌ها بر اساس جستجو
  const filteredSections = sections.filter(section => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // جستجو در عنوان و توضیحات بخش
    if (
      section.title.toLowerCase().includes(searchLower) || 
      section.content.description.toLowerCase().includes(searchLower)
    ) {
      return true;
    }
    
    // جستجو در عناوین و جزئیات آیتم‌ها
    return section.content.items.some(item => 
      item.title.toLowerCase().includes(searchLower) || 
      item.details.some(detail => detail.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <Head>
        <title>راهنمای ایمنی و بقا - پناهگاه امن</title>
        <meta name="description" content="دستورالعمل‌های جامع برای آمادگی و مقابله با شرایط اضطراری و افزایش شانس زنده‌ماندن در بحران‌ها" />
      </Head>

      <MainContainer className="container">
        <PageHeader>
          <h1>راهنمای ایمنی و بقا</h1>
          <p>دستورالعمل‌های جامع برای آمادگی و مقابله با شرایط اضطراری و افزایش شانس زنده‌ماندن در بحران‌ها</p>
        </PageHeader>

        <HeroSection>
          <div className="hero-content">
            <div className="hero-text">
              <h2>آمادگی، کلید زنده ماندن است</h2>
              <p>
                در شرایط بحرانی، آگاهی و آمادگی قبلی می‌تواند تفاوت بین زندگی و مرگ باشد. این راهنما به شما کمک می‌کند تا خود و خانواده‌تان را برای انواع شرایط اضطراری آماده کنید.
              </p>
            </div>
            <div className="hero-image">
              <img src="/images/safety/safety-illustration.svg" alt="راهنمای ایمنی و بقا" />
            </div>
          </div>
        </HeroSection>

        <SearchContainer>
          <div className="input-group">
            <span className="input-group-text bg-white border-start-0">
              <span className="material-symbols-rounded search-icon">search</span>
            </span>
            <input
              type="text"
              className="form-control border-end-0"
              placeholder="جستجو در راهنماها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SearchContainer>

        <SectionContainer>
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <Section key={section.id}>
                  <SectionHeader 
                    onClick={() => toggleSection(section.id)}
                    color={section.color}
                    aria-expanded={isExpanded}
                  >
                    <div className="icon-container">
                      <Icon />
                    </div>
                    <div className="content">
                      <h2>{section.title}</h2>
                      <p>{section.content.description}</p>
                    </div>
                    <div className="chevron">
                      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </div>
                  </SectionHeader>

                  {isExpanded && (
                    <SectionContent>
                      {section.content.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <ItemTitle>
                            <span className="material-symbols-rounded" style={{ fontSize: '24px', marginLeft: '8px' }}>
                              {getItemIcon(item.title)}
                            </span>
                            {item.title}
                          </ItemTitle>
                          <ItemList>
                            {item.details.map((detail, detailIndex) => (
                              <ItemDetail key={detailIndex}>{detail}</ItemDetail>
                            ))}
                          </ItemList>
                        </div>
                      ))}
                    </SectionContent>
                  )}
                </Section>
              );
            })
          ) : (
            <EmptyStateContainer>
              <span className="material-symbols-rounded">search_off</span>
              <h3>نتیجه‌ای یافت نشد</h3>
              <p>لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
              <button onClick={() => setSearchTerm('')}>
                پاک کردن جستجو
              </button>
            </EmptyStateContainer>
          )}
        </SectionContainer>

        <QuickReference>
          <h3>
            <span className="material-symbols-rounded">warning</span>
            مرجع سریع - اقدامات فوری
          </h3>
          <div className="grid">
            <div>
              <h4>هنگام شنیدن آژیر:</h4>
              <ul>
                <li>به محل امن بروید</li>
                <li>از پنجره‌ها دور شوید</li>
                <li>رادیو را روشن کنید</li>
                <li>آرام باشید</li>
              </ul>
            </div>
            <div>
              <h4>شماره‌های ضروری:</h4>
              <ul>
                <li>آتش‌نشانی: ۱۲۵</li>
                <li>پلیس: ۱۱۰</li>
                <li>اورژانس: ۱۱۵</li>
                <li>هلال احمر: ۱۱۲</li>
              </ul>
            </div>
            <div>
              <h4>کمک‌های اولیه پایه:</h4>
              <ul>
                <li>خونریزی: فشار مستقیم روی زخم</li>
                <li>سوختگی: آب سرد به مدت ۱۰ دقیقه</li>
                <li>شکستگی: بی‌حرکت کردن عضو</li>
                <li>بیهوشی: بررسی تنفس و ضربان</li>
              </ul>
            </div>
          </div>
        </QuickReference>
        
        <AdditionalTipsSection>
          <h3>
            <span className="material-symbols-rounded">tips_and_updates</span>
            نکات تکمیلی
          </h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>
                <span className="material-symbols-rounded">family_home</span>
                برنامه خانوادگی
              </h4>
              <p>
                با اعضای خانواده یک برنامه اضطراری تمرین کنید. هر فرد باید وظایف مشخصی داشته باشد و محل ملاقات را بداند.
              </p>
            </div>
            <div className="tip-card">
              <h4>
                <span className="material-symbols-rounded">battery_horiz_075</span>
                شارژ دستگاه‌ها
              </h4>
              <p>
                همیشه یک پاوربانک شارژ شده در کیف اضطراری داشته باشید. در شرایط بحرانی، ارتباط می‌تواند حیاتی باشد.
              </p>
            </div>
            <div className="tip-card">
              <h4>
                <span className="material-symbols-rounded">pets</span>
                حیوانات خانگی
              </h4>
              <p>
                برای حیوانات خانگی هم برنامه‌ریزی کنید. غذا، آب، قلاده و داروهای آن‌ها را در کیف اضطراری قرار دهید.
              </p>
            </div>
            <div className="tip-card">
              <h4>
                <span className="material-symbols-rounded">psychology</span>
                سلامت روان
              </h4>
              <p>
                استرس در شرایط بحرانی طبیعی است. تکنیک‌های تنفس عمیق و ذهن‌آگاهی را تمرین کنید تا در مواقع اضطراری آرامش خود را حفظ کنید.
              </p>
            </div>
          </div>
        </AdditionalTipsSection>
      </MainContainer>
    </>
  );
};

export default SafetyGuide; 