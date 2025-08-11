
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/analytics" replace />} />
            <Route path="/analytics" element={<Index />} />
            <Route path="/chat" element={<Index />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/data-sources/add" element={<AddDataSource />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
