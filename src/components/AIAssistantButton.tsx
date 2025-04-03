
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const AIAssistantButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: "bot", 
      message: "Hello! I'm your AI learning assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      sender: "user",
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = "";
      
      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes("homework") || message.toLowerCase().includes("assignment")) {
        response = "I can help you with your assignments. What subject are you working on?";
      } else if (message.toLowerCase().includes("math") || message.toLowerCase().includes("mathematics")) {
        response = "Mathematics can be challenging! I'd be happy to explain concepts or help you solve problems. Could you provide more details?";
      } else if (message.toLowerCase().includes("when") && message.toLowerCase().includes("due")) {
        response = "You can check assignment due dates on the Assignments page. Would you like me to remind you of upcoming deadlines?";
      } else if (message.toLowerCase().includes("thank")) {
        response = "You're welcome! Feel free to ask if you need help with anything else.";
      } else {
        response = "I'm here to help with your learning journey. Could you provide more details about what you need assistance with?";
      }
      
      const botMessage = {
        sender: "bot",
        message: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="mt-4 w-full"
        variant="outline"
      >
        <Bot className="h-4 w-4 mr-2" />
        Ask AI Assistant
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md h-[500px] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-brand-blue" />
              AI Learning Assistant
            </DialogTitle>
            <DialogDescription>
              Ask questions about your courses, assignments, or study materials.
            </DialogDescription>
          </DialogHeader>
          
          <Separator className="my-2" />
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index}
                className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] ${chat.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-8 w-8 ${chat.sender === "user" ? "ml-2" : "mr-2"}`}>
                    {chat.sender === "bot" ? (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-brand-blue text-white">AI</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback>U</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div>
                    <div 
                      className={`rounded-lg px-3 py-2 ${
                        chat.sender === "user" 
                          ? "bg-brand-blue text-white" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{chat.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t mt-auto">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistantButton;
