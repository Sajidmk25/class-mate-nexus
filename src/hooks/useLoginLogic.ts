
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth.types";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.service";

export function useLoginLogic() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [studentId, setStudentId] = useState("");
  
  // Password reset state
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage(error.message === "Invalid login credentials" 
        ? "Invalid email or password. Please check your credentials and try again." 
        : (error.message || "Login failed. Please check your credentials and try again."));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!signupEmail || !signupPassword || !name) {
      setErrorMessage("Please fill out all required fields");
      return;
    }
    
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    
    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    
    // Validate student ID if role is student
    if (role === "student" && !studentId) {
      setErrorMessage("Student ID is required for student accounts");
      return;
    }
    
    setIsLoading(true);
    try {
      // Include studentId in the signup metadata if role is student
      const metadata = role === "student" 
        ? { name, role, studentId } 
        : { name, role };
        
      await signup(signupEmail, signupPassword, name, role, metadata);
    } catch (error: any) {
      console.error("Signup failed:", error);
      if (error.message?.includes('different password')) {
        setErrorMessage("An account with this email already exists. Please use a different email or try to reset your password.");
      } else if (!error.message?.includes('already registered')) {
        setErrorMessage(error.message || "Signup failed. Please check your information and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!resetEmail) {
      setErrorMessage("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.resetPassword(resetEmail);
      setShowResetForm(false);
      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password",
      });
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setErrorMessage(error.message || "Password reset failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Auth state
    isAuthenticated,
    isLoading,
    errorMessage,
    setErrorMessage,
    
    // Login state & handlers
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    
    // Signup state & handlers
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    name,
    setName,
    role,
    setRole,
    studentId,
    setStudentId,
    handleSignup,
    
    // Reset password state & handlers
    resetEmail,
    setResetEmail,
    showResetForm,
    setShowResetForm,
    handleResetPassword,
  };
}
