import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// استایل کامپوننت‌ها
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  h1 {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: var(--color-gray-600);
    max-width: 800px;
    margin: 0 auto;
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  .icon {
    margin-left: 0.5rem;
    font-size: 2rem;
    color: var(--color-primary);
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow-lg);
  }
  
  .news-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .news-content {
    padding: 1.5rem;
  }
  
  .news-category {
    display: inline-block;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--color-gray-800);
  }
  
  p {
    color: var(--color-gray-600);
    margin-bottom: 1.5rem;
  }
  
  .news-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-gray-500);
    font-size: 0.9rem;
    
    .date {
      display: flex;
      align-items: center;
      
      .date-icon {
        font-size: 1.1rem;
        margin-left: 0.3rem;
      }
    }
    
    .source {
      display: flex;
      align-items: center;
      
      .source-icon {
        font-size: 1.1rem;
        margin-left: 0.3rem;
      }
    }
  }
`;

const AlertBox = styled.div`
  background-color: var(--color-warning-light);
  border-right: 4px solid var(--color-warning);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  
  h3 {
    color: var(--color-warning-dark);
    font-size: 1.3rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    .warning-icon {
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
    color: var(--color-gray-700);
  }
  
  ul {
    padding-right: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  li {
    margin-bottom: 0.8rem;
    position: relative;
    padding-right: 1.5rem;
    
    &:before {
      content: "•";
      color: var(--color-warning);
      font-weight: bold;
      position: absolute;
      right: 0;
    }
    
    .source {
      display: block;
      font-size: 0.8rem;
      color: var(--color-gray-500);
      margin-top: 0.3rem;
    }
  }
`;

const SecurityCategory = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    .icon {
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
    color: var(--color-gray-700);
  }
  
  ul {
    padding-right: 1rem;
  }
  
  li {
    margin-bottom: 1rem;
    padding-right: 1.5rem;
    position: relative;
    
    &:before {
      content: "→";
      color: var(--color-primary);
      position: absolute;
      right: 0;
    }
    
    .source {
      display: block;
      font-size: 0.8rem;
      color: var(--color-gray-500);
      margin-top: 0.3rem;
    }
  }
`;

// اخبار و هشدارها
const newsItems = [
  {
    id: 1,
    title: 'هشدار پدافند هوایی: آماده‌باش در مناطق مرزی غربی کشور',
    category: 'هشدار امنیتی',
    date: '1404/03/27',
    content: 'نیروهای پدافند هوایی در مناطق غربی و جنوب غربی کشور در حالت آماده‌باش کامل قرار گرفتند. شهروندان در این مناطق هشدارهای امنیتی را جدی بگیرند.',
    source: 'ستاد کل نیروهای مسلح'
  },
  {
    id: 2,
    title: 'اقدامات تأمینی جهت تقویت زیرساخت‌های حیاتی کشور',
    category: 'دفاع غیرعامل',
    date: '1404/03/26',
    content: 'سازمان پدافند غیرعامل از تقویت زیرساخت‌های حیاتی کشور و اتخاذ تدابیر لازم برای حفاظت از تأسیسات انرژی و ارتباطی خبر داد.',
    source: 'سازمان پدافند غیرعامل'
  },
  {
    id: 3,
    title: 'آمادگی کامل سیستم‌های دفاع موشکی برای مقابله با تهدیدات احتمالی',
    category: 'دفاعی',
    date: '1404/03/25',
    content: 'فرماندهی نیروی هوافضای سپاه از آمادگی کامل سیستم‌های دفاع موشکی کشور برای مقابله با هرگونه تجاوز هوایی خبر داد.',
    source: 'نیروی هوافضای سپاه'
  }
];

const NewsPage = () => {
  return (
    <>
      <Head>
        <title>اخبار و هشدارها - پناهگاه امن</title>
        <meta name="description" content="آخرین اخبار، هشدارها و توصیه‌های امنیتی برای حفظ ایمنی شما و خانواده‌تان در شرایط فعلی" />
      </Head>
      
      <PageContainer>
        <PageHeader>
          <h1>اخبار و هشدارها</h1>
          <p>آخرین اخبار، هشدارها و توصیه‌های امنیتی در شرایط فعلی برای حفظ ایمنی شما و خانواده‌تان</p>
        </PageHeader>
        
        {/* هشدارهای امنیتی */}
        <section>
          <SectionTitle>
            <span className="material-symbols-rounded icon">shield</span>
            توصیه‌های امنیتی و هشدارها در شرایط جنگی
          </SectionTitle>
          
          <AlertBox>
            <h3>
              <span className="material-symbols-rounded warning-icon">warning</span>
              توصیه‌های کلی امنیت فردی و خانوادگی در شرایط فعلی
            </h3>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">security</span>
                هوشیاری نسبت به محیط
              </h3>
              <ul>
                <li>
                  همیشه نسبت به حضور افراد ناشناس در محیط زندگی یا محل کار حساس باشید و به رفتارهای خارج از معمول و خدمات بدون هویت دقت کنید
                </li>
                <li>
                  مراقب پهپادهای کوچک و ناشناس در اطراف تأسیسات مهم و مناطق مسکونی باشید و موارد مشکوک را گزارش دهید
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">family_restroom</span>
                مراقبت از کودکان و افراد آسیب‌پذیر
              </h3>
              <ul>
                <li>
                  هرگز فرزندان خردسال را تنها در کوچه یا ورودی خانه رها نکنید، حتی برای لحظاتی کوتاه
                  <span className="source">منابع: radiofarda.com، snn.ir</span>
                </li>
                <li>
                  محل پناهگاه‌های نزدیک به محل سکونت را به اعضای خانواده آموزش دهید و نقاط امن خانه را مشخص کنید
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">shelter</span>
                آمادگی برای شرایط حملات هوایی
              </h3>
              <ul>
                <li>
                  کیف اضطراری شامل مدارک مهم، دارو، آب و مواد غذایی خشک برای ۷۲ ساعت آماده داشته باشید
                </li>
                <li>
                  موقعیت پناهگاه‌های عمومی نزدیک محل سکونت خود را شناسایی کنید و مسیر رسیدن به آنها را بدانید
                </li>
                <li>
                  هنگام شنیدن آژیر خطر، با حفظ آرامش به نزدیک‌ترین پناهگاه یا فضای امن بروید
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">password</span>
                حفاظت از رمزها و قفل‌ها
              </h3>
              <ul>
                <li>
                  رمزها را شفاهی یا روی کاغذ جلوی دیگران باز نکنید؛ حتی در دفترچه یا حافظه دستگاه یادداشت نکنید
                  <span className="source">منابع: asriran.com، isna.ir، herasat.post.ir</span>
                </li>
                <li>
                  از نصب اپلیکیشن‌های ناشناس خودداری کنید و به پیام‌های مشکوک پاسخ ندهید
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">shield_lock</span>
                دور نگه‌داشتن اطلاعات مهم از افراد غیرمجاز
              </h3>
              <ul>
                <li>
                  در اختیار قراردادن قفل یا اطلاعات شغلی به افراد ناشناس یا کسانی که مدعی مأموریت هستند ممنوع است
                </li>
                <li>
                  از انتشار موقعیت‌های نظامی، حرکت نیروها یا آسیب‌های وارده در فضای مجازی خودداری کنید
                </li>
                <li>
                  در صورت مواجهه با افراد مشکوک، با شماره ۱۱۳ تماس بگیرید
                  <span className="source">منابع: lsrw.ir، isna.ir، iribnews.ir</span>
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">privacy_tip</span>
                پیشگیری از نفوذ یا جاسوسی
              </h3>
              <ul>
                <li>
                  تجهیزات عمومی نظیر دوربین، مودم یا گوشی را از اشخاص ناشناس دریافت نکنید
                </li>
                <li>
                  در شرایط فعلی، از انتشار اطلاعات محل استقرار یگان‌های نظامی یا آسیب‌های ناشی از حملات خودداری کنید
                </li>
                <li>
                  ارتباط با اتباع بیگانه بدون معرفی رسمی خطرناک است
                  <span className="source">منابع: isna.ir، radiofarda.com</span>
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">local_police</span>
                توصیه‌های واکنشی در موارد مشکوک
              </h3>
              <ul>
                <li>
                  در صورت مشاهده افراد یا بسته‌های مشکوک، با سامانه ۱۱۳ وزارت اطلاعات تماس بگیرید و جزئیات را اطلاع دهید
                  <span className="source">منابع: radiofarda.com، isna.ir، donya-e-eqtesad.com</span>
                </li>
                <li>
                  در صورت مشاهده ون‌های مشکوک، به نهادهای اطلاعاتی اطلاع دهید
                </li>
                <li>
                  اگر کسی خود را مأمور امنیتی معرفی کرد، فوراً تقاضای کارت شناسایی رسمی کنید و در صورت بروز تخلف، آن را با شماره ۱۱۳ گزارش دهید
                </li>
                <li>
                  در صورت یافتن اشیای مشکوک، به آنها دست نزنید و سریعاً با نیروهای امنیتی تماس بگیرید
                </li>
              </ul>
            </SecurityCategory>
            
            <SecurityCategory>
              <h3>
                <span className="material-symbols-rounded icon">tips_and_updates</span>
                نکات تکمیلی برای شرایط اضطراری
              </h3>
              <ul>
                <li>
                  شماره‌های ضروری را ثبت و به خاطر بسپارید؛ از جمله ۱۱۳ برای وزارت اطلاعات، ۱۱۰ برای پلیس، ۱۱۵ برای اورژانس، ۱۲۵ برای آتش‌نشانی
                  <span className="source">منبع: herasat.post.ir</span>
                </li>
                <li>
                  آمادگی جسمانی و سلامت روانی برای مواجهه با حوادث و شرایط اضطراری را حفظ کنید
                  <span className="source">منبع: herasat.post.ir</span>
                </li>
                <li>
                  در شرایط قطع برق، آب و اینترنت، خونسردی خود را حفظ کنید و از تجهیزات اضطراری استفاده نمایید
                </li>
              </ul>
            </SecurityCategory>
          </AlertBox>
        </section>
        
        {/* اخبار */}
        <section>
          <SectionTitle>
            <span className="material-symbols-rounded icon">feed</span>
            آخرین اخبار مرتبط با شرایط فعلی
          </SectionTitle>
          
          <NewsGrid>
            {newsItems.map(news => (
              <NewsCard key={news.id}>
                <div className="news-content">
                  <span className="news-category">{news.category}</span>
                  <h3>{news.title}</h3>
                  <p>{news.content}</p>
                  <div className="news-footer">
                    <div className="date">
                      <span className="material-symbols-rounded date-icon">calendar_today</span>
                      {news.date}
                    </div>
                    <div className="source">
                      <span className="material-symbols-rounded source-icon">source</span>
                      {news.source}
                    </div>
                  </div>
                </div>
              </NewsCard>
            ))}
          </NewsGrid>
        </section>
      </PageContainer>
    </>
  );
};

export default NewsPage; 