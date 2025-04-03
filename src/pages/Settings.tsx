
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Moon, Sun, Globe, BellRing, Lock, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("english");
  
  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout title="Settings">
      <Tabs defaultValue="general" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-64 flex-shrink-0">
            <CardContent className="p-4">
              <TabsList className="flex flex-col items-start space-y-1 bg-transparent p-0">
                <TabsTrigger 
                  value="general" 
                  className="w-full justify-start px-2 py-1.5 data-[state=active]:bg-gray-100 rounded-md"
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="w-full justify-start px-2 py-1.5 data-[state=active]:bg-gray-100 rounded-md"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start px-2 py-1.5 data-[state=active]:bg-gray-100 rounded-md"
                >
                  <BellRing className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="w-full justify-start px-2 py-1.5 data-[state=active]:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Appearance</h3>
                    
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Sun className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium">Theme</h4>
                        <p className="text-sm text-gray-500">
                          Choose how EduConnect looks to you
                        </p>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Globe className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium">Language</h4>
                        <p className="text-sm text-gray-500">
                          Select your preferred language
                        </p>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="korean">Korean</SelectItem>
                            <SelectItem value="arabic">Arabic</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Accessibility</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="screen-reader" className="font-medium">
                          Screen reader optimization
                        </Label>
                        <p className="text-sm text-gray-500">
                          Improve compatibility with screen readers
                        </p>
                      </div>
                      <Switch id="screen-reader" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="motion-reduce" className="font-medium">
                          Reduce motion
                        </Label>
                        <p className="text-sm text-gray-500">
                          Minimize animations throughout the interface
                        </p>
                      </div>
                      <Switch id="motion-reduce" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast" className="font-medium">
                          High contrast
                        </Label>
                        <p className="text-sm text-gray-500">
                          Increase contrast for better readability
                        </p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Profile Visibility</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-online" className="font-medium">
                          Show when I'm online
                        </Label>
                        <p className="text-sm text-gray-500">
                          Let others see when you're active on the platform
                        </p>
                      </div>
                      <Switch id="show-online" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-progress" className="font-medium">
                          Share course progress
                        </Label>
                        <p className="text-sm text-gray-500">
                          Allow classmates to see your course progress
                        </p>
                      </div>
                      <Switch id="show-progress" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-email" className="font-medium">
                          Show email to classmates
                        </Label>
                        <p className="text-sm text-gray-500">
                          Make your email visible to other students
                        </p>
                      </div>
                      <Switch id="show-email" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Data & Cookies</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="font-medium">
                          Usage data collection
                        </Label>
                        <p className="text-sm text-gray-500">
                          Allow us to collect anonymous usage data to improve the platform
                        </p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cookies" className="font-medium">
                          Essential cookies only
                        </Label>
                        <p className="text-sm text-gray-500">
                          Limit cookies to those necessary for core functionality
                        </p>
                      </div>
                      <Switch id="cookies" />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Channels</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app" className="font-medium">
                          In-app notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Show notifications within the platform
                        </p>
                      </div>
                      <Switch id="in-app" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notif" className="font-medium">
                          Email notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Send notifications to your email
                        </p>
                      </div>
                      <Switch id="email-notif" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mobile-push" className="font-medium">
                          Mobile push notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications on your mobile device
                        </p>
                      </div>
                      <Switch id="mobile-push" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="course-updates" className="font-medium">
                          Course updates
                        </Label>
                        <p className="text-sm text-gray-500">
                          New materials, announcements, and changes
                        </p>
                      </div>
                      <Switch id="course-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="due-dates" className="font-medium">
                          Due date reminders
                        </Label>
                        <p className="text-sm text-gray-500">
                          Reminders about upcoming assignment deadlines
                        </p>
                      </div>
                      <Switch id="due-dates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="messages" className="font-medium">
                          Messages
                        </Label>
                        <p className="text-sm text-gray-500">
                          Direct and group message notifications
                        </p>
                      </div>
                      <Switch id="messages" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="grade-updates" className="font-medium">
                          Grade updates
                        </Label>
                        <p className="text-sm text-gray-500">
                          Notifications when assignments are graded
                        </p>
                      </div>
                      <Switch id="grade-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotions" className="font-medium">
                          Platform updates and promotions
                        </Label>
                        <p className="text-sm text-gray-500">
                          News about platform features and special offers
                        </p>
                      </div>
                      <Switch id="promotions" />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Account Management</h3>
                    
                    <div>
                      <Button variant="outline">Change Password</Button>
                      <p className="text-sm text-gray-500 mt-1">
                        Last changed: 45 days ago
                      </p>
                    </div>
                    
                    <div>
                      <Button variant="outline">Update Email Address</Button>
                      <p className="text-sm text-gray-500 mt-1">
                        Current: jane.doe@example.com
                      </p>
                    </div>
                    
                    <div>
                      <Button variant="outline">Two-Factor Authentication</Button>
                      <p className="text-sm text-gray-500 mt-1">
                        Status: Not enabled
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Linked Accounts</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Google</p>
                        <p className="text-sm text-gray-500">Not connected</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Microsoft</p>
                        <p className="text-sm text-gray-500">Not connected</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Apple</p>
                        <p className="text-sm text-gray-500">Not connected</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-red-600">Danger Zone</h3>
                    
                    <div>
                      <Button variant="destructive">Deactivate Account</Button>
                      <p className="text-sm text-gray-500 mt-1">
                        This will temporarily disable your account
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete Account
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </Layout>
  );
};

export default Settings;
