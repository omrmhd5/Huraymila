import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { partnerApi } from "@/lib/partnerApi";

const SuccessPartners = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const isRTL = language === "ar";
  const [partners, setPartners] = React.useState([]);

  const fetchPartners = React.useCallback(async () => {
    try {
      const data = await partnerApi.getAllPartners();
      setPartners(data);
    } catch (error) {
      console.error("Failed to fetch partners", error);
    }
  }, []);

  React.useEffect(() => {
    fetchPartners();

    const handleUpdate = () => {
      fetchPartners();
    };

    window.addEventListener("partners-updated", handleUpdate);
    return () => {
      window.removeEventListener("partners-updated", handleUpdate);
    };
  }, [fetchPartners]);

  const getFullLogoUrl = (logoPath) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    
    const API_URL = import.meta.env.VITE_API_URL || 
                    (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api");
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}${logoPath}`;
  };

  return (
    <section className="w-full bg-primary/10 py-6 md:py-10 lg:py-12 overflow-hidden">
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
                    src={getFullLogoUrl(partner.logo)}
                    alt={isRTL ? partner.name_ar : partner.name_en}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                    style={{ display: "none" }}>
                    {(isRTL ? partner.name_ar : partner.name_en)?.charAt(0)}
                  </div>
                </div>
                <div
                  className={cn(
                    "text-foreground text-[10px] sm:text-xs leading-tight",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {isRTL ? partner.name_ar : partner.name_en}
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
                    src={getFullLogoUrl(partner.logo)}
                    alt={isRTL ? partner.name_ar : partner.name_en}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground"
                    style={{ display: "none" }}>
                    {(isRTL ? partner.name_ar : partner.name_en)?.charAt(0)}
                  </div>
                </div>
                <div
                  className={cn(
                    "text-foreground text-[10px] sm:text-xs leading-tight",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {isRTL ? partner.name_ar : partner.name_en}
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
