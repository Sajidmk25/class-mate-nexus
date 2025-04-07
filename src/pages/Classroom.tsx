
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Mic, MicOff, VideoOff, Users, MessageSquare, Settings, Share2, ScreenShare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Classroom = () => {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: "Sarah Johnson", role: "Teacher", isSpeaking: true },
    { id: 2, name: "Michael Chen", role: "Student", isSpeaking: false },
    { id: 3, name: "Emma Williams", role: "Student", isSpeaking: false },
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Turn on/off video
  const toggleVideo = async () => {
    if (isVideoOn) {
      // Turn off video
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
      toast({
        title: "Video Off",
        description: "Your camera has been turned off."
      });
    } else {
      // Turn on video
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsVideoOn(true);
        toast({
          title: "Video On",
          description: "Your camera has been turned on."
        });
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast({
          title: "Camera Access Denied",
          description: "Please allow camera access to use video features.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Turn on/off audio
  const toggleAudio = async () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On",
      description: isAudioOn ? "Your microphone has been muted." : "Your microphone has been unmuted."
    });
  };
  
  // Clean up media streams when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  return (
    <Layout title="Virtual Classroom">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Feed */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-gradient-to-br from-secondary/30 to-background border border-white/10">
              <div className="aspect-video bg-background/80 backdrop-blur-sm relative">
                {isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-md mx-auto mb-4 flex items-center justify-center border border-white/10">
                        <span className="text-3xl font-playfair">{user?.name?.charAt(0) || "U"}</span>
                      </div>
                      <p className="text-gray-300">Camera is turned off</p>
                      <p className="text-xs text-gray-400 mt-1">Click the camera button to enable video</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button
                    variant={isVideoOn ? "default" : "secondary"}
                    size="icon"
                    onClick={toggleVideo}
                    className={`rounded-full h-12 w-12 shadow-lg ${isVideoOn ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isVideoOn ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <VideoOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <Button
                    variant={isAudioOn ? "default" : "secondary"}
                    size="icon"
                    onClick={toggleAudio}
                    className={`rounded-full h-12 w-12 shadow-lg ${isAudioOn ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isAudioOn ? (
                      <Mic className="h-5 w-5" />
                    ) : (
                      <MicOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 shadow-lg"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 shadow-lg"
                  >
                    <ScreenShare className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>
            </Card>
            
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3 text-gradient font-playfair">Advanced Physics - Wave Theory</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                <p className="text-gray-300">
                  Today's session explores the fundamentals of wave theory, including mechanical and electromagnetic waves, 
                  interference patterns, and practical applications in modern technology.
                </p>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-primary">Duration</h3>
                    <p className="text-lg">Unlimited</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-primary">Materials</h3>
                    <p className="text-lg">4 files</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-primary">Assignment</h3>
                    <p className="text-lg">Due Fri</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-primary">Status</h3>
                    <p className="text-lg">In Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Participants List */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gradient font-playfair">Participants</h2>
              <span className="bg-white/10 text-sm px-2 py-1 rounded-full">4</span>
            </div>
            
            <Card className="p-0 bg-gradient-to-br from-secondary/30 to-background border border-white/10">
              <div className="divide-y divide-white/10">
                <div className="p-3 bg-gradient-to-r from-primary/20 to-accent/20">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mr-3 border border-white/10">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name || "You"} (You)</p>
                      <p className="text-sm text-gray-400 capitalize">{user?.role || "Student"}</p>
                    </div>
                    {isAudioOn && (
                      <div className="ml-auto">
                        <Mic className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
                
                {participants.map(participant => (
                  <div key={participant.id} className="p-3 hover:bg-white/5 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${participant.isSpeaking ? 'bg-accent/20 ring-2 ring-accent' : 'bg-secondary'} flex items-center justify-center mr-3`}>
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium flex items-center">
                          {participant.name}
                          {participant.role === "Teacher" && (
                            <span className="ml-2 badge badge-primary">Instructor</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-400">{participant.role}</p>
                      </div>
                      {participant.isSpeaking && (
                        <div className="ml-auto">
                          <Mic className="h-4 w-4 text-accent animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3 text-gradient font-playfair">Class Controls</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start">
                  <Share2 className="h-4 w-4 text-primary" />
                  <span>Invite</span>
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Groups</span>
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start">
                  <Settings className="h-4 w-4 text-primary" />
                  <span>Settings</span>
                </Button>
                <Button variant="destructive" className="flex items-center gap-2 justify-start">
                  <span>End Class</span>
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-primary">Connection Quality</h3>
                <div className="w-full bg-gray-700/30 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-4/5"></div>
                </div>
                <div className="text-sm">
                  <p className="flex justify-between py-1">
                    <span className="text-gray-400">Network:</span>
                    <span className="font-medium text-gray-200">Excellent</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-400">Resolution:</span>
                    <span>HD (720p)</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-400">Encryption:</span>
                    <span>Enabled</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Classroom;
