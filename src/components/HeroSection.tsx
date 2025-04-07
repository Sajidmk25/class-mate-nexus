
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut } from "lucide-react";

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
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-gradient">Modern Virtual Education</span> Platform
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto glass-card">Go to Dashboard</Button>
            </Link>
            <Button 
              size="lg" 
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto glass-card">Login</Button>
            </Link>
            {/* Google login button temporarily hidden until configured in Supabase 
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
            */}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
