
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, MessageSquare, ClipboardList, Calendar, Users, BarChart } from "lucide-react";

const Dashboard = () => {
  // Sample data
  const upcomingClasses = [
    { id: 1, title: "Advanced Mathematics", time: "Today, 10:00 AM", instructor: "Dr. Johnson" },
    { id: 2, title: "Introduction to Physics", time: "Today, 2:00 PM", instructor: "Prof. Smith" },
    { id: 3, title: "Computer Science Fundamentals", time: "Tomorrow, 9:00 AM", instructor: "Dr. Williams" },
  ];

  const recentAssignments = [
    { id: 1, title: "Calculus Problem Set", course: "Advanced Mathematics", due: "Tomorrow", status: "Pending" },
    { id: 2, title: "Physics Lab Report", course: "Introduction to Physics", due: "In 3 days", status: "Not Started" },
    { id: 3, title: "Programming Assignment", course: "Computer Science Fundamentals", due: "In 5 days", status: "In Progress" },
  ];

  return (
    <Layout title="Student Dashboard">
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
                    <div className="text-sm text-gray-500">{cls.time} • {cls.instructor}</div>
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
              <Link to="/assignments" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <ClipboardList className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Assignments</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <MessageSquare className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Messages</span>
              </Link>
              <Link to="/grades" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50">
                <BarChart className="h-8 w-8 text-brand-blue mb-2" />
                <span className="text-sm font-medium">Grades</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment) => (
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
                    <div className="text-xs text-gray-500">{assignment.status}</div>
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
            <CardTitle>Your Study Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/study-groups" className="font-medium hover:text-brand-blue">
                  Mathematics Study Group
                </Link>
                <div className="text-sm text-gray-500">8 members</div>
              </div>
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/study-groups" className="font-medium hover:text-brand-blue">
                  Physics Lab Partners
                </Link>
                <div className="text-sm text-gray-500">4 members</div>
              </div>
              <div className="p-3 border rounded-md hover:bg-gray-50">
                <Link to="/study-groups" className="font-medium hover:text-brand-blue">
                  CS Project Team
                </Link>
                <div className="text-sm text-gray-500">6 members</div>
              </div>
              <div className="text-center">
                <Link to="/study-groups" className="text-sm text-brand-blue hover:underline">
                  View All Groups
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
