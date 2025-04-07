
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
  
  async signup(email: string, password: string, name: string, role: UserRole) {
    try {
      console.log("Signing up user:", email, name, role);
      
      // First check if user already exists by trying to login
      try {
        console.log("Checking if user exists by attempting login");
        const { data: existingUserData } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        // If login succeeds, user already exists and credentials are correct
        if (existingUserData?.user) {
          console.log("User exists and credentials are correct, proceeding with login");
          toast({
            title: "Logged in successfully",
            description: `Welcome back! You already had an account with us.`,
          });
          return existingUserData;
        }
      } catch (checkError: any) {
        // If login fails with invalid credentials, it might mean user exists but password is wrong
        // or user does not exist. We need to differentiate.
        console.log("Check login failed:", checkError?.message);
        if (checkError?.message?.includes("Invalid login credentials")) {
          // Check specifically if the user exists but password is wrong
          const { data: userCheck } = await supabase.auth.admin.getUserByEmail(email);
          if (userCheck?.user) {
            console.error("User exists but password is incorrect");
            toast({
              title: "Account already exists",
              description: "An account with this email already exists. Please try logging in with the correct password or use the password reset option.",
              variant: "destructive",
            });
            throw new Error("Account exists with different password");
          }
        }
      }

      console.log("User doesn't exist or password is correct, creating new account");
      
      // User doesn't exist or login credentials matched, create new account
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
          // For development, we're bypassing email confirmation
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        
        // Special handling for already registered users
        if (error.message?.includes('already registered')) {
          console.log("User already registered, attempting auto-login");
          
          // User exists, try to login with provided credentials
          return await this.login(email, password);
        }
        
        throw error;
      }
      
      // For development purposes, auto-login without email confirmation
      if (!data.session) {
        console.log("No session after signup, attempting auto-login");
        
        // Wait a brief moment to ensure the user is created in the database
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (loginError) {
            console.error("Auto-login after signup failed:", loginError);
            
            if (loginError.message.includes("Email not confirmed")) {
              toast({
                title: "Account created",
                description: `Welcome to Virtual Classroom, ${name}! For demo purposes, you can login without email confirmation.`,
              });
              
              // Try login one more time without email verification
              try {
                await supabase.auth.signInWithPassword({
                  email,
                  password
                });
              } catch (finalLoginError) {
                console.error("Final login attempt failed:", finalLoginError);
              }
              
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
        } catch (autoLoginError) {
          console.error("Auto-login attempt failed:", autoLoginError);
          // Continue with the flow even if auto-login fails
        }
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
