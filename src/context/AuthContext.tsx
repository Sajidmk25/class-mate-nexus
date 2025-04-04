
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string, role?: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  loginWithGoogle: (role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
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

  const login = async (email: string, password: string, name?: string, role?: UserRole) => {
    try {
      setIsLoading(true);
      // This is a mock login, in a real app you would use a real authentication service
      // For demo purposes, we'll create a mock user with the requested role
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: name || "Student User",
        email: email,
        photoURL: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        role: role || 'student',
        phone: "(555) 123-4567",
        bio: role === 'teacher' 
          ? "Experienced educator with a passion for interactive learning." 
          : "Student with a passion for learning and collaboration."
      };
      
      setUser(mockUser);
      localStorage.setItem('educonnect_user', JSON.stringify(mockUser));
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // This is a mock signup, in a real app you would register a new user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        photoURL: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        role: role,
        phone: "",
        bio: role === 'teacher' 
          ? "Experienced educator with a passion for interactive learning." 
          : "Student with a passion for learning and collaboration."
      };
      
      setUser(mockUser);
      localStorage.setItem('educonnect_user', JSON.stringify(mockUser));
      toast({
        title: "Account created successfully",
        description: `Welcome to EduConnect, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (role?: UserRole) => {
    try {
      setIsLoading(true);
      // In a real app, this would open Google authentication
      // Simulate Google authentication response
      setTimeout(() => {
        const mockUser: User = {
          id: `google_user_${Date.now()}`,
          name: "Google User",
          email: "google.user@example.com",
          photoURL: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          role: role || 'student',
          phone: "(555) 987-6543",
          bio: "Student using Google authentication for virtual learning."
        };
        
        setUser(mockUser);
        localStorage.setItem('educonnect_user', JSON.stringify(mockUser));
        toast({
          title: "Logged in with Google",
          description: `Welcome, ${mockUser.name}!`,
        });
        setIsLoading(false);
      }, 1000); // Simulate network delay
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google login failed",
        description: "Please try again or use another method.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('educonnect_user', JSON.stringify(updatedUser));
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
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
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isLoading,
    isTeacher: user?.role === 'teacher',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
