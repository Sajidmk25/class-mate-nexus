
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

// Custom hook and components
import { useMediaStream } from "@/hooks/useMediaStream";
import VideoDisplay from "@/components/classroom/VideoDisplay";
import ClassInfo from "@/components/classroom/ClassInfo";
import ClassControls from "@/components/classroom/ClassControls";
import ClassroomDialogs from "@/components/classroom/ClassroomDialogs";

const Classroom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dialog states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEndClassDialogOpen, setIsEndClassDialogOpen] = useState(false);
  
  // Media handling with custom hook
  const { 
    isVideoOn, 
    isAudioOn, 
    hasPermissionError,
    videoRef, 
    toggleVideo, 
    toggleAudio 
  } = useMediaStream({ autoStartVideo: true });

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
    toast({
      title: "Class Ended",
      description: "You have successfully ended the class."
    });
    navigate("/dashboard");
  };
  
  return (
    <Layout title="Virtual Classroom">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Feed */}
          <div className="lg:col-span-2">
            <VideoDisplay 
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
              hasPermissionError={hasPermissionError}
              toggleVideo={toggleVideo}
              toggleAudio={toggleAudio}
              videoRef={videoRef}
              userName={user?.name}
            />
            
            <ClassInfo />
          </div>
          
          {/* Class Controls */}
          <ClassControls 
            onInviteClick={handleInvite}
            onGroupsClick={handleGroups}
            onSettingsClick={handleSettings}
            onEndClassClick={handleEndClass}
          />
        </div>
      </div>

      {/* All Dialogs and Sheets */}
      <ClassroomDialogs 
        isInviteOpen={isInviteOpen}
        isGroupsOpen={isGroupsOpen}
        isSettingsOpen={isSettingsOpen}
        isEndClassDialogOpen={isEndClassDialogOpen}
        setIsInviteOpen={setIsInviteOpen}
        setIsGroupsOpen={setIsGroupsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        setIsEndClassDialogOpen={setIsEndClassDialogOpen}
        onConfirmEndClass={confirmEndClass}
      />
    </Layout>
  );
};

export default Classroom;
