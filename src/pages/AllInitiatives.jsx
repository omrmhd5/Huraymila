import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  CheckCircle,
  Heart,
  Share2,
  ArrowRight,
  Leaf,
  Award,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AllInitiatives = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const isRTL = language === "ar";

  // Mock initiatives data
  const initiativesData = [
    {
      id: 1,
      title: "برنامج التوعية الصحية",
      titleEn: "Health Awareness Program",
      description: "برنامج شامل للتوعية بأهمية الصحة الوقائية والتغذية السليمة",
      descriptionEn:
        "Comprehensive program for awareness of preventive health and proper nutrition",
      category: "صحة",
      categoryEn: "Health",
      status: "نشط",
      statusEn: "Active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      location: "مركز المدينة الصحي",
      locationEn: "City Health Center",
      volunteers: 150,
      maxVolunteers: 200,
      progress: 75,
      image: "/assets/health-workshop.jpg",
      likes: 89,
      shares: 23,
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "مشروع التشجير الحضري",
      titleEn: "Urban Greening Project",
      description:
        "مبادرة لزيادة المساحات الخضراء في المدينة وتحسين جودة الهواء",
      descriptionEn:
        "Initiative to increase green spaces in the city and improve air quality",
      category: "بيئة",
      categoryEn: "Environment",
      status: "نشط",
      statusEn: "Active",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      location: "جميع أنحاء المدينة",
      locationEn: "Throughout the City",
      volunteers: 75,
      maxVolunteers: 120,
      progress: 62,
      image: "/assets/green-garden.jpg",
      likes: 67,
      shares: 18,
      views: 980,
      featured: false,
    },
    {
      id: 3,
      title: "مبادرة المشي الصحي",
      titleEn: "Healthy Walking Initiative",
      description: "برنامج أسبوعي للمشي الصحي في منتزهات المدينة",
      descriptionEn: "Weekly healthy walking program in city parks",
      category: "صحة",
      categoryEn: "Health",
      status: "جمع متطوعين",
      statusEn: "Gathering Volunteers",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      location: "منتزه المدينة",
      locationEn: "City Park",
      volunteers: 45,
      maxVolunteers: 80,
      progress: 56,
      image: "/assets/walking-initiative.jpg",
      likes: 45,
      shares: 12,
      views: 750,
      featured: false,
    },
    {
      id: 4,
      title: "برنامج التغذية المدرسية",
      titleEn: "School Nutrition Program",
      description: "تحسين التغذية في المدارس وتوعية الطلاب بأهمية الغذاء الصحي",
      descriptionEn:
        "Improving nutrition in schools and educating students about the importance of healthy food",
      category: "تعليم",
      categoryEn: "Education",
      status: "مكتمل",
      statusEn: "Completed",
      startDate: "2023-09-01",
      endDate: "2024-01-31",
      location: "مدارس حريملاء",
      locationEn: "Harimlaa Schools",
      volunteers: 95,
      maxVolunteers: 100,
      progress: 100,
      image: "/assets/health-workshop.jpg",
      likes: 78,
      shares: 25,
      views: 1100,
      featured: true,
    },
    {
      id: 5,
      title: "مشروع إعادة التدوير",
      titleEn: "Recycling Project",
      description: "برنامج شامل لإعادة تدوير النفايات وتقليل التلوث البيئي",
      descriptionEn:
        "Comprehensive program for waste recycling and reducing environmental pollution",
      category: "بيئة",
      categoryEn: "Environment",
      status: "نشط",
      statusEn: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      location: "جميع الأحياء",
      locationEn: "All Neighborhoods",
      volunteers: 120,
      maxVolunteers: 150,
      progress: 80,
      image: "/assets/green-garden.jpg",
      likes: 92,
      shares: 35,
      views: 1350,
      featured: false,
    },
    {
      id: 6,
      title: "حملة التطعيم المجتمعي",
      titleEn: "Community Vaccination Campaign",
      description: "حملة تطعيم شاملة لجميع فئات المجتمع ضد الأمراض المعدية",
      descriptionEn:
        "Comprehensive vaccination campaign for all community segments against infectious diseases",
      category: "صحة",
      categoryEn: "Health",
      status: "ملغي",
      statusEn: "Cancelled",
      startDate: "2024-02-15",
      endDate: "2024-04-15",
      location: "المراكز الصحية",
      locationEn: "Health Centers",
      volunteers: 0,
      maxVolunteers: 50,
      progress: 0,
      image: "/assets/health-workshop.jpg",
      likes: 34,
      shares: 8,
      views: 420,
      featured: false,
    },
  ];

  const categories = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "صحة", label: language === "ar" ? "صحة" : "Health" },
    { value: "بيئة", label: language === "ar" ? "بيئة" : "Environment" },
    { value: "تعليم", label: language === "ar" ? "تعليم" : "Education" },
    { value: "مجتمع", label: language === "ar" ? "مجتمع" : "Community" },
  ];

  const statusOptions = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "نشط", label: language === "ar" ? "نشط" : "Active" },
    { value: "مكتمل", label: language === "ar" ? "مكتمل" : "Completed" },
    {
      value: "جمع متطوعين",
      label: language === "ar" ? "جمع متطوعين" : "Gathering Volunteers",
    },
    { value: "ملغي", label: language === "ar" ? "ملغي" : "Cancelled" },
  ];

  const sortOptions = [
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "oldest", label: language === "ar" ? "الأقدم" : "Oldest" },
    {
      value: "most_volunteers",
      label: language === "ar" ? "الأكثر متطوعين" : "Most Volunteers",
    },
    {
      value: "most_progress",
      label: language === "ar" ? "الأكثر تقدم" : "Most Progress",
    },
    {
      value: "most_liked",
      label: language === "ar" ? "الأكثر إعجاباً" : "Most Liked",
    },
  ];

  // Filter and sort initiatives
  const filteredInitiatives = initiativesData
    .filter((initiative) => {
      const matchesSearch =
        searchTerm === "" ||
        (language === "ar" ? initiative.title : initiative.titleEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === "ar" ? initiative.description : initiative.descriptionEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === "ar" ? initiative.location : initiative.locationEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        (language === "ar" ? initiative.category : initiative.categoryEn) ===
          categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (language === "ar" ? initiative.status : initiative.statusEn) ===
          statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startDate) - new Date(a.startDate);
        case "oldest":
          return new Date(a.startDate) - new Date(b.startDate);
        case "most_volunteers":
          return b.volunteers - a.volunteers;
        case "most_progress":
          return b.progress - a.progress;
        case "most_liked":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

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
        text: language === "ar" ? "جمع متطوعين" : "Gathering Volunteers",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={`${config.color} text-white`}>{config.text}</Badge>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      health: {
        color: "bg-blue-100 text-blue-800",
        text: language === "ar" ? "صحة" : "Health",
      },
      environment: {
        color: "bg-green-100 text-green-800",
        text: language === "ar" ? "بيئة" : "Environment",
      },
      community: {
        color: "bg-purple-100 text-purple-800",
        text: language === "ar" ? "مجتمع" : "Community",
      },
      education: {
        color: "bg-orange-100 text-orange-800",
        text: language === "ar" ? "تعليم" : "Education",
      },
    };

    const config = categoryConfig[category] || categoryConfig.health;
    return (
      <Badge variant="outline" className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar" ? "المبادرات الصحية" : "Health Initiatives"}
          </h1>
          <p
            className={`text-xl text-muted-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar"
              ? "اكتشف المبادرات النشطة في مدينة حريملاء الصحية"
              : "Discover Active Initiatives in Harimlaa Healthy City"}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                    isRTL ? "right-3" : "left-3"
                  }`}
                />
                <Input
                  placeholder={
                    language === "ar"
                      ? "البحث في المبادرات..."
                      : "Search initiatives..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${
                    isRTL
                      ? "font-arabic text-right pr-10"
                      : "font-sans text-left pl-10"
                  }`}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger
                  className={
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }>
                  <SelectValue
                    placeholder={language === "ar" ? "التصنيف" : "Category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className={
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className={
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }>
                  <SelectValue
                    placeholder={language === "ar" ? "الحالة" : "Status"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem
                      key={status.value}
                      value={status.value}
                      className={
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className={
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }>
                  <SelectValue
                    placeholder={language === "ar" ? "ترتيب" : "Sort"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className={
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p
            className={`text-sm text-muted-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar"
              ? `عرض ${filteredInitiatives.length} من ${initiativesData.length} مبادرة`
              : `Showing ${filteredInitiatives.length} of ${initiativesData.length} initiatives`}
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((initiative) => (
            <Card
              key={initiative.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Initiative Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={initiative.image}
                  alt={
                    language === "ar" ? initiative.title : initiative.titleEn
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {initiative.featured && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {language === "ar" ? "مميز" : "Featured"}
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  {getCategoryBadge(initiative.category)}
                  {getStatusBadge(initiative.status)}
                </div>
              </div>

              <CardHeader>
                <CardTitle
                  className={`text-lg line-clamp-2 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? initiative.title : initiative.titleEn}
                </CardTitle>
                <CardDescription
                  className={`line-clamp-3 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar"
                    ? initiative.description
                    : initiative.descriptionEn}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta Info */}
                <div
                  className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {language === "ar"
                        ? initiative.location
                        : initiative.locationEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(initiative.startDate)}</span>
                  </div>
                </div>

                {/* Volunteer Progress */}
                <div
                  className={`space-y-2 ${isRTL ? "rtl" : "ltr"}`}
                  dir={isRTL ? "rtl" : "ltr"}>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`font-medium ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {initiative.volunteers} {language === "ar" ? "من" : "of"}{" "}
                      {initiative.maxVolunteers}{" "}
                      {language === "ar" ? "متطوع" : "volunteers"}
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(
                        (initiative.volunteers / initiative.maxVolunteers) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div
                    className={`w-full ${isRTL ? "rtl" : "ltr"}`}
                    dir={isRTL ? "rtl" : "ltr"}>
                    <Progress
                      value={
                        (initiative.volunteers / initiative.maxVolunteers) * 100
                      }
                      className={`h-2 ${isRTL ? "rtl" : "ltr"}`}
                      style={isRTL ? { transform: "scaleX(-1)" } : {}}
                    />
                  </div>
                  <p
                    className={`text-xs text-muted-foreground ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {initiative.maxVolunteers - initiative.volunteers}{" "}
                    {language === "ar" ? "متطوع مطلوب" : "volunteers needed"}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{initiative.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{initiative.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      <span>{initiative.shares}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 group-hover:bg-primary/90 transition-colors"
                    onClick={() =>
                      navigateToTop(`/initiatives/${initiative.id}`)
                    }>
                    {language === "ar" ? "عرض التفاصيل" : "View Details"}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                  {initiative.volunteers < initiative.maxVolunteers &&
                    initiative.status !== "ملغي" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigateToTop(`/initiatives/${initiative.id}`)
                        }>
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredInitiatives.length === 0 && (
          <div className="text-center py-12">
            <h3
              className={`text-xl font-semibold mb-2 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "لا توجد نتائج" : "No Results Found"}
            </h3>
            <p
              className={`text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar"
                ? "جرب البحث بكلمات مختلفة أو تغيير الفلاتر"
                : "Try searching with different keywords or changing the filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInitiatives;
