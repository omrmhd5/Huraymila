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

const Auth = () => {
  const { language } = useTheme();
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

    try {
      // Mock implementation - simulate sign in
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set user in context
      await login({
        email: formData.email,
        role: "volunteer",
        name: formData.fullName || "User",
      });

      navigate("/");
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

  const content = {
    ar: {
      title: "مرحباً بك",
      subtitle: "سجل دخولك أو سجل كمتطوع جديد",
      signIn: "تسجيل الدخول",
      signUp: "سجل كمتطوع",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      signInButton: "دخول",
      signUpButton: "سجل كمتطوع",
      backToHome: "العودة للصفحة الرئيسية",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "••••••••",
      fullNamePlaceholder: "الاسم الكامل",
      phonePlaceholder: "+966 50 123 4567",
      hasAccount: "لديك حساب؟",
      noAccount: "ليس لديك حساب؟",
      switchToSignIn: "تسجيل الدخول",
      switchToSignUp: "سجل كمتطوع",
    },
    en: {
      title: "Hello, Welcome",
      subtitle: "Sign in or sign up as a volunteer",
      signIn: "Sign In",
      signUp: "Sign Up as Volunteer",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phone: "Phone Number",
      signInButton: "Sign In",
      signUpButton: "Sign Up as Volunteer",
      backToHome: "Back to Home",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "••••••••",
      fullNamePlaceholder: "Full Name",
      phonePlaceholder: "+966 50 123 4567",
      hasAccount: "Have an account?",
      noAccount: "Don't have an account?",
      switchToSignIn: "Sign In",
      switchToSignUp: "Sign Up as Volunteer",
    },
  };

  const current = content[language];

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
                  : "Harimlaa Healthy City"}
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
                  {current.title}
                </CardTitle>
                <CardDescription
                  className={cn(
                    language === "ar" ? "font-arabic" : "font-english"
                  )}>
                  {current.subtitle}
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
                      {current.signIn}
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className={cn(
                        "font-medium",
                        language === "ar" ? "font-arabic" : "font-english"
                      )}>
                      {current.signUp}
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
                          {current.email}
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
                            placeholder={current.emailPlaceholder}
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
                          {current.password}
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
                            placeholder={current.passwordPlaceholder}
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
                          current.signInButton
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
                          {current.fullName}
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
                            placeholder={current.fullNamePlaceholder}
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
                          {current.phone}
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
                            placeholder={current.phonePlaceholder}
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
                          {current.email}
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
                            placeholder={current.emailPlaceholder}
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
                          {current.password}
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
                            placeholder={current.passwordPlaceholder}
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
                          {current.confirmPassword}
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
                            placeholder={current.passwordPlaceholder}
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
                          current.signUpButton
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
                      {current.backToHome}
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
