import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAuth } from '../lib/auth-context';

const StatusBar = styled.div`
  padding: var(--spacing-2) 0;
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  position: relative;
  z-index: 1001;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  .status-icon {
    font-size: 1.1rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-1) 0;
    font-size: 0.8rem;
    
    .status-icon {
      font-size: 1rem;
    }
  }
`;

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  background: ${props => props.isScrolled 
    ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' 
    : 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))'};
  color: var(--color-white);
  height: ${props => props.isScrolled ? '65px' : 'var(--header-height)'};
  display: flex;
  align-items: center;
  box-shadow: ${props => props.isScrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
    : '0 2px 15px rgba(0, 0, 0, 0.1)'};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  overflow: visible;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, 
      var(--color-primary), 
      var(--color-secondary), 
      var(--color-primary)
    );
    opacity: ${props => props.isScrolled ? '1' : '0.5'};
    transition: opacity 0.3s ease;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  height: 100%;
  overflow: visible;
`;

const LogoLink = styled(Link)<{ isScrolled: boolean }>`
  font-size: ${props => props.isScrolled ? '1.6rem' : '1.8rem'};
  font-weight: 800;
  color: var(--color-white);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  transition: all 0.3s ease;
  position: relative;
  padding: var(--spacing-2) 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
    transition: width 0.3s ease;
    opacity: 0.8;
  }
  
  &:hover {
    color: var(--color-white);
    text-decoration: none;
    transform: translateY(-1px);
    
    &:before {
      width: 100%;
    }
  }
  
  .logo-icon {
    font-size: ${props => props.isScrolled ? '2rem' : '2.2rem'};
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    .logo-icon {
      font-size: 1.8rem;
    }
  }
`;

const Nav = styled.nav<{ isScrolled: boolean }>`
  display: flex;
  gap: ${props => props.isScrolled ? 'var(--spacing-5)' : 'var(--spacing-6)'};
  transition: all 0.3s ease;
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  padding: ${props => props.isScrolled ? '0.5rem 1.5rem' : '0.5rem 1rem'};
  border-radius: 50px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ isActive?: boolean; isScrolled: boolean }>`
  color: var(--color-white);
  font-weight: ${props => props.isActive ? '600' : '500'};
  padding: var(--spacing-2) var(--spacing-3);
  position: relative;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: ${props => props.isActive ? '1' : '0.85'};
  font-size: ${props => props.isScrolled ? 'var(--font-size-sm)' : 'var(--font-size-base)'};
  border-radius: 50px;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  box-shadow: ${props => props.isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: ${props => props.isActive ? '30%' : '0'};
    height: 3px;
    background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.4));
    border-radius: var(--border-radius-full);
    transition: all 0.3s ease;
    transform: ${props => props.isActive ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)'};
    box-shadow: 0 1px 3px rgba(255, 255, 255, 0.3);
  }
  
  &:hover {
    color: var(--color-white);
    text-decoration: none;
    opacity: 1;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
    
    &:after {
      width: 50%;
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

const MobileMenuButton = styled.button<{ isScrolled: boolean }>`
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  color: var(--color-white);
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  padding: var(--spacing-2);
  border-radius: var(--border-radius-full);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  @media (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-white);
  z-index: 999;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: var(--spacing-6) var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  box-shadow: var(--box-shadow-lg);
  overflow-y: auto;
  max-height: calc(100vh - var(--header-height));
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-primary));
    opacity: 0.8;
  }
`;

const MobileNavLink = styled(Link)<{ isActive?: boolean }>`
  color: var(--color-gray-900);
  font-weight: 600;
  font-size: var(--font-size-lg);
  padding: var(--spacing-3) var(--spacing-4);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  background-color: ${props => props.isActive ? 'rgba(var(--color-primary-rgb), 0.1)' : 'transparent'};
  margin-bottom: var(--spacing-2);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.isActive ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none'};
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.isActive ? 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))' : 'transparent'};
    transition: all 0.3s ease;
    opacity: ${props => props.isActive ? '1' : '0'};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    border-radius: 12px;
  }
  
  &:hover {
    background-color: transparent;
    color: var(--color-primary);
    text-decoration: none;
    transform: translateX(4px);
    
    &:after {
      opacity: 1;
    }
    
    &:before {
      opacity: 1;
    }
    
    .nav-icon {
      transform: scale(1.1);
      color: var(--color-primary);
    }
  }
  
  .nav-icon {
    font-size: 1.5rem;
    color: ${props => props.isActive ? 'var(--color-primary)' : 'var(--color-gray-600)'};
    transition: all 0.3s ease;
    background: ${props => props.isActive ? 'rgba(var(--color-primary-rgb), 0.1)' : 'transparent'};
    padding: 8px;
    border-radius: 50%;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  
  h3 {
    font-size: var(--font-size-xl);
    color: var(--color-gray-900);
    margin: 0;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  .close-icon {
    color: var(--color-gray-600);
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.05);
    padding: 8px;
    border-radius: 50%;
    
    &:hover {
      color: var(--color-primary);
      transform: rotate(90deg);
      background: rgba(var(--color-primary-rgb), 0.1);
    }
  }
`;

const MobileMenuFooter = styled.div`
  margin-top: auto;
  padding-top: var(--spacing-6);
  text-align: center;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  
  .footer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    font-weight: 700;
    color: var(--color-gray-700);
    
    .logo-icon {
      font-size: 1.5rem;
      color: var(--color-primary);
    }
  }
`;

const UserMenuContainer = styled.div`
  position: relative;
  margin-left: var(--spacing-4);
  z-index: 1001;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button<{ isScrolled: boolean }>`
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.15)'};
  border: none;
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  font-size: ${props => props.isScrolled ? 'var(--font-size-sm)' : 'var(--font-size-base)'};
  font-weight: 500;
  transition: all 0.3s ease;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  .user-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const UserMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-lg);
  min-width: 280px;
  width: max-content;
  padding: var(--spacing-4);
  z-index: 1001;
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  max-width: 100%;
  margin-top: 5px;
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: var(--color-white);
    transform: rotate(45deg);
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.04);
  }
`;

const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-gray-800);
  text-decoration: none;
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
  text-align: right;
  flex-direction: row-reverse;
  
  &:hover {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .menu-icon {
    font-size: 1.2rem;
    color: var(--color-gray-600);
    margin-left: 0;
    margin-right: var(--spacing-2);
    order: 0;
  }
`;

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-gray-800);
  text-decoration: none;
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  font-family: inherit;
  cursor: pointer;
  justify-content: flex-start;
  flex-direction: row-reverse;
  
  .menu-icon {
    font-size: 1.2rem;
    color: var(--color-gray-600);
    margin-left: 0;
    margin-right: var(--spacing-2);
    order: 0;
  }
  
  &:hover {
    background: rgba(var(--color-danger-rgb), 0.1);
    color: var(--color-danger);
  }
`;

const UserInfo = styled.div`
  padding: var(--spacing-3);
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--spacing-4);
  width: 100%;
  box-sizing: border-box;
  
  .user-name {
    font-weight: 600;
    color: var(--color-gray-900);
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .user-phone {
    color: var(--color-gray-600);
    font-size: var(--font-size-xs);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AuthButtons = styled.div<{ isScrolled: boolean }>`
  display: flex;
  gap: var(--spacing-2);
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const LoginButton = styled(Link)<{ isScrolled: boolean }>`
  padding: ${props => props.isScrolled ? 'var(--spacing-2) var(--spacing-3)' : 'var(--spacing-2) var(--spacing-4)'};
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  border-radius: 50px;
  font-size: ${props => props.isScrolled ? 'var(--font-size-sm)' : 'var(--font-size-base)'};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    color: var(--color-white);
    text-decoration: none;
  }
  
  .login-icon {
    font-size: 1.2rem;
  }
`;

const RegisterButton = styled(Link)<{ isScrolled: boolean }>`
  padding: ${props => props.isScrolled ? 'var(--spacing-2) var(--spacing-3)' : 'var(--spacing-2) var(--spacing-4)'};
  background: var(--color-white);
  color: var(--color-primary);
  border-radius: 50px;
  font-size: ${props => props.isScrolled ? 'var(--font-size-sm)' : 'var(--font-size-base)'};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .register-icon {
    font-size: 1.2rem;
  }
`;

// اضافه کردن لینک‌های مربوط به احراز هویت در منوی موبایل
const MobileAuthLinks = styled.div`
  margin-top: var(--spacing-6);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;

const Header = ({ status = 'normal', message = 'وضعیت عادی است. مشکلی گزارش نشده است.' }) => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // تشخیص اسکرول برای تغییر استایل هدر
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // بستن منوی موبایل با تغییر مسیر
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [router.pathname]);
  
  // جلوگیری از اسکرول صفحه هنگام باز بودن منوی موبایل
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // بستن منوی کاربر با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);
  
  // اضافه کردن event listener برای بستن منوی کاربر با کلید Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const statusColors = {
    normal: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)'
  };
  
  const statusIcons = {
    normal: 'check_circle',
    warning: 'warning',
    danger: 'error'
  };
  
  // آیکون‌های منو
  const navIcons = {
    '/': 'home',
    '/help': 'volunteer_activism',
    '/safety-guides': 'health_and_safety',
    '/map': 'location_on',
    '/fact-check': 'fact_check',
    '/mental-health': 'psychology',
    '/auth/login': 'login',
    '/auth/register': 'person_add'
  };
  
  // اضافه کردن متد برای بررسی وجود نام کاربر
  const getUserFirstName = () => {
    if (!user || !user.full_name) return 'کاربر';
    
    // جدا کردن نام از نام خانوادگی
    const nameParts = user.full_name.trim().split(' ');
    return nameParts[0] || 'کاربر';
  };
  
  return (
    <>
      <StatusBar style={{ backgroundColor: statusColors[status as keyof typeof statusColors] }}>
        <span className="material-symbols-rounded status-icon">
          {statusIcons[status as keyof typeof statusIcons]}
        </span>
        {message}
      </StatusBar>
      
      <HeaderContainer isScrolled={isScrolled}>
        <div className="container">
          <HeaderContent>
            <LogoLink href="/" isScrolled={isScrolled}>
              <span className="material-symbols-rounded logo-icon">shield_person</span>
              پناهگاه امن
            </LogoLink>
            
            <Nav isScrolled={isScrolled}>
              <NavLink href="/" isActive={router.pathname === '/'} isScrolled={isScrolled}>صفحه اصلی</NavLink>
              <NavLink href="/help" isActive={router.pathname.startsWith('/help')} isScrolled={isScrolled}>همیاری مردمی</NavLink>
              <NavLink href="/safety-guides" isActive={router.pathname.startsWith('/safety-guides')} isScrolled={isScrolled}>راهنمای ایمنی</NavLink>
              <NavLink href="/map" isActive={router.pathname.startsWith('/map')} isScrolled={isScrolled}>نقشه منابع</NavLink>
              <NavLink href="/fact-check" isActive={router.pathname.startsWith('/fact-check')} isScrolled={isScrolled}>راستی‌آزمایی</NavLink>
              <NavLink href="/mental-health" isActive={router.pathname.startsWith('/mental-health')} isScrolled={isScrolled}>سلامت روان</NavLink>
            </Nav>
            
            {isAuthenticated ? (
              <UserMenuContainer className="user-menu-container">
                <UserButton 
                  isScrolled={isScrolled} 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  title={user?.full_name || 'کاربر'}
                >
                  <span className="material-symbols-rounded user-icon">account_circle</span>
                  {getUserFirstName()}
                </UserButton>
                
                <UserMenu isOpen={userMenuOpen}>
                  <UserInfo>
                    <div className="user-name">{user?.full_name || 'کاربر'}</div>
                    <div className="user-phone">{user?.phone_number || ''}</div>
                  </UserInfo>
                  
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <UserMenuItem href="/help">
                      <span className="material-symbols-rounded menu-icon">volunteer_activism</span>
                      درخواست‌های من
                    </UserMenuItem>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <UserMenuItem href="/profile">
                      <span className="material-symbols-rounded menu-icon">person</span>
                      پروفایل کاربری
                    </UserMenuItem>
                  </div>
                  
                  <div>
                    <UserMenuButton onClick={handleLogout}>
                      <span className="material-symbols-rounded menu-icon">logout</span>
                      خروج از حساب کاربری
                    </UserMenuButton>
                  </div>
                </UserMenu>
              </UserMenuContainer>
            ) : (
              <AuthButtons isScrolled={isScrolled}>
                <LoginButton href="/auth/login" isScrolled={isScrolled}>
                  <span className="material-symbols-rounded login-icon">login</span>
                  ورود
                </LoginButton>
                <RegisterButton href="/auth/register" isScrolled={isScrolled}>
                  <span className="material-symbols-rounded register-icon">person_add</span>
                  ثبت‌نام
                </RegisterButton>
              </AuthButtons>
            )}
            
            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} isScrolled={isScrolled}>
              <span className="material-symbols-rounded">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </MobileMenuButton>
          </HeaderContent>
        </div>
      </HeaderContainer>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <h3>منوی اصلی</h3>
          <span className="material-symbols-rounded close-icon" onClick={() => setMobileMenuOpen(false)}>close</span>
        </MobileMenuHeader>
        
        {isAuthenticated && (
          <UserInfo>
            <div className="user-name">{user?.full_name}</div>
            <div className="user-phone">{user?.phone_number}</div>
          </UserInfo>
        )}
        
        <MobileNavLink href="/" isActive={router.pathname === '/'}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/']}</span>
          صفحه اصلی
        </MobileNavLink>
        <MobileNavLink href="/help" isActive={router.pathname.startsWith('/help')}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/help']}</span>
          همیاری مردمی
        </MobileNavLink>
        <MobileNavLink href="/safety-guides" isActive={router.pathname.startsWith('/safety-guides')}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/safety-guides']}</span>
          راهنمای ایمنی
        </MobileNavLink>
        <MobileNavLink href="/map" isActive={router.pathname.startsWith('/map')}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/map']}</span>
          نقشه منابع
        </MobileNavLink>
        <MobileNavLink href="/fact-check" isActive={router.pathname.startsWith('/fact-check')}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/fact-check']}</span>
          راستی‌آزمایی
        </MobileNavLink>
        <MobileNavLink href="/mental-health" isActive={router.pathname.startsWith('/mental-health')}>
          <span className="material-symbols-rounded nav-icon">{navIcons['/mental-health']}</span>
          سلامت روان
        </MobileNavLink>
        
        {isAuthenticated ? (
          <MobileAuthLinks>
            <MobileNavLink href="/profile" isActive={router.pathname === '/profile'}>
              <span className="material-symbols-rounded nav-icon">person</span>
              پروفایل کاربری
            </MobileNavLink>
            <MobileNavLink href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} isActive={false}>
              <span className="material-symbols-rounded nav-icon">logout</span>
              خروج از حساب کاربری
            </MobileNavLink>
          </MobileAuthLinks>
        ) : (
          <MobileAuthLinks>
            <MobileNavLink href="/auth/login" isActive={router.pathname === '/auth/login'}>
              <span className="material-symbols-rounded nav-icon">{navIcons['/auth/login']}</span>
              ورود به حساب کاربری
            </MobileNavLink>
            <MobileNavLink href="/auth/register" isActive={router.pathname === '/auth/register'}>
              <span className="material-symbols-rounded nav-icon">{navIcons['/auth/register']}</span>
              ثبت‌نام
            </MobileNavLink>
          </MobileAuthLinks>
        )}
        
        <MobileMenuFooter>
          <div className="footer-logo">
            <span className="material-symbols-rounded logo-icon">shield_person</span>
            پناهگاه امن
          </div>
          همراه شما در شرایط بحران
        </MobileMenuFooter>
      </MobileMenu>
    </>
  );
};

export default Header; 