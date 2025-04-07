
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Mail, Clock, CheckCircle, AlertTriangle, User, CalendarClock } from "lucide-react";
import ContactTeacherForm from "@/components/student/ContactTeacherForm";

interface Contact {
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

const Contacts = () => {
  const { user, isTeacher } = useAuth();
  const { callApi } = useApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("unread");
  const [activeTab, setActiveTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);

    try {
      // Use the API endpoint instead of direct Supabase calls
      const { data, error } = await callApi('/contacts', { method: 'GET' });

      if (error) throw new Error(error);

      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Failed to load contacts",
        description: "There was a problem loading the contact messages.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const handleOpenContact = (contact: Contact) => {
    setSelectedContact(contact);
    setNotes(contact.notes || "");
    setStatus(contact.status);
    setOpenDialog(true);
    
    // If the contact is unread and the user is a teacher, mark it as read
    if (isTeacher && contact.status === "unread") {
      updateContactStatus(contact.id, "read");
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const { error } = await callApi('/contacts', {
        method: 'PUT',
        body: { 
          id: contactId,
          status: newStatus
        }
      });

      if (error) throw new Error(error);

      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      ));

      if (selectedContact && selectedContact.id === contactId) {
        setStatus(newStatus);
      }

      toast({
        title: "Status updated",
        description: `Contact marked as ${newStatus}.`
      });
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast({
        title: "Failed to update status",
        description: "There was a problem updating the contact status.",
        variant: "destructive"
      });
    }
  };

  const saveContactNotes = async () => {
    if (!selectedContact) return;

    try {
      const { error } = await callApi('/contacts', {
        method: 'PUT',
        body: { 
          id: selectedContact.id,
          status: status,
          notes: notes
        }
      });

      if (error) throw new Error(error);

      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id ? { ...contact, notes, status } : contact
      ));

      setOpenDialog(false);
      toast({
        title: "Contact updated",
        description: "The contact details have been saved successfully."
      });

      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error saving contact notes:", error);
      toast({
        title: "Failed to save notes",
        description: "There was a problem saving your notes.",
        variant: "destructive"
      });
    }
  };

  const filteredContacts = activeTab === "all" 
    ? contacts
    : contacts.filter(contact => contact.status === activeTab);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Layout title={isTeacher ? "Student Contacts" : "Contact Teachers"}>
      <div className="space-y-6">
        {!isTeacher && (
          <div className="mb-6">
            <ContactTeacherForm />
          </div>
        )}

        {(isTeacher || contacts.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>{isTeacher ? "Student Messages" : "Your Messages"}</CardTitle>
              <CardDescription>
                {isTeacher 
                  ? "View and respond to messages from students" 
                  : "View your previous messages and their status"}
              </CardDescription>

              <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  {loading ? (
                    <div className="text-center py-8">Loading contacts...</div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No {activeTab !== "all" ? activeTab : ""} messages found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredContacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className={`p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                            contact.status === "unread" ? "border-destructive/50 bg-destructive/5" : ""
                          }`}
                          onClick={() => handleOpenContact(contact)}
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
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        )}

        {/* Contact Detail Dialog */}
        {selectedContact && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedContact.subject}</DialogTitle>
                <DialogDescription>
                  {isTeacher && selectedContact.profile 
                    ? `From: ${selectedContact.profile.full_name} (Student ID: ${selectedContact.profile.student_id})`
                    : ""}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Sent: {formatDate(selectedContact.created_at)}</span>
                  {getStatusBadge(selectedContact.status)}
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                  <p>{selectedContact.message}</p>
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
                      <Button variant="outline" onClick={() => setOpenDialog(false)}>
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
        )}
      </div>
    </Layout>
  );
};

export default Contacts;
