
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';

export function useApi() {
  const { session } = useAuth();
  
  /**
   * Make an authenticated request to your Supabase Edge Function
   */
  const callApi = useCallback(async <T>(endpoint: string, options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  } = {}) => {
    const { method = 'GET', body } = options;
    
    try {
      const { data, error } = await supabase.functions.invoke(`api${endpoint}`, {
        method,
        body,
        headers: session ? {
          Authorization: `Bearer ${session.access_token}`
        } : undefined
      });
      
      if (error) throw error;
      
      return { data: data as T, error: null };
    } catch (err: any) {
      console.error(`API error (${endpoint}):`, err);
      return { data: null, error: err.message || 'Unknown error occurred' };
    }
  }, [session]);
  
  return { callApi };
}
