
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "./SignupForm";
import { UserRole } from "@/types/auth.types";

interface SignupTabProps {
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
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => void;
  studentId: string;
  setStudentId: (id: string) => void;
}

export const SignupTab: React.FC<SignupTabProps> = ({
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
  errorMessage,
  onSubmit,
  studentId,
  setStudentId
}) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Join our virtual classroom as a student or teacher</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <SignupForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          role={role}
          setRole={setRole}
          isLoading={isLoading}
          onSubmit={onSubmit}
          studentId={studentId}
          setStudentId={setStudentId}
        />
      </CardContent>
    </Card>
  );
};
