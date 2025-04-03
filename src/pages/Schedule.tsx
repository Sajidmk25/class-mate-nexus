
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import PageContent from "@/components/PageContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Schedule = () => {
  const todayEvents = [
    { 
      id: 1, 
      title: "Advanced Mathematics", 
      type: "Lecture",
      time: "10:00 AM - 11:30 AM", 
      location: "Virtual Classroom",
      instructor: "Dr. Johnson",
    },
    { 
      id: 2, 
      title: "Introduction to Physics", 
      type: "Lab Session",
      time: "2:00 PM - 4:00 PM", 
      location: "Virtual Classroom",
      instructor: "Prof. Smith",
    },
    { 
      id: 3, 
      title: "Study Group Meeting", 
      type: "Group Study",
      time: "5:00 PM - 6:30 PM", 
      location: "Study Room #3",
      instructor: null,
    },
  ];

  const upcomingEvents = [
    { 
      id: 4, 
      title: "Computer Science Fundamentals", 
      type: "Lecture",
      date: "Tomorrow",
      time: "9:00 AM - 10:30 AM", 
      location: "Virtual Classroom",
      instructor: "Dr. Williams",
    },
    { 
      id: 5, 
      title: "Math Quiz #4", 
      type: "Assessment",
      date: "Apr 5",
      time: "11:00 AM - 12:00 PM", 
      location: "Virtual Classroom",
      instructor: "Dr. Johnson",
    },
    { 
      id: 6, 
      title: "Physics Project Deadline", 
      type: "Deadline",
      date: "Apr 8",
      time: "11:59 PM", 
      location: null,
      instructor: "Prof. Smith",
    },
  ];

  return (
    <Layout title="Schedule">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1">Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <p className="text-sm text-gray-500">Wednesday, April 3, 2025</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {todayEvents.map((event) => (
                      <div key={event.id} className="border-l-4 border-brand-blue pl-4 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{event.time}</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm">{event.location}</p>
                            {event.instructor && (
                              <p className="text-sm text-gray-500">{event.instructor}</p>
                            )}
                          </div>
                          {event.type === "Lecture" && (
                            <Link to="/classroom">
                              <Button size="sm">
                                Join Now
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-l-4 border-gray-300 pl-4 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{event.date}</p>
                        <p className="text-sm text-gray-500 mb-1">{event.time}</p>
                        <div className="flex justify-between items-end">
                          <div>
                            {event.location && <p className="text-sm">{event.location}</p>}
                            {event.instructor && (
                              <p className="text-sm text-gray-500">{event.instructor}</p>
                            )}
                          </div>
                          {event.type === "Deadline" && (
                            <Button size="sm" variant="outline">Set Reminder</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card className="p-6">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                  <p className="text-gray-500 mb-6">Full calendar view coming soon!</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add Event to Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Schedule Study Group
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Instructor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Added import for Badge component
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare } from "lucide-react";

export default Schedule;
