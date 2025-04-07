
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type SocialAccount = {
  name: string;
  status: "connected" | "not_connected";
  email?: string;
};

const LinkedAccountsForm = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = React.useState<SocialAccount[]>([
    { name: "Google", status: "not_connected" },
    { name: "Microsoft", status: "not_connected" },
    { name: "Apple", status: "not_connected" },
    { name: "Facebook", status: "not_connected" },
    { name: "Twitter", status: "not_connected" },
  ]);

  const handleConnectAccount = (name: string) => {
    setAccounts(
      accounts.map((account) => {
        if (account.name === name) {
          const connected = account.status === "connected";
          
          toast({
            title: connected ? "Account disconnected" : "Account connected",
            description: connected
              ? `Your ${name} account has been disconnected`
              : `Your ${name} account has been successfully connected`,
          });
          
          return {
            ...account,
            status: connected ? "not_connected" : "connected",
            email: connected ? undefined : `user@${name.toLowerCase()}.com`,
          };
        }
        return account;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Connected Accounts</h3>
        <p className="text-sm text-gray-500">
          Connect your social media accounts for easier login and sharing options
        </p>
        
        {accounts.map((account) => (
          <div key={account.name} className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{account.name}</p>
              <p className="text-sm text-gray-500">
                {account.status === "connected" 
                  ? `Connected to ${account.email}` 
                  : "Not connected"}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => handleConnectAccount(account.name)}
            >
              {account.status === "connected" ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedAccountsForm;
