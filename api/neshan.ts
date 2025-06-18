import { NESHAN_API_KEY, neshanApiEndpoints } from '../lib/neshan-config';

// تعریف انواع داده‌ها
export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface Distance {
  amount: number | null;
  unit: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface NeshanResource {
  id?: string;
  title: string;
  address: string;
  category: string;
  location: {
    x: number;
    y: number;
  };
  neighbourhood?: string;
  region?: string;
  type?: string;
  distance?: number;
}

export interface NeshanSearchResponse {
  count: number;
  items: NeshanResource[];
}

export interface NeshanReverseResponse {
  status: string;
  neighbourhood: string;
  municipality_zone: string;
  state: string;
  city: string;
  formatted_address: string;
  route_name: string;
  route_type: string;
  place?: {
    name: string;
    type: string;
  };
}

export interface NeshanDirection {
  routes: {
    legs: {
      duration: {
        text: string;
        value: number;
      };
      distance: {
        text: string;
        value: number;
      };
      steps: any[];
    }[];
    overview_polyline: {
      points: string;
    };
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

// تبدیل نوع NeshanResource به MapirResource برای سازگاری با کد فعلی
export const convertNeshanToMapirResource = (resource: NeshanResource): any => {
  return {
    province: resource.region || '',
    county: '',
    district: '',
    city: resource.region || '',
    region: resource.region || '',
    neighborhood: resource.neighbourhood || '',
    village: '',
    name: resource.title || null,
    title: resource.title || null,
    address: resource.address || '',
    type: 'point',
    subcategory: resource.category || 'shelter',
    location: {
      type: 'point',
      coordinates: [resource.location.x, resource.location.y],
      x: resource.location.x,
      y: resource.location.y
    },
    distance: {
      amount: resource.distance || null,
      unit: 'meters'
    }
  };
};

// توابع API

// جستجوی مکان با کلیدواژه
export const searchPlaces = async (
  term: string,
  lat?: number,
  lon?: number,
  radius: number = 5000
): Promise<any[]> => {
  try {
    let url = `${neshanApiEndpoints.search}?term=${encodeURIComponent(term)}`;
    
    // اگر موقعیت داده شده باشد، محدود به آن منطقه می‌کنیم
    if (lat && lon) {
      url += `&lat=${lat}&lng=${lon}&distance=${radius}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'api-key': NESHAN_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Error searching places: ${response.status}`);
    }

    const data: NeshanSearchResponse = await response.json();
    // تبدیل به فرمت سازگار با کد فعلی
    return data.items.map(convertNeshanToMapirResource);
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

// جستجوی مکان‌های نزدیک با دسته‌بندی
export const searchNearbyPlaces = async (
  lat: number,
  lon: number,
  category: string,
  radius: number = 1000
): Promise<any[]> => {
  try {
    // ترجمه دسته‌بندی به عبارت جستجو
    let searchTerm = category;
    
    // استفاده از عبارت جستجوی بهتر برای هر نوع
    switch (category) {
      case 'hospital':
        searchTerm = 'بیمارستان';
        break;
      case 'pharmacy':
        searchTerm = 'داروخانه';
        break;
      case 'shelter':
        searchTerm = 'پناهگاه';
        break;
      case 'gas_station':
        searchTerm = 'پمپ بنزین';
        break;
      case 'water_supply':
        searchTerm = 'آب';
        break;
    }
    
    // استفاده از جستجوی معمولی با عبارت بهینه‌شده
    const response = await fetch(
      `${neshanApiEndpoints.search}?term=${encodeURIComponent(searchTerm)}&lat=${lat}&lng=${lon}&distance=${radius}`,
      {
        headers: {
          'api-key': NESHAN_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error searching nearby places: ${response.status}`);
    }

    const data: NeshanSearchResponse = await response.json();
    
    // تبدیل به فرمت سازگار با کد فعلی
    return data.items.map(item => {
      const resource = convertNeshanToMapirResource(item);
      // اضافه کردن دسته‌بندی مناسب
      resource.subcategory = matchCategoryToResource(category, item.title);
      return resource;
    });
  } catch (error) {
    console.error('Error searching nearby places:', error);
    return [];
  }
};

// تبدیل مختصات به آدرس
export const reverseGeocode = async (lat: number, lon: number): Promise<NeshanReverseResponse> => {
  try {
    const response = await fetch(
      `${neshanApiEndpoints.reverseGeocode}?lat=${lat}&lng=${lon}`,
      {
        headers: {
          'api-key': NESHAN_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error in reverse geocoding: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    throw error;
  }
};

// تبدیل آدرس به مختصات
export const geocode = async (address: string): Promise<{ location: { x: number, y: number } }> => {
  try {
    const response = await fetch(
      `${neshanApiEndpoints.geocode}?address=${encodeURIComponent(address)}`,
      {
        headers: {
          'api-key': NESHAN_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error in geocoding: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in geocoding:', error);
    throw error;
  }
};

// تابع کمکی برای دریافت موقعیت فعلی کاربر
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    }
  });
};

// مسیریابی
export const getDirections = async (
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  type: 'car' | 'motorcycle' = 'car'
): Promise<NeshanDirection> => {
  try {
    const response = await fetch(
      `${neshanApiEndpoints.direction}?origin=${originLat},${originLon}&destination=${destLat},${destLon}&type=${type}`,
      {
        headers: {
          'api-key': NESHAN_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error getting directions: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting directions:', error);
    throw error;
  }
};

// تطبیق دسته‌بندی با عنوان مکان
const matchCategoryToResource = (category: string, title: string = ''): string => {
  const lowerTitle = title.toLowerCase();
  
  // تطبیق دسته‌بندی بر اساس عنوان
  if (category === 'shelter' || 
      lowerTitle.includes('پناهگاه') || 
      lowerTitle.includes('اسکان') ||
      lowerTitle.includes('پناه')) {
    return 'shelter';
  }
  
  if (category === 'hospital' || 
      lowerTitle.includes('بیمارستان') || 
      lowerTitle.includes('درمانگاه') ||
      lowerTitle.includes('کلینیک') ||
      lowerTitle.includes('مرکز درمانی')) {
    return 'hospital';
  }
  
  if (category === 'pharmacy' || 
      lowerTitle.includes('داروخانه') ||
      lowerTitle.includes('دارو')) {
    return 'pharmacy';
  }
  
  if (category === 'gas_station' || 
      lowerTitle.includes('پمپ بنزین') || 
      lowerTitle.includes('جایگاه سوخت') ||
      lowerTitle.includes('پمپ گاز')) {
    return 'gas_station';
  }
  
  if (category === 'water_supply' || 
      lowerTitle.includes('آب') || 
      lowerTitle.includes('منبع آب') ||
      lowerTitle.includes('مخزن آب')) {
    return 'water_supply';
  }
  
  // برگرداندن دسته‌بندی پیش‌فرض
  return category;
}; 