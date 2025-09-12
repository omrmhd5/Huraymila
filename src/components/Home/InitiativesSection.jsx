import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Leaf,
  Users,
  Target,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const InitiativesSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "المبادرات الصحية",
      subtitle: "اكتشف المبادرات النشطة في مدينة حريملاء الصحية",
      description:
        "نقدم مجموعة متنوعة من المبادرات الصحية التي تهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في المجتمع.",
      viewAll: "عرض جميع المبادرات",
      categories: {
        health: "صحة",
        environment: "بيئة",
        community: "مجتمع",
        education: "تعليم",
      },
      status: {
        active: "نشط",
        completed: "مكتمل",
        planning: "قيد التخطيط",
      },
    },
    en: {
      title: "Health Initiatives",
      subtitle: "Discover Active Initiatives in Harimlaa Healthy City",
      description:
        "We offer a variety of health initiatives aimed at promoting public health and improving quality of life in the community.",
      viewAll: "View All Initiatives",
      categories: {
        health: "Health",
        environment: "Environment",
        community: "Community",
        education: "Education",
      },
      status: {
        active: "Active",
        completed: "Completed",
        planning: "Planning",
      },
    },
  };

  const initiatives = [
    {
      id: 1,
      title: "برنامج التوعية الصحية",
      titleEn: "Health Awareness Program",
      description: "برنامج شامل للتوعية بأهمية الصحة الوقائية والتغذية السليمة",
      descriptionEn:
        "Comprehensive program for awareness of preventive health and proper nutrition",
      category: "health",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      location: "مركز المدينة الصحي",
      locationEn: "City Health Center",
      participants: 150,
      progress: 75,
      image: "/assets/health-workshop.jpg",
    },
    {
      id: 2,
      title: "مشروع التشجير الحضري",
      titleEn: "Urban Afforestation Project",
      description:
        "مشروع لزيادة المساحات الخضراء وتحسين جودة الهواء في المدينة",
      descriptionEn:
        "Project to increase green spaces and improve air quality in the city",
      category: "environment",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      location: "مختلف أحياء المدينة",
      locationEn: "Various City Neighborhoods",
      participants: 80,
      progress: 45,
      image: "/assets/green-garden.jpg",
    },
    {
      id: 3,
      title: "مبادرة المشي الصحي",
      titleEn: "Healthy Walking Initiative",
      description: "تشجيع المشي كرياضة يومية لتعزيز الصحة البدنية",
      descriptionEn:
        "Encouraging walking as a daily exercise to promote physical health",
      category: "health",
      status: "completed",
      startDate: "2023-09-01",
      endDate: "2024-03-31",
      location: "المسارات الصحية",
      locationEn: "Health Trails",
      participants: 200,
      progress: 100,
      image: "/assets/walking-initiative.jpg",
    },
    {
      id: 4,
      title: "برنامج التثقيف الصحي للأطفال",
      titleEn: "Children's Health Education Program",
      description: "برنامج تعليمي تفاعلي لتعزيز الثقافة الصحية لدى الأطفال",
      descriptionEn:
        "Interactive educational program to promote health culture among children",
      category: "education",
      status: "planning",
      startDate: "2024-07-01",
      endDate: "2024-12-31",
      location: "المدارس والمراكز المجتمعية",
      locationEn: "Schools and Community Centers",
      participants: 0,
      progress: 0,
      image: "/assets/health-workshop.jpg",
    },
  ];

  const current = content[language];
  const isRTL = language === "ar";

  const getCategoryBadge = (category) => {
    const categoryLabels = {
      health: { ar: "صحة", en: "Health", color: "bg-red-500" },
      environment: { ar: "بيئة", en: "Environment", color: "bg-green-500" },
      community: { ar: "مجتمع", en: "Community", color: "bg-blue-500" },
      education: { ar: "تعليم", en: "Education", color: "bg-purple-500" },
    };

    const categoryInfo = categoryLabels[category];
    return (
      <Badge variant="default" className={categoryInfo.color}>
        {language === "ar" ? categoryInfo.ar : categoryInfo.en}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusLabels = {
      active: { ar: "نشط", en: "Active", color: "bg-green-500" },
      completed: { ar: "مكتمل", en: "Completed", color: "bg-blue-500" },
      planning: { ar: "قيد التخطيط", en: "Planning", color: "bg-yellow-500" },
    };

    const statusInfo = statusLabels[status];
    return (
      <Badge variant="default" className={statusInfo.color}>
        {language === "ar" ? statusInfo.ar : statusInfo.en}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {language === "ar" ? "المبادرات" : "Initiatives"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {initiatives.map((initiative) => (
            <Card
              key={initiative.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Initiative Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={initiative.image}
                  alt={
                    language === "ar" ? initiative.title : initiative.titleEn
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {getCategoryBadge(initiative.category)}
                  {getStatusBadge(initiative.status)}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">
                  {language === "ar" ? initiative.title : initiative.titleEn}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {language === "ar"
                    ? initiative.description
                    : initiative.descriptionEn}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {initiative.status !== "planning" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {language === "ar" ? "التقدم" : "Progress"}
                      </span>
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
                )}

                {/* Initiative Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? "تاريخ البداية" : "Start Date"}
                      </p>
                      <p className="text-muted-foreground">
                        {formatDate(initiative.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? "تاريخ الانتهاء" : "End Date"}
                      </p>
                      <p className="text-muted-foreground">
                        {formatDate(initiative.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? "الموقع" : "Location"}
                      </p>
                      <p className="text-muted-foreground">
                        {language === "ar"
                          ? initiative.location
                          : initiative.locationEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? "المشاركون" : "Participants"}
                      </p>
                      <p className="text-muted-foreground">
                        {initiative.participants}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  {language === "ar" ? "عرض التفاصيل" : "View Details"}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/initiatives">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              {current.viewAll}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;
