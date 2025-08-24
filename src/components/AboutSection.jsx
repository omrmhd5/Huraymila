import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Target, 
  Leaf,
  Shield,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const AboutSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "مبادرة مدينة حريملاء الصحية",
      description: "نحن مبادرة وطنية تهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال مجموعة من البرامج والمبادرات المتنوعة.",
      mission: "مهمتنا",
      missionText: "تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال المبادرات المجتمعية والشراكات الاستراتيجية.",
      vision: "رؤيتنا",
      visionText: "أن تكون مدينة حريملاء نموذجاً للمدينة الصحية المستدامة في المملكة العربية السعودية.",
      values: "قيمنا",
      valuesList: [
        "الشفافية والمصداقية",
        "الشراكة المجتمعية",
        "الابتكار والتطوير",
        "الاستدامة البيئية",
        "الجودة والتميز"
      ],
      stats: [
        { value: "2020", label: "سنة التأسيس", icon: Award },
        { value: "50+", label: "مبادرة صحية", icon: Target },
        { value: "10K+", label: "مستفيد", icon: Users },
        { value: "15+", label: "جهة شريكة", icon: Shield }
      ],
      features: [
        {
          title: "المبادرات الصحية",
          description: "برامج متنوعة لتعزيز الصحة البدنية والنفسية والاجتماعية",
          icon: Heart,
          color: "bg-red-500"
        },
        {
          title: "البيئة المستدامة",
          description: "مشاريع لحماية البيئة وتحسين جودة الهواء والمياه",
          icon: Leaf,
          color: "bg-green-500"
        },
        {
          title: "التوعية المجتمعية",
          description: "حملات توعوية لتعزيز الثقافة الصحية في المجتمع",
          icon: Users,
          color: "bg-blue-500"
        }
      ],
      cta: "اعرف المزيد عنا",
      learnMore: "اكتشف المبادرات"
    },
    en: {
      title: "About Us",
      subtitle: "Harimlaa Healthy City Initiative",
      description: "We are a national initiative aimed at promoting public health and improving quality of life in Harimlaa city through a variety of programs and initiatives.",
      mission: "Our Mission",
      missionText: "To promote public health and improve quality of life in Harimlaa city through community initiatives and strategic partnerships.",
      vision: "Our Vision",
      visionText: "To make Harimlaa city a model for sustainable healthy cities in Saudi Arabia.",
      values: "Our Values",
      valuesList: [
        "Transparency and Credibility",
        "Community Partnership",
        "Innovation and Development",
        "Environmental Sustainability",
        "Quality and Excellence"
      ],
      stats: [
        { value: "2020", label: "Founded", icon: Award },
        { value: "50+", label: "Health Initiatives", icon: Target },
        { value: "10K+", label: "Beneficiaries", icon: Users },
        { value: "15+", label: "Partner Organizations", icon: Shield }
      ],
      features: [
        {
          title: "Health Initiatives",
          description: "Diverse programs to promote physical, mental, and social health",
          icon: Heart,
          color: "bg-red-500"
        },
        {
          title: "Sustainable Environment",
          description: "Projects to protect the environment and improve air and water quality",
          icon: Leaf,
          color: "bg-green-500"
        },
        {
          title: "Community Awareness",
          description: "Awareness campaigns to promote health culture in society",
          icon: Users,
          color: "bg-blue-500"
        }
      ],
      cta: "Learn More About Us",
      learnMore: "Explore Initiatives"
    }
  };

  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {current.subtitle}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mission & Vision */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  {current.mission}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {current.missionText}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  {current.vision}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {current.visionText}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  {current.values}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {current.valuesList.map((value, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-6">
            {current.stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            {language === "ar" ? "مميزاتنا" : "Our Features"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {current.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/about">
              <Button size="lg" className="px-8 py-6 text-lg">
                {current.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link to="/initiatives">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                {current.learnMore}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;