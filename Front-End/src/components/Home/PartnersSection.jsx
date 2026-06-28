import React from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { partnerApi } from "@/lib/partnerApi";
import PartnersManagementModal from "./PartnersManagementModal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const PartnersSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [dimensions, setDimensions] = React.useState({ width: 0 });
  const [connections, setConnections] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPartners = async () => {
    try {
      const data = await partnerApi.getAllPartners();
      setConnections(data);
    } catch (error) {
      console.error("Failed to fetch partners", error);
    }
  };

  React.useEffect(() => {
    fetchPartners();
  }, []);

  const isRTL = language === "ar";
  
  const getFullLogoUrl = (logoPath) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    
    const API_URL = import.meta.env.VITE_API_URL || 
                    (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api");
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}${logoPath}`;
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary/15 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {user?.type === "governor" && (
          <div className={`absolute top-0 ${isRTL ? 'left-4' : 'right-4'} z-30`}>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isRTL ? "إدارة الشركاء" : "Edit Partners"}
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("partnersSection.title")}
          </h2>
          <p
            className={cn(
              "text-base md:text-lg text-muted-foreground max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t("partnersSection.subtitle")}
          </p>
        </div>

        {/* Hexagonal Network */}
        <div className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[600px] lg:h-[800px] mb-8 md:mb-16 overflow-hidden">
          {/* Central Hub - Community */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Central Community Hub without shadow */}
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-amber-400/80 bg-gradient-to-br from-amber-100/95 to-orange-100/85 dark:from-amber-900/95 dark:to-orange-900/85 flex items-center justify-center relative overflow-hidden">
              {/* Animated Inner Rings */}
              <div
                className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-amber-300/40 animate-ping hidden md:block"
                style={{
                  animationDuration: "4s",
                }}></div>
              <div
                className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border border-amber-200/30 animate-ping hidden md:block"
                style={{
                  animationDelay: "2s",
                  animationDuration: "4s",
                }}></div>

              <div className="text-center z-10 relative px-2">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-2 md:mb-3 mx-auto animate-pulse">
                  <Users className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <h3
                  className={cn(
                    "text-xs md:text-sm lg:text-lg font-bold text-foreground mb-1 md:mb-2",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("partnersSection.centerEntity.name")}
                </h3>
                <p
                  className={cn(
                    "text-[10px] md:text-xs lg:text-sm text-muted-foreground mb-1 md:mb-2 hidden lg:block",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {t("partnersSection.centerEntity.description")}
                </p>
                <div className="text-amber-600 dark:text-amber-400 font-bold text-[10px] md:text-xs lg:text-sm mb-1">
                  {t("partnersSection.centerEntity.stats")}
                </div>
                <div className="text-amber-700 dark:text-amber-300 font-bold text-[9px] md:text-[10px] lg:text-xs hidden lg:block">
                  {connections.length} {isRTL ? "لجان شريكة" : "Partner Committees"}
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines - Rendered from Center */}
          {connections.map((connection, index) => {
            const angle = index * (360 / connections.length) * (Math.PI / 180); // Dynamic angle based on actual count
            const radius =
              dimensions.width < 768
                ? 150
                : dimensions.width < 1024
                ? 250
                : 350;
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
            const radius =
              dimensions.width < 768
                ? 150
                : dimensions.width < 1024
                ? 250
                : 350;
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
                <Card className="w-20 h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 group-hover:shadow-xl transition-all duration-300 border-2 border-amber-200/60 hover:border-amber-300/80 cursor-pointer relative overflow-hidden bg-white/90 backdrop-blur-sm shadow-md">
                  {/* Clear Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60"></div>

                  <CardContent className="p-1 md:p-1.5 lg:p-2 text-center relative z-10 h-full flex flex-col justify-center">
                    <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mx-auto mb-1 md:mb-1.5 lg:mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <img
                        src={getFullLogoUrl(connection.logo)}
                        alt={isRTL ? connection.name_ar : connection.name_en}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                        style={{ display: "none" }}>
                        {(isRTL ? connection.name_ar : connection.name_en).charAt(0)}
                      </div>
                    </div>
                    <h4
                      className={cn(
                        "font-semibold text-amber-700 group-hover:text-black transition-colors text-[9px] md:text-[10px] lg:text-xs leading-tight",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {isRTL ? connection.name_ar : connection.name_en}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {connections.length}
            </div>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("partnersSection.stats.partnerOrganizations")}
            </p>
          </Card>

          <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <Target className="h-6 w-6 md:h-8 md:w-8 text-secondary mx-auto mb-2 md:mb-3" />
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
              50+
            </div>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("partnersSection.stats.integratedInitiatives")}
            </p>
          </Card>

          <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-accent mx-auto mb-2 md:mb-3" />
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              500+
            </div>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("partnersSection.stats.activeVolunteers")}
            </p>
          </Card>

          <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <HandHeart className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              95%
            </div>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("partnersSection.stats.communitySatisfaction")}
            </p>
          </Card>
        </div>
      </div>
      
      <PartnersManagementModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
        onPartnersUpdated={fetchPartners} 
      />
    </section>
  );
};

export default PartnersSection;
