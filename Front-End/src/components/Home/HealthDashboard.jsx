import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getHealthIndicators } from "@/lib/healthIndicatorApi";

const HealthDashboard = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default indicators as fallback
  const defaultIndicators = [
    {
      id: "airQuality",
      title: t("healthDashboard.indicators.airQuality.title"),
      value: 85,
      status: t("healthDashboard.indicators.airQuality.status"),
      trend: "up",
      description: t("healthDashboard.indicators.airQuality.description"),
      icon: Wind,
      color: "text-green-600",
      bgColor: "bg-green-100",
      ringColor: "ring-green-500",
      progressColor: "from-green-500 to-green-600",
      target: 90,
      detail: t("healthDashboard.indicators.airQuality.detail"),
      inverted: false,
    },
    {
      id: "waterQuality",
      title: t("healthDashboard.indicators.waterQuality.title"),
      value: 92,
      status: t("healthDashboard.indicators.waterQuality.status"),
      trend: "up",
      description: t("healthDashboard.indicators.waterQuality.description"),
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      ringColor: "ring-blue-500",
      progressColor: "from-blue-500 to-blue-600",
      target: 95,
      detail: t("healthDashboard.indicators.waterQuality.detail"),
      inverted: false,
    },
    {
      id: "vaccination",
      title: t("healthDashboard.indicators.vaccination.title"),
      value: 96,
      status: t("healthDashboard.indicators.vaccination.status"),
      trend: "up",
      description: t("healthDashboard.indicators.vaccination.description"),
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      ringColor: "ring-purple-500",
      progressColor: "from-purple-500 to-purple-600",
      target: 95,
      detail: t("healthDashboard.indicators.vaccination.detail"),
      inverted: false,
    },
    {
      id: "physicalActivity",
      title: t("healthDashboard.indicators.physicalActivity.title"),
      value: 68,
      status: t("healthDashboard.indicators.physicalActivity.status"),
      trend: "up",
      description: t("healthDashboard.indicators.physicalActivity.description"),
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      ringColor: "ring-orange-500",
      progressColor: "from-orange-500 to-orange-600",
      target: 80,
      detail: t("healthDashboard.indicators.physicalActivity.detail"),
      inverted: false,
    },
    {
      id: "trafficAccidents",
      title: t("healthDashboard.indicators.trafficAccidents.title"),
      value: 12,
      status: t("healthDashboard.indicators.trafficAccidents.status"),
      trend: "down",
      description: t("healthDashboard.indicators.trafficAccidents.description"),
      icon: Car,
      color: "text-red-600",
      bgColor: "bg-red-100",
      ringColor: "ring-red-500",
      progressColor: "from-red-500 to-red-600",
      target: 10,
      detail: t("healthDashboard.indicators.trafficAccidents.detail"),
      inverted: true, // Lower is better
    },
    {
      id: "recycling",
      title: t("healthDashboard.indicators.recycling.title"),
      value: 74,
      status: t("healthDashboard.indicators.recycling.status"),
      trend: "up",
      description: t("healthDashboard.indicators.recycling.description"),
      icon: Recycle,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      ringColor: "ring-teal-500",
      progressColor: "from-teal-500 to-teal-600",
      target: 80,
      detail: t("healthDashboard.indicators.recycling.detail"),
      inverted: false,
    },
  ];

  // Icon mapping for indicators
  const iconMap = {
    airQuality: Wind,
    waterQuality: Droplets,
    vaccination: Shield,
    physicalActivity: Activity,
    trafficAccidents: Car,
    recycling: Recycle,
  };

  // Color mapping for indicators
  const colorMap = {
    airQuality: {
      color: "text-green-600",
      bgColor: "bg-green-100",
      ringColor: "ring-green-500",
      progressColor: "from-green-500 to-green-600",
    },
    waterQuality: {
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      ringColor: "ring-blue-500",
      progressColor: "from-blue-500 to-blue-600",
    },
    vaccination: {
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      ringColor: "ring-purple-500",
      progressColor: "from-purple-500 to-purple-600",
    },
    physicalActivity: {
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      ringColor: "ring-orange-500",
      progressColor: "from-orange-500 to-orange-600",
    },
    trafficAccidents: {
      color: "text-red-600",
      bgColor: "bg-red-100",
      ringColor: "ring-red-500",
      progressColor: "from-red-500 to-red-600",
    },
    recycling: {
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      ringColor: "ring-teal-500",
      progressColor: "from-teal-500 to-teal-600",
    },
  };

  // Fetch health indicators from API
  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        setLoading(true);
        const data = await getHealthIndicators();

        if (data && data.indicators) {
          // Transform API data to match component format
          const transformedIndicators = data.indicators.map((indicator) => {
            const iconConfig = iconMap[indicator.id];
            const colorConfig = colorMap[indicator.id];

            return {
              id: indicator.id,
              title:
                language === "ar" ? indicator.title.ar : indicator.title.en,
              value: indicator.currentValue,
              status:
                language === "ar" ? indicator.status.ar : indicator.status.en,
              trend: indicator.id === "trafficAccidents" ? "down" : "up",
              description:
                language === "ar"
                  ? indicator.description.ar
                  : indicator.description.en,
              icon: iconConfig,
              ...colorConfig,
              target: indicator.targetValue,
              detail:
                language === "ar"
                  ? indicator.description.ar
                  : indicator.description.en,
              inverted: indicator.id === "trafficAccidents",
            };
          });

          setIndicators(transformedIndicators);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        // Error fetching health indicators
        setError(error.message);
        // Fallback to default indicators
        setIndicators(defaultIndicators);
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, [language, t]);

  const isRTL = language === "ar";

  const calculateProgress = (value, target) => {
    return Math.min((value / target) * 100, 100);
  };

  const getStatusColor = (status) => {
    // Handle both Arabic and English status values
    switch (status) {
      case t("healthDashboard.status.excellent"):
        return "bg-green-100 text-green-700";
      case t("healthDashboard.status.good"):
        return "bg-blue-100 text-blue-700";
      case t("healthDashboard.status.medium"):
        return "bg-yellow-100 text-yellow-700";
      case t("healthDashboard.status.low"):
        return "bg-green-100 text-green-700";
      case t("healthDashboard.status.high"):
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("healthDashboard.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("healthDashboard.subtitle")}
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {language === "ar"
                ? "جاري تحميل المؤشرات..."
                : "Loading indicators..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("healthDashboard.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("healthDashboard.subtitle")}
          </p>
          {error && (
            <div className="mt-4 text-sm text-orange-600">
              {language === "ar"
                ? "تم تحميل البيانات الافتراضية بسبب خطأ في الاتصال"
                : "Loaded default data due to connection error"}
            </div>
          )}
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
                    {t("healthDashboard.excellent")}
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
                          {t("healthDashboard.target")}
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
              label: t("healthDashboard.summary.healthIndicators"),
              gradient: "from-green-50 to-green-100",
              border: "border-green-200",
              iconColor: "text-green-600",
              valueColor: "text-green-700",
              labelColor: "text-green-600",
            },
            {
              icon: Award,
              value: "4",
              label: t("healthDashboard.summary.excellentIndicators"),
              gradient: "from-blue-50 to-blue-100",
              border: "border-blue-200",
              iconColor: "text-blue-600",
              valueColor: "text-blue-700",
              labelColor: "text-blue-600",
            },
            {
              icon: TrendingUp,
              value: "100%",
              label: t("healthDashboard.summary.positiveTrend"),
              gradient: "from-purple-50 to-purple-100",
              border: "border-purple-200",
              iconColor: "text-purple-600",
              valueColor: "text-purple-700",
              labelColor: "text-purple-600",
            },
            {
              icon: Sparkles,
              value: "87%",
              label: t("healthDashboard.summary.performanceAverage"),
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
            {t("healthDashboard.lastUpdate")}:{" "}
            {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HealthDashboard;
