
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

// Create the auth context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state changed:", event, currentSession?.user?.id);
      
      setSession(currentSession);
      setUser(currentSession?.user || null);
    });

    // Check for existing session
    const initializeSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        console.log("Initial session check:", initialSession?.user?.id);
        
        setSession(initialSession);
        setUser(initialSession?.user || null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeSession();

    // Clean up subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful:", data.user?.id);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (email, password, name, role, metadata = {}) => {
    try {
      console.log("Signing up user:", email, name, role);
      
      // Default metadata
      const defaultMetadata = {
        name,
        role,
        avatar_url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        bio: role === 'teacher' 
          ? "Experienced educator with a passion for interactive learning." 
          : "Student with a passion for learning and collaboration."
      };
      
      // Merge provided metadata with defaults
      const userMetadata = { ...defaultMetadata, ...metadata };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Auth context value
  const value = {
    user,
    session,
    login,
    signup,
    logout,
    isAuthenticated: !!session,
    isLoading,
    isTeacher: user?.user_metadata?.role === 'teacher',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
