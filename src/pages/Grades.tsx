
import { BarChart } from "lucide-react";
import Layout from "@/components/Layout";
import PageContent from "@/components/PageContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Grades = () => {
  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      grade: 92,
      progress: 65,
      assignments: [
        { name: "Quiz 1", grade: 88 },
        { name: "Quiz 2", grade: 92 },
        { name: "Quiz 3", grade: 95 },
        { name: "Midterm", grade: 91 },
        { name: "Problem Set 1", grade: 94 },
      ]
    },
    {
      id: 2,
      name: "Introduction to Physics",
      grade: 86,
      progress: 42,
      assignments: [
        { name: "Lab 1", grade: 90 },
        { name: "Quiz 1", grade: 82 },
        { name: "Lab 2", grade: 88 },
        { name: "Midterm", grade: 84 },
      ]
    },
    {
      id: 3,
      name: "Computer Science Fundamentals",
      grade: 94,
      progress: 78,
      assignments: [
        { name: "Programming Assignment 1", grade: 96 },
        { name: "Quiz 1", grade: 92 },
        { name: "Programming Assignment 2", grade: 98 },
        { name: "Midterm", grade: 90 },
      ]
    },
    {
      id: 4,
      name: "Biology 101",
      grade: 84,
      progress: 30,
      assignments: [
        { name: "Lab Report 1", grade: 87 },
        { name: "Quiz 1", grade: 78 },
        { name: "Group Project", grade: 92 },
      ]
    },
  ];

  const gradeData = courses.map(course => ({
    name: course.name.split(' ').slice(0, 2).join(' '), // Shorten the name for the chart
    grade: course.grade
  }));

  const overallGPA = (courses.reduce((sum, course) => sum + course.grade, 0) / courses.length / 20).toFixed(2);

  return (
    <Layout title="Grades">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Grade Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={gradeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Grade']}
                      labelFormatter={(label) => `Course: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="grade" name="Current Grade" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-medium">{course.name}</h3>
                      <div className="text-right">
                        <span className="text-2xl font-bold">{course.grade}%</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({course.grade >= 90 ? 'A' : course.grade >= 80 ? 'B' : course.grade >= 70 ? 'C' : course.grade >= 60 ? 'D' : 'F'})
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-blue" 
                          style={{ width: `${course.grade}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>Course progress: {course.progress}%</span>
                      <span>{course.assignments.length} assignments</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <h3 className="text-sm text-gray-500 mb-1">Current GPA</h3>
                <div className="text-4xl font-bold">{overallGPA}</div>
                <div className="text-sm text-gray-500 mt-1">out of 4.0</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Grade</span>
                    <span className="text-sm font-medium">
                      {Math.round(courses.reduce((sum, course) => sum + course.grade, 0) / courses.length)}%
                    </span>
                  </div>
                  <Progress value={Math.round(courses.reduce((sum, course) => sum + course.grade, 0) / courses.length)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">
                      {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                    </span>
                  </div>
                  <Progress value={Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Assignments Completed</span>
                    <span className="text-sm font-medium">
                      {courses.reduce((sum, course) => sum + course.assignments.length, 0)} total
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courses.flatMap(course => 
                  course.assignments.slice(0, 1).map((assignment, i) => (
                    <div key={`${course.id}-${i}`} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{assignment.name}</p>
                        <p className="text-sm text-gray-500">{course.name}</p>
                      </div>
                      <div className={`text-lg font-bold ${
                        assignment.grade >= 90 ? 'text-green-600' : 
                        assignment.grade >= 80 ? 'text-green-500' : 
                        assignment.grade >= 70 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}>
                        {assignment.grade}%
                      </div>
                    </div>
                  ))
                )}
                <div className="text-center mt-3">
                  <Button variant="link">View All Grades</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Added import for Button component
import { Button } from "@/components/ui/button";

export default Grades;
