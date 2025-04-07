
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import AccountSettingCard from "./AccountSettingCard";
import PrivacySettingsForm from "@/components/account/PrivacySettingsForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import NotificationSettings from "@/components/account/NotificationSettings";
import LinkedAccountsForm from "@/components/account/LinkedAccountsForm";

const ProfileSidebar = () => {
  const { user } = useAuth();
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
  const [linkedAccountsDialogOpen, setLinkedAccountsDialogOpen] = useState(false);
  
  if (!user) return null;
  
  return (
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
        
        <AccountSettingCard
          title="Privacy"
          description="Control how your profile information is displayed"
          buttonText="Manage Privacy Settings"
          onClick={() => setPrivacyDialogOpen(true)}
        />
        
        <AccountSettingCard
          title="Password"
          description="Update your password regularly for security"
          buttonText="Change Password"
          onClick={() => setPasswordDialogOpen(true)}
        />
        
        <AccountSettingCard
          title="Notifications"
          description="Set preferences for emails and notifications"
          buttonText="Notification Settings"
          onClick={() => setNotificationsDialogOpen(true)}
        />
        
        <AccountSettingCard
          title="Linked Accounts"
          description="Connect your social and external accounts"
          buttonText="Manage Linked Accounts"
          onClick={() => setLinkedAccountsDialogOpen(true)}
        />
        
        {/* Dialogs */}
        <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
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
        
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
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
        
        <Dialog open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}>
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
        
        <Dialog open={linkedAccountsDialogOpen} onOpenChange={setLinkedAccountsDialogOpen}>
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
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
