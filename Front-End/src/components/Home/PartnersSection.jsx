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
import { useLanguage } from "@/contexts/LanguageContext";

const PartnersSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();

  const connections = [
    {
      name: t("successPartners.partners.ministryOfHealth"),
      role: language === "ar" ? "خدمات صحية" : "Health Services",
      logo: "/assets/logos/وزارة الصحة.png",
      flow:
        language === "ar"
          ? "يقدم: برامج صحية\nيستفيد: تقارير المجتمع"
          : "Provides: Health Programs\nBenefits: Community Reports",
    },
    {
      name: t("successPartners.partners.ministryOfEducation"),
      role: language === "ar" ? "تعليم وتدريب" : "Education & Training",
      logo: "/assets/logos/وزارة التعليم.png",
      flow:
        language === "ar"
          ? "يقدم: برامج تعليمية\nيستفيد: مشاركة المتطوعين"
          : "Provides: Educational Programs\nBenefits: Volunteer Participation",
    },
    {
      name: t("successPartners.partners.ministryOfEnvironment"),
      role: language === "ar" ? "بيئة وزراعة" : "Environment & Agriculture",
      logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
      flow:
        language === "ar"
          ? "يقدم: برامج بيئية\nيستفيد: مشاركة مجتمعية"
          : "Provides: Environmental Programs\nBenefits: Community Participation",
    },
    {
      name: t("successPartners.partners.ministryOfHumanResources"),
      role: language === "ar" ? "تنمية اجتماعية" : "Social Development",
      logo: "/assets/logos/وزارة الموارد البشرية.png",
      flow:
        language === "ar"
          ? "يقدم: برامج تنموية\nيستفيد: مشاركة مجتمعية"
          : "Provides: Development Programs\nBenefits: Community Participation",
    },
    {
      name: t("successPartners.partners.huraymilaHospital"),
      role: language === "ar" ? "خدمات طبية" : "Medical Services",
      logo: "/assets/logos/مستشفى حريملاء العام.jpg",
      flow:
        language === "ar"
          ? "يقدم: رعاية طبية\nيستفيد: تقارير الصحة"
          : "Provides: Medical Care\nBenefits: Health Reports",
    },
    {
      name: t("successPartners.partners.civilDefense"),
      role: language === "ar" ? "حماية مدنية" : "Civil Protection",
      logo: "/assets/logos/الدفاع_المدني_السعودي.png",
      flow:
        language === "ar"
          ? "يقدم: حماية وأمان\nيستفيد: بلاغات المواطنين"
          : "Provides: Protection & Safety\nBenefits: Citizen Reports",
    },
    {
      name: t("successPartners.partners.nationalWaterCompany"),
      role: language === "ar" ? "خدمات مياه" : "Water Services",
      logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
      flow:
        language === "ar"
          ? "يقدم: مياه صحية\nيستفيد: تقارير الجودة"
          : "Provides: Clean Water\nBenefits: Quality Reports",
    },
    {
      name: t("successPartners.partners.huraymilaGovernorate"),
      role: language === "ar" ? "إدارة محلية" : "Local Administration",
      logo: "/assets/logos/الداخلية محافظة حريملاء.png",
      flow:
        language === "ar"
          ? "يقدم: خدمات إدارية\nيستفيد: ملاحظات المواطنين"
          : "Provides: Administrative Services\nBenefits: Citizen Feedback",
    },
    {
      name: t("successPartners.partners.riyadhMunicipality"),
      role: language === "ar" ? "خدمات بلدية" : "Municipal Services",
      logo: "/assets/logos/امانة الرياض.ico",
      flow:
        language === "ar"
          ? "يقدم: خدمات بلدية\nيستفيد: تقارير مجتمعية"
          : "Provides: Municipal Services\nBenefits: Community Reports",
    },
    {
      name: t("successPartners.partners.environmentalSecurity"),
      role: language === "ar" ? "أمن بيئي" : "Environmental Security",
      logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
      flow:
        language === "ar"
          ? "يقدم: حماية بيئية\nيستفيد: تقارير البيئة"
          : "Provides: Environmental Protection\nBenefits: Environmental Reports",
    },
    {
      name: t("successPartners.partners.police"),
      role: language === "ar" ? "أمن عام" : "Public Security",
      logo: "/assets/logos/الشرطة.png",
      flow:
        language === "ar"
          ? "يقدم: أمن وحماية\nيستفيد: بلاغات المواطنين"
          : "Provides: Security & Protection\nBenefits: Citizen Reports",
    },
    {
      name: t("successPartners.partners.trafficDepartment"),
      role: language === "ar" ? "إدارة مرور" : "Traffic Management",
      logo: "/assets/logos/المرور.png",
      flow:
        language === "ar"
          ? "يقدم: تنظيم المرور\nيستفيد: بيانات المرور"
          : "Provides: Traffic Regulation\nBenefits: Traffic Data",
    },
    {
      name: t("successPartners.partners.charityAssociation"),
      role: language === "ar" ? "دعم اجتماعي" : "Social Support",
      logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
      flow:
        language === "ar"
          ? "يقدم: برامج خيرية\nيستفيد: تطوع المجتمع"
          : "Provides: Charitable Programs\nBenefits: Community Volunteering",
    },
    {
      name: t("successPartners.partners.developmentAssociation"),
      role: language === "ar" ? "تنمية محلية" : "Local Development",
      logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
      flow:
        language === "ar"
          ? "يقدم: برامج تنموية\nيستفيد: مشاركة أهالي"
          : "Provides: Development Programs\nBenefits: Local Participation",
    },
    {
      name: t("successPartners.partners.imamUniversity"),
      role: language === "ar" ? "تعليم وبحث" : "Education & Research",
      logo: "/assets/logos/جامعة الامام محمد بن سعود .png",
      flow:
        language === "ar"
          ? "يقدم: برامج أكاديمية\nيستفيد: مشاركة طلابية"
          : "Provides: Academic Programs\nBenefits: Student Participation",
    },
    {
      name: t("successPartners.partners.who"),
      role: language === "ar" ? "دعم دولي" : "International Support",
      logo: "/assets/logos/منظمة الصحة العالمية.png",
      flow:
        language === "ar"
          ? "يقدم: معايير عالمية\nيستفيد: تقارير محلية"
          : "Provides: Global Standards\nBenefits: Local Reports",
    },
    {
      name: t("successPartners.partners.friendsOfPatients"),
      role: language === "ar" ? "دعم صحي" : "Health Support",
      logo: "/assets/logos/جمعية اصدقاء المرضى بحريملاء.png",
      flow:
        language === "ar"
          ? "يقدم: دعم المرضى\nيستفيد: تطوع مجتمعي"
          : "Provides: Patient Support\nBenefits: Community Volunteering",
    },
  ];

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
            {t("partnersSection.title")}
          </h2>
          <p
            className={cn(
              "text-lg text-muted-foreground max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("partnersSection.subtitle")}
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
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3
                  className={cn(
                    "text-lg font-bold text-foreground mb-2",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("partnersSection.centerEntity.name")}
                </h3>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mb-2",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("partnersSection.centerEntity.description")}
                </p>
                <div className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">
                  {t("partnersSection.centerEntity.stats")}
                </div>
                <div className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                  {t("partnersSection.centerEntity.organizations")}
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines - Rendered from Center */}
          {connections.map((connection, index) => {
            const angle = index * (360 / connections.length) * (Math.PI / 180); // Dynamic angle based on actual count
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
          {connections.map((connection, index) => {
            const angle = index * (360 / connections.length) * (Math.PI / 180); // Dynamic angle based on actual count
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
                    (index + direction + connections.length) %
                    connections.length;
                  const nextAngle =
                    nextIndex * (360 / connections.length) * (Math.PI / 180);
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
              {t("partnersSection.stats.partnerOrganizations")}
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
              {t("partnersSection.stats.integratedInitiatives")}
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
              {t("partnersSection.stats.activeVolunteers")}
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
              {t("partnersSection.stats.communitySatisfaction")}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
