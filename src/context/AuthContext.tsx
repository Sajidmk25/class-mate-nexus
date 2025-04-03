
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isTeacher: boolean;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('educonnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This is a mock login, in a real app you would use a real authentication service
      // For demo purposes, we'll create a mock user with student role by default
      const mockUser: User = {
        id: '123456',
        name: 'Student User',
        email: email,
        photoURL: 'https://i.pravatar.cc/150?img=3',
        role: 'student',
      };
      
      setUser(mockUser);
      localStorage.setItem('educonnect_user', JSON.stringify(mockUser));
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // This is a mock Google login, in a real app you would integrate with Google Auth
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: '123456',
        name: 'Google User',
        email: 'google.user@example.com',
        photoURL: 'https://i.pravatar.cc/150?img=4',
        role: 'student',
      };
      
      setUser(mockUser);
      localStorage.setItem('educonnect_user', JSON.stringify(mockUser));
      toast({
        title: "Logged in with Google",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google login failed",
        description: "Please try again or use another method.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('educonnect_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
    isLoading,
    isTeacher: user?.role === 'teacher',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
