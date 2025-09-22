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

const DeleteInitiativeModal = ({
  isOpen,
  onClose,
  initiative,
  onConfirm,
  language,
}) => {
  // Modal-specific handler
  const handleConfirm = () => {
    // Here you would typically delete the initiative from your state/API
    console.log("Deleting initiative:", initiative.id);
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
              ? `هل أنت متأكد من حذف المبادرة "${initiative?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`
              : `Are you sure you want to delete the initiative "${initiative?.title}"? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {language === "ar" ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700">
            {language === "ar" ? "حذف" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInitiativeModal;
