
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MessageSquare, 
  Users, 
  Share2, 
  UserPlus, 
  FileText,
  ScreenShare,
  Phone,
  PhoneOff,
  Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const Classroom = () => {
  const { user, isTeacher } = useAuth();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [inCall, setInCall] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [message, setMessage] = useState("");
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const videoTracks = (localVideoRef.current.srcObject as MediaStream).getVideoTracks();
      videoTracks.forEach(track => track.enabled = !videoEnabled);
    }
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const audioTracks = (localVideoRef.current.srcObject as MediaStream).getAudioTracks();
      audioTracks.forEach(track => track.enabled = !audioEnabled);
    }
  };
  
  const toggleChat = () => setChatOpen(!chatOpen);
  
  const toggleCall = () => {
    if (inCall) {
      // End call logic would go here
      setInCall(false);
      toast({
        title: "Call Ended",
        description: "You have left the classroom session",
      });
    } else {
      // Start call logic would go here
      setInCall(true);
      initializeMedia();
      toast({
        title: "Call Started",
        description: "You have joined the classroom session",
      });
    }
  };
  
  const toggleScreenShare = () => {
    if (screenSharing) {
      stopScreenSharing();
    } else {
      startScreenSharing();
    }
  };
  
  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
        screenStream.getVideoTracks()[0].onended = () => {
          setScreenSharing(false);
          initializeMedia(); // Go back to camera
        };
      }
      
      setScreenSharing(true);
      toast({
        title: "Screen sharing started",
        description: "You are now sharing your screen",
      });
    } catch (error) {
      console.error("Error sharing screen:", error);
      toast({
        title: "Screen sharing failed",
        description: "Could not share your screen",
        variant: "destructive",
      });
    }
  };
  
  const stopScreenSharing = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      initializeMedia(); // Go back to camera
    }
    
    setScreenSharing(false);
    toast({
      title: "Screen sharing stopped",
      description: "You have stopped sharing your screen",
    });
  };
  
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Set initial state of audio/video based on UI controls
      stream.getVideoTracks().forEach(track => track.enabled = videoEnabled);
      stream.getAudioTracks().forEach(track => track.enabled = audioEnabled);
      
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Camera/Microphone access denied",
        description: "Please allow access to your camera and microphone",
        variant: "destructive",
      });
    }
  };
  
  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
    toast({
      title: handRaised ? "Hand lowered" : "Hand raised",
      description: handRaised ? "Your hand has been lowered" : "Your hand has been raised",
    });
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      setMessage("");
      toast({
        title: "Message sent",
        description: "Your message has been sent to the classroom",
      });
    }
  };

  useEffect(() => {
    // Initialize media when component mounts
    if (inCall) {
      initializeMedia();
    }
    
    // Cleanup function to stop all media tracks when component unmounts
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Mock participants
  const participants = [
    { id: 1, name: `You (${user?.name || 'Student'})`, isTeacher: isTeacher, hasVideo: videoEnabled, hasAudio: audioEnabled, hasHandRaised: handRaised },
    { id: 2, name: "Dr. Johnson", isTeacher: true, hasVideo: true, hasAudio: true, hasHandRaised: false },
    { id: 3, name: "Jane Smith", isTeacher: false, hasVideo: false, hasAudio: true, hasHandRaised: true },
    { id: 4, name: "Mike Davis", isTeacher: false, hasVideo: true, hasAudio: false, hasHandRaised: false },
    { id: 5, name: "Sarah Wilson", isTeacher: false, hasVideo: false, hasAudio: false, hasHandRaised: false },
  ];

  // Mock chat messages
  const chatMessages = [
    { id: 1, sender: "Dr. Johnson", message: "Welcome to today's class on Advanced Mathematics!", time: "10:01 AM" },
    { id: 2, sender: "Jane Smith", message: "Hi everyone!", time: "10:02 AM" },
    { id: 3, sender: "You", message: "Looking forward to today's lecture!", time: "10:03 AM" },
    { id: 4, sender: "Mike Davis", message: "Will this be recorded?", time: "10:04 AM" },
    { id: 5, sender: "Dr. Johnson", message: "Yes, I'll share the recording after class.", time: "10:05 AM" },
  ];

  return (
    <Layout title="Virtual Classroom">
      <div className="flex flex-col h-[calc(100vh-180px)] bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-0">
          {/* Main video area */}
          <div className={`col-span-1 ${chatOpen ? 'lg:col-span-3' : 'lg:col-span-4'} bg-gray-900 relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              {inCall ? (
                videoEnabled ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <VideoOff className="h-16 w-16 mx-auto mb-4" />
                    <p>Video is turned off</p>
                  </div>
                )
              ) : (
                <div className="text-center text-white">
                  <Phone className="h-16 w-16 mx-auto mb-4" />
                  <p>Call ended. Click "Join Class" to restart</p>
                  <Button 
                    onClick={toggleCall} 
                    className="mt-4"
                  >
                    Join Class
                  </Button>
                </div>
              )}
            </div>
            
            {/* Participants video thumbnails */}
            {inCall && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {participants.slice(0, 4).map((participant) => (
                  <div 
                    key={participant.id} 
                    className="w-24 h-16 bg-gray-700 rounded-md overflow-hidden relative"
                  >
                    {participant.hasVideo ? (
                      <img 
                        src={`https://i.pravatar.cc/150?img=${participant.id}`} 
                        alt={participant.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <VideoOff className="h-6 w-6" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate flex items-center justify-between">
                      <span className="truncate">{participant.name}</span>
                      <div className="flex items-center">
                        {participant.hasHandRaised && (
                          <span className="mr-1">✋</span>
                        )}
                        {!participant.hasAudio && <MicOff className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat sidebar */}
          {chatOpen && (
            <div className="col-span-1 bg-white border-l">
              <Tabs defaultValue="chat">
                <div className="border-b px-4 py-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="chat" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="participants" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      Participants
                    </TabsTrigger>
                    <TabsTrigger value="materials" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Materials
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="chat" className="flex flex-col h-[calc(100%-110px)]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            msg.sender === "You" 
                              ? "bg-brand-blue text-white" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.sender !== "You" && (
                            <p className="text-xs font-bold">
                              {msg.sender}
                            </p>
                          )}
                          <p>{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 border rounded-l-md px-3 py-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') sendMessage();
                        }}
                      />
                      <Button 
                        className="rounded-l-none"
                        onClick={sendMessage}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="participants" className="h-[calc(100%-110px)] overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 relative">
                            <img 
                              src={`https://i.pravatar.cc/150?img=${participant.id}`} 
                              alt={participant.name} 
                              className="w-full h-full object-cover"
                            />
                            {participant.hasHandRaised && (
                              <div className="absolute top-0 right-0 bg-yellow-400 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
                                ✋
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            {participant.isTeacher && (
                              <p className="text-xs text-brand-blue">Teacher</p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {!participant.hasAudio && <MicOff className="h-4 w-4 text-gray-400" />}
                          {!participant.hasVideo && <VideoOff className="h-4 w-4 text-gray-400" />}
                          {isTeacher && participant.id !== 1 && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Participants
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="h-[calc(100%-110px)] overflow-y-auto">
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md hover:bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-brand-blue mr-3" />
                          <div>
                            <p className="font-medium">Lecture Slides - Week 5</p>
                            <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-brand-blue mr-3" />
                          <div>
                            <p className="font-medium">Practice Problems</p>
                            <p className="text-sm text-gray-500">DOCX • 1.8 MB</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-brand-blue mr-3" />
                          <div>
                            <p className="font-medium">Course Syllabus</p>
                            <p className="text-sm text-gray-500">PDF • 526 KB</p>
                          </div>
                        </div>
                      </div>
                      
                      {isTeacher && (
                        <Button className="w-full mt-6">
                          <FileText className="h-4 w-4 mr-2" />
                          Upload New Materials
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
        
        {/* Control bar */}
        {inCall && (
          <div className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Advanced Mathematics</p>
                <p className="text-sm text-gray-400">Dr. Johnson • Live now • 45:22</p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${!audioEnabled ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={toggleAudio}
                  title={audioEnabled ? "Mute" : "Unmute"}
                >
                  {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${!videoEnabled ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={toggleVideo}
                  title={videoEnabled ? "Turn off camera" : "Turn on camera"}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${screenSharing ? 'bg-brand-blue hover:bg-brand-blue-dark' : ''}`}
                  onClick={toggleScreenShare}
                  title={screenSharing ? "Stop sharing" : "Share screen"}
                >
                  <ScreenShare className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${handRaised ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                  onClick={toggleHandRaise}
                  title={handRaised ? "Lower hand" : "Raise hand"}
                >
                  <span className="text-lg">✋</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${chatOpen ? 'bg-brand-blue hover:bg-brand-blue-dark' : ''}`}
                  onClick={toggleChat}
                  title={chatOpen ? "Close chat" : "Open chat"}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                
                <Separator orientation="vertical" className="h-8 bg-gray-600" />
                
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={toggleCall}
                >
                  <PhoneOff className="h-4 w-4 mr-2" />
                  Leave Class
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Classroom;
