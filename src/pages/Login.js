
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple components
function LoginForm({ email, setEmail, password, setPassword, isLoading, onSubmit, onForgotPassword }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:underline" 
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        <input 
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

function SignupForm({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, 
                     role, setRole, isLoading, onSubmit, studentId, setStudentId }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-gray-700">Full Name</label>
        <input 
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-gray-700">Account Type</label>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input 
              type="radio" 
              id="student" 
              name="role" 
              value="student" 
              checked={role === "student"} 
              onChange={() => setRole("student")}
            />
            <label htmlFor="student" className="cursor-pointer">Student</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="radio" 
              id="teacher" 
              name="role" 
              value="teacher" 
              checked={role === "teacher"} 
              onChange={() => setRole("teacher")}
            />
            <label htmlFor="teacher" className="cursor-pointer">Teacher</label>
          </div>
        </div>
      </div>
      
      {role === "student" && (
        <div className="space-y-2">
          <label htmlFor="studentId" className="block text-gray-700">Student ID</label>
          <input 
            id="studentId"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            disabled={isLoading}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

function PasswordResetForm({ email, setEmail, isLoading, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="reset-email" className="block text-gray-700">Email</label>
        <input 
          id="reset-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-2">
        <button 
          type="button" 
          className="flex-1 p-2 border rounded hover:bg-gray-100"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send reset email"}
        </button>
      </div>
    </form>
  );
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  
  // Login state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  
  // Reset password form
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  
  const { login, signup } = useAuth();
  
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
  }, [activeTab]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await login(email, password);
      // Redirect handled by isAuthenticated effect
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      const metadata = role === "student" ? { studentId } : {};
      await signup(signupEmail, signupPassword, name, role, metadata);
      // Redirect handled by isAuthenticated effect
    } catch (error) {
      setErrorMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // This functionality would be connected to your authentication service
      console.log("Password reset requested for:", resetEmail);
      alert(`Password reset email would be sent to ${resetEmail}`);
      setShowResetForm(false);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">Virtual Classroom</h1>
          <p className="mt-2 text-gray-600">Join our modern education platform</p>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button 
              className={`py-2 px-4 text-center rounded ${activeTab === 'login' ? 
                'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`py-2 px-4 text-center rounded ${activeTab === 'signup' ? 
                'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            
            {activeTab === "login" ? (
              showResetForm ? (
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
              )
            ) : (
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
                studentId={studentId}
                setStudentId={setStudentId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
