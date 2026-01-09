
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

// Faculty Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyCourses from "./pages/faculty/FacultyCourses";
import ContentLibrary from "./pages/faculty/ContentLibrary";
import LearningOutcomes from "./pages/faculty/LearningOutcomes";
import Assessments from "./pages/faculty/Assessments";
import StudentInsights from "./pages/faculty/StudentInsights";
import BotConfiguration from "./pages/faculty/BotConfiguration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root redirects to faculty */}
            <Route path="/" element={<Navigate to="/faculty/dashboard" replace />} />
            
            {/* Faculty Portal Routes */}
            <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/courses" element={<FacultyCourses />} />
            <Route path="/faculty/content" element={<ContentLibrary />} />
            <Route path="/faculty/outcomes" element={<LearningOutcomes />} />
            <Route path="/faculty/assessments" element={<Assessments />} />
            <Route path="/faculty/insights" element={<StudentInsights />} />
            <Route path="/faculty/bot-config" element={<BotConfiguration />} />
            <Route path="/faculty/settings" element={<Settings />} />
            <Route path="/faculty/help" element={<Help />} />
            
            {/* Admin Routes (preserved) */}
            <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />
            <Route path="/admin/analytics" element={<Index />} />
            <Route path="/admin/bots" element={<Bots />} />
            <Route path="/admin/playground" element={<Playground />} />
            <Route path="/admin/data-sources" element={<DataSources />} />
            <Route path="/admin/data-sources/add" element={<AddDataSource />} />
            <Route path="/admin/guide" element={<Guide />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/help" element={<Help />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/chat" element={<StudentChat />} />
            <Route path="/student/gaps" element={<KnowledgeGaps />} />
            <Route path="/student/readiness" element={<ExamReadiness />} />
            <Route path="/student/progress" element={<StudentProgress />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/help" element={<Help />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
