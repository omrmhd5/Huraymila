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
import { Loader2 } from "lucide-react";
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
    author: "",
    email: "",
    phone: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRTL = language === "ar";

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && successStory) {
        setFormData({
          author: successStory.author || "",
          email: successStory.email || "",
          phone: successStory.phone || "",
          description: successStory.description || "",
        });
      } else {
        setFormData({
          author: "",
          email: "",
          phone: "",
          description: "",
        });
      }
    }
  }, [isOpen, mode, successStory]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = loading;

      if (!token) {
        toast.error(
          language === "ar"
            ? "خطأ في المصادقة. يرجى تسجيل الدخول مرة أخرى."
            : "Authentication error. Please login again."
        );
        return;
      }

      // Build the payload matching the backend schema
      const payload = {
        author: formData.author,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
        // Required legacy fields — kept minimal
        title: formData.author + " - قصة نجاح",
        subtitle: "قصة نجاح",
        quote: formData.description,
        before: "—",
        after: "—",
      };

      if (mode === "add") {
        await successStoryApi.createSuccessStory(token, payload, null);
        toast.success(
          language === "ar"
            ? "تم إنشاء قصة النجاح بنجاح"
            : "Success story created successfully"
        );
      } else {
        await successStoryApi.updateSuccessStory(
          token,
          successStory.id || successStory._id,
          payload,
          null
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
        className={`max-w-lg max-h-[90vh] overflow-y-auto p-6 ${
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

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="author">
              {language === "ar" ? "الاسم الكامل" : "Full Name"} *
            </Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder={language === "ar" ? "أدخل الاسم الكامل" : "Enter full name"}
              required
              className={isRTL ? "text-right font-arabic" : "text-left font-english"}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === "ar" ? "البريد الإلكتروني" : "Email"}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder={language === "ar" ? "أدخل البريد الإلكتروني" : "Enter email address"}
              className={isRTL ? "text-right font-arabic" : "text-left font-english"}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === "ar" ? "رقم الهاتف" : "Phone Number"}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder={language === "ar" ? "0501234567" : "0501234567"}
              className={isRTL ? "text-right font-arabic" : "text-left font-english"}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {language === "ar" ? "الرسالة" : "Message"} *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={language === "ar" ? "اكتب قصة النجاح هنا..." : "Write the success story here..."}
              rows={5}
              required
              className={isRTL ? "text-right font-arabic" : "text-left font-english"}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
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
                language === "ar" ? "إنشاء" : "Create"
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
