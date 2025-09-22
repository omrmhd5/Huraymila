import React from "react";
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

const InitiativeModal = ({
  isOpen,
  onClose,
  mode,
  initiative,
  formData,
  onFormChange,
  onSubmit,
  language,
}) => {
  // Modal-specific handlers
  const handleSubmit = () => {
    if (mode === "edit") {
      // Here you would typically update the initiative in your state/API
      console.log("Editing initiative:", initiative.id, formData);
    } else {
      // Here you would typically add the new initiative to your state/API
      console.log("Adding new initiative:", formData);
    }
    onSubmit();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {language === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add"
              ? language === "ar"
                ? "إضافة المبادرة"
                : "Add Initiative"
              : language === "ar"
              ? "حفظ التغييرات"
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitiativeModal;
