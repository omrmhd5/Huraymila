import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Heart,
  Award,
  TrendingUp,
  Eye,
  Trash2,
  Loader2,
  BookOpen,
  PlusCircle,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { initiativeApi } from "@/lib/initiativeApi";
import { successStoryApi } from "@/lib/successStoryApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const VolunteerDashboard = () => {
  const {
    user,
    loading: authLoading,
    token,
    getAuthHeaders,
    fetchCurrentUser,
  } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [userInitiatives, setUserInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(null);

  // Success story states
  const [showSuccessStoryModal, setShowSuccessStoryModal] = useState(false);
  const [submittingStory, setSubmittingStory] = useState(false);
  const [mySuccessStories, setMySuccessStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [successStoryForm, setSuccessStoryForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    quote: "",
    before: "",
    after: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [storyImage, setStoryImage] = useState(null);

  const normalizeVolunteerInitiatives = (rawInitiatives) => {
    if (!Array.isArray(rawInitiatives)) return [];
    return rawInitiatives.map((entry) => {
      const initiativeDoc = entry?.initiative ?? entry;
      const id =
        typeof initiativeDoc === "string"
          ? initiativeDoc
          : initiativeDoc?._id || initiativeDoc?.id || null;
      return {
        id,
        title:
          typeof initiativeDoc === "object" ? initiativeDoc?.title || "" : "",
        description:
          typeof initiativeDoc === "object"
            ? initiativeDoc?.description || ""
            : "",
        status:
          typeof initiativeDoc === "object" ? initiativeDoc?.status || "" : "",
        startDate:
          typeof initiativeDoc === "object"
            ? initiativeDoc?.startDate || null
            : null,
        endDate:
          typeof initiativeDoc === "object"
            ? initiativeDoc?.endDate || null
            : null,
        joinedAt: entry?.joinedAt || null,
      };
    });
  };

  const isRTL = language === "ar";

  // Redirect to login if not authenticated or not a volunteer (match Agency behavior)
  useEffect(() => {
    if (!authLoading && (!user || user.type !== "volunteer")) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Load user initiatives (refresh populated data and normalize)
  useEffect(() => {
    const loadInitiatives = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetchCurrentUser();
        const fetchedUser = res?.user || res;
        const initiativesRaw = fetchedUser?.initiatives || [];
        setUserInitiatives(normalizeVolunteerInitiatives(initiativesRaw));
      } catch (error) {
        console.error("Error loading initiatives:", error);
        const fallback = normalizeVolunteerInitiatives(user?.initiatives || []);
        setUserInitiatives(fallback);
      } finally {
        setLoading(false);
      }
    };

    loadInitiatives();
  }, [user, token, fetchCurrentUser]);

  // Load volunteer's success stories
  useEffect(() => {
    const loadSuccessStories = async () => {
      if (!token) return;
      try {
        setLoadingStories(true);
        const response = await successStoryApi.getMySuccessStories(token);
        setMySuccessStories(response.data || []);
      } catch (error) {
        console.error("Error loading success stories:", error);
      } finally {
        setLoadingStories(false);
      }
    };

    loadSuccessStories();
  }, [token]);

  // Handle withdraw from initiative
  const handleWithdraw = async (initiativeId, initiativeTitle) => {
    if (!token) {
      toast.error(
        language === "ar" ? "يجب تسجيل الدخول أولاً" : "Please sign in first"
      );
      return;
    }

    try {
      setWithdrawing(initiativeId);
      await initiativeApi.withdrawFromInitiative(token, initiativeId);

      toast.success(
        language === "ar"
          ? `تم الانسحاب من مبادرة "${initiativeTitle}" بنجاح`
          : `Successfully withdrew from "${initiativeTitle}"`
      );

      // Remove the initiative from local state
      setUserInitiatives((prev) =>
        prev.filter(
          (init) =>
            (init.initiative?._id || init.initiative?.id) !== initiativeId
        )
      );

      // Refresh user data from server
      try {
        const userData = await fetchCurrentUser();
        if (userData && userData.initiatives) {
          setUserInitiatives(userData.initiatives);
        } else {
          setUserInitiatives([]);
        }
      } catch (error) {
        console.error("Error refreshing user data after withdrawal:", error);
      }
    } catch (error) {
      console.error("Error withdrawing from initiative:", error);
      toast.error(
        error.message ||
          (language === "ar"
            ? "فشل في الانسحاب من المبادرة"
            : "Failed to withdraw from initiative")
      );
    } finally {
      setWithdrawing(null);
    }
  };

  // Handle success story submission
  const handleSubmitSuccessStory = async () => {
    if (!token) {
      toast.error(
        language === "ar" ? "يجب تسجيل الدخول أولاً" : "Please sign in first"
      );
      return;
    }

    // Validate form (author is automatically set on backend)
    if (
      !successStoryForm.title ||
      !successStoryForm.subtitle ||
      !successStoryForm.description ||
      !successStoryForm.quote ||
      !successStoryForm.before ||
      !successStoryForm.after
    ) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    try {
      setSubmittingStory(true);
      await successStoryApi.submitSuccessStory(
        token,
        successStoryForm,
        storyImage
      );

      toast.success(
        language === "ar"
          ? "تم إرسال قصة النجاح بنجاح! في انتظار موافقة المحافظ"
          : "Success story submitted successfully! Awaiting governor approval"
      );

      // Reset form and close modal
      setSuccessStoryForm({
        title: "",
        subtitle: "",
        description: "",
        quote: "",
        before: "",
        after: "",
        date: new Date().toISOString().split("T")[0],
      });
      setStoryImage(null);
      setShowSuccessStoryModal(false);

      // Refresh success stories list
      const response = await successStoryApi.getMySuccessStories(token);
      setMySuccessStories(response.data || []);
    } catch (error) {
      console.error("Error submitting success story:", error);
      toast.error(
        error.message ||
          (language === "ar"
            ? "فشل في إرسال قصة النجاح"
            : "Failed to submit success story")
      );
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleFormChange = (field, value) => {
    setSuccessStoryForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoryImage(file);
    }
  };

  const getApprovalStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="default" className="bg-orange-500">
            {language === "ar" ? "في انتظار الموافقة" : "Pending Approval"}
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-500">
            {language === "ar" ? "معتمد" : "Approved"}
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="default" className="bg-red-500">
            {language === "ar" ? "مرفوض" : "Declined"}
          </Badge>
        );
      default:
        return null;
    }
  };

  // Match Agency loading gate
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "يتم التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" delay={0} duration={400}>
        <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className={`text-center ${isRTL ? "rtl" : "ltr"}`}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-bold mb-4",
                  isRTL ? "font-arabic" : "font-sans"
                )}>
                {language === "ar"
                  ? "لوحة تحكم المتطوع"
                  : "Volunteer Dashboard"}
              </h1>
              <p
                className={cn(
                  "text-xl text-muted-foreground max-w-2xl mx-auto",
                  isRTL ? "font-arabic" : "font-sans"
                )}>
                {language === "ar"
                  ? `مرحباً، ${user.fullName} - مساهماتك تصنع الفرق`
                  : `Welcome, ${user.fullName} - Your contributions make a difference`}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Cards */}
      <AnimatedSection animation="fadeInUp" delay={100} duration={400}>
        <section className="py-12 -mt-8 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Total Initiatives */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {userInitiatives.length || 0}
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar"
                      ? "إجمالي المبادرات"
                      : "Total Initiatives"}
                  </p>
                </CardContent>
              </Card>

              {/* Active Initiatives */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {
                      userInitiatives.filter((i) => i.status === "active")
                        .length
                    }
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar"
                      ? "المبادرات النشطة"
                      : "Active Initiatives"}
                  </p>
                </CardContent>
              </Card>

              {/* Completed Initiatives */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {
                      userInitiatives.filter((i) => i.status === "completed")
                        .length
                    }
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar"
                      ? "المبادرات المكتملة"
                      : "Completed Initiatives"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection animation="fadeInUp" delay={200} duration={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle
                      className={cn(
                        "flex items-center gap-2",
                        isRTL
                          ? "flex-row-reverse font-arabic text-right"
                          : "font-sans text-left"
                      )}>
                      <User className="w-5 h-5" />
                      {language === "ar"
                        ? "معلومات الملف الشخصي"
                        : "Profile Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div
                      className={cn(
                        "flex items-center gap-4",
                        isRTL ? "flex-row-reverse" : ""
                      )}>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {language === "ar" ? "الاسم الكامل" : "Full Name"}
                        </p>
                        <p
                          className={cn(
                            "font-medium",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {user.fullName}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-4",
                        isRTL ? "flex-row-reverse" : ""
                      )}>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {language === "ar" ? "البريد الإلكتروني" : "Email"}
                        </p>
                        <p
                          className={cn(
                            "font-medium",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-4",
                        isRTL ? "flex-row-reverse" : ""
                      )}>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                        </p>
                        <p
                          className={cn(
                            "font-medium",
                            isRTL ? "font-arabic" : "font-sans"
                          )}>
                          {user.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle
                      className={cn(
                        "flex items-center gap-2",
                        isRTL
                          ? "flex-row-reverse font-arabic text-right"
                          : "font-sans text-left"
                      )}>
                      <BookOpen className="w-5 h-5" />
                      {language === "ar" ? "إجراءات سريعة" : "Quick Actions"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/initiatives")}>
                      <Eye className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                      {language === "ar"
                        ? "استكشف المبادرات"
                        : "Explore Initiatives"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/")}>
                      <Users
                        className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {language === "ar" ? "الصفحة الرئيسية" : "Home Page"}
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => setShowSuccessStoryModal(true)}>
                      <PlusCircle
                        className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {language === "ar"
                        ? "إضافة قصة نجاح"
                        : "Add Success Story"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* My Initiatives */}
      <AnimatedSection animation="fadeInUp" delay={300} duration={400}>
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn(
                    "flex items-center gap-2",
                    isRTL
                      ? "flex-row-reverse font-arabic text-right"
                      : "font-sans text-left"
                  )}>
                  <Users className="w-5 h-5" />
                  {language === "ar" ? "مبادراتي" : "My Initiatives"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {language === "ar" ? "يتم التحميل..." : "Loading..."}
                    </p>
                  </div>
                ) : userInitiatives && userInitiatives.length > 0 ? (
                  <div className="grid gap-4">
                    {userInitiatives.map((initiative, index) => {
                      const initiativeId = initiative?.id || null;
                      const isWithdrawing = initiativeId
                        ? withdrawing === initiativeId
                        : false;

                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center justify-between p-4 bg-background border rounded-lg hover:shadow-sm transition-shadow",
                            isRTL ? "flex-row-reverse" : ""
                          )}>
                          <div className={isRTL ? "text-right" : "text-left"}>
                            <h3
                              className={cn(
                                "font-semibold text-lg mb-1",
                                isRTL ? "font-arabic" : "font-sans"
                              )}>
                              {initiative?.title || "Initiative"}
                            </h3>
                            <p
                              className={cn(
                                "text-sm text-muted-foreground mb-2",
                                isRTL ? "font-arabic" : "font-sans"
                              )}>
                              {initiative?.description || ""}
                            </p>
                            <p
                              className={cn(
                                "text-xs text-muted-foreground",
                                isRTL ? "font-arabic" : "font-sans"
                              )}>
                              {language === "ar" ? "انضممت في:" : "Joined on:"}{" "}
                              {new Date(
                                initiative?.joinedAt || Date.now()
                              ).toLocaleDateString(
                                language === "ar" ? "ar-SA" : "en-US"
                              )}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div
                            className={cn(
                              "flex items-center gap-2",
                              isRTL ? "flex-row-reverse" : ""
                            )}>
                            {/* View Initiative Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/initiatives/${initiativeId}`)
                              }
                              disabled={!initiativeId}
                              className="hover:bg-primary hover:text-primary-foreground">
                              <Eye className="w-4 h-4" />
                            </Button>

                            {/* Withdraw Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleWithdraw(
                                  initiativeId,
                                  initiative?.title || ""
                                )
                              }
                              disabled={!initiativeId || isWithdrawing}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                              {isWithdrawing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-2",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "لم تنضم إلى أي مبادرات بعد"
                        : "No initiatives joined yet"}
                    </h3>
                    <p
                      className={cn(
                        "text-muted-foreground mb-6",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "اكتشف المبادرات المتاحة وابدأ في إحداث فرق"
                        : "Discover available initiatives and start making a difference"}
                    </p>
                    <Button onClick={() => navigate("/initiatives")}>
                      {language === "ar"
                        ? "استكشف المبادرات"
                        : "Explore Initiatives"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* My Success Stories */}
      <AnimatedSection animation="fadeInUp" delay={400} duration={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn(
                    "flex items-center gap-2",
                    isRTL
                      ? "flex-row-reverse font-arabic text-right"
                      : "font-sans text-left"
                  )}>
                  <Star className="w-5 h-5" />
                  {language === "ar"
                    ? "قصص النجاح الخاصة بي"
                    : "My Success Stories"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingStories ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {language === "ar" ? "يتم التحميل..." : "Loading..."}
                    </p>
                  </div>
                ) : mySuccessStories && mySuccessStories.length > 0 ? (
                  <div className="grid gap-4">
                    {mySuccessStories.map((story, index) => (
                      <div
                        key={story._id || index}
                        className={cn(
                          "flex items-start justify-between p-4 bg-background border rounded-lg hover:shadow-sm transition-shadow",
                          isRTL ? "flex-row-reverse" : ""
                        )}>
                        <div
                          className={cn(
                            "flex-1",
                            isRTL ? "text-right" : "text-left"
                          )}>
                          <div
                            className={cn(
                              "flex items-center gap-2 mb-2",
                              isRTL ? "flex-row-reverse" : ""
                            )}>
                            <h3
                              className={cn(
                                "font-semibold text-lg",
                                isRTL ? "font-arabic" : "font-sans"
                              )}>
                              {story.title}
                            </h3>
                            {getApprovalStatusBadge(story.approvalStatus)}
                          </div>
                          <p
                            className={cn(
                              "text-sm text-muted-foreground mb-2",
                              isRTL ? "font-arabic" : "font-sans"
                            )}>
                            {story.subtitle}
                          </p>
                          <p
                            className={cn(
                              "text-xs text-muted-foreground",
                              isRTL ? "font-arabic" : "font-sans"
                            )}>
                            {language === "ar"
                              ? "تم الإرسال في:"
                              : "Submitted on:"}{" "}
                            {new Date(story.createdAt).toLocaleDateString(
                              language === "ar" ? "ar-SA" : "en-US"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-2",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "لم تقم بإرسال أي قصص نجاح بعد"
                        : "No success stories submitted yet"}
                    </h3>
                    <p
                      className={cn(
                        "text-muted-foreground mb-6",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "شارك قصة نجاحك مع المجتمع"
                        : "Share your success story with the community"}
                    </p>
                    <Button onClick={() => setShowSuccessStoryModal(true)}>
                      <PlusCircle
                        className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {language === "ar"
                        ? "إضافة قصة نجاح"
                        : "Add Success Story"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Success Story Modal */}
      <Dialog
        open={showSuccessStoryModal}
        onOpenChange={setShowSuccessStoryModal}>
        <DialogContent
          className={cn(
            "max-w-2xl max-h-[90vh] overflow-y-auto",
            isRTL ? "font-arabic" : "font-sans"
          )}>
          <DialogHeader>
            <DialogTitle className={isRTL ? "text-right" : "text-left"}>
              {language === "ar" ? "إضافة قصة نجاح" : "Add Success Story"}
            </DialogTitle>
            <DialogDescription className={isRTL ? "text-right" : "text-left"}>
              {language === "ar"
                ? "شارك قصة نجاحك. سيتم مراجعتها من قبل المحافظ قبل النشر."
                : "Share your success story. It will be reviewed by the governor before publication."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="title"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "العنوان *" : "Title *"}
              </Label>
              <Input
                id="title"
                value={successStoryForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder={language === "ar" ? "أدخل العنوان" : "Enter title"}
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="subtitle"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "العنوان الفرعي *" : "Subtitle *"}
              </Label>
              <Input
                id="subtitle"
                value={successStoryForm.subtitle}
                onChange={(e) => handleFormChange("subtitle", e.target.value)}
                placeholder={
                  language === "ar" ? "أدخل العنوان الفرعي" : "Enter subtitle"
                }
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="author"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "الكاتب" : "Author"}
              </Label>
              <Input
                id="author"
                value={user?.fullName || ""}
                disabled
                className={cn(isRTL ? "text-right" : "", "bg-muted")}
              />
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  isRTL ? "text-right" : "text-left"
                )}>
                {language === "ar"
                  ? "سيتم استخدام اسمك تلقائياً ككاتب لقصة النجاح"
                  : "Your name will be automatically used as the author"}
              </p>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "الوصف *" : "Description *"}
              </Label>
              <Textarea
                id="description"
                value={successStoryForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder={
                  language === "ar" ? "أدخل الوصف" : "Enter description"
                }
                rows={3}
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="quote"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "اقتباس *" : "Quote *"}
              </Label>
              <Textarea
                id="quote"
                value={successStoryForm.quote}
                onChange={(e) => handleFormChange("quote", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل اقتباساً ملهماً"
                    : "Enter an inspiring quote"
                }
                rows={2}
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="before"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "قبل *" : "Before *"}
              </Label>
              <Textarea
                id="before"
                value={successStoryForm.before}
                onChange={(e) => handleFormChange("before", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "صف الوضع قبل التحسين"
                    : "Describe the situation before improvement"
                }
                rows={3}
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="after"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "بعد *" : "After *"}
              </Label>
              <Textarea
                id="after"
                value={successStoryForm.after}
                onChange={(e) => handleFormChange("after", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "صف الوضع بعد التحسين"
                    : "Describe the situation after improvement"
                }
                rows={3}
                className={isRTL ? "text-right" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="image"
                className={isRTL ? "text-right" : "text-left"}>
                {language === "ar" ? "الصورة (اختياري)" : "Image (Optional)"}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={isRTL ? "text-right" : ""}
              />
            </div>
          </div>

          <DialogFooter className={cn(isRTL ? "flex-row-reverse" : "")}>
            <Button
              variant="outline"
              onClick={() => setShowSuccessStoryModal(false)}
              disabled={submittingStory}>
              {language === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              onClick={handleSubmitSuccessStory}
              disabled={submittingStory}>
              {submittingStory ? (
                <>
                  <Loader2
                    className={cn(
                      "w-4 h-4 animate-spin",
                      isRTL ? "ml-2" : "mr-2"
                    )}
                  />
                  {language === "ar" ? "جاري الإرسال..." : "Submitting..."}
                </>
              ) : (
                <>
                  <PlusCircle
                    className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                  />
                  {language === "ar"
                    ? "إرسال قصة النجاح"
                    : "Submit Success Story"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VolunteerDashboard;
