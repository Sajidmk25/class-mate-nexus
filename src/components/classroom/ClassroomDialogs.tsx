
import React from "react";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ClassroomDialogsProps {
  isInviteOpen: boolean;
  isGroupsOpen: boolean;
  isSettingsOpen: boolean;
  isEndClassDialogOpen: boolean;
  setIsInviteOpen: (open: boolean) => void;
  setIsGroupsOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setIsEndClassDialogOpen: (open: boolean) => void;
  onConfirmEndClass: () => void;
}

const ClassroomDialogs = ({
  isInviteOpen,
  isGroupsOpen,
  isSettingsOpen,
  isEndClassDialogOpen,
  setIsInviteOpen,
  setIsGroupsOpen,
  setIsSettingsOpen,
  setIsEndClassDialogOpen,
  onConfirmEndClass
}: ClassroomDialogsProps) => {
  return (
    <>
      {/* Invite Dialog */}
      <Popover open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <PopoverTrigger asChild>
          <div className="hidden">Invite Trigger</div>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-5">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Invite via Gmail</h3>
            <p className="text-sm text-muted-foreground">Send class invitations to participants using Gmail.</p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email Addresses</label>
              <textarea 
                id="email" 
                className="w-full min-h-[100px] p-3 rounded-md border border-white/10 bg-background/50 resize-none" 
                placeholder="Enter email addresses separated by commas"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Invitations Sent",
                  description: "Your class invitations have been sent via Gmail."
                });
                setIsInviteOpen(false);
              }}>Send Invites</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Groups Sheet */}
      <Sheet open={isGroupsOpen} onOpenChange={setIsGroupsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Manage Groups</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Current Groups</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-md border border-white/10 bg-white/5">
                  <p className="font-medium">Group 1</p>
                  <p className="text-sm text-muted-foreground">3 members</p>
                </div>
                <div className="p-3 rounded-md border border-white/10 bg-white/5">
                  <p className="font-medium">Group 2</p>
                  <p className="text-sm text-muted-foreground">4 members</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full" onClick={() => {
                toast({
                  title: "New Group Created",
                  description: "You've created a new study group."
                });
              }}>Create New Group</Button>
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Groups Randomized",
                  description: "Students have been randomly assigned to groups."
                });
              }}>Randomize Groups</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Classroom Settings</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Video Settings</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Video Quality Updated",
                    description: "Video quality set to HD (720p)."
                  });
                }}>
                  <span>Video Quality</span>
                  <span className="text-xs text-muted-foreground">HD 720p</span>
                </Button>
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Camera Changed",
                    description: "Using default webcam."
                  });
                }}>
                  <span>Camera</span>
                  <span className="text-xs text-muted-foreground">Webcam</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Audio Settings</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Microphone Changed",
                    description: "Using default microphone."
                  });
                }}>
                  <span>Microphone</span>
                  <span className="text-xs text-muted-foreground">Default</span>
                </Button>
                <Button variant="outline" className="justify-between" onClick={() => {
                  toast({
                    title: "Speaker Changed",
                    description: "Using default speakers."
                  });
                }}>
                  <span>Speaker</span>
                  <span className="text-xs text-muted-foreground">Default</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Class Settings</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between" onClick={() => {
                  toast({
                    title: "Record Setting Changed",
                    description: "Class recording has been enabled."
                  });
                }}>
                  <span>Record Class</span>
                  <span className="text-xs text-muted-foreground">Enabled</span>
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => {
                  toast({
                    title: "Chat Setting Changed",
                    description: "Chat moderation has been enabled."
                  });
                }}>
                  <span>Chat Moderation</span>
                  <span className="text-xs text-muted-foreground">Enabled</span>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* End Class Confirmation Dialog */}
      <Dialog open={isEndClassDialogOpen} onOpenChange={setIsEndClassDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End This Class?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this class? All students will be disconnected and the session will be closed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEndClassDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirmEndClass}>End Class</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClassroomDialogs;
