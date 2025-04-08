
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const StudentIdField = ({
  studentId,
  setStudentId,
  isDisabled = false,
  isRequired = true
}) => {
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
