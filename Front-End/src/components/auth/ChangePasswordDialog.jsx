import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { changePassword } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, KeyRound, Eye, EyeOff } from "lucide-react";

export const ChangePasswordDialog = ({ open, onOpenChange }) => {
  const { language } = useTheme();
  const isRTL = language === "ar";
  const { token } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const t = {
    ar: {
      title: "تغيير كلمة المرور",
      currentLabel: "كلمة المرور الحالية",
      newLabel: "كلمة المرور الجديدة",
      confirmLabel: "تأكيد كلمة المرور الجديدة",
      currentPlaceholder: "أدخل كلمة المرور الحالية",
      newPlaceholder: "أدخل كلمة المرور الجديدة",
      confirmPlaceholder: "تأكيد كلمة المرور الجديدة",
      cancel: "إلغاء",
      save: "حفظ التغييرات",
      mismatch: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
      success: "تم تغيير كلمة المرور بنجاح",
      error: "فشل في تغيير كلمة المرور. يرجى التحقق من المدخلات.",
      lengthError: "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل",
    },
    en: {
      title: "Change Password",
      currentLabel: "Current Password",
      newLabel: "New Password",
      confirmLabel: "Confirm New Password",
      currentPlaceholder: "Enter current password",
      newPlaceholder: "Enter new password",
      confirmPlaceholder: "Confirm new password",
      cancel: "Cancel",
      save: "Save Changes",
      mismatch: "New password and confirmation do not match",
      success: "Password changed successfully",
      error: "Failed to change password. Please check your inputs.",
      lengthError: "Password must be at least 6 characters long",
    },
  }[isRTL ? "ar" : "en"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error(t.lengthError);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t.mismatch);
      return;
    }

    try {
      setLoading(true);
      await changePassword(currentPassword, newPassword, token);
      toast.success(t.success);
      // Reset fields & close
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold justify-start">
            <KeyRound className="w-5 h-5 text-primary" />
            <span>{t.title}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className={`text-sm font-semibold text-gray-700 block ${isRTL ? "text-right" : "text-left"}`}>
              {t.currentLabel}
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${isRTL ? "text-right pr-3 pl-10" : "text-left pl-3 pr-10"}`}
                placeholder={t.currentPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className={`absolute inset-y-0 ${isRTL ? "left-3" : "right-3"} flex items-center text-gray-400 hover:text-gray-600`}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className={`text-sm font-semibold text-gray-700 block ${isRTL ? "text-right" : "text-left"}`}>
              {t.newLabel}
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${isRTL ? "text-right pr-3 pl-10" : "text-left pl-3 pr-10"}`}
                placeholder={t.newPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className={`absolute inset-y-0 ${isRTL ? "left-3" : "right-3"} flex items-center text-gray-400 hover:text-gray-600`}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className={`text-sm font-semibold text-gray-700 block ${isRTL ? "text-right" : "text-left"}`}>
              {t.confirmLabel}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${isRTL ? "text-right pr-3 pl-10" : "text-left pl-3 pr-10"}`}
                placeholder={t.confirmPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={`absolute inset-y-0 ${isRTL ? "left-3" : "right-3"} flex items-center text-gray-400 hover:text-gray-600`}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex gap-2 justify-end pt-4 border-t mt-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/95 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <KeyRound className="w-4 h-4 mr-1" />
              )}
              {t.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
