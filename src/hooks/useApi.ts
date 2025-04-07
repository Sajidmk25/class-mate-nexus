
import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';

// API base URL - change this to your Node.js server in production
const API_BASE_URL = 'http://localhost:5000';

export function useApi() {
  const { session } = useAuth();
  
  /**
   * Make an authenticated request to your Node.js Express API
   */
  const callApi = useCallback(async <T>(endpoint: string, options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  } = {}) => {
    const { method = 'GET', body } = options;
    
    try {
      console.log(`Calling API: ${endpoint} with method: ${method}`);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      // Add authorization header if session exists
      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred');
      }
      
      return { data: data as T, error: null };
    } catch (err: any) {
      console.error(`API error (${endpoint}):`, err);
      return { data: null, error: err.message || 'Unknown error occurred' };
    }
  }, [session]);
  
  return { callApi };
}
