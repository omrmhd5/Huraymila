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

  // Get current translations
  const current = {
    title: t("about.title"),
    subtitle: t("about.subtitle"),
    description: t("about.description"),
    vision: {
      title: t("about.vision.title"),
      description: t("about.vision.description"),
    },
    mission: {
      title: t("about.mission.title"),
      description: t("about.mission.description"),
    },
    objectives: {
      title: t("about.objectives.title"),
      list: t("about.objectives.list"),
    },
    aboutHuraymila: {
      title: t("aboutHuraymila.title"),
      description: t("aboutHuraymila.description"),
      facts: [
        {
          value: t("aboutHuraymila.stats.populationValue"),
          label: t("aboutHuraymila.stats.population"),
        },
        {
          value: t("aboutHuraymila.stats.foundedValue"),
          label: t("aboutHuraymila.stats.founded"),
        },
        {
          value: t("aboutHuraymila.stats.elevationValue"),
          label: t("aboutHuraymila.stats.elevation"),
        },
        {
          value: t("aboutHuraymila.stats.areaValue"),
          label: t("aboutHuraymila.stats.area"),
        },
      ],
    },
  };

  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-secondary/15">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.title}
          </h1>
          <p
            className={cn(
              "text-xl text-muted-foreground mb-8 max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.subtitle}
          </p>
          <div className="max-w-5xl mx-auto">
            <p
              className={cn(
                "text-lg text-foreground/80 leading-relaxed mb-8",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {current.description}
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.vision.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {current.vision.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.mission.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {current.mission.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Objectives */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.objectives.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {current.objectives.list.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p
                      className={cn(
                        "text-foreground/80 leading-relaxed",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {objective}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* About Huraymila */}
        <div className="mb-20">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className={cn(
                    "text-2xl md:text-3xl font-bold text-foreground",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.aboutHuraymila.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-lg text-foreground/80 leading-relaxed mb-8",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {current.aboutHuraymila.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {current.aboutHuraymila.facts.map((fact, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {fact.value}
                    </div>
                    <div
                      className={cn(
                        "text-sm text-muted-foreground",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigateToTop("/about-huraymila")}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {isRTL
                    ? "اعرف المزيد عن حريملاء"
                    : "Learn More About Huraymila"}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
