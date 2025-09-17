import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const SuccessPartners = () => {
  const { language } = useTheme();
  const isRTL = language === "ar";

  const partners = [
    {
      name: isRTL ? "وزارة الصحة" : "Ministry of Health",
      logo: "/assets/logos/وزارة الصحة.png",
    },
    {
      name: isRTL ? "وزارة التعليم" : "Ministry of Education",
      logo: "/assets/logos/وزارة التعليم.png",
    },
    {
      name: isRTL
        ? "وزارة البيئة والمياه والزراعة"
        : "Ministry of Environment, Water and Agriculture",
      logo: "/assets/logos/وزارة البيئة والمياه والزراعة.jpg",
    },
    {
      name: isRTL
        ? "وزارة الموارد البشرية والتنمية الاجتماعية"
        : "Ministry of Human Resources and Social Development",
      logo: "/assets/logos/وزارة الموارد البشرية.png",
    },
    {
      name: isRTL ? "مستشفى حريملاء العام" : "Huraymila General Hospital",
      logo: "/assets/logos/مستشفى حريملاء العام.jpg",
    },
    {
      name: isRTL ? "الدفاع المدني" : "Saudi Civil Defense",
      logo: "/assets/logos/الدفاع_المدني_السعودي.png",
    },
    {
      name: isRTL ? "شركة المياه الوطنية" : "National Water Company",
      logo: "/assets/logos/شعار_شركة_المياه_الوطنية.jpeg",
    },
    {
      name: isRTL ? "محافظة حريملاء" : "Huraymila Governorate Interior",
      logo: "/assets/logos/الداخلية محافظة حريملاء.png",
    },
    {
      name: isRTL ? "بلدية حريملاء" : "Riyadh Municipality",
      logo: "/assets/logos/امانة الرياض.ico",
    },
    {
      name: isRTL
        ? "القوة الخاصة للأمن البيئي"
        : "Special Forces for Environmental Security",
      logo: "/assets/logos/القوة الخاصة للامن البيئي.jpg",
    },
    {
      name: isRTL ? "الشرطة" : "Police",
      logo: "/assets/logos/الشرطة.png",
    },
    {
      name: isRTL ? "المرور" : "Traffic Department",
      logo: "/assets/logos/المرور.png",
    },
    {
      name: isRTL ? "جمعية حريملاء الخيرية" : "Huraymila Charity Association",
      logo: "/assets/logos/جمعية حريملاء الخيرية.jpg",
    },
    {
      name: isRTL
        ? "جمعية التنمية الأهلية بحريملاء"
        : "Huraymila Community Development Association",
      logo: "/assets/logos/جمعية التنمية الاهلية بحريملاء.jpg",
    },
    {
      name: isRTL
        ? "جامعة الإمام محمد بن سعود الإسلامية"
        : "Imam Muhammad bin Saud Islamic University",
      logo: "/assets/logos/جامعة الامام محمد بن سعود .png",
    },
    {
      name: isRTL ? "منظمة الصحة العالمية" : "World Health Organization",
      logo: "/assets/logos/منظمة الصحة العالمية.png",
    },
    {
      name: isRTL
        ? "جمعية أصدقاء المرضى بحريملاء"
        : "Huraymila Friends of Patients Association",
      logo: "/assets/logos/جمعية اصدقاء المرضى بحريملاء.png",
    },
  ];

  return (
    <section className="w-full bg-secondary/15 backdrop-blur-sm py-12 overflow-hidden">
      <div className="w-full px-4 mb-8">
        <h3
          className={cn(
            "text-xl md:text-2xl font-bold text-foreground text-center",
            isRTL ? "font-arabic" : "font-english"
          )}>
          {isRTL ? "شركاؤنا في النجاح" : "Our Partners in Success"}
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
                className="flex-shrink-0 w-32 sm:w-40 mx-2 bg-card backdrop-blur-md rounded-lg p-4 text-center border border-border hover:bg-card/70 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
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
                    "text-foreground text-xs leading-tight",
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
                className="flex-shrink-0 w-32 sm:w-40 mx-2 bg-card backdrop-blur-md rounded-lg p-4 text-center border border-border hover:bg-card/70 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
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
                    "text-foreground text-xs leading-tight",
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
