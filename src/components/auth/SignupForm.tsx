
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types/auth.types";

interface SignupFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignupForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  role,
  setRole,
  isLoading,
  onSubmit
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className="bg-white border-white/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="bg-white border-white/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input 
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="bg-white border-white/20"
        />
        <p className="text-xs text-gray-500">Must be at least 6 characters</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input 
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          className="bg-white border-white/20"
        />
      </div>
      <div className="space-y-2">
        <Label>I am a...</Label>
        <RadioGroup 
          value={role} 
          onValueChange={(value) => setRole(value as UserRole)} 
          className="grid grid-cols-2 gap-4 pt-2"
        >
          <div>
            <RadioGroupItem value="student" id="student" className="peer sr-only" />
            <Label
              htmlFor="student"
              className="flex flex-col items-center justify-between rounded-md border-2 border-white/20 bg-white p-4 hover:bg-white/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Student</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
            <Label
              htmlFor="teacher"
              className="flex flex-col items-center justify-between rounded-md border-2 border-white/20 bg-white p-4 hover:bg-white/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Teacher</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : "Sign Up"}
      </Button>
    </form>
  );
};
