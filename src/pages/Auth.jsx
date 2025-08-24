import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { ArrowRight, Building2, Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("preferred-language");
    return saved === "ar" || saved === "en" ? saved : "ar";
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("preferred-theme");
    return saved === "light" || saved === "dark" ? saved : "light";
  });

  // Apply theme and language settings
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    localStorage.setItem("preferred-language", language);
    localStorage.setItem("preferred-theme", theme);
  }, [theme, language]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    userType: "volunteer",
    organizationName: "",
    organizationDescription: "",
    volunteerSkills: "",
    volunteerInterests: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock implementation - simulate sign in
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);

    try {
      // Mock implementation - simulate sign up
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        "تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني لتأكيد الحساب"
      );
      setActiveTab("signin");
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground",
        language === "ar" ? "font-arabic" : "font-english"
      )}>
      <Header
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="pt-16 pb-8">
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                مرحباً بك
              </h1>
              <p className="text-muted-foreground">
                سجل دخولك أو أنشئ حساباً جديداً للمتابعة
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="text-sm">
                    تسجيل الدخول
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm">
                    حساب جديد
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
                      <CardDescription>
                        أدخل بياناتك للوصول إلى حسابك
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">
                            البريد الإلكتروني
                          </Label>
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="أدخل بريدك الإلكتروني"
                            value={signInData.email}
                            onChange={(e) =>
                              setSignInData({
                                ...signInData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">كلمة المرور</Label>
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="أدخل كلمة المرور"
                            value={signInData.password}
                            onChange={(e) =>
                              setSignInData({
                                ...signInData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loading}>
                          {loading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              تسجيل الدخول
                              <ArrowRight className="mr-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="signup">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">حساب جديد</CardTitle>
                      <CardDescription>
                        أنشئ حساباً جديداً للانضمام إلينا
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-3">
                          <Label>نوع الحساب</Label>
                          <RadioGroup
                            value={signUpData.userType}
                            onValueChange={(value) =>
                              setSignUpData({ ...signUpData, userType: value })
                            }
                            className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="volunteer" id="volunteer" />
                              <Label
                                htmlFor="volunteer"
                                className="flex items-center gap-2 cursor-pointer">
                                <Heart className="h-4 w-4 text-primary" />
                                متطوع
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                              <RadioGroupItem
                                value="organization"
                                id="organization"
                              />
                              <Label
                                htmlFor="organization"
                                className="flex items-center gap-2 cursor-pointer">
                                <Building2 className="h-4 w-4 text-primary" />
                                جهة
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="البريد الإلكتروني"
                              value={signUpData.email}
                              onChange={(e) =>
                                setSignUpData({
                                  ...signUpData,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fullName">الاسم الكامل</Label>
                            <Input
                              id="fullName"
                              placeholder="الاسم الكامل"
                              value={signUpData.fullName}
                              onChange={(e) =>
                                setSignUpData({
                                  ...signUpData,
                                  fullName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="رقم الهاتف"
                            value={signUpData.phone}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="كلمة المرور"
                              value={signUpData.password}
                              onChange={(e) =>
                                setSignUpData({
                                  ...signUpData,
                                  password: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                              تأكيد كلمة المرور
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="تأكيد كلمة المرور"
                              value={signUpData.confirmPassword}
                              onChange={(e) =>
                                setSignUpData({
                                  ...signUpData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        {signUpData.userType === "organization" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="organizationName">
                                اسم الجهة
                              </Label>
                              <Input
                                id="organizationName"
                                placeholder="اسم الجهة أو المؤسسة"
                                value={signUpData.organizationName}
                                onChange={(e) =>
                                  setSignUpData({
                                    ...signUpData,
                                    organizationName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="organizationDescription">
                                وصف الجهة
                              </Label>
                              <Textarea
                                id="organizationDescription"
                                placeholder="وصف مختصر عن الجهة وأنشطتها"
                                value={signUpData.organizationDescription}
                                onChange={(e) =>
                                  setSignUpData({
                                    ...signUpData,
                                    organizationDescription: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}

                        {signUpData.userType === "volunteer" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="volunteerSkills">
                                المهارات (اختياري)
                              </Label>
                              <Input
                                id="volunteerSkills"
                                placeholder="المهارات، مفصولة بفواصل"
                                value={signUpData.volunteerSkills}
                                onChange={(e) =>
                                  setSignUpData({
                                    ...signUpData,
                                    volunteerSkills: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="volunteerInterests">
                                الاهتمامات (اختياري)
                              </Label>
                              <Input
                                id="volunteerInterests"
                                placeholder="الاهتمامات، مفصولة بفواصل"
                                value={signUpData.volunteerInterests}
                                onChange={(e) =>
                                  setSignUpData({
                                    ...signUpData,
                                    volunteerInterests: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loading}>
                          {loading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              إنشاء الحساب
                              <ArrowRight className="mr-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
