import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import {
  MapPin,
  Users,
  Calendar,
  Award,
  Leaf,
  Building2,
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Mountain,
  Sun,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const AboutHuraymila = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images - you can replace these with actual images later
  const slideshowImages = [
    {
      name: "حافة العالم حريملاء",
      src: "/assets/slideshow/1.jpg",
      alt: "حافة العالم حريملاء",
      title: "حافة العالم حريملاء",
      description: "إطلالة ساحرة من أعلى منحدرات حافة العالم في حريملاء.",
    },
    {
      name: "مطل الجرف العظيم حريملاء",
      src: "/assets/slideshow/2.jpg",
      alt: "مطل الجرف العظيم حريملاء",
      title: "مطل الجرف العظيم حريملاء",
      description: "موقع مرتفع يكشف مشهداً بانورامياً للصحراء الواسعة.",
    },
    {
      name: "حافة العالم - قمة حريملاء",
      src: "/assets/slideshow/3.jpg",
      alt: "حافة العالم - قمة حريملاء",
      title: "حافة العالم - قمة حريملاء",
      description: "قمة صخرية مذهلة تجذب عشاق المغامرات والتصوير.",
    },
    {
      name: "مطل نهاية العالم حريملاء",
      src: "/assets/slideshow/4.jpg",
      alt: "مطل نهاية العالم حريملاء",
      title: "مطل نهاية العالم حريملاء",
      description: "مطل مرتفع يطل على الصحراء في مشهد يشبه نهاية العالم.",
    },
    {
      name: "طريق الصعود إلى حافة العالم حريملاء",
      src: "/assets/slideshow/5.jpg",
      alt: "طريق الصعود إلى حافة العالم حريملاء",
      title: "طريق الصعود إلى حافة العالم حريملاء",
      description: "مسار ترابي يقود الزوار نحو القمم العالية.",
    },
  ];

  const features = [
    {
      icon: Mountain,
      title: t("aboutHuraymila.features.scenicNature"),
      description: t("aboutHuraymila.features.scenicNatureDesc"),
    },
    {
      icon: Sun,
      title: t("aboutHuraymila.features.moderateClimate"),
      description: t("aboutHuraymila.features.moderateClimateDesc"),
    },
    {
      icon: Leaf,
      title: t("aboutHuraymila.features.thrivingAgriculture"),
      description: t("aboutHuraymila.features.thrivingAgricultureDesc"),
    },
    {
      icon: Building2,
      title: t("aboutHuraymila.features.continuousDevelopment"),
      description: t("aboutHuraymila.features.continuousDevelopmentDesc"),
    },
  ];

  const stats = [
    {
      label: t("aboutHuraymila.stats.population"),
      value: t("aboutHuraymila.stats.populationValue"),
      icon: Users,
    },
    {
      label: t("aboutHuraymila.stats.founded"),
      value: t("aboutHuraymila.stats.foundedValue"),
      icon: Calendar,
    },
    {
      label: t("aboutHuraymila.stats.elevation"),
      value: t("aboutHuraymila.stats.elevationValue"),
      icon: Mountain,
    },
    {
      label: t("aboutHuraymila.stats.area"),
      value: t("aboutHuraymila.stats.areaValue"),
      icon: Globe,
    },
    {
      label: t("aboutHuraymila.stats.populationDensity"),
      value: t("aboutHuraymila.stats.populationDensityValue"),
      icon: Users,
    },
    {
      label: t("aboutHuraymila.stats.saudis"),
      value: t("aboutHuraymila.stats.saudisValue"),
      icon: Heart,
    },
    {
      label: t("aboutHuraymila.stats.nonSaudis"),
      value: t("aboutHuraymila.stats.nonSaudisValue"),
      icon: Globe,
    },
    {
      label: t("aboutHuraymila.stats.households"),
      value: t("aboutHuraymila.stats.householdsValue"),
      icon: Building2,
    },
    {
      label: t("aboutHuraymila.stats.dialingCode"),
      value: t("aboutHuraymila.stats.dialingCodeValue"),
      icon: Phone,
    },
    {
      label: t("aboutHuraymila.stats.coordinates"),
      value: t("aboutHuraymila.stats.coordinatesValue"),
      icon: MapPin,
    },
  ];

  const isRTL = language === "ar";

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection animation="fadeIn" delay={0}>
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <AnimatedSection animation="fadeInDown" delay={200}>
                <h1
                  className={cn(
                    "text-4xl md:text-6xl font-bold mb-4",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.title")}
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={400}>
                <p
                  className={cn(
                    "text-xl md:text-2xl opacity-90",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.subtitle")}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <AnimatedSection animation="fadeInLeft" delay={200}>
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className={cn(
                "flex items-center gap-2",
                isRTL ? "font-arabic" : "font-english"
              )}>
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              {t("common.backToHome")}
            </Button>
          </div>
        </AnimatedSection>

        {/* Slideshow */}
        <AnimatedSection animation="fadeInUp" delay={400}>
          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="relative h-96 md:h-[500px]">
                <div className="relative h-full">
                  <img
                    src={slideshowImages[currentSlide].src}
                    alt={slideshowImages[currentSlide].alt}
                    className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <AnimatedSection animation="fadeInUp" delay={600}>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3
                        className={cn(
                          "text-2xl font-bold mb-2",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {slideshowImages[currentSlide].title}
                      </h3>
                      <p
                        className={cn(
                          "text-lg opacity-90",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {slideshowImages[currentSlide].description}
                      </p>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300 hover:scale-110">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300 hover:scale-110">
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection animation="fadeInUp" delay={600}>
          <div className="mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <p
                  className={cn(
                    "text-lg text-foreground/80 leading-relaxed text-center max-w-4xl mx-auto",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Information Sections */}
        <AnimatedSection animation="fadeInUp" delay={800}>
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            staggerDelay={150}
            animation="fadeInUp">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {t("aboutHuraymila.history.title")}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.history.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {t("aboutHuraymila.geography.title")}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.geography.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {t("aboutHuraymila.economy.title")}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.economy.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-500" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {t("aboutHuraymila.culture.title")}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("aboutHuraymila.culture.description")}
                </p>
              </CardContent>
            </Card>
          </StaggeredContainer>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection animation="fadeInUp" delay={1000}>
          <div className="mb-16">
            <AnimatedSection animation="fadeInDown" delay={1200}>
              <h2
                className={cn(
                  "text-3xl font-bold text-center mb-12",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("aboutHuraymila.keyFeatures")}
              </h2>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="scaleIn">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-2",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </AnimatedSection>

        {/* Statistics */}
        <AnimatedSection animation="fadeInUp" delay={1200}>
          <div className="mb-16">
            <AnimatedSection animation="fadeInDown" delay={1400}>
              <h2
                className={cn(
                  "text-3xl font-bold text-center mb-12",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("aboutHuraymila.statistics")}
              </h2>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
              staggerDelay={80}
              animation="fadeInUp">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutHuraymila;
