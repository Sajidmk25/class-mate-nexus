
import { useState } from "react";
import { BookOpen, Plus, PencilLine, Trash } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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
import { toast } from "@/components/ui/use-toast";

const Courses = () => {
  const { isTeacher } = useAuth();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Johnson",
      progress: 65,
      description: "A comprehensive course covering advanced mathematical concepts and their applications.",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Introduction to Physics",
      instructor: "Prof. Smith",
      progress: 42,
      description: "Learn the fundamental principles of physics and how they explain the world around us.",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Computer Science Fundamentals",
      instructor: "Dr. Williams",
      progress: 78,
      description: "An introduction to the core concepts of computer science and programming.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Biology 101",
      instructor: "Dr. Martinez",
      progress: 30,
      description: "Explore the fascinating world of living organisms and biological systems.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [editingCourse, setEditingCourse] = useState<null | {
    id: number;
    title: string;
    description: string;
    image: string;
  }>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  const handleAddCourse = () => {
    if (!newCourse.title.trim()) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }

    const newCourseItem = {
      id: courses.length + 1,
      title: newCourse.title,
      instructor: "You",
      progress: 0,
      description: newCourse.description || "No description provided",
      image: newCourse.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    };

    setCourses([...courses, newCourseItem]);
    setNewCourse({
      title: "",
      description: "",
      image: "",
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Course added",
      description: `${newCourseItem.title} has been added to your courses`,
    });
  };

  const handleEditCourse = () => {
    if (!editingCourse || !editingCourse.title.trim()) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }

    const updatedCourses = courses.map(course => 
      course.id === editingCourse.id ? {
        ...course,
        title: editingCourse.title,
        description: editingCourse.description || course.description,
        image: editingCourse.image || course.image,
      } : course
    );

    setCourses(updatedCourses);
    setEditingCourse(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Course updated",
      description: `${editingCourse.title} has been updated`,
    });
  };

  const handleDeleteCourse = () => {
    if (courseToDelete === null) return;
    
    const courseToRemove = courses.find(course => course.id === courseToDelete);
    const updatedCourses = courses.filter(course => course.id !== courseToDelete);
    setCourses(updatedCourses);
    setCourseToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Course deleted",
      description: `${courseToRemove?.title} has been removed from your courses`,
    });
  };

  return (
    <Layout title="My Courses">
      {isTeacher && (
        <div className="mb-6 flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Create a new course for your students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="e.g., Introduction to Machine Learning"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Brief description of the course content"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({...newCourse, image: e.target.value})}
                    placeholder="https://example.com/course-image.jpg"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCourse}>Add Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{course.title}</CardTitle>
              <p className="text-sm text-gray-500">{course.instructor}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              <div className="mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-blue h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  View Materials
                </Button>
                <Link to="/classroom" className="flex-1">
                  <Button className="w-full">Enter Class</Button>
                </Link>
              </div>
              
              {isTeacher && (
                <div className="flex ml-2">
                  <Dialog open={isEditDialogOpen && editingCourse?.id === course.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setEditingCourse(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingCourse({
                          id: course.id,
                          title: course.title,
                          description: course.description,
                          image: course.image,
                        })}
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                          Make changes to the course details.
                        </DialogDescription>
                      </DialogHeader>
                      {editingCourse && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-title">Course Title</Label>
                            <Input
                              id="edit-title"
                              value={editingCourse.title}
                              onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={editingCourse.description}
                              onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                              id="edit-image"
                              value={editingCourse.image}
                              onChange={(e) => setEditingCourse({...editingCourse, image: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setIsEditDialogOpen(false);
                          setEditingCourse(null);
                        }}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditCourse}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isDeleteDialogOpen && courseToDelete === course.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) setCourseToDelete(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setCourseToDelete(course.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this course? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setIsDeleteDialogOpen(false);
                          setCourseToDelete(null);
                        }}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteCourse}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Courses;
