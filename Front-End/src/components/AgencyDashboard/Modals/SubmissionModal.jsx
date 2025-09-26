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
  getStatusOptions,
  formatSubmissionDate,
  getSubmissionStatusBadge,
} from "@/lib/submissions";
import { Upload, X, File } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { agencyApi } from "@/lib/agencyApi";

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
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    status: "pending",
    files: [], // Array of uploaded files
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const statusOptions = getStatusOptions(language);

  // Initialize form data
  useEffect(() => {
    if (mode === "edit" && submission) {
      // Convert existing file URLs to file-like objects for display
      const existingFiles = (submission.filesUrls || []).map((url, index) => {
        const fileName = url.split("/").pop(); // Extract filename from URL
        return {
          name: fileName,
          url: url,
          size: 0, // We don't have size info for existing files
          type: "existing", // Mark as existing file
          isExisting: true,
        };
      });

      setFormData({
        title: submission.title || "",
        description: submission.description || "",
        notes: submission.notes || "",
        status: submission.status || "pending",
        files: existingFiles,
      });
    } else if (mode === "view" && submission) {
      // For view mode, also load existing files
      const existingFiles = (submission.filesUrls || []).map((url, index) => {
        const fileName = url.split("/").pop(); // Extract filename from URL
        return {
          name: fileName,
          url: url,
          size: 0,
          type: "existing",
          isExisting: true,
        };
      });

      setFormData({
        title: submission.title || "",
        description: submission.description || "",
        notes: submission.notes || "",
        status: submission.status || "pending",
        files: existingFiles,
      });
    } else if (mode === "add") {
      setFormData({
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
  const getMaxFileSize = () => {
    return 50 * 1024 * 1024; // 50MB for all files
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
    const maxSize = getMaxFileSize();

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

      return true;
    });

    if (validFiles.length > 0) {
      // Mark new files as not existing by adding a property to the File object
      const newFiles = validFiles.map((file) => {
        file.isExisting = false;
        return file;
      });

      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
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
      // Separate existing files from new files
      const existingFiles = formData.files.filter((file) => file.isExisting);
      const newFiles = formData.files.filter((file) => !file.isExisting);

      const submissionData = {
        title: formData.title,
        description: formData.description,
        notes: formData.notes,
        files: newFiles, // Only send new files for upload
        existingFiles: existingFiles, // Keep track of existing files
        standardId,
      };

      await onSubmit(submissionData);
      onClose();
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error(
        language === "ar"
          ? "حدث خطأ أثناء الحفظ"
          : "Error occurred while saving"
      );
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

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                    {language === "ar" ? "تاريخ الإنشاء" : "Created At"}
                  </Label>
                  <p
                    className={`mt-1 ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {formatSubmissionDate(submission.createdAt, language)}
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

                {formData.files && formData.files.length > 0 && (
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
                          {formData.files.length}
                        </span>
                      </Label>
                      <div className="mt-3 space-y-3">
                        {formData.files.map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                              language === "ar" ? "flex-row-reverse" : ""
                            }`}>
                            {/* File Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <File className="w-5 h-5 text-gray-600" />
                              </div>
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
                                {file.size > 0 && (
                                  <p
                                    className={`text-xs text-gray-500 ${
                                      language === "ar"
                                        ? "font-arabic"
                                        : "font-sans"
                                    }`}>
                                    {formatFileSize(file.size)}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* File Actions */}
                            <div className="flex-shrink-0">
                              {file.isExisting ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800"
                                  onClick={async () => {
                                    try {
                                      // Extract submission ID and filename from file URL
                                      // URL format: "/submissions/{submissionId}/{filename}"
                                      const urlParts = file.url.split("/");
                                      const submissionId = urlParts[2];
                                      const filename = urlParts[3];

                                      if (!token) {
                                        toast.error(
                                          "Please log in to download files"
                                        );
                                        return;
                                      }

                                      // Download using secure API
                                      const blob =
                                        await agencyApi.downloadSubmissionFile(
                                          token,
                                          submissionId,
                                          filename
                                        );

                                      // Create download link
                                      const url =
                                        window.URL.createObjectURL(blob);
                                      const a = document.createElement("a");
                                      a.href = url;
                                      a.download = filename;
                                      document.body.appendChild(a);
                                      a.click();
                                      window.URL.revokeObjectURL(url);
                                      document.body.removeChild(a);
                                    } catch (error) {
                                      console.error("Download error:", error);
                                      toast.error(
                                        language === "ar"
                                          ? "فشل في تحميل الملف"
                                          : "Failed to download file"
                                      );
                                    }
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
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => {
                                    // Preview new file (if possible)
                                    if (
                                      file.type &&
                                      file.type.startsWith("image/")
                                    ) {
                                      const url = URL.createObjectURL(file);
                                      window.open(url, "_blank");
                                    }
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
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </Button>
                              )}
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
                className={`border-2 border-gray-300 focus:ring-2 focus:ring-green-200 ${
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
                className={`border-2 border-gray-300 focus:ring-2 focus:ring-green-200 ${
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
                className={`border-2 border-gray-300 focus:ring-2 focus:ring-green-200 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <Label
                className={`font-medium ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "رفع الملفات" : "Upload Files"}
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
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />

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
                    {language === "ar"
                      ? "جميع أنواع الملفات مقبولة"
                      : "All file types accepted"}
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileUpload}
                    className="mt-2">
                    {language === "ar" ? "اختيار الملفات" : "Choose Files"}
                  </Button>
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
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
                            <File className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>

                        {/* File Details */}
                        <div
                          className={`flex-1 min-w-0 ${
                            language === "ar" ? "text-right" : "text-left"
                          }`}>
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-sm font-medium text-gray-900 truncate ${
                                language === "ar" ? "font-arabic" : "font-sans"
                              }`}>
                              {file.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {file.size > 0 && (
                              <p
                                className={`text-xs text-gray-500 ${
                                  language === "ar"
                                    ? "font-arabic"
                                    : "font-sans"
                                }`}>
                                {formatFileSize(file.size)}
                              </p>
                            )}
                            {file.type && file.type !== "existing" && (
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
