import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Leaf, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const EnvironmentalReport = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const environmentalData = {
    airQuality: {
      status: "جيد",
      value: "65",
      unit: "AQI",
      trend: "متحسن",
      color: "bg-green-500"
    },
    waterQuality: {
      status: "ممتاز",
      value: "95",
      unit: "%",
      trend: "مستقر",
      color: "bg-blue-500"
    },
    greenSpaces: {
      status: "جيد",
      value: "12.5",
      unit: "م²/شخص",
      trend: "متحسن",
      color: "bg-green-500"
    },
    wasteManagement: {
      status: "مقبول",
      value: "78",
      unit: "%",
      trend: "متحسن",
      color: "bg-yellow-500"
    }
  };

  const initiatives = [
    {
      title: "مشروع التشجير الحضري",
      status: "نشط",
      progress: 75,
      description: "زيادة المساحات الخضراء في المدينة بنسبة 25%"
    },
    {
      title: "برنامج إعادة التدوير",
      status: "مكتمل",
      progress: 100,
      description: "تطبيق نظام إعادة التدوير في جميع الأحياء"
    },
    {
      title: "مشروع الطاقة المتجددة",
      status: "قيد التنفيذ",
      progress: 45,
      description: "تركيب ألواح شمسية في المباني الحكومية"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "نشط":
        return <Badge variant="default" className="bg-green-500">نشط</Badge>;
      case "مكتمل":
        return <Badge variant="default" className="bg-blue-500">مكتمل</Badge>;
      case "قيد التنفيذ":
        return <Badge variant="secondary">قيد التنفيذ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">التقرير البيئي</h1>
          <p className="text-lg text-muted-foreground">
            نظرة شاملة على الوضع البيئي في مدينة حريملاء الصحية
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
                  <p className="text-sm text-muted-foreground mt-1">{data.status}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Environmental Initiatives */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            المبادرات البيئية النشطة
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{initiative.title}</CardTitle>
                    {getStatusBadge(initiative.status)}
                  </div>
                  <CardDescription>{initiative.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>التقدم</span>
                      <span className="font-medium">{initiative.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
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
              الأهداف البيئية 2030
            </CardTitle>
            <CardDescription className="text-green-700">
              خطة المدينة لتحقيق الاستدامة البيئية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">أهداف قصيرة المدى (2024-2026)</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    زيادة المساحات الخضراء بنسبة 30%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    تطبيق نظام إعادة التدوير الشامل
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    تحسين جودة الهواء بنسبة 25%
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">أهداف طويلة المدى (2027-2030)</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    تحقيق الحياد الكربوني
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    100% طاقة متجددة
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    صفر نفايات
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default EnvironmentalReport;