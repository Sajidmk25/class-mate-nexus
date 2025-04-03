
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const location = useLocation();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Button>
              </Link>
            )}
            {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
