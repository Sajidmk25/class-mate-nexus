
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { authService } from "@/services/auth.service";

// Import the new component files
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { AuthDivider } from "@/components/auth/AuthDivider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, loginWithGoogle, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("signup") === "true") {
      setActiveTab("signup");
    }
  }, [location]);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear error message when switching tabs
  useEffect(() => {
    setErrorMessage(null);
    setShowResetForm(false);
  }, [activeTab]);
  
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
      // Navigation is handled by the auth effect above
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
    
    setIsLoading(true);
    try {
      await signup(signupEmail, signupPassword, name, role);
      // Navigation is handled by the auth effect above
    } catch (error: any) {
      console.error("Signup failed:", error);
      setErrorMessage(error.message || "Signup failed. Please check your information and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await loginWithGoogle(activeTab === "signup" ? role : undefined);
    } catch (error: any) {
      console.error("Google login failed:", error);
      setErrorMessage(error.message || "Google login failed. Please try again or use another method.");
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
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/90 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gradient">Virtual Classroom</h1>
          <p className="mt-2 text-gray-400">Join our modern education platform</p>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Login to your account to continue</CardDescription>
              </CardHeader>
              <CardContent>
                {showResetForm ? (
                  <PasswordResetForm
                    email={resetEmail}
                    setEmail={setResetEmail}
                    isLoading={isLoading}
                    onSubmit={handleResetPassword}
                    onCancel={() => setShowResetForm(false)}
                  />
                ) : (
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isLoading={isLoading}
                    onSubmit={handleLogin}
                    onForgotPassword={() => setShowResetForm(true)}
                  />
                )}
              </CardContent>
              {!showResetForm && (
                <CardFooter className="flex-col gap-4">
                  <AuthDivider />
                  <GoogleButton 
                    onClick={handleGoogleLogin}
                    isLoading={isLoading}
                    isSignup={false}
                  />
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Join our virtual classroom as a student or teacher</CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm
                  name={name}
                  setName={setName}
                  email={signupEmail}
                  setEmail={setSignupEmail}
                  password={signupPassword}
                  setPassword={setSignupPassword}
                  confirmPassword={signupConfirmPassword}
                  setConfirmPassword={setSignupConfirmPassword}
                  role={role}
                  setRole={setRole}
                  isLoading={isLoading}
                  onSubmit={handleSignup}
                />
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <AuthDivider />
                <GoogleButton 
                  onClick={handleGoogleLogin}
                  isLoading={isLoading}
                  isSignup={true}
                />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
