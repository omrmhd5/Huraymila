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
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
  Home,
  Globe,
  Moon,
  Sun,
  LogOut,
  Database,
} from "lucide-react";
// Commented out useAuth for development
// import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
        ? "وزارة الصحة - حريملاء"
        : "Ministry of Health - Harimlaa",
    description: "الجهة المسؤولة عن الصحة العامة في المدينة",
    contactPerson: "د. أحمد محمد",
    email: "ahmed@moh.gov.sa",
    phone: "+966-11-123-4567",
    address: "شارع الملك فهد، حريملاء",
    type: language === "ar" ? "صحة" : "Health",
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

  // Standards assigned to this agency (Ministry of Health)
  const assignedStandards = [
    {
      id: 1,
      standard: "معيار الصحة العامة 1",
      requirement: "توفير مرافق صحية أساسية في جميع الأحياء",
      status: "pending",
      submissionType: "text",
      dueDate: "2024-12-31",
      description:
        "يجب على كل حي أن يحتوي على عيادة صحية أو مركز صحي يقدم الخدمات الأساسية",
    },
    {
      id: 2,
      standard: "معيار التوعية الصحية 2",
      requirement: "تنفيذ برامج توعية صحية شهرية",
      status: "completed",
      submissionType: "pdf",
      dueDate: "2024-11-30",
      description: "إعداد وتنفيذ برامج توعية صحية تغطي مواضيع مختلفة كل شهر",
    },
    {
      id: 3,
      standard: "معيار البيئة الصحية 3",
      requirement: "فحص جودة الهواء والماء سنوياً",
      status: "in_progress",
      submissionType: "photo",
      dueDate: "2024-12-15",
      description: "إجراء فحوصات دورية لجودة الهواء والماء في المدينة",
    },
    {
      id: 4,
      standard: "معيار الرعاية الوقائية 4",
      requirement: "توفير خدمات الفحص المبكر للأمراض",
      status: "not_started",
      submissionType: "video",
      dueDate: "2025-01-31",
      description: "إطلاق حملات فحص مبكر للأمراض المزمنة والشائعة",
    },
    {
      id: 5,
      standard: "معيار الطوارئ الصحية 5",
      requirement: "تجهيز غرف طوارئ في المستشفيات",
      status: "completed",
      submissionType: "photo",
      dueDate: "2024-10-31",
      description:
        "تجهيز وتأهيل غرف الطوارئ في جميع المستشفيات والمراكز الصحية",
    },
  ];

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
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            مكتمل
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="default" className="bg-blue-500">
            قيد التنفيذ
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>;
      case "not_started":
        return <Badge variant="outline">لم يبدأ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-arabic">
                  {language === "ar"
                    ? "لوحة التحكم للوكالة"
                    : "Agency Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground font-arabic">
                  {language === "ar"
                    ? "إدارة جميع بيانات الخاصة بالوكالة"
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
                    <span className="font-medium">الشخص المسؤول:</span>{" "}
                    {agencyData.contactPerson}
                  </div>
                  <div>
                    <span className="font-medium">البريد الإلكتروني:</span>{" "}
                    {agencyData.email}
                  </div>
                  <div>
                    <span className="font-medium">الهاتف:</span>{" "}
                    {agencyData.phone}
                  </div>
                  <div>
                    <span className="font-medium">العنوان:</span>{" "}
                    {agencyData.address}
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة مبادرة جديدة
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "إجمالي المبادرات",
              value: agencyData.initiatives,
              color: "text-blue-500",
              Icon: Target,
            },
            {
              label: "المتطوعين",
              value: agencyData.volunteers,
              color: "text-green-500",
              valueClass: "text-green-600",
              Icon: Users,
            },
            {
              label: "نوع الوكالة",
              value: agencyData.type,
              color: "text-purple-500",
              Icon: Building2,
            },
          ].map(({ label, value, color, Icon, valueClass }) => (
            <Card key={label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {label}
                    </p>
                    <p className={`text-2xl font-bold ${valueClass ?? ""}`}>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">المعايير المطلوبة</TabsTrigger>
            <TabsTrigger value="initiatives">المبادرات</TabsTrigger>
            <TabsTrigger value="volunteers">المتطوعين</TabsTrigger>
            <TabsTrigger value="agency-info">معلومات الوكالة</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Standards Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>ملخص المعايير المطلوبة</CardTitle>
                  <CardDescription>
                    المعايير المخصصة للوكالة وحالة التنفيذ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          assignedStandards.filter(
                            (s) => s.status === "completed"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-green-600">مكتمل</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          assignedStandards.filter(
                            (s) => s.status === "in_progress"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-blue-600">قيد التنفيذ</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {
                          assignedStandards.filter(
                            (s) => s.status === "pending"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-yellow-600">في الانتظار</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {
                          assignedStandards.filter(
                            (s) => s.status === "not_started"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-600">لم يبدأ</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Standards List */}
              <Card>
                <CardHeader>
                  <CardTitle>المعايير المخصصة للوكالة</CardTitle>
                  <CardDescription>
                    قائمة المعايير التي يجب على الوكالة تنفيذها
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedStandards.map((standard) => (
                      <div key={standard.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {getSubmissionTypeIcon(standard.submissionType)}
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {standard.standard}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {standard.requirement}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStandardStatusBadge(standard.status)}
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium">نوع التقديم:</span>
                            <p className="text-muted-foreground">
                              {standard.submissionType === "text" && "نص"}
                              {standard.submissionType === "pdf" && "ملف PDF"}
                              {standard.submissionType === "photo" && "صورة"}
                              {standard.submissionType === "video" && "فيديو"}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">
                              تاريخ الاستحقاق:
                            </span>
                            <p className="text-muted-foreground">
                              {formatDate(standard.dueDate)}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">الحالة:</span>
                            <p className="text-muted-foreground">
                              {standard.status === "completed" && "مكتمل"}
                              {standard.status === "in_progress" &&
                                "قيد التنفيذ"}
                              {standard.status === "pending" && "في الانتظار"}
                              {standard.status === "not_started" && "لم يبدأ"}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {standard.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4" />
                            إضافة تقديم
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                            عرض التقديمات
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
