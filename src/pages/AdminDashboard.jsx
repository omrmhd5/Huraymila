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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  Users,
  Target,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Calendar,
  Bell,
  Database,
  Shield,
  Activity,
  MessageCircle,
  Heart,
  Newspaper,
  UserCheck,
  HandHeart,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const { language } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    profiles: 0,
    initiatives: 0,
    news: 0,
    feedback: 0,
    partners: 0,
    applications: 0,
    notifications: 0,
    health_metrics: 0,
  });
  const [data, setData] = useState({
    profiles: [],
    initiatives: [],
    news: [],
    feedback: [],
    partners: [],
    applications: [],
    notifications: [],
    health_metrics: [],
  });

  useEffect(() => {
    checkUserRole();
  }, [user]);

  useEffect(() => {
    if (userRole === "admin") {
      fetchAllData();
    }
  }, [userRole]);

  const checkUserRole = () => {
    if (user) {
      navigate("/auth");
      return;
    }

    try {
      // Mock implementation - simulate admin role check
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user has admin role (for demo purposes, always grant access)
      // In production, this should check user.role === "admin"
      setUserRole("admin");
    } catch (error) {
      console.error("Error checking user role:", error);
      navigate("/");
    }
  };

  const fetchAllData = () => {
    try {
      setLoading(true);

      // Mock implementation - simulate data fetching
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for demonstration
      const mockStats = {
        profiles: 25,
        initiatives: 12,
        news: 8,
        feedback: 45,
        partners: 15,
        applications: 32,
        notifications: 18,
        health_metrics: 28,
      };

      const mockData = {
        profiles: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          user_type: ["volunteer", "organization", "agency"][i % 3],
          phone: `+96650${String(i + 1).padStart(7, "0")}`,
          full_name: `مستخدم ${i + 1}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        initiatives: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          status: ["active", "completed", "draft"][i % 3],
          category: ["صحة", "بيئة", "تعليم"][i % 3],
          title: `مبادرة ${i + 1}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        news: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          is_published: i % 2 === 0,
          category: ["صحة", "بيئة", "تعليم"][i % 3],
          title: `خبر ${i + 1}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        feedback: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          is_public: i % 2 === 0,
          rating: [3, 4, 5][i % 3],
          feedback_type: ["مبادرة", "خدمة", "موقع"][i % 3],
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        partners: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          is_active: i % 2 === 0,
          partnership_type: ["صحة", "بيئة", "تعليم"][i % 3],
          name: `شريك ${i + 1}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        applications: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          status: ["pending", "approved", "rejected"][i % 3],
          availability: ["صباحاً", "مساءً", "أي وقت"][i % 3],
          reviewed_at:
            i % 2 === 0
              ? new Date(Date.now() - i * 86400000).toISOString()
              : null,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        notifications: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          read_status: i % 2 === 0,
          type: ["عام", "مبادرة", "تطبيق"][i % 3],
          title: `إشعار ${i + 1}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
        })),
        health_metrics: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          source: ["وزارة الصحة", "البلدية", "المستشفى"][i % 3],
          region: ["المركز", "الشرق", "الغرب"][i % 3],
          value: Math.floor(Math.random() * 100) + 1,
          unit: ["%", "عدد", "كجم"][i % 3],
          metric_name: `مؤشر ${i + 1}`,
        })),
      };

      setStats(mockStats);
      setData(mockData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statCards = [
    {
      title: "الملفات الشخصية",
      value: stats.profiles,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "المبادرات",
      value: stats.initiatives,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "الأخبار",
      value: stats.news,
      icon: Newspaper,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "التقييمات",
      value: stats.feedback,
      icon: MessageCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "الشركاء",
      value: stats.partners,
      icon: HandHeart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "طلبات التطوع",
      value: stats.applications,
      icon: UserCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "الإشعارات",
      value: stats.notifications,
      icon: Bell,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "المؤشرات الصحية",
      value: stats.health_metrics,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  // Show loading state while checking role
  if (loading || userRole === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-arabic">
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if not admin
  if (userRole !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-destructive font-arabic">
              غير مصرح لك بالوصول
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-arabic">
                هذه الصفحة مخصصة للمسؤولين فقط
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate("/")} className="font-arabic">
              العودة للصفحة الرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "لوحة التحكم" : "Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {language === "ar"
            ? "نظرة عامة على النظام والإحصائيات"
            : "System overview and statistics"}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-all duration-300 border-0 bg-card/95 backdrop-blur-sm group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-arabic mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    stat.bgColor
                  )}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-green-600" />
              {language === "ar" ? "إدارة المعايير" : "Standards Management"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === "ar"
                ? "مراقبة وإدارة المعايير الصحية الـ 80 مع متطلباتها والوكالات المسؤولة"
                : "Monitor and manage the 80 health standards with their requirements and responsible agencies"}
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/admin/standards")}>
              {language === "ar" ? "إدارة المعايير" : "Manage Standards"}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              {language === "ar" ? "إدارة الوكالات" : "Agency Management"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === "ar"
                ? "إدارة الشركاء والوكالات الحكومية والمنظمات المشاركة في المبادرة"
                : "Manage partner government agencies and organizations participating in the initiative"}
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/admin/agency-management")}>
              {language === "ar" ? "إدارة الوكالات" : "Manage Agencies"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <Tabs defaultValue="profiles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="profiles" className="font-arabic">
            الملفات
          </TabsTrigger>
          <TabsTrigger value="initiatives" className="font-arabic">
            المبادرات
          </TabsTrigger>
          <TabsTrigger value="news" className="font-arabic">
            الأخبار
          </TabsTrigger>
          <TabsTrigger value="feedback" className="font-arabic">
            التقييمات
          </TabsTrigger>
          <TabsTrigger value="partners" className="font-arabic">
            الشركاء
          </TabsTrigger>
          <TabsTrigger value="applications" className="font-arabic">
            التطوع
          </TabsTrigger>
          <TabsTrigger value="notifications" className="font-arabic">
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="health" className="font-arabic">
            الصحة
          </TabsTrigger>
        </TabsList>

        {/* Profiles Tab */}
        <TabsContent value="profiles">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                الملفات الشخصية
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                قائمة جميع المستخدمين المسجلين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      النوع
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الهاتف
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الاسم الكامل
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإنشاء
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.profiles.slice(0, 10).map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="font-arabic">
                          {profile.user_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {profile.phone || "غير محدد"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {profile.full_name}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(profile.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                المبادرات
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع المبادرات المنشورة في الموقع
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      الحالة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الفئة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      العنوان
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإنشاء
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.initiatives.slice(0, 10).map((initiative) => (
                    <TableRow key={initiative.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            initiative.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="font-arabic">
                          {initiative.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {initiative.category}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {initiative.title}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(initiative.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">الأخبار</CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع المقالات الإخبارية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      النشر
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الفئة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      العنوان
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإنشاء
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.news.slice(0, 10).map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            article.is_published ? "default" : "secondary"
                          }
                          className="font-arabic">
                          {article.is_published ? "منشور" : "مسودة"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {article.category}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {article.title}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(article.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                التقييمات والملاحظات
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع التقييمات المرسلة من المستخدمين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      عام
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      التقييم
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      النوع
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإرسال
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.feedback.slice(0, 10).map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={feedback.is_public ? "default" : "secondary"}
                          className="font-arabic">
                          {feedback.is_public ? "عام" : "خاص"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {feedback.rating
                          ? `${feedback.rating}/5`
                          : "بدون تقييم"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {feedback.feedback_type}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(feedback.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">الشركاء</CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع الشركاء والجهات المتعاونة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      الحالة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      نوع الشراكة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الاسم
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإضافة
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.partners.slice(0, 10).map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={partner.is_active ? "default" : "secondary"}
                          className="font-arabic">
                          {partner.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {partner.partnership_type || "غير محدد"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {partner.name}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(partner.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                طلبات التطوع
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع طلبات التطوع المقدمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      الحالة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      التوفر
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ المراجعة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ التقديم
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.applications.slice(0, 10).map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                          className="font-arabic">
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {application.availability || "غير محدد"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {application.reviewed_at
                          ? formatDate(application.reviewed_at)
                          : "لم تتم المراجعة"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(application.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                الإشعارات
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع الإشعارات المرسلة للمستخدمين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      مقروء
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      النوع
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      العنوان
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      تاريخ الإرسال
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.notifications.slice(0, 10).map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            notification.read_status ? "default" : "secondary"
                          }
                          className="font-arabic">
                          {notification.read_status ? "مقروء" : "غير مقروء"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {notification.type}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {notification.title}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(notification.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Metrics Tab */}
        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                المؤشرات الصحية
              </CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع مؤشرات المدينة الصحية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      المصدر
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      المنطقة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      القيمة
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      اسم المؤشر
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.health_metrics.slice(0, 10).map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="text-right font-arabic">
                        {metric.source || "غير محدد"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {metric.region || "غير محدد"}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {metric.value} {metric.unit}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {metric.metric_name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
