
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth.types';
import { User as SupabaseUser } from '@supabase/supabase-js';

export const mapSupabaseUserToUser = (supaUser: SupabaseUser): User => {
  const userRole = supaUser.user_metadata.role as UserRole || 'student';
  
  return {
    id: supaUser.id,
    name: supaUser.user_metadata.name || supaUser.email?.split('@')[0] || 'User',
    email: supaUser.email || '',
    photoURL: supaUser.user_metadata.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    role: userRole,
    phone: supaUser.phone || '',
    bio: supaUser.user_metadata.bio || '',
    studentId: supaUser.user_metadata.studentId || ''
  };
};

export const authService = {
  async login(email: string, password: string) {
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
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back!`,
      });
      
      return data;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  async signup(email: string, password: string, name: string, role: UserRole, metadata?: Record<string, any>) {
    try {
      console.log("Signing up user:", email, name, role);
      
      // Default metadata if not provided
      const defaultMetadata = {
        name,
        role,
        avatar_url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        bio: role === 'teacher' 
          ? "Experienced educator with a passion for interactive learning." 
          : "Student with a passion for learning and collaboration."
      };
      
      // Merge provided metadata with defaults
      const userMetadata = { ...defaultMetadata, ...(metadata || {}) };
      
      // User doesn't exist or login credentials matched, create new account
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
        
        // Special handling for already registered users
        if (error.message?.includes('already registered')) {
          console.log("User already registered, attempting auto-login");
          return await this.login(email, password);
        }
        
        throw error;
      }
      
      toast({
        title: "Account created successfully",
        description: `Welcome to Virtual Classroom, ${name}!`,
      });
      
      return data;
    } catch (error: any) {
      console.error("Signup error:", error);
      
      if (error.message?.includes('already registered')) {
        toast({
          title: "Account already exists",
          description: "Please try logging in instead, or use a different email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: error.message || "There was an issue creating your account. Please try again.",
          variant: "destructive",
        });
      }
      
      throw error;
    }
  },
  
  async logout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  },
  
  async updateProfile(userId: string, data: Partial<User>) {
    const { error } = await supabase.auth.updateUser({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        phone: data.phone,
      }
    });
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  },
  
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },
  
  async resetPassword(email: string) {
    try {
      // Get the current origin for proper redirect
      const origin = window.location.origin;
      
      // Create a more reliable redirect URL
      const redirectTo = `${origin}/reset-password`;
      
      console.log("Reset password redirect URL:", redirectTo);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password",
      });
      
      return true;
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Error sending reset email",
        description: error.message || "There was a problem sending the reset email. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
};

