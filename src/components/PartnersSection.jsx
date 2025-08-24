import { Card, CardContent } from "@/components/ui/card";
import { Building, Heart, GraduationCap, Droplets, Car, Shield, Users, Target, UserCheck, HandHeart } from "lucide-react";

const PartnersSection = () => {
  const partners = [
    {
      name: "وزارة الصحة",
      role: "سياسات صحية",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      name: "بلدية حريملاء",
      role: "خدمات محلية",
      icon: Building,
      color: "bg-blue-500"
    },
    {
      name: "إدارة التعليم",
      role: "برامج توعوية",
      icon: GraduationCap,
      color: "bg-green-500"
    },
    {
      name: "شركة المياه",
      role: "جودة المياه",
      icon: Droplets,
      color: "bg-cyan-500"
    },
    {
      name: "إدارة المرور",
      role: "سلامة مرورية",
      icon: Car,
      color: "bg-orange-500"
    },
    {
      name: "الدفاع المدني",
      role: "استجابة طوارئ",
      icon: Shield,
      color: "bg-purple-500"
    },
    {
      name: "المنظمات الخيرية",
      role: "دعم اجتماعي",
      icon: HandHeart,
      color: "bg-pink-500"
    },
    {
      name: "الهيئة العامة للغذاء والدواء",
      role: "سلامة غذائية",
      icon: Shield,
      color: "bg-indigo-500"
    },
    {
      name: "وزارة البيئة",
      role: "حماية بيئية",
      icon: Building,
      color: "bg-emerald-500"
    },
    {
      name: "إدارة الطوارئ الطبية",
      role: "خدمات إسعافية",
      icon: Heart,
      color: "bg-red-600"
    },
    {
      name: "مكتب العمل",
      role: "تنمية مهارات",
      icon: Building,
      color: "bg-blue-600"
    },
    {
      name: "إدارة المتاحف والتراث",
      role: "حفظ تراث",
      icon: Building,
      color: "bg-amber-500"
    },
    {
      name: "مركز الأحياء",
      role: "تطوير مجتمعي",
      icon: Users,
      color: "bg-teal-500"
    },
    {
      name: "هيئة الرياضة",
      role: "نشاط رياضي",
      icon: Users,
      color: "bg-lime-500"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "19",
      label: "جهات شريكة",
      color: "text-primary"
    },
    {
      icon: Target,
      value: "50+",
      label: "مبادرة تكاملية",
      color: "text-secondary"
    },
    {
      icon: UserCheck,
      value: "500+",
      label: "متطوع نشط",
      color: "text-accent"
    },
    {
      icon: HandHeart,
      value: "95%",
      label: "رضا المجتمع",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            شبكة التكامل المجتمعي
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            المجتمع والمتطوعون في المركز، والجهات الشريكة تعمل معهم ولهم
          </p>
        </div>

        {/* Center Entity */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            المجتمع والمتطوعون
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            الركيزة الأساسية لكل المبادرات
          </p>
          <div className="text-3xl font-bold text-primary">
            500+ متطوع نشط
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
            جودة الحياة تتحقق بتكامل المجتمع والجهات في تقديم الخدمات وتطويرها. 
            كل منظمة تقدم خدمات للمجتمع بينما تستفيد من بيانات المواطنين وملاحظاتهم لتحسين الأداء.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <IconComponent className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

