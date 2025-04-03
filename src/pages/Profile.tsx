
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "Sajid",
    lastName: "Mehmood",
    email: "jane.doe@example.com",
    phone: "(555) 123-4567",
    bio: "Computer Science student with a passion for AI and machine learning."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

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
                        <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm cursor-pointer">
                        <Camera className="h-4 w-4 text-gray-500" />
                      </div>
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
                      <Label htmlFor="profile-photo" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Change Photo
                        </Button>
                      </Label>
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
                <h3 className="font-medium mb-1">Privacy</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Control how your profile information is displayed
                </p>
                <Button variant="outline" className="w-full">Manage Privacy Settings</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Password</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Update your password regularly for security
                </p>
                <Button variant="outline" className="w-full">Change Password</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Notifications</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Set preferences for emails and notifications
                </p>
                <Button variant="outline" className="w-full">Notification Settings</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Linked Accounts</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Connect your social and external accounts
                </p>
                <Button variant="outline" className="w-full">Manage Linked Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
