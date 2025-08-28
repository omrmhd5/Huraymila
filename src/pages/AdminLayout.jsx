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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { language } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserRole();
  }, [user]);

  const checkUserRole = async () => {
    if (user) {
      navigate("/auth");
      return;
    }

    try {
      // Mock implementation - simulate admin role check
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user has admin role (for demo purposes, always grant access)
      // In production, this should check user.role === "admin"
      setUserRole("admin");
    } catch (error) {
      console.error("Error checking user role:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
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
      value: "/admin/standards",
      label: language === "ar" ? "إدارة المعايير" : "Standards Management",
      icon: Database,
      description:
        language === "ar"
          ? "إدارة المعايير الصحية الـ 80"
          : "Manage the 80 Health Standards",
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

  // Show loading state while checking role
  if (loading || userRole === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-arabic">
            {language === "ar"
              ? "جاري التحقق من الصلاحيات..."
              : "Checking permissions..."}
          </p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if not admin
  if (userRole !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            {language === "ar" ? "غير مصرح لك بالوصول" : "Access Denied"}
          </h1>
          <p className="text-muted-foreground mb-4">
            {language === "ar"
              ? "هذه الصفحة مخصصة للمسؤولين فقط"
              : "This page is for administrators only"}
          </p>
          <Button onClick={() => navigate("/")}>
            {language === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-background via-background to-muted/30",
        language === "ar" ? "font-arabic" : "font-english"
      )}>
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
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

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={getCurrentTab()}
            onValueChange={handleTabChange}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 h-auto p-1 bg-transparent">
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
