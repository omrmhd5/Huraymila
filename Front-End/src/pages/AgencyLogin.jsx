import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
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
import { Building2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const AgencyLogin = () => {
  const { loginAgency } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isRTL = language === "ar";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email =
        language === "ar"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        language === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        language === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await loginAgency(formData.email, formData.password);

      if (result.success) {
        toast.success(
          language === "ar" ? "تم تسجيل الدخول بنجاح" : "Login successful"
        );
        navigate("/agency-dashboard");
      } else {
        toast.error(
          result.error ||
            (language === "ar" ? "فشل في تسجيل الدخول" : "Login failed")
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.message ||
          (language === "ar"
            ? "حدث خطأ أثناء تسجيل الدخول"
            : "An error occurred during login")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-background flex items-center justify-center p-4 ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle
            className={`text-2xl font-bold ${
              isRTL ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "تسجيل دخول الجهة" : "Agency Login"}
          </CardTitle>
          <CardDescription className={`${isRTL ? "font-arabic" : "font-sans"}`}>
            {language === "ar"
              ? "سجل دخولك للوصول إلى لوحة التحكم"
              : "Sign in to access your dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`${isRTL ? "font-arabic" : "font-sans"}`}>
                {language === "ar" ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  language === "ar"
                    ? "أدخل البريد الإلكتروني"
                    : "Enter your email"
                }
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`${errors.email ? "border-red-500" : ""} ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.email && (
                <p
                  className={`text-sm text-red-500 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`${isRTL ? "font-arabic" : "font-sans"}`}>
                {language === "ar" ? "كلمة المرور" : "Password"}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    language === "ar"
                      ? "أدخل كلمة المرور"
                      : "Enter your password"
                  }
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`${errors.password ? "border-red-500" : ""} ${
                    isRTL
                      ? "font-arabic text-right pr-10"
                      : "font-sans text-left pl-10"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`absolute top-0 h-full px-3 ${
                    isRTL ? "left-0" : "right-0"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p
                  className={`text-sm text-red-500 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className={`w-full ${isRTL ? "font-arabic" : "font-sans"}`}
              disabled={isLoading}>
              {isLoading
                ? language === "ar"
                  ? "جاري تسجيل الدخول..."
                  : "Signing in..."
                : language === "ar"
                ? "تسجيل الدخول"
                : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className={`text-sm ${isRTL ? "font-arabic" : "font-sans"}`}>
              {language === "ar"
                ? "العودة إلى الصفحة الرئيسية"
                : "Back to Home"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyLogin;
