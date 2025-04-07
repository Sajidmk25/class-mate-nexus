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
    bio: supaUser.user_metadata.bio || ''
  };
};

export const authService = {
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
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
  
  async signup(email: string, password: string, name: string, role: UserRole) {
    try {
      console.log("Signing up user:", email, name, role);
      
      // First check if user already exists
      const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // If login succeeds, user already exists and has the correct password
      if (existingUser?.user) {
        console.log("User already exists and credentials are correct, logging in");
        toast({
          title: "Logged in successfully",
          description: `Welcome back! You already had an account with us.`,
        });
        return existingUser;
      }

      // If login fails for reasons other than "user not found", it's an actual error
      if (checkError && !checkError.message.includes("Invalid login credentials")) {
        console.error("Error checking for existing user:", checkError);
        throw checkError;
      }

      console.log("User doesn't exist, creating new account");
      
      // User doesn't exist, create a new account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            avatar_url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            bio: role === 'teacher' 
              ? "Experienced educator with a passion for interactive learning." 
              : "Student with a passion for learning and collaboration."
          },
          // Set emailRedirectTo for email confirmation
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      // For development purposes, auto-login without email confirmation
      if (!data.session) {
        console.log("No session after signup, attempting auto-login");
        
        // Wait a brief moment to ensure the user is created in the database
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (loginError) {
          console.error("Auto-login after signup failed:", loginError);
          
          // Special case: If auto-login fails with "Email not confirmed", 
          // we'll show a more user-friendly message but still consider the signup successful
          if (loginError.message.includes("Email not confirmed")) {
            toast({
              title: "Account created successfully",
              description: `Welcome to Virtual Classroom, ${name}! Please check your email to confirm your account.`,
            });
            
            // Return the signup data even though login failed
            return data;
          }
          
          throw loginError;
        }
        
        console.log("Auto-login successful:", loginData.user?.id);
        toast({
          title: "Account created successfully",
          description: `Welcome to Virtual Classroom, ${name}!`,
        });
        return loginData;
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
  
  async loginWithGoogle(role?: UserRole) {
    // Get the current domain, adjusting for localhost
    const domain = window.location.hostname === 'localhost' 
      ? `${window.location.protocol}//${window.location.host}`
      : window.location.origin;
    
    // Create redirect URL that will handle the return from Google auth
    const redirectTo = `${domain}/dashboard`;
    console.log("Redirect URL:", redirectTo);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
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
  }
};
