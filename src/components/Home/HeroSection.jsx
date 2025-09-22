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
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stats = [
    { value: "25+", label: t("home.healthInitiatives"), icon: Heart },
    { value: "500+", label: t("home.activeVolunteers"), icon: Users },
    { value: "15+", label: t("home.environmentalProjects"), icon: Leaf },
    { value: "21", label: t("home.partnerOrganizations"), icon: Building2 },
  ];
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
              {t("home.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("home.subtitle")}
            </p>

            {/* Description */}
            <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t("home.description")}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                onClick={() => navigateToTop("/volunteer")}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                {t("home.joinUs")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 mb-12">
              {stats.map((stat, index) => {
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

        {/* Saudi Vision 2030 Logo - Bottom Left */}
        <div className="absolute bottom-8 left-16 z-20">
          <div className="w-36 h-36">
            <img
              src="/assets/logos/رؤية المملكة 2030.png"
              alt="Saudi Vision 2030"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="w-full h-full bg-muted rounded flex items-center justify-center text-xs text-muted-foreground"
              style={{ display: "none" }}>
              V2030
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
    </>
  );
};

export default HeroSection;
