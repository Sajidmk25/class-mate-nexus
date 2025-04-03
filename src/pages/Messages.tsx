
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mic, Phone, Video, MoreVertical, Send, UserPlus, PlusCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Messages = () => {
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [messages, setMessages] = useState<{[key: string]: {text: string, sender: 'user' | 'contact', timestamp: string}[]}>({
    "Dr. Sarah Johnson": [
      { text: "Hello! How are your studies going?", sender: "contact", timestamp: "10:30 AM" },
      { text: "Great! I've been working on the final project.", sender: "user", timestamp: "10:32 AM" },
      { text: "Would you be available for a quick video call tomorrow?", sender: "contact", timestamp: "10:34 AM" },
    ],
    "Michael Chen": [
      { text: "Did you complete the assignment?", sender: "contact", timestamp: "Yesterday" },
      { text: "Yes, just submitted it!", sender: "user", timestamp: "Yesterday" },
      { text: "Great! Let's review it during our study group.", sender: "contact", timestamp: "Yesterday" },
    ],
    "Study Group 101": [
      { text: "When are we meeting next?", sender: "contact", timestamp: "2 days ago" },
      { text: "How about Thursday at 3 PM?", sender: "user", timestamp: "2 days ago" },
      { text: "Works for me!", sender: "contact", timestamp: "2 days ago" },
    ]
  });
  const [newMessage, setNewMessage] = useState("");
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isAudioCallActive, setIsAudioCallActive] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeContact) return;
    
    const updatedMessages = {...messages};
    if (!updatedMessages[activeContact]) {
      updatedMessages[activeContact] = [];
    }
    
    updatedMessages[activeContact].push({
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    setMessages(updatedMessages);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  const startVideoCall = () => {
    setIsVideoCallActive(true);
    setIsAudioCallActive(false);
  };
  
  const startAudioCall = () => {
    setIsAudioCallActive(true);
    setIsVideoCallActive(false);
  };
  
  const endCall = () => {
    setIsVideoCallActive(false);
    setIsAudioCallActive(false);
  };
  
  const createNewGroup = () => {
    if (groupName.trim() === "" || selectedMembers.length === 0) return;
    
    const updatedMessages = {...messages};
    updatedMessages[groupName] = [
      { 
        text: `Group "${groupName}" created with ${selectedMembers.join(", ")}`, 
        sender: "user", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setMessages(updatedMessages);
    setShowCreateGroup(false);
    setGroupName("");
    setSelectedMembers([]);
  };
  
  const toggleMember = (name: string) => {
    if (selectedMembers.includes(name)) {
      setSelectedMembers(selectedMembers.filter(member => member !== name));
    } else {
      setSelectedMembers([...selectedMembers, name]);
    }
  };

  return (
    <Layout title="Messages">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
        <div className="md:col-span-1">
          <Tabs defaultValue="direct" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">Direct Messages</TabsTrigger>
              <TabsTrigger value="groups">Group Chats</TabsTrigger>
            </TabsList>
            <TabsContent value="direct" className="p-0 h-[calc(100vh-14rem)]">
              <ScrollArea className="h-full">
                <div className="space-y-2 p-2">
                  {Object.keys(messages).filter(name => !name.includes("Group")).map(contact => (
                    <div 
                      key={contact}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors ${activeContact === contact ? 'bg-secondary' : ''}`}
                      onClick={() => setActiveContact(contact)}
                    >
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${contact}`} />
                        <AvatarFallback>{contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">{contact}</h4>
                          <span className="text-xs text-muted-foreground">{
                            messages[contact] && messages[contact].length > 0 
                              ? messages[contact][messages[contact].length - 1].timestamp 
                              : ''
                          }</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {messages[contact] && messages[contact].length > 0 
                            ? messages[contact][messages[contact].length - 1].text 
                            : 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="p-0 h-[calc(100vh-14rem)]">
              <div className="p-4 space-y-4">
                <h3 className="font-medium">Group Chats</h3>
                <p className="text-sm text-muted-foreground">Your study group chats will appear here</p>
                
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="space-y-2">
                    {Object.keys(messages).filter(name => name.includes("Group") || name.includes("Study")).map(group => (
                      <div 
                        key={group}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors ${activeContact === group ? 'bg-secondary' : ''}`}
                        onClick={() => setActiveContact(group)}
                      >
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${group}`} />
                          <AvatarFallback>{group.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">{group}</h4>
                            <span className="text-xs text-muted-foreground">{
                              messages[group] && messages[group].length > 0 
                                ? messages[group][messages[group].length - 1].timestamp 
                                : ''
                            }</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {messages[group] && messages[group].length > 0 
                              ? messages[group][messages[group].length - 1].text 
                              : 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Group</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="group-name">Group Name</Label>
                        <Input 
                          id="group-name" 
                          placeholder="Enter group name" 
                          value={groupName}
                          onChange={e => setGroupName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Select Members</Label>
                        <div className="space-y-2">
                          {["Dr. Sarah Johnson", "Michael Chen", "Emily Rodriguez"].map(contact => (
                            <div 
                              key={contact}
                              className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-secondary"
                              onClick={() => toggleMember(contact)}
                            >
                              <input 
                                type="checkbox" 
                                id={`member-${contact}`}
                                checked={selectedMembers.includes(contact)}
                                onChange={() => {}}
                                className="h-4 w-4"
                              />
                              <Label htmlFor={`member-${contact}`} className="flex-1 cursor-pointer">
                                {contact}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={createNewGroup}
                        disabled={groupName.trim() === "" || selectedMembers.length === 0}
                      >
                        Create Group
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-2 border rounded-lg flex flex-col h-full">
          {activeContact ? (
            <>
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${activeContact}`} />
                    <AvatarFallback>{activeContact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{activeContact}</h4>
                    <p className="text-xs text-muted-foreground">
                      {activeContact.includes("Group") || activeContact.includes("Study") 
                        ? "Group chat" 
                        : "Online"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={startAudioCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={startVideoCall}>
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {(isVideoCallActive || isAudioCallActive) && (
                <div className="relative h-64 bg-black flex items-center justify-center">
                  {isVideoCallActive ? (
                    <div className="text-center">
                      <div className="flex justify-center my-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${activeContact}`} />
                          <AvatarFallback>{activeContact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-white">Video call with {activeContact}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex justify-center my-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${activeContact}`} />
                          <AvatarFallback>{activeContact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-white">Audio call with {activeContact}</p>
                    </div>
                  )}
                  <div className="absolute bottom-4 w-full flex justify-center gap-4">
                    <Button variant="destructive" onClick={endCall}>End Call</Button>
                    <Button variant="outline" className="bg-zinc-800 text-white">
                      <Mic className="h-4 w-4 mr-2" />
                      Mute
                    </Button>
                  </div>
                </div>
              )}
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages[activeContact] && messages[activeContact].map((message, idx) => (
                    <div 
                      key={idx}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary"
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block text-right">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a contact from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="w-full max-w-md">
          <UserPlus className="mr-2 h-4 w-4" />
          AI Assistant
        </Button>
      </div>
    </Layout>
  );
};

export default Messages;
