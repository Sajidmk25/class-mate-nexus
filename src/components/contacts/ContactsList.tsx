
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactListItem from "./ContactListItem";
import { Contact } from "./ContactDetailDialog";

interface ContactsListProps {
  contacts: Contact[];
  loading: boolean;
  isTeacher: boolean;
  onContactSelect: (contact: Contact) => void;
}

const ContactsList = ({ contacts, loading, isTeacher, onContactSelect }: ContactsListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredContacts = activeTab === "all" 
    ? contacts
    : contacts.filter(contact => contact.status === activeTab);

  return (
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
              <ContactListItem 
                key={contact.id} 
                contact={contact} 
                onClick={() => onContactSelect(contact)} 
                isTeacher={isTeacher}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ContactsList;
