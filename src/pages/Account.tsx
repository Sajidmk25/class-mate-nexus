
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Calendar, MessageSquare, Mail } from "lucide-react";

const Account = () => {
  return (
    <Layout title="Account & Notifications">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Class Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="class-reminders" className="font-medium">
                            Class reminders
                          </Label>
                          <p className="text-sm text-gray-500">
                            Receive notifications 15 minutes before class starts
                          </p>
                        </div>
                      </div>
                      <Switch id="class-reminders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="schedule-changes" className="font-medium">
                            Schedule changes
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get notified when class times or dates change
                          </p>
                        </div>
                      </div>
                      <Switch id="schedule-changes" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="class-recordings" className="font-medium">
                            Class recordings
                          </Label>
                          <p className="text-sm text-gray-500">
                            Notify when class recordings are available
                          </p>
                        </div>
                      </div>
                      <Switch id="class-recordings" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Assignment Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Bell className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="new-assignments" className="font-medium">
                            New assignments
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get notified when new assignments are posted
                          </p>
                        </div>
                      </div>
                      <Switch id="new-assignments" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Bell className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="assignment-due" className="font-medium">
                            Assignment due reminders
                          </Label>
                          <p className="text-sm text-gray-500">
                            Remind 1 day before assignments are due
                          </p>
                        </div>
                      </div>
                      <Switch id="assignment-due" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Bell className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="grades-posted" className="font-medium">
                            Grades posted
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get notified when your assignments are graded
                          </p>
                        </div>
                      </div>
                      <Switch id="grades-posted" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Communication Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="direct-messages" className="font-medium">
                            Direct messages
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get notified for new direct messages
                          </p>
                        </div>
                      </div>
                      <Switch id="direct-messages" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="group-messages" className="font-medium">
                            Group messages
                          </Label>
                          <p className="text-sm text-gray-500">
                            Get notified for new messages in study groups
                          </p>
                        </div>
                      </div>
                      <Switch id="group-messages" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email notifications
                          </Label>
                          <p className="text-sm text-gray-500">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="font-medium">Sajid Mehmood</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="font-medium">jane.doe@example.com</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                <p className="font-medium">ST12345678</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="font-medium">Student</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Joined</h3>
                <p className="font-medium">January 15, 2025</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Add an extra layer of security to your account
                </p>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor" className="font-medium">
                    Enable 2FA
                  </Label>
                  <Switch id="two-factor" />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Login History</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Last login: April 3, 2025, 10:45 AM
                </p>
                <p className="text-sm text-blue-600 cursor-pointer">
                  View full login history
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
