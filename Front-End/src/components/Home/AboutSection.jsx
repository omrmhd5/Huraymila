import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Target,
  Users,
  Leaf,
  Heart,
  Building2,
  Calendar,
  Award,
  MapPin,
  TrendingUp,
  Shield,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    {
      icon: Heart,
      title: t("about.features.healthInitiatives"),
      description: t("about.features.healthInitiativesDesc"),
    },
    {
      icon: Leaf,
      title: t("about.features.environmentalSustainability"),
      description: t("about.features.environmentalSustainabilityDesc"),
    },
    {
      icon: Users,
      title: t("about.features.communityPartnership"),
      description: t("about.features.communityPartnershipDesc"),
    },
    {
      icon: Building2,
      title: t("about.features.innovation"),
      description: t("about.features.innovationDesc"),
    },
  ];

  const stats = [
    { value: "2025", label: t("about.stats.founded"), icon: Award },
    { value: "50+", label: t("about.stats.healthInitiatives"), icon: Target },
    { value: "10K+", label: t("about.stats.beneficiaries"), icon: Users },
    { value: "21", label: t("about.stats.partnerOrganizations"), icon: Shield },
  ];

  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-secondary/15">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold text-foreground mb-6",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("about.title")}
          </h2>
          <p
            className={cn(
              "text-xl text-muted-foreground mb-8 max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("about.subtitle")}
          </p>
          <p
            className={cn(
              "text-lg text-foreground/80 leading-relaxed max-w-5xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("about.description")}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("about.vision.title")}
                </h3>
              </div>
              <p
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("about.vision.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("about.mission.title")}
                </h3>
              </div>
              <p
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("about.mission.description")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Objectives */}
        <Card className="mb-16 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <h3
              className={cn(
                "text-3xl font-bold text-foreground mb-8 text-center",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("about.objectives.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t("about.objectives.list").map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p
                    className={cn(
                      "text-foreground/80",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h3
            className={cn(
              "text-3xl font-bold text-foreground mb-12 text-center",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL ? "المميزات الرئيسية" : "Key Features"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <h4
                      className={cn(
                        "text-lg font-semibold mb-2",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {feature.title}
                    </h4>
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
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <h3
            className={cn(
              "text-3xl font-bold text-foreground mb-12 text-center",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL ? "إحصائيات البرنامج" : "Program Statistics"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
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
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigateToTop("/about")}
            className="text-lg px-8 py-6">
            {t("about.discoverMore")}
            <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
