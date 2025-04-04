
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePassword, setGooglePassword] = useState("");
  const [googleRole, setGoogleRole] = useState<"student" | "teacher">("student");
  const { login, signup, loginWithGoogle, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Your passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signup(signupEmail, signupPassword, name, role);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate with Google's API
    // For this demo, we'll just simulate the process
    if (!googleEmail.includes('@') || googlePassword.length < 6) {
      toast({
        title: "Invalid credentials",
        description: "Please enter a valid email and password (min 6 characters).",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await loginWithGoogle(googleRole);
      setIsGoogleAuthOpen(false);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "There was a problem with Google authentication.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleAuthOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {!isGoogleAuthOpen ? (
        <Card className="w-full max-w-md">
          <Tabs defaultValue="signin">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome to EduConnect</CardTitle>
              <TabsList className="mt-4 grid w-full grid-cols-2">
                <TabsTrigger value="signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="signin">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Sign In</Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full" 
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Sign in with Google
                </Button>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="role"
                          value="student"
                          checked={role === "student"}
                          onChange={() => setRole("student")}
                          className="h-4 w-4"
                        />
                        <span>Student</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="role"
                          value="teacher"
                          checked={role === "teacher"}
                          onChange={() => setRole("teacher")}
                          className="h-4 w-4"
                        />
                        <span>Teacher</span>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign in with Google</CardTitle>
            <CardDescription>Enter your Google account credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGoogleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-email">Google Email</Label>
                <Input
                  id="google-email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-password">Password</Label>
                <Input
                  id="google-password"
                  type="password"
                  placeholder="••••••••"
                  value={googlePassword}
                  onChange={(e) => setGooglePassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="google-role"
                      value="student"
                      checked={googleRole === "student"}
                      onChange={() => setGoogleRole("student")}
                      className="h-4 w-4"
                    />
                    <span>Student</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="google-role"
                      value="teacher"
                      checked={googleRole === "teacher"}
                      onChange={() => setGoogleRole("teacher")}
                      className="h-4 w-4"
                    />
                    <span>Teacher</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsGoogleAuthOpen(false)}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">Continue</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Login;
