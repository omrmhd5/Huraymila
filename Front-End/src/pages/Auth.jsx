import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Auth = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    phone: "",
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError(
        language === "ar"
          ? "البريد الإلكتروني وكلمة المرور مطلوبان"
          : "Email and password are required"
      );
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect based on user type
        navigate(result.redirectTo || "/");
      } else {
        setError(
          result.error ||
            (language === "ar"
              ? "بيانات الدخول غير صحيحة"
              : "Invalid credentials")
        );
      }
    } catch (err) {
      setError(
        language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError(
        language === "ar"
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match"
      );
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(
        language === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters"
      );
      setLoading(false);
      return;
    }

    try {
      // Mock implementation - simulate sign up
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(
        language === "ar"
          ? "تم إنشاء الحساب بنجاح! تم تسجيل الدخول تلقائياً"
          : "Account created successfully! You are now signed in"
      );

      // Auto-login after successful signup
      await login({
        email: formData.email,
        role: "volunteer",
        name: formData.fullName,
        phone: formData.phone,
      });

      // Clear form
      setFormData({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
        phone: "",
      });

      // Redirect to home after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Content is now handled by the language context

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
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "مبادرة وطنية للمدن الصحية"
                  : "National Initiative for Healthy Cities"}
              </p>
            </div>

            {/* Auth Card */}
            <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle
                  className={cn(
                    "text-2xl",
                    language === "ar" ? "font-arabic" : "font-english"
                  )}>
                  {t("auth.title")}
                </CardTitle>
                <CardDescription
                  className={cn(
                    language === "ar" ? "font-arabic" : "font-english"
                  )}>
                  {t("auth.subtitle")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="signin"
                      className={cn(
                        "font-medium",
                        language === "ar" ? "font-arabic" : "font-english"
                      )}>
                      {t("auth.signIn")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className={cn(
                        "font-medium",
                        language === "ar" ? "font-arabic" : "font-english"
                      )}>
                      {t("auth.signUp")}
                    </TabsTrigger>
                  </TabsList>

                  {/* Error/Success Alert */}
                  {error && (
                    <Alert className="mb-4 border-destructive/50 text-destructive">
                      <AlertDescription
                        className={cn(
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-english"
                        )}>
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mb-4 border-green-500/50 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400">
                      <AlertDescription
                        className={cn(
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-english"
                        )}>
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Sign In Tab */}
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="signin-email"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.email")}
                        </Label>
                        <div className="relative">
                          <Mail
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("auth.emailPlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar" ? "pr-10 text-right" : "pl-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signin-password"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.password")}
                        </Label>
                        <div className="relative">
                          <Lock
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signin-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={t("auth.passwordPlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar"
                                ? "pr-10 pl-10 text-right"
                                : "pl-10 pr-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={cn(
                              "absolute top-3 w-4 h-4 text-muted-foreground hover:text-foreground",
                              language === "ar" ? "left-3" : "right-3"
                            )}>
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className={cn(
                          "w-full h-12 font-medium",
                          language === "ar" ? "font-arabic" : "font-english"
                        )}
                        disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {language === "ar"
                              ? "جاري التحميل..."
                              : "Loading..."}
                          </>
                        ) : (
                          t("auth.signInButton")
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Sign Up Tab */}
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="signup-name"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.fullName")}
                        </Label>
                        <div className="relative">
                          <User
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signup-name"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={t("auth.fullNamePlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar" ? "pr-10 text-right" : "pl-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signup-phone"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.phone")}
                        </Label>
                        <div className="relative">
                          <Phone
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signup-phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t("auth.phonePlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar" ? "pr-10 text-right" : "pl-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signup-email"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.email")}
                        </Label>
                        <div className="relative">
                          <Mail
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("auth.emailPlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar" ? "pr-10 text-right" : "pl-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signup-password"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.password")}
                        </Label>
                        <div className="relative">
                          <Lock
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={t("auth.passwordPlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar"
                                ? "pr-10 pl-10 text-right"
                                : "pl-10 pr-10"
                            )}
                            dir={language === "ar" ? "rtl" : "ltr"}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={cn(
                              "absolute top-3 w-4 h-4 text-muted-foreground hover:text-foreground",
                              language === "ar" ? "left-3" : "right-3"
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
                          htmlFor="signup-confirm"
                          className={cn(
                            language === "ar" ? "font-arabic" : "font-english"
                          )}>
                          {t("auth.confirmPassword")}
                        </Label>
                        <div className="relative">
                          <Lock
                            className={cn(
                              "absolute w-4 h-4 text-muted-foreground top-1/2 -translate-y-1/2",
                              language === "ar" ? "right-3" : "left-3"
                            )}
                          />
                          <Input
                            id="signup-confirm"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder={t("auth.passwordPlaceholder")}
                            className={cn(
                              "h-12",
                              language === "ar" ? "pr-10 text-right" : "pl-10"
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
                          language === "ar" ? "font-arabic" : "font-english"
                        )}
                        disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {language === "ar"
                              ? "جاري التحميل..."
                              : "Loading..."}
                          </>
                        ) : (
                          t("auth.signUpButton")
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Back to Home */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full",
                        language === "ar" ? "font-arabic" : "font-english"
                      )}>
                      {t("auth.backToHome")}
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

export default Auth;
