
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
  Phone
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
  const { user, logout, isAuthenticated, isTeacher } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-card shadow-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-gradient font-bold text-xl">Virtual Classroom</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <div className="flex items-center mr-4 text-gray-300">
              <Phone size={16} className="mr-1" />
              <span className="text-sm">+971 582424005</span>
            </div>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-gray-300 hover:text-primary">
                  <Bell className="h-5 w-5" />
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL} alt={user?.name} />
                        <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">Login</Button>
                </Link>
                <Link to="/login?signup=true">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-card border-t border-white/10">
          <div className="pt-2 pb-3 space-y-1">
            <div className="flex items-center mb-4 pl-3">
              <Phone size={16} className="mr-1" />
              <span className="text-sm text-gray-300">+971 582424005</span>
            </div>
            
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5" />
                    <span className="ml-2">Login</span>
                  </div>
                </Link>
                <Link
                  to="/login?signup=true"
                  className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5" />
                    <span className="ml-2">Sign Up</span>
                  </div>
                </Link>
              </>
            )}
          </div>
          
          {isAuthenticated && (
            <div className="border-t pt-4 pb-2 border-white/10">
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5" />
                  <span className="ml-2">Profile</span>
                </div>
              </Link>
              <Link
                to="/account"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Bell className="h-5 w-5" />
                  <span className="ml-2">Notifications</span>
                </div>
              </Link>
              <Link
                to="/settings"
                className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
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
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-300 hover:text-primary hover:border-primary"
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
