import axios from 'axios';

// تعریف تایپ کاربر
export interface User {
  id: string;
  full_name: string;
  phone_number: string;
  city?: string;
  age?: string;
  lat?: string;
  lng?: string;
  gender?: 'male' | 'female';
}

// تعریف تایپ برای ثبت‌نام کاربر
export interface RegisterData {
  full_name: string;
  phone_number: string;
  city?: string;
  age?: string;
  lat?: string;
  lng?: string;
  gender?: 'male' | 'female';
}

// تعریف تایپ برای ورود کاربر
export interface LoginData {
  id?: string;
  full_name: string;
  phone_number: string;
  lat?: string;
  lng?: string;
}

// آدرس پایه API
const API_BASE_URL = 'https://n8n.monises.com/webhook';

/**
 * ثبت‌نام کاربر جدید
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    console.log('Register attempt with data:', data);
    
    // آماده‌سازی داده‌ها برای ارسال به API
    const jsonData = {
      body: {
        id: data.phone_number,
        full_name: data.full_name,
        phone_number: data.phone_number,
        city: data.city || '',
        age: data.age || '',
        lat: data.lat || '',
        lng: data.lng || '',
        gender: data.gender || 'male'
      }
    };
    
    console.log('Sending register request to:', `${API_BASE_URL}/Register`);
    console.log('Request payload:', jsonData);
    
    // ارسال درخواست با فرمت JSON
    const response = await axios.post(`${API_BASE_URL}/Register`, jsonData);
    
    console.log('Register response:', response.data);
    
    // ساخت داده کاربر حتی اگر پاسخ API خالی باشد
    let userData: User;
    
    if (response.data && (typeof response.data === 'object' || Array.isArray(response.data))) {
      // اگر پاسخ API آرایه باشد، اولین آیتم را استفاده کن
      userData = Array.isArray(response.data) ? response.data[0] : response.data;
    } else {
      // اگر پاسخ API خالی یا نامعتبر باشد، از داده‌های ورودی استفاده کن
      userData = {
        id: data.phone_number,
        full_name: data.full_name,
        phone_number: data.phone_number,
        city: data.city,
        age: data.age,
        gender: data.gender,
        lat: data.lat,
        lng: data.lng
      };
      console.log('Creating user data from input:', userData);
    }
    
    // اگر id وجود نداشت، از phone_number به عنوان id استفاده کن
    if (!userData.id && userData.phone_number) {
      userData.id = userData.phone_number;
    }
    
    console.log('Saving user data to localStorage:', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('خطا در ثبت‌نام کاربر:', error);
    throw error;
  }
};

/**
 * ورود کاربر
 */
export const loginUser = async (data: LoginData): Promise<User> => {
  try {
    console.log('Login attempt with data:', data);
    
    // دریافت اطلاعات کاربر از سرور
    console.log('Sending login request to:', `${API_BASE_URL}/login`);
    
    // تغییر متد به GET برای هماهنگی با بک‌اند
    const response = await axios.get(`${API_BASE_URL}/login`, {
      params: {
        phone_number: data.phone_number
      }
    });
    
    console.log('Login response:', response.data);
    
    // ساخت داده کاربر حتی اگر پاسخ API خالی باشد
    let userData: User;
    
    if (response.data && (typeof response.data === 'object' || Array.isArray(response.data))) {
      // اگر پاسخ API آرایه باشد، اولین آیتم را استفاده کن
      userData = Array.isArray(response.data) ? response.data[0] : response.data;
      
      // اضافه کردن اطلاعات موقعیت مکانی کاربر به داده‌های دریافتی از سرور
      if (data.lat && data.lng) {
        userData.lat = data.lat;
        userData.lng = data.lng;
        
        // به‌روزرسانی موقعیت مکانی کاربر در سرور
        try {
          const updateData = {
            body: {
              id: userData.id || userData.phone_number,
              lat: data.lat,
              lng: data.lng
            }
          };
          
          console.log('Updating user location:', updateData);
          const updateResponse = await axios.post(`${API_BASE_URL}/UpdateUserLocation`, updateData);
          console.log('Location update response:', updateResponse.data);
        } catch (updateError) {
          console.error('خطا در به‌روزرسانی موقعیت مکانی:', updateError);
          // ادامه روند ورود حتی در صورت خطا در به‌روزرسانی موقعیت
        }
      }
    } else {
      // اگر پاسخ API خالی یا نامعتبر باشد، از داده‌های ورودی استفاده کن
      userData = {
        id: data.phone_number,
        full_name: data.full_name,
        phone_number: data.phone_number,
        lat: data.lat,
        lng: data.lng
      };
      console.log('Creating user data from input:', userData);
    }
    
    // اگر id وجود نداشت، از phone_number به عنوان id استفاده کن
    if (!userData.id && userData.phone_number) {
      userData.id = userData.phone_number;
    }
    
    console.log('Saving user data to localStorage:', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('خطا در ورود کاربر:', error);
    throw error;
  }
};

/**
 * خروج کاربر
 */
export const logoutUser = (): void => {
  localStorage.removeItem('user');
};

/**
 * بررسی وضعیت احراز هویت کاربر
 */
export const checkAuth = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * دریافت کاربر فعلی
 */
export const getCurrentUser = (): User | null => {
  return checkAuth();
}; 