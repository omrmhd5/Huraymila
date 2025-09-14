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
  Target,
  Sparkles,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const HealthDashboard = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "لوحة المؤشرات الصحية",
      subtitle: "مؤشرات مباشرة لجودة الحياة في حريملاء",
      indicators: {
        airQuality: {
          title: "جودة الهواء",
          value: 85,
          status: "جيد",
          trend: "up",
          description: "PM2.5: 12 μg/m³",
        },
        waterQuality: {
          title: "جودة المياه",
          value: 92,
          status: "ممتاز",
          trend: "up",
          description: "نقاء 99.8%",
        },
        vaccination: {
          title: "معدل التطعيمات",
          value: 96,
          status: "عالي",
          trend: "up",
          description: "96% من السكان",
        },
        physicalActivity: {
          title: "النشاط البدني",
          value: 68,
          status: "متوسط",
          trend: "up",
          description: "68% يمارسون الرياضة",
        },
        trafficAccidents: {
          title: "الحوادث المرورية",
          value: 12,
          status: "منخفض",
          trend: "down",
          description: "12 حادث/شهر",
        },
        recycling: {
          title: "إعادة التدوير",
          value: 74,
          status: "جيد",
          trend: "up",
          description: "74% من النفايات",
        },
      },
      lastUpdate: "آخر تحديث",
      excellent: "ممتاز",
    },
    en: {
      title: "Health Indicators Dashboard",
      subtitle: "Real-time quality of life indicators in Huraymila",
      indicators: {
        airQuality: {
          title: "Air Quality",
          value: 85,
          status: "Good",
          trend: "up",
          description: "PM2.5: 12 μg/m³",
        },
        waterQuality: {
          title: "Water Quality",
          value: 92,
          status: "Excellent",
          trend: "up",
          description: "99.8% purity",
        },
        vaccination: {
          title: "Vaccination Rate",
          value: 96,
          status: "High",
          trend: "up",
          description: "96% of population",
        },
        physicalActivity: {
          title: "Physical Activity",
          value: 68,
          status: "Medium",
          trend: "up",
          description: "68% exercise regularly",
        },
        trafficAccidents: {
          title: "Traffic Accidents",
          value: 12,
          status: "Low",
          trend: "down",
          description: "12 accidents/month",
        },
        recycling: {
          title: "Recycling",
          value: 74,
          status: "Good",
          trend: "up",
          description: "74% of waste",
        },
      },
      lastUpdate: "Last Update",
      excellent: "Excellent",
    },
  };

  const current = content[language] || content.ar;
  const isRTL = language === "ar";

  const indicators = [
    {
      ...current.indicators.airQuality,
      icon: Wind,
      color: "text-green-600",
      bgColor: "bg-green-100",
      ringColor: "ring-green-500",
      progressColor: "from-green-500 to-green-600",
      target: 90,
      detail:
        language === "ar"
          ? "مستويات PM2.5 ضمن معايير منظمة الصحة العالمية"
          : "PM2.5 levels within WHO standards",
      inverted: false,
    },
    {
      ...current.indicators.waterQuality,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      ringColor: "ring-blue-500",
      progressColor: "from-blue-500 to-blue-600",
      target: 95,
      detail:
        language === "ar"
          ? "نقاء المياه يتجاوز المعايير الوطنية"
          : "Water purity exceeds national standards",
      inverted: false,
    },
    {
      ...current.indicators.vaccination,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      ringColor: "ring-purple-500",
      progressColor: "from-purple-500 to-purple-600",
      target: 95,
      detail:
        language === "ar"
          ? "تغطية التطعيمات للسكان"
          : "Population vaccination coverage",
      inverted: false,
    },
    {
      ...current.indicators.physicalActivity,
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      ringColor: "ring-orange-500",
      progressColor: "from-orange-500 to-orange-600",
      target: 80,
      detail:
        language === "ar"
          ? "البالغون الذين يمارسون الرياضة بانتظام"
          : "Adults engaging in regular exercise",
      inverted: false,
    },
    {
      ...current.indicators.trafficAccidents,
      icon: Car,
      color: "text-red-600",
      bgColor: "bg-red-100",
      ringColor: "ring-red-500",
      progressColor: "from-red-500 to-red-600",
      target: 10,
      detail:
        language === "ar"
          ? "حوادث المرور الشهرية"
          : "Monthly traffic accident incidents",
      inverted: true, // Lower is better
    },
    {
      ...current.indicators.recycling,
      icon: Recycle,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      ringColor: "ring-teal-500",
      progressColor: "from-teal-500 to-teal-600",
      target: 80,
      detail:
        language === "ar"
          ? "نسبة إعادة تدوير النفايات"
          : "Waste recycling percentage",
      inverted: false,
    },
  ];

  const calculateProgress = (value, target) => {
    return Math.min((value / target) * 100, 100);
  };

  const getStatusColor = (status) => {
    // Handle both Arabic and English status values
    switch (status) {
      case "ممتاز":
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "جيد":
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "متوسط":
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "منخفض":
      case "Low":
        return "bg-green-100 text-green-700";
      case "عالي":
      case "High":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {current.subtitle}
          </p>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            const progressValue = calculateProgress(
              indicator.value,
              indicator.target
            );
            const isExcellent = indicator.value >= indicator.target * 0.9;

            return (
              <Card
                key={index}
                className={cn(
                  "group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-2 relative overflow-hidden",
                  "hover:scale-[1.02] hover:border-primary/20",
                  isExcellent && "ring-2 ring-primary/20"
                )}>
                {isExcellent && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                    <Award className="h-3 w-3 inline mr-1" />
                    {current.excellent}
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative",
                          indicator.bgColor,
                          "ring-2 ring-transparent group-hover:" +
                            indicator.ringColor
                        )}>
                        <IconComponent
                          className={cn("h-7 w-7", indicator.color)}
                        />
                        {indicator.trend === "up" && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle
                          className={cn(
                            "text-lg font-bold text-foreground",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {indicator.title}
                        </CardTitle>
                        <p
                          className={cn(
                            "text-xs text-muted-foreground",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {indicator.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs border font-medium",
                        getStatusColor(indicator.status)
                      )}>
                      {indicator.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-4xl font-bold text-foreground">
                          {indicator.value}
                        </span>
                        <span className="text-lg text-muted-foreground ml-1">
                          %
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">
                          {isRTL ? "الهدف" : "Target"}
                        </div>
                        <div className="text-sm font-bold text-primary">
                          {indicator.target}%
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-2">
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out relative",
                            indicator.progressColor
                          )}
                          style={{ width: `${progressValue}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </div>
                        {/* Target line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                          style={{
                            left: `${(indicator.target / 100) * 100}%`,
                          }}>
                          <Target className="h-3 w-3 text-foreground/60 absolute -top-0.5 -left-1" />
                        </div>
                      </div>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {indicator.detail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Target,
              value: "6",
              label: language === "ar" ? "مؤشرات صحية" : "Health Indicators",
              gradient: "from-green-50 to-green-100",
              border: "border-green-200",
              iconColor: "text-green-600",
              valueColor: "text-green-700",
              labelColor: "text-green-600",
            },
            {
              icon: Award,
              value: "4",
              label:
                language === "ar" ? "مؤشرات ممتازة" : "Excellent Indicators",
              gradient: "from-blue-50 to-blue-100",
              border: "border-blue-200",
              iconColor: "text-blue-600",
              valueColor: "text-blue-700",
              labelColor: "text-blue-600",
            },
            {
              icon: TrendingUp,
              value: "100%",
              label: language === "ar" ? "اتجاه إيجابي" : "Positive Trend",
              gradient: "from-purple-50 to-purple-100",
              border: "border-purple-200",
              iconColor: "text-purple-600",
              valueColor: "text-purple-700",
              labelColor: "text-purple-600",
            },
            {
              icon: Sparkles,
              value: "87%",
              label: language === "ar" ? "متوسط الأداء" : "Performance Average",
              gradient: "from-orange-50 to-orange-100",
              border: "border-orange-200",
              iconColor: "text-orange-600",
              valueColor: "text-orange-700",
              labelColor: "text-orange-600",
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className={`text-center p-6 bg-gradient-to-br ${stat.gradient} ${stat.border}`}>
                <IconComponent
                  className={`h-8 w-8 ${stat.iconColor} mx-auto mb-3`}
                />
                <div className={`text-2xl font-bold ${stat.valueColor} mb-1`}>
                  {stat.value}
                </div>
                <p className={`text-sm ${stat.labelColor}`}>{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Last Update */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {current.lastUpdate}: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HealthDashboard;
