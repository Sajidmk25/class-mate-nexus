import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface MediaStreamOptions {
  autoStartVideo?: boolean;
}

export const useMediaStream = (options: MediaStreamOptions = {}) => {
  const { autoStartVideo = true } = options;
  
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  // Check device permissions
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
  
  // Initialize and cleanup
  useEffect(() => {
    console.log("useMediaStream hook initialized, checking for media devices...");
    
    requestInitialPermissions();
    
    // Automatically request camera access if option is enabled
    if (autoStartVideo) {
      const autoStartCamera = async () => {
        try {
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
      
      return () => clearTimeout(timerId);
    }
    
    return () => {
      // Clean up media streams when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    isVideoOn,
    isAudioOn,
    hasPermissionError,
    videoRef,
    toggleVideo,
    toggleAudio
  };
};
