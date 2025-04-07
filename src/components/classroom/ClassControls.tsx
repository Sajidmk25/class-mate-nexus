
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Users, Settings } from "lucide-react";

interface ClassControlsProps {
  onInviteClick: () => void;
  onGroupsClick: () => void;
  onSettingsClick: () => void;
  onEndClassClick: () => void;
}

const ClassControls = ({
  onInviteClick,
  onGroupsClick,
  onSettingsClick,
  onEndClassClick
}: ClassControlsProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-gradient font-playfair">Class Controls</h3>
      
      <Card className="p-4 bg-gradient-to-br from-secondary/30 to-background border border-white/10 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
            onClick={onInviteClick}
          >
            <Share2 className="h-4 w-4 text-primary" />
            <span>Share Gmail Invite</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
            onClick={onGroupsClick}
          >
            <Users className="h-4 w-4 text-primary" />
            <span>Groups</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/10 flex items-center gap-2 justify-start"
            onClick={onSettingsClick}
          >
            <Settings className="h-4 w-4 text-primary" />
            <span>Settings</span>
          </Button>
          <Button 
            variant="destructive" 
            className="col-span-2 flex items-center gap-2 justify-center"
            onClick={onEndClassClick}
          >
            <span>End Class</span>
          </Button>
        </div>
      </Card>
      
      <div className="mt-6">
        <h3 className="text-md font-medium mb-2 text-primary">Connection Quality</h3>
        <div className="w-full bg-gray-700/30 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-4/5"></div>
        </div>
        <div className="text-sm">
          <p className="flex justify-between py-1">
            <span className="text-gray-400">Network:</span>
            <span className="font-medium text-gray-200">Excellent</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-gray-400">Resolution:</span>
            <span>HD (720p)</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-gray-400">Encryption:</span>
            <span>Enabled</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassControls;
