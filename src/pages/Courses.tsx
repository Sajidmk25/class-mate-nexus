
import { BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import PageContent from "@/components/PageContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Johnson",
      progress: 65,
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Introduction to Physics",
      instructor: "Prof. Smith",
      progress: 42,
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Computer Science Fundamentals",
      instructor: "Dr. Williams",
      progress: 78,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Biology 101",
      instructor: "Dr. Martinez",
      progress: 30,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <Layout title="My Courses">
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
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  View Materials
                </Button>
                <Link to="/classroom" className="flex-1">
                  <Button className="w-full">Enter Class</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Courses;
