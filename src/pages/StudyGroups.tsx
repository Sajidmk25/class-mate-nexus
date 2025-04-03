
import { Users } from "lucide-react";
import Layout from "@/components/Layout";
import PageContent from "@/components/PageContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudyGroups = () => {
  const myGroups = [
    {
      id: 1,
      name: "Mathematics Study Group",
      course: "Advanced Mathematics",
      members: 8,
      nextMeeting: "Today, 5:00 PM",
      avatars: ["https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2", "https://i.pravatar.cc/150?img=3"],
    },
    {
      id: 2,
      name: "Physics Lab Partners",
      course: "Introduction to Physics",
      members: 4,
      nextMeeting: "Tomorrow, 4:00 PM",
      avatars: ["https://i.pravatar.cc/150?img=4", "https://i.pravatar.cc/150?img=5"],
    },
    {
      id: 3,
      name: "CS Project Team",
      course: "Computer Science Fundamentals",
      members: 6,
      nextMeeting: "Apr 5, 7:00 PM",
      avatars: ["https://i.pravatar.cc/150?img=6", "https://i.pravatar.cc/150?img=7", "https://i.pravatar.cc/150?img=8"],
    },
  ];

  const recommendedGroups = [
    {
      id: 4,
      name: "Biology Study Group",
      course: "Biology 101",
      members: 12,
      avatars: ["https://i.pravatar.cc/150?img=10", "https://i.pravatar.cc/150?img=11"],
    },
    {
      id: 5,
      name: "Chemistry Lab Support",
      course: "General Chemistry",
      members: 9,
      avatars: ["https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=13"],
    },
  ];

  return (
    <Layout title="Study Groups">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-3">My Study Groups</h2>
          
          {myGroups.map((group) => (
            <Card key={group.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{group.course}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex -space-x-2 mr-3">
                        {group.avatars.map((avatar, index) => (
                          <Avatar key={index} className="border-2 border-white w-8 h-8">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>U{index}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members > group.avatars.length && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                            +{group.members - group.avatars.length}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{group.members} members</span>
                    </div>
                    
                    {group.nextMeeting && (
                      <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                        Next meeting: {group.nextMeeting}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <Button variant="outline">Chat</Button>
                    <Button>Join Meeting</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <h2 className="text-xl font-semibold mb-3 mt-8">Recommended Groups</h2>
          
          {recommendedGroups.map((group) => (
            <Card key={group.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{group.course}</p>
                    
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-3">
                        {group.avatars.map((avatar, index) => (
                          <Avatar key={index} className="border-2 border-white w-8 h-8">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>U{index}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members > group.avatars.length && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                            +{group.members - group.avatars.length}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{group.members} members</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button>Join Group</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create Study Group</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-6">
                Start a new study group and invite classmates to collaborate on assignments and prepare for exams together.
              </p>
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Create New Group
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex">
                  <div className="mr-2 bg-brand-blue/10 text-brand-blue rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <span>Schedule regular study sessions with your group</span>
                </li>
                <li className="flex">
                  <div className="mr-2 bg-brand-blue/10 text-brand-blue rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <span>Assign specific topics to each group member</span>
                </li>
                <li className="flex">
                  <div className="mr-2 bg-brand-blue/10 text-brand-blue rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <span>Use the virtual whiteboard to explain concepts</span>
                </li>
                <li className="flex">
                  <div className="mr-2 bg-brand-blue/10 text-brand-blue rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <span>Share study materials and resources</span>
                </li>
                <li className="flex">
                  <div className="mr-2 bg-brand-blue/10 text-brand-blue rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <span>Quiz each other before exams</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudyGroups;
