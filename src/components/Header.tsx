
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import DonationDialog from "./DonationDialog";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-blue to-accent flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-white animate-pulse-light" />
              <div className="absolute inset-0 bg-gradient-shimmer bg-200% animate-shimmer opacity-60"></div>
            </div>
            <span className={`font-playfair font-bold text-xl transition-colors ${isScrolled ? 'text-deep-blue' : 'text-dark-gray'}`}>
              <span className="text-gradient inline-block">Virtual</span> Classroom
            </span>
          </Link>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-deep-blue"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <div className={`md:flex items-center space-x-4 ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-2' : 'hidden'}`}>
            <Button 
              variant="outline" 
              onClick={() => setIsDonationOpen(true)} 
              className="border-deep-blue/20 bg-white/60 hover:bg-white/80 text-deep-blue hover:text-deep-blue hand-drawn-button"
            >
              Support Us
            </Button>
            
            {isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-deep-blue/20 bg-white/60 hover:bg-white/80 text-deep-blue">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="flex items-center gap-2 text-soft-red hover:bg-soft-red/10 hover:text-soft-red"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button 
                    variant="default"
                    className="bg-deep-blue hover:bg-deep-blue/90 text-white relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300"
                  >
                    <span className="relative z-10">Sign In</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="py-16"></div> {/* Spacer for fixed header */}
      
      <DonationDialog isOpen={isDonationOpen} onOpenChange={setIsDonationOpen} />
    </>
  );
};

export default Header;
