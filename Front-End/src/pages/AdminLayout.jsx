import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { language, theme, setLanguage, setTheme } = useTheme();
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = language === "ar";

  const content = {
    ar: {
      timeline: {
        title: "الجدول الزمني للبرنامج",
        phases: [
          {
            year: "2025",
            title: "إطلاق البرنامج",
            description: "بداية المبادرات الأساسية وتأسيس الشراكات",
            status: "مكتمل",
          },
          {
            year: "2025",
            title: "التوسع والتطوير",
            description: "تنفيذ المشاريع الكبرى وزيادة المشاركة المجتمعية",
            status: "قيد التنفيذ",
          },
          {
            year: "2026",
            title: "التقييم والتحسين",
            description: "تقييم النتائج وتطوير المبادرات القائمة",
            status: "مخطط",
          },
          {
            year: "2027",
            title: "الاعتماد العالمي",
            description: "التقدم للحصول على اعتماد منظمة الصحة العالمية",
            status: "مخطط",
          },
        ],
      },
    },
    en: {
      timeline: {
        title: "Program Timeline",
        phases: [
          {
            year: "2025",
            title: "Program Launch",
            description:
              "Start of basic initiatives and establishing partnerships",
            status: "Completed",
          },
          {
            year: "2025",
            title: "Expansion & Development",
            description:
              "Implementation of major projects and increased community participation",
            status: "In Progress",
          },
          {
            year: "2026",
            title: "Evaluation & Improvement",
            description:
              "Results evaluation and development of existing initiatives",
            status: "Planned",
          },
          {
            year: "2027",
            title: "Global Accreditation",
            description: "Apply for WHO accreditation",
            status: "Planned",
          },
        ],
      },
    },
  };

  const current = content[language];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only check access after auth loading is complete
    if (!authLoading) {
      checkUserAccess();
    }
  }, [user, authLoading]);

  const checkUserAccess = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user is a governor (admin)
    if (user.type !== "governor") {
      // Redirect agencies to their dashboard
      if (user.type === "agency") {
        navigate("/agency-dashboard");
      } else {
        navigate("/auth");
      }
      return;
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    logout();
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
      label: language === "ar" ? "إدارة الجهات" : "Agency Management",
      icon: Building2,
      description:
        language === "ar"
          ? "إدارة الشركاء والجهات"
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
    return null; // Return null if path doesn't match any of the three tabs
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

  // Show loading state while checking role
  if (authLoading || loading) {
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

      {/* Program Timeline */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3
            className={cn(
              "text-2xl md:text-3xl font-bold text-center text-foreground mb-12",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.timeline.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {current.timeline.phases.map((phase, index) => (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden",
                  phase.status === "مكتمل" || phase.status === "Completed"
                    ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/30 dark:to-green-900/30 dark:border-green-800"
                    : phase.status === "قيد التنفيذ" ||
                      phase.status === "In Progress"
                    ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/30 dark:to-blue-900/30 dark:border-blue-800"
                    : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 dark:from-gray-950/30 dark:to-gray-900/30 dark:border-gray-700"
                )}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "text-3xl font-bold",
                        phase.status === "مكتمل" || phase.status === "Completed"
                          ? "text-green-600"
                          : phase.status === "قيد التنفيذ" ||
                            phase.status === "In Progress"
                          ? "text-blue-600"
                          : "text-gray-500"
                      )}>
                      {phase.year}
                    </div>
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        phase.status === "مكتمل" || phase.status === "Completed"
                          ? "bg-green-200 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                          : phase.status === "قيد التنفيذ" ||
                            phase.status === "In Progress"
                          ? "bg-blue-200 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400"
                      )}>
                      {phase.status}
                    </div>
                  </div>
                  <h4
                    className={cn(
                      "text-lg font-bold text-foreground mb-2",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {phase.title}
                  </h4>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground leading-relaxed",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {phase.description}
                  </p>
                </CardContent>
                {(phase.status === "قيد التنفيذ" ||
                  phase.status === "In Progress") && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500"></div>
                )}
              </Card>
            ))}
          </div>
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
