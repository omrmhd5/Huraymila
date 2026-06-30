import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!token || !email) {
      setError(
        language === "ar"
          ? "رابط إعادة تعيين كلمة المرور غير صالح أو مفقود"
          : "Invalid or missing password reset link",
      );
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(
        language === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters",
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(
        language === "ar"
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match",
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
        }/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(
          language === "ar"
            ? "تم إعادة تعيين كلمة المرور بنجاح! جاري تحويلك لصفحة تسجيل الدخول..."
            : "Password has been reset successfully! Redirecting to login...",
        );
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      } else {
        setError(
          data.message ||
            (language === "ar"
              ? "فشل في إعادة تعيين كلمة المرور. قد يكون الرابط قد انتهت صلاحيته."
              : "Failed to reset password. The link might have expired."),
        );
      }
    } catch (err) {
      setError(
        language === "ar"
          ? "حدث خطأ غير متوقع"
          : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 pb-8">
        <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">ح</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {language === "ar"
                  ? "مدينة حريملاء الصحية"
                  : "Huraymila Healthy City"}
              </h1>
            </div>

            {/* Reset Card */}
            <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle
                  className={cn(
                    "text-2xl",
                    language === "ar" ? "font-arabic" : "font-english",
                  )}>
                  {language === "ar"
                    ? "إعادة تعيين كلمة المرور"
                    : "Reset Password"}
                </CardTitle>
                <CardDescription
                  className={cn(
                    language === "ar" ? "font-arabic" : "font-english",
                  )}>
                  {language === "ar"
                    ? "أدخل كلمة المرور الجديدة لحسابك"
                    : "Enter your new account password"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Error Alert */}
                {error && (
                  <Alert className="mb-4 border-destructive/50 text-destructive">
                    <AlertDescription
                      className={cn(
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-english",
                      )}>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {success && (
                  <Alert className="mb-4 border-green-500/50 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400">
                    <AlertDescription
                      className={cn(
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-english",
                      )}>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{success}</span>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {!token || !email ? (
                  <div className="space-y-4 text-center py-4">
                    <p className={cn(
                      "text-destructive text-sm font-medium",
                      language === "ar" ? "font-arabic" : "font-english"
                    )}>
                      {language === "ar"
                        ? "الرابط غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد."
                        : "The link is invalid or expired. Please request a new one."}
                    </p>
                    <Link to="/auth">
                      <Button className="w-full mt-2">
                        {language === "ar" ? "الذهاب لطلب رابط جديد" : "Request Reset Link"}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-password"
                        className={cn(
                          language === "ar" ? "font-arabic" : "font-english",
                        )}>
                        {language === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                      </Label>
                      <div className="relative">
                        <Lock
                          className={cn(
                            "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                            language === "ar" ? "right-3" : "left-3",
                          )}
                        />
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={language === "ar" ? "أدخل كلمة المرور الجديدة" : "Enter new password"}
                          className={cn(
                            "h-12",
                            language === "ar"
                              ? "pr-10 pl-10 text-right"
                              : "pl-10 pr-10",
                          )}
                          dir={language === "ar" ? "rtl" : "ltr"}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={cn(
                            "absolute top-3 w-4 h-4 text-muted-foreground hover:text-foreground",
                            language === "ar" ? "left-3" : "right-3",
                          )}>
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className={cn(
                          language === "ar" ? "font-arabic" : "font-english",
                        )}>
                        {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                      </Label>
                      <div className="relative">
                        <Lock
                          className={cn(
                            "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                            language === "ar" ? "right-3" : "left-3",
                          )}
                        />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Re-enter new password"}
                          className={cn(
                            "h-12",
                            language === "ar" ? "pr-10 text-right" : "pl-10",
                          )}
                          dir={language === "ar" ? "rtl" : "ltr"}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={cn(
                        "w-full h-12 font-medium",
                        language === "ar" ? "font-arabic" : "font-english",
                      )}
                      disabled={loading || success}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === "ar" ? "جاري الحفظ..." : "Saving..."}
                        </>
                      ) : (
                        language === "ar" ? "تحديث كلمة المرور" : "Update Password"
                      )}
                    </Button>
                  </form>
                )}

                {/* Back to Login */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <Link to="/auth">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full",
                        language === "ar" ? "font-arabic" : "font-english",
                      )}>
                      {language === "ar" ? "العودة لتسجيل الدخول" : "Back to Login"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
