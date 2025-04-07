
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GoogleButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isSignup?: boolean;
}

export const GoogleButton = ({ 
  onClick, 
  isLoading,
  isSignup = false 
}: GoogleButtonProps) => {
  return (
    <Button 
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className="w-full border-white/20"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isSignup ? 'Signing up with Google...' : 'Connecting with Google...'}
        </>
      ) : (isSignup ? "Sign up with Google" : "Login with Google")}
    </Button>
  );
};
