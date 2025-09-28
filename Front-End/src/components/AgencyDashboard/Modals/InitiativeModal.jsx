import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Upload } from "lucide-react";

const InitiativeModal = ({
  isOpen,
  onClose,
  mode,
  initiative,
  formData,
  onFormChange,
  onSubmit,
  loading = false,
  language,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Clear image when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setImageFile(null);
      setImagePreview(null);
      // Reset the file input when modal closes
      const fileInput = document.getElementById("initiative-image");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  }, [isOpen]);

  // Reset image state when switching between different initiatives or modes
  React.useEffect(() => {
    if (isOpen) {
      // Only reset if this is a different initiative or switching from edit to add
      const shouldReset = !initiative?.id || mode === "add";
      if (shouldReset) {
        setImageFile(null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById("initiative-image");
        if (fileInput) {
          fileInput.value = "";
        }
      }
    }
  }, [isOpen, mode, initiative?.id]);
  // Modal-specific handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.maxVolunteers
    ) {
      alert(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    onSubmit(formData, imageFile);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-h-[90vh] overflow-y-auto ${
          language === "ar" ? "font-arabic text-right" : "font-sans text-left"
        }`}>
        <DialogHeader>
          <DialogTitle>
            {mode === "add"
              ? language === "ar"
                ? "إضافة مبادرة جديدة"
                : "Add New Initiative"
              : language === "ar"
              ? "تعديل المبادرة"
              : "Edit Initiative"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? language === "ar"
                ? "قم بإنشاء مبادرة جديدة"
                : "Create a new initiative"
              : language === "ar"
              ? "قم بتعديل تفاصيل المبادرة"
              : "Update the initiative details"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="initiative-title">
              {language === "ar" ? "اسم المبادرة" : "Initiative Name"}
            </Label>
            <Input
              id="initiative-title"
              value={formData.title}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  title: e.target.value,
                })
              }
              className={`border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 ${
                language === "ar"
                  ? "font-arabic text-right"
                  : "font-sans text-left"
              }`}
              placeholder={
                language === "ar"
                  ? "أدخل اسم المبادرة"
                  : "Enter initiative name"
              }
            />
          </div>
          <div>
            <Label htmlFor="initiative-description">
              {language === "ar" ? "الوصف" : "Description"}
            </Label>
            <Textarea
              id="initiative-description"
              value={formData.description}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  description: e.target.value,
                })
              }
              className={`border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 ${
                language === "ar"
                  ? "font-arabic text-right"
                  : "font-sans text-left"
              }`}
              rows={3}
              placeholder={
                language === "ar"
                  ? "أدخل وصف المبادرة"
                  : "Enter initiative description"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="initiative-startDate">
                {language === "ar" ? "تاريخ البداية" : "Start Date"}
              </Label>
              <Input
                id="initiative-startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    startDate: e.target.value,
                  })
                }
                className="border-2 border-gray-300 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label htmlFor="initiative-endDate">
                {language === "ar" ? "تاريخ الانتهاء" : "End Date"}
              </Label>
              <Input
                id="initiative-endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    endDate: e.target.value,
                  })
                }
                className="border-2 border-gray-300 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="initiative-status">
                {language === "ar" ? "الحالة" : "Status"}
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  onFormChange({ ...formData, status: value })
                }>
                <SelectTrigger
                  className={`border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 ${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="completed"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "مكتمل" : "Completed"}
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "نشط" : "Active"}
                  </SelectItem>
                  <SelectItem
                    value="cancelled"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "ملغي" : "Cancelled"}
                  </SelectItem>
                  <SelectItem
                    value="gathering volunteers"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "جمع المتطوعين"
                      : "Gathering Volunteers"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="initiative-maxVolunteers">
                {language === "ar"
                  ? "العدد الأقصى للمتطوعين"
                  : "Max Volunteers"}
              </Label>
              <Input
                id="initiative-maxVolunteers"
                type="number"
                value={formData.maxVolunteers}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    maxVolunteers: parseInt(e.target.value) || 0,
                  })
                }
                min="1"
                className={`border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 ${
                  language === "ar"
                    ? "font-arabic text-right"
                    : "font-sans text-left"
                }`}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="initiative-image">
              {language === "ar" ? "صورة المبادرة" : "Initiative Image"}
            </Label>
            <div className="mt-2">
              <Input
                id="initiative-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  document.getElementById("initiative-image").click()
                }
                className={`w-full h-24 border-2 border-dashed border-gray-300 hover:border-gray-400 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}>
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span
                    className={`text-sm text-gray-500 ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {language === "ar" ? "اختر صورة" : "Choose Image"}
                  </span>
                </div>
              </Button>
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <p
                    className={`text-xs text-green-600 mt-1 font-medium ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {language === "ar"
                      ? "صورة جديدة محددة"
                      : "New image selected"}
                  </p>
                </div>
              )}
              {mode === "edit" && initiative?.imageUrl && !imagePreview && (
                <div className="mt-3">
                  <img
                    src={`${
                      import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
                      "http://localhost:5000"
                    }${initiative.imageUrl}`}
                    alt="Current initiative image"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {language === "ar" ? "الصورة الحالية" : "Current image"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {language === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {language === "ar" ? "جاري المعالجة..." : "Processing..."}
              </div>
            ) : mode === "add" ? (
              language === "ar" ? (
                "إضافة المبادرة"
              ) : (
                "Add Initiative"
              )
            ) : language === "ar" ? (
              "حفظ التغييرات"
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitiativeModal;
