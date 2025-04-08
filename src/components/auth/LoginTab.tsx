
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { PasswordResetForm } from "./PasswordResetForm";

interface LoginTabProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  resetEmail: string;
  setResetEmail: (email: string) => void;
  isLoading: boolean;
  showResetForm: boolean;
  setShowResetForm: (show: boolean) => void;
  errorMessage: string | null;
  handleLogin: (e: React.FormEvent) => void;
  handleResetPassword: (e: React.FormEvent) => void;
}

export const LoginTab: React.FC<LoginTabProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  resetEmail,
  setResetEmail,
  isLoading,
  showResetForm,
  setShowResetForm,
  errorMessage,
  handleLogin,
  handleResetPassword
}) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        {showResetForm ? (
          <PasswordResetForm
            email={resetEmail}
            setEmail={setResetEmail}
            isLoading={isLoading}
            onSubmit={handleResetPassword}
            onCancel={() => setShowResetForm(false)}
          />
        ) : (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={handleLogin}
            onForgotPassword={() => setShowResetForm(true)}
          />
        )}
      </CardContent>
    </Card>
  );
};
