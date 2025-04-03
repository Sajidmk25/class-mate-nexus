
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, SendHorizontal, X } from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { isBot: true, message: "Hello! I'm your AI assistant. How can I help you with your learning today?" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { isBot: false, message }]);
    
    // In a real app, this would send the message to an AI service
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          isBot: true, 
          message: "Thanks for your question. I'm here to help with your studies and provide guidance on course materials. What specific topic are you interested in?" 
        }
      ]);
    }, 1000);
    
    setMessage("");
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button 
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat interface */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 sm:w-96 shadow-xl flex flex-col rounded-lg overflow-hidden z-50">
          <div className="bg-primary p-3 text-primary-foreground flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">AI Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 max-h-96 space-y-3">
            {conversation.map((item, index) => (
              <div 
                key={index} 
                className={`flex ${item.isBot ? "justify-start" : "justify-end"}`}
              >
                <div 
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    item.isBot 
                      ? "bg-secondary text-secondary-foreground" 
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {item.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask something..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
