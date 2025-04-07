
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContacts = contacts
    .filter(contact => {
      // First filter by tab
      if (activeTab !== "all" && contact.status !== activeTab) {
        return false;
      }
      
      // Then filter by search term if it exists
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        return (
          contact.subject.toLowerCase().includes(searchLower) || 
          contact.message.toLowerCase().includes(searchLower) ||
          (isTeacher && contact.profile?.full_name?.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
              {searchTerm.trim() !== "" ? (
                <>No results found for "<span className="font-medium">{searchTerm}</span>"</>
              ) : (
                <>No {activeTab !== "all" ? activeTab : ""} messages found.</>
              )}
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
    </div>
  );
};

export default ContactsList;
