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

const About = () => {
  const { loading } = useAuth();
  const { language } = useTheme();
  const isRTL = language === "ar";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "مبادرة مدينة حريملاء الصحية",
      description:
        "نحن مبادرة وطنية تهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال مجموعة من البرامج والمبادرات المتنوعة.",
      mission: "مهمتنا",
      missionText:
        "تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال المبادرات المجتمعية والشراكات الاستراتيجية.",
      vision: "رؤيتنا",
      visionText:
        "أن تكون مدينة حريملاء نموذجاً للمدينة الصحية المستدامة في المملكة العربية السعودية.",
      values: "قيمنا",
      valuesList: [
        "الشفافية والمصداقية",
        "الشراكة المجتمعية",
        "الابتكار والتطوير",
        "الاستدامة البيئية",
        "الجودة والتميز",
      ],
      goals: "أهدافنا",
      goalsText:
        "نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تساهم في بناء مجتمع صحي ومستدام",
      goalsList: [
        "تحسين مؤشرات الصحة العامة في المدينة بنسبة 30% خلال 3 سنوات",
        "زيادة المساحات الخضراء في المدينة إلى 40% من إجمالي المساحة",
        "توعية 80% من سكان المدينة بالثقافة الصحية والبيئية",
        "تطوير 20 مبادرة صحية جديدة سنوياً",
        "إنشاء شبكة من الشركاء المحليين والدوليين",
        "تحقيق الاستدامة البيئية في جميع مشاريعنا",
        "تطوير برامج تدريبية متخصصة للعاملين في القطاع الصحي",
        "إنشاء نظام متكامل لرصد وتقييم المبادرات",
      ],
      stats: [
        { value: "2025", label: "سنة التأسيس", icon: Award },
        { value: "50+", label: "مبادرة صحية", icon: Target },
        { value: "10K+", label: "مستفيد", icon: Users },
        { value: "21", label: "جهة شريكة", icon: Shield },
      ],
      features: [
        {
          title: "المبادرات",
          description: "برامج متنوعة لتعزيز الصحة البدنية والنفسية والاجتماعية",
          icon: Heart,
          color: "bg-red-500",
        },
        {
          title: "البيئة المستدامة",
          description: "مشاريع لحماية البيئة وتحسين جودة الهواء والمياه",
          icon: Leaf,
          color: "bg-green-500",
        },
        {
          title: "التوعية المجتمعية",
          description: "حملات توعوية لتعزيز الثقافة الصحية في المجتمع",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          title: "الشراكات الاستراتيجية",
          description: "تعاون مع المؤسسات الحكومية والخاصة لتحقيق الأهداف",
          icon: HandHeart,
          color: "bg-purple-500",
        },
      ],
      contact: "تواصل معنا",
      contactDescription: "نحن هنا لخدمتكم ومساعدتكم في أي وقت",
      address: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
      addressEn: "Huraymila City, Riyadh, Saudi Arabia",
      phone: "+966-11-123-4567",
      email: "info@huraymila-healthy.city",
      workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م",
      workingHoursEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
    },
    en: {
      title: "About Us",
      subtitle: "Huraymila Healthy City Initiative",
      description:
        "We are a national initiative aimed at promoting public health and improving quality of life in Huraymila City through a variety of programs and initiatives.",
      mission: "Our Mission",
      missionText:
        "To promote public health and improve quality of life in Huraymila city through community initiatives and strategic partnerships.",
      vision: "Our Vision",
      visionText:
        "To make Huraymila city a model for sustainable healthy cities in Saudi Arabia.",
      values: "Our Values",
      valuesList: [
        "Transparency and Credibility",
        "Community Partnership",
        "Innovation and Development",
        "Environmental Sustainability",
        "Quality and Excellence",
      ],
      goals: "Our Goals",
      goalsText:
        "We strive to achieve a set of strategic goals that contribute to building a healthy and sustainable community",
      goalsList: [
        "Improve public health indicators in the city by 30% within 3 years",
        "Increase green spaces in the city to 40% of total area",
        "Educate 80% of city residents about health and environmental culture",
        "Develop 20 new health initiatives annually",
        "Establish a network of local and international partners",
        "Achieve environmental sustainability in all our projects",
        "Develop specialized training programs for healthcare workers",
        "Create an integrated system for monitoring and evaluating health initiatives",
      ],
      stats: [
        { value: "2025", label: "Founded", icon: Award },
        { value: "50+", label: "Health Initiatives", icon: Target },
        { value: "10K+", label: "Beneficiaries", icon: Users },
        { value: "21", label: "Partner Organizations", icon: Shield },
      ],
      features: [
        {
          title: "Health Initiatives",
          description:
            "Diverse programs to promote physical, mental, and social health",
          icon: Heart,
          color: "bg-red-500",
        },
        {
          title: "Sustainable Environment",
          description:
            "Projects to protect the environment and improve air and water quality",
          icon: Leaf,
          color: "bg-green-500",
        },
        {
          title: "Community Awareness",
          description:
            "Awareness campaigns to promote health culture in society",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          title: "Strategic Partnerships",
          description:
            "Cooperation with government and private institutions to achieve goals",
          icon: HandHeart,
          color: "bg-purple-500",
        },
      ],
      contact: "Contact Us",
      contactDescription: "We are here to serve you and help you at any time",
      address: "Huraymila City, Riyadh, Saudi Arabia",
      addressEn: "Huraymila City, Riyadh, Saudi Arabia",
      phone: "+966-11-123-4567",
      email: "info@huraymila-healthy.city",
      workingHours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
      workingHoursEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
    },
  };

  const current = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" delay={0}>
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedSection animation="fadeInDown" delay={200}>
                <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
                  {current.subtitle}
                </Badge>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={400}>
                <h1
                  className={`text-4xl md:text-6xl font-bold text-foreground mb-6 ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {current.title}
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeIn" delay={600}>
                <p
                  className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {current.description}
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
                    {current.mission}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {current.missionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    {current.vision}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {current.visionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-primary" />
                    {current.goals}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-muted-foreground leading-relaxed mb-4 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {current.goalsText}
                  </p>
                  <ul className="space-y-2">
                    {current.goalsList.slice(0, 4).map((goal, index) => (
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
                  {language === "ar" ? "إحصائياتنا" : "Our Statistics"}
                </h2>
              </div>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="scaleIn">
              {current.stats.map((stat, index) => {
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
                  {language === "ar" ? "مميزاتنا" : "Our Features"}
                </h2>
              </div>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              staggerDelay={150}
              animation="fadeInUp">
              {current.features.map((feature, index) => {
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
                  {current.contact}
                </h2>
                <p
                  className={`text-lg text-muted-foreground ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  {current.contactDescription}
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
                    {language === "ar" ? "العنوان" : "Address"}
                  </h3>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? current.address : current.addressEn}
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
                    {language === "ar" ? "الهاتف" : "Phone"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {current.phone}
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
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {current.email}
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
                    {language === "ar" ? "ساعات العمل" : "Working Hours"}
                  </h3>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? current.workingHours : current.workingHoursEn}
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
