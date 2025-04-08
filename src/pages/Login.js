
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple Login Form Component
function LoginForm({ email, setEmail, password, setPassword, isLoading, onSubmit, onForgotPassword }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <div className="form-footer">
          <div></div>
          <a href="#" onClick={onForgotPassword}>Forgot password?</a>
        </div>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

// Simple Signup Form Component
function SignupForm({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, 
                     role, setRole, isLoading, onSubmit, studentId, setStudentId }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input 
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label>Account Type</label>
        <div style={{ display: 'flex', gap: '15px', margin: '5px 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="role" 
              value="student" 
              checked={role === "student"} 
              onChange={() => setRole("student")}
              style={{ width: 'auto', marginRight: '5px' }}
            />
            Student
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="role" 
              value="teacher" 
              checked={role === "teacher"} 
              onChange={() => setRole("teacher")}
              style={{ width: 'auto', marginRight: '5px' }}
            />
            Teacher
          </label>
        </div>
      </div>
      
      {role === "student" && (
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input 
            id="studentId"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

// Simple Password Reset Form
function PasswordResetForm({ email, setEmail, isLoading, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="reset-email">Email</label>
        <input 
          id="reset-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          style={{ backgroundColor: '#f1f1f1', color: '#333' }}
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
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
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-title">Virtual Classroom</h1>
        <p className="login-subtitle">Access your account</p>
      </div>
      
      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>
      
      {errorMessage && (
        <div className="error-message">
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
  );
}

export default Login;
