import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { successStoryApi } from "@/lib/successStoryApi";
import { toast } from "sonner";

const SuccessStoryModal = ({
  isOpen,
  onClose,
  mode,
  successStory,
  onSuccess,
  loading = false,
  language,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    author: "",
    date: new Date(),
    quote: "",
    before: "",
    after: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const isRTL = language === "ar";

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && successStory) {
        setFormData({
          title: successStory.title || "",
          subtitle: successStory.subtitle || "",
          description: successStory.description || "",
          author: successStory.author || "",
          date: successStory.date ? new Date(successStory.date) : new Date(),
          quote: successStory.quote || "",
          before: successStory.before || "",
          after: successStory.after || "",
        });
        setImagePreview(
          successStory.imageUrl
            ? successStoryApi.getImageUrl(successStory.imageUrl)
            : null
        );
      } else {
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          author: "",
          date: new Date(),
          quote: "",
          before: "",
          after: "",
        });
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, mode, successStory]);

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
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the token passed as 'loading' prop from AdminDashboard
      const token = loading;

      if (!token) {
        toast.error(
          language === "ar"
            ? "خطأ في المصادقة. يرجى تسجيل الدخول مرة أخرى."
            : "Authentication error. Please login again."
        );
        return;
      }

      if (mode === "add") {
        await successStoryApi.createSuccessStory(token, formData, imageFile);
        toast.success(
          language === "ar"
            ? "تم إنشاء قصة النجاح بنجاح"
            : "Success story created successfully"
        );
      } else {
        await successStoryApi.updateSuccessStory(
          token,
          successStory.id,
          formData,
          imageFile
        );
        toast.success(
          language === "ar"
            ? "تم تحديث قصة النجاح بنجاح"
            : "Success story updated successfully"
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      // Error saving success story
      toast.error(
        language === "ar"
          ? "فشل في حفظ قصة النجاح: " + error.message
          : "Failed to save success story: " + error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] overflow-y-auto p-6 ${
          isRTL ? "font-arabic text-right" : "font-sans text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {mode === "add"
              ? language === "ar"
                ? "إضافة قصة نجاح جديدة"
                : "Add New Success Story"
              : language === "ar"
              ? "تعديل قصة النجاح"
              : "Edit Success Story"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? language === "ar"
                ? "أضف قصة نجاح جديدة للموقع"
                : "Add a new success story to the website"
              : language === "ar"
              ? "قم بتعديل تفاصيل قصة النجاح"
              : "Edit the success story details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === "ar" ? "العنوان" : "Title"} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل عنوان قصة النجاح"
                    : "Enter success story title"
                }
                required
                className={
                  isRTL ? "text-right font-arabic" : "text-left font-english"
                }
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Label htmlFor="subtitle">
                {language === "ar" ? "العنوان الفرعي" : "Subtitle"} *
              </Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder={
                  language === "ar" ? "أدخل العنوان الفرعي" : "Enter subtitle"
                }
                required
                className={
                  isRTL ? "text-right font-arabic" : "text-left font-english"
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {language === "ar" ? "الوصف" : "Description"} *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={
                language === "ar"
                  ? "أدخل وصف قصة النجاح"
                  : "Enter success story description"
              }
              rows={3}
              required
              className={
                isRTL ? "text-right font-arabic" : "text-left font-english"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">
                {language === "ar" ? "المؤلف" : "Author"} *
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder={
                  language === "ar" ? "أدخل اسم المؤلف" : "Enter author name"
                }
                required
                className={
                  isRTL ? "text-right font-arabic" : "text-left font-english"
                }
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>{language === "ar" ? "التاريخ" : "Date"} *</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !formData.date && "text-muted-foreground"
                    } ${isRTL ? "font-arabic" : "font-english"}`}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "dd/MM/yyyy")
                    ) : (
                      <span>
                        {language === "ar" ? "اختر التاريخ" : "Pick a date"}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      handleInputChange("date", date);
                      setDatePickerOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-2">
            <Label htmlFor="quote">
              {language === "ar" ? "الاقتباس" : "Quote"} *
            </Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => handleInputChange("quote", e.target.value)}
              placeholder={
                language === "ar"
                  ? "أدخل اقتباس من قصة النجاح"
                  : "Enter a quote from the success story"
              }
              rows={2}
              required
              className={
                isRTL ? "text-right font-arabic" : "text-left font-english"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-2">
              <Label htmlFor="before">
                {language === "ar" ? "قبل" : "Before"} *
              </Label>
              <Textarea
                id="before"
                value={formData.before}
                onChange={(e) => handleInputChange("before", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "وصف الحالة قبل المبادرة"
                    : "Describe the situation before the initiative"
                }
                rows={3}
                required
                className={
                  isRTL ? "text-right font-arabic" : "text-left font-english"
                }
              />
            </div>

            {/* After */}
            <div className="space-y-2">
              <Label htmlFor="after">
                {language === "ar" ? "بعد" : "After"} *
              </Label>
              <Textarea
                id="after"
                value={formData.after}
                onChange={(e) => handleInputChange("after", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "وصف الحالة بعد المبادرة"
                    : "Describe the situation after the initiative"
                }
                rows={3}
                required
                className={
                  isRTL ? "text-right font-arabic" : "text-left font-english"
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">
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
                <Label className="text-sm text-muted-foreground mb-2 block">
                  {language === "ar" ? "معاينة الصورة" : "Image Preview"}
                </Label>
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-sm"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={removeImage}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
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
              className="bg-primary hover:bg-primary/90">
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {language === "ar" ? "جاري الحفظ..." : "Saving..."}
                </div>
              ) : mode === "add" ? (
                language === "ar" ? (
                  "إنشاء"
                ) : (
                  "Create"
                )
              ) : language === "ar" ? (
                "تحديث"
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessStoryModal;
