
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIAssistant from "./components/AIAssistant";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Messages from "./pages/Messages";
import Assignments from "./pages/Assignments";
import Schedule from "./pages/Schedule";
import StudyGroups from "./pages/StudyGroups";
import Grades from "./pages/Grades";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
