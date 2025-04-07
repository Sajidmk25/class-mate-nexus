
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useState } from "react";
import DonationDialog from "./DonationDialog";
const Header = () => {
  const {
    isAuthenticated,
    loginWithGoogle,
    logout
  } = useAuth();
  const [isDonationOpen, setIsDonationOpen] = useState(false);
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
  return <>
      <header className="bg-background/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gradient font-bold text-xl text-zinc-950">Virtual Classroom</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setIsDonationOpen(true)} className="border-white/20 hover:bg-white/10">
              Donate Now
            </Button>
            {isAuthenticated ? <div className="flex space-x-2">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">Dashboard</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="border-white/20 hover:bg-white/10 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div> : <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">Login</Button>
                </Link>
                <Button onClick={handleGoogleLogin} disabled={isLoading} className="flex items-center gap-2">
                  {isLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
              </div>}
          </div>
        </div>
      </header>
      
      <DonationDialog isOpen={isDonationOpen} onOpenChange={setIsDonationOpen} />
    </>;
};
export default Header;
