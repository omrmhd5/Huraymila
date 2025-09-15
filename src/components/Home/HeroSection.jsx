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
      stats: [
        { value: "25+", label: "مبادرة صحية", icon: Heart },
        { value: "500+", label: "متطوع نشط", icon: Users },
        { value: "15+", label: "مشروع بيئي", icon: Leaf },
        { value: "21", label: "جهة شريكة", icon: Building2 },
      ],
      partners: [
        {
          name: "رؤية المملكة 2030",
          logo: "/assets/logos/رؤية المملكة 2030.png",
        },
        {
          name: "وزارة الصحة",
          logo: "/assets/logos/وزارة الصحة.png",
        },
        {
          name: "وزارة التعليم",
          logo: "/assets/logos/وزارة التعليم.png",
        },
        {
          name: "وزارة البيئة والمياه والزراعة",
          logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
        },
        {
          name: "وزارة الموارد البشرية والتنمية الاجتماعية",
          logo: "/assets/logos/وزارة الموارد البشرية.png",
        },
        {
          name: "مستشفى حريملاء العام",
          logo: "/assets/logos/مستشفى حريملاء العام.jpg",
        },
        {
          name: "الدفاع المدني السعودي",
          logo: "/assets/logos/الدفاع_المدني_السعودي.png",
        },
        {
          name: "شركة المياه الوطنية",
          logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
        },
        {
          name: "الداخلية محافظة حريملاء",
          logo: "/assets/logos/الداخلية محافظة حريملاء.png",
        },
        {
          name: "أمانة الرياض",
          logo: "/assets/logos/امانة الرياض.ico",
        },
        {
          name: "القوة الخاصة للأمن البيئي",
          logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
        },
        {
          name: "الشرطة",
          logo: "/assets/logos/الشرطة.jpg",
        },
        {
          name: "المرور",
          logo: "/assets/logos/المرور.png",
        },
        {
          name: "جمعية حريملاء الخيرية",
          logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
        },
        {
          name: "جمعية التنمية الأهلية بحريملاء",
          logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
        },
      ],
    },
    en: {
      title: "Huraymila Healthy City",
      subtitle: "A National Initiative for Public Health and Quality of Life",
      description:
        "We work together to build a healthy and sustainable city through community initiatives and strategic partnerships with government agencies and health institutions.",
      cta: "Join Us",
      stats: [
        { value: "25+", label: "Health Initiatives", icon: Heart },
        { value: "500+", label: "Active Volunteers", icon: Users },
        { value: "15+", label: "Environmental Projects", icon: Leaf },
        { value: "21", label: "Partner Organizations", icon: Building2 },
      ],
      partners: [
        {
          name: "Saudi Vision 2030",
          logo: "/assets/logos/رؤية المملكة 2030.png",
        },
        {
          name: "Ministry of Health",
          logo: "/assets/logos/وزارة الصحة.png",
        },
        {
          name: "Ministry of Education",
          logo: "/assets/logos/وزارة التعليم.png",
        },
        {
          name: "Ministry of Environment, Water and Agriculture",
          logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
        },
        {
          name: "Ministry of Human Resources and Social Development",
          logo: "/assets/logos/وزارة الموارد البشرية.png",
        },
        {
          name: "Huraymila General Hospital",
          logo: "/assets/logos/مستشفى حريملاء العام.jpg",
        },
        {
          name: "Saudi Civil Defense",
          logo: "/assets/logos/الدفاع_المدني_السعودي.png",
        },
        {
          name: "National Water Company",
          logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
        },
        {
          name: "Huraymila Governorate Interior",
          logo: "/assets/logos/الداخلية محافظة حريملاء.png",
        },
        {
          name: "Riyadh Municipality",
          logo: "/assets/logos/امانة الرياض.ico",
        },
        {
          name: "Special Forces for Environmental Security",
          logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
        },
        {
          name: "Police",
          logo: "/assets/logos/الشرطة.jpg",
        },
        {
          name: "Traffic Department",
          logo: "/assets/logos/المرور.png",
        },
        {
          name: "Huraymila Charity Association",
          logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
        },
        {
          name: "Huraymila Community Development Association",
          logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
        },
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
            {/* Heritage Pattern Decoration */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 border-2 border-accent rotate-45 rounded-sm"></div>
              </div>
            </div>
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
      <section className="w-full bg-primary/10 backdrop-blur-sm py-12">
        <div className="w-full px-4">
          <h3
            className={cn(
              "text-xl md:text-2xl font-bold text-foreground mb-8 text-center",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL ? "شركاؤنا في النجاح" : "Our Partners in Success"}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-7xl mx-auto">
            {current.partners.map((partner, index) => {
              return (
                <div
                  key={index}
                  className="w-28 sm:w-32 bg-card backdrop-blur-md rounded-lg p-4 text-center border border-border hover:bg-card/70 transition-all duration-300 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                      style={{ display: "none" }}>
                      {partner.name.charAt(0)}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-foreground text-xs leading-tight",
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
