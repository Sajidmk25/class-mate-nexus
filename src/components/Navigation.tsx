import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Bell, 
  LogOut,
  User,
  Settings,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isTeacher, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-card shadow-md border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                <span className="text-gradient font-bold text-xl font-playfair">Sajid Mehmood</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="text-gray-300 hover:text-primary transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-white/20 hover:bg-white/10 flex items-center gap-2 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/30 hover:ring-primary/70 transition-all">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-white/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-primary capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-lg">Login</Button>
                </Link>
                <Button 
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-lg"
                >
                  {isLoading ? "Signing in..." : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Sign in with Google</span>
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            {isAuthenticated && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-white/20 hover:bg-white/10 mr-2 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-2 ring-2 ring-primary/30">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-white/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              className="hover:bg-white/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-card border-t border-white/10 backdrop-blur-md">
          <div className="pt-2 pb-3 space-y-1">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5" />
                    <span className="ml-2">Login</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleGoogleLogin();
                    setIsOpen(false);
                  }}
                  className="w-full text-left pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
                >
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="ml-2">Sign in with Google</span>
                  </div>
                </button>
              </>
            )}
          </div>
          
          {isAuthenticated && (
            <div className="border-t pt-4 pb-2 border-white/10">
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5" />
                  <span className="ml-2">Profile</span>
                </div>
              </Link>
              <Link
                to="/account"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Bell className="h-5 w-5" />
                  <span className="ml-2">Notifications</span>
                </div>
              </Link>
              <Link
                to="/settings"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5" />
                  <span className="ml-2">Settings</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary transition-colors"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
