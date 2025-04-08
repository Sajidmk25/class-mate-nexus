
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { useAuthState } from '@/hooks/useAuthState';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, supabaseUser, session, isLoading } = useAuthState();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (
    email, 
    password, 
    name, 
    role,
    metadata
  ) => {
    try {
      await authService.signup(email, password, name, role, metadata);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (data) => {
    if (!user || !supabaseUser) return;
    
    try {
      setUpdatingProfile(true);
      
      await authService.updateProfile(user.id, data);
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "There was a problem logging you out.",
        variant: "destructive",
      });
    }
  };

  // Adding a no-op function for loginWithGoogle to satisfy the interface
  const loginWithGoogle = async () => {
    toast({
      title: "Google login unavailable",
      description: "This feature has been disabled.",
      variant: "destructive",
    });
  };

  const value = {
    user,
    supabaseUser,
    session,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!session,
    isLoading: isLoading || updatingProfile,
    isTeacher: user?.role === 'teacher',
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
