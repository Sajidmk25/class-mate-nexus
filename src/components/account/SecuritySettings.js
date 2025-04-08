
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SecuritySettings = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SecuritySettings;
