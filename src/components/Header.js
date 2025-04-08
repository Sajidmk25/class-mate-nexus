
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center relative overflow-hidden">
              <span className="text-white font-bold">VC</span>
            </div>
            <span className={`font-bold text-xl transition-colors ${isScrolled ? 'text-blue-700' : 'text-gray-800'}`}>
              Virtual Classroom
            </span>
          </Link>
          
          <div className="md:hidden">
            <button 
              className="text-blue-700 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          <div className={`md:flex items-center space-x-4 ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-2' : 'hidden'}`}>
            <button 
              className="border border-blue-300 bg-white hover:bg-gray-50 text-blue-700 px-4 py-2 rounded"
              onClick={() => alert("Support dialog would open here")}
            >
              Support Us
            </button>
            
            {isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/dashboard">
                  <button className="border border-blue-300 bg-white hover:bg-gray-50 text-blue-700 px-4 py-2 rounded">
                    Dashboard
                  </button>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-red-500 hover:bg-red-50 px-4 py-2 rounded flex items-center gap-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="py-16"></div> {/* Spacer for fixed header */}
    </>
  );
};

export default Header;
