import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const SuccessPartners = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const isRTL = language === "ar";

  const partners = [
    {
      name: t("successPartners.partners.ministryOfHealth"),
      logo: "/assets/logos/وزارة الصحة.png",
    },
    {
      name: t("successPartners.partners.ministryOfEducation"),
      logo: "/assets/logos/وزارة التعليم.png",
    },
    {
      name: t("successPartners.partners.ministryOfEnvironment"),
      logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
    },
    {
      name: t("successPartners.partners.ministryOfHumanResources"),
      logo: "/assets/logos/وزارة الموارد البشرية.png",
    },
    {
      name: t("successPartners.partners.huraymilaHospital"),
      logo: "/assets/logos/مستشفى حريملاء العام.jpg",
    },
    {
      name: t("successPartners.partners.civilDefense"),
      logo: "/assets/logos/الدفاع_المدني_السعودي.png",
    },
    {
      name: t("successPartners.partners.nationalWaterCompany"),
      logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
    },
    {
      name: t("successPartners.partners.huraymilaGovernorate"),
      logo: "/assets/logos/الداخلية محافظة حريملاء.png",
    },
    {
      name: t("successPartners.partners.riyadhMunicipality"),
      logo: "/assets/logos/امانة الرياض.ico",
    },
    {
      name: t("successPartners.partners.environmentalSecurity"),
      logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
    },
    {
      name: t("successPartners.partners.police"),
      logo: "/assets/logos/الشرطة.png",
    },
    {
      name: t("successPartners.partners.trafficDepartment"),
      logo: "/assets/logos/المرور.png",
    },
    {
      name: t("successPartners.partners.charityAssociation"),
      logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
    },
    {
      name: t("successPartners.partners.developmentAssociation"),
      logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
    },
    {
      name: t("successPartners.partners.imamUniversity"),
      logo: "/assets/logos/جامعة الامام محمد بن سعود .png",
    },
    {
      name: t("successPartners.partners.who"),
      logo: "/assets/logos/منظمة الصحة العالمية.png",
    },
    {
      name: t("successPartners.partners.friendsOfPatients"),
      logo: "/assets/logos/جمعية اصدقاء المرضى بحريملاء.png",
    },
  ];

  return (
    <section className="w-full bg-secondary/15 backdrop-blur-sm py-6 md:py-10 lg:py-12 overflow-hidden">
      <div className="w-full px-4 mb-4 md:mb-6 lg:mb-8">
        <h3
          className={cn(
            "text-lg md:text-xl lg:text-2xl font-bold text-foreground text-center",
            isRTL ? "font-arabic" : "font-english"
          )}>
          {t("successPartners.title")}
        </h3>
      </div>

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Moving Slider */}
        <div className="flex overflow-hidden">
          <div
            className={`flex ${
              isRTL ? "animate-scroll-infinite-rtl" : "animate-scroll-infinite"
            }`}
            style={{
              width: "max-content",
            }}>
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-24 sm:w-32 md:w-36 lg:w-40 mx-1 sm:mx-2 bg-card backdrop-blur-md rounded-lg p-2 sm:p-3 md:p-4 text-center border border-border hover:bg-card/70 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                    style={{ display: "none" }}>
                    {partner.name.charAt(0)}
                  </div>
                </div>
                <div
                  className={cn(
                    "text-foreground text-[10px] sm:text-xs leading-tight",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {partner.name}
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-24 sm:w-32 md:w-36 lg:w-40 mx-1 sm:mx-2 bg-card backdrop-blur-md rounded-lg p-2 sm:p-3 md:p-4 text-center border border-border hover:bg-card/70 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                    style={{ display: "none" }}>
                    {partner.name.charAt(0)}
                  </div>
                </div>
                <div
                  className={cn(
                    "text-foreground text-[10px] sm:text-xs leading-tight",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPartners;
