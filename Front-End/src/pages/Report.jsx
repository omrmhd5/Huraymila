import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Upload,
  X,
  FileImage,
  FileVideo,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { reportApi } from "@/lib/reportApi";

const Report = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, loading: authLoading, token } = useAuth();
  const isRTL = language === "ar";

  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated or not a volunteer
  useEffect(() => {
    if (!authLoading && (!user || user.type !== "volunteer")) {
      toast.error(
        language === "ar"
          ? "يجب تسجيل الدخول كمتطوع لتقديم بلاغ"
          : "You must be signed in as a volunteer to submit a report"
      );
      navigate("/auth");
    }
  }, [user, authLoading, navigate, language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type.startsWith("image/") ? "image" : "video",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.details) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API to create the report
      await reportApi.createReport(token, formData, files);

      // Show success message
      toast.success(
        language === "ar"
          ? "تم تقديم البلاغ بنجاح! سيتم مراجعته قريباً"
          : "Report submitted successfully! It will be reviewed soon"
      );

      // Reset form
      setFormData({
        title: "",
        details: "",
      });
      setFiles([]);

      // Navigate back to dashboard
      setTimeout(() => {
        navigate("/volunteer-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(
        error.message ||
          (language === "ar"
            ? "فشل في تقديم البلاغ"
            : "Failed to submit report")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
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
    <div className={cn("min-h-screen bg-muted/30 py-8", isRTL ? "rtl" : "ltr")}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={`mb-4 ${isRTL ? "mr-0" : "ml-0"}`}>
            <ArrowLeft className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
            {language === "ar" ? "رجوع" : "Back"}
          </Button>

          <div
            className={cn(
              "flex items-center gap-3 mb-4",
              isRTL ? "flex-row-reverse" : ""
            )}>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1
                className={cn(
                  "text-4xl font-bold text-foreground",
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                )}>
                {language === "ar" ? "تقديم بلاغ" : "Submit Report"}
              </h1>
            </div>
          </div>

          <p
            className={cn(
              "text-lg text-muted-foreground",
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            )}>
            {language === "ar"
              ? "أبلغ عن مشكلة أو ملاحظة في منطقتك. سيتم مراجعة البلاغ من قبل المسؤولين"
              : "Report an issue or observation in your area. The report will be reviewed by administrators"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Volunteer Information Card (Read-only) */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-xl",
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                )}>
                {language === "ar"
                  ? "معلومات المتطوع"
                  : "Volunteer Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg",
                  isRTL ? "text-right" : "text-left"
                )}>
                <div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground mb-1",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </p>
                  <p
                    className={cn(
                      "font-medium",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {user?.fullName}
                  </p>
                </div>
                <div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground mb-1",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <p
                    className={cn(
                      "font-medium",
                      isRTL ? "font-arabic" : "font-sans"
                    )}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-xl",
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                )}>
                {language === "ar" ? "تفاصيل البلاغ" : "Report Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="title"
                  className={cn(
                    "text-sm font-medium",
                    isRTL ? "font-arabic" : "font-sans"
                  )}>
                  {language === "ar" ? "عنوان البلاغ" : "Report Title"} *
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={cn("mt-2", isRTL ? "text-right" : "text-left")}
                  placeholder={
                    language === "ar"
                      ? "مثال: طريق تالف في حي..."
                      : "Example: Damaged road in..."
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="details"
                  className={cn(
                    "text-sm font-medium",
                    isRTL ? "font-arabic" : "font-sans"
                  )}>
                  {language === "ar" ? "تفاصيل البلاغ" : "Report Details"} *
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={cn("mt-2", isRTL ? "text-right" : "text-left")}
                  placeholder={
                    language === "ar"
                      ? "قم بوصف المشكلة بالتفصيل..."
                      : "Describe the issue in detail..."
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-xl",
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                )}>
                {language === "ar"
                  ? "رفع الملفات (اختياري)"
                  : "Upload Files (Optional)"}
              </CardTitle>
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                )}>
                {language === "ar"
                  ? "يمكنك إرفاق صور أو فيديوهات توضح المشكلة"
                  : "You can attach photos or videos illustrating the issue"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors relative cursor-pointer group">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-orange-500 transition-colors" />
                  <div className="space-y-2">
                    <p
                      className={cn(
                        "text-lg font-medium",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "اسحب وأفلت الملفات هنا"
                        : "Drag and drop files here"}
                    </p>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        isRTL ? "font-arabic" : "font-sans"
                      )}>
                      {language === "ar"
                        ? "أو انقر للاختيار (صور وفيديوهات)"
                        : "or click to select (images and videos)"}
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <h4
                      className={cn(
                        "font-medium",
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      )}>
                      {language === "ar"
                        ? `الملفات المرفقة (${files.length})`
                        : `Uploaded Files (${files.length})`}
                    </h4>
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className={cn(
                            "flex items-center justify-between p-3 bg-muted/50 rounded-lg",
                            isRTL ? "flex-row-reverse" : ""
                          )}>
                          <div
                            className={cn(
                              "flex items-center gap-3",
                              isRTL ? "flex-row-reverse" : ""
                            )}>
                            {file.type === "image" ? (
                              <FileImage className="w-5 h-5 text-blue-500" />
                            ) : (
                              <FileVideo className="w-5 h-5 text-red-500" />
                            )}
                            <div className={isRTL ? "text-right" : "text-left"}>
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  isRTL ? "font-arabic" : "font-sans"
                                )}>
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className={cn(
                "px-8 py-6 text-lg",
                isRTL ? "font-arabic" : "font-sans"
              )}>
              {language === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className={cn(
                "px-12 py-6 text-lg bg-orange-600 hover:bg-orange-700",
                isRTL ? "font-arabic" : "font-sans"
              )}>
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {language === "ar" ? "جاري الإرسال..." : "Submitting..."}
                </>
              ) : (
                <>
                  <AlertTriangle
                    className={cn("w-5 h-5", isRTL ? "ml-2" : "mr-2")}
                  />
                  {language === "ar" ? "تقديم البلاغ" : "Submit Report"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
