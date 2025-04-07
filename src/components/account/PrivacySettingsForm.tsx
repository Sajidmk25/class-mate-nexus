
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PrivacySettingsForm = () => {
  const { toast } = useToast();
  const [showOnline, setShowOnline] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleSave = () => {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved",
    });
  };

  return (
    <div className="space-y-6">
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
          <Switch 
            id="show-online" 
            checked={showOnline}
            onCheckedChange={setShowOnline}
          />
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
          <Switch 
            id="show-progress" 
            checked={showProgress}
            onCheckedChange={setShowProgress}
          />
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
          <Switch 
            id="show-email" 
            checked={showEmail}
            onCheckedChange={setShowEmail}
          />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default PrivacySettingsForm;
