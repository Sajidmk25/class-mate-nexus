
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle, Clock, FileText, Plus, PencilLine, Trash } from "lucide-react";
import PageContent from "@/components/PageContent";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "completed" | "pending" | "late";
  description?: string;
}

const Assignments = () => {
  const { isTeacher } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Math Homework", course: "Mathematics 101", dueDate: "2024-09-15", status: "completed", description: "Complete problems 1-20 from Chapter 5." },
    { id: 2, title: "Essay on Shakespeare", course: "English Literature", dueDate: "2024-09-20", status: "pending", description: "Write a 1000-word essay analyzing the themes in Hamlet." },
    { id: 3, title: "Lab Report", course: "Chemistry 201", dueDate: "2024-09-25", status: "pending", description: "Document your observations and results from the acid-base titration experiment." },
    { id: 4, title: "History Project", course: "World History", dueDate: "2024-09-30", status: "completed", description: "Research and present on a significant historical event from the 20th century." },
  ]);

  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, "id" | "status">>({
    title: "",
    course: "",
    dueDate: "",
    description: "",
  });

  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] = useState<number | null>(null);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(null);

  const courses = [
    "Mathematics 101",
    "English Literature",
    "Chemistry 201",
    "World History",
    "Computer Science Fundamentals",
    "Biology 101",
    "Advanced Mathematics",
    "Introduction to Physics"
  ];

  const handleAddAssignment = () => {
    if (!newAssignment.title.trim() || !newAssignment.course || !newAssignment.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newAssignmentItem: Assignment = {
      id: assignments.length + 1,
      ...newAssignment,
      status: "pending",
    };

    setAssignments([...assignments, newAssignmentItem]);
    setNewAssignment({
      title: "",
      course: "",
      dueDate: "",
      description: "",
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Assignment added",
      description: `${newAssignmentItem.title} has been added to the assignments.`,
    });
  };

  const handleEditAssignment = () => {
    if (!editingAssignment || !editingAssignment.title.trim() || !editingAssignment.course || !editingAssignment.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedAssignments = assignments.map(assignment => 
      assignment.id === editingAssignment.id ? editingAssignment : assignment
    );

    setAssignments(updatedAssignments);
    setEditingAssignment(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Assignment updated",
      description: `${editingAssignment.title} has been updated.`,
    });
  };

  const handleDeleteAssignment = () => {
    if (assignmentToDelete === null) return;
    
    const assignmentToRemove = assignments.find(assignment => assignment.id === assignmentToDelete);
    const updatedAssignments = assignments.filter(assignment => assignment.id !== assignmentToDelete);
    setAssignments(updatedAssignments);
    setAssignmentToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Assignment deleted",
      description: `${assignmentToRemove?.title} has been removed.`,
    });
  };

  const handleStatusChange = (assignmentId: number, newStatus: "completed" | "pending" | "late") => {
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === assignmentId ? {...assignment, status: newStatus} : assignment
    );
    
    setAssignments(updatedAssignments);
    
    const assignment = assignments.find(a => a.id === assignmentId);
    toast({
      title: `Assignment marked as ${newStatus}`,
      description: `${assignment?.title} has been updated.`,
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout title="Assignments">
      <PageContent
        icon={<FileText className="h-6 w-6" />}
        title="Your Assignments"
        description="Stay on top of your coursework with our comprehensive assignment tracker."
      >
        {isTeacher && (
          <div className="mb-6 flex justify-end">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Add a new assignment for your students.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      placeholder="e.g., Midterm Essay"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select 
                      onValueChange={(value) => setNewAssignment({...newAssignment, course: value})}
                      value={newAssignment.course}
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      placeholder="Assignment details and instructions"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddAssignment}>Create Assignment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <Card className="shadow-none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <CalendarDays className="h-4 w-4 mr-1 inline-block" />
                        {formatDate(assignment.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.status === "completed" ? (
                        <div className="text-sm text-green-500 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
                        </div>
                      ) : assignment.status === "late" ? (
                        <div className="text-sm text-red-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Late
                        </div>
                      ) : (
                        <div className="text-sm text-yellow-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="ml-auto flex items-center space-x-2">
                        {!isTeacher && (
                          <>
                            {assignment.status !== "completed" ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleStatusChange(assignment.id, "completed")}
                              >
                                Mark as Complete
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleStatusChange(assignment.id, "pending")}
                              >
                                Mark as Pending
                              </Button>
                            )}
                          </>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setViewingAssignment(assignment);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          View
                        </Button>
                        
                        {isTeacher && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingAssignment(assignment);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setAssignmentToDelete(assignment.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* View Assignment Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewingAssignment?.title}</DialogTitle>
              <DialogDescription>
                Assignment Details
              </DialogDescription>
            </DialogHeader>
            
            {viewingAssignment && (
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Course</p>
                    <p className="text-sm">{viewingAssignment.course}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Due Date</p>
                    <p className="text-sm">{formatDate(viewingAssignment.dueDate)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant={
                      viewingAssignment.status === "completed" ? "default" : 
                      viewingAssignment.status === "late" ? "destructive" : "outline"
                    }
                  >
                    {viewingAssignment.status.charAt(0).toUpperCase() + viewingAssignment.status.slice(1)}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-sm whitespace-pre-line">{viewingAssignment.description || "No description provided."}</p>
                </div>
                
                {!isTeacher && viewingAssignment.status !== "completed" && (
                  <div className="mt-6">
                    <Button 
                      className="w-full"
                      onClick={() => {
                        handleStatusChange(viewingAssignment.id, "completed");
                        setIsViewDialogOpen(false);
                      }}
                    >
                      Submit Assignment
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Edit Assignment Dialog */}
        {isTeacher && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogDescription>
                  Make changes to the assignment details.
                </DialogDescription>
              </DialogHeader>
              
              {editingAssignment && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-title">Assignment Title</Label>
                    <Input
                      id="edit-title"
                      value={editingAssignment.title}
                      onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-course">Course</Label>
                    <Select 
                      onValueChange={(value) => setEditingAssignment({...editingAssignment, course: value})}
                      value={editingAssignment.course}
                    >
                      <SelectTrigger id="edit-course">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-dueDate">Due Date</Label>
                    <Input
                      id="edit-dueDate"
                      type="date"
                      value={editingAssignment.dueDate}
                      onChange={(e) => setEditingAssignment({...editingAssignment, dueDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select 
                      onValueChange={(value: "completed" | "pending" | "late") => 
                        setEditingAssignment({...editingAssignment, status: value})
                      }
                      value={editingAssignment.status}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editingAssignment.description || ""}
                      onChange={(e) => setEditingAssignment({...editingAssignment, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingAssignment(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleEditAssignment}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Delete Assignment Dialog */}
        {isTeacher && (
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Assignment</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this assignment? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setAssignmentToDelete(null);
                }}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAssignment}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </PageContent>
    </Layout>
  );
};

export default Assignments;
