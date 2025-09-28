import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Users, UserPlus, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { initiativeApi } from "@/lib/initiativeApi";
import { toast } from "sonner";

const Initiative = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const { user, token } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  // Load initiative on component mount
  useEffect(() => {
    if (id) {
      loadInitiative();
    }
  }, [id]);

  const loadInitiative = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await initiativeApi.getInitiativeById(id);
      setInitiative(response.data);
    } catch (error) {
      console.error("Error loading initiative:", error);
      setError("Failed to load initiative");
      toast.error("Failed to load initiative");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !initiative) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "ar" ? "المبادرة غير موجودة" : "Initiative not found"}
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => navigate("/initiatives")}>
            {language === "ar" ? "العودة للمبادرات" : "Back to Initiatives"}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
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
        text: language === "ar" ? "جمع المتطوعين" : "Gathering Volunteers",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={`${config.color} text-white`}>{config.text}</Badge>
    );
  };

  // Check if current user has applied to this initiative
  const hasUserApplied = () => {
    if (!user || user.type !== "volunteer" || !initiative?.volunteers) {
      return false;
    }

    return initiative.volunteers.some((vol) => {
      const volunteerId = vol.volunteer?._id || vol.volunteer;
      return volunteerId === user._id || volunteerId === user.id;
    });
  };

  const handleApply = async () => {
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
      setIsApplying(true);
      await initiativeApi.applyToInitiative(token, id);

      toast.success(
        language === "ar"
          ? "تم تقديم طلب المشاركة بنجاح!"
          : "Application submitted successfully!"
      );

      // Refresh initiative data to show updated status
      await loadInitiative();
    } catch (error) {
      console.error("Error applying to initiative:", error);
      toast.error(
        error.message ||
          (language === "ar" ? "فشل في تقديم الطلب" : "Failed to apply")
      );
    } finally {
      setIsApplying(false);
    }
  };

  const volunteerProgress =
    ((initiative.currentVolunteers || 0) / initiative.maxVolunteers) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/initiatives")}
            className={`${isRTL ? "mr-4" : "ml-4"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("initiative.backToInitiatives")}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Initiative Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {getStatusBadge(initiative.status)}
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {initiative.title}
            </h1>

            {/* Initiative Meta */}
            <div
              className={`flex flex-wrap items-center gap-6 text-sm text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(initiative.startDate)} -{" "}
                  {formatDate(initiative.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {initiative.currentVolunteers || 0} /{" "}
                  {initiative.maxVolunteers}{" "}
                  {language === "ar" ? "متطوع" : "volunteers"}
                </span>
              </div>
            </div>
          </div>

          {/* Initiative Image */}
          {initiative.imageUrl && (
            <div className="mb-8">
              <img
                src={`${
                  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
                  "http://localhost:5000"
                }${initiative.imageUrl}`}
                alt={initiative.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Initiative Description */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <p
                  className={`text-xl text-muted-foreground ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {initiative.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Volunteer Progress */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "تقدم المتطوعين" : "Volunteer Progress"}
                </h3>
                <div
                  className={`space-y-4 ${isRTL ? "rtl" : "ltr"}`}
                  dir={isRTL ? "rtl" : "ltr"}>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {initiative.currentVolunteers || 0}{" "}
                      {language === "ar" ? "من" : "of"}{" "}
                      {initiative.maxVolunteers}{" "}
                      {language === "ar" ? "متطوع" : "volunteers"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(volunteerProgress)}%
                    </span>
                  </div>
                  <div
                    className={`w-full ${isRTL ? "rtl" : "ltr"}`}
                    dir={isRTL ? "rtl" : "ltr"}>
                    <Progress
                      value={volunteerProgress}
                      className={`h-3 ${isRTL ? "rtl" : "ltr"}`}
                      style={isRTL ? { transform: "scaleX(-1)" } : {}}
                    />
                  </div>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {initiative.maxVolunteers -
                      (initiative.currentVolunteers || 0)}{" "}
                    {language === "ar" ? "متطوع مطلوب" : "volunteers needed"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apply Button */}
          <div className="mt-8 text-center">
            {user && user.type === "volunteer" ? (
              // Volunteer user - show apply/applied state
              hasUserApplied() ? (
                <Button
                  size="lg"
                  disabled
                  className="px-8 py-6 text-lg bg-green-500 hover:bg-green-500">
                  <Check className="w-5 h-5 mr-2" />
                  {language === "ar" ? "تم التقديم" : "Applied"}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleApply}
                  disabled={
                    isApplying ||
                    (initiative.currentVolunteers || 0) >=
                      initiative.maxVolunteers ||
                    (initiative.status !== "gathering volunteers" &&
                      initiative.status !== "active")
                  }
                  className="px-8 py-6 text-lg">
                  {isApplying ? (
                    <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <UserPlus className="w-5 h-5 mr-2" />
                  )}
                  {isApplying
                    ? language === "ar"
                      ? "جاري التقديم..."
                      : "Applying..."
                    : (initiative.currentVolunteers || 0) >=
                      initiative.maxVolunteers
                    ? language === "ar"
                      ? "المبادرة ممتلئة"
                      : "Initiative Full"
                    : initiative.status !== "gathering volunteers" &&
                      initiative.status !== "active"
                    ? language === "ar"
                      ? "المبادرة مغلقة"
                      : "Initiative Closed"
                    : language === "ar"
                    ? "تقدم للمشاركة"
                    : "Apply to Participate"}
                </Button>
              )
            ) : (
              // Non-volunteer user - show sign in prompt
              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="px-8 py-6 text-lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  {language === "ar"
                    ? "سجل الدخول للتقديم"
                    : "Sign In to Apply"}
                </Button>
                <p
                  className={`text-sm text-muted-foreground ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "يجب تسجيل الدخول كمتطوع للتقدم للمبادرات"
                    : "You need to sign in as a volunteer to apply to initiatives"}
                </p>
              </div>
            )}

            {/* Status messages */}
            {(initiative.currentVolunteers || 0) >=
              initiative.maxVolunteers && (
              <p
                className={`text-sm text-muted-foreground mt-2 ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "تم الوصول للحد الأقصى من المتطوعين"
                  : "Maximum volunteers reached"}
              </p>
            )}

            {user && user.type === "volunteer" && hasUserApplied() && (
              <p
                className={`text-sm text-green-600 mt-2 ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "لقد تقدمت بالفعل لهذه المبادرة"
                  : "You have already applied to this initiative"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiative;
