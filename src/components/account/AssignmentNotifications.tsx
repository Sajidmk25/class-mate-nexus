
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

const AssignmentNotifications = () => {
  return (
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
  );
};

export default AssignmentNotifications;
