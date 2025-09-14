import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X, FileImage, FileVideo } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Report = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const isRTL = language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reportName: "",
    description: "",
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message (you can replace this with actual API call)
    alert(
      language === "ar"
        ? "تم إرسال البلاغ بنجاح!"
        : "Report submitted successfully!"
    );

    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={`mb-4 ${isRTL ? "mr-0" : "ml-0"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {language === "ar" ? "العودة" : "Back"}
          </Button>

          <h1
            className={`text-4xl font-bold text-foreground mb-4 ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar" ? "تقديم بلاغ" : "Submit Report"}
          </h1>
          <p
            className={`text-lg text-muted-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar"
              ? "شاركنا ملاحظاتك وبلاغاتك لتحسين الخدمات في مدينة حريملاء الصحية"
              : "Share your observations and reports to improve services in Huraymila Healthy City"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle
                  className={`text-xl ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "معلوماتك الشخصية" : "Your Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className={`text-sm font-medium ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`mt-2 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      language === "ar"
                        ? "أدخل اسمك الكامل"
                        : "Enter your full name"
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className={`text-sm font-medium ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"}{" "}
                    *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`mt-2 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      language === "ar"
                        ? "أدخل بريدك الإلكتروني"
                        : "Enter your email address"
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className={`text-sm font-medium ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "كلمة المرور" : "Password"} *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`mt-2 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      language === "ar"
                        ? "أدخل كلمة المرور"
                        : "Enter your password"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Report Information */}
            <Card>
              <CardHeader>
                <CardTitle
                  className={`text-xl ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "تفاصيل البلاغ" : "Report Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label
                    htmlFor="reportName"
                    className={`text-sm font-medium ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "عنوان البلاغ" : "Report Title"} *
                  </Label>
                  <Input
                    id="reportName"
                    name="reportName"
                    type="text"
                    value={formData.reportName}
                    onChange={handleInputChange}
                    required
                    className={`mt-2 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      language === "ar"
                        ? "أدخل عنوان البلاغ"
                        : "Enter report title"
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className={`text-sm font-medium ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "وصف البلاغ" : "Report Description"} *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`mt-2 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      language === "ar"
                        ? "اكتب وصفاً مفصلاً للبلاغ أو المشكلة التي تريد الإبلاغ عنها"
                        : "Write a detailed description of the report or issue you want to report"
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File Upload Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle
                className={`text-xl ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}>
                {language === "ar" ? "رفع الملفات" : "Upload Files"}
              </CardTitle>
              <p
                className={`text-sm text-muted-foreground ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}>
                {language === "ar"
                  ? "يمكنك رفع الصور أو الفيديوهات لدعم بلاغك (اختياري)"
                  : "You can upload photos or videos to support your report (optional)"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors relative">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p
                      className={`text-lg font-medium ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar"
                        ? "اسحب الملفات هنا أو انقر للرفع"
                        : "Drag files here or click to upload"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "يدعم: JPG, PNG, MP4, MOV (حد أقصى 10 ميجابايت لكل ملف)"
                        : "Supports: JPG, PNG, MP4, MOV (max 10MB per file)"}
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
                      className={`font-medium ${
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }`}>
                      {language === "ar"
                        ? "الملفات المرفوعة:"
                        : "Uploaded Files:"}
                    </h4>
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {file.type === "image" ? (
                              <FileImage className="w-5 h-5 text-blue-500" />
                            ) : (
                              <FileVideo className="w-5 h-5 text-red-500" />
                            )}
                            <div>
                              <p
                                className={`text-sm font-medium ${
                                  isRTL ? "font-arabic" : "font-sans"
                                }`}>
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
                            className="text-destructive hover:text-destructive">
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
          <div className="mt-8 text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="px-12 py-6 text-lg">
              {isSubmitting
                ? language === "ar"
                  ? "جاري الإرسال..."
                  : "Submitting..."
                : language === "ar"
                ? "إرسال البلاغ"
                : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
