import axios from 'axios';

// تعریف تایپ مشکل
export interface Problem {
  id: number;
  Name: string;
  Descritpion: string; // میدانیم که این غلط املایی است اما با API هماهنگ است
  price: string;
  NationalCode: string;
  Family: string;
  Address: string;
  createdAt?: string;
}

// تعریف تایپ برای ایجاد مشکل جدید
export interface CreateProblemData {
  Name: string;
  Descritpion: string; // میدانیم که این غلط املایی است اما با API هماهنگ است
  price: string;
  NationalCode: string;
  Family: string;
  Address: string;
}

// تعریف تایپ برای ایجاد راه‌حل جدید
export interface CreateSolutionData {
  Name: string;
  Descritpion: string; // میدانیم که این غلط املایی است اما با API هماهنگ است
  price: string;
  NationalCode: string;
  Family: string;
  Address: string;
}

// آدرس پایه API
const API_BASE_URL = 'https://n8n.monises.com/webhook';

/**
 * دریافت لیست تمام مشکلات
 */
export const fetchAllProblems = async (): Promise<Problem[]> => {
  try {
    console.log('Fetching all problems from:', `${API_BASE_URL}/GettingAllProblems`);
    const response = await axios.get(`${API_BASE_URL}/GettingAllProblems`);
    
    console.log('--- RAW N8N API RESPONSE ---');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('----------------------------');

    if (!response.data) {
        console.log('API returned no data. Returning empty array.');
        return [];
    }
    
    let problems: any[] = [];
    
    // Try to handle multiple possible response formats based on N8N structure
    if (Array.isArray(response.data)) {
      if (response.data.length === 0) {
        return [];
      }
      
      // Check if the items have a json property (n8n format)
      if (response.data[0] && response.data[0].json) {
        problems = response.data.map(item => item.json).filter(Boolean);
      } else {
        // Assume the array itself contains the problem objects
        problems = response.data.filter(Boolean);
      }
    } else if (typeof response.data === 'object') {
      // Handle single object response
      if (response.data.json) {
        problems = [response.data.json];
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // Handle {data: [...]} format
        problems = response.data.data.filter(Boolean);
      } else {
        // Assume the object itself is the problem
        problems = [response.data];
      }
    }
    
    console.log('Extracted problems from response:', JSON.stringify(problems, null, 2));
    
    // Map to the Problem interface with better error handling
    const result = problems
      .filter(p => p && typeof p === 'object')
      .map((p: any, index: number) => ({
        id: p.id || p.ID || index + 1,
        Name: p.Name || '',
        Descritpion: p.Descritpion || p.Description || '',
        price: p.price || p.Price || '0',
        NationalCode: p.NationalCode || '',
        Family: p.Family || '',
        Address: p.Address || '',
        createdAt: p.createdAt || new Date().toISOString(),
      }));
    
    console.log(`Successfully processed ${result.length} problems.`);
    
    console.log(`Successfully processed ${result.length} problems.`);
    return result;
  } catch (error) {
    console.error('!!! FATAL ERROR fetching problems !!!');
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error config:', error.config);
      console.error('Error request:', error.request);
    } else {
      console.error('Unexpected error:', error);
    }
    return []; // Return empty array on error to prevent site crash
  }
};

/**
 * ثبت مشکل جدید
 */
export const createProblem = async (data: CreateProblemData): Promise<any> => {
  try {
    console.log('Creating problem with data:', data);
    
    console.log('Sending request to:', `${API_BASE_URL}/PrblemState`);
    console.log('Request payload:', data);
    
    // ارسال درخواست در قالب JSON
    const response = await axios.post(`${API_BASE_URL}/PrblemState`, data);
    
    console.log('Problem creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('خطا در ثبت مشکل جدید:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    }
    throw error;
  }
};

/**
 * دریافت لیست تمام راه‌حل‌ها
 */
export const fetchAllSolutions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GettingAllSoloutions`);
    
    console.log('Full API Response (Solutions):', response.data);

    // n8n returns an array of items, each with a 'json' property containing the data.
    const items = Array.isArray(response.data) ? response.data : [response.data];
    
    // Extract the 'json' property from each item
    const data = items.map(item => item.json).filter(Boolean);

    console.log('Extracted data (Solutions):', data);
    
    // اضافه کردن id به هر آیتم اگر نداشته باشد و فیلترکردن آیتم‌های نامعتبر
    const result = data
      .filter(item => item && (typeof item === 'object'))
      .map((item: any, index: number) => ({
        id: item.id || index + 1,
        Name: item.Name || '',
        Descritpion: item.Descritpion || '',
        price: item.price || '0',
        NationalCode: item.NationalCode || '',
        Family: item.Family || '',
        Address: item.Address || '',
        createdAt: item.createdAt || new Date().toISOString(),
      }));

    console.log('Final processed solutions:', result);
    return result;
  } catch (error) {
    console.error('خطا در دریافت لیست راه‌حل‌ها:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    }
    throw error;
  }
};

/**
 * ثبت راه‌حل جدید
 */
export const createSolution = async (data: CreateSolutionData): Promise<any> => {
  try {
    console.log('Creating solution with data:', data);
    
    console.log('Sending request to:', `${API_BASE_URL}/SoloutionState`);
    console.log('Request payload:', data);
    
    // ارسال درخواست در قالب JSON
    const response = await axios.post(`${API_BASE_URL}/SoloutionState`, data);
    
    console.log('Solution creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('خطا در ثبت راه‌حل جدید:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    }
    throw error;
  }
}; 