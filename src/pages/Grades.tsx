
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Grades = () => {
  const [studentId, setStudentId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [grade, setGrade] = useState("");
  const [addedGrades, setAddedGrades] = useState<{
    studentId: string;
    courseName: string;
    assignmentName: string;
    grade: string;
  }[]>([]);
  
  const { toast } = useToast();
  
  const handleAddGrade = () => {
    // Validation
    if (!studentId || !courseName || !assignmentName || !grade) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add grade to list
    const newGrade = {
      studentId,
      courseName,
      assignmentName, 
      grade
    };
    
    setAddedGrades([...addedGrades, newGrade]);
    
    // Clear form
    setStudentId("");
    setCourseName("");
    setAssignmentName("");
    setGrade("");
    
    // Show success notification
    toast({
      title: "Grade added",
      description: `Grade of ${grade}% added for student ${studentId}`,
    });
  };
  
  return (
    <Layout title="Grades">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Student Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input 
                      id="studentId"
                      placeholder="Enter student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input 
                      id="courseName"
                      placeholder="Enter course name"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentName">Assignment Name</Label>
                    <Input 
                      id="assignmentName"
                      placeholder="Enter assignment name"
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade (%)</Label>
                    <Input 
                      id="grade"
                      placeholder="Enter grade percentage"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                
                <Button onClick={handleAddGrade} className="w-full">Add Grade</Button>
              </div>
            </CardContent>
          </Card>
          
          {addedGrades.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recently Added Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addedGrades.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.studentId}</TableCell>
                        <TableCell>{item.courseName}</TableCell>
                        <TableCell>{item.assignmentName}</TableCell>
                        <TableCell className="text-right font-medium">{item.grade}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Grading Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Grade Scale</h3>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>A: 90-100%</li>
                    <li>B: 80-89%</li>
                    <li>C: 70-79%</li>
                    <li>D: 60-69%</li>
                    <li>F: Below 60%</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Instructions</h3>
                  <p className="text-sm text-gray-500">
                    Enter the student's ID, course name, assignment name, and grade percentage.
                    All grades are saved temporarily for this session only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Grades;
