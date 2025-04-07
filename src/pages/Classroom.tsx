
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Mic, MicOff, VideoOff, MessageSquare, Settings, Share2, ScreenShare, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const Classroom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEndClassDialogOpen, setIsEndClassDialogOpen] = useState(false);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  
  // Turn on/off video
  const toggleVideo = async () => {
    if (isVideoOn) {
      // Turn off video
      if (streamRef.current) {
        streamRef.current.getTracks()
          .filter(track => track.kind === 'video')
          .forEach(track => track.stop());
      }
      if (videoRef.current) {
        // Keep the audio track if it's on
        if (isAudioOn && audioStreamRef.current) {
          videoRef.current.srcObject = audioStreamRef.current;
        } else {
          videoRef.current.srcObject = null;
        }
      }
      setIsVideoOn(false);
      toast({
        title: "Video Off",
        description: "Your camera has been turned off."
      });
    } else {
      // Turn on video
      try {
        console.log("Attempting to access camera...");
        const videoStream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: isAudioOn 
        });
        
        console.log("Camera access granted:", videoStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
          videoRef.current.muted = true; // Mute local video to prevent echo
          streamRef.current = videoStream;
          
          // If audio is already on, we need to keep track of both streams
          if (isAudioOn && audioStreamRef.current) {
            const audioTrack = audioStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
              videoStream.addTrack(audioTrack);
            }
          }
        }
        
        setIsVideoOn(true);
        setHasPermissionError(false);
        toast({
          title: "Video On",
          description: "Your camera has been turned on."
        });
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermissionError(true);
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
    if (isAudioOn) {
      // Turn off audio
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null;
      }
      
      // If video is still on, we just remove the audio track
      if (isVideoOn && streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => track.stop());
      }
      
      setIsAudioOn(false);
      toast({
        title: "Microphone Off",
        description: "Your microphone has been muted."
      });
    } else {
      try {
        console.log("Attempting to access microphone...");
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted:", audioStream);
        
        audioStreamRef.current = audioStream;
        
        // If video is on, add the audio track to the existing stream
        if (isVideoOn && streamRef.current && videoRef.current) {
          const audioTrack = audioStream.getAudioTracks()[0];
          if (audioTrack) {
            streamRef.current.addTrack(audioTrack);
          }
          videoRef.current.srcObject = streamRef.current;
        }
        
        setIsAudioOn(true);
        setHasPermissionError(false);
        toast({
          title: "Microphone On",
          description: "Your microphone has been unmuted."
        });
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setHasPermissionError(true);
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use audio features.",
          variant: "destructive"
        });
      }
    }
  };

  // Request initial permissions on component mount
  useEffect(() => {
    console.log("Classroom component mounted, checking for media devices...");
    
    const requestInitialPermissions = async () => {
      try {
        // Check if the browser supports getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Browser doesn't support getUserMedia API");
          toast({
            title: "Browser Not Supported",
            description: "Your browser doesn't support camera and microphone access.",
            variant: "destructive"
          });
          return;
        }
        
        console.log("Browser supports getUserMedia, checking permissions...");
        
        // Try to get device permissions
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log("Available devices:", devices);
        
        const hasVideoDevice = devices.some(device => device.kind === 'videoinput');
        
        if (!hasVideoDevice) {
          console.warn("No video input devices found");
          toast({
            title: "No Camera Detected",
            description: "No camera device was detected on your system.",
            variant: "destructive"
          });
          return;
        }
        
        // Check permissions without turning anything on yet
        await navigator.permissions.query({ name: 'camera' as PermissionName });
        await navigator.permissions.query({ name: 'microphone' as PermissionName });
        
        console.log("Permission check completed");
        setHasPermissionError(false);
      } catch (err) {
        console.warn("Initial permission check failed:", err);
        setHasPermissionError(true);
      }
    };
    
    requestInitialPermissions();
    
    // Automatically request camera access
    const autoStartCamera = async () => {
      try {
        // Try auto-starting camera if not already on
        if (!isVideoOn) {
          await toggleVideo();
        }
      } catch (err) {
        console.error("Failed to auto-start camera:", err);
      }
    };
    
    // Auto start with a slight delay to ensure component is fully mounted
    const timerId = setTimeout(() => {
      autoStartCamera();
    }, 1000);
    
    return () => {
      clearTimeout(timerId);
      // Clean up media streams when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle Gmail Invite
  const handleInvite = () => {
    setIsInviteOpen(true);
  };

  // Handle Groups
  const handleGroups = () => {
    setIsGroupsOpen(true);
  };
  
  // Handle Settings
  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  // Handle End Class
  const handleEndClass = () => {
    setIsEndClassDialogOpen(true);
  };

  // Confirm End Class
  const confirmEndClass = () => {
    // Clean up any streams
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }
    toast({
      title: "Class Ended",
      description: "You have successfully ended the class."
    });
    navigate("/dashboard");
  };
  
  // Clean up media streams when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
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
                      {hasPermissionError && (
                        <p className="text-xs text-red-400 mt-2">
                          Permission denied. Please check your browser settings.
                        </p>
                      )}
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
          
          {/* Class Controls - Replacing Participants section */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-gradient font-playfair">Class Controls</h3>
            
            <Card className="p-4 bg-gradient-to-br from-secondary/30 to-background border border-white/10 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
                  onClick={handleInvite}
                >
                  <Share2 className="h-4 w-4 text-primary" />
                  <span>Share Gmail Invite</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
                  onClick={handleGroups}
                >
                  <Users className="h-4 w-4 text-primary" />
                  <span>Groups</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
                  onClick={handleSettings}
                >
                  <Settings className="h-4 w-4 text-primary" />
                  <span>Settings</span>
                </Button>
                <Button 
                  variant="destructive" 
                  className="col-span-2 flex items-center gap-2 justify-center"
                  onClick={handleEndClass}
                >
                  <span>End Class</span>
                </Button>
              </div>
            </Card>
            
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

      {/* Invite Dialog */}
      <Popover open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <PopoverTrigger asChild>
          <div className="hidden">Invite Trigger</div>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-5">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Invite via Gmail</h3>
            <p className="text-sm text-muted-foreground">Send class invitations to participants using Gmail.</p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email Addresses</label>
              <textarea 
                id="email" 
                className="w-full min-h-[100px] p-3 rounded-md border border-white/10 bg-background/50 resize-none" 
                placeholder="Enter email addresses separated by commas"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Invitations Sent",
                  description: "Your class invitations have been sent via Gmail."
                });
                setIsInviteOpen(false);
              }}>Send Invites</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Groups Sheet */}
      <Sheet open={isGroupsOpen} onOpenChange={setIsGroupsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Manage Groups</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Current Groups</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-md border border-white/10 bg-white/5">
                  <p className="font-medium">Group 1</p>
                  <p className="text-sm text-muted-foreground">3 members</p>
                </div>
                <div className="p-3 rounded-md border border-white/10 bg-white/5">
                  <p className="font-medium">Group 2</p>
                  <p className="text-sm text-muted-foreground">4 members</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full" onClick={() => {
                toast({
                  title: "New Group Created",
                  description: "You've created a new study group."
                });
              }}>Create New Group</Button>
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Groups Randomized",
                  description: "Students have been randomly assigned to groups."
                });
              }}>Randomize Groups</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Classroom Settings</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Video Settings</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Video Quality Updated",
                    description: "Video quality set to HD (720p)."
                  });
                }}>
                  <span>Video Quality</span>
                  <span className="text-xs text-muted-foreground">HD 720p</span>
                </Button>
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Camera Changed",
                    description: "Using default webcam."
                  });
                }}>
                  <span>Camera</span>
                  <span className="text-xs text-muted-foreground">Webcam</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Audio Settings</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Microphone Changed",
                    description: "Using default microphone."
                  });
                }}>
                  <span>Microphone</span>
                  <span className="text-xs text-muted-foreground">Default</span>
                </Button>
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Speaker Changed",
                    description: "Using default speakers."
                  });
                }}>
                  <span>Speaker</span>
                  <span className="text-xs text-muted-foreground">Default</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Class Settings</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between" onClick={() => {
                  toast({
                    title: "Record Setting Changed",
                    description: "Class recording has been enabled."
                  });
                }}>
                  <span>Record Class</span>
                  <span className="text-xs text-muted-foreground">Enabled</span>
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => {
                  toast({
                    title: "Chat Setting Changed",
                    description: "Chat moderation has been enabled."
                  });
                }}>
                  <span>Chat Moderation</span>
                  <span className="text-xs text-muted-foreground">Enabled</span>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* End Class Confirmation Dialog */}
      <Dialog open={isEndClassDialogOpen} onOpenChange={setIsEndClassDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End This Class?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this class? All students will be disconnected and the session will be closed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEndClassDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmEndClass}>End Class</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Classroom;
