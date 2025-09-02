import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Target,
  Settings,
  LogOut,
  Database,
  Shield,
  Activity,
  MessageCircle,
  Heart,
  Newspaper,
  UserCheck,
  HandHeart,
  Bell,
  BarChart3,
  Globe,
  Moon,
  Sun,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
// Commented out useAuth import for development
// import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { language, theme, setLanguage, setTheme } = useTheme();
  // Commented out useAuth for development - no authentication required
  // const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Commented out user role state for development
  // const [userRole, setUserRole] = useState(null);
  // const [loading, setLoading] = useState(true);

  // Commented out useEffect for development
  // useEffect(() => {
  //   checkUserRole();
  // }, [user]);

  // Commented out checkUserRole function for development
  // const checkUserRole = async () => {
  //   // Commented out authentication validation for development
  //   // if (!user) {
  //     // navigate("/auth");
  //     // return;
  //   // }

  //   // Commented out role checking for development
  //   try {
  //     // Mock implementation - simulate admin role check
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Check if user has admin role (for demo purposes, always grant access)
  //     // In production, this should check user.role === "admin"
  //     setUserRole("admin");
  //   } catch (error) {
  //     console.error("Error checking user role:", error);
  //     // navigate("/"); // Commented out redirect
  //   } finally {
  //     setLoading(false);
  //   }

  //   // For development: immediately set admin role and skip loading
  //   setUserRole("admin");
  //   setLoading(false);
  // };

  const handleSignOut = async () => {
    // Commented out signOut for development
    // await signOut();
    navigate("/");
  };

  const adminTabs = [
    {
      value: "/admin",
      label: language === "ar" ? "لوحة التحكم" : "Dashboard",
      icon: BarChart3,
      description:
        language === "ar" ? "نظرة عامة على النظام" : "System Overview",
    },
    {
      value: "/admin/agency-management",
      label: language === "ar" ? "إدارة الوكالات" : "Agency Management",
      icon: Building2,
      description:
        language === "ar"
          ? "إدارة الشركاء والوكالات"
          : "Manage Partners & Agencies",
    },
    {
      value: "/admin/standards",
      label: language === "ar" ? "إدارة المعايير" : "Standards Management",
      icon: Database,
      description:
        language === "ar"
          ? "إدارة المعايير الصحية الـ 80"
          : "Manage the 80 Health Standards",
    },
  ];

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    if (currentPath === "/admin") return "/admin";
    if (currentPath === "/admin/standards") return "/admin/standards";
    if (currentPath === "/admin/agency-management")
      return "/admin/agency-management";
    return "/admin";
  };

  const handleTabChange = (value) => {
    navigate(value);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Commented out loading and role checks for development
  // // Show loading state while checking role
  // if (loading || userRole === null) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-muted-foreground font-arabic">
  //           {language === "ar"
  //             ? "جاري التحقق من الصلاحيات..."
  //             : "Checking permissions..."}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // // Show unauthorized message if not admin
  // if (userRole !== "admin") {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //     <div className="text-center">
  //       <h1 className="text-2xl font-bold text-destructive mb-4">
  //         {language === "ar" ? "غير مصرح لك بالوصول" : "Access Denied"}
  //       </h1>
  //       <p className="text-muted-foreground mb-4">
  //         {language === "ar"
  //           ? "هذه الصفحة مخصصة للمسؤولين فقط"
  //           : "This page is for administrators only"}
  //       </p>
  //       <Button onClick={() => navigate("/")}>
  //         {language === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home"}
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-background via-background to-muted/30",
        language === "ar" ? "font-arabic" : "font-english"
      )}>
      {/* Navbar */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-arabic">
                  {language === "ar"
                    ? "لوحة التحكم الإدارية"
                    : "Admin Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground font-arabic">
                  {language === "ar"
                    ? "إدارة جميع بيانات الموقع"
                    : "Manage all site data"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Home Button */}
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <Home className="w-4 h-4" />
              </Button>
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageChange}
                className="hidden sm:flex">
                <Globe className="w-4 h-4" />
                {language === "ar" ? "EN" : "عربي"}
              </Button>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeChange}
                className="hidden sm:flex">
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={getCurrentTab()}
            onValueChange={handleTabChange}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-3 h-auto p-1 bg-transparent">
              {adminTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex flex-col items-start gap-2 h-auto p-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20",
                    "border border-transparent hover:border-border/50 transition-all duration-200"
                  )}>
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left leading-tight">
                    {tab.description}
                  </p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
