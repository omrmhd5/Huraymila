import React, { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Target,
  Plus,
  Home,
  Globe,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
// Commented out useAuth for development
// import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import Standards from "@/lib/standards";
import RequiredStandards from "@/components/AgencyDashboard/RequiredStandards";
import Initiatives from "@/components/AgencyDashboard/Initiatives";
import Volunteers from "@/components/AgencyDashboard/Volunteers";

const AgencyDashboard = () => {
  // Commented out useAuth for development
  // const { user, loading } = useAuth();
  const { language, theme, setLanguage, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);

  // Note: Submission modal state is now handled in RequiredStandards component

  // Note: statusFilter and searchTerm are now handled in RequiredStandards component

  // Commented out loading check for development
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">
  //           {language === "ar" ? "جاري التحميل..." : "Loading..."}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // Mock data - matching AgencyManagement structure
  const agencyData = {
    name:
      language === "ar"
        ? "مكتب تنسيق برنامج المدينة الصحية"
        : "Healthy City Program Coordination Office",
    description: "الجهة المسؤولة عن الصحة العامة في المدينة",
    contactPerson: "د. أحمد محمد",
    email: "ahmed@moh.gov.sa",
    phone: "+966-11-123-4567",
    address: "شارع الملك فهد، حريملاء",
    agencyEmail: "health@huraymila.gov.sa",
    agencyPassword: "health123",
    initiatives: 12,
    volunteers: 45,
  };

  const initiatives = [
    {
      id: 1,
      title:
        language === "ar"
          ? "برنامج التوعية الصحية"
          : "Health Awareness Program",
      description:
        language === "ar"
          ? "توعية المجتمع بأهمية الصحة الوقائية"
          : "Raising community awareness about preventive health",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      volunteers: 8,
      maxVolunteers: 10,
    },
    {
      id: 2,
      title:
        language === "ar" ? "مشروع الفحص المبكر" : "Early Screening Project",
      description:
        language === "ar"
          ? "فحص مبكر للأمراض المزمنة"
          : "Early screening for chronic diseases",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      volunteers: 5,
      maxVolunteers: 8,
    },
    {
      id: 3,
      title:
        language === "ar"
          ? "مبادرة البيئة الصحية"
          : "Healthy Environment Initiative",
      description:
        language === "ar"
          ? "تحسين البيئة المحيطة بالمرافق الصحية"
          : "Improving the environment around health facilities",
      status: "gathering volunteers",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      volunteers: 3,
      maxVolunteers: 6,
    },
    {
      id: 4,
      title:
        language === "ar"
          ? "مشروع التغذية الصحية"
          : "Healthy Nutrition Project",
      description:
        language === "ar"
          ? "تعزيز العادات الغذائية الصحية"
          : "Promoting healthy eating habits",
      status: "cancelled",
      startDate: "2024-04-01",
      endDate: "2024-07-31",
      volunteers: 0,
      maxVolunteers: 5,
    },
  ];

  const volunteers = [
    {
      id: 1,
      name: "أحمد محمد الصالح",
      position: "متطوع صحي",
      department: "الصحة العامة",
      email: "ahmed@volunteer.com",
      phone: "+966-50-123-4567",
      initiatives: ["مبادرة التوعية الصحية", "مبادرة التوعية البيئية"],
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "فاطمة العتيبي",
      position: "متطوعة تعليمية",
      department: "التوعية الصحية",
      email: "fatima@volunteer.com",
      phone: "+966-50-234-5678",
      initiatives: ["مبادرة التوعية الصحية", "مبادرة التوعية البيئية"],
      joinDate: "2024-01-15",
    },
    {
      id: 3,
      name: "سعد القحطاني",
      position: "متطوع بيئي",
      department: "البيئة والصحة",
      email: "saad@volunteer.com",
      phone: "+966-50-345-6789",
      initiatives: ["مبادرة التوعية الصحية", "مبادرة التوعية البيئية"],
      joinDate: "2024-01-15",
    },
    {
      id: 4,
      name: "ريم العلي",
      position: "متطوعة إدارية",
      department: "الإدارة والتنسيق",
      email: "reem@volunteer.com",
      phone: "+966-50-456-7890",
      initiatives: ["مبادرة التوعية الصحية", "مبادرة التوعية البيئية"],
      joinDate: "2024-01-15",
    },
  ];

  // Get standards data and filter by agency name
  const agencyName = agencyData.name;

  // Get standards data dynamically
  const [standards, agencyToStandardsMap] = Standards();

  // Get assigned standards based on agency name
  const getAssignedStandards = (agencyName) => {
    // Find the agency key that matches the agency name
    const agencyKey = Object.keys(agencyToStandardsMap).find(
      (key) => key.includes(agencyName) || agencyName.includes(key)
    );

    if (!agencyKey) return [];

    // Get the array of standard IDs for this agency
    const standardIds = agencyToStandardsMap[agencyKey];

    // Find the actual standard objects from records using the IDs
    return standardIds
      .map((id) => standards.records.find((standard) => standard.id === id))
      .filter(Boolean); // Remove any undefined values
  };

  const assignedStandards = getAssignedStandards(agencyName).map(
    (standard, index) => ({
      id: standard.id,
      standard: standard.standard,
      requirement: standard.requirements?.[0] || "متطلب غير محدد",
      status: standard.status || "didnt_submit", // Default to "didnt_submit" instead of "pending"
      submissionType: getSubmissionTypeFromRequirements(standard.requirements),
      description: standard.standard,
      requirements: standard.requirements || [],
    })
  );

  // Helper function to determine submission type based on requirements
  function getSubmissionTypeFromRequirements(requirements) {
    if (!requirements || requirements.length === 0) return "text";

    const reqText = requirements.join(" ").toLowerCase();
    if (
      reqText.includes("صورة") ||
      reqText.includes("صور") ||
      reqText.includes("photo")
    )
      return "photo";
    if (reqText.includes("فيديو") || reqText.includes("video")) return "video";
    if (
      reqText.includes("ملف") ||
      reqText.includes("pdf") ||
      reqText.includes("وثيقة")
    )
      return "pdf";
    return "text";
  }

  const handleLanguageChange = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleSignOut = async () => {
    // Commented out signOut for development
    // await signOut();
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen bg-background flex flex-col ${
        language === "ar" ? "rtl" : "ltr"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Navbar */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className={`flex items-center gap-3 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className={language === "ar" ? "text-right" : "text-left"}>
                <h1
                  className={`text-xl font-bold text-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "لوحة التحكم للجهة" : "Agency Dashboard"}
                </h1>
                <p
                  className={`text-sm text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "إدارة جميع البيانات الخاصة بالجهة"
                    : "Manage all data related to the agency"}
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

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Agency Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {agencyData.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  {agencyData.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span
                      className={`font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "الشخص المسؤول:" : "Contact Person:"}
                    </span>{" "}
                    {agencyData.contactPerson}
                  </div>
                  <div>
                    <span
                      className={`font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "البريد الإلكتروني:" : "Email:"}
                    </span>{" "}
                    {agencyData.email}
                  </div>
                  <div>
                    <span
                      className={`font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "الهاتف:" : "Phone:"}
                    </span>{" "}
                    {agencyData.phone}
                  </div>
                  <div>
                    <span
                      className={`font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "العنوان:" : "Address:"}
                    </span>{" "}
                    {agencyData.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              label:
                language === "ar" ? "إجمالي المبادرات" : "Total Initiatives",
              value: agencyData.initiatives,
              color: "text-blue-500",
              Icon: Target,
            },
            {
              label: language === "ar" ? "المتطوعين" : "Volunteers",
              value: agencyData.volunteers,
              color: "text-green-500",
              valueClass: "text-green-600",
              Icon: Users,
            },
          ].map(({ label, value, color, Icon, valueClass }) => (
            <Card key={label}>
              <CardContent className="p-6">
                <div
                  className={`flex items-center ${
                    language === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}>
                  <div
                    className={`flex-1 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}>
                    <p
                      className={`text-sm font-medium text-muted-foreground ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {label}
                    </p>
                    <p
                      className={`text-2xl font-bold ${valueClass ?? ""} ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {value}
                    </p>
                  </div>
                  <div className={`${language === "ar" ? "ml-4" : "ml-4"}`}>
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <TabsList
            className={`grid w-full grid-cols-3 ${
              language === "ar" ? "flex-row-reverse" : ""
            }`}>
            <TabsTrigger
              value="overview"
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {language === "ar" ? "المعايير المطلوبة" : "Required Standards"}
            </TabsTrigger>
            <TabsTrigger
              value="initiatives"
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {language === "ar" ? "المبادرات" : "Initiatives"}
            </TabsTrigger>
            <TabsTrigger
              value="volunteers"
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {language === "ar" ? "المتطوعين" : "Volunteers"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <RequiredStandards
              language={language}
              assignedStandards={assignedStandards}
            />
          </TabsContent>

          {/* Initiatives Tab */}
          <TabsContent value="initiatives">
            <Initiatives language={language} initiatives={initiatives} />
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Volunteers language={language} volunteers={volunteers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgencyDashboard;
