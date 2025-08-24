import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const HeroSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "مدينة حريملاء الصحية",
      subtitle: "مبادرة وطنية لتعزيز الصحة العامة وتحسين جودة الحياة",
      description:
        "نعمل معاً لبناء مدينة صحية ومستدامة من خلال المبادرات المجتمعية والشراكات الاستراتيجية مع الجهات الحكومية والمؤسسات الصحية.",
      cta: "انضم إلينا",
      learnMore: "اعرف المزيد",
      watchVideo: "شاهد الفيديو",
      stats: [
        { value: "50+", label: "مبادرة صحية", icon: Target },
        { value: "10K+", label: "مستفيد", icon: Users },
        { value: "95%", label: "معدل الرضا", icon: Heart },
        { value: "25%", label: "تحسن الصحة", icon: TrendingUp },
      ],
    },
    en: {
      title: "Harimlaa Healthy City",
      subtitle: "A National Initiative for Public Health and Quality of Life",
      description:
        "We work together to build a healthy and sustainable city through community initiatives and strategic partnerships with government agencies and health institutions.",
      cta: "Join Us",
      learnMore: "Learn More",
      watchVideo: "Watch Video",
      stats: [
        { value: "50+", label: "Health Initiatives", icon: Target },
        { value: "10K+", label: "Beneficiaries", icon: Users },
        { value: "95%", label: "Satisfaction Rate", icon: Heart },
        { value: "25%", label: "Health Improvement", icon: TrendingUp },
      ],
    },
  };

  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero-harimlaa.jpg')",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
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
            <Link to="/volunteer">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                {current.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                {current.learnMore}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-6 text-white hover:bg-white/10">
              <Play className="w-5 h-5 mr-2" />
              {current.watchVideo}
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {current.stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </CardContent>
                </Card>
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
  );
};

export default HeroSection;
