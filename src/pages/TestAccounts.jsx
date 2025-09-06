import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import {
  User,
  Shield,
  Building,
  Heart,
  Loader2,
  Play,
  UserPlus,
} from "lucide-react";

const TestAccounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useTheme();

  const testUsers = [
    {
      email: "admin@test.sa",
      password: "admin123",
      name: language === "ar" ? "مدير النظام" : "System Administrator",
      type: language === "ar" ? "مدير" : "Admin",
      description:
        language === "ar"
          ? "حساب المدير العام - يمكنه الوصول لجميع الميزات ولوحة التحكم"
          : "General administrator account - can access all features and dashboard",
      icon: Shield,
      color: "bg-red-500",
    },
    {
      email: "agency@test.sa",
      password: "agency123",
      name: language === "ar" ? "جهة الصحة" : "Health Agency",
      type: language === "ar" ? "جهة" : "Agency",
      description:
        language === "ar"
          ? "حساب جهة حكومية - يمكنها إنشاء المبادرات والأخبار"
          : "Government agency account - can create initiatives and news",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      email: "volunteer@test.sa",
      password: "volunteer123",
      name: language === "ar" ? "متطوع نشط" : "Active Volunteer",
      type: language === "ar" ? "متطوع" : "Volunteer",
      description:
        language === "ar"
          ? "حساب متطوع عادي - يمكنه التقديم للمبادرات وتقديم الملاحظات"
          : "Regular volunteer account - can apply for initiatives and submit feedback",
      icon: Heart,
      color: "bg-green-500",
    },
    {
      email: "organization@test.sa",
      password: "org123",
      name: language === "ar" ? "منظمة خيرية" : "Charitable Organization",
      type: language === "ar" ? "منظمة" : "Organization",
      description:
        language === "ar"
          ? "حساب منظمة تطوعية - يمكنها المشاركة في المبادرات"
          : "Volunteer organization account - can participate in initiatives",
      icon: User,
      color: "bg-purple-500",
    },
  ];

  const createTestUsers = async () => {
    setIsCreating(true);
    try {
      // Mock implementation - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title:
          language === "ar"
            ? "تم إنشاء الحسابات التجريبية"
            : "Test accounts created",
        description:
          language === "ar"
            ? "يمكنك الآن تسجيل الدخول باستخدام أي من الحسابات أدناه"
            : "You can now log in using any of the accounts below",
      });
    } catch (error) {
      console.error("Error creating test users:", error);
      toast({
        title:
          language === "ar"
            ? "خطأ في إنشاء الحسابات"
            : "Error creating accounts",
        description:
          language === "ar"
            ? "حدث خطأ أثناء إنشاء الحسابات التجريبية"
            : "An error occurred while creating test accounts",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const loginAsTestUser = async (email, password) => {
    setIsLoading(true);
    try {
      // Mock implementation - simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: language === "ar" ? "تم تسجيل الدخول بنجاح" : "Login successful",
        description:
          language === "ar"
            ? `مرحباً، تم تسجيل الدخول كـ ${email}`
            : `Hello, logged in as ${email}`,
      });

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: language === "ar" ? "فشل تسجيل الدخول" : "Login failed",
        description:
          language === "ar"
            ? error.message || "حدث خطأ أثناء تسجيل الدخول"
            : error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/10 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent mb-4">
            {language === "ar" ? "الحسابات التجريبية" : "Test Accounts"}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {language === "ar"
              ? "اختبر التطبيق باستخدام حسابات مختلفة لتجربة جميع الميزات"
              : "Test the application using different accounts to experience all features"}
          </p>

          <Button
            onClick={createTestUsers}
            disabled={isCreating}
            size="lg"
            className="mb-8">
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            ) : (
              <UserPlus className="w-4 h-4 ml-2" />
            )}
            {language === "ar"
              ? "إنشاء جميع الحسابات التجريبية"
              : "Create All Test Accounts"}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testUsers.map((user, index) => {
            const IconComponent = user.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${user.color} text-white shadow-lg`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-foreground">
                        {user.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {user.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {user.description}
                  </CardDescription>

                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">
                        {language === "ar" ? "البريد الإلكتروني:" : "Email:"}
                      </span>
                      <span className="ml-2 font-mono text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">
                        {language === "ar" ? "كلمة المرور:" : "Password:"}
                      </span>
                      <span className="ml-2 font-mono text-muted-foreground">
                        {user.password}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => loginAsTestUser(user.email, user.password)}
                    disabled={isLoading}
                    className="w-full"
                    variant="default">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    ) : (
                      <Play className="w-4 h-4 ml-2" />
                    )}
                    {language === "ar"
                      ? `تسجيل الدخول كـ ${user.type}`
                      : `Login as ${user.type}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {language === "ar" ? "ملاحظات مهمة:" : "Important Notes:"}
              </h3>
              <div className="text-sm text-muted-foreground space-y-2 text-right">
                <p>
                  •{" "}
                  {language === "ar"
                    ? "حساب المدير يمكنه الوصول للوحة التحكم الإدارية"
                    : "Admin account can access the administrative dashboard"}
                </p>
                <p>
                  •{" "}
                  {language === "ar"
                    ? "حساب الجهة يمكنه إنشاء وإدارة المبادرات والأخبار"
                    : "Agency account can create and manage initiatives and news"}
                </p>
                <p>
                  •{" "}
                  {language === "ar"
                    ? "حساب المتطوع يمكنه التقديم للمبادرات وتقديم الملاحظات"
                    : "Volunteer account can apply for initiatives and submit feedback"}
                </p>
                <p>
                  •{" "}
                  {language === "ar"
                    ? "حساب المنظمة يمكنه المشاركة في المبادرات كمنظمة"
                    : "Organization account can participate in initiatives as an organization"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestAccounts;
