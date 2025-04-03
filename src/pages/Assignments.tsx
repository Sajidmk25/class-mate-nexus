import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle, Clock, FileText, User } from "lucide-react";
import PageContent from "@/components/PageContent";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Math Homework", course: "Mathematics 101", dueDate: "2024-09-15", status: "completed" },
    { id: 2, title: "Essay on Shakespeare", course: "English Literature", dueDate: "2024-09-20", status: "pending" },
    { id: 3, title: "Lab Report", course: "Chemistry 201", dueDate: "2024-09-25", status: "pending" },
    { id: 4, title: "History Project", course: "World History", dueDate: "2024-09-30", status: "completed" },
  ]);

  return (
    <Layout title="Assignments">
      <PageContent
        icon={<FileText className="h-6 w-6" />}
        title="Your Assignments"
        description="Stay on top of your coursework with our comprehensive assignment tracker."
      >
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
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.status === "completed" ? (
                        <div className="text-sm text-green-500 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
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
                        {assignment.status === "completed" ? (
                          <Badge variant="secondary">Completed</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </PageContent>
    </Layout>
  );
};

export default Assignments;
