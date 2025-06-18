import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, checkAuth, logoutUser, loginUser, LoginData } from '../api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<User>;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

// ایجاد Context با مقدار پیش‌فرض
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { throw new Error('login function not implemented'); },
  logout: () => {},
  updateUser: () => {},
  isAuthenticated: false
});

// هوک سفارشی برای استفاده از AuthContext
export const useAuth = () => useContext(AuthContext);

// کامپوننت Provider برای AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // بررسی وضعیت احراز هویت در بارگذاری اولیه
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = checkAuth();
        console.log('AuthContext: Current user from localStorage:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error('خطا در بررسی وضعیت احراز هویت:', error);
        // در صورت خطا، کاربر را خارج می‌کنیم
        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // اضافه کردن event listener برای تغییرات localStorage
    const handleStorageChange = () => {
      try {
        const currentUser = checkAuth();
        console.log('AuthContext: Storage changed, new user:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error('خطا در بروزرسانی وضعیت احراز هویت:', error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // تابع ورود به حساب کاربری
  const login = async (data: LoginData): Promise<User> => {
    try {
      console.log('AuthContext: Logging in user');
      const loggedInUser = await loginUser(data);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      throw error;
    }
  };

  // تابع خروج از حساب کاربری
  const logout = () => {
    console.log('AuthContext: Logging out user');
    logoutUser();
    setUser(null);
  };

  // تابع به‌روزرسانی اطلاعات کاربر
  const updateUser = (newUser: User) => {
    console.log('AuthContext: Updating user data:', newUser);
    setUser(newUser);
    // ذخیره اطلاعات جدید کاربر در localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 