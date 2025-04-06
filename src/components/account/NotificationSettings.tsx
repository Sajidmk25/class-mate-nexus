
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassNotifications from "./ClassNotifications";
import AssignmentNotifications from "./AssignmentNotifications";
import CommunicationNotifications from "./CommunicationNotifications";

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ClassNotifications />
          <AssignmentNotifications />
          <CommunicationNotifications />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
