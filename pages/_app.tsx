import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingOverlay from '../components/LoadingOverlay'
import { AuthProvider } from '../lib/auth-context'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // نمایش لودینگ در زمان تغییر صفحات
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setLoading(false);
      // اسکرول به بالای صفحه در هر تغییر مسیر
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  return (
    <React.Fragment>
      <Head>
        <title>پناهگاه امن</title>
        <meta name="description" content="اپلیکیشن مدیریت بحران و اطلاع‌رسانی به شهروندان" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200&display=swap" rel="stylesheet" />
      </Head>
      <AuthProvider>
        <div dir="rtl" lang="fa" className="app-wrapper">
          {loading && <LoadingOverlay text="در حال بارگذاری صفحه..." />}
          <Header />
          <main className="main-content">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </React.Fragment>
  )
} 