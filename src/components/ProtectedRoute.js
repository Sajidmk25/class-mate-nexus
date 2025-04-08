
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const ProtectedRoute = ({ children, requireTeacher = false }) => {
  const { isAuthenticated, isLoading, isTeacher } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if teacher access is required but user is not a teacher
  if (requireTeacher && !isTeacher) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute;
