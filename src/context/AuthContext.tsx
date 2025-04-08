
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { AuthContextType, User, UserRole } from '@/types/auth.types';
import { useAuthState } from '@/hooks/useAuthState';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, supabaseUser, session, isLoading } = useAuthState();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
    } catch (error: any) {
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
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    metadata?: Record<string, any>
  ) => {
    try {
      await authService.signup(email, password, name, role, metadata);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user || !supabaseUser) return;
    
    try {
      setUpdatingProfile(true);
      
      await authService.updateProfile(user.id, data);
    } catch (error: any) {
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
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "There was a problem logging you out.",
        variant: "destructive",
      });
    }
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

