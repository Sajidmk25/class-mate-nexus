
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-deep-blue'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-blue to-accent flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold">EC</span>
            </div>
            <span className={`font-playfair font-bold text-xl transition-colors ${isScrolled ? 'text-deep-blue' : 'text-white'}`}>
              EduConnect
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-deep-blue font-medium`}>Home</a></li>
                <li><a href="#features" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-deep-blue font-medium`}>Features</a></li>
                <li><a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-deep-blue font-medium`}>Pricing</a></li>
                <li><a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-deep-blue font-medium`}>About</a></li>
                <li><a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-deep-blue font-medium`}>Contact</a></li>
              </ul>
            </nav>
            
            {isAuthenticated ? (
              <div className="flex space-x-4">
                <Link to="/dashboard">
                  <button className="bg-white text-deep-blue border border-deep-blue/20 hover:bg-deep-blue/5 px-4 py-2 rounded-lg transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-soft-red hover:bg-soft-red/10 px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="bg-white hover:bg-white/90 text-deep-blue px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden">
            <button 
              className={`${isScrolled ? 'text-deep-blue' : 'text-white'} p-2`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="py-4">
              <ul className="flex flex-col space-y-2 px-4">
                <li><a href="#" className="block py-2 text-gray-700 hover:text-deep-blue font-medium">Home</a></li>
                <li><a href="#features" className="block py-2 text-gray-700 hover:text-deep-blue font-medium">Features</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-deep-blue font-medium">Pricing</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-deep-blue font-medium">About</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-deep-blue font-medium">Contact</a></li>
              </ul>
              
              <div className="mt-4 px-4 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link to="/dashboard" className="w-full">
                      <button className="w-full bg-white text-deep-blue border border-deep-blue/20 hover:bg-deep-blue/5 px-4 py-2 rounded-lg">
                        Dashboard
                      </button>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-soft-red hover:bg-soft-red/10 px-4 py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="w-full">
                    <button className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white px-4 py-2 rounded-lg">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      <div className="py-16"></div> {/* Spacer for fixed header */}
    </>
  );
};

export default Header;
