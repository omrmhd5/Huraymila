import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  Leaf,
  Building2,
  ArrowRight,
  Activity,
  BarChart3,
  FileText,
  BookOpen,
  Shield,
  Droplets,
  Globe,
  Zap,
  Stethoscope,
  School,
  HandHeart,
  Home,
  Briefcase,
  GraduationCap,
  Star,
  Car,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { language } = useTheme();
  const navigate = useNavigate();

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    ar: {
      title: "مدينة حريملاء الصحية",
      subtitle: "مبادرة وطنية لتعزيز الصحة العامة وتحسين جودة الحياة",
      description:
        "نعمل معاً لبناء مدينة صحية ومستدامة من خلال المبادرات المجتمعية والشراكات الاستراتيجية مع الجهات الحكومية والمؤسسات الصحية.",
      cta: "انضم إلينا",
      learnMore: "اعرف المزيد",
      stats: [
        { value: "25+", label: "مبادرة صحية", icon: Heart },
        { value: "500+", label: "متطوع نشط", icon: Users },
        { value: "15+", label: "مشروع بيئي", icon: Leaf },
        { value: "21", label: "جهة شريكة", icon: Building2 },
      ],
      partners: [
        {
          name: "مكتب تنسيق برنامج المدينة الصحية",
          icon: Activity,
          color: "bg-red-500",
        },
        { name: "المرصد الحضري", icon: BarChart3, color: "bg-blue-500" },
        {
          name: "وزارة الشؤون البلدية والقروية",
          icon: Building2,
          color: "bg-green-500",
        },
        {
          name: "الهيئة العامة للاحصاء",
          icon: FileText,
          color: "bg-purple-500",
        },
        { name: "المراكز الثقافية", icon: BookOpen, color: "bg-amber-500" },
        { name: "الدفاع المدني", icon: Shield, color: "bg-orange-500" },
        { name: "الجمعيات البيئية", icon: Leaf, color: "bg-emerald-500" },
        { name: "شركة المياه الوطنية", icon: Droplets, color: "bg-cyan-500" },
        {
          name: "وزارة البيئة والمياه والزراعة",
          icon: Globe,
          color: "bg-teal-500",
        },
        {
          name: "الهيئة العامة للغذاء والدواء",
          icon: Shield,
          color: "bg-indigo-500",
        },
        {
          name: "الهيئة العامة للأرصاد وحماية البيئة",
          icon: Zap,
          color: "bg-sky-500",
        },
        { name: "وزارة الصحة", icon: Stethoscope, color: "bg-red-600" },
        { name: "إدارة التعليم", icon: School, color: "bg-green-600" },
        {
          name: "وزارة الموارد البشرية والتنمية الاجتماعية",
          icon: Users,
          color: "bg-pink-500",
        },
        { name: "إدارة الدفاع المدني", icon: Shield, color: "bg-orange-600" },
        { name: "الهلال الأحمر", icon: Heart, color: "bg-red-500" },
        { name: "نادي الحي", icon: Home, color: "bg-blue-600" },
        {
          name: "الجمعيات الخيرية والأهلية",
          icon: HandHeart,
          color: "bg-pink-600",
        },
        {
          name: "المؤسسة العامة للتدريب التقني والمهني",
          icon: Briefcase,
          color: "bg-indigo-600",
        },
        { name: "وزارة التعليم", icon: GraduationCap, color: "bg-green-700" },
        { name: "الضمان الاجتماعي", icon: Star, color: "bg-purple-600" },
      ],
    },
    en: {
      title: "Huraymila Healthy City",
      subtitle: "A National Initiative for Public Health and Quality of Life",
      description:
        "We work together to build a healthy and sustainable city through community initiatives and strategic partnerships with government agencies and health institutions.",
      cta: "Join Us",
      learnMore: "Learn More",
      stats: [
        { value: "25+", label: "Health Initiatives", icon: Heart },
        { value: "500+", label: "Active Volunteers", icon: Users },
        { value: "15+", label: "Environmental Projects", icon: Leaf },
        { value: "21", label: "Partner Organizations", icon: Building2 },
      ],
      partners: [
        {
          name: "Healthy City Program Coordination Office",
          icon: Activity,
          color: "bg-red-500",
        },
        { name: "Urban Observatory", icon: BarChart3, color: "bg-blue-500" },
        {
          name: "Ministry of Municipal and Rural Affairs",
          icon: Building2,
          color: "bg-green-500",
        },
        {
          name: "General Authority for Statistics",
          icon: FileText,
          color: "bg-purple-500",
        },
        { name: "Cultural Centers", icon: BookOpen, color: "bg-amber-500" },
        { name: "Civil Defense", icon: Shield, color: "bg-orange-500" },
        {
          name: "Environmental Associations",
          icon: Leaf,
          color: "bg-emerald-500",
        },
        {
          name: "National Water Company",
          icon: Droplets,
          color: "bg-cyan-500",
        },
        {
          name: "Ministry of Environment, Water and Agriculture",
          icon: Globe,
          color: "bg-teal-500",
        },
        {
          name: "Food and Drug Authority",
          icon: Shield,
          color: "bg-indigo-500",
        },
        {
          name: "General Authority for Meteorology and Environmental Protection",
          icon: Zap,
          color: "bg-sky-500",
        },
        { name: "Ministry of Health", icon: Stethoscope, color: "bg-red-600" },
        { name: "Education Department", icon: School, color: "bg-green-600" },
        {
          name: "Ministry of Human Resources and Social Development",
          icon: Users,
          color: "bg-pink-500",
        },
        {
          name: "Civil Defense Administration",
          icon: Shield,
          color: "bg-orange-600",
        },
        { name: "Red Crescent", icon: Heart, color: "bg-red-500" },
        { name: "Neighborhood Club", icon: Home, color: "bg-blue-600" },
        {
          name: "Charity and Civil Society Organizations",
          icon: HandHeart,
          color: "bg-pink-600",
        },
        {
          name: "Technical and Vocational Training Corporation",
          icon: Briefcase,
          color: "bg-indigo-600",
        },
        {
          name: "Ministry of Education",
          icon: GraduationCap,
          color: "bg-green-700",
        },
        { name: "Social Security", icon: Star, color: "bg-purple-600" },
      ],
    },
  };

  const current = content[language];
  const isRTL = language === "ar";

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero.jpg')",
          }}>
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {current.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {current.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              {current.description}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                onClick={() => navigateToTop("/volunteer")}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                {current.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
              </Button>

              <Button
                // variant="outline"
                size="lg"
                onClick={() => navigateToTop("/about")}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                {current.learnMore}
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 mb-12">
              {current.stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 sm:mb-3 " />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div
                      className={cn(
                        "text-white/80 font-medium text-sm sm:text-base",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Partner Icons - Full Width Section */}
      <section className="w-full bg-background backdrop-blur-sm py-12">
        <div className="w-full px-4">
          <h3
            className={cn(
              "text-xl md:text-2xl font-bold text-white mb-8 text-center",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL ? "شركاؤنا في النجاح" : "Our Partners in Success"}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-7xl mx-auto">
            {current.partners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={index}
                  className="w-24 sm:w-28 bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div
                    className={cn(
                      "text-white/70 text-xs leading-tight",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {partner.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
