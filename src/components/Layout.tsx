
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarHeader, useSidebar, SidebarInset } from "@/components/ui/sidebar";
import { Home, BookOpen, Video, MessageSquare, ClipboardList, Calendar, Users, BarChart, User, Sparkles, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({
  children,
  title
}: LayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/dashboard";

  // Dynamically set dashboard title based on user role
  const dashboardTitle = title || (user?.role === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard');

  return <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background/90 w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center">
                {showBackButton && <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="mr-4 border-white/20 bg-white/5 hover:bg-white/10 rounded-lg">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to Dashboard
                    </Button>
                  </Link>}
                {dashboardTitle && <h1 className="text-3xl font-bold text-gradient-header font-playfair">
                    {dashboardTitle}
                  </h1>}
              </div>
            </div>
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};

const AppSidebar = () => {
  const location = useLocation();
  const {
    isMobile
  } = useSidebar();
  const { user } = useAuth();
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home
    }, 
    {
      name: "Courses",
      path: "/courses",
      icon: BookOpen
    }, 
    {
      name: "Classroom",
      path: "/classroom",
      icon: Video
    }, 
    {
      name: "Messages",
      path: "/messages",
      icon: MessageSquare
    }, 
    {
      name: "Assignments",
      path: "/assignments",
      icon: ClipboardList
    }, 
    {
      name: "Schedule",
      path: "/schedule",
      icon: Calendar
    }, 
    {
      name: "Study Groups",
      path: "/study-groups",
      icon: Users
    }, 
    {
      name: "Grades",
      path: "/grades",
      icon: BarChart
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: Mail
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User
    }
  ];
  
  return <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent animate-pulse-light" />
          <span className="text-gradient font-bold text-xl font-playfair text-red-500">Student Portal</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path} tooltip={item.name}>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className={`h-4 w-4 ${location.pathname === item.path ? 'text-accent' : ''}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};

export default Layout;
