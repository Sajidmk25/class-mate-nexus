import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, MessageSquare, ClipboardList, Calendar, Users, BarChart, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Sample data
  const upcomingClasses = [
    { id: 1, title: "Advanced Mathematics", time: "Today, 10:00 AM", students: 24 },
    { id: 2, title: "Introduction to Physics", time: "Today, 2:00 PM", students: 18 },
    { id: 3, title: "Computer Science Fundamentals", time: "Tomorrow, 9:00 AM", students: 30 },
  ];

  const pendingAssignments = [
    { id: 1, title: "Calculus Problem Set", course: "Advanced Mathematics", due: "Tomorrow", submissions: 15 },
    { id: 2, title: "Physics Lab Report", course: "Introduction to Physics", due: "In 3 days", submissions: 8 },
    { id: 3, title: "Programming Assignment", course: "Computer Science Fundamentals", due: "In 5 days", submissions: 12 },
  ];

  // Determine if user is a student
  const isStudent = user?.role !== 'teacher';

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
                  <Video className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                  <div>
                    <Link to="/classroom" className="font-medium hover:text-brand-blue">
                      {cls.title}
                    </Link>
                    <div className="text-sm text-gray-500">{cls.time} • {cls.students} students</div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link to="/schedule" className="text-sm text-brand-blue hover:underline">
                  View Full Schedule
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/courses" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <BookOpen className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Courses</span>
              </Link>
              <Link to="/grades" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <BarChart className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Grades</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <MessageSquare className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Messages</span>
              </Link>
              <Link to="/assignments" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <ClipboardList className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Assignments</span>
              </Link>
            </div>
            
            {/* Contact Teachers button for students */}
            {isStudent && (
              <div className="mt-4">
                <Link to="/contacts">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Teachers
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
                  <ClipboardList className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                  <div className="flex-1">
                    <Link to="/assignments" className="font-medium hover:text-brand-blue">
                      {assignment.title}
                    </Link>
                    <div className="text-sm text-gray-500">{assignment.course}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Due {assignment.due}</div>
                    <div className="text-xs text-gray-500">{assignment.submissions} submissions</div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link to="/assignments" className="text-sm text-brand-blue hover:underline">
                  View All Assignments
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/classroom" className="font-medium hover:text-brand-blue">
                  Advanced Mathematics
                </Link>
                <div className="text-sm text-gray-500">24 students</div>
              </div>
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/classroom" className="font-medium hover:text-brand-blue">
                  Introduction to Physics
                </Link>
                <div className="text-sm text-gray-500">18 students</div>
              </div>
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/classroom" className="font-medium hover:text-brand-blue">
                  Computer Science Fundamentals
                </Link>
                <div className="text-sm text-gray-500">30 students</div>
              </div>
              <div className="text-center">
                <Link to="/courses" className="text-sm text-brand-blue hover:underline">
                  View All Classes
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
