
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut, ArrowRight, Award, BookOpen, Users } from "lucide-react";

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
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 items-center gap-10 mb-16">
        <div className="space-y-6">
          <div className="inline-block py-1 px-3 rounded-full bg-deep-blue/10 text-deep-blue font-medium text-sm mb-2">
            Next-generation learning
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block font-playfair">Transform Education with</span>
            <span className="text-gradient bg-gradient-to-r from-deep-blue to-accent">
              Modern Virtual Learning
            </span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Engage with interactive lessons, connect with educators, and access
            a personalized learning experience designed for today's digital world.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-deep-blue hover:bg-deep-blue/90 text-white flex items-center gap-2 group"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full sm:w-auto border-deep-blue/20 text-dark-gray hover:bg-deep-blue/10 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-deep-blue hover:bg-deep-blue/90 text-white flex items-center gap-2 group shadow-lg shadow-deep-blue/20"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-deep-blue/20 bg-white/80 hover:bg-deep-blue/5 text-dark-gray"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/10 to-emerald/5 rounded-2xl -rotate-2 scale-105"></div>
          <div className="absolute inset-0 border border-deep-blue/20 rounded-2xl rotate-2 scale-[1.03]"></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-xl z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-gradient-to-br from-deep-blue/5 to-accent/5 rounded-lg p-4 border border-deep-blue/10">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-deep-blue" />
                  Featured Course
                </h3>
                <p className="font-playfair font-bold">Advanced Physics: Wave Theory</p>
                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-deep-blue rounded-full w-[70%]"></div>
                </div>
              </div>
              <div className="col-span-1 bg-gradient-to-br from-emerald/5 to-emerald/10 rounded-lg p-4 border border-emerald/10">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald" />
                  Achievements
                </h3>
                <p className="text-sm">12 badges earned</p>
              </div>
              <div className="col-span-1 bg-gradient-to-br from-amber/5 to-amber/10 rounded-lg p-4 border border-amber/10">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber" />
                  Study Groups
                </h3>
                <p className="text-sm">3 active groups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed the feature cards section */}
    </section>
  );
};

export default HeroSection;
