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
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PartnersSection = () => {
  const { language } = useTheme();

  const partners = [
    {
      name: language === "ar" ? "وزارة الصحة" : "Ministry of Health",
      role: language === "ar" ? "سياسات صحية" : "Health Policies",
      icon: Heart,
      color: "bg-red-500",
    },
    {
      name: language === "ar" ? "بلدية حريملاء" : "Harimlaa Municipality",
      role: language === "ar" ? "خدمات محلية" : "Local Services",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      name: language === "ar" ? "إدارة التعليم" : "Education Department",
      role: language === "ar" ? "برامج توعوية" : "Awareness Programs",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      name: language === "ar" ? "شركة المياه" : "Water Company",
      role: language === "ar" ? "جودة المياه" : "Water Quality",
      icon: Droplets,
      color: "bg-cyan-500",
    },
    {
      name: language === "ar" ? "إدارة المرور" : "Traffic Department",
      role: language === "ar" ? "سلامة مرورية" : "Traffic Safety",
      icon: Car,
      color: "bg-orange-500",
    },
    {
      name: language === "ar" ? "الدفاع المدني" : "Civil Defense",
      role: language === "ar" ? "استجابة طوارئ" : "Emergency Response",
      icon: Shield,
      color: "bg-purple-500",
    },
    {
      name: language === "ar" ? "المنظمات الخيرية" : "Charitable Organizations",
      role: language === "ar" ? "دعم اجتماعي" : "Social Support",
      icon: HandHeart,
      color: "bg-pink-500",
    },
    {
      name:
        language === "ar"
          ? "الهيئة العامة للغذاء والدواء"
          : "Food and Drug Authority",
      role: language === "ar" ? "سلامة غذائية" : "Food Safety",
      icon: Shield,
      color: "bg-indigo-500",
    },
    {
      name: language === "ar" ? "وزارة البيئة" : "Ministry of Environment",
      role: language === "ar" ? "حماية بيئية" : "Environmental Protection",
      icon: Building,
      color: "bg-emerald-500",
    },
    {
      name:
        language === "ar"
          ? "إدارة الطوارئ الطبية"
          : "Medical Emergency Department",
      role: language === "ar" ? "خدمات إسعافية" : "Ambulance Services",
      icon: Heart,
      color: "bg-red-600",
    },
    {
      name: language === "ar" ? "مكتب العمل" : "Labor Office",
      role: language === "ar" ? "تنمية مهارات" : "Skills Development",
      icon: Building,
      color: "bg-blue-600",
    },
    {
      name:
        language === "ar"
          ? "إدارة المتاحف والتراث"
          : "Museums and Heritage Department",
      role: language === "ar" ? "حفظ تراث" : "Heritage Preservation",
      icon: Building,
      color: "bg-amber-500",
    },
    {
      name: language === "ar" ? "مركز الأحياء" : "Community Center",
      role: language === "ar" ? "تطوير مجتمعي" : "Community Development",
      icon: Users,
      color: "bg-teal-500",
    },
    {
      name: language === "ar" ? "هيئة الرياضة" : "Sports Authority",
      role: language === "ar" ? "نشاط رياضي" : "Sports Activities",
      icon: Users,
      color: "bg-lime-500",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "19",
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
              <span className="font-bold text-primary">20+</span>{" "}
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
                  <p className="text-sm text-muted-foreground">
                    {partner.role}
                  </p>
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
