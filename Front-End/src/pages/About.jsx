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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("contact.phone")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("aboutPage.phone")}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("contact.email")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("aboutPage.email")}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("contact.workingHours")}
                  </h3>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {t("aboutPage.workingHours")}
                  </p>
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
