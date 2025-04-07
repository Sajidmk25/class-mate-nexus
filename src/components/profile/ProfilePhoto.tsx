
import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfilePhotoProps {
  profilePhotoUrl: string;
  setProfilePhotoUrl: (url: string) => void;
  initials: string;
}

const ProfilePhoto = ({ profilePhotoUrl, setProfilePhotoUrl, initials }: ProfilePhotoProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadTab, setUploadTab] = useState("computer");
  const [driveUrl, setDriveUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size and type
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image less than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfilePhotoUrl(event.target.result as string);
        setUploadDialog(false);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been updated successfully",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGoogleDriveUpload = () => {
    // In a real implementation, this would use the Google Drive API
    // For this demo, we'll just validate it's an image URL
    if (!driveUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Google Drive image URL",
        variant: "destructive",
      });
      return;
    }

    // Simple validation - in real app, you'd verify this is an actual Drive image
    if (driveUrl.startsWith('https://drive.google.com') || driveUrl.startsWith('http')) {
      setProfilePhotoUrl(driveUrl);
      setUploadDialog(false);
      setDriveUrl("");
      toast({
        title: "Photo updated",
        description: "Your profile photo has been updated from Google Drive",
      });
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Google Drive image URL",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profilePhotoUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
          <DialogTrigger asChild>
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm cursor-pointer">
              <Camera className="h-4 w-4 text-gray-500" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile Photo</DialogTitle>
              <DialogDescription>
                Choose a new profile photo from your computer or Google Drive
              </DialogDescription>
            </DialogHeader>
            <Tabs 
              defaultValue="computer" 
              value={uploadTab} 
              onValueChange={setUploadTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="computer">Computer</TabsTrigger>
                <TabsTrigger value="drive">Google Drive</TabsTrigger>
              </TabsList>
              <TabsContent value="computer" className="py-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-primary transition-colors flex flex-col items-center"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-center text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or GIF (max. 5MB)
                    </p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
                  <Button onClick={triggerFileInput} type="button">
                    Select File
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="drive" className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="drive-url">Google Drive Image URL</Label>
                    <Input 
                      id="drive-url"
                      placeholder="https://drive.google.com/..." 
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Paste the share link to your image from Google Drive
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleGoogleDriveUpload}
                    disabled={!driveUrl.trim()}
                    className="w-full"
                  >
                    Use this image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        <input 
          type="file" 
          className="hidden" 
          id="profile-photo" 
          accept="image/*"
        />
      </div>
      <div className="text-center sm:text-left">
        <h3 className="font-medium">Profile Photo</h3>
        <p className="text-sm text-gray-500 mb-2">
          Upload a clear photo of yourself
        </p>
        <Button type="button" variant="outline" size="sm" onClick={() => setUploadDialog(true)}>
          Change Photo
        </Button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
