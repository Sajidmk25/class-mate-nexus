
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginLogic } from "@/hooks/useLoginLogic";
import { LoginTab } from "@/components/auth/LoginTab";
import { SignupTab } from "@/components/auth/SignupTab";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  
  const {
    // Auth state
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
  } = useLoginLogic();
  
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

  useEffect(() => {
    setErrorMessage(null);
  }, [activeTab, setErrorMessage]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/90 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gradient">Virtual Classroom</h1>
          <p className="mt-2 text-gray-400">Join our modern education platform</p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value)} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginTab
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              isLoading={isLoading}
              showResetForm={showResetForm}
              setShowResetForm={setShowResetForm}
              errorMessage={errorMessage}
              handleLogin={handleLogin}
              handleResetPassword={handleResetPassword}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupTab
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
              errorMessage={errorMessage}
              onSubmit={handleSignup}
              studentId={studentId}
              setStudentId={setStudentId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
