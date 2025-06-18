import { MAPIR_API_KEY } from '../lib/mapir-config';

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

export interface MapirResource {
  province: string;
  county: string;
  district: string;
  city: string;
  region: string;
  neighborhood: string;
  village: string;
  name: string | null;
  address: string;
  type: string;
  subcategory: string;
  location: Location;
  distance: Distance;
  geometry?: Geometry;
}

export interface MapirListResponse {
  'odata.count': number;
  value: MapirResource[];
}

export interface MapirCountResponse {
  data: {
    count: number;
  };
}

export interface MapirNearestResponse {
  data: MapirResource;
}

// توابع API
export const fetchNearestResources = async (
  lat: number, 
  lon: number, 
  category: string
): Promise<MapirResource> => {
  try {
    const response = await fetch(
      `https://map.ir/places/air-nearest?$filter=lat eq ${lat} and lon eq ${lon} and subcategory eq ${category}`,
      {
        headers: {
          'x-api-key': MAPIR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching nearest resources: ${response.status}`);
    }

    const data: MapirNearestResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching nearest resources:', error);
    throw error;
  }
};

export const countResourcesInArea = async (
  lat: number,
  lon: number,
  category: string,
  buffer: number
): Promise<number> => {
  try {
    const response = await fetch(
      `https://map.ir/places/count?$filter=lat eq ${lat} and lon eq ${lon} and subcategory eq ${category} and buffer eq ${buffer}`,
      {
        headers: {
          'x-api-key': MAPIR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error counting resources: ${response.status}`);
    }

    const data: MapirCountResponse = await response.json();
    return data.data.count;
  } catch (error) {
    console.error('Error counting resources:', error);
    throw error;
  }
};

export const listResourcesInArea = async (
  lat: number,
  lon: number,
  category: string,
  buffer: number,
  skip: number = 0,
  top: number = 20
): Promise<MapirResource[]> => {
  try {
    const response = await fetch(
      `https://map.ir/places/list?$skip=${skip}&$top=${top}&$filter=lat eq ${lat} and lon eq ${lon} and subcategory eq ${category} and buffer eq ${buffer} and sort eq true`,
      {
        headers: {
          'x-api-key': MAPIR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${await response.text()}`);
      throw new Error(`Error listing resources: ${response.status}`);
    }

    const data: MapirListResponse = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error listing resources:', error);
    // برگرداندن آرایه خالی در صورت خطا به جای پرتاب خطا
    return [];
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
        timeout: 5000,
        maximumAge: 0,
      });
    }
  });
}; 