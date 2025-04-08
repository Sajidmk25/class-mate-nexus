
import React from 'react';
import { useAuth } from "@/context/AuthContext.js";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {user ? (
          <div>
            <p className="mb-4">Welcome, {user.name || "User"}!</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <p>This is your dashboard. Your content will appear here.</p>
            </div>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
