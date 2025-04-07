
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ContactDetailDialogProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUpdated: () => void;
  isTeacher: boolean;
}

export interface Contact {
  id: string;
  student_id: string;
  subject: string;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  profile?: {
    full_name: string;
    student_id: string;
  };
}

const ContactDetailDialog = ({
  contact,
  open,
  onOpenChange,
  onContactUpdated,
  isTeacher
}: ContactDetailDialogProps) => {
  const { callApi } = useApi();
  const [notes, setNotes] = useState(contact?.notes || "");
  const [status, setStatus] = useState(contact?.status || "unread");

  // Reset state when contact changes
  if (contact && (contact.notes !== notes || contact.status !== status)) {
    setNotes(contact.notes || "");
    setStatus(contact.status);
  }

  const saveContactNotes = async () => {
    if (!contact) return;

    try {
      const { error } = await callApi('/contacts', {
        method: 'PUT',
        body: { 
          id: contact.id,
          status: status,
          notes: notes
        }
      });

      if (error) throw new Error(error);

      onContactUpdated();
      onOpenChange(false);
      toast({
        title: "Contact updated",
        description: "The contact details have been saved successfully."
      });

    } catch (error) {
      console.error("Error saving contact notes:", error);
      toast({
        title: "Failed to save notes",
        description: "There was a problem saving your notes.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge variant="destructive">Unread</Badge>;
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{contact.subject}</DialogTitle>
          <DialogDescription>
            {isTeacher && contact.profile 
              ? `From: ${contact.profile.full_name} (Student ID: ${contact.profile.student_id})`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Sent: {formatDate(contact.created_at)}</span>
            {getStatusBadge(contact.status)}
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <p>{contact.message}</p>
          </div>

          {isTeacher && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={status === "unread" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatus("unread")}
                  >
                    Unread
                  </Button>
                  <Button 
                    variant={status === "read" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatus("read")}
                  >
                    Read
                  </Button>
                  <Button 
                    variant={status === "in-progress" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatus("in-progress")}
                  >
                    In Progress
                  </Button>
                  <Button 
                    variant={status === "resolved" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatus("resolved")}
                  >
                    Resolved
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Teacher Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private notes about this student contact"
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  These notes are only visible to teachers
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={saveContactNotes}>
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailDialog;
