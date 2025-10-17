import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { newsApi } from "@/lib/newsApi";
import { toast } from "sonner";

const NewsModal = ({
  isOpen,
  onClose,
  mode = "add", // "add" or "edit"
  news = null,
  onSuccess,
  loading = false,
  language = "ar",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = language === "ar";

  // Reset form when modal opens/closes or news changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && news) {
        setFormData({
          title: news.title || "",
          subtitle: news.subtitle || "",
          description: news.description || "",
          date: news.date
            ? new Date(news.date).toISOString().split("T")[0]
            : "",
        });
        setImagePreview(
          news.imageUrl ? newsApi.getImageUrl(news.imageUrl) : null
        );
      } else {
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, mode, news]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.description) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "add") {
        await newsApi.createNews(loading, formData, imageFile);
        toast.success(
          language === "ar"
            ? "تم إنشاء الخبر بنجاح"
            : "News article created successfully"
        );
      } else {
        await newsApi.updateNews(
          loading,
          news._id || news.id,
          formData,
          imageFile
        );
        toast.success(
          language === "ar"
            ? "تم تحديث الخبر بنجاح"
            : "News article updated successfully"
        );
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      // Error saving news
      toast.error(
        language === "ar" ? "فشل في حفظ الخبر" : "Failed to save news article"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      date: "",
    });
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-2xl max-h-[90vh] overflow-y-auto p-6 ${
          isRTL ? "font-arabic" : "font-sans"
        }`}
        dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className={`${isRTL ? "text-right" : "text-left"}`}>
            {mode === "add"
              ? language === "ar"
                ? "إضافة خبر جديد"
                : "Add New News Article"
              : language === "ar"
              ? "تعديل الخبر"
              : "Edit News Article"}
          </DialogTitle>
          <DialogDescription
            className={`${isRTL ? "text-right" : "text-left"}`}>
            {mode === "add"
              ? language === "ar"
                ? "أدخل تفاصيل الخبر الجديد"
                : "Enter details for the new news article"
              : language === "ar"
              ? "قم بتعديل تفاصيل الخبر"
              : "Edit the news article details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={`${isRTL ? "text-right" : "text-left"}`}>
              {language === "ar" ? "العنوان *" : "Title *"}
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder={
                language === "ar" ? "أدخل عنوان الخبر" : "Enter news title"
              }
              className={`${isRTL ? "text-right" : "text-left"}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="subtitle"
              className={`${isRTL ? "text-right" : "text-left"}`}>
              {language === "ar" ? "العنوان الفرعي *" : "Subtitle *"}
            </Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder={
                language === "ar" ? "أدخل العنوان الفرعي" : "Enter subtitle"
              }
              className={`${isRTL ? "text-right" : "text-left"}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className={`${isRTL ? "text-right" : "text-left"}`}>
              {language === "ar" ? "الوصف *" : "Description *"}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={
                language === "ar" ? "أدخل وصف الخبر" : "Enter news description"
              }
              className={`min-h-[100px] ${isRTL ? "text-right" : "text-left"}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="date"
              className={`${isRTL ? "text-right" : "text-left"}`}>
              {language === "ar" ? "التاريخ" : "Date"}
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={`${isRTL ? "text-right" : "text-left"}`}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="image"
              className={`${isRTL ? "text-right" : "text-left"}`}>
              {language === "ar" ? "الصورة" : "Image"}
            </Label>
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full h-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer cursor-pointer file:transition-colors"
              />
            </div>
            {imagePreview && (
              <div className="mt-3">
                <p
                  className={`text-sm text-muted-foreground mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}>
                  {language === "ar" ? "معاينة الصورة:" : "Image Preview:"}
                </p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>

          <DialogFooter className={`${isRTL ? "flex-row-reverse" : ""}`}>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}>
              {language === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? language === "ar"
                  ? "جاري الحفظ..."
                  : "Saving..."
                : mode === "add"
                ? language === "ar"
                  ? "إنشاء"
                  : "Create"
                : language === "ar"
                ? "تحديث"
                : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
