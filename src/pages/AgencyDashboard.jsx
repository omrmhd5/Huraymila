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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const AgencyDashboard = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Mock data
  const agencyData = {
    name:
      language === "ar"
        ? "وزارة الصحة - حريملاء"
        : "Ministry of Health - Harimlaa",
    type: language === "ar" ? "صحة" : "Health",
    status: language === "ar" ? "نشط" : "Active",
    employees: 45,
    initiatives: 12,
    completedInitiatives: 8,
    activeInitiatives: 4,
    totalBudget: 2500000,
    spentBudget: 1800000,
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

  const employees = [
    {
      id: 1,
      name: "أحمد محمد الصالح",
      position: "مدير عام",
      department: "الإدارة العامة",
      email: "ahmed@moh.gov.sa",
      phone: "+966-50-123-4567",
      status: "نشط",
      joinDate: "2020-01-15",
    },
    {
      id: 2,
      name: "فاطمة العتيبي",
      position: "مدير الصحة العامة",
      department: "الصحة العامة",
      email: "fatima@moh.gov.sa",
      phone: "+966-50-234-5678",
      status: "نشط",
      joinDate: "2021-03-20",
    },
    {
      id: 3,
      name: "سعد القحطاني",
      position: "مشرف صحي",
      department: "الرعاية الصحية",
      email: "saad@moh.gov.sa",
      phone: "+966-50-345-6789",
      status: "نشط",
      joinDate: "2022-07-10",
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

  const getEmployeeStatusBadge = (status) => {
    switch (status) {
      case "نشط":
        return (
          <Badge variant="default" className="bg-green-500">
            نشط
          </Badge>
        );
      case "إجازة":
        return <Badge variant="secondary">إجازة</Badge>;
      case "متقاعد":
        return <Badge variant="outline">متقاعد</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                <p className="text-lg text-muted-foreground">
                  نوع الوكالة: {agencyData.type} | الحالة: {agencyData.status}
                </p>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    إجمالي المبادرات
                  </p>
                  <p className="text-2xl font-bold">{agencyData.initiatives}</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    المبادرات المكتملة
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {agencyData.completedInitiatives}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    الموظفين
                  </p>
                  <p className="text-2xl font-bold">{agencyData.employees}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    الميزانية المستهلكة
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      (agencyData.spentBudget / agencyData.totalBudget) * 100
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="initiatives">المبادرات</TabsTrigger>
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>نظرة عامة على الميزانية</CardTitle>
                  <CardDescription>توزيع الميزانية والمصروفات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>الميزانية الإجمالية</span>
                      <span className="font-semibold">
                        {formatCurrency(agencyData.totalBudget)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المصروفات</span>
                      <span className="font-semibold text-orange-600">
                        {formatCurrency(agencyData.spentBudget)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المتبقي</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(
                          agencyData.totalBudget - agencyData.spentBudget
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (agencyData.spentBudget / agencyData.totalBudget) *
                            100
                          }%`,
                        }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>أحدث النشاطات</CardTitle>
                  <CardDescription>آخر التحديثات والمبادرات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {initiatives.slice(0, 3).map((initiative) => (
                      <div
                        key={initiative.id}
                        className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {initiative.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {initiative.progress}% مكتمل
                          </p>
                        </div>
                        {getStatusBadge(initiative.status)}
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

          {/* Employees Tab */}
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>الموظفين</CardTitle>
                <CardDescription>إدارة فريق العمل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {employee.name}
                            </h3>
                            {getEmployeeStatusBadge(employee.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">المنصب:</span>
                              <p>{employee.position}</p>
                            </div>
                            <div>
                              <span className="font-medium">القسم:</span>
                              <p>{employee.department}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                البريد الإلكتروني:
                              </span>
                              <p>{employee.email}</p>
                            </div>
                            <div>
                              <span className="font-medium">الهاتف:</span>
                              <p>{employee.phone}</p>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-muted-foreground">
                            <span className="font-medium">تاريخ الانضمام:</span>{" "}
                            {formatDate(employee.joinDate)}
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
        </Tabs>
      </main>
    </div>
  );
};

export default AgencyDashboard;
