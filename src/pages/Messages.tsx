import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Video, Phone, SendHorizontal, Paperclip, Smile, MessageSquare } from "lucide-react";
import PageContent from "@/components/PageContent";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Johnson", time: "10:30 AM", message: "Hello! Do you have any questions about the assignment?", isMe: false },
    { id: 2, sender: "You", time: "10:32 AM", message: "Hi Dr. Johnson! Yes, I'm a bit confused about problem #3.", isMe: true },
    { id: 3, sender: "Dr. Johnson", time: "10:35 AM", message: "That's a tricky one. Let me explain the approach you should take...", isMe: false },
    { id: 4, sender: "You", time: "10:38 AM", message: "That makes sense, thank you for the explanation!", isMe: true },
    { id: 5, sender: "Dr. Johnson", time: "10:40 AM", message: "You're welcome! Feel free to ask if you have any other questions.", isMe: false },
  ]);

  const conversations = [
    { id: 1, name: "Dr. Johnson", role: "Professor", lastMessage: "Feel free to ask if you have any other questions.", time: "10:40 AM", unread: 0, avatar: "https://i.pravatar.cc/150?img=68" },
    { id: 2, name: "Jane Smith", role: "Classmate", lastMessage: "Are you coming to the study group tonight?", time: "Yesterday", unread: 2, avatar: "https://i.pravatar.cc/150?img=47" },
    { id: 3, name: "Study Group", role: "Group Chat", lastMessage: "Mike: I've uploaded my notes to the shared folder", time: "Yesterday", unread: 5, avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 4, name: "Prof. Williams", role: "Professor", lastMessage: "The deadline has been extended to Friday", time: "2 days ago", unread: 0, avatar: "https://i.pravatar.cc/150?img=65" },
  ];

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    console.log("Sending message...");
  };

  const handleVideoCall = () => {
    // In a real app, this would initiate a video call
    console.log("Starting video call...");
  };

  const handleAudioCall = () => {
    // In a real app, this would initiate an audio call
    console.log("Starting audio call...");
  };

  return (
    <Layout title="Messages">
      <Card className="h-[calc(100vh-200px)] overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Sidebar with conversations */}
          <div className="w-full md:w-80 border-r">
            <Tabs defaultValue="direct">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Messages</h2>
                  <Button variant="ghost" size="icon">
                    <UserPlus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                  <Input placeholder="Search messages..." className="pl-9" />
                </div>
                <TabsList className="mt-4 w-full">
                  <TabsTrigger value="direct" className="flex-1">Direct Messages</TabsTrigger>
                  <TabsTrigger value="group" className="flex-1">Group Chats</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="direct" className="h-[calc(100%-140px)] overflow-y-auto">
                <div className="space-y-1 p-2">
                  {conversations.filter(c => c.role !== "Group Chat").map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                        activeConversation === conversation.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="group" className="h-[calc(100%-140px)] overflow-y-auto">
                <div className="p-8 text-center">
                  <h3 className="font-medium mb-2">Group Chats</h3>
                  <p className="text-sm text-gray-500 mb-4">Your study group chats will appear here</p>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create New Group
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Main chat area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col h-full">
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://i.pravatar.cc/150?img=68"
                      alt="Dr. Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Dr. Johnson</h3>
                    <p className="text-xs text-gray-500">Professor • Advanced Mathematics</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleAudioCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleVideoCall}>
                    <Video className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                    Today
                  </span>
                </div>
                
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isMe && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <img 
                          src="https://i.pravatar.cc/150?img=68"
                          alt={message.sender}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`max-w-[70%]`}>
                      <div 
                        className={`rounded-lg px-4 py-2 ${
                          message.isMe 
                            ? "bg-brand-blue text-white rounded-br-none" 
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{message.message}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.isMe ? "text-right" : ""}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center bg-gray-100 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none focus:outline-none px-2"
                  />
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium mb-1">No conversation selected</h3>
                <p className="text-sm text-gray-500">Choose a conversation from the list</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* AI Assistant Button */}
      <div className="mt-4 text-center">
        <Button className="bg-accent text-accent-foreground">
          <MessageSquare className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
      </div>
    </Layout>
  );
};

export default Messages;
