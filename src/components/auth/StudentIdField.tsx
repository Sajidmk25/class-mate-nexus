
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentIdFieldProps {
  studentId: string;
  setStudentId: (id: string) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export const StudentIdField = ({
  studentId,
  setStudentId,
  isDisabled = false,
  isRequired = true
}: StudentIdFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="studentId">Student ID</Label>
      <Input 
        id="studentId"
        placeholder="Enter your student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required={isRequired}
        disabled={isDisabled}
        className="bg-white border-white/20"
      />
    </div>
  );
};
