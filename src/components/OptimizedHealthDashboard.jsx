import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Droplets, 
  Wind, 
  Activity, 
  Car, 
  Recycle, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Gauge,
  BarChart3,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const OptimizedHealthDashboard = () => {
  const content = {
    ar: {
      title: "مؤشرات الصحة والرفاهية",
      subtitle: "نحو مستقبل أكثر صحة وازدهاراً لمحافظة حريملاء",
      viewDetails: "عرض التفاصيل",
      indicators: {
        airQuality: {
          title: "جودة الهواء",
          value: 92,
          status: "ممتاز",
          trend: "up",
          description: "هواء نقي وصحي",
          detail: "أفضل من المعايير الدولية بـ 15%",
          target: 95
        },
        waterQuality: {
          title: "جودة المياه",
          value: 98,
          status: "متميز",
          trend: "up", 
          description: "مياه عالية الجودة",
          detail: "نقاء استثنائي 99.9%",
          target: 99
        },
        vaccination: {
          title: "التطعيمات",
          value: 96,
          status: "متفوق",
          trend: "up",
          description: "تغطية شاملة",
          detail: "أعلى من المتوسط الوطني بـ 8%",
          target: 98
        },
        physicalActivity: {
          title: "النشاط البدني",
          value: 78,
          status: "جيد جداً",
          trend: "up",
          description: "مجتمع نشط",
          detail: "زيادة مستمرة في المشاركة",
          target: 85
        },
        safety: {
          title: "الأمان العام",
          value: 94,
          status: "ممتاز",
          trend: "up",
          description: "بيئة آمنة",
          detail: "انخفاض الحوادث بـ 25%",
          target: 96
        },
        greenSpaces: {
          title: "المساحات الخضراء",
          value: 82,
          status: "جيد جداً",
          trend: "up",
          description: "بيئة طبيعية",
          detail: "زيادة المتنزهات بـ 40%",
          target: 90
        }
      },
      lastUpdate: "آخر تحديث",
      realTime: "مباشر",
      achievement: "إنجاز متميز",
      onTrack: "في المسار الصحيح",
      excellent: "ممتاز"
    }
  };

  const current = content.ar; // Default to Arabic

  const getTrendIcon = (trend) => {
    if (trend === "up") {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === "down") {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Gauge className="h-4 w-4 text-blue-500" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      "ممتاز": "bg-green-100 text-green-700",
      "متميز": "bg-blue-100 text-blue-700",
      "متفوق": "bg-purple-100 text-purple-700",
      "جيد جداً": "bg-yellow-100 text-yellow-700",
      "جيد": "bg-orange-100 text-orange-700"
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getIndicatorIcon = (key) => {
    const icons = {
      airQuality: Wind,
      waterQuality: Droplets,
      vaccination: Shield,
      physicalActivity: Activity,
      safety: Shield,
      greenSpaces: Recycle
    };
    return icons[key] || Heart;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Health Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(current.indicators).map(([key, indicator]) => {
            const IconComponent = getIndicatorIcon(key);
            return (
              <Card key={key} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(indicator.trend)}
                      <Badge variant="outline" className={getStatusColor(indicator.status)}>
                        {indicator.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">
                    {indicator.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {indicator.value}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {indicator.target}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {indicator.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>التقدم</span>
                      <span className="font-medium">{indicator.value}%</span>
                    </div>
                    <Progress value={indicator.value} className="h-2" />
                  </div>

                  {/* Detail */}
                  <p className="text-xs text-muted-foreground">
                    {indicator.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-700 mb-1">6</div>
            <p className="text-sm text-green-600">مؤشرات صحية</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-700 mb-1">4</div>
            <p className="text-sm text-blue-600">مؤشرات ممتازة</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-700 mb-1">100%</div>
            <p className="text-sm text-purple-600">اتجاه إيجابي</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <Sparkles className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-700 mb-1">87%</div>
            <p className="text-sm text-orange-600">متوسط الأداء</p>
          </Card>
        </div>

        {/* Last Update Info */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              {current.lastUpdate}: {new Date().toLocaleDateString('ar-SA')} - {current.realTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHealthDashboard;

