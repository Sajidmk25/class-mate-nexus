
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireTeacher?: boolean;
}

const ProtectedRoute = ({ children, requireTeacher = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isTeacher } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // This avoids state updates during render
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    if (!isLoading && requireTeacher && !isTeacher) {
      navigate('/dashboard');
    }
  }, [isLoading, isAuthenticated, isTeacher, requireTeacher, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  if (requireTeacher && !isTeacher) {
    return null; // Will be redirected by useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
