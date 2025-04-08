
import Layout from "@/components/Layout";
import UserManagement from "@/components/admin/UserManagement";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect non-admin users
    if (!isLoading && user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <Layout title="Admin Panel">
      <div className="space-y-6">
        <UserManagement />
      </div>
    </Layout>
  );
};

export default Admin;
