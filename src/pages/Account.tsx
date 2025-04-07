
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotificationSettings from "@/components/account/NotificationSettings";
import AccountInfo from "@/components/account/AccountInfo";
import SecuritySettings from "@/components/account/SecuritySettings";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notifications");
  
  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <Layout title="Account & Notifications">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NotificationSettings />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountInfo />
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleNavigateToProfile}
                  className="w-full mt-2"
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
