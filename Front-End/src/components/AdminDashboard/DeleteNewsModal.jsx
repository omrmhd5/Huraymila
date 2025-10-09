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

const DeleteNewsModal = ({
  isOpen,
  onClose,
  news,
  onConfirm,
  loading = false,
  language,
}) => {
  // Modal-specific handler
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        className={`${
          language === "ar" ? "font-arabic text-right" : "font-sans text-left"
        }`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {language === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {language === "ar"
              ? `هل أنت متأكد من حذف الخبر "${news?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`
              : `Are you sure you want to delete the news article "${news?.title}"? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {language === "ar" ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {language === "ar" ? "جاري الحذف..." : "Deleting..."}
              </div>
            ) : language === "ar" ? (
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

export default DeleteNewsModal;
