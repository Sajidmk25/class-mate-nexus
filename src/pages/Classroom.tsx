
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Mic } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Classroom = () => {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: "Sarah Johnson", role: "Teacher", isSpeaking: false },
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Virtual Classroom</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Video Feed */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
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
                      <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">{user?.name?.charAt(0) || "U"}</span>
                      </div>
                      <p className="text-gray-300">Camera is turned off</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button
                    variant={isVideoOn ? "default" : "secondary"}
                    size="icon"
                    onClick={toggleVideo}
                    className="rounded-full h-12 w-12"
                  >
                    <Video className={isVideoOn ? "h-5 w-5" : "h-5 w-5 text-muted-foreground"} />
                  </Button>
                  
                  <Button
                    variant={isAudioOn ? "default" : "secondary"}
                    size="icon"
                    onClick={toggleAudio}
                    className="rounded-full h-12 w-12"
                  >
                    <Mic className={isAudioOn ? "h-5 w-5" : "h-5 w-5 text-muted-foreground"} />
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-2">Unlimited Video Conferencing</h2>
              <p className="text-gray-600">
                Connect with your classmates and teachers through high-quality, unlimited video calls.
                Our platform ensures smooth communication without any time restrictions.
              </p>
            </div>
          </div>
          
          {/* Participants List */}
          <div>
            <h2 className="text-lg font-medium mb-3">Participants (4)</h2>
            <Card className="p-0">
              <div className="divide-y">
                <div className="p-3 bg-blue-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name || "You"} (You)</p>
                      <p className="text-sm text-gray-500 capitalize">{user?.role || "Student"}</p>
                    </div>
                    {isAudioOn && (
                      <div className="ml-auto">
                        <Mic className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
                
                {participants.map(participant => (
                  <div key={participant.id} className="p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-500">{participant.role}</p>
                      </div>
                      {participant.isSpeaking && (
                        <div className="ml-auto">
                          <Mic className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Call Information</h3>
              <div className="text-sm">
                <p className="flex justify-between py-1">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-600">Active Call</span>
                </p>
                <p className="flex justify-between py-1">
                  <span className="text-gray-500">Duration:</span>
                  <span>Unlimited</span>
                </p>
                <p className="flex justify-between py-1">
                  <span className="text-gray-500">Quality:</span>
                  <span>HD (720p)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Classroom;
