import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Target,
  Plus,
  Eye,
  Edit,
  Trash2,
  Home,
  Globe,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
// Commented out useAuth for development
// import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Standards from "@/lib/standards";

const AgencyDashboard = () => {
  // Commented out useAuth for development
  // const { user, loading } = useAuth();
  const { language, theme, setLanguage, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);

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
    type: "Health",
    agencyEmail: "health@harimlaa.gov.sa",
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
      status: language === "ar" ? "مكتمل" : "Completed",
      progress: 100,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      budget: 150000,
      spent: 150000,
      team: ["أحمد محمد", "فاطمة العتيبي", "سعد القحطاني"],
    },
    {
      id: 2,
      title:
        language === "ar" ? "مشروع الفحص المبكر" : "Early Screening Project",
      description:
        language === "ar"
          ? "فحص مبكر للأمراض المزمنة"
          : "Early screening for chronic diseases",
      status: language === "ar" ? "نشط" : "Active",
      progress: 75,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      budget: 300000,
      spent: 225000,
      team: ["خالد الشمري", "نورا السعد", "عبدالله الحربي"],
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
      status: language === "ar" ? "نشط" : "Active",
      progress: 45,
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      budget: 200000,
      spent: 90000,
      team: ["ريم العلي", "محمد الدوسري", "هند العمري"],
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
      status: "نشط",
      joinDate: "2024-01-15",
      hours: 120,
      initiatives: 3,
    },
    {
      id: 2,
      name: "فاطمة العتيبي",
      position: "متطوعة تعليمية",
      department: "التوعية الصحية",
      email: "fatima@volunteer.com",
      phone: "+966-50-234-5678",
      status: "نشط",
      joinDate: "2024-02-20",
      hours: 95,
      initiatives: 2,
    },
    {
      id: 3,
      name: "سعد القحطاني",
      position: "متطوع بيئي",
      department: "البيئة والصحة",
      email: "saad@volunteer.com",
      phone: "+966-50-345-6789",
      status: "نشط",
      joinDate: "2024-03-10",
      hours: 75,
      initiatives: 1,
    },
    {
      id: 4,
      name: "ريم العلي",
      position: "متطوعة إدارية",
      department: "الإدارة والتنسيق",
      email: "reem@volunteer.com",
      phone: "+966-50-456-7890",
      status: "إجازة",
      joinDate: "2024-01-05",
      hours: 60,
      initiatives: 2,
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
      status: standard.status || "pending",
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "مكتمل":
        return (
          <Badge variant="default" className="bg-green-500">
            مكتمل
          </Badge>
        );
      case "نشط":
        return (
          <Badge variant="default" className="bg-blue-500">
            نشط
          </Badge>
        );
      case "متوقف":
        return <Badge variant="secondary">متوقف</Badge>;
      case "معلق":
        return <Badge variant="outline">معلق</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVolunteerStatusBadge = (status) => {
    switch (status) {
      case "نشط":
        return (
          <Badge variant="default" className="bg-green-500">
            نشط
          </Badge>
        );
      case "إجازة":
        return <Badge variant="secondary">إجازة</Badge>;
      case "متوقف":
        return <Badge variant="outline">متوقف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStandardStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="default"
            className={`bg-green-500 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "موافق عليه" : "Approved"}
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="destructive"
            className={language === "ar" ? "font-arabic" : "font-sans"}>
            {language === "ar" ? "مرفوض" : "Rejected"}
          </Badge>
        );
      case "pending":
      case "pending_approval":
        return (
          <Badge
            variant="secondary"
            className={`bg-yellow-100 text-yellow-800 border-yellow-200 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "في انتظار الموافقة" : "Pending Approval"}
          </Badge>
        );
      case "not_started":
      case "didnt_submit":
        return (
          <Badge
            variant="outline"
            className={`bg-gray-100 text-gray-700 border-gray-300 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "لم يقدم" : "Didn't Submit"}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className={language === "ar" ? "font-arabic" : "font-sans"}>
            {status}
          </Badge>
        );
    }
  };

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case "text":
        return "📝";
      case "pdf":
        return "📄";
      case "photo":
        return "📷";
      case "video":
        return "🎥";
      default:
        return "📋";
    }
  };

  const getSubmissionTypeText = (type) => {
    switch (type) {
      case "text":
        return language === "ar" ? "نص" : "Text";
      case "pdf":
        return language === "ar" ? "ملف PDF" : "PDF File";
      case "photo":
        return language === "ar" ? "صورة" : "Photo";
      case "video":
        return language === "ar" ? "فيديو" : "Video";
      default:
        return language === "ar" ? "غير محدد" : "Undefined";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };

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
                  {language === "ar"
                    ? "لوحة التحكم للوكالة"
                    : "Agency Dashboard"}
                </h1>
                <p
                  className={`text-sm text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "إدارة جميع البيانات الخاصة بالوكالة"
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
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {language === "ar" ? "إضافة مبادرة جديدة" : "Add New Initiative"}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            {
              label: language === "ar" ? "نوع الوكالة" : "Agency Type",
              value:
                language === "ar"
                  ? agencyData.type === "health"
                    ? "صحة"
                    : agencyData.type === "municipality"
                    ? "بلدية"
                    : agencyData.type === "education"
                    ? "تعليم"
                    : agencyData.type
                  : agencyData.type,
              color: "text-purple-500",
              Icon: Building2,
            },
          ].map(({ label, value, color, Icon, valueClass }) => (
            <Card key={label}>
              <CardContent className="p-6">
                <div
                  className={`flex items-center justify-between ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}>
                  <div
                    className={language === "ar" ? "text-right" : "text-left"}>
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
                  <Icon className={`w-8 h-8 ${color}`} />
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
            className={`grid w-full grid-cols-4 ${
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
            <TabsTrigger
              value="agency-info"
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {language === "ar" ? "معلومات الوكالة" : "Agency Info"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Standards Summary */}
              <Card>
                <CardHeader>
                  <CardTitle
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "ملخص المعايير المطلوبة"
                      : "Required Standards Summary"}
                  </CardTitle>
                  <CardDescription
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "المعايير المخصصة للوكالة وحالة التنفيذ"
                      : "Standards assigned to the agency and implementation status"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div
                        className={`text-2xl font-bold text-green-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {
                          assignedStandards.filter(
                            (s) => s.status === "approved"
                          ).length
                        }
                      </div>
                      <div
                        className={`text-sm text-green-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "موافق عليه" : "Approved"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div
                        className={`text-2xl font-bold text-red-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {
                          assignedStandards.filter(
                            (s) => s.status === "rejected"
                          ).length
                        }
                      </div>
                      <div
                        className={`text-sm text-red-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "مرفوض" : "Rejected"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div
                        className={`text-2xl font-bold text-yellow-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {
                          assignedStandards.filter(
                            (s) => s.status === "pending"
                          ).length
                        }
                      </div>
                      <div
                        className={`text-sm text-yellow-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "في الانتظار" : "Pending"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div
                        className={`text-2xl font-bold text-gray-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {
                          assignedStandards.filter(
                            (s) => s.status === "not_started"
                          ).length
                        }
                      </div>
                      <div
                        className={`text-sm text-gray-600 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "لم يبدأ" : "Not Started"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Standards List */}
              <Card>
                <CardHeader>
                  <CardTitle
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "المعايير المخصصة للوكالة"
                      : "Assigned Standards"}
                  </CardTitle>
                  <CardDescription
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "قائمة المعايير التي يجب على الوكالة تنفيذها"
                      : "List of standards that the agency must implement"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedStandards.map((standard) => (
                      <div key={standard.id} className="border rounded-lg p-4">
                        <div
                          className={`flex items-start justify-between mb-3 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <div
                            className={`flex items-center gap-3 ${
                              language === "ar" ? "flex-row-reverse" : ""
                            }`}>
                            <span> </span>
                            <div
                              className={
                                language === "ar" ? "text-right" : "text-left"
                              }>
                              <h3
                                className={`text-lg font-semibold ${
                                  language === "ar"
                                    ? "font-arabic"
                                    : "font-sans"
                                }`}>
                                {language === "ar" ? (
                                  <>
                                    {standard.standard} {standard.id}
                                  </>
                                ) : (
                                  <>
                                    {standard.id}. {standard.standard}
                                  </>
                                )}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3 ${
                            language === "ar" ? "rtl" : "ltr"
                          }`}>
                          {language === "ar" ? (
                            <>
                              <div
                                className={`flex items-center gap-2 ${
                                  language === "ar" ? "flex-row-reverse" : ""
                                }`}>
                                <span
                                  className={`font-medium ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {language === "ar" ? "الحالة:" : "Status:"}
                                </span>
                                {getStandardStatusBadge(standard.status)}
                              </div>
                              <div
                                className={`flex items-center gap-2 ${
                                  language === "ar" ? "flex-row-reverse" : ""
                                }`}>
                                <span
                                  className={`font-medium ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {language === "ar"
                                    ? "نوع التقديم:"
                                    : "Submission Type:"}
                                </span>
                                <span
                                  className={`text-muted-foreground ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {getSubmissionTypeText(
                                    standard.submissionType
                                  )}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className={`flex items-center gap-2 ${
                                  language === "ar" ? "flex-row-reverse" : ""
                                }`}>
                                <span
                                  className={`font-medium ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {language === "ar"
                                    ? "نوع التقديم:"
                                    : "Submission Type:"}
                                </span>
                                <span
                                  className={`text-muted-foreground ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {getSubmissionTypeText(
                                    standard.submissionType
                                  )}
                                </span>
                              </div>
                              <div
                                className={`flex items-center gap-2 ${
                                  language === "ar" ? "flex-row-reverse" : ""
                                }`}>
                                <span
                                  className={`font-medium ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {language === "ar" ? "الحالة:" : "Status:"}
                                </span>
                                {getStandardStatusBadge(standard.status)}
                              </div>
                            </>
                          )}
                        </div>

                        <div
                          className={`mb-3 ${
                            language === "ar" ? "rtl" : "ltr"
                          }`}>
                          <span
                            className={`font-medium text-sm ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {language === "ar" ? "المتطلبات:" : "Requirements:"}
                          </span>
                          <ul
                            className={`text-sm text-muted-foreground mt-1 ${
                              language === "ar"
                                ? "text-right font-arabic list-disc list-inside"
                                : "text-left font-sans list-disc list-inside"
                            }`}
                            dir={language === "ar" ? "rtl" : "ltr"}>
                            {standard.requirements.map((req, index) => (
                              <li
                                key={index}
                                className={
                                  language === "ar" ? "text-right" : "text-left"
                                }>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div
                          className={`flex items-center gap-2 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              language === "ar" ? "font-arabic" : "font-sans"
                            }>
                            <Edit className="w-4 h-4" />
                            {language === "ar" ? "تعديل" : "Edit"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              language === "ar" ? "font-arabic" : "font-sans"
                            }>
                            <Plus className="w-4 h-4" />
                            {language === "ar"
                              ? "إضافة تقديم"
                              : "Add Submission"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              language === "ar" ? "font-arabic" : "font-sans"
                            }>
                            <Eye className="w-4 h-4" />
                            {language === "ar"
                              ? "عرض التقديمات"
                              : "View Submissions"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Initiatives Tab */}
          <TabsContent value="initiatives">
            <Card>
              <CardHeader>
                <CardTitle>المبادرات</CardTitle>
                <CardDescription>إدارة جميع المبادرات النشطة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {initiatives.map((initiative) => (
                    <div key={initiative.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {initiative.title}
                            </h3>
                            {getStatusBadge(initiative.status)}
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {initiative.description}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="font-medium">
                                تاريخ البداية:
                              </span>
                              <p>{formatDate(initiative.startDate)}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                تاريخ الانتهاء:
                              </span>
                              <p>{formatDate(initiative.endDate)}</p>
                            </div>
                            <div>
                              <span className="font-medium">الميزانية:</span>
                              <p>{formatCurrency(initiative.budget)}</p>
                            </div>
                            <div>
                              <span className="font-medium">المصروفات:</span>
                              <p>{formatCurrency(initiative.spent)}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>التقدم</span>
                              <span className="font-medium">
                                {initiative.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${initiative.progress}%`,
                                }}></div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <span className="text-sm font-medium">
                              فريق العمل:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {initiative.team.map((member, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle>المتطوعين</CardTitle>
                <CardDescription>إدارة المتطوعين والمتطوعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.map((volunteer) => (
                    <div key={volunteer.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {volunteer.name}
                            </h3>
                            {getVolunteerStatusBadge(volunteer.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">المنصب:</span>
                              <p>{volunteer.position}</p>
                            </div>
                            <div>
                              <span className="font-medium">القسم:</span>
                              <p>{volunteer.department}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                البريد الإلكتروني:
                              </span>
                              <p>{volunteer.email}</p>
                            </div>
                            <div>
                              <span className="font-medium">الهاتف:</span>
                              <p>{volunteer.phone}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                            <div>
                              <span className="font-medium">
                                تاريخ الانضمام:
                              </span>
                              <p>{formatDate(volunteer.joinDate)}</p>
                            </div>
                            <div>
                              <span className="font-medium">ساعات التطوع:</span>
                              <p>{volunteer.hours} ساعة</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                المبادرات المشاركة:
                              </span>
                              <p>{volunteer.initiatives} مبادرة</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agency Info Tab */}
          <TabsContent value="agency-info">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الوكالة</CardTitle>
                <CardDescription>تفاصيل الوكالة وبيانات الدخول</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Agency Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      معلومات الوكالة
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">اسم الوكالة:</span>
                        <p className="text-muted-foreground">
                          {agencyData.name}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">الوصف:</span>
                        <p className="text-muted-foreground">
                          {agencyData.description}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">نوع الوكالة:</span>
                        <p className="text-muted-foreground">
                          {agencyData.type}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">الحالة:</span>
                        <p className="text-muted-foreground">
                          {agencyData.status}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">عدد المبادرات:</span>
                        <p className="text-muted-foreground">
                          {agencyData.initiatives}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">عدد المتطوعين:</span>
                        <p className="text-muted-foreground">
                          {agencyData.volunteers}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      معلومات الاتصال
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">الشخص المسؤول:</span>
                        <p className="text-muted-foreground">
                          {agencyData.contactPerson}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">البريد الإلكتروني:</span>
                        <p className="text-muted-foreground">
                          {agencyData.email}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">الهاتف:</span>
                        <p className="text-muted-foreground">
                          {agencyData.phone}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">العنوان:</span>
                        <p className="text-muted-foreground">
                          {agencyData.address}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">بريد الوكالة:</span>
                        <p className="text-muted-foreground">
                          {agencyData.agencyEmail}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">كلمة مرور الوكالة:</span>
                        <p className="text-muted-foreground">••••••••</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgencyDashboard;
