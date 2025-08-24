import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import Volunteer from "./pages/Volunteer";
import Downloads from "./pages/Downloads";
import EnvironmentalReport from "./pages/EnvironmentalReport";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import SmsManagement from "./pages/SmsManagement";
import Auth from "./pages/Auth";
import AuthNew from "./pages/AuthNew";
import TestAccounts from "./pages/TestAccounts";
import NotFound from "./pages/NotFound";
import AgencyAuth from "./pages/AgencyAuth";
import AgencyDashboard from "./pages/AgencyDashboard";
import AgencyManagement from "./pages/AgencyManagement";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/environmental-report" element={<EnvironmentalReport />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sms-management" element={<SmsManagement />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth-new" element={<AuthNew />} />
            <Route path="/agency-auth" element={<AgencyAuth />} />
            <Route path="/agency-dashboard" element={<AgencyDashboard />} />
            <Route path="/agency-management" element={<AgencyManagement />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/test-accounts" element={<TestAccounts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
