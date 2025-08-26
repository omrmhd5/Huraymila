import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const EnvironmentalReport = () => {
  const { loading } = useAuth();
  const { language } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const environmentalData = {
    airQuality: {
      status: language === "ar" ? "جيد" : "Good",
      value: "65",
      unit: "AQI",
      trend: language === "ar" ? "متحسن" : "Improving",
      color: "bg-green-500",
    },
    waterQuality: {
      status: language === "ar" ? "ممتاز" : "Excellent",
      value: "95",
      unit: "%",
      trend: language === "ar" ? "مستقر" : "Stable",
      color: "bg-blue-500",
    },
    greenSpaces: {
      status: language === "ar" ? "جيد" : "Good",
      value: "12.5",
      unit: language === "ar" ? "م²/شخص" : "m²/person",
      trend: language === "ar" ? "متحسن" : "Improving",
      color: "bg-green-500",
    },
    wasteManagement: {
      status: language === "ar" ? "مقبول" : "Acceptable",
      value: "78",
      unit: "%",
      trend: language === "ar" ? "متحسن" : "Improving",
      color: "bg-yellow-500",
    },
  };

  const initiatives = [
    {
      title:
        language === "ar" ? "مشروع التشجير الحضري" : "Urban Greening Project",
      status: language === "ar" ? "نشط" : "Active",
      progress: 75,
      description:
        language === "ar"
          ? "زيادة المساحات الخضراء في المدينة بنسبة 25%"
          : "Increase green spaces in the city by 25%",
    },
    {
      title: language === "ar" ? "برنامج إعادة التدوير" : "Recycling Program",
      status: language === "ar" ? "مكتمل" : "Completed",
      progress: 100,
      description:
        language === "ar"
          ? "تطبيق نظام إعادة التدوير في جميع الأحياء"
          : "Implement recycling system in all neighborhoods",
    },
    {
      title:
        language === "ar"
          ? "مشروع الطاقة المتجددة"
          : "Renewable Energy Project",
      status: language === "ar" ? "قيد التنفيذ" : "In Progress",
      progress: 45,
      description:
        language === "ar"
          ? "تركيب ألواح شمسية في المباني الحكومية"
          : "Install solar panels in government buildings",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case language === "ar" ? "نشط" : "Active":
        return (
          <Badge variant="default" className="bg-green-500">
            {language === "ar" ? "نشط" : "Active"}
          </Badge>
        );
      case language === "ar" ? "مكتمل" : "Completed":
        return (
          <Badge variant="default" className="bg-blue-500">
            {language === "ar" ? "مكتمل" : "Completed"}
          </Badge>
        );
      case language === "ar" ? "قيد التنفيذ" : "In Progress":
        return (
          <Badge variant="secondary">
            {language === "ar" ? "قيد التنفيذ" : "In Progress"}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {language === "ar" ? "التقرير البيئي" : "Environmental Report"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "نظرة شاملة على الوضع البيئي في مدينة حريملاء الصحية"
              : "Comprehensive overview of the environmental status in Harimlaa Healthy City"}
          </p>
        </div>

        {/* Environmental Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(environmentalData).map(([key, data]) => (
            <Card key={key} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                  <Badge variant="outline">{data.trend}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {data.value} {data.unit}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {data.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Environmental Initiatives */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {language === "ar"
              ? "المبادرات البيئية النشطة"
              : "Active Environmental Initiatives"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">
                      {initiative.title}
                    </CardTitle>
                    {getStatusBadge(initiative.status)}
                  </div>
                  <CardDescription>{initiative.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                      <span className="font-medium">
                        {initiative.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${initiative.progress}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Environmental Goals */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Leaf className="w-5 h-5" />
              {language === "ar"
                ? "الأهداف البيئية 2030"
                : "Environmental Goals 2030"}
            </CardTitle>
            <CardDescription className="text-green-700">
              {language === "ar"
                ? "خطة المدينة لتحقيق الاستدامة البيئية"
                : "City's plan to achieve environmental sustainability"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">
                  {language === "ar"
                    ? "أهداف قصيرة المدى (2024-2026)"
                    : "Short-term Goals (2024-2026)"}
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {language === "ar"
                      ? "زيادة المساحات الخضراء بنسبة 30%"
                      : "Increase green spaces by 30%"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {language === "ar"
                      ? "تطبيق نظام إعادة التدوير الشامل"
                      : "Implement comprehensive recycling system"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {language === "ar"
                      ? "تحسين جودة الهواء بنسبة 25%"
                      : "Improve air quality by 25%"}
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">
                  {language === "ar"
                    ? "أهداف طويلة المدى (2027-2030)"
                    : "Long-term Goals (2027-2030)"}
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {language === "ar"
                      ? "تحقيق الحياد الكربوني"
                      : "Achieve carbon neutrality"}
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {language === "ar"
                      ? "100% طاقة متجددة"
                      : "100% renewable energy"}
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {language === "ar" ? "صفر نفايات" : "Zero waste"}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EnvironmentalReport;
