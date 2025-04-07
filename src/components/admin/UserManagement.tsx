
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { authService } from "@/services/auth.service";
import { StudentIdField } from "../auth/StudentIdField";
import { UserRole } from "@/types/auth.types";

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  student_id?: string;
};

const UserManagement = () => {
  const { user } = useAuth();
  const { callApi } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "teacher" | "student">("all");
  
  // Create account form state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [studentId, setStudentId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  // Reset password form state
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    if (!user || user.role !== "admin") return;
    
    setLoading(true);
    try {
      const { data, error } = await callApi('/admin/users');
      
      if (error) throw new Error(error);
      
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Failed to load users",
        description: "There was a problem loading the user list.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);
  
  // Handle account creation
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (role === "student" && !studentId) {
      toast({
        title: "Student ID required",
        description: "Please provide a student ID for student accounts.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    try {
      // Include studentId in metadata if role is student
      const metadata = role === "student" 
        ? { name, role, studentId } 
        : { name, role };
        
      await authService.createUserAccount(email, password, name, role, metadata);
      
      // Reset form and close dialog
      setName("");
      setEmail("");
      setPassword("");
      setStudentId("");
      setRole("student");
      setCreateDialogOpen(false);
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setIsCreating(false);
    }
  };
  
  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserId || !newPassword) {
      toast({
        title: "Missing information",
        description: "Please provide a new password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsResetting(true);
    try {
      await authService.resetUserPassword(selectedUserId, newPassword);
      
      // Reset form and close dialog
      setNewPassword("");
      setSelectedUserId(null);
      setResetDialogOpen(false);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsResetting(false);
    }
  };
  
  // Open reset password dialog for a user
  const openResetDialog = (user: User) => {
    setSelectedUserId(user.id);
    setSelectedUserEmail(user.email);
    setResetDialogOpen(true);
  };
  
  // Filter users based on search and active tab
  const filteredUsers = users.filter(user => {
    // Filter by tab
    if (activeTab !== "all" && user.role !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        (user.student_id && user.student_id.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Not an admin, show access denied
  if (user?.role !== "admin") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You do not have permission to view this page.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage teacher and student accounts</CardDescription>
        </div>
        
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Account
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "teacher" | "student")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="teacher">Teachers</TabsTrigger>
              <TabsTrigger value="student">Students</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              {loading ? (
                <div className="text-center py-8">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm.trim() !== "" ? (
                    <>No results found for "<span className="font-medium">{searchTerm}</span>"</>
                  ) : (
                    <>No {activeTab !== "all" ? activeTab : ""} users found.</>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">{activeTab === "student" ? "Student ID" : ""}</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className="capitalize">{user.role}</span>
                          </td>
                          <td className="py-3 px-4">{user.student_id || ""}</td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openResetDialog(user)}
                            >
                              <RefreshCw className="mr-1 h-3.5 w-3.5" />
                              Reset Password
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Create Account Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
              <DialogDescription>
                Create a new teacher or student account
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateAccount} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Full Name</Label>
                <Input 
                  id="admin-name"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input 
                  id="admin-email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="admin-student" />
                    <Label htmlFor="admin-student" className="cursor-pointer">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="admin-teacher" />
                    <Label htmlFor="admin-teacher" className="cursor-pointer">Teacher</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {role === "student" && (
                <StudentIdField 
                  studentId={studentId} 
                  setStudentId={setStudentId}
                  isDisabled={isCreating}
                />
              )}
              
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input 
                  id="admin-password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setCreateDialogOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : "Create Account"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Reset Password Dialog */}
        <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Reset password for {selectedUserEmail}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleResetPassword} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setResetDialogOpen(false)}
                  disabled={isResetting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isResetting}>
                  {isResetting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : "Reset Password"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
