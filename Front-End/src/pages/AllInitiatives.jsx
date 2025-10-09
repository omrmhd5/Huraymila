import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import AnimatedCard from "@/components/animations/AnimatedCard";
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
  Users,
  ArrowRight,
  UserPlus,
  Check,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { useAuth } from "@/contexts/AuthContext";
import { initiativeApi } from "@/lib/initiativeApi";
import { toast } from "sonner";

const AllInitiatives = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Data state
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingTo, setApplyingTo] = useState(null);

  const isRTL = language === "ar";

  // Load initiatives on component mount
  useEffect(() => {
    loadInitiatives();
  }, []);

  const loadInitiatives = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await initiativeApi.getAllInitiatives();
      setInitiatives(response.data || []);
    } catch (error) {
      console.error("Error loading initiatives:", error);
      setError("Failed to load initiatives");
      toast.error("Failed to load initiatives");
    } finally {
      setLoading(false);
    }
  };

  // Check if current user has applied to an initiative
  const hasUserApplied = (initiative) => {
    if (!user || user.type !== "volunteer" || !initiative.volunteers) {
      return false;
    }

    return initiative.volunteers.some((vol) => {
      const volunteerId = vol.volunteer?._id || vol.volunteer;
      return volunteerId === user._id || volunteerId === user.id;
    });
  };

  // Handle volunteer application
  const handleApplyToInitiative = async (initiativeId) => {
    if (!user) {
      toast.error(
        language === "ar" ? "يجب تسجيل الدخول أولاً" : "Please sign in first"
      );
      navigate("/auth");
      return;
    }

    if (user.type !== "volunteer") {
      toast.error(
        language === "ar"
          ? "المتطوعون فقط يمكنهم التقدم للمبادرات"
          : "Only volunteers can apply to initiatives"
      );
      return;
    }

    try {
      setApplyingTo(initiativeId);
      await initiativeApi.applyToInitiative(token, initiativeId);

      toast.success(
        language === "ar"
          ? "تم تقديم طلب المشاركة بنجاح!"
          : "Application submitted successfully!"
      );

      // Refresh initiatives to show updated data
      await loadInitiatives();
    } catch (error) {
      console.error("Error applying to initiative:", error);
      toast.error(
        error.message ||
          (language === "ar" ? "فشل في تقديم الطلب" : "Failed to apply")
      );
    } finally {
      setApplyingTo(null);
    }
  };

  const statusOptions = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "active", label: language === "ar" ? "نشط" : "Active" },
    { value: "completed", label: language === "ar" ? "مكتمل" : "Completed" },
    {
      value: "gathering volunteers",
      label: language === "ar" ? "جمع المتطوعين" : "Gathering Volunteers",
    },
    { value: "cancelled", label: language === "ar" ? "ملغي" : "Cancelled" },
  ];

  const sortOptions = [
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "oldest", label: language === "ar" ? "الأقدم" : "Oldest" },
    {
      value: "most_volunteers",
      label: language === "ar" ? "الأكثر متطوعين" : "Most Volunteers",
    },
  ];

  // Filter and sort initiatives
  const filteredInitiatives = initiatives
    .filter((initiative) => {
      const matchesSearch =
        searchTerm === "" ||
        initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || initiative.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startDate) - new Date(a.startDate);
        case "oldest":
          return new Date(a.startDate) - new Date(b.startDate);
        case "most_volunteers":
          return (b.currentVolunteers || 0) - (a.currentVolunteers || 0);
        default:
          return 0;
      }
    });

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

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <AnimatedSection animation="fadeInUp" delay={0}>
          <div className="mb-8">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {t("initiatives.title")}
            </h1>
            <p
              className={`text-xl text-muted-foreground ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {t("initiatives.title")
                ? language === "ar"
                  ? "اكتشف المبادرات النشطة في مدينة حريملاء الصحية"
                  : "Discover Active Initiatives in Huraymila Healthy City"
                : "Fallback subtitle"}
            </p>
          </div>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection animation="fadeInUp" delay={200}>
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
                    placeholder={t("initiatives.searchPlaceholder")}
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

              {/* Status Filter */}
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    className={
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }>
                    <SelectValue placeholder={t("initiatives.status")} />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value}
                        className={
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
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
                    <SelectValue placeholder={t("common.sort")} />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className={
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
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
                ? `عرض ${filteredInitiatives.length} من ${initiatives.length} مبادرة`
                : `Showing ${filteredInitiatives.length} of ${initiatives.length} initiatives`}
            </p>
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={loadInitiatives}>
              {language === "ar" ? "إعادة المحاولة" : "Try Again"}
            </Button>
          </div>
        )}

        {/* Initiatives Grid */}
        {!loading && !error && (
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={100}
            animation="fadeInUp">
            {filteredInitiatives.map((initiative, index) => (
              <AnimatedCard
                key={initiative.id}
                animation="fadeInUp"
                delay={index * 100}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Initiative Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {initiative.imageUrl ? (
                    <img
                      src={`${
                        import.meta.env.VITE_API_BASE_URL?.replace(
                          "/api",
                          ""
                        ) || "http://localhost:5000"
                      }${initiative.imageUrl}`}
                      alt={initiative.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">
                          {language === "ar" ? "لا توجد صورة" : "No image"}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(initiative.status)}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle
                    className={`text-lg line-clamp-2 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {initiative.title}
                  </CardTitle>
                  <CardDescription
                    className={`line-clamp-3 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {initiative.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta Info */}
                  <div
                    className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(initiative.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(initiative.endDate)}</span>
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
                        {initiative.currentVolunteers || 0}{" "}
                        {language === "ar" ? "من" : "of"}{" "}
                        {initiative.maxVolunteers}{" "}
                        {language === "ar" ? "متطوع" : "volunteers"}
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round(
                          ((initiative.currentVolunteers || 0) /
                            initiative.maxVolunteers) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div
                      className={`w-full ${isRTL ? "rtl" : "ltr"}`}
                      dir={isRTL ? "rtl" : "ltr"}>
                      <Progress
                        value={
                          ((initiative.currentVolunteers || 0) /
                            initiative.maxVolunteers) *
                          100
                        }
                        className={`h-2 ${isRTL ? "rtl" : "ltr"}`}
                        style={isRTL ? { transform: "scaleX(-1)" } : {}}
                      />
                    </div>
                    <p
                      className={`text-xs text-muted-foreground ${
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }`}>
                      {initiative.maxVolunteers -
                        (initiative.currentVolunteers || 0)}{" "}
                      {language === "ar" ? "متطوع مطلوب" : "volunteers needed"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 group-hover:bg-primary/90 transition-colors"
                      onClick={() =>
                        navigateToTop(
                          `/initiatives/${initiative._id || initiative.id}`
                        )
                      }>
                      {language === "ar" ? "عرض التفاصيل" : "View Details"}
                      <ArrowRight
                        className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                      />
                    </Button>

                    {/* Apply/Applied Button */}
                    {user && user.type === "volunteer" && (
                      <>
                        {hasUserApplied(initiative) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="bg-green-50 text-green-700 border-green-200">
                            <Check className="w-4 h-4" />
                            <span
                              className={`${isRTL ? "mr-2" : "ml-2"} text-xs`}>
                              {language === "ar" ? "مُطبق" : "Applied"}
                            </span>
                          </Button>
                        ) : (
                          (initiative.currentVolunteers || 0) <
                            initiative.maxVolunteers &&
                          (initiative.status === "gathering volunteers" ||
                            initiative.status === "active") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleApplyToInitiative(
                                  initiative._id || initiative.id
                                )
                              }
                              disabled={
                                applyingTo === (initiative._id || initiative.id)
                              }
                              className="hover:bg-primary hover:text-primary-foreground">
                              {applyingTo ===
                              (initiative._id || initiative.id) ? (
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <UserPlus className="w-4 h-4" />
                              )}
                              <span
                                className={`${
                                  isRTL ? "mr-2" : "ml-2"
                                } text-xs`}>
                                {applyingTo ===
                                (initiative._id || initiative.id)
                                  ? language === "ar"
                                    ? "جاري التقديم..."
                                    : "Applying..."
                                  : language === "ar"
                                  ? "تقدم"
                                  : "Apply"}
                              </span>
                            </Button>
                          )
                        )}
                      </>
                    )}

                    {/* Show apply button for non-volunteers */}
                    {(!user || user.type !== "volunteer") &&
                      (initiative.currentVolunteers || 0) <
                        initiative.maxVolunteers &&
                      initiative.status !== "cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigateToTop(
                              `/initiatives/${initiative._id || initiative.id}`
                            )
                          }>
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      )}
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </StaggeredContainer>
        )}

        {/* No Results */}
        {filteredInitiatives.length === 0 && (
          <AnimatedSection animation="fadeInUp" delay={400}>
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
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default AllInitiatives;
