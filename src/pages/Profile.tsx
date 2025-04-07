import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";
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
import PrivacySettingsForm from "@/components/account/PrivacySettingsForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import NotificationSettings from "@/components/account/NotificationSettings";
import LinkedAccountsForm from "@/components/account/LinkedAccountsForm";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: ""
  });
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadTab, setUploadTab] = useState("computer");
  const [driveUrl, setDriveUrl] = useState("");
  
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
  const [linkedAccountsDialogOpen, setLinkedAccountsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // Split name into first and last
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(' ') || "";
      
      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || ""
      });
      
      setProfilePhotoUrl(user.photoURL || "");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    updateProfile({
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      photoURL: profilePhotoUrl
    });
  };

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

  if (!user) {
    return <Layout title="My Profile">Loading profile...</Layout>;
  }

  return (
    <Layout title="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and how others see you on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profilePhotoUrl} />
                        <AvatarFallback>{`${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}</AvatarFallback>
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">
                      Brief description about yourself that will be visible to instructors and classmates.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Account Type</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Your current role: <span className="font-medium">{user.role === 'teacher' ? 'Teacher' : 'Student'}</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Privacy</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Control how your profile information is displayed
                </p>
                <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Manage Privacy Settings</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Privacy Settings</DialogTitle>
                      <DialogDescription>
                        Control how your profile information is displayed to others
                      </DialogDescription>
                    </DialogHeader>
                    <PrivacySettingsForm />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Password</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Update your password regularly for security
                </p>
                <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Change Password</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Update your password to keep your account secure
                      </DialogDescription>
                    </DialogHeader>
                    <PasswordChangeForm />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Notifications</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Set preferences for emails and notifications
                </p>
                <Dialog open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Notification Settings</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Notification Settings</DialogTitle>
                      <DialogDescription>
                        Set preferences for how and when you receive notifications
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <NotificationSettings />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Linked Accounts</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Connect your social and external accounts
                </p>
                <Dialog open={linkedAccountsDialogOpen} onOpenChange={setLinkedAccountsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Manage Linked Accounts</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Linked Accounts</DialogTitle>
                      <DialogDescription>
                        Connect your social and external accounts for easier sign-in
                      </DialogDescription>
                    </DialogHeader>
                    <LinkedAccountsForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
