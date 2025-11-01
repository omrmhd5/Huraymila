import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import {
  Heart,
  Target,
  Award,
  Users,
  Shield,
  Leaf,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Activity,
  BookOpen,
  HandHeart,
  Youtube,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Custom X Logo Component
const XLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const About = () => {
  const { loading } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();
  const isRTL = language === "ar";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const stats = [
    { value: "2025", label: t("aboutPage.stats.founded"), icon: Award },
    {
      value: "50+",
      label: t("aboutPage.stats.healthInitiatives"),
      icon: Target,
    },
    { value: "10K+", label: t("aboutPage.stats.beneficiaries"), icon: Users },
    {
      value: "21",
      label: t("aboutPage.stats.partnerOrganizations"),
      icon: Shield,
    },
  ];

  const features = [
    {
      title: t("aboutPage.features.initiatives.title"),
      description: t("aboutPage.features.initiatives.description"),
      icon: Heart,
      color: "bg-red-500",
    },
    {
      title: t("aboutPage.features.environment.title"),
      description: t("aboutPage.features.environment.description"),
      icon: Leaf,
      color: "bg-green-500",
    },
    {
      title: t("aboutPage.features.community.title"),
      description: t("aboutPage.features.community.description"),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: t("aboutPage.features.partnerships.title"),
      description: t("aboutPage.features.partnerships.description"),
      icon: HandHeart,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" delay={0}>
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedSection animation="fadeInDown" delay={200}>
                <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
                  {t("aboutPage.subtitle")}
                </Badge>
              </AnimatedSection>
              <AnimatedSection animation="fadeIn" delay={300}>
                <div className="max-w-5xl mx-auto mb-8">
                  <p
                    className={`text-lg md:text-xl text-foreground/90 leading-relaxed bg-primary/5 border border-primary/20 rounded-lg p-6 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL
                      ? "انطلق برنامج مدينة حريملاء الصحية بتوجيهٍ كريم من صاحب السمو الملكي أمير منطقة الرياض – حفظه الله – ليكون نموذجًا تنمويًا شاملًا يُعزز الصحة العامة، ويحمي البيئة، ويُفعّل المشاركة المجتمعية، انسجامًا مع رؤية المملكة 2030 وبرنامج جودة الحياة"
                      : "The Huraymila Healthy City Program was launched under the gracious directive of His Royal Highness the Prince of Riyadh Region – may God protect him – to be a comprehensive development model that promotes public health, protects the environment, and activates community participation, in line with the Kingdom's Vision 2030 and the Quality of Life Program"}
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={400}>
                <h1
                  className={`text-4xl md:text-6xl font-bold text-foreground mb-6 ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("aboutPage.title")}
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeIn" delay={600}>
                <p
                  className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("aboutPage.description")}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission, Vision, Values, Goals */}
      <AnimatedSection animation="fadeInUp" delay={200}>
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <StaggeredContainer
              className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16"
              staggerDelay={150}
              animation="fadeInUp">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    {t("aboutPage.mission")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("aboutPage.missionText")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    {t("aboutPage.vision")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("aboutPage.visionText")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-primary" />
                    {t("aboutPage.goals")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed mb-4 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("aboutPage.goalsText")}
                  </p>
                  <ul className="space-y-2">
                    {t("aboutPage.goalsList")
                      .slice(0, 4)
                      .map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span
                            className={`text-sm text-muted-foreground ${
                              isRTL ? "font-arabic" : "font-sans"
                            }`}>
                            {goal}
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Statistics */}
      <AnimatedSection animation="fadeInUp" delay={400}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInDown" delay={600}>
              <div className="text-center mb-16">
                <h2
                  className={`text-3xl font-bold text-foreground mb-4 ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("about.stats.title")}
                </h2>
              </div>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="scaleIn">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {stat.value}
                      </div>
                      <div
                        className={`text-sm text-muted-foreground ${
                          isRTL ? "font-arabic" : "font-sans"
                        }`}>
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection animation="fadeInUp" delay={600}>
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInDown" delay={800}>
              <div className="text-center mb-16">
                <h2
                  className={`text-3xl font-bold text-foreground mb-4 ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("about.features.title")}
                </h2>
              </div>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              staggerDelay={150}
              animation="fadeInUp">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle
                        className={`text-xl ${
                          isRTL ? "font-arabic" : "font-sans"
                        }`}>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={`text-muted-foreground leading-relaxed ${
                          isRTL ? "font-arabic" : "font-sans"
                        }`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection animation="fadeInUp" delay={1200}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInDown" delay={1400}>
              <div className="text-center mb-16">
                <h2
                  className={`text-3xl font-bold text-foreground mb-4 ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("aboutPage.contact")}
                </h2>
                <p
                  className={`text-lg text-muted-foreground ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {t("aboutPage.contactDescription")}
                </p>
              </div>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={150}
              animation="scaleIn">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("contact.address")}
                  </h3>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("aboutPage.address")}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <a
                    href="https://twitter.com/Hrm_HCP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <XLogo className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {isRTL ? "إكس" : "X"}
                    </h3>
                    <p className="text-sm text-muted-foreground">@Hrm_HCP</p>
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <a
                    href="mailto:Hrmhcp11@gmail.com"
                    className="block">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("contact.email")}
                    </h3>
                    <p className="text-sm text-muted-foreground break-all">
                      Hrmhcp11@gmail.com
                    </p>
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <a
                    href="https://youtube.com/channel/UChLyo00EAZd8YHhtKYFn-Ug?si=QsIMWTPtsnw9xA42"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block">
                    <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Youtube className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {isRTL ? "يوتيوب" : "YouTube"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? "قناة حريملاء الصحية" : "Huraymila Healthy City"}
                    </p>
                  </a>
                </CardContent>
              </Card>
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default About;
