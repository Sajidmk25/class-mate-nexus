
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, BookOpen, Video, MessageSquare, ClipboardList, 
  Calendar, Users, GraduationCap, User, Settings, Phone, 
  ShieldAlert, LogOut
} from "lucide-react";
import { useWindowSize } from "@/hooks/use-mobile";
import { UserRole } from "@/types/auth.types";

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isMobile } = useWindowSize();
  const [activeItem, setActiveItem] = useState("");
  
  // Helper function to get appropriate navigation items based on user role
  const getNavigationForRole = (role: UserRole) => {
    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { name: 'Courses', href: '/courses', icon: <BookOpen className="h-5 w-5" /> },
      { name: 'Classroom', href: '/classroom', icon: <Video className="h-5 w-5" /> },
      { name: 'Messages', href: '/messages', icon: <MessageSquare className="h-5 w-5" /> },
      { name: 'Assignments', href: '/assignments', icon: <ClipboardList className="h-5 w-5" /> },
      { name: 'Schedule', href: '/schedule', icon: <Calendar className="h-5 w-5" /> },
      { name: 'Study Groups', href: '/study-groups', icon: <Users className="h-5 w-5" /> },
    ];
    
    // Add grade-related pages only for students
    if (role === 'student') {
      navigation.push(
        { name: 'Grades', href: '/grades', icon: <GraduationCap className="h-5 w-5" /> }
      );
    }

    // Add contacts page for both roles
    navigation.push(
      { name: 'Contacts', href: '/contacts', icon: <Phone className="h-5 w-5" /> }
    );
    
    // Add admin page for admin users
    if (role === 'admin') {
      navigation.push(
        { name: 'Admin', href: '/admin', icon: <ShieldAlert className="h-5 w-5" /> }
      );
    }
    
    // Add profile & settings
    navigation.push(
      { name: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
      { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> }
    );
    
    return navigation;
  };

  // Update active item based on location changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  if (!user) return null;

  const navigationItems = getNavigationForRole(user.role);

  return (
    <nav className="flex flex-col">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            activeItem === item.href ? "bg-primary/5 text-primary" : "transparent"
          )}
        >
          {item.icon}
          {!isMobile && <span>{item.name}</span>}
        </Link>
      ))}
      
      <Separator className="my-2" />
      
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary justify-start"
        )}
        onClick={() => logout()}
      >
        <LogOut className="h-5 w-5" />
        {!isMobile && <span>Logout</span>}
      </Button>
    </nav>
  );
};

export default Navigation;
