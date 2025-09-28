import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AgencyDashboard from "./pages/AgencyDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AgencyManagement from "./pages/AgencyManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import StandardsManagement from "./pages/StandardsManagement";
import SubmissionsView from "./pages/SubmissionsView";
import AllNews from "./pages/AllNews";
import NewsArticle from "./pages/NewsArticle";
import AllSuccessStories from "./pages/AllSuccessStories";
import SuccessStory from "./pages/SuccessStory";
import AllInitiatives from "./pages/AllInitiatives";
import Initiative from "./pages/Initiative";
import Report from "./pages/Report";
import AboutHuraymila from "./pages/AboutHuraymila";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/news" element={<AllNews />} />
                  <Route path="/news/:id" element={<NewsArticle />} />
                  <Route
                    path="/success-stories"
                    element={<AllSuccessStories />}
                  />
                  <Route
                    path="/success-stories/:id"
                    element={<SuccessStory />}
                  />
                  <Route path="/initiatives" element={<AllInitiatives />} />
                  <Route path="/initiatives/:id" element={<Initiative />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/about-huraymila" element={<AboutHuraymila />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route
                    path="/volunteer-dashboard"
                    element={<VolunteerDashboard />}
                  />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route
                    path="agency-management"
                    element={<AgencyManagement />}
                  />
                  <Route path="standards" element={<StandardsManagement />} />
                  <Route
                    path="standards/:standardId"
                    element={<SubmissionsView />}
                  />
                </Route>

                <Route path="/agency-dashboard" element={<AgencyDashboard />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
