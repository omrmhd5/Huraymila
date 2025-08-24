import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Shield, 
  Building, 
  Heart,
  Loader2,
  Play,
  UserPlus
} from 'lucide-react';

const TestAccounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const testUsers = [
    {
      email: 'admin@test.sa',
      password: 'admin123',
      name: 'مدير النظام',
      type: 'مدير',
      description: 'حساب المدير العام - يمكنه الوصول لجميع الميزات ولوحة التحكم',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      email: 'agency@test.sa',
      password: 'agency123',
      name: 'وكالة الصحة',
      type: 'وكالة',
      description: 'حساب وكالة حكومية - يمكنها إنشاء المبادرات والأخبار',
      icon: Building,
      color: 'bg-blue-500'
    },
    {
      email: 'volunteer@test.sa',
      password: 'volunteer123',
      name: 'متطوع نشط',
      type: 'متطوع',
      description: 'حساب متطوع عادي - يمكنه التقديم للمبادرات وتقديم الملاحظات',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      email: 'organization@test.sa',
      password: 'org123',
      name: 'منظمة خيرية',
      type: 'منظمة',
      description: 'حساب منظمة تطوعية - يمكنها المشاركة في المبادرات',
      icon: User,
      color: 'bg-purple-500'
    }
  ];

  const createTestUsers = async () => {
    setIsCreating(true);
    try {
      // Mock implementation - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم إنشاء الحسابات التجريبية",
        description: "يمكنك الآن تسجيل الدخول باستخدام أي من الحسابات أدناه",
      });
    } catch (error) {
      console.error('Error creating test users:', error);
      toast({
        title: "خطأ في إنشاء الحسابات",
        description: "حدث خطأ أثناء إنشاء الحسابات التجريبية",
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً، تم تسجيل الدخول كـ ${email}`,
      });

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول",
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
            الحسابات التجريبية
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            اختبر التطبيق باستخدام حسابات مختلفة لتجربة جميع الميزات
          </p>
          
          <Button 
            onClick={createTestUsers}
            disabled={isCreating}
            size="lg"
            className="mb-8"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            ) : (
              <UserPlus className="w-4 h-4 ml-2" />
            )}
            إنشاء جميع الحسابات التجريبية
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testUsers.map((user, index) => {
            const IconComponent = user.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${user.color} text-white shadow-lg`}>
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
                      <span className="font-medium text-foreground">البريد الإلكتروني:</span>
                      <span className="ml-2 font-mono text-muted-foreground">{user.email}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">كلمة المرور:</span>
                      <span className="ml-2 font-mono text-muted-foreground">{user.password}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => loginAsTestUser(user.email, user.password)}
                    disabled={isLoading}
                    className="w-full"
                    variant="default"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    ) : (
                      <Play className="w-4 h-4 ml-2" />
                    )}
                    تسجيل الدخول كـ {user.type}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-foreground">ملاحظات مهمة:</h3>
              <div className="text-sm text-muted-foreground space-y-2 text-right">
                <p>• حساب المدير يمكنه الوصول للوحة التحكم الإدارية</p>
                <p>• حساب الوكالة يمكنه إنشاء وإدارة المبادرات والأخبار</p>
                <p>• حساب المتطوع يمكنه التقديم للمبادرات وتقديم الملاحظات</p>
                <p>• حساب المنظمة يمكنه المشاركة في المبادرات كمنظمة</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestAccounts;