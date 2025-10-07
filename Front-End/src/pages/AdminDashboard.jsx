import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  Target,
  FileText,
  Database,
  Heart,
  Newspaper,
  UserCheck,
  HandHeart,
  AlertTriangle,
  Wind,
  Droplets,
  Shield,
  Activity,
  Car,
  Recycle,
  Award,
  Eye,
  Edit,
  Trash2,
  Star,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import InitiativeModal from "@/components/AgencyDashboard/Modals/InitiativeModal";
import DeleteInitiativeModal from "@/components/AgencyDashboard/Modals/DeleteInitiativeModal";
import { initiativeApi } from "@/lib/initiativeApi";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
// Commented out useAuth for development
// import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// duplicate imports removed

const AdminDashboard = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  // Commented out useAuth for development
  // const { user, signOut } = useAuth();
  const authContext = useAuth?.();
  const token = authContext?.token;
  const navigate = useNavigate();
  // Commented out user role state for development
  // const [userRole, setUserRole] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    initiatives: 0,
    news: 0,
    agencies: 0,
    volunteers: 0,
    success_stories: 0,
    reports: 0,
    health_metrics: 0,
  });
  const [data, setData] = useState({
    initiatives: [],
    news: [],
    agencies: [],
    volunteers: [],
    success_stories: [],
    reports: [],
    health_metrics: [],
  });

  // Health indicators state for editing
  const [healthIndicators, setHealthIndicators] = useState([
    {
      id: "airQuality",
      title: "جودة الهواء",
      currentValue: 85,
      targetValue: 90,
      unit: "%",
      description: "PM2.5: 12 μg/m³",
      status: "جيد",
    },
    {
      id: "waterQuality",
      title: "جودة المياه",
      currentValue: 92,
      targetValue: 95,
      unit: "%",
      description: "نقاء 99.8%",
      status: "ممتاز",
    },
    {
      id: "vaccination",
      title: "معدل التطعيمات",
      currentValue: 96,
      targetValue: 95,
      unit: "%",
      description: "96% من السكان",
      status: "عالي",
    },
    {
      id: "physicalActivity",
      title: "النشاط البدني",
      currentValue: 68,
      targetValue: 80,
      unit: "%",
      description: "68% يمارسون الرياضة",
      status: "متوسط",
    },
    {
      id: "trafficAccidents",
      title: "الحوادث المرورية",
      currentValue: 12,
      targetValue: 10,
      unit: "حادث/شهر",
      description: "12 حادث/شهر",
      status: "منخفض",
    },
    {
      id: "recycling",
      title: "إعادة التدوير",
      currentValue: 74,
      targetValue: 80,
      unit: "%",
      description: "74% من النفايات",
      status: "جيد",
    },
  ]);

  // Commented out useEffects for development
  // useEffect(() => {
  //   checkUserRole();
  // }, []);

  // useEffect(() => {
  //   if (userRole === "admin") {
  //     fetchAllData();
  // }, [userRole]);

  // For development: immediately fetch data
  useEffect(() => {
    fetchAllData();
  }, []);

  // Commented out checkUserRole function for development
  // const checkUserRole = () => {
  //   if (user) {
  //     navigate("/auth");
  //     return;
  //   }

  //   try {
  //     // Mock implementation - simulate admin role check
  //     // await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Check if user has admin role (for demo purposes, always grant access)
  //     // In production, this should check user.role === "admin"
  //     setUserRole("admin");
  //   } catch (error) {
  //     console.error("Error checking user role:", error);
  //     navigate("/");
  //   }
  // };

  const fetchAllData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/initiatives`
      );
      const json = await res.json();
      const initiativesRaw = Array.isArray(json?.data) ? json.data : [];

      const initiatives = initiativesRaw.map((i) => ({
        id: i._id || i.id,
        status: i.status || "",
        title: i.title,
        description: i.description,
        startDate: i.startDate,
        endDate: i.endDate,
        volunteers: Array.isArray(i?.volunteers) ? i.volunteers.length : 0,
        max_volunteers: i.maxVolunteers || i.max_volunteers || 0,
        maxVolunteers: i.maxVolunteers || i.max_volunteers || 0,
        organized_agency: i?.agency?.name || "",
        created_at: i.createdAt || i.created_at,
      }));

      const volunteers = [];
      initiativesRaw.forEach((init) => {
        const entries = Array.isArray(init?.volunteers) ? init.volunteers : [];
        entries.forEach((entry) => {
          const v = entry?.volunteer || entry;
          volunteers.push({
            id: entry?._id || v?._id || v?.id,
            full_name: v?.fullName || v?.name || "",
            email: v?.email || "",
            phone_number: v?.phoneNumber || v?.phone || "",
            volunteering_initiative: init?.title || "",
            status: entry?.status || null,
            availability: "",
            reviewed_at: null,
            created_at: entry?.joinedAt || init?.createdAt || null,
          });
        });
      });

      setData((prev) => ({ ...prev, initiatives, volunteers }));
      setStats((prev) => ({
        ...prev,
        initiatives: initiatives.length,
        volunteers: volunteers.length,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSignOut = async () => {
    // Commented out signOut for development
    // await signOut();
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status badge helper function
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "bg-green-500",
        text: language === "ar" ? "نشط" : "Active",
      },
      completed: {
        color: "bg-blue-500",
        text: language === "ar" ? "مكتمل" : "Completed",
      },
      cancelled: {
        color: "bg-red-500",
        text: language === "ar" ? "ملغي" : "Cancelled",
      },
      "gathering volunteers": {
        color: "bg-yellow-500",
        text: language === "ar" ? "جمع المتطوعين" : "Gathering Volunteers",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={`${config.color} text-white`}>{config.text}</Badge>
    );
  };

  // Health indicators management functions
  const updateHealthIndicator = (id, field, value) => {
    setHealthIndicators((prev) =>
      prev.map((indicator) =>
        indicator.id === id
          ? { ...indicator, [field]: parseFloat(value) || 0 }
          : indicator
      )
    );
  };

  const saveHealthIndicator = (id) => {
    // Here you would typically save to backend
    console.log(
      `Saving health indicator ${id}:`,
      healthIndicators.find((ind) => ind.id === id)
    );
    // You could add a toast notification here
  };

  const resetHealthIndicator = (id) => {
    // Reset to original values
    const originalValues = {
      airQuality: { currentValue: 85, targetValue: 90 },
      waterQuality: { currentValue: 92, targetValue: 95 },
      vaccination: { currentValue: 96, targetValue: 95 },
      physicalActivity: { currentValue: 68, targetValue: 80 },
      trafficAccidents: { currentValue: 12, targetValue: 10 },
      recycling: { currentValue: 74, targetValue: 80 },
    };

    if (originalValues[id]) {
      setHealthIndicators((prev) =>
        prev.map((indicator) =>
          indicator.id === id
            ? { ...indicator, ...originalValues[id] }
            : indicator
        )
      );
    }
  };

  // Initiative action handlers
  const handleViewInitiative = (id) => {
    console.log(`Viewing initiative ${id}`);
    // Navigate to initiative details page
    navigate(`/initiatives/${id}`);
  };

  // News action handlers
  const handleViewNews = (id) => {
    console.log(`Viewing news ${id}`);
    // Navigate to news article page
    navigate(`/news/${id}`);
  };

  const handleEditNews = (id) => {
    console.log(`Editing news ${id}`);
    // Navigate to edit news page or open edit modal
    navigate(`/admin/news/edit/${id}`);
  };

  const handleDeleteNews = (id) => {
    console.log(`Deleting news ${id}`);
    // Show confirmation dialog and delete news
    if (
      window.confirm(
        language === "ar"
          ? "هل أنت متأكد من حذف هذا الخبر؟"
          : "Are you sure you want to delete this news?"
      )
    ) {
      // Delete logic here
      setData((prev) => ({
        ...prev,
        news: prev.news.filter((article) => article.id !== id),
      }));
    }
  };

  const handleTogglePriority = (id) => {
    console.log(`Toggling priority for news ${id}`);
    setData((prev) => ({
      ...prev,
      news: prev.news.map((article) => {
        if (article.id === id) {
          // If already has priority, remove it
          if (article.priority) {
            return { ...article, priority: null };
          }
          // If no priority, assign the next available priority (1-3)
          const usedPriorities = prev.news
            .filter((a) => a.id !== id && a.priority)
            .map((a) => a.priority);
          const availablePriorities = [1, 2, 3].filter(
            (p) => !usedPriorities.includes(p)
          );
          return {
            ...article,
            priority: availablePriorities[0] || null,
          };
        }
        return article;
      }),
    }));
  };

  // Success Stories action handlers
  const handleViewSuccessStory = (id) => {
    console.log(`Viewing success story ${id}`);
    // Navigate to success story page
    navigate(`/success-story/${id}`);
  };

  const handleEditSuccessStory = (id) => {
    console.log(`Editing success story ${id}`);
    // Navigate to edit success story page or open edit modal
    navigate(`/admin/success-stories/edit/${id}`);
  };

  const handleDeleteSuccessStory = (id) => {
    console.log(`Deleting success story ${id}`);
    // Show confirmation dialog and delete success story
    if (
      window.confirm(
        language === "ar"
          ? "هل أنت متأكد من حذف قصة النجاح هذه؟"
          : "Are you sure you want to delete this success story?"
      )
    ) {
      // Delete logic here
      setData((prev) => ({
        ...prev,
        success_stories: prev.success_stories.filter(
          (story) => story.id !== id
        ),
      }));
    }
  };

  const handleToggleSuccessStoryPriority = (id) => {
    console.log(`Toggling priority for success story ${id}`);
    setData((prev) => ({
      ...prev,
      success_stories: prev.success_stories.map((story) => {
        if (story.id === id) {
          // If already has priority, remove it
          if (story.priority) {
            return { ...story, priority: null };
          }
          // If no priority, assign the next available priority (1-3)
          const usedPriorities = prev.success_stories
            .filter((s) => s.id !== id && s.priority)
            .map((s) => s.priority);
          const availablePriorities = [1, 2, 3].filter(
            (p) => !usedPriorities.includes(p)
          );
          return {
            ...story,
            priority: availablePriorities[0] || null,
          };
        }
        return story;
      }),
    }));
  };

  // Search state and filters
  const [initiativeSearch, setInitiativeSearch] = useState("");
  const [volunteerSearch, setVolunteerSearch] = useState("");

  const isArabicSearch = (term) => /[\u0600-\u06FF]/.test(term);

  const filteredInitiatives = data.initiatives.filter((initiative) => {
    if (!initiativeSearch.trim()) return true;
    const term = initiativeSearch;
    const fields = [
      initiative.title || "",
      initiative.organized_agency || "",
      initiative.status || "",
    ];
    if (isArabicSearch(term)) {
      return fields.some((f) => f.includes(term));
    }
    const tl = term.toLowerCase();
    return fields.some((f) => (f || "").toLowerCase().includes(tl));
  });

  const filteredVolunteers = data.volunteers.filter((v) => {
    if (!volunteerSearch.trim()) return true;
    const term = volunteerSearch;
    const fields = [
      v.full_name || "",
      v.email || "",
      v.phone_number || "",
      v.volunteering_initiative || "",
    ];
    if (isArabicSearch(term)) {
      return fields.some((f) => f.includes(term));
    }
    const tl = term.toLowerCase();
    return fields.some((f) => (f || "").toLowerCase().includes(tl));
  });

  // Initiative modals state and handlers (reuse agency modals)
  const [initiativeModal, setInitiativeModal] = useState({
    isOpen: false,
    mode: "edit", // "add" or "edit"
    initiative: null,
  });
  const [initiativeForm, setInitiativeForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    maxVolunteers: 10,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    initiative: null,
  });
  const [actionLoading, setActionLoading] = useState(false);

  const closeInitiativeModal = () => {
    setInitiativeModal({ isOpen: false, mode: "edit", initiative: null });
  };

  const openInitiativeModal = (mode, initiative = null) => {
    if (mode === "edit" && initiative) {
      setInitiativeForm({
        title: initiative.title,
        description: initiative.description,
        startDate: (initiative.startDate || "").split("T")[0],
        endDate: (initiative.endDate || "").split("T")[0],
        status: initiative.status,
        maxVolunteers:
          initiative.maxVolunteers || initiative.max_volunteers || 10,
      });
    } else {
      setInitiativeForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "gathering volunteers",
        maxVolunteers: 10,
      });
    }
    setInitiativeModal({ isOpen: true, mode, initiative });
  };

  const handleUpdateInitiative = async (
    initiativeId,
    formData,
    imageFile = null
  ) => {
    try {
      setActionLoading(true);
      await initiativeApi.updateInitiative(
        token,
        initiativeId,
        {
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          maxVolunteers: parseInt(formData.maxVolunteers),
        },
        imageFile
      );
      await fetchAllData();
      closeInitiativeModal();
    } catch (error) {
      console.error("Error updating initiative:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteModal.initiative) return;
      setActionLoading(true);
      await initiativeApi.deleteInitiative(
        token,
        deleteModal.initiative.id || deleteModal.initiative._id
      );
      await fetchAllData();
      setDeleteModal({ isOpen: false, initiative: null });
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const statCards = [
    {
      title: { ar: "الجهات", en: "Agencies" },
      value: stats.agencies,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: { ar: "المبادرات", en: "Initiatives" },
      value: stats.initiatives,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: { ar: "المتطوعين", en: "Volunteers" },
      value: stats.volunteers,
      icon: UserCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: { ar: "الأخبار", en: "News" },
      value: stats.news,
      icon: Newspaper,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: { ar: "قصص النجاح", en: "Success Stories" },
      value: stats.success_stories,
      icon: HandHeart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: { ar: "البلاغات", en: "Reports" },
      value: stats.reports,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Commented out loading and role checks for development
  // // Show loading state while checking role
  // if (loading || userRole === null) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-muted-foreground font-arabic">
  //           جاري التحقق من الصلاحيات...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // // Show unauthorized message if not admin
  // if (userRole !== "admin") {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="div className="max-w-md mx-auto">
  //         <CardHeader>
  //           <CardTitle className="text-center text-destructive font-arabic">
  //             غير مصرح لك بالوصول
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent className="text-center">
  //           <Alert className="mb-4">
  //             <AlertTriangle className="h-4 w-4" />
  //             <AlertDescription className="font-arabic">
  //               هذه الصفحة مخصصة للمسؤولين فقط
  //             </AlertDescription>
  //           </Alert>
  //           <Button onClick={() => navigate("/")} className="font-arabetic">
  //             العودة للصفحة الرئيسية
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

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
                  <p
                    className={`text-sm font-medium text-muted-foreground mb-1 ${
                      language === "ar" ? "font-arabic" : "font-english"
                    }`}>
                    {language === "ar" ? stat.title.ar : stat.title.en}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
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

      {/* Data Tables */}
      <Tabs defaultValue="health" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {[
            {
              value: "health",
              ar: "الصحة",
              en: "Health",
            },
            {
              value: "initiatives",
              ar: "المبادرات",
              en: "Initiatives",
            },
            {
              value: "volunteers",
              ar: "المتطوعين",
              en: "Volunteers",
            },
            {
              value: "news",
              ar: "الأخبار",
              en: "News",
            },
            {
              value: "success_stories",
              ar: "قصص النجاح",
              en: "Success Stories",
            },
            {
              value: "reports",
              ar: "البلاغات",
              en: "Reports",
            },
          ]
            .sort(() => (language === "ar" ? -1 : 1))
            .map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={language === "ar" ? "font-arabic" : "font-english"}>
                {language === "ar" ? tab.ar : tab.en}
              </TabsTrigger>
            ))}
        </TabsList>

        {/* Health Metrics Tab */}
        <TabsContent value="health">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle
                  className={`${
                    language === "ar"
                      ? "text-right font-arabic"
                      : "text-left font-english"
                  }`}>
                  {language === "ar"
                    ? "إدارة المؤشرات الصحية"
                    : "Health Indicators Management"}
                </CardTitle>
                <CardDescription
                  className={`${
                    language === "ar"
                      ? "text-right font-arabic"
                      : "text-left font-english"
                  }`}>
                  {language === "ar"
                    ? "تعديل قيم المؤشرات الصحية والأهداف"
                    : "Edit health indicators values and targets"}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Editable Health Indicators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthIndicators.map((indicator, index) => {
                const iconMap = {
                  airQuality: Wind,
                  waterQuality: Droplets,
                  vaccination: Shield,
                  physicalActivity: Activity,
                  trafficAccidents: Car,
                  recycling: Recycle,
                };

                const colorMap = {
                  airQuality: "text-green-600",
                  waterQuality: "text-blue-600",
                  vaccination: "text-purple-600",
                  physicalActivity: "text-orange-600",
                  trafficAccidents: "text-red-600",
                  recycling: "text-teal-600",
                };

                const bgColorMap = {
                  airQuality: "bg-green-100",
                  waterQuality: "bg-blue-100",
                  vaccination: "bg-purple-100",
                  physicalActivity: "bg-orange-100",
                  trafficAccidents: "bg-red-100",
                  recycling: "bg-teal-100",
                };

                const IconComponent = iconMap[indicator.id];
                const progressValue = Math.min(
                  (indicator.currentValue / indicator.targetValue) * 100,
                  100
                );
                const isExcellent =
                  indicator.currentValue >= indicator.targetValue * 0.9;

                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-2 relative overflow-hidden hover:scale-[1.02] hover:border-primary/20">
                    {isExcellent && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                        <Award className="h-3 w-3 inline mr-1" />
                        {language === "ar" ? "ممتاز" : "Excellent"}
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative ${
                              bgColorMap[indicator.id]
                            }`}>
                            <IconComponent
                              className={`h-7 w-7 ${colorMap[indicator.id]}`}
                            />
                          </div>
                          <div>
                            <CardTitle
                              className={`text-lg font-bold text-foreground ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              }`}>
                              {language === "ar"
                                ? indicator.title
                                : indicator.id === "airQuality"
                                ? "Air Quality"
                                : indicator.id === "waterQuality"
                                ? "Water Quality"
                                : indicator.id === "vaccination"
                                ? "Vaccination Rate"
                                : indicator.id === "physicalActivity"
                                ? "Physical Activity"
                                : indicator.id === "trafficAccidents"
                                ? "Traffic Accidents"
                                : "Recycling"}
                            </CardTitle>
                            <p
                              className={`text-xs text-muted-foreground ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              }`}>
                              {indicator.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border font-medium bg-green-100 text-green-700">
                          {indicator.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Current Value Input */}
                        <div className="space-y-2">
                          <label
                            className={`text-sm font-medium text-foreground ${
                              language === "ar" ? "font-arabic" : "font-english"
                            }`}>
                            {language === "ar"
                              ? "القيمة الحالية"
                              : "Current Value"}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={indicator.currentValue}
                              onChange={(e) => {
                                updateHealthIndicator(
                                  indicator.id,
                                  "currentValue",
                                  e.target.value
                                );
                              }}
                              className={`flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                              min="0"
                              max="100"
                            />
                            <span
                              className={`text-sm text-muted-foreground ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              }`}>
                              {indicator.unit}
                            </span>
                          </div>
                        </div>

                        {/* Target Value Input */}
                        <div className="space-y-2">
                          <label
                            className={`text-sm font-medium text-foreground ${
                              language === "ar" ? "font-arabic" : "font-english"
                            }`}>
                            {language === "ar" ? "الهدف" : "Target"}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={indicator.targetValue}
                              onChange={(e) => {
                                updateHealthIndicator(
                                  indicator.id,
                                  "targetValue",
                                  e.target.value
                                );
                              }}
                              className={`flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                              min="0"
                              max="100"
                            />
                            <span
                              className={`text-sm text-muted-foreground ${
                                language === "ar"
                                  ? "font-arabic"
                                  : "font-english"
                              }`}>
                              {indicator.unit}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div
                            className={`flex justify-between text-xs text-muted-foreground ${
                              language === "ar" ? "font-arabic" : "font-english"
                            }`}>
                            <span>
                              {language === "ar" ? "التقدم" : "Progress"}
                            </span>
                            <span>{Math.round(progressValue)}%</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out relative ${
                                indicator.id === "airQuality"
                                  ? "from-green-500 to-green-600"
                                  : indicator.id === "waterQuality"
                                  ? "from-blue-500 to-blue-600"
                                  : indicator.id === "vaccination"
                                  ? "from-purple-500 to-purple-600"
                                  : indicator.id === "physicalActivity"
                                  ? "from-orange-500 to-orange-600"
                                  : indicator.id === "trafficAccidents"
                                  ? "from-red-500 to-red-600"
                                  : "from-teal-500 to-teal-600"
                              }`}
                              style={{ width: `${progressValue}%` }}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            </div>
                            {/* Target line */}
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                              style={{
                                left: `${(indicator.targetValue / 100) * 100}%`,
                              }}>
                              <Target className="h-3 w-3 text-foreground/60 absolute -top-0.5 -left-1" />
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className={`flex-1 ${
                              language === "ar" ? "font-arabic" : "font-english"
                            }`}
                            onClick={() => saveHealthIndicator(indicator.id)}>
                            {language === "ar" ? "حفظ" : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`flex-1 ${
                              language === "ar" ? "font-arabic" : "font-english"
                            }`}
                            onClick={() => resetHealthIndicator(indicator.id)}>
                            {language === "ar" ? "إعادة تعيين" : "Reset"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives">
          <Card>
            <CardHeader>
              <CardTitle
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar" ? "المبادرات" : "Initiatives"}
              </CardTitle>
              <CardDescription
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar"
                  ? "جميع المبادرات المنشورة في الموقع"
                  : "All initiatives published on the website"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      language === "ar" ? "right-3" : "left-3"
                    } h-4 w-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={
                      language === "ar"
                        ? "ابحث في المبادرات"
                        : "Search initiatives"
                    }
                    value={initiativeSearch}
                    onChange={(e) => setInitiativeSearch(e.target.value)}
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right pr-10"
                        : "font-english text-left pl-10"
                    }`}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      {language === "ar" ? (
                        // Arabic order: right to left
                        <>
                          <TableHead className="text-center font-arabic">
                            الإجراءات
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            الجهة المنظمة
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            المتطوعين
                          </TableHead>

                          <TableHead className="text-right font-arabic">
                            الحالة
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            العنوان
                          </TableHead>
                        </>
                      ) : (
                        // English order: left to right
                        <>
                          <TableHead className="text-left font-english">
                            Title
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Status
                          </TableHead>

                          <TableHead className="text-center font-english">
                            Volunteers
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Organized Agency
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Actions
                          </TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInitiatives.slice(0, 10).map((initiative) => (
                      <TableRow key={initiative.id}>
                        {language === "ar" ? (
                          // Arabic order: right to left
                          <>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleViewInitiative(initiative.id)
                                  }>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    openEditInitiative(initiative)
                                  }>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    setDeleteModal({ isOpen: true, initiative })
                                  }>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {initiative.organized_agency}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              <div className="flex items-center justify-end gap-2">
                                <span className="font-semibold text-primary">
                                  {initiative.volunteers}
                                </span>
                                <span className="text-muted-foreground">/</span>
                                <span className="text-muted-foreground">
                                  {initiative.max_volunteers}
                                </span>
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${
                                        (initiative.volunteers /
                                          initiative.max_volunteers) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="text-right">
                              {initiative.status && (
                                <Badge
                                  variant="default"
                                  className={`
                                    ${
                                      initiative.status === "active" ||
                                      initiative.status === "نشط"
                                        ? "bg-green-500"
                                        : initiative.status === "completed" ||
                                          initiative.status === "مكتمل"
                                        ? "bg-blue-500"
                                        : initiative.status === "cancelled" ||
                                          initiative.status === "ملغي"
                                        ? "bg-red-500"
                                        : initiative.status ===
                                            "gathering volunteers" ||
                                          initiative.status === "جمع المتطوعين"
                                        ? "bg-yellow-500"
                                        : "bg-gray-500"
                                    } font-arabic
                                  `}>
                                  {initiative.status}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {initiative.title}
                            </TableCell>
                          </>
                        ) : (
                          // English order: left to right
                          <>
                            <TableCell className="text-left font-english">
                              {initiative.title}
                            </TableCell>
                            <TableCell className="text-center">
                              {initiative.status &&
                                getStatusBadge(initiative.status)}
                            </TableCell>

                            <TableCell className="text-center font-english">
                              <div className="flex items-center justify-center gap-2">
                                <span className="font-semibold text-primary">
                                  {initiative.volunteers}
                                </span>
                                <span className="text-muted-foreground">/</span>
                                <span className="text-muted-foreground">
                                  {initiative.max_volunteers}
                                </span>
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${
                                        (initiative.volunteers /
                                          initiative.max_volunteers) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {initiative.organized_agency}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleViewInitiative(initiative.id)
                                  }>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    openInitiativeModal("edit", initiative)
                                  }>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    setDeleteModal({ isOpen: true, initiative })
                                  }>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar" ? "الأخبار" : "News"}
              </CardTitle>
              <CardDescription
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar"
                  ? "جميع المقالات الإخبارية"
                  : "All news articles"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      {language === "ar" ? (
                        // Arabic order: right to left
                        <>
                          <TableHead className="text-center font-arabic">
                            الإجراءات
                          </TableHead>
                          <TableHead className="text-center font-arabic">
                            الأولوية
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            التاريخ
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            الكاتب
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            العنوان
                          </TableHead>
                        </>
                      ) : (
                        // English order: left to right
                        <>
                          <TableHead className="text-left font-english">
                            Title
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Author
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Date
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Priority
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Actions
                          </TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.news.slice(0, 10).map((article) => (
                      <TableRow key={article.id}>
                        {language === "ar" ? (
                          // Arabic order: right to left
                          <>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewNews(article.id)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditNews(article.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteNews(article.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                variant={
                                  article.priority ? "default" : "outline"
                                }
                                className={`h-8 w-8 p-0 ${
                                  article.priority
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleTogglePriority(article.id)
                                }>
                                <Star
                                  className={`h-4 w-4 ${
                                    article.priority ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              {article.priority && (
                                <div className="text-xs text-center mt-1 font-bold">
                                  {article.priority}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {formatDate(article.date)}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {article.author}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {article.title}
                            </TableCell>
                          </>
                        ) : (
                          // English order: left to right
                          <>
                            <TableCell className="text-left font-english">
                              {article.title}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {article.author}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {formatDate(article.date)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                variant={
                                  article.priority ? "default" : "outline"
                                }
                                className={`h-8 w-8 p-0 ${
                                  article.priority
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleTogglePriority(article.id)
                                }>
                                <Star
                                  className={`h-4 w-4 ${
                                    article.priority ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              {article.priority && (
                                <div className="text-xs text-center mt-1 font-bold">
                                  {article.priority}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewNews(article.id)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditNews(article.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteNews(article.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Volunteers Tab */}
        <TabsContent value="volunteers">
          <Card>
            <CardHeader>
              <CardTitle
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar" ? "المتطوعين" : "Volunteers"}
              </CardTitle>
              <CardDescription
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar"
                  ? "جميع طلبات التطوع المقدمة"
                  : "All volunteer applications submitted"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      language === "ar" ? "right-3" : "left-3"
                    } h-4 w-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={
                      language === "ar"
                        ? "ابحث في المتطوعين"
                        : "Search volunteers"
                    }
                    value={volunteerSearch}
                    onChange={(e) => setVolunteerSearch(e.target.value)}
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right pr-10"
                        : "font-english text-left pl-10"
                    }`}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      {language === "ar" ? (
                        // Arabic order: right to left
                        <>
                          <TableHead className="text-right font-arabic">
                            مبادرة التطوع
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            رقم الهاتف
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            البريد الإلكتروني
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            الاسم الكامل
                          </TableHead>
                        </>
                      ) : (
                        // English order: left to right
                        <>
                          <TableHead className="text-left font-english">
                            Full Name
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Email
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Phone Number
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Volunteering Initiative
                          </TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVolunteers.slice(0, 10).map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        {language === "ar" ? (
                          // Arabic order: right to left
                          <>
                            <TableCell className="text-right font-arabic">
                              {volunteer.volunteering_initiative}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {volunteer.phone_number}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {volunteer.email}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {volunteer.full_name}
                            </TableCell>
                          </>
                        ) : (
                          // English order: left to right
                          <>
                            <TableCell className="text-left font-english">
                              {volunteer.full_name}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {volunteer.email}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {volunteer.phone_number}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {volunteer.volunteering_initiative}
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Success Stories Tab */}
        <TabsContent value="success_stories">
          <Card>
            <CardHeader>
              <CardTitle
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar" ? "قصص النجاح" : "Success Stories"}
              </CardTitle>
              <CardDescription
                className={`${
                  language === "ar"
                    ? "text-right font-arabic"
                    : "text-left font-english"
                }`}>
                {language === "ar"
                  ? "جميع قصص النجاح المنشورة"
                  : "All published success stories"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      {language === "ar" ? (
                        // Arabic order: right to left
                        <>
                          <TableHead className="text-center font-arabic">
                            الإجراءات
                          </TableHead>
                          <TableHead className="text-center font-arabic">
                            الأولوية
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            التاريخ
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            الكاتب
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            الوصف
                          </TableHead>
                          <TableHead className="text-right font-arabic">
                            العنوان
                          </TableHead>
                        </>
                      ) : (
                        // English order: left to right
                        <>
                          <TableHead className="text-left font-english">
                            Title
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Description
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Author
                          </TableHead>
                          <TableHead className="text-left font-english">
                            Date
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Priority
                          </TableHead>
                          <TableHead className="text-center font-english">
                            Actions
                          </TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.success_stories.slice(0, 10).map((story) => (
                      <TableRow key={story.id}>
                        {language === "ar" ? (
                          // Arabic order: right to left
                          <>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleViewSuccessStory(story.id)
                                  }>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleEditSuccessStory(story.id)
                                  }>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    handleDeleteSuccessStory(story.id)
                                  }>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                variant={story.priority ? "default" : "outline"}
                                className={`h-8 w-8 p-0 ${
                                  story.priority
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleToggleSuccessStoryPriority(story.id)
                                }>
                                <Star
                                  className={`h-4 w-4 ${
                                    story.priority ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              {story.priority && (
                                <div className="text-xs text-center mt-1 font-bold">
                                  {story.priority}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {formatDate(story.date)}
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {story.author}
                            </TableCell>
                            <TableCell className="text-right font-arabic max-w-xs">
                              <div
                                className="truncate"
                                title={story.description}>
                                {story.description}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-arabic">
                              {story.title}
                            </TableCell>
                          </>
                        ) : (
                          // English order: left to right
                          <>
                            <TableCell className="text-left font-english">
                              {story.title}
                            </TableCell>
                            <TableCell className="text-left font-english max-w-xs">
                              <div
                                className="truncate"
                                title={story.description}>
                                {story.description}
                              </div>
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {story.author}
                            </TableCell>
                            <TableCell className="text-left font-english">
                              {formatDate(story.date)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                variant={story.priority ? "default" : "outline"}
                                className={`h-8 w-8 p-0 ${
                                  story.priority
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleToggleSuccessStoryPriority(story.id)
                                }>
                                <Star
                                  className={`h-4 w-4 ${
                                    story.priority ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              {story.priority && (
                                <div className="text-xs text-center mt-1 font-bold">
                                  {story.priority}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleViewSuccessStory(story.id)
                                  }>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    handleEditSuccessStory(story.id)
                                  }>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    handleDeleteSuccessStory(story.id)
                                  }>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">البلاغات</CardTitle>
              <CardDescription className="font-arabic text-right">
                جميع البلاغات المقدمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">
                      نوع البلاغ
                    </TableHead>
                    <TableHead className="text-right font-arabic">
                      الحالة
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
                  {data.reports.slice(0, 10).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="text-right font-arabic">
                        {report.report_type}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            report.status === "مكتمل"
                              ? "default"
                              : report.status === "قيد المراجعة"
                              ? "secondary"
                              : "outline"
                          }
                          className="font-arabic">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {report.title}
                      </TableCell>
                      <TableCell className="text-right font-arabic">
                        {formatDate(report.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Initiative Edit Modal */}
      <InitiativeModal
        isOpen={initiativeModal.isOpen}
        onClose={closeInitiativeModal}
        mode={initiativeModal.mode}
        initiative={initiativeModal.initiative}
        formData={initiativeForm}
        onFormChange={setInitiativeForm}
        onSubmit={(formData, imageFile) => {
          if (initiativeModal.mode === "add") {
            // No add flow here; admin only edits in this screen
            return;
          } else {
            handleUpdateInitiative(
              initiativeModal.initiative.id || initiativeModal.initiative._id,
              formData,
              imageFile
            );
          }
        }}
        loading={actionLoading}
        language={language}
      />

      {/* Delete Initiative Modal */}
      <DeleteInitiativeModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, initiative: null })}
        initiative={deleteModal.initiative}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
        language={language}
      />
    </div>
  );
};

export default AdminDashboard;

// Render modals at root level of the page component
// Note: These JSX elements must be inside a component's return; we add them by augmenting the return above.
