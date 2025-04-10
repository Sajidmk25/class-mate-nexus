
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ContactsList from "@/components/contacts/ContactsList";
import ContactDetailDialog from "@/components/contacts/ContactDetailDialog";

const Contacts = () => {
  const { user, isTeacher } = useAuth();
  const { callApi } = useApi();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);

    try {
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

  const handleOpenContact = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
    
    // If the contact is unread and the user is a teacher, mark it as read
    if (isTeacher && contact.status === "unread") {
      updateContactStatus(contact.id, "read");
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
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

  return (
    <Layout title={isTeacher ? "Student Contacts" : "Messages from Teachers"}>
      <div className="space-y-6">
        {(isTeacher || contacts.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>{isTeacher ? "Student Messages" : "Messages from Teachers"}</CardTitle>
              <CardDescription>
                {isTeacher 
                  ? "View and respond to messages from students" 
                  : "View messages sent to you by teachers"}
              </CardDescription>

              <ContactsList 
                contacts={contacts}
                loading={loading}
                isTeacher={isTeacher}
                onContactSelect={handleOpenContact}
              />
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        )}

        <ContactDetailDialog
          contact={selectedContact}
          open={openDialog}
          onOpenChange={setOpenDialog}
          onContactUpdated={fetchContacts}
          isTeacher={isTeacher}
        />
      </div>
    </Layout>
  );
};

export default Contacts;
