// تنظیمات API نشان
// باید با کلید واقعی جایگزین شود که از پنل توسعه‌دهندگان نشان دریافت می‌شود
// https://developer.neshan.org/
export const NESHAN_API_KEY = 'service.b63f0774f987490badef53b7ea914059';

// استایل‌های نقشه نشان
export const neshanStyles = {
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  mapAttribution: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    direction: 'ltr',
    zIndex: '1',
    padding: '2px 5px',
    background: 'rgba(255, 255, 255, 0.7)',
    fontSize: '10px',
  }
};

// تعریف لایه‌های نقشه نشان
export const neshanLayers = {
  standard: 'https://static.neshan.org/sdk/leaflet/neshan-sdk.js',
  traffic: 'https://static.neshan.org/sdk/leaflet/v1.4.0/neshan-traffic-sdk.js',
  satellite: 'https://static.neshan.org/sdk/leaflet/v1.4.0/neshan-satellite-sdk.js',
};

// آدرس‌های API نشان
export const neshanApiEndpoints = {
  search: 'https://api.neshan.org/v1/search',
  reverseGeocode: 'https://api.neshan.org/v1/reverse',
  geocode: 'https://api.neshan.org/v1/geocoding',
  direction: 'https://api.neshan.org/v1/direction',
  distanceMatrix: 'https://api.neshan.org/v1/distance-matrix',
};

// تعریف نوع منابع حیاتی
interface ResourceType {
  title: string;
  icon: string;
  color: string;
  apiCategory: string;
}

// انواع منابع حیاتی
export const resourceTypes: { [key: string]: ResourceType } = {
  shelter: {
    title: 'پناهگاه‌ها',
    icon: 'home',
    color: '#4CAF50', // سبز
    apiCategory: 'shelter'
  },
  hospital: {
    title: 'بیمارستان‌ها',
    icon: 'local_hospital',
    color: '#f44336', // قرمز
    apiCategory: 'hospital'
  },
  pharmacy: {
    title: 'داروخانه‌ها',
    icon: 'local_pharmacy',
    color: '#4caf50', // سبز
    apiCategory: 'pharmacy'
  },
  gas: {
    title: 'پمپ بنزین‌ها',
    icon: 'local_gas_station',
    color: '#ff9800', // نارنجی
    apiCategory: 'gas_station'
  },
  water: {
    title: 'منابع آب',
    icon: 'water_drop',
    color: '#2196f3', // آبی روشن
    apiCategory: 'water_supply'
  }
}; 