
import { Badge } from "@/components/ui/badge";
import { User, CalendarClock } from "lucide-react";
import { Contact } from "./ContactDetailDialog";

interface ContactListItemProps {
  contact: Contact;
  onClick: () => void;
  isTeacher: boolean;
}

const ContactListItem = ({ contact, onClick, isTeacher }: ContactListItemProps) => {
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

  return (
    <div 
      className={`p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
        contact.status === "unread" ? "border-destructive/50 bg-destructive/5" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium">{contact.subject}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {contact.message}
          </p>
        </div>
        <div className="ml-4">
          {getStatusBadge(contact.status)}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {isTeacher && (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{contact.profile?.full_name || "Unknown Student"}</span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <CalendarClock className="h-3 w-3 mr-1" />
          <span>{formatDate(contact.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
