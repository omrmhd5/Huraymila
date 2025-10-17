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
  AlertTriangle,
  FileImage,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { initiativeApi } from "@/lib/initiativeApi";
import { successStoryApi } from "@/lib/successStoryApi";
import { reportApi } from "@/lib/reportApi";
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

  // Reports states
  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportViewModal, setReportViewModal] = useState({
    isOpen: false,
    report: null,
  });

  // Success story view states
  const [successStoryViewModal, setSuccessStoryViewModal] = useState({
    isOpen: false,
    story: null,
  });
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
        // Error loading success stories
      } finally {
        setLoadingStories(false);
      }
    };

    loadSuccessStories();
  }, [token]);

  // Load volunteer's reports
  useEffect(() => {
    const loadReports = async () => {
      if (!token) return;
      try {
        setLoadingReports(true);
        const response = await reportApi.getMyReports(token);
        setMyReports(response.data || []);
      } catch (error) {
        // Error loading reports
      } finally {
        setLoadingReports(false);
      }
    };

    loadReports();
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
        // Error refreshing user data after withdrawal
      }
    } catch (error) {
      // Error withdrawing from initiative
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
      // Error submitting success story
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

  // Handle report view
  const handleViewReport = (report) => {
    setReportViewModal({
      isOpen: true,
      report: report,
    });
  };

  const closeReportViewModal = () => {
    setReportViewModal({
      isOpen: false,
      report: null,
    });
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };

  // Handle success story view
  const handleViewSuccessStory = (story) => {
    setSuccessStoryViewModal({
      isOpen: true,
      story: story,
    });
  };

  const closeSuccessStoryViewModal = () => {
    setSuccessStoryViewModal({
      isOpen: false,
      story: null,
    });
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
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

              {/* Total Reports */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {myReports.length || 0}
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar" ? "إجمالي البلاغات" : "Total Reports"}
                  </p>
                </CardContent>
              </Card>

              {/* Total Success Stories */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {mySuccessStories.length || 0}
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar"
                      ? "إجمالي قصص النجاح"
                      : "Total Success Stories"}
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
                    <Button
                      variant="outline"
                      className="w-full justify-start border-orange-200 hover:bg-orange-50"
                      onClick={() => navigate("/report")}>
                      <AlertTriangle
                        className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {language === "ar" ? "تقديم بلاغ" : "Submit Report"}
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
                            {story.createdAt
                              ? new Date(story.createdAt).toLocaleDateString(
                                  language === "ar" ? "ar-SA" : "en-US"
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            isRTL ? "flex-row-reverse" : ""
                          )}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSuccessStory(story)}
                            className="hover:bg-primary hover:text-primary-foreground">
                            <Eye className="w-4 h-4" />
                          </Button>
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

      {/* My Reports */}
      <AnimatedSection animation="fadeInUp" delay={500} duration={400}>
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
                  <AlertTriangle className="w-5 h-5" />
                  {language === "ar" ? "بلاغاتي" : "My Reports"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingReports ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {language === "ar" ? "يتم التحميل..." : "Loading..."}
                    </p>
                  </div>
                ) : myReports && myReports.length > 0 ? (
                  <div className="grid gap-4">
                    {myReports.map((report, index) => (
                      <div
                        key={report._id || index}
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
                              {report.title}
                            </h3>
                            <Badge
                              className={`${
                                reportApi.getStatusConfig(
                                  report.status,
                                  language
                                ).color
                              } text-white`}>
                              {
                                reportApi.getStatusConfig(
                                  report.status,
                                  language
                                ).text
                              }
                            </Badge>
                          </div>
                          <p
                            className={cn(
                              "text-sm text-muted-foreground mb-2",
                              isRTL ? "font-arabic" : "font-sans"
                            )}>
                            {report.details.length > 100
                              ? `${report.details.substring(0, 100)}...`
                              : report.details}
                          </p>
                          <p
                            className={cn(
                              "text-xs text-muted-foreground",
                              isRTL ? "font-arabic" : "font-sans"
                            )}>
                            {language === "ar"
                              ? "تم الإرسال في:"
                              : "Submitted on:"}{" "}
                            {report.created_at
                              ? formatDate(report.created_at)
                              : "N/A"}
                            {report.filesUrls &&
                              report.filesUrls.length > 0 && (
                                <span className="ml-2">
                                  • {report.filesUrls.length}{" "}
                                  {language === "ar"
                                    ? "ملف مرفق"
                                    : "attached files"}
                                </span>
                              )}
                          </p>
                          {report.adminNotes && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                              <p
                                className={cn(
                                  "text-blue-800 font-medium",
                                  isRTL
                                    ? "font-arabic text-right"
                                    : "font-sans text-left"
                                )}>
                                {language === "ar"
                                  ? "ملاحظات المسؤول:"
                                  : "Admin Notes:"}
                              </p>
                              <p
                                className={cn(
                                  "text-blue-700",
                                  isRTL
                                    ? "font-arabic text-right"
                                    : "font-sans text-left"
                                )}>
                                {report.adminNotes}
                              </p>
                            </div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            isRTL ? "flex-row-reverse" : ""
                          )}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                            className="hover:bg-primary hover:text-primary-foreground">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-2",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "لم تقم بتقديم أي بلاغات بعد"
                        : "No reports submitted yet"}
                    </h3>
                    <p
                      className={cn(
                        "text-muted-foreground mb-6",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "قدم بلاغاً عن أي مشاكل أو اقتراحات"
                        : "Submit a report for any issues or suggestions"}
                    </p>
                    <Button onClick={() => navigate("/report")}>
                      <AlertTriangle
                        className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {language === "ar" ? "تقديم بلاغ" : "Submit Report"}
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

      {/* Report View Modal */}
      {reportViewModal.isOpen && reportViewModal.report && (
        <Dialog
          open={reportViewModal.isOpen}
          onOpenChange={closeReportViewModal}>
          <DialogContent
            className={cn(
              "max-w-4xl max-h-[90vh] overflow-y-auto",
              language === "ar" ? "font-arabic" : "font-sans"
            )}>
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-2xl",
                  language === "ar" ? "text-right" : "text-left"
                )}>
                {language === "ar" ? "تفاصيل البلاغ" : "Report Details"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Report Title */}
              <div>
                <h3
                  className={cn(
                    "text-sm font-medium text-muted-foreground mb-2",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {language === "ar" ? "العنوان" : "Title"}
                </h3>
                <p
                  className={cn(
                    "text-lg font-semibold",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {reportViewModal.report.title}
                </p>
              </div>

              {/* Report Details */}
              <div>
                <h3
                  className={cn(
                    "text-sm font-medium text-muted-foreground mb-2",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {language === "ar" ? "التفاصيل" : "Details"}
                </h3>
                <p
                  className={cn(
                    "text-base whitespace-pre-wrap",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {reportViewModal.report.details}
                </p>
              </div>

              {/* Status & Created Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "الحالة" : "Status"}
                  </h3>
                  <Badge
                    className={`${
                      reportApi.getStatusConfig(
                        reportViewModal.report.status,
                        language
                      ).color
                    } text-white`}>
                    {
                      reportApi.getStatusConfig(
                        reportViewModal.report.status,
                        language
                      ).text
                    }
                  </Badge>
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "تاريخ الإنشاء" : "Created At"}
                  </h3>
                  <p
                    className={cn(
                      "text-base",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {formatDate(reportViewModal.report.created_at)}
                  </p>
                </div>
              </div>

              {/* Files Section */}
              {reportViewModal.report.filesUrls &&
                reportViewModal.report.filesUrls.length > 0 && (
                  <div>
                    <h3
                      className={cn(
                        "text-sm font-medium text-muted-foreground mb-3",
                        language === "ar" ? "text-right" : "text-left"
                      )}>
                      {language === "ar"
                        ? `الملفات المرفقة (${reportViewModal.report.filesUrls.length})`
                        : `Attached Files (${reportViewModal.report.filesUrls.length})`}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportViewModal.report.filesUrls.map(
                        (fileUrl, index) => {
                          const fullUrl = reportApi.getFileUrl(fileUrl);
                          const isVideo = fileUrl.match(
                            /\.(mp4|webm|ogg|mov)$/i
                          );
                          const isImage = fileUrl.match(
                            /\.(jpg|jpeg|png|gif|webp|bmp)$/i
                          );

                          return (
                            <div
                              key={index}
                              className="border rounded-lg p-2 bg-muted/30">
                              {isImage && (
                                <a
                                  href={fullUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block">
                                  <img
                                    src={fullUrl}
                                    alt={`Report file ${index + 1}`}
                                    className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                                  />
                                  <p className="text-xs text-center mt-2 text-muted-foreground">
                                    {language === "ar"
                                      ? "انقر للعرض بالحجم الكامل"
                                      : "Click to view full size"}
                                  </p>
                                </a>
                              )}
                              {isVideo && (
                                <div>
                                  <video
                                    controls
                                    className="w-full h-48 rounded"
                                    preload="metadata">
                                    <source src={fullUrl} />
                                    {language === "ar"
                                      ? "متصفحك لا يدعم تشغيل الفيديو"
                                      : "Your browser does not support the video tag"}
                                  </video>
                                  <p className="text-xs text-center mt-2 text-muted-foreground">
                                    {language === "ar" ? "فيديو" : "Video"}
                                  </p>
                                </div>
                              )}
                              {!isImage && !isVideo && (
                                <div className="flex items-center justify-center h-48 bg-muted rounded">
                                  <div className="text-center">
                                    <FileImage className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                                    <a
                                      href={fullUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary hover:underline">
                                      {language === "ar"
                                        ? "تحميل الملف"
                                        : "Download File"}
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

              {/* Admin Notes (if any) */}
              {reportViewModal.report.adminNotes && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3
                    className={cn(
                      "text-sm font-medium text-blue-900 mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "ملاحظات المسؤول" : "Admin Notes"}
                  </h3>
                  <p
                    className={cn(
                      "text-base text-blue-800",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {reportViewModal.report.adminNotes}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter
              className={cn(language === "ar" ? "flex-row-reverse" : "")}>
              <Button variant="outline" onClick={closeReportViewModal}>
                {language === "ar" ? "إغلاق" : "Close"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Story View Modal */}
      {successStoryViewModal.isOpen && successStoryViewModal.story && (
        <Dialog
          open={successStoryViewModal.isOpen}
          onOpenChange={closeSuccessStoryViewModal}>
          <DialogContent
            className={cn(
              "max-w-4xl max-h-[90vh] overflow-y-auto",
              language === "ar" ? "font-arabic" : "font-sans"
            )}>
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-2xl",
                  language === "ar" ? "text-right" : "text-left"
                )}>
                {language === "ar"
                  ? "تفاصيل قصة النجاح"
                  : "Success Story Details"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Story Title */}
              <div>
                <h3
                  className={cn(
                    "text-sm font-medium text-muted-foreground mb-2",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {language === "ar" ? "العنوان" : "Title"}
                </h3>
                <p
                  className={cn(
                    "text-lg font-semibold",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {successStoryViewModal.story.title}
                </p>
              </div>

              {/* Story Subtitle */}
              <div>
                <h3
                  className={cn(
                    "text-sm font-medium text-muted-foreground mb-2",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {language === "ar" ? "العنوان الفرعي" : "Subtitle"}
                </h3>
                <p
                  className={cn(
                    "text-base",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {successStoryViewModal.story.subtitle}
                </p>
              </div>

              {/* Author & Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "الكاتب" : "Author"}
                  </h3>
                  <p
                    className={cn(
                      "text-base",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {successStoryViewModal.story.author ||
                      user?.fullName ||
                      "N/A"}
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "الحالة" : "Status"}
                  </h3>
                  {getApprovalStatusBadge(
                    successStoryViewModal.story.approvalStatus
                  )}
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "تاريخ الإرسال" : "Submitted At"}
                  </h3>
                  <p
                    className={cn(
                      "text-base",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {successStoryViewModal.story.createdAt
                      ? new Date(
                          successStoryViewModal.story.createdAt
                        ).toLocaleDateString(
                          language === "ar" ? "ar-SA" : "en-US"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3
                  className={cn(
                    "text-sm font-medium text-muted-foreground mb-2",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {language === "ar" ? "الوصف" : "Description"}
                </h3>
                <p
                  className={cn(
                    "text-base whitespace-pre-wrap",
                    language === "ar" ? "text-right" : "text-left"
                  )}>
                  {successStoryViewModal.story.description}
                </p>
              </div>

              {/* Quote */}
              {successStoryViewModal.story.quote && (
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h3
                    className={cn(
                      "text-sm font-medium text-yellow-900 mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "اقتباس ملهم" : "Inspiring Quote"}
                  </h3>
                  <p
                    className={cn(
                      "text-base text-yellow-800 italic",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    "{successStoryViewModal.story.quote}"
                  </p>
                </div>
              )}

              {/* Before and After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "قبل" : "Before"}
                  </h3>
                  <p
                    className={cn(
                      "text-base whitespace-pre-wrap",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {successStoryViewModal.story.before}
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-2",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "بعد" : "After"}
                  </h3>
                  <p
                    className={cn(
                      "text-base whitespace-pre-wrap",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {successStoryViewModal.story.after}
                  </p>
                </div>
              </div>

              {/* Story Image */}
              {successStoryViewModal.story.imageUrl && (
                <div>
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground mb-3",
                      language === "ar" ? "text-right" : "text-left"
                    )}>
                    {language === "ar" ? "صورة القصة" : "Story Image"}
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={successStoryViewModal.story.imageUrl}
                      alt={successStoryViewModal.story.title}
                      className="max-w-full h-auto max-h-96 rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter
              className={cn(language === "ar" ? "flex-row-reverse" : "")}>
              <Button variant="outline" onClick={closeSuccessStoryViewModal}>
                {language === "ar" ? "إغلاق" : "Close"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VolunteerDashboard;
