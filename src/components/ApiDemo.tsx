
import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const ApiDemo = () => {
  const { callApi } = useApi();
  const { isAuthenticated } = useAuth();
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testPublicEndpoint = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await callApi<{ message: string }>('/hello');
      
      if (error) {
        setError(error);
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const testProtectedEndpoint = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await callApi('/user');
      
      if (error) {
        setError(error);
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Testing</CardTitle>
        <CardDescription>Test backend API endpoints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Button onClick={testPublicEndpoint} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Test Public Endpoint'}
          </Button>
          
          <Button 
            onClick={testProtectedEndpoint} 
            disabled={isLoading || !isAuthenticated}
            variant="outline"
          >
            {isLoading ? 'Loading...' : 'Test Protected Endpoint'}
            {!isAuthenticated && ' (Login required)'}
          </Button>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            Error: {error}
          </div>
        )}
        
        {result && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiDemo;
