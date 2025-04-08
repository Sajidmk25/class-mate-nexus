
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut, ArrowRight } from "lucide-react";

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
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Virtual Classroom
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Modern education in a digital world
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                onClick={handleLogout}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
