import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Target,
  Globe,
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
  Handshake,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const { language } = useTheme();
  const navigate = useNavigate();

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    ar: {
      title: "عن برنامج مدينة حريملاء الصحية",
      subtitle: "مبادرة وطنية رائدة ضمن برنامج المدن الصحية السعودي",
      description:
        "برنامج مدينة حريملاء الصحية هو مبادرة وطنية طموحة تهدف إلى تحويل محافظة حريملاء إلى نموذج متقدم للمدن الصحية في المملكة العربية السعودية، من خلال تطبيق أحدث المعايير العالمية وأفضل الممارسات في مجال الصحة المجتمعية والتنمية المستدامة.",

      vision: {
        title: "رؤيتنا",
        description:
          "أن تكون حريملاء مدينة صحية نموذجية تحقق أعلى معايير جودة الحياة لسكانها وزوارها، وتساهم في تحقيق رؤية المملكة 2030.",
      },

      mission: {
        title: "رسالتنا",
        description:
          "تطوير وتنفيذ مبادرات صحية مبتكرة ومستدامة تعزز من صحة المجتمع ورفاهيته من خلال الشراكة الفعالة بين القطاعات الحكومية والخاصة والمجتمع المدني.",
      },

      objectives: {
        title: "أهدافنا الاستراتيجية",
        list: [
          "تحسين المؤشرات الصحية العامة بنسبة 25% خلال 5 سنوات",
          "زيادة المساحات الخضراء والمرافق الرياضية بنسبة 40%",
          "تعزيز الوعي الصحي لدى 90% من السكان",
          "تطوير شراكات استراتيجية مع 20 جهة محلية ودولية",
          "تحقيق الاعتماد كمدينة صحية من منظمة الصحة العالمية",
        ],
      },

      aboutHarimlaa: {
        title: "عن محافظة حريملاء",
        description:
          "تقع محافظة حريملاء في منطقة الرياض شمال غرب مدينة الرياض على بعد 86 كيلومتراً. تتميز بموقعها الاستراتيجي وتراثها العريق وتشتهر بالزراعة والمواقع التاريخية.",
        facts: [
          { label: "عدد السكان", value: "21,758 نسمة" },
          { label: "المساحة", value: "1,480 كم²" },
          { label: "المرافق الصحية", value: "5 مراكز" },
          { label: "المدارس", value: "18 مدرسة" },
        ],
      },

      whoTitle: "شراكة مع منظمة الصحة العالمية",
      whoDescription:
        "نفخر بكوننا جزء من الشبكة العالمية للمدن الصحية التابعة لمنظمة الصحة العالمية، مما يضمن تطبيق أفضل الممارسات العالمية وأحدث المعايير في مجال الصحة المجتمعية.",

      timeline: {
        title: "الجدول الزمني للبرنامج",
        phases: [
          {
            year: "2024",
            title: "إطلاق البرنامج",
            description: "بداية المبادرات الأساسية وتأسيس الشراكات",
            status: "مكتمل",
          },
          {
            year: "2025",
            title: "التوسع والتطوير",
            description: "تنفيذ المشاريع الكبرى وزيادة المشاركة المجتمعية",
            status: "قيد التنفيذ",
          },
          {
            year: "2026",
            title: "التقييم والتحسين",
            description: "تقييم النتائج وتطوير المبادرات القائمة",
            status: "مخطط",
          },
          {
            year: "2027",
            title: "الاعتماد العالمي",
            description: "التقدم للحصول على اعتماد منظمة الصحة العالمية",
            status: "مخطط",
          },
        ],
      },

      partnerships: {
        title: "شركاؤنا الداعمون",
        description: "نعمل مع مجموعة متنوعة من الشركاء لضمان نجاح البرنامج:",
        partners: [
          { name: "وزارة الصحة", type: "حكومي" },
          { name: "أمانة منطقة الرياض", type: "حكومي" },
          { name: "جامعة الملك سعود", type: "أكاديمي" },
          { name: "مؤسسات القطاع الخاص", type: "خاص" },
          { name: "منظمات المجتمع المدني", type: "مدني" },
          { name: "منظمة الصحة العالمية", type: "دولي" },
        ],
      },

      phases: {
        title: "مراحل التطوير",
        phase1: {
          title: "المرحلة الأولى",
          subtitle: "التقييم والتخطيط",
          description: "تحليل الوضع الحالي ووضع الخطط الاستراتيجية الشاملة",
        },
        phase2: {
          title: "المرحلة الثانية",
          subtitle: "التنفيذ والمبادرات",
          description:
            "تطبيق المبادرات المجتمعية والصحية وتطوير البنية التحتية",
        },
        phase3: {
          title: "المرحلة الثالثة",
          subtitle: "التقييم والاعتماد",
          description:
            "التقييم الشامل والحصول على الاعتماد العالمي كمدينة صحية",
        },
      },
      features: [
        {
          icon: Heart,
          title: "الصحة العامة",
          description: "تعزيز الصحة الجسدية والنفسية للمجتمع",
        },
        {
          icon: Leaf,
          title: "البيئة المستدامة",
          description: "حماية البيئة وتطوير المساحات الخضراء",
        },
        {
          icon: Users,
          title: "المشاركة المجتمعية",
          description: "إشراك جميع فئات المجتمع في التطوير",
        },
        {
          icon: Target,
          title: "التنمية المستدامة",
          description: "تحقيق أهداف التنمية المستدامة 2030",
        },
        {
          icon: Building2,
          title: "البنية التحتية",
          description: "تطوير مرافق صحية ورياضية متقدمة",
        },
        {
          icon: BookOpen,
          title: "التعليم الصحي",
          description: "برامج تثقيفية شاملة لجميع الأعمار",
        },
      ],
    },
    en: {
      title: "About Harimlaa Healthy City Program",
      subtitle:
        "A Leading National Initiative within Saudi Healthy Cities Program",
      description:
        "Harimlaa Healthy City Program is an ambitious national initiative aimed at transforming Harimlaa Governorate into an advanced model of healthy cities in Saudi Arabia, through implementing the latest global standards and best practices in community health and sustainable development.",

      vision: {
        title: "Our Vision",
        description:
          "To make Harimlaa an exemplary healthy city that achieves the highest standards of quality of life for its residents and visitors, contributing to Saudi Vision 2030.",
      },

      mission: {
        title: "Our Mission",
        description:
          "Develop and implement innovative and sustainable health initiatives that enhance community health and well-being through effective partnerships between government, private sectors, and civil society.",
      },

      objectives: {
        title: "Our Strategic Objectives",
        list: [
          "Improve general health indicators by 25% within 5 years",
          "Increase green spaces and sports facilities by 40%",
          "Enhance health awareness among 90% of residents",
          "Develop strategic partnerships with 20 local and international entities",
          "Achieve accreditation as a healthy city from WHO",
        ],
      },

      aboutHarimlaa: {
        title: "About Harimlaa Governorate",
        description:
          "Harimlaa Governorate is located in Riyadh region, 86 km northwest of Riyadh city. It is distinguished by its strategic location, rich heritage, and is known for agriculture and historical sites.",
        facts: [
          { label: "Population", value: "21,758 residents" },
          { label: "Area", value: "1,480 km²" },
          { label: "Health Facilities", value: "5 centers" },
          { label: "Schools", value: "18 schools" },
        ],
      },

      whoTitle: "Partnership with WHO",
      whoDescription:
        "We are proud to be part of the WHO Global Network of Healthy Cities, ensuring the application of global best practices and latest standards in community health.",

      timeline: {
        title: "Program Timeline",
        phases: [
          {
            year: "2024",
            title: "Program Launch",
            description:
              "Start of basic initiatives and establishing partnerships",
            status: "Completed",
          },
          {
            year: "2025",
            title: "Expansion & Development",
            description:
              "Implementation of major projects and increased community participation",
            status: "In Progress",
          },
          {
            year: "2026",
            title: "Evaluation & Improvement",
            description:
              "Results evaluation and development of existing initiatives",
            status: "Planned",
          },
          {
            year: "2027",
            title: "Global Accreditation",
            description: "Apply for WHO accreditation",
            status: "Planned",
          },
        ],
      },

      partnerships: {
        title: "Our Supporting Partners",
        description:
          "We work with a diverse group of partners to ensure program success:",
        partners: [
          { name: "Ministry of Health", type: "Government" },
          { name: "Riyadh Region Municipality", type: "Government" },
          { name: "King Saud University", type: "Academic" },
          { name: "Private Sector Institutions", type: "Private" },
          { name: "Civil Society Organizations", type: "Civil" },
          { name: "World Health Organization", type: "International" },
        ],
      },

      phases: {
        title: "Development Phases",
        phase1: {
          title: "Phase One",
          subtitle: "Assessment & Planning",
          description:
            "Analyzing current situation and setting comprehensive strategic plans",
        },
        phase2: {
          title: "Phase Two",
          subtitle: "Implementation & Initiatives",
          description:
            "Implementing community and health initiatives and developing infrastructure",
        },
        phase3: {
          title: "Phase Three",
          subtitle: "Evaluation & Accreditation",
          description:
            "Comprehensive evaluation and obtaining global accreditation as a healthy city",
        },
      },
      features: [
        {
          icon: Heart,
          title: "Public Health",
          description: "Enhancing physical and mental health of the community",
        },
        {
          icon: Leaf,
          title: "Sustainable Environment",
          description: "Environmental protection and green space development",
        },
        {
          icon: Users,
          title: "Community Participation",
          description: "Engaging all community segments in development",
        },
        {
          icon: Target,
          title: "Sustainable Development",
          description: "Achieving Sustainable Development Goals 2030",
        },
        {
          icon: Building2,
          title: "Infrastructure",
          description: "Developing advanced health and sports facilities",
        },
        {
          icon: BookOpen,
          title: "Health Education",
          description: "Comprehensive educational programs for all ages",
        },
      ],
    },
  };

  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-muted/30">
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

        {/* About Harimlaa */}
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
                  {current.aboutHarimlaa.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-lg text-foreground/80 leading-relaxed mb-8",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {current.aboutHarimlaa.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {current.aboutHarimlaa.facts.map((fact, index) => (
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
                  onClick={() => navigateToTop("/about-harimlaa")}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {isRTL
                    ? "اعرف المزيد عن حريملاء"
                    : "Learn More About Harimlaa"}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnerships */}
        <div className="mb-20">
          <h3
            className={cn(
              "text-2xl md:text-3xl font-bold text-center text-foreground mb-6",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.partnerships.title}
          </h3>
          <p
            className={cn(
              "text-center text-muted-foreground mb-12 max-w-3xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.partnerships.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.partnerships.partners.map((partner, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Handshake className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-semibold text-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {partner.name}
                      </h4>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {partner.type}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* WHO Partnership */}
        <div className="mb-20">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                      className={cn(
                        "text-2xl font-bold text-foreground",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {current.whoTitle}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "text-lg text-foreground/80 leading-relaxed",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {current.whoDescription}
                  </p>
                </div>
                <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
