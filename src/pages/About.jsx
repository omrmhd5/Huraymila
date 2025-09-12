import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      stats: [
        { value: "2025", label: "سنة التأسيس", icon: Award },
        { value: "50+", label: "مبادرة صحية", icon: Target },
        { value: "10K+", label: "مستفيد", icon: Users },
        { value: "21", label: "جهة شريكة", icon: Shield },
      ],
      features: [
        {
          title: "المبادرات الصحية",
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
      team: "فريقنا",
      teamDescription:
        "نحن فريق من المتخصصين في الصحة العامة والتنمية المجتمعية",
      teamMembers: [
        {
          name: "د. أحمد محمد الصالح",
          nameEn: "Dr. Ahmed Mohammed Al-Saleh",
          position: "مدير المبادرة",
          positionEn: "Initiative Director",
          specialty: "الصحة العامة",
          specialtyEn: "Public Health",
          experience: "15 سنة",
          experienceEn: "15 years",
          image: "/assets/team-1.jpg",
        },
        {
          name: "د. فاطمة الزهراني",
          nameEn: "Dr. Fatima Al-Zahrani",
          position: "مديرة البرامج الصحية",
          positionEn: "Health Programs Director",
          specialty: "الطب الوقائي",
          specialtyEn: "Preventive Medicine",
          experience: "12 سنة",
          experienceEn: "12 years",
          image: "/assets/team-2.jpg",
        },
        {
          name: "م. سارة العتيبي",
          nameEn: "Eng. Sara Al-Otaibi",
          position: "مديرة المشاريع البيئية",
          positionEn: "Environmental Projects Director",
          specialty: "الهندسة البيئية",
          specialtyEn: "Environmental Engineering",
          experience: "10 سنوات",
          experienceEn: "10 years",
          image: "/assets/team-3.jpg",
        },
      ],
      achievements: "إنجازاتنا",
      achievementsList: [
        "تحسين مؤشرات الصحة العامة بنسبة 25%",
        "زراعة أكثر من 1000 شجرة في المدينة",
        "توعية أكثر من 5000 مواطن",
        "إنشاء 15 حديقة مجتمعية",
        "تطوير 10 مسارات للمشي الصحي",
      ],
      achievementsListEn: [
        "Improved public health indicators by 25%",
        "Planted more than 1000 trees in the city",
        "Educated more than 5000 citizens",
        "Created 15 community gardens",
        "Developed 10 healthy walking paths",
      ],
      contact: "تواصل معنا",
      contactDescription: "نحن هنا لخدمتكم ومساعدتكم في أي وقت",
      address: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
      addressEn: "Harimlaa City, Riyadh, Saudi Arabia",
      phone: "+966-11-123-4567",
      email: "info@harimlaa-healthy.city",
      workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م",
      workingHoursEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
    },
    en: {
      title: "About Us",
      subtitle: "Harimlaa Healthy City Initiative",
      description:
        "We are a national initiative aimed at promoting public health and improving quality of life in Harimlaa City through a variety of programs and initiatives.",
      mission: "Our Mission",
      missionText:
        "To promote public health and improve quality of life in Harimlaa city through community initiatives and strategic partnerships.",
      vision: "Our Vision",
      visionText:
        "To make Harimlaa city a model for sustainable healthy cities in Saudi Arabia.",
      values: "Our Values",
      valuesList: [
        "Transparency and Credibility",
        "Community Partnership",
        "Innovation and Development",
        "Environmental Sustainability",
        "Quality and Excellence",
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
      team: "Our Team",
      teamDescription:
        "We are a team of specialists in public health and community development",
      teamMembers: [
        {
          name: "Dr. Ahmed Mohammed Al-Saleh",
          nameEn: "Dr. Ahmed Mohammed Al-Saleh",
          position: "Initiative Director",
          positionEn: "Initiative Director",
          specialty: "Public Health",
          specialtyEn: "Public Health",
          experience: "15 years",
          experienceEn: "15 years",
          image: "/assets/team-1.jpg",
        },
        {
          name: "Dr. Fatima Al-Zahrani",
          nameEn: "Dr. Fatima Al-Zahrani",
          position: "Health Programs Director",
          positionEn: "Health Programs Director",
          specialty: "Preventive Medicine",
          specialtyEn: "Preventive Medicine",
          experience: "12 years",
          experienceEn: "12 years",
          image: "/assets/team-2.jpg",
        },
        {
          name: "Eng. Sara Al-Otaibi",
          nameEn: "Eng. Sara Al-Otaibi",
          position: "Environmental Projects Director",
          positionEn: "Environmental Projects Director",
          specialty: "Environmental Engineering",
          specialtyEn: "Environmental Engineering",
          experience: "10 years",
          experienceEn: "10 years",
          image: "/assets/team-3.jpg",
        },
      ],
      achievements: "Our Achievements",
      achievementsList: [
        "Improved public health indicators by 25%",
        "Planted more than 1000 trees in the city",
        "Educated more than 5000 citizens",
        "Created 15 community gardens",
        "Developed 10 healthy walking paths",
      ],
      achievementsListEn: [
        "Improved public health indicators by 25%",
        "Planted more than 1000 trees in the city",
        "Educated more than 5000 citizens",
        "Created 15 community gardens",
        "Developed 10 healthy walking paths",
      ],
      contact: "Contact Us",
      contactDescription: "We are here to serve you and help you at any time",
      address: "Harimlaa City, Riyadh, Saudi Arabia",
      addressEn: "Harimlaa City, Riyadh, Saudi Arabia",
      phone: "+966-11-123-4567",
      email: "info@harimlaa-healthy.city",
      workingHours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
      workingHoursEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
    },
  };

  const current = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              {current.subtitle}
            </Badge>
            <h1
              className={`text-4xl md:text-6xl font-bold text-foreground mb-6 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {current.title}
            </h1>
            <p
              className={`text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {current.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card>
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

            <Card>
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
                      <span
                        className={`text-muted-foreground ${
                          isRTL ? "font-arabic" : "font-sans"
                        }`}>
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold text-foreground mb-4 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "إحصائياتنا" : "Our Statistics"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {current.stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow">
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
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold text-foreground mb-4 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "مميزاتنا" : "Our Features"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {current.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold text-foreground mb-4 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {current.team}
            </h2>
            <p
              className={`text-lg text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {current.teamDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {current.teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3
                    className={`text-xl font-semibold text-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? member.name : member.nameEn}
                  </h3>
                  <p
                    className={`text-primary font-medium mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? member.position : member.positionEn}
                  </p>
                  <p
                    className={`text-sm text-muted-foreground mb-2 ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? member.specialty : member.specialtyEn}
                  </p>
                  <p
                    className={`text-xs text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    {isRTL ? member.experience : member.experienceEn}{" "}
                    {language === "ar" ? "خبرة" : "experience"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold text-foreground mb-4 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {current.achievements}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.achievementsList.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <p
                      className={`text-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      {achievement}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
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

            <Card className="text-center hover:shadow-lg transition-shadow">
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
                <p className="text-sm text-muted-foreground">{current.phone}</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
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
                <p className="text-sm text-muted-foreground">{current.email}</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
