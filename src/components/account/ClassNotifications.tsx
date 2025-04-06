
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const ClassNotifications = () => {
  return (
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
  );
};

export default ClassNotifications;
