
import { useState } from "react";
import Layout from "@/components/Layout";
import PageContent from "@/components/PageContent";
import { 
  MessageSquare, 
  UserCircle, 
  Users, 
  Plus, 
  Search, 
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AIAssistantButton from "@/components/AIAssistantButton";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface GroupChat {
  id: number;
  name: string;
  avatar: string;
  members: number;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const Messages = () => {
  const [activeChat, setActiveChat] = useState<Contact | GroupChat | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Dr. Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online",
      lastMessage: "Don't forget about the assignment due tomorrow!",
      lastMessageTime: "10:45 AM",
      unreadCount: 2
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "offline",
      lastMessage: "Thanks for your help with the physics problem.",
      lastMessageTime: "Yesterday"
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "online",
      lastMessage: "Are you coming to the study session tonight?",
      lastMessageTime: "2:30 PM",
      unreadCount: 1
    },
    {
      id: 4,
      name: "Prof. Martinez",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "offline",
      lastMessage: "Office hours are cancelled tomorrow.",
      lastMessageTime: "Monday"
    }
  ];

  const groups: GroupChat[] = [
    {
      id: 101,
      name: "Physics Study Group",
      avatar: "https://i.pravatar.cc/150?img=10",
      members: 8,
      lastMessage: "Let's meet in the library at 7 PM.",
      lastMessageTime: "3:15 PM",
      unreadCount: 5
    },
    {
      id: 102,
      name: "Math 101 Class",
      avatar: "https://i.pravatar.cc/150?img=15",
      members: 25,
      lastMessage: "Does anyone have the notes from today's lecture?",
      lastMessageTime: "Yesterday"
    },
    {
      id: 103,
      name: "CS Project Team",
      avatar: "https://i.pravatar.cc/150?img=12",
      members: 4,
      lastMessage: "I've pushed the latest changes to the repo.",
      lastMessageTime: "Monday",
      unreadCount: 3
    }
  ];

  // Filter contacts and groups based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: chatMessages.length + 1,
      content: messageInput.trim(),
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput("");
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: chatMessages.length + 2,
        content: `This is a simulated response from ${activeChat.name}`,
        sender: activeChat.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false
      };
      
      setChatMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleChatSelect = (chat: Contact | GroupChat) => {
    setActiveChat(chat);
    
    // Generate mock conversation for the selected chat
    const mockConversation: Message[] = [
      {
        id: 1,
        content: `Hello! How are you doing today?`,
        sender: chat.name,
        timestamp: "9:30 AM",
        isCurrentUser: false
      },
      {
        id: 2,
        content: "I'm doing well, thanks for asking! How about you?",
        sender: "You",
        timestamp: "9:32 AM",
        isCurrentUser: true
      },
      {
        id: 3,
        content: "I'm great! Just working on some course materials.",
        sender: chat.name,
        timestamp: "9:35 AM",
        isCurrentUser: false
      },
      {
        id: 4,
        content: "Let me know if you need any help with your studies or have questions about the assignments.",
        sender: chat.name,
        timestamp: "9:36 AM",
        isCurrentUser: false
      }
    ];
    
    setChatMessages(mockConversation);
  };

  const startVideoCall = () => {
    if (!activeChat) return;
    
    setIsVideoCallActive(true);
    toast({
      title: "Starting video call",
      description: `Connecting to a call with ${activeChat.name}...`,
    });
    
    // Simulate a failed call after a delay (in real app, this would connect to actual WebRTC or similar)
    setTimeout(() => {
      setIsVideoCallActive(false);
      toast({
        title: "Call ended",
        description: "The call has ended. You can try again later.",
      });
    }, 5000);
  };
  
  const startAudioCall = () => {
    if (!activeChat) return;
    
    toast({
      title: "Starting audio call",
      description: `Connecting to a call with ${activeChat.name}...`,
    });
    
    // Simulate a failed call after a delay
    setTimeout(() => {
      toast({
        title: "Call failed",
        description: "Could not connect the call. Please check your internet connection and try again.",
        variant: "destructive",
      });
    }, 3000);
  };

  const createNewGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your group",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Group created",
      description: `${newGroupName} has been created successfully`,
    });
    
    setNewGroupName("");
    setIsNewGroupDialogOpen(false);
  };

  return (
    <Layout title="Messages">
      <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-210px)]">
        <div className="flex h-full">
          {/* Chat sidebar */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            
            <Tabs defaultValue="direct" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 mx-4 mt-2">
                <TabsTrigger value="direct">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Direct
                </TabsTrigger>
                <TabsTrigger value="groups">
                  <Users className="h-4 w-4 mr-2" />
                  Groups
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="direct" className="flex-1 overflow-y-auto">
                <div className="px-2 space-y-1">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 ${
                        activeChat?.id === contact.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => handleChatSelect(contact)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="ml-3 flex-1 text-left truncate">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.lastMessageTime}</p>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unreadCount && (
                        <Badge className="ml-2">{contact.unreadCount}</Badge>
                      )}
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="flex-1 overflow-y-auto">
                <div className="p-2">
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => setIsNewGroupDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Group
                  </Button>
                  
                  <div className="space-y-1">
                    {filteredGroups.map((group) => (
                      <button
                        key={group.id}
                        className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 ${
                          activeChat?.id === group.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleChatSelect(group)}
                      >
                        <Avatar>
                          <AvatarImage src={group.avatar} alt={group.name} />
                          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 flex-1 text-left truncate">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{group.name}</p>
                            <p className="text-xs text-gray-500">{group.lastMessageTime}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {group.members} members
                          </p>
                        </div>
                        {group.unreadCount && (
                          <Badge className="ml-2">{group.unreadCount}</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat content */}
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={(activeChat as any).avatar} alt={activeChat.name} />
                      <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-medium">{activeChat.name}</p>
                      <p className="text-xs text-gray-500">
                        {'members' in activeChat 
                          ? `${activeChat.members} members` 
                          : activeChat.status === 'online' ? 'Online' : 'Offline'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={startAudioCall}
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={startVideoCall}
                    >
                      <Video className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                        <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Block</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isCurrentUser && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={(activeChat as any).avatar} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div 
                          className={`rounded-lg px-3 py-2 inline-block max-w-md ${
                            message.isCurrentUser 
                              ? 'bg-brand-blue text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                      </div>
                      {message.isCurrentUser && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="You" />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Chat input */}
                <div className="p-4 border-t">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Button variant="ghost" size="icon" type="button">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" type="button">
                      <Mic className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-xl font-medium text-gray-900">Your Messages</h3>
                <p className="text-gray-500 mt-1 max-w-sm">
                  Select a conversation or start a new one to chat with your instructors and classmates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AIAssistantButton />
      
      {/* New Group Dialog */}
      <Dialog open={isNewGroupDialogOpen} onOpenChange={setIsNewGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Start a group conversation with your classmates and instructors.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., Study Group for Biology"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Add Members</Label>
              <div className="grid grid-cols-1 gap-2 mt-1">
                {contacts.slice(0, 3).map((contact) => (
                  <Card key={contact.id} className="p-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`contact-${contact.id}`}
                        className="mr-2"
                      />
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Label htmlFor={`contact-${contact.id}`} className="text-sm">
                        {contact.name}
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createNewGroup}>
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Video Call Dialog */}
      {isVideoCallActive && (
        <Dialog open={isVideoCallActive} onOpenChange={setIsVideoCallActive}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Video Call</DialogTitle>
              <DialogDescription>
                Connecting to {activeChat?.name}...
              </DialogDescription>
            </DialogHeader>
            <div className="h-60 bg-gray-900 rounded-md flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="h-12 w-12 mx-auto mb-2" />
                <p>Establishing connection...</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => setIsVideoCallActive(false)}>
                End Call
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default Messages;
