
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const HeroSection = () => {
  const { isAuthenticated, loginWithGoogle, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl space-y-6">
          <span className="inline-block bg-deep-blue/10 text-deep-blue font-medium text-sm py-1 px-3 rounded-full">
            Learn from anywhere
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
            Welcome to <span className="text-gradient bg-gradient-to-r from-deep-blue to-accent handwritten-underline">EduConnect</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Join our interactive virtual classroom platform designed to make learning accessible, engaging, and effective in today's digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <button 
                    className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full sm:w-auto border border-deep-blue/20 text-deep-blue hover:bg-deep-blue/5 px-6 py-3 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full sm:w-auto">
                  <button 
                    className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </button>
                </Link>
                <button 
                  className="w-full sm:w-auto border border-deep-blue/20 text-deep-blue hover:bg-deep-blue/5 px-6 py-3 rounded-lg"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in with Google"}
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/20 to-accent/20 rounded-2xl blur-3xl opacity-30"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-deep-blue/10 overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Virtual Classroom Interface" 
              className="w-full h-auto rounded-xl"
              width="500"
              height="350"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
