
import { ClipboardCheck, ClipboardList } from "lucide-react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Assignments = () => {
  const pendingAssignments = [
    {
      id: 1,
      title: "Calculus Problem Set",
      course: "Advanced Mathematics",
      due: "Tomorrow, 11:59 PM",
      status: "Not Started",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Introduction to Physics",
      due: "Apr 6, 11:59 PM",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Programming Assignment",
      course: "Computer Science Fundamentals",
      due: "Apr 8, 11:59 PM",
      status: "Not Started",
    },
  ];

  const completedAssignments = [
    {
      id: 4,
      title: "Math Quiz #3",
      course: "Advanced Mathematics",
      submitted: "Mar 28, 10:45 AM",
      grade: "92%",
    },
    {
      id: 5,
      title: "Physics Experiment Analysis",
      course: "Introduction to Physics",
      submitted: "Mar 25, 4:30 PM",
      grade: "88%",
    },
    {
      id: 6,
      title: "Algorithm Implementation",
      course: "Computer Science Fundamentals",
      submitted: "Mar 22, 9:15 PM",
      grade: "95%",
    },
  ];

  return (
    <Layout title="Assignments">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="pending" className="flex-1">
            <ClipboardList className="h-4 w-4 mr-2" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{assignment.course}</p>
                      <div className="flex items-center">
                        <Badge 
                          variant={assignment.status === "In Progress" ? "secondary" : "outline"}
                          className="mr-2"
                        >
                          {assignment.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Due: {assignment.due}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                      <Button variant="outline">View Details</Button>
                      <Button>Start Assignment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{assignment.course}</p>
                      <div className="flex items-center">
                        <Badge variant="success" className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                          Completed
                        </Badge>
                        <span className="text-sm text-gray-500">Submitted: {assignment.submitted}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="mr-4">
                        <p className="text-sm text-gray-500">Grade</p>
                        <p className="text-lg font-bold text-green-600">{assignment.grade}</p>
                      </div>
                      <Button variant="outline">View Feedback</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Assignments;
