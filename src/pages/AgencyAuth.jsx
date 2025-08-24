import React, { useState, useEffect } from "react";
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
import { Eye, EyeOff, Building2, Shield, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";

const AgencyAuth = () => {
  const { language } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agencyName: "",
    contactName: "",
  });

  const isRTL = language === "ar";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/agency-dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", formData);

    try {
      if (isLogin) {
        // Mock implementation - simulate sign in
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success(
          isRTL ? "تم تسجيل الدخول بنجاح" : "Login successful"
        );
        navigate("/agency-dashboard");
      } else {
        // Mock implementation - simulate sign up
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success(
          isRTL
            ? "تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني"
            : "Account created successfully! Check your email"
        );
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(
        isRTL ? "حدث خطأ غير متوقع" : "Unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4",
        language === "ar" ? "font-arabic" : "font-english"
      )}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1
            className={cn(
              "text-3xl font-bold text-foreground mb-2",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL ? "نظام متابعة المعايير" : "Criteria Tracking System"}
          </h1>
          <p
            className={cn(
              "text-muted-foreground",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL
              ? "للجهات الحكومية - مدينة حريملاء الصحية"
              : "Government Agencies - Harimlaa Healthy City"}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle
                className={cn(
                  "text-xl",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {isLogin
                  ? isRTL
                    ? "تسجيل الدخول"
                    : "Login"
                  : isRTL
                  ? "إنشاء حساب جديد"
                  : "Create New Account"}
              </CardTitle>
            </div>
            <CardDescription
              className={cn(isRTL ? "font-arabic" : "font-english")}>
              {isLogin
                ? isRTL
                  ? "أدخل بيانات حسابك للوصول إلى النظام"
                  : "Enter your account details to access the system"
                : isRTL
                ? "إنشاء حساب جديد للجهة الحكومية"
                : "Create a new account for the government agency"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="agencyName"
                      className={cn(
                        "block",
                        isRTL
                          ? "font-arabic text-right"
                          : "font-english text-left"
                      )}>
                      {isRTL ? "اسم الجهة" : "Agency Name"}
                    </Label>
                    <Input
                      id="agencyName"
                      type="text"
                      placeholder={
                        isRTL
                          ? "مثال: البلدية، وزارة الصحة..."
                          : "Example: Municipality, Ministry of Health..."
                      }
                      value={formData.agencyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          agencyName: e.target.value,
                        }))
                      }
                      className={cn(
                        isRTL
                          ? "text-right font-arabic"
                          : "text-left font-english"
                      )}
                      dir={isRTL ? "rtl" : "ltr"}
                      required={!isLogin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contactName"
                      className={cn(
                        "block",
                        isRTL
                          ? "font-arabic text-right"
                          : "font-english text-left"
                      )}>
                      {isRTL ? "اسم المسؤول" : "Contact Name"}
                    </Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder={
                        isRTL
                          ? "الاسم الكامل للمسؤول"
                          : "Full name of the responsible person"
                      }
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactName: e.target.value,
                        }))
                      }
                      className={cn(
                        isRTL
                          ? "text-right font-arabic"
                          : "text-left font-english"
                      )}
                      dir={isRTL ? "rtl" : "ltr"}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={cn(
                    "block",
                    isRTL
                      ? "font-arabic text-right"
                      : "font-english text-left"
                  )}>
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agency@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="text-left"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={cn(
                    "block",
                    isRTL
                      ? "font-arabic text-right"
                      : "font-english text-left"
                  )}>
                  {isRTL ? "كلمة المرور" : "Password"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="text-left pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className={cn(
                  "w-full text-lg h-12",
                  isRTL ? "font-arabic" : "font-english"
                )}
                disabled={loading}>
                {loading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : isLogin ? (
                  isRTL ? "دخول" : "Login"
                ) : (
                  isRTL ? "إنشاء الحساب" : "Create Account"
                )}
              </Button>
            </form>

            {/* Test Account Info */}
            {isLogin && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
                <h4
                  className={cn(
                    "text-sm font-semibold text-foreground mb-2",
                    isRTL ? "font-arabic text-right" : "font-english text-left"
                  )}>
                  {isRTL ? "حساب تجريبي للاختبار:" : "Test Account for Demo:"}
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="bg-background/50 p-3 rounded border">
                    <p className="flex justify-between mb-1">
                      <span>{isRTL ? "البريد:" : "Email:"}</span>
                      <span className="font-mono">admin@moh.gov.sa</span>
                    </p>
                    <p className="flex justify-between">
                      <span>{isRTL ? "كلمة المرور:" : "Password:"}</span>
                      <span className="font-mono">admin123</span>
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          email: "admin@moh.gov.sa",
                          password: "admin123",
                        }));
                        toast.success(
                          isRTL ? "تم تعبئة البيانات" : "Credentials filled"
                        );
                      }}
                      className={cn(
                        "w-full text-xs bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 transition-colors",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {isRTL
                        ? "املأ البيانات وجرب تسجيل الدخول"
                        : "Fill credentials and try login"}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-dashed">
                    <p
                      className={cn(
                        "text-center text-xs text-muted-foreground",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {isRTL
                        ? "إذا لم يعمل الحساب التجريبي، يمكنك إنشاء حساب جديد بسهولة"
                        : "If test account doesn't work, you can easily create a new account"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className={cn(
                  "text-primary hover:text-primary/80 transition-colors text-sm",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {isLogin
                  ? isRTL
                    ? "ليس لديك حساب؟ إنشاء حساب جديد"
                    : "Don't have an account? Create new account"
                  : isRTL
                  ? "لديك حساب؟ تسجيل الدخول"
                  : "Have an account? Login"}
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL
              ? "جميع الحقوق محفوظة © 2024 مدينة حريملاء الصحية"
              : "All rights reserved © 2024 Harimlaa Healthy City"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgencyAuth;
