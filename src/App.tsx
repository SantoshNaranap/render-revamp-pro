
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";
import DataSources from "./pages/DataSources";
import AddDataSource from "./pages/AddDataSource";
import Bots from "./pages/Bots";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Guide from "./pages/Guide";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentChat from "./pages/student/StudentChat";
import KnowledgeGaps from "./pages/student/KnowledgeGaps";
import ExamReadiness from "./pages/student/ExamReadiness";
import StudentProgress from "./pages/student/StudentProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root redirects to admin */}
            <Route path="/" element={<Navigate to="/admin/analytics" replace />} />
            
            {/* Admin Routes (preserved existing functionality) */}
            <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />
            <Route path="/admin/analytics" element={<Index />} />
            <Route path="/admin/chat" element={<Index />} />
            <Route path="/admin/bots" element={<Bots />} />
            <Route path="/admin/playground" element={<Playground />} />
            <Route path="/admin/data-sources" element={<DataSources />} />
            <Route path="/admin/data-sources/add" element={<AddDataSource />} />
            <Route path="/admin/guide" element={<Guide />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/help" element={<Help />} />
            
            {/* Student Routes (new student portal) */}
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/chat" element={<StudentChat />} />
            <Route path="/student/gaps" element={<KnowledgeGaps />} />
            <Route path="/student/readiness" element={<ExamReadiness />} />
            <Route path="/student/progress" element={<StudentProgress />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/help" element={<Help />} />
            
            {/* Legacy routes redirect to admin */}
            <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
            <Route path="/bots" element={<Navigate to="/admin/bots" replace />} />
            <Route path="/playground" element={<Navigate to="/admin/playground" replace />} />
            <Route path="/data-sources" element={<Navigate to="/admin/data-sources" replace />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
