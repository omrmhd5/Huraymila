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
      subtitle:
        "جودة الحياة تتحقق بتكامل المجتمع والجهات في تقديم الخدمات وتطويرها.",
      centerEntity: {
        name: "المجتمع والمتطوعون",
        description: "الركيزة الأساسية لكل المبادرات",
        icon: Users,
        stats: "500+ متطوع نشط",
      },
      connections: [
        {
          name: "وزارة الصحة",
          role: "خدمات صحية",
          logo: "/assets/logos/وزارة الصحة.png",
          flow: "يقدم: برامج صحية\nيستفيد: تقارير المجتمع",
        },
        {
          name: "وزارة التعليم",
          role: "تعليم وتدريب",
          logo: "/assets/logos/وزارة التعليم.png",
          flow: "يقدم: برامج تعليمية\nيستفيد: مشاركة المتطوعين",
        },
        {
          name: "وزارة البيئة والمياه والزراعة",
          role: "بيئة وزراعة",
          logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
          flow: "يقدم: برامج بيئية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "وزارة الموارد البشرية والتنمية الاجتماعية",
          role: "تنمية اجتماعية",
          logo: "/assets/logos/وزارة الموارد البشرية.png",
          flow: "يقدم: برامج تنموية\nيستفيد: مشاركة مجتمعية",
        },
        {
          name: "مستشفى حريملاء العام",
          role: "خدمات طبية",
          logo: "/assets/logos/مستشفى حريملاء العام.jpg",
          flow: "يقدم: رعاية طبية\nيستفيد: تقارير الصحة",
        },
        {
          name: "الدفاع المدني السعودي",
          role: "حماية مدنية",
          logo: "/assets/logos/الدفاع_المدني_السعودي.png",
          flow: "يقدم: حماية وأمان\nيستفيد: بلاغات المواطنين",
        },
        {
          name: "شركة المياه الوطنية",
          role: "خدمات مياه",
          logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
          flow: "يقدم: مياه صحية\nيستفيد: تقارير الجودة",
        },
        {
          name: "الداخلية محافظة حريملاء",
          role: "إدارة محلية",
          logo: "/assets/logos/الداخلية محافظة حريملاء.png",
          flow: "يقدم: خدمات إدارية\nيستفيد: ملاحظات المواطنين",
        },
        {
          name: "أمانة الرياض",
          role: "خدمات بلدية",
          logo: "/assets/logos/امانة الرياض.ico",
          flow: "يقدم: خدمات بلدية\nيستفيد: تقارير مجتمعية",
        },
        {
          name: "القوة الخاصة للأمن البيئي",
          role: "أمن بيئي",
          logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
          flow: "يقدم: حماية بيئية\nيستفيد: تقارير البيئة",
        },
        {
          name: "الشرطة",
          role: "أمن عام",
          logo: "/assets/logos/الشرطة.png",
          flow: "يقدم: أمن وحماية\nيستفيد: بلاغات المواطنين",
        },
        {
          name: "المرور",
          role: "إدارة مرور",
          logo: "/assets/logos/المرور.png",
          flow: "يقدم: تنظيم المرور\nيستفيد: بيانات المرور",
        },
        {
          name: "جمعية حريملاء الخيرية",
          role: "دعم اجتماعي",
          logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
          flow: "يقدم: برامج خيرية\nيستفيد: تطوع المجتمع",
        },
        {
          name: "جمعية التنمية الأهلية بحريملاء",
          role: "تنمية محلية",
          logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
          flow: "يقدم: برامج تنموية\nيستفيد: مشاركة أهالي",
        },
        {
          name: "جامعة الإمام محمد بن سعود الإسلامية",
          role: "تعليم وبحث",
          logo: "/assets/logos/جامعة الامام محمد بن سعود .png",
          flow: "يقدم: برامج أكاديمية\nيستفيد: مشاركة طلابية",
        },
        {
          name: "منظمة الصحة العالمية",
          role: "دعم دولي",
          logo: "/assets/logos/منظمة الصحة العالمية.png",
          flow: "يقدم: معايير عالمية\nيستفيد: تقارير محلية",
        },
        {
          name: "جمعية أصدقاء المرضى بحريملاء",
          role: "دعم صحي",
          logo: "/assets/logos/جمعية اصدقاء المرضى بحريملاء.png",
          flow: "يقدم: دعم المرضى\nيستفيد: تطوع مجتمعي",
        },
      ],
    },
    en: {
      title: "Community Integration Network",
      subtitle:
        "Each organization provides services to the community while benefiting from citizen data and feedback to improve performance",
      centerEntity: {
        name: "Community & Volunteers",
        description: "The foundation of all initiatives",
        icon: Users,
        stats: "500+ active volunteers",
      },
      connections: [
        {
          name: "Ministry of Health",
          role: "Health services",
          logo: "/assets/logos/وزارة الصحة.png",
          flow: "Provides: Health programs\nReceives: Community reports",
        },
        {
          name: "Ministry of Education",
          role: "Education & training",
          logo: "/assets/logos/وزارة التعليم.png",
          flow: "Provides: Educational programs\nReceives: Volunteer participation",
        },
        {
          name: "Ministry of Environment, Water and Agriculture",
          role: "Environment & agriculture",
          logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
          flow: "Provides: Environmental programs\nReceives: Community participation",
        },
        {
          name: "Ministry of Human Resources and Social Development",
          role: "Social development",
          logo: "/assets/logos/وزارة الموارد البشرية.png",
          flow: "Provides: Development programs\nReceives: Community participation",
        },
        {
          name: "Huraymila General Hospital",
          role: "Medical services",
          logo: "/assets/logos/مستشفى حريملاء العام.jpg",
          flow: "Provides: Medical care\nReceives: Health reports",
        },
        {
          name: "Saudi Civil Defense",
          role: "Civil protection",
          logo: "/assets/logos/الدفاع_المدني_السعودي.png",
          flow: "Provides: Protection & safety\nReceives: Citizen reports",
        },
        {
          name: "National Water Company",
          role: "Water services",
          logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
          flow: "Provides: Clean water\nReceives: Quality reports",
        },
        {
          name: "Huraymila Governorate Interior",
          role: "Local administration",
          logo: "/assets/logos/الداخلية محافظة حريملاء.png",
          flow: "Provides: Administrative services\nReceives: Citizen feedback",
        },
        {
          name: "Riyadh Municipality",
          role: "Municipal services",
          logo: "/assets/logos/امانة الرياض.ico",
          flow: "Provides: Municipal services\nReceives: Community reports",
        },
        {
          name: "Special Forces for Environmental Security",
          role: "Environmental security",
          logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
          flow: "Provides: Environmental protection\nReceives: Environmental reports",
        },
        {
          name: "Police",
          role: "Public security",
          logo: "/assets/logos/الشرطة.png",
          flow: "Provides: Security & protection\nReceives: Citizen reports",
        },
        {
          name: "Traffic Department",
          role: "Traffic management",
          logo: "/assets/logos/المرور.png",
          flow: "Provides: Traffic regulation\nReceives: Traffic data",
        },
        {
          name: "Huraymila Charity Association",
          role: "Social support",
          logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
          flow: "Provides: Charity programs\nReceives: Community volunteering",
        },
        {
          name: "Huraymila Community Development Association",
          role: "Local development",
          logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
          flow: "Provides: Development programs\nReceives: Resident participation",
        },
        {
          name: "Imam Muhammad bin Saud Islamic University",
          role: "Education & research",
          logo: "/assets/logos/جامعة الامام محمد بن سعود .png",
          flow: "Provides: Academic programs\nReceives: Student participation",
        },
        {
          name: "World Health Organization",
          role: "International support",
          logo: "/assets/logos/منظمة الصحة العالمية.png",
          flow: "Provides: Global standards\nReceives: Local reports",
        },
        {
          name: "Huraymila Friends of Patients Association",
          role: "Health support",
          logo: "/assets/logos/جمعية اصدقاء المرضى بحريملاء.png",
          flow: "Provides: Patient support\nReceives: Community volunteering",
        },
      ],
    },
  };
  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-primary/10 overflow-hidden">
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
        <div className="relative w-full max-w-7xl mx-auto h-[800px] mb-16">
          {/* Central Hub - Community */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Central Community Hub without shadow */}
            <div className="w-56 h-56 rounded-full border-4 border-amber-400/80 bg-gradient-to-br from-amber-100/95 to-orange-100/85 dark:from-amber-900/95 dark:to-orange-900/85 flex items-center justify-center relative overflow-hidden">
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
                <div className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">
                  {current.centerEntity.stats}
                </div>
                <div className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                  {isRTL ? "17 جهة شريكة" : "17 Organizations"}
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines - Rendered from Center */}
          {current.connections.map((connection, index) => {
            const angle =
              index * (360 / current.connections.length) * (Math.PI / 180); // Dynamic angle based on actual count
            const radius = 350;
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
            const angle =
              index * (360 / current.connections.length) * (Math.PI / 180); // Dynamic angle based on actual count
            const radius = 350;
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
                  const nextAngle =
                    nextIndex *
                    (360 / current.connections.length) *
                    (Math.PI / 180);
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
                <Card className="w-32 h-24 group-hover:shadow-xl transition-all duration-300 border-2 border-amber-200/60 hover:border-amber-300/80 cursor-pointer relative overflow-hidden bg-white/90 backdrop-blur-sm shadow-md">
                  {/* Clear Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60"></div>

                  <CardContent className="p-2 text-center relative z-10 h-full flex flex-col justify-center">
                    <div className="w-10 h-10 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <img
                        src={connection.logo}
                        alt={connection.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                        style={{ display: "none" }}>
                        {connection.name.charAt(0)}
                      </div>
                    </div>
                    <h4
                      className={cn(
                        "font-semibold text-amber-700 group-hover:text-black transition-colors text-xs leading-tight",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {connection.name}
                    </h4>
                  </CardContent>

                  {/* Active Connection Indicator */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">17</div>
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
