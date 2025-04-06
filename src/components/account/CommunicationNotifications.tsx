
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail } from "lucide-react";

const CommunicationNotifications = () => {
  return (
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
  );
};

export default CommunicationNotifications;
