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
      <main className="pt-16 pb-8">
        {/* Hero Section */}
        <AnimatedSection animation="fadeIn" delay={0}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                className={`text-4xl md:text-6xl font-bold text-foreground mb-6 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.title")}
              </h1>
              <h2
                className={`text-xl md:text-2xl text-primary mb-8 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.subtitle")}
              </h2>
              <p
                className={`text-lg text-muted-foreground leading-relaxed ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.description")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission & Vision */}
        <AnimatedSection animation="fadeInUp" delay={200}>
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle
                    className={`text-2xl font-bold text-primary ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {t("aboutPage.mission")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {t("aboutPage.missionText")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle
                    className={`text-2xl font-bold text-primary ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {t("aboutPage.vision")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {t("aboutPage.visionText")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection animation="fadeInUp" delay={400}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.values")}
              </h2>
            </div>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={100}
              animation="fadeInUp">
              {t("aboutPage.valuesList").map((value, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3
                      className={`text-lg font-semibold text-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {value}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </AnimatedSection>

        {/* Goals */}
        <AnimatedSection animation="fadeInUp" delay={600}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.goals")}
              </h2>
              <p
                className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("aboutPage.goalsText")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t("aboutPage.goalsList").map((goal, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p
                        className={`text-muted-foreground leading-relaxed ${
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {goal}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Statistics */}
        <AnimatedSection animation="fadeInUp" delay={800}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("about.stats.title")}
              </h2>
            </div>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="fadeInUp">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div
                      className={`text-3xl font-bold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-english"
                      }`}>
                      {stat.value}
                    </div>
                    <p
                      className={`text-muted-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection animation="fadeInUp" delay={1000}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}>
                {t("about.features.title")}
              </h2>
            </div>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="fadeInUp">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`text-xl font-semibold text-foreground mb-3 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {feature.title}
                    </h3>
                    <p
                      className={`text-muted-foreground leading-relaxed ${
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection animation="fadeInUp" delay={1200}>
          <div className="container mx-auto px-4 py-16">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2
                    className={`text-3xl font-bold text-foreground mb-4 ${
                      isRTL ? "font-arabic" : "font-english"
                    }`}>
                    {t("aboutPage.contact")}
                  </h2>
                  <p
                    className={`text-lg text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-english"
                    }`}>
                    {t("aboutPage.contactDescription")}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3
                      className={`text-lg font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("contact.address")}
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("aboutPage.address")}
                    </p>
                  </div>
                  <div className="text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3
                      className={`text-lg font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("contact.phone")}
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("aboutPage.phone")}
                    </p>
                  </div>
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3
                      className={`text-lg font-semibold text-foreground mb-2 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("contact.email")}
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {t("aboutPage.email")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default About;
