
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, MessageSquare, ScreenShare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoDisplayProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  hasPermissionError: boolean;
  toggleVideo: () => Promise<void>;
  toggleAudio: () => Promise<void>;
  videoRef: React.RefObject<HTMLVideoElement>;
  userName?: string;
}

const VideoDisplay = ({
  isVideoOn,
  isAudioOn,
  hasPermissionError,
  toggleVideo,
  toggleAudio,
  videoRef,
  userName = "U"
}: VideoDisplayProps) => {
  return (
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
                <span className="text-3xl font-playfair">{userName?.charAt(0) || "U"}</span>
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
  );
};

export default VideoDisplay;
