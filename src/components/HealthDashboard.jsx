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
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const HealthDashboard = () => {
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
          description: "PM2.5: 12 μg/m³"
        },
        waterQuality: {
          title: "جودة المياه",
          value: 92,
          status: "ممتاز",
          trend: "up",
          description: "نقاء 99.8%"
        },
        vaccination: {
          title: "معدل التطعيمات",
          value: 96,
          status: "عالي",
          trend: "up",
          description: "96% من السكان"
        },
        physicalActivity: {
          title: "النشاط البدني",
          value: 68,
          status: "متوسط",
          trend: "up",
          description: "68% يمارسون الرياضة"
        },
        trafficAccidents: {
          title: "الحوادث المرورية",
          value: 12,
          status: "منخفض",
          trend: "down",
          description: "12 حادث/شهر"
        },
        recycling: {
          title: "إعادة التدوير",
          value: 74,
          status: "جيد",
          trend: "up",
          description: "74% من النفايات"
        }
      },
      lastUpdate: "آخر تحديث"
    }
  };

  const current = content.ar; // Default to Arabic
  const isRTL = true; // Default to RTL

  const indicators = [
    {
      ...current.indicators.airQuality,
      icon: Wind,
      color: "text-green-600",
      bgColor: "bg-green-100",
      progressColor: "bg-green-500",
      inverted: false
    },
    {
      ...current.indicators.waterQuality,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      progressColor: "bg-blue-500",
      inverted: false
    },
    {
      ...current.indicators.vaccination,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      progressColor: "bg-purple-500",
      inverted: false
    },
    {
      ...current.indicators.physicalActivity,
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      progressColor: "bg-orange-500",
      inverted: false
    },
    {
      ...current.indicators.trafficAccidents,
      icon: Car,
      color: "text-red-600",
      bgColor: "bg-red-100",
      progressColor: "bg-red-500",
      inverted: true // Lower is better
    },
    {
      ...current.indicators.recycling,
      icon: Recycle,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      progressColor: "bg-teal-500",
      inverted: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "ممتاز": return "bg-green-100 text-green-700";
      case "جيد": return "bg-blue-100 text-blue-700";
      case "متوسط": return "bg-yellow-100 text-yellow-700";
      case "منخفض": return "bg-green-100 text-green-700";
      case "عالي": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            const progressValue = indicator.inverted ? 100 - indicator.value : indicator.value;
            
            return (
              <Card key={index} className="bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${indicator.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${indicator.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {indicator.title}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(indicator.status)}>
                        {indicator.status}
                      </Badge>
                      {indicator.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-foreground">
                        {indicator.inverted ? indicator.value : indicator.value}
                        {!indicator.title.includes("الحوادث") && "%"}
                      </span>
                    </div>
                    <Progress 
                      value={progressValue} 
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {indicator.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Last Update */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {current.lastUpdate}: {new Date().toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HealthDashboard;

