import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const DeleteSuccessStoryModal = ({
  isOpen,
  onClose,
  successStory,
  onConfirm,
  loading = false,
  language,
}) => {
  const isRTL = language === "ar";

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        className={`${
          isRTL ? "font-arabic text-right" : "font-sans text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isRTL ? "تأكيد الحذف" : "Confirm Delete"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isRTL
              ? `هل أنت متأكد من حذف قصة النجاح "${successStory?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`
              : `Are you sure you want to delete the success story "${successStory?.title}"? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={`${isRTL ? "flex-row-reverse" : ""}`}>
          <AlertDialogCancel disabled={loading}>
            {isRTL ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isRTL ? "جاري الحذف..." : "Deleting..."}
              </div>
            ) : isRTL ? (
              "حذف"
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSuccessStoryModal;
