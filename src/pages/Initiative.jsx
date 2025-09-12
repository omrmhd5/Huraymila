import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  CheckCircle,
  Heart,
  Share2,
  UserPlus,
  Leaf,
  Award,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Initiative = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const [isApplying, setIsApplying] = useState(false);

  // Mock initiatives data - in real app, this would come from API
  const initiativesData = {
    1: {
      id: 1,
      title: "برنامج التوعية الصحية",
      titleEn: "Health Awareness Program",
      description: "برنامج شامل للتوعية بأهمية الصحة الوقائية والتغذية السليمة",
      descriptionEn:
        "Comprehensive program for awareness of preventive health and proper nutrition",
      content: `
        <p>يهدف برنامج التوعية الصحية إلى تعزيز الوعي الصحي بين جميع فئات المجتمع في مدينة حريملاء. يتضمن البرنامج مجموعة متنوعة من الأنشطة والفعاليات المصممة لتحسين المعرفة الصحية والممارسات الصحية السليمة.</p>
        
        <p>أهداف البرنامج:</p>
        <ul>
          <li>زيادة الوعي بأهمية الفحص الدوري</li>
          <li>تعزيز ثقافة التغذية السليمة</li>
          <li>التوعية بأضرار التدخين والكحول</li>
          <li>تشجيع ممارسة الرياضة والنشاط البدني</li>
          <li>التوعية بأهمية النوم الصحي</li>
        </ul>
        
        <p>يشمل البرنامج ورش عمل تفاعلية، محاضرات توعوية، حملات توعية في المدارس والمراكز التجارية، بالإضافة إلى مواد توعوية مطبوعة ورقمية.</p>
      `,
      contentEn: `
        <p>The Health Awareness Program aims to promote health awareness among all community segments in Harimlaa city. The program includes a variety of activities and events designed to improve health knowledge and healthy practices.</p>
        
        <p>Program Objectives:</p>
        <ul>
          <li>Increase awareness of the importance of regular check-ups</li>
          <li>Promote healthy nutrition culture</li>
          <li>Raise awareness about the harms of smoking and alcohol</li>
          <li>Encourage exercise and physical activity</li>
          <li>Raise awareness about the importance of healthy sleep</li>
        </ul>
        
        <p>The program includes interactive workshops, awareness lectures, awareness campaigns in schools and shopping centers, in addition to printed and digital awareness materials.</p>
      `,
      category: "صحة",
      categoryEn: "Health",
      status: "نشط",
      statusEn: "Active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      location: "مركز المدينة الصحي",
      locationEn: "City Health Center",
      volunteers: 150,
      maxVolunteers: 200,
      progress: 75,
      image: "/assets/health-workshop.jpg",
      likes: 89,
      shares: 23,
      views: 1250,
      requirements: [
        "خبرة في العمل التطوعي",
        "مهارات التواصل الجيد",
        "الالتزام بحضور الجلسات التدريبية",
        "شهادة صحية سارية",
      ],
      requirementsEn: [
        "Experience in volunteer work",
        "Good communication skills",
        "Commitment to attend training sessions",
        "Valid health certificate",
      ],
      benefits: [
        "شهادة مشاركة معتمدة",
        "تدريب متخصص في التوعية الصحية",
        "فرص للتواصل مع متخصصين",
        "مكافآت رمزية للمشاركين النشطين",
      ],
      benefitsEn: [
        "Certified participation certificate",
        "Specialized training in health awareness",
        "Opportunities to network with specialists",
        "Symbolic rewards for active participants",
      ],
      tags: ["صحة", "توعية", "مجتمع", "حريملاء"],
      tagsEn: ["Health", "Awareness", "Community", "Harimlaa"],
    },
    2: {
      id: 2,
      title: "مشروع التشجير الحضري",
      titleEn: "Urban Greening Project",
      description:
        "مبادرة لزيادة المساحات الخضراء في المدينة وتحسين جودة الهواء",
      descriptionEn:
        "Initiative to increase green spaces in the city and improve air quality",
      content: `
        <p>يهدف مشروع التشجير الحضري إلى تحويل مدينة حريملاء إلى مدينة أكثر خضرة وصحة من خلال زراعة الأشجار والنباتات في الشوارع والحدائق العامة والمناطق السكنية.</p>
        
        <p>مكونات المشروع:</p>
        <ul>
          <li>زراعة 1000 شجرة في الشوارع الرئيسية</li>
          <li>إنشاء حدائق صغيرة في الأحياء السكنية</li>
          <li>تطوير المساحات الخضراء الموجودة</li>
          <li>برنامج صيانة دورية للأشجار</li>
        </ul>
        
        <p>سيتم تنفيذ المشروع بالتعاون مع البلدية والجمعيات البيئية المحلية، مع إشراك المجتمع في عمليات الزراعة والصيانة.</p>
      `,
      contentEn: `
        <p>The Urban Greening Project aims to transform Harimlaa into a greener and healthier city by planting trees and plants in streets, public parks, and residential areas.</p>
        
        <p>Project Components:</p>
        <ul>
          <li>Plant 1000 trees on main streets</li>
          <li>Create small gardens in residential neighborhoods</li>
          <li>Develop existing green spaces</li>
          <li>Regular tree maintenance program</li>
        </ul>
        
        <p>The project will be implemented in cooperation with the municipality and local environmental associations, with community involvement in planting and maintenance operations.</p>
      `,
      category: "بيئة",
      categoryEn: "Environment",
      status: "نشط",
      statusEn: "Active",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      location: "جميع أنحاء المدينة",
      locationEn: "Throughout the City",
      volunteers: 75,
      maxVolunteers: 120,
      progress: 62,
      image: "/assets/green-garden.jpg",
      likes: 67,
      shares: 18,
      views: 980,
      requirements: [
        "حب الطبيعة والبيئة",
        "القدرة على العمل في الهواء الطلق",
        "الالتزام بحضور جلسات التدريب",
        "توفير أدوات العمل الأساسية",
      ],
      requirementsEn: [
        "Love for nature and environment",
        "Ability to work outdoors",
        "Commitment to attend training sessions",
        "Provide basic work tools",
      ],
      benefits: [
        "شهادة مشاركة في مشروع بيئي",
        "تدريب في تقنيات الزراعة",
        "فرصة للمساهمة في تحسين البيئة",
        "تكريم للمشاركين المتميزين",
      ],
      benefitsEn: [
        "Certificate of participation in environmental project",
        "Training in farming techniques",
        "Opportunity to contribute to environmental improvement",
        "Recognition for outstanding participants",
      ],
      tags: ["بيئة", "تشجير", "استدامة", "حريملاء"],
      tagsEn: ["Environment", "Greening", "Sustainability", "Harimlaa"],
    },
  };

  const initiative = initiativesData[id];
  const isRTL = language === "ar";

  if (!initiative) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "ar" ? "المبادرة غير موجودة" : "Initiative Not Found"}
          </h1>
          <Button onClick={() => navigate("/initiatives")}>
            {language === "ar" ? "العودة للمبادرات" : "Back to Initiatives"}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "bg-green-500",
        text: language === "ar" ? "نشط" : "Active",
      },
      completed: {
        color: "bg-blue-500",
        text: language === "ar" ? "مكتمل" : "Completed",
      },
      cancelled: {
        color: "bg-red-500",
        text: language === "ar" ? "ملغي" : "Cancelled",
      },
      "gathering volunteers": {
        color: "bg-yellow-500",
        text: language === "ar" ? "جمع متطوعين" : "Gathering Volunteers",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={`${config.color} text-white`}>{config.text}</Badge>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      health: {
        color: "bg-blue-100 text-blue-800",
        text: language === "ar" ? "صحة" : "Health",
      },
      environment: {
        color: "bg-green-100 text-green-800",
        text: language === "ar" ? "بيئة" : "Environment",
      },
      community: {
        color: "bg-purple-100 text-purple-800",
        text: language === "ar" ? "مجتمع" : "Community",
      },
      education: {
        color: "bg-orange-100 text-orange-800",
        text: language === "ar" ? "تعليم" : "Education",
      },
    };

    const config = categoryConfig[category] || categoryConfig.health;
    return (
      <Badge variant="outline" className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const handleApply = async () => {
    setIsApplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsApplying(false);
    // Show success message
    alert(
      language === "ar"
        ? "تم تقديم طلب المشاركة بنجاح!"
        : "Application submitted successfully!"
    );
  };

  const volunteerProgress =
    (initiative.volunteers / initiative.maxVolunteers) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/initiatives")}
            className={`${isRTL ? "mr-4" : "ml-4"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {language === "ar" ? "العودة للمبادرات" : "Back to Initiatives"}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Initiative Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {getCategoryBadge(initiative.category)}
              {getStatusBadge(initiative.status)}
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar" ? initiative.title : initiative.titleEn}
            </h1>

            <p
              className={`text-xl text-muted-foreground mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar"
                ? initiative.description
                : initiative.descriptionEn}
            </p>

            {/* Initiative Meta */}
            <div
              className={`flex flex-wrap items-center gap-6 text-sm text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {language === "ar"
                    ? initiative.location
                    : initiative.locationEn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(initiative.startDate)} -{" "}
                  {formatDate(initiative.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {initiative.volunteers} / {initiative.maxVolunteers}{" "}
                  {language === "ar" ? "متطوع" : "volunteers"}
                </span>
              </div>
            </div>
          </div>

          {/* Initiative Image */}
          <div className="mb-8">
            <img
              src={initiative.image}
              alt={language === "ar" ? initiative.title : initiative.titleEn}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Volunteer Progress */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "تقدم المتطوعين" : "Volunteer Progress"}
                </h3>
                <div
                  className={`space-y-4 ${isRTL ? "rtl" : "ltr"}`}
                  dir={isRTL ? "rtl" : "ltr"}>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {initiative.volunteers} {language === "ar" ? "من" : "of"}{" "}
                      {initiative.maxVolunteers}{" "}
                      {language === "ar" ? "متطوع" : "volunteers"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(volunteerProgress)}%
                    </span>
                  </div>
                  <div
                    className={`w-full ${isRTL ? "rtl" : "ltr"}`}
                    dir={isRTL ? "rtl" : "ltr"}>
                    <Progress
                      value={volunteerProgress}
                      className={`h-3 ${isRTL ? "rtl" : "ltr"}`}
                      style={isRTL ? { transform: "scaleX(-1)" } : {}}
                    />
                  </div>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {initiative.maxVolunteers - initiative.volunteers}{" "}
                    {language === "ar" ? "متطوع مطلوب" : "volunteers needed"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Initiative Content */}
          <div
            className={`prose prose-lg max-w-none ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  language === "ar" ? initiative.content : initiative.contentEn,
              }}
            />
          </div>

          {/* Requirements and Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "المتطلبات" : "Requirements"}
                </h3>
                <ul
                  className={`space-y-2 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {(language === "ar"
                    ? initiative.requirements
                    : initiative.requirementsEn
                  ).map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "الفوائد" : "Benefits"}
                </h3>
                <ul
                  className={`space-y-2 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {(language === "ar"
                    ? initiative.benefits
                    : initiative.benefitsEn
                  ).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Apply Button */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={handleApply}
              disabled={
                isApplying || initiative.volunteers >= initiative.maxVolunteers
              }
              className="px-8 py-6 text-lg">
              <UserPlus className="w-5 h-5 mr-2" />
              {isApplying
                ? language === "ar"
                  ? "جاري التقديم..."
                  : "Applying..."
                : initiative.volunteers >= initiative.maxVolunteers
                ? language === "ar"
                  ? "المبادرة ممتلئة"
                  : "Initiative Full"
                : language === "ar"
                ? "تقدم للمشاركة"
                : "Apply to Participate"}
            </Button>
            {initiative.volunteers >= initiative.maxVolunteers && (
              <p
                className={`text-sm text-muted-foreground mt-2 ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "تم الوصول للحد الأقصى من المتطوعين"
                  : "Maximum volunteers reached"}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar" ? "العلامات" : "Tags"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(language === "ar" ? initiative.tags : initiative.tagsEn).map(
                (tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </div>

          {/* Initiative Actions */}
          <div className="mt-8 pt-8 border-t">
            <div
              className={`flex items-center justify-between ${
                isRTL ? "flex-row-reverse" : "flex-row"
              }`}>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {initiative.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  {initiative.shares}
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  {initiative.views.toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiative;
