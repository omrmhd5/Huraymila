import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Heart,
  GraduationCap,
  Droplets,
  Car,
  Shield,
  Users,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  Globe,
  Briefcase,
  UserCheck,
  HandHeart,
  Target,
  Activity,
  BarChart3,
  FileText,
  BookOpen,
  Leaf,
  Zap,
  Stethoscope,
  School,
  Home,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const PartnersSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "شبكة التكامل المجتمعي",
      subtitle: "المجتمع والمتطوعون في المركز، والجهات الشريكة تعمل معهم ولهم",
      centerEntity: {
        name: "المجتمع والمتطوعون",
        description: "الركيزة الأساسية لكل المبادرات",
        icon: Users,
        stats: "500+ متطوع نشط",
      },
      connections: [
        {
          name: "مكتب تنسيق برنامج المدينة الصحية",
          role: "تنسيق صحي",
          icon: Activity,
          color: "bg-red-500",
          flow: "يقدم: تنسيق برامج صحية\nيستفيد: تقارير المجتمع",
        },
        {
          name: "المرصد الحضري",
          role: "مراقبة حضرية",
          icon: BarChart3,
          color: "bg-blue-500",
          flow: "يقدم: بيانات حضرية\nيستفيد: احتياجات المواطنين",
        },
        {
          name: "وزارة الشؤون البلدية والقروية",
          role: "خدمات بلدية",
          icon: Building,
          color: "bg-green-500",
          flow: "يقدم: خدمات بلدية\nيستفيد: ملاحظات المواطنين",
        },
        {
          name: "الهيئة العامة للاحصاء",
          role: "إحصائيات",
          icon: FileText,
          color: "bg-purple-500",
          flow: "يقدم: بيانات إحصائية\nيستفيد: تقارير مجتمعية",
        },
        {
          name: "المراكز الثقافية",
          role: "ثقافة وفنون",
          icon: BookOpen,
          color: "bg-amber-500",
          flow: "يقدم: برامج ثقافية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "الدفاع المدني",
          role: "حماية مدنية",
          icon: Shield,
          color: "bg-orange-500",
          flow: "يقدم: حماية وأمان\nيستفيد: بلاغات المواطنين",
        },
        {
          name: "الجمعيات البيئية",
          role: "حماية بيئية",
          icon: Leaf,
          color: "bg-emerald-500",
          flow: "يقدم: برامج بيئية\nيستفيد: مشاركة بيئية",
        },
        {
          name: "شركة المياه الوطنية",
          role: "خدمات مياه",
          icon: Droplets,
          color: "bg-cyan-500",
          flow: "يقدم: مياه صحية\nيستفيد: تقارير الجودة",
        },
        {
          name: "وزارة البيئة والمياه والزراعة",
          role: "بيئة وزراعة",
          icon: Globe,
          color: "bg-teal-500",
          flow: "يقدم: برامج بيئية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "الهيئة العامة للغذاء والدواء",
          role: "سلامة غذائية",
          icon: Shield,
          color: "bg-indigo-500",
          flow: "يقدم: رقابة غذائية\nيستفيد: تقارير سلامة",
        },
        {
          name: "الهيئة العامة للأرصاد وحماية البيئة",
          role: "أرصاد جوية",
          icon: Zap,
          color: "bg-sky-500",
          flow: "يقدم: تنبؤات جوية\nيستفيد: بيانات مجتمعية",
        },
        {
          name: "وزارة الصحة",
          role: "خدمات صحية",
          icon: Stethoscope,
          color: "bg-red-600",
          flow: "يقدم: برامج صحية\nيستفيد: تقارير المجتمع",
        },
        {
          name: "إدارة التعليم",
          role: "تعليم وتدريب",
          icon: School,
          color: "bg-green-600",
          flow: "يقدم: برامج تعليمية\nيستفيد: مشاركة المتطوعين",
        },
        {
          name: "وزارة الموارد البشرية والتنمية الاجتماعية",
          role: "تنمية اجتماعية",
          icon: Users,
          color: "bg-pink-500",
          flow: "يقدم: برامج تنموية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "إدارة الدفاع المدني",
          role: "استجابة طوارئ",
          icon: Shield,
          color: "bg-orange-600",
          flow: "يقدم: حماية وأمان\nيستفيد: بلاغات المواطنين",
        },
        {
          name: "الهلال الأحمر",
          role: "إغاثة طبية",
          icon: Heart,
          color: "bg-red-500",
          flow: "يقدم: خدمات إغاثية\nيستفيد: استجابة مجتمعية",
        },
        {
          name: "نادي الحي",
          role: "أنشطة حي",
          icon: Home,
          color: "bg-blue-600",
          flow: "يقدم: برامج حي\nيستفيد: مشاركة أهالي",
        },
        {
          name: "الجمعيات الخيرية والأهلية",
          role: "دعم اجتماعي",
          icon: HandHeart,
          color: "bg-pink-600",
          flow: "يقدم: برامج خيرية\nيستفيد: تطوع المجتمع",
        },
        {
          name: "المؤسسة العامة للتدريب التقني والمهني",
          role: "تدريب مهني",
          icon: Briefcase,
          color: "bg-indigo-600",
          flow: "يقدم: برامج تدريبية\nيستفيد: مشاركة المتطوعين",
        },
        {
          name: "وزارة التعليم",
          role: "تعليم شامل",
          icon: GraduationCap,
          color: "bg-green-700",
          flow: "يقدم: برامج تعليمية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "الضمان الاجتماعي",
          role: "ضمان اجتماعي",
          icon: Star,
          color: "bg-purple-600",
          flow: "يقدم: خدمات ضمانية\nيستفيد: بيانات مجتمعية",
        },
      ],
    },
    en: {
      title: "Community Integration Network",
      subtitle:
        "Community and volunteers at the center, with partner organizations working with and for them",
      centerEntity: {
        name: "Community & Volunteers",
        description: "The foundation of all initiatives",
        icon: Users,
        stats: "500+ active volunteers",
      },
      connections: [
        {
          name: "Healthy City Program Coordination Office",
          role: "Health coordination",
          icon: Activity,
          color: "bg-red-500",
          flow: "Provides: Health program coordination\nReceives: Community reports",
        },
        {
          name: "Urban Observatory",
          role: "Urban monitoring",
          icon: BarChart3,
          color: "bg-blue-500",
          flow: "Provides: Urban data\nReceives: Citizen needs",
        },
        {
          name: "Ministry of Municipal and Rural Affairs",
          role: "Municipal services",
          icon: Building,
          color: "bg-green-500",
          flow: "Provides: Municipal services\nReceives: Citizen feedback",
        },
        {
          name: "General Authority for Statistics",
          role: "Statistics",
          icon: FileText,
          color: "bg-purple-500",
          flow: "Provides: Statistical data\nReceives: Community reports",
        },
        {
          name: "Cultural Centers",
          role: "Culture & arts",
          icon: BookOpen,
          color: "bg-amber-500",
          flow: "Provides: Cultural programs\nReceives: Community participation",
        },
        {
          name: "Civil Defense",
          role: "Civil protection",
          icon: Shield,
          color: "bg-orange-500",
          flow: "Provides: Protection & safety\nReceives: Citizen reports",
        },
        {
          name: "Environmental Associations",
          role: "Environmental protection",
          icon: Leaf,
          color: "bg-emerald-500",
          flow: "Provides: Environmental programs\nReceives: Environmental participation",
        },
        {
          name: "National Water Company",
          role: "Water services",
          icon: Droplets,
          color: "bg-cyan-500",
          flow: "Provides: Clean water\nReceives: Quality reports",
        },
        {
          name: "Ministry of Environment, Water and Agriculture",
          role: "Environment & agriculture",
          icon: Globe,
          color: "bg-teal-500",
          flow: "Provides: Environmental programs\nReceives: Community participation",
        },
        {
          name: "Food and Drug Authority",
          role: "Food safety",
          icon: Shield,
          color: "bg-indigo-500",
          flow: "Provides: Food oversight\nReceives: Safety reports",
        },
        {
          name: "General Authority for Meteorology and Environmental Protection",
          role: "Weather forecasting",
          icon: Zap,
          color: "bg-sky-500",
          flow: "Provides: Weather forecasts\nReceives: Community data",
        },
        {
          name: "Ministry of Health",
          role: "Health services",
          icon: Stethoscope,
          color: "bg-red-600",
          flow: "Provides: Health programs\nReceives: Community reports",
        },
        {
          name: "Education Department",
          role: "Education & training",
          icon: School,
          color: "bg-green-600",
          flow: "Provides: Educational programs\nReceives: Volunteer participation",
        },
        {
          name: "Ministry of Human Resources and Social Development",
          role: "Social development",
          icon: Users,
          color: "bg-pink-500",
          flow: "Provides: Development programs\nReceives: Community participation",
        },
        {
          name: "Civil Defense Administration",
          role: "Emergency response",
          icon: Shield,
          color: "bg-orange-600",
          flow: "Provides: Protection & safety\nReceives: Citizen reports",
        },
        {
          name: "Red Crescent",
          role: "Medical relief",
          icon: Heart,
          color: "bg-red-500",
          flow: "Provides: Relief services\nReceives: Community response",
        },
        {
          name: "Neighborhood Club",
          role: "Neighborhood activities",
          icon: Home,
          color: "bg-blue-600",
          flow: "Provides: Neighborhood programs\nReceives: Resident participation",
        },
        {
          name: "Charity and Civil Society Organizations",
          role: "Social support",
          icon: HandHeart,
          color: "bg-pink-600",
          flow: "Provides: Charity programs\nReceives: Community volunteering",
        },
        {
          name: "Technical and Vocational Training Corporation",
          role: "Vocational training",
          icon: Briefcase,
          color: "bg-indigo-600",
          flow: "Provides: Training programs\nReceives: Volunteer participation",
        },
        {
          name: "Ministry of Education",
          role: "Comprehensive education",
          icon: GraduationCap,
          color: "bg-green-700",
          flow: "Provides: Educational programs\nReceives: Community participation",
        },
        {
          name: "Social Security",
          role: "Social security",
          icon: Star,
          color: "bg-purple-600",
          flow: "Provides: Social security services\nReceives: Community data",
        },
      ],
    },
  };
  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-4xl font-bold text-foreground mb-4",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.title}
          </h2>
          <p
            className={cn(
              "text-lg text-muted-foreground max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.subtitle}
          </p>
        </div>

        {/* Hexagonal Network */}
        <div className="relative w-full max-w-7xl mx-auto h-[900px] mb-16">
          {/* Central Hub - Community */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Background Effect without shadow */}
            <div className="absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-400/20 animate-pulse"></div>

            {/* Central Community Hub without shadow */}
            <div className="w-56 h-56 rounded-full border-4 border-amber-400/80 bg-gradient-to-br from-amber-100/95 to-orange-100/85 flex items-center justify-center relative overflow-hidden">
              {/* Animated Inner Rings */}
              <div
                className="absolute w-48 h-48 rounded-full border-2 border-amber-300/40 animate-ping"
                style={{
                  animationDuration: "4s",
                }}></div>
              <div
                className="absolute w-40 h-40 rounded-full border border-amber-200/30 animate-ping"
                style={{
                  animationDelay: "2s",
                  animationDuration: "4s",
                }}></div>

              <div className="text-center z-10 relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3 mx-auto animate-pulse">
                  <current.centerEntity.icon className="h-7 w-7 text-" />
                </div>
                <h3
                  className={cn(
                    "text-lg font-bold text-foreground mb-2",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.centerEntity.name}
                </h3>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mb-2",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.centerEntity.description}
                </p>
                <div className="text-amber-600 font-bold text-sm mb-1">
                  {current.centerEntity.stats}
                </div>
                <div className="text-amber-700 font-bold text-xs">
                  {isRTL ? "21 جهات شريكة" : "21 Organizations"}
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines - Rendered from Center */}
          {current.connections.map((connection, index) => {
            const angle = index * 17.14 * (Math.PI / 180); // 21 positions (360/21 ≈ 17.14)
            const radius = 380;
            return (
              <div key={`line-${index}`}>
                {/* Static Connection Line to Center */}
                <div
                  className="absolute origin-left z-0"
                  style={{
                    height: "1px",
                    width: `${radius - 28}px`,
                    transform: `rotate(${angle}rad)`,
                    transformOrigin: "0 50%",
                    left: "50%",
                    top: "50%",
                    background: `rgba(251, 146, 60, 0.2)`,
                  }}></div>

                {/* Animated Connection Line - Data Flow (Orange) */}
                <div
                  className="absolute origin-left z-5"
                  style={{
                    height: "3px",
                    width: `${radius - 28}px`,
                    transform: `rotate(${angle}rad)`,
                    transformOrigin: "0 50%",
                    left: "50%",
                    top: "50%",
                    background: `rgba(251, 146, 60, 1)`,
                    animation: `dataFlowPulse 2s linear infinite`,
                    animationDelay: `${index * 0.1}s`,
                  }}></div>

                {/* Animated Connection Line - Service Flow (Green) */}
                <div
                  className="absolute origin-left z-5"
                  style={{
                    height: "3px",
                    width: `${radius - 28}px`,
                    transform: `rotate(${angle}rad)`,
                    transformOrigin: "0 50%",
                    left: "50%",
                    top: "50%",
                    background: `rgba(34, 197, 94, 1)`,
                    animation: `serviceFlowPulse 2.5s linear infinite`,
                    animationDelay: `${1 + index * 0.1}s`,
                  }}></div>
              </div>
            );
          })}

          {/* Partner Organizations in Network Pattern */}
          {current.connections.map((connection, index) => {
            const angle = index * 17.14 * (Math.PI / 180); // 21 positions (360/21 ≈ 17.14)
            const radius = 380;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={index}
                className="absolute z-10 group"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}>
                {/* Secondary Connections to Adjacent Partners */}
                {[1, -1].map((direction, dirIndex) => {
                  const nextIndex =
                    (index + direction + current.connections.length) %
                    current.connections.length;
                  const nextAngle = nextIndex * 17.14 * (Math.PI / 180);
                  const nextX = Math.cos(nextAngle) * radius;
                  const nextY = Math.sin(nextAngle) * radius;
                  const connectionLength = Math.sqrt(
                    Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2)
                  );
                  const connectionAngle = Math.atan2(nextY - y, nextX - x);
                  return (
                    <div
                      key={dirIndex}
                      className="absolute bg-gradient-to-r from-amber-300/30 to-orange-200/15 origin-left z-0"
                      style={{
                        height: "1.5px",
                        width: `${connectionLength}px`,
                        transform: `rotate(${connectionAngle}rad)`,
                        transformOrigin: "0 50%",
                        left: "50%",
                        top: "50%",
                      }}></div>
                  );
                })}

                {/* Partner Card */}
                <Card className="w-40 h-32 group-hover:shadow-xl transition-all duration-300 border-2 border-amber-200/60 hover:border-amber-300/80 cursor-pointer relative overflow-hidden bg-white/90 backdrop-blur-sm shadow-md">
                  {/* Clear Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60"></div>

                  <CardContent className="p-3 text-center relative z-10 h-full flex flex-col justify-center">
                    <div
                      className={`w-8 h-8 rounded-full ${connection.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <connection.icon className="h-4 w-4 text-white" />
                    </div>
                    <h4
                      className={cn(
                        "font-semibold text-amber-700 group-hover:text-black transition-colors text-sm leading-tight",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {connection.name}
                    </h4>
                  </CardContent>

                  {/* Active Connection Indicator */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Collaboration Flow Indicators */}
        <div className="text-center mb-12">
          <p
            className={cn(
              "text-sm text-muted-foreground max-w-2xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {isRTL
              ? "جودة الحياة تتحقق بتكامل المجتمع والجهات في تقديم الخدمات وتطويرها."
              : "Each organization provides services to the community while benefiting from citizen data and feedback to improve performance"}
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">21</div>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {isRTL ? "جهات شريكة" : "Partner Organizations"}
            </p>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <Target className="h-8 w-8 text-secondary mx-auto mb-3" />
            <div className="text-3xl font-bold text-secondary mb-1">50+</div>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {isRTL ? "مبادرة تكاملية" : "Integrated Initiatives"}
            </p>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <UserCheck className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent mb-1">500+</div>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {isRTL ? "متطوع نشط" : "Active Volunteers"}
            </p>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <HandHeart className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">95%</div>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {isRTL ? "رضا المجتمع" : "Community Satisfaction"}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
