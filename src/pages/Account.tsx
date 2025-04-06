
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationSettings from "@/components/account/NotificationSettings";
import AccountInfo from "@/components/account/AccountInfo";
import SecuritySettings from "@/components/account/SecuritySettings";

const Account = () => {
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
