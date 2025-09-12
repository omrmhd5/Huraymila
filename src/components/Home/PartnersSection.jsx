import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Heart,
  GraduationCap,
  Droplets,
  Car,
  Shield,
  Users,
  Target,
  UserCheck,
  HandHeart,
  BarChart3,
  Globe,
  FileText,
  Home,
  Flame,
  Leaf,
  BookOpen,
  Phone,
  MapPin,
  Stethoscope,
  GraduationCap as School,
  Briefcase,
  Star,
  Activity,
  Zap,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PartnersSection = () => {
  const { language } = useTheme();

  const partners = [
    {
      name: "مكتب تنسيق برنامج المدينة الصحية",
      icon: Activity,
      color: "bg-red-500",
    },
    {
      name: "المرصد الحضري",
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      name: "وزارة الشؤون البلدية والقروية",
      icon: Building,
      color: "bg-green-500",
    },
    {
      name: "الهيئة العامة للاحصاء",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      name: "المراكز الثقافية",
      icon: BookOpen,
      color: "bg-amber-500",
    },
    {
      name: "الدفاع المدني",
      icon: Shield,
      color: "bg-orange-500",
    },
    {
      name: "الجمعيات البيئية",
      icon: Leaf,
      color: "bg-emerald-500",
    },
    {
      name: "شركة المياه الوطنية",
      icon: Droplets,
      color: "bg-cyan-500",
    },
    {
      name: "وزارة البيئة والمياه والزراعة",
      icon: Globe,
      color: "bg-teal-500",
    },
    {
      name: "الهيئة العامة للغذاء والدواء",
      icon: Shield,
      color: "bg-indigo-500",
    },
    {
      name: "الهيئة العامة للأرصاد وحماية البيئة",
      icon: Zap,
      color: "bg-sky-500",
    },
    {
      name: "وزارة الصحة ( الشؤون الصحية - المستشفيات - القطاع الصحي – مراكز الرعاية الصحية )",
      icon: Stethoscope,
      color: "bg-red-600",
    },
    {
      name: "إدارة التعليم",
      icon: School,
      color: "bg-green-600",
    },
    {
      name: "وزارة الموارد البشرية والتنمية الاجتماعية",
      icon: Users,
      color: "bg-pink-500",
    },
    {
      name: "إدارة الدفاع المدني",
      icon: Shield,
      color: "bg-orange-600",
    },
    {
      name: "الهلال الأحمر",
      icon: Heart,
      color: "bg-red-500",
    },
    {
      name: "نادي الحي",
      icon: Home,
      color: "bg-blue-600",
    },
    {
      name: "وزارة الموارد البشرية والتنمية الاجتماعية (الجمعيات الخيرية – الجمعيات الأهلية)",
      icon: HandHeart,
      color: "bg-pink-600",
    },
    {
      name: "المؤسسة العامة للتدريب التقني والمهني",
      icon: Briefcase,
      color: "bg-indigo-600",
    },
    {
      name: "وزارة التعليم (الجامعات – المدارس – نادي الحي – المنصات التعليمية)",
      icon: GraduationCap,
      color: "bg-green-700",
    },
    {
      name: "وزارة الموارد البشرية والتنمية الاجتماعية (الضمان الاجتماعي – الجمعيات الخيرية – الجمعيات الأهلية)",
      icon: Star,
      color: "bg-purple-600",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "21",
      label: language === "ar" ? "جهات شريكة" : "Partner Organizations",
      color: "text-primary",
    },
    {
      icon: Target,
      value: "50+",
      label: language === "ar" ? "مبادرة تكاملية" : "Integrated Initiatives",
      color: "text-secondary",
    },
    {
      icon: UserCheck,
      value: "500+",
      label: language === "ar" ? "متطوع نشط" : "Active Volunteers",
      color: "text-accent",
    },
    {
      icon: HandHeart,
      value: "95%",
      label: language === "ar" ? "رضا المجتمع" : "Community Satisfaction",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === "ar"
              ? "شبكة التكامل المجتمعي"
              : "Community Integration Network"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {language === "ar"
              ? "المجتمع والمتطوعون في المركز، والجهات الشريكة تعمل معهم ولهم"
              : "Community and volunteers at the center, with partner organizations working with and for them"}
          </p>
        </div>

        {/* Center Entity */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {language === "ar"
              ? "المجتمع والمتطوعون"
              : "Community and Volunteers"}
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            {language === "ar"
              ? "الركيزة الأساسية لكل المبادرات"
              : "The foundation of all initiatives"}
          </p>
          <div className="text-3xl font-bold text-primary">
            {language === "ar" ? "500+ متطوع نشط" : "500+ Active Volunteers"}
          </div>
          <div className="text-center mt-2">
            <p className="text-md text-muted-foreground">
              <span className="font-bold text-primary">21</span>{" "}
              {language === "ar"
                ? "جهة شريكة تعمل معنا لتحقيق الرؤية"
                : "partner organizations working with us to achieve the vision"}
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 text-lg">
                    {partner.name}
                  </h4>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Collaboration Flow Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {language === "ar"
              ? "جودة الحياة تتحقق بتكامل المجتمع والجهات في تقديم الخدمات وتطويرها. كل منظمة تقدم خدمات للمجتمع بينما تستفيد من بيانات المواطنين وملاحظاتهم لتحسين الأداء."
              : "Quality of life is achieved through the integration of community and organizations in providing and developing services. Each organization provides services to the community while benefiting from citizen data and feedback to improve performance."}
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <IconComponent
                  className={`h-8 w-8 ${stat.color} mx-auto mb-3`}
                />
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
