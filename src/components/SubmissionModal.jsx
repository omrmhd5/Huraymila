import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  createSubmission,
  getSubmissionTypeOptions,
  getStatusOptions,
  formatSubmissionDate,
  getSubmissionStatusBadge,
} from "@/lib/submissions";
import { Upload, X, FileText, Image, Video, File } from "lucide-react";
import { toast } from "sonner";

const SubmissionModal = ({
  isOpen,
  onClose,
  mode = "add", // "add", "edit", "view"
  standardId,
  standardTitle,
  submission = null,
  onSubmit,
}) => {
  const { language } = useTheme();
  const [formData, setFormData] = useState({
    submissionType: "text",
    title: "",
    description: "",
    notes: "",
    status: "pending",
    files: [], // Array of uploaded files
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const submissionTypeOptions = getSubmissionTypeOptions(language);
  const statusOptions = getStatusOptions(language);

  // Initialize form data
  useEffect(() => {
    if (mode === "edit" && submission) {
      setFormData({
        submissionType: submission.submissionType || "text",
        title: submission.title || "",
        description: submission.description || "",
        notes: submission.notes || "",
        status: submission.status || "pending",
        files: submission.files || [],
      });
    } else if (mode === "add") {
      setFormData({
        submissionType: "text",
        title: "",
        description: "",
        notes: "",
        status: "pending",
        files: [],
      });
    }
    setErrors({});
  }, [mode, submission, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // File upload handling
  const getAcceptedFileTypes = (submissionType) => {
    switch (submissionType) {
      case "pdf":
        return ".pdf";
      case "photo":
        return "image/*";
      case "video":
        return "video/*";
      default:
        return "";
    }
  };

  const getMaxFileSize = (submissionType) => {
    switch (submissionType) {
      case "pdf":
        return 10 * 1024 * 1024; // 10MB
      case "photo":
        return 5 * 1024 * 1024; // 5MB
      case "video":
        return 50 * 1024 * 1024; // 50MB
      default:
        return 0;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const submissionType = formData.submissionType;
    const maxSize = getMaxFileSize(submissionType);
    const acceptedTypes = getAcceptedFileTypes(submissionType);

    const validFiles = files.filter((file) => {
      // Check file size
      if (file.size > maxSize) {
        toast.error(
          language === "ar"
            ? `الملف ${file.name} كبير جداً. الحد الأقصى ${formatFileSize(
                maxSize
              )}`
            : `File ${file.name} is too large. Maximum size is ${formatFileSize(
                maxSize
              )}`
        );
        return false;
      }

      // Check file type
      if (submissionType === "pdf" && !file.type.includes("pdf")) {
        toast.error(
          language === "ar"
            ? `الملف ${file.name} ليس ملف PDF صالح`
            : `File ${file.name} is not a valid PDF file`
        );
        return false;
      }

      if (submissionType === "photo" && !file.type.startsWith("image/")) {
        toast.error(
          language === "ar"
            ? `الملف ${file.name} ليس صورة صالحة`
            : `File ${file.name} is not a valid image file`
        );
        return false;
      }

      if (submissionType === "video" && !file.type.startsWith("video/")) {
        toast.error(
          language === "ar"
            ? `الملف ${file.name} ليس فيديو صالح`
            : `File ${file.name} is not a valid video file`
        );
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...validFiles],
      }));
      toast.success(
        language === "ar"
          ? `تم رفع ${validFiles.length} ملف بنجاح`
          : `Successfully uploaded ${validFiles.length} file(s)`
      );
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title =
        language === "ar" ? "العنوان مطلوب" : "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        language === "ar" ? "الوصف مطلوب" : "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        standardId,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (mode === "add") {
        const newSubmission = createSubmission(standardId, submissionData);
        await onSubmit(newSubmission);
      } else if (mode === "edit") {
        const updatedSubmission = {
          ...submission,
          ...submissionData,
          id: submission.id,
          createdAt: submission.createdAt,
        };
        await onSubmit(updatedSubmission);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isAddMode = mode === "add";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          language === "ar" ? "rtl" : "ltr"
        }`}
        dir={language === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle
            className={`text-xl font-semibold ${
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }`}>
            {isAddMode &&
              (language === "ar" ? "إضافة تقديم جديد" : "Add New Submission")}
            {isEditMode &&
              (language === "ar" ? "تعديل التقديم" : "Edit Submission")}
            {isViewMode &&
              (language === "ar" ? "عرض التقديم" : "View Submission")}
          </DialogTitle>
          <p
            className={`text-sm text-muted-foreground ${
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }`}>
            {language === "ar"
              ? `للمعيار: ${standardTitle}`
              : `For Standard: ${standardTitle}`}
          </p>
        </DialogHeader>

        {isViewMode ? (
          /* View Mode - Display submission details only */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "تفاصيل التقديم" : "Submission Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div>
                  <Label
                    className={`text-sm font-medium text-muted-foreground ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "العنوان" : "Title"}
                  </Label>
                  <p
                    className={`mt-1 text-base ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {submission.title}
                  </p>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <Label
                    className={`text-sm font-medium text-muted-foreground ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "الوصف" : "Description"}
                  </Label>
                  <p
                    className={`mt-1 text-sm ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {submission.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      className={`text-sm font-medium text-muted-foreground ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "نوع التقديم" : "Submission Type"}
                    </Label>
                    <p
                      className={`mt-1 ${
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-sans text-left"
                      }`}>
                      {
                        submissionTypeOptions.find(
                          (opt) => opt.value === submission.submissionType
                        )?.label
                      }
                    </p>
                  </div>
                  <div>
                    <Label
                      className={`text-sm font-medium text-muted-foreground ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "الحالة" : "Status"}
                    </Label>
                    <div className="mt-1">
                      {getSubmissionStatusBadge(submission.status, language)}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label
                    className={`text-sm font-medium text-muted-foreground ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "تاريخ التقديم" : "Submitted At"}
                  </Label>
                  <p
                    className={`mt-1 ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {formatSubmissionDate(submission.submittedAt, language)}
                  </p>
                </div>

                {submission.notes && (
                  <>
                    <Separator />
                    <div>
                      <Label
                        className={`text-sm font-medium text-muted-foreground ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar"
                          ? "ملاحظات إضافية"
                          : "Additional Notes"}
                      </Label>
                      <p
                        className={`mt-1 ${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {submission.notes}
                      </p>
                    </div>
                  </>
                )}

                {submission.files && submission.files.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <Label
                        className={`text-sm font-medium text-muted-foreground ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar"
                          ? "الملفات المرفوعة"
                          : "Uploaded Files"}
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {submission.files.length}
                        </span>
                      </Label>
                      <div className="mt-3 space-y-3">
                        {submission.files.map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                              language === "ar" ? "flex-row-reverse" : ""
                            }`}>
                            {/* File Icon */}
                            <div className="flex-shrink-0">
                              {submission.submissionType === "pdf" && (
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-red-600" />
                                </div>
                              )}
                              {submission.submissionType === "photo" && (
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                  <Image className="w-5 h-5 text-green-600" />
                                </div>
                              )}
                              {submission.submissionType === "video" && (
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Video className="w-5 h-5 text-blue-600" />
                                </div>
                              )}
                            </div>

                            {/* File Details */}
                            <div
                              className={`flex-1 min-w-0 ${
                                language === "ar" ? "text-right" : "text-left"
                              }`}>
                              <p
                                className={`text-sm font-medium text-gray-900 truncate ${
                                  language === "ar"
                                    ? "font-arabic"
                                    : "font-sans"
                                }`}>
                                {file.name || `File ${index + 1}`}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {file.size && (
                                  <p
                                    className={`text-xs text-gray-500 ${
                                      language === "ar"
                                        ? "font-arabic"
                                        : "font-sans"
                                    }`}>
                                    {formatFileSize(file.size)}
                                  </p>
                                )}
                                {file.type && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <p
                                      className={`text-xs text-gray-500 ${
                                        language === "ar"
                                          ? "font-arabic"
                                          : "font-sans"
                                      }`}>
                                      {file.type}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* File Actions */}
                            <div className="flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                  // In a real app, this would download or open the file
                                  console.log("Download file:", file.name);
                                }}>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <DialogFooter
              className={`${language === "ar" ? "flex-row-reverse" : ""}`}>
              <Button type="button" variant="outline" onClick={onClose}>
                {language === "ar" ? "إغلاق" : "Close"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          /* Add/Edit Mode - Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submission Type Selection */}
            <div className="space-y-2">
              <Label
                className={`font-medium ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "نوع التقديم" : "Submission Type"} *
              </Label>
              <Select
                value={formData.submissionType}
                onValueChange={(value) =>
                  handleInputChange("submissionType", value)
                }>
                <SelectTrigger
                  className={`border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {submissionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.submissionType && (
                <p className="text-sm text-red-500">{errors.submissionType}</p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label
                className={`font-medium ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "العنوان" : "Title"} *
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل عنوان التقديم"
                    : "Enter submission title"
                }
                className={`border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                className={`font-medium ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "الوصف" : "Description"} *
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder={
                  language === "ar"
                    ? "أدخل وصف مفصل للتقديم"
                    : "Enter detailed description of the submission"
                }
                rows={4}
                className={`border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label
                className={`font-medium ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "ملاحظات إضافية" : "Additional Notes"}
                <span className="text-muted-foreground ml-1">
                  ({language === "ar" ? "اختياري" : "Optional"})
                </span>
              </Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل أي ملاحظات إضافية"
                    : "Enter any additional notes"
                }
                rows={3}
                className={`border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* File Upload Section */}
            {formData.submissionType !== "text" && (
              <div className="space-y-2">
                <Label
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {formData.submissionType === "pdf" &&
                    (language === "ar" ? "رفع ملفات PDF" : "Upload PDF Files")}
                  {formData.submissionType === "photo" &&
                    (language === "ar" ? "رفع الصور" : "Upload Photos")}
                  {formData.submissionType === "video" &&
                    (language === "ar" ? "رفع الفيديوهات" : "Upload Videos")}
                  <span className="text-muted-foreground ml-1">
                    ({language === "ar" ? "اختياري" : "Optional"})
                  </span>
                </Label>

                {/* File Upload Area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={triggerFileUpload}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={getAcceptedFileTypes(formData.submissionType)}
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center gap-2">
                    {formData.submissionType === "pdf" && (
                      <FileText className="w-8 h-8 text-gray-400" />
                    )}
                    {formData.submissionType === "photo" && (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                    {formData.submissionType === "video" && (
                      <Video className="w-8 h-8 text-gray-400" />
                    )}

                    <p
                      className={`text-sm text-gray-600 ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar"
                        ? "انقر لرفع الملفات أو اسحبها هنا"
                        : "Click to upload files or drag and drop"}
                    </p>

                    <p
                      className={`text-xs text-gray-500 ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {formData.submissionType === "pdf" &&
                        (language === "ar"
                          ? "PDF فقط، الحد الأقصى 10 ميجابايت"
                          : "PDF only, max 10MB")}
                      {formData.submissionType === "photo" &&
                        (language === "ar"
                          ? "صور فقط، الحد الأقصى 5 ميجابايت"
                          : "Images only, max 5MB")}
                      {formData.submissionType === "video" &&
                        (language === "ar"
                          ? "فيديوهات فقط، الحد الأقصى 50 ميجابايت"
                          : "Videos only, max 50MB")}
                    </p>
                  </div>
                </div>

                {/* Uploaded Files List */}
                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    <p
                      className={`text-sm font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar"
                        ? "الملفات المرفوعة:"
                        : "Uploaded Files:"}
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {formData.files.length}
                      </span>
                    </p>
                    <div className="space-y-3">
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          {/* File Icon */}
                          <div className="flex-shrink-0">
                            {formData.submissionType === "pdf" && (
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-red-600" />
                              </div>
                            )}
                            {formData.submissionType === "photo" && (
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Image className="w-5 h-5 text-green-600" />
                              </div>
                            )}
                            {formData.submissionType === "video" && (
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Video className="w-5 h-5 text-blue-600" />
                              </div>
                            )}
                          </div>

                          {/* File Details */}
                          <div
                            className={`flex-1 min-w-0 ${
                              language === "ar" ? "text-right" : "text-left"
                            }`}>
                            <p
                              className={`text-sm font-medium text-gray-900 truncate ${
                                language === "ar" ? "font-arabic" : "font-sans"
                              }`}>
                              {file.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {file.size && (
                                <p
                                  className={`text-xs text-gray-500 ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {formatFileSize(file.size)}
                                </p>
                              )}
                              {file.type && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <p
                                    className={`text-xs text-gray-500 ${
                                      language === "ar"
                                        ? "font-arabic"
                                        : "font-sans"
                                    }`}>
                                    {file.type}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="flex-shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-600 hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter
              className={`${language === "ar" ? "flex-row-reverse" : ""}`}>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]">
                {isSubmitting
                  ? language === "ar"
                    ? "جاري الحفظ..."
                    : "Saving..."
                  : isAddMode
                  ? language === "ar"
                    ? "إضافة"
                    : "Add"
                  : language === "ar"
                  ? "حفظ"
                  : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
