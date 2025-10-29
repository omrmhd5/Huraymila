import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Heart,
  Building,
  GraduationCap,
  Droplets,
  Car,
  Shield,
  Leaf,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const InteractiveMap = () => {
  const { language } = useLanguage(); // ✅ fix missing language prop
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(100);
  const [visibleCategories, setVisibleCategories] = useState([
    "حكومي",
    "محلي",
    "تعليمي",
    "خدمي",
    "أمني",
    "Government",
    "Local",
    "Educational",
    "Service",
    "Security",
  ]);

  const content = {
    ar: {
      title: "خريطة محافظة حريملاء التفاعلية",
      subtitle: "استكشف مواقع الشركاء والمرافق الصحية في المحافظة",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      reset: "إعادة تعيين",
      hideDetails: "إخفاء التفاصيل",
      filterTitle: "تصفية حسب النوع",
      categories: {
        حكومي: "الجهات الحكومية",
        محلي: "الجهات المحلية",
        تعليمي: "المؤسسات التعليمية",
        خدمي: "الخدمات العامة",
        أمني: "الأجهزة الأمنية",
      },
      locations: [
        {
          name: "وزارة الصحة",
          type: "حكومي",
          description: "الجهة المشرفة على برنامج المدن الصحية",
          icon: Heart,
          position: { top: "20%", left: "30%" },
        },
        {
          name: "بلدية حريملاء",
          type: "محلي",
          description: "الشريك المحلي في تنفيذ المبادرات",
          icon: Building,
          position: { top: "45%", left: "50%" },
        },
        {
          name: "إدارة التعليم",
          type: "تعليمي",
          description: "تطوير البرامج التعليمية والتوعوية",
          icon: GraduationCap,
          position: { top: "35%", left: "70%" },
        },
        {
          name: "شركة المياه الوطنية",
          type: "خدمي",
          description: "ضمان جودة المياه وسلامة الشبكات",
          icon: Droplets,
          position: { top: "60%", left: "25%" },
        },
        {
          name: "إدارة المرور",
          type: "أمني",
          description: "تحسين السلامة المرورية والنقل المستدام",
          icon: Car,
          position: { top: "65%", left: "65%" },
        },
        {
          name: "الدفاع المدني",
          type: "أمني",
          description: "ضمان السلامة العامة وإدارة المخاطر",
          icon: Shield,
          position: { top: "25%", left: "75%" },
        },
      ],
    },

    en: {
      title: "Interactive Map of Harimlaa Governorate",
      subtitle: "Explore partner locations and health facilities",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      reset: "Reset",
      hideDetails: "Hide Details",
      filterTitle: "Filter by Category",
      categories: {
        Government: "Government Entities",
        Local: "Local Authorities",
        Educational: "Educational Institutions",
        Service: "Public Services",
        Security: "Security Agencies",
      },
      locations: [
        {
          name: "Ministry of Health",
          type: "Government",
          description: "Supervising authority for the Healthy Cities program",
          icon: Heart,
          position: { top: "20%", left: "30%" },
        },
        {
          name: "Harimlaa Municipality",
          type: "Local",
          description: "Local partner in initiatives",
          icon: Building,
          position: { top: "45%", left: "50%" },
        },
        {
          name: "Education Department",
          type: "Educational",
          description: "Developing educational programs",
          icon: GraduationCap,
          position: { top: "35%", left: "70%" },
        },
        {
          name: "National Water Company",
          type: "Service",
          description: "Ensuring water safety",
          icon: Droplets,
          position: { top: "60%", left: "25%" },
        },
        {
          name: "Traffic Department",
          type: "Security",
          description: "Traffic safety and sustainable mobility",
          icon: Car,
          position: { top: "65%", left: "65%" },
        },
        {
          name: "Civil Defense",
          type: "Security",
          description: "Public safety and risk management",
          icon: Shield,
          position: { top: "25%", left: "75%" },
        },
      ],
    },
  };

  const current = content[language] || content.en; // ✅ prevents crash
  const isRTL = language === "ar";

  const getCategoryColor = (type) => {
    const colors = {
      حكومي: "bg-blue-500",
      محلي: "bg-green-500",
      تعليمي: "bg-purple-500",
      خدمي: "bg-orange-500",
      أمني: "bg-red-500",
      Government: "bg-blue-500",
      Local: "bg-green-500",
      Educational: "bg-purple-500",
      Service: "bg-orange-500",
      Security: "bg-red-500",
    };
    return colors[type] || "bg-gray-500";
  };

  const handleZoomIn = () => setMapZoom((z) => Math.min(z + 20, 200));
  const handleZoomOut = () => setMapZoom((z) => Math.max(z - 20, 50));
  const handleReset = () => {
    setMapZoom(100);
    setSelectedLocation(null);
  };

  const toggleCategory = (category) => {
    setVisibleCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredLocations = current.locations.filter((loc) =>
    visibleCategories.includes(loc.type)
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-4xl font-bold mb-4",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.title}
          </h2>
          <p
            className={cn(
              "text-xl text-muted-foreground",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {current.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT CONTROLS */}
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-2 p-4">
                <Button
                  onClick={handleZoomIn}
                  variant="outline"
                  className="w-full">
                  <ZoomIn className="w-4 h-4 mr-2" /> {current.zoomIn}
                </Button>
                <Button
                  onClick={handleZoomOut}
                  variant="outline"
                  className="w-full">
                  <ZoomOut className="w-4 h-4 mr-2" /> {current.zoomOut}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" /> {current.reset}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-4">
                <h3
                  className={cn(
                    "font-semibold",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.filterTitle}
                </h3>

                {Object.entries(current.categories).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleCategories.includes(key)}
                      onChange={() => toggleCategory(key)}
                    />
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getCategoryColor(key)
                      )}></div>
                    {label}
                  </label>
                ))}
              </CardContent>
            </Card>

            {selectedLocation !== null &&
              current.locations[selectedLocation] && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-bold">
                      {current.locations[selectedLocation].name}
                    </h4>
                    <Badge className="my-2">
                      {current.locations[selectedLocation].type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {current.locations[selectedLocation].description}
                    </p>
                    <Button
                      onClick={() => setSelectedLocation(null)}
                      variant="ghost"
                      className="w-full mt-2">
                      {current.hideDetails}
                    </Button>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* MAP */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[600px] bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
                  {/* MAP ZOOM WRAPPER */}
                  <div
                    className="absolute inset-0 transition-transform duration-300"
                    style={{
                      transform: `scale(${mapZoom / 100})`,
                      transformOrigin: "center",
                    }}>
                    {/* OUTLINE MAP */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-64 border-4 border-dashed border-primary/30 rounded-3xl bg-primary/10 flex items-center justify-center flex-col">
                      <Leaf className="h-8 w-8 text-primary mb-2" />
                      <span>
                        {isRTL ? "محافظة حريملاء" : "Harimlaa Governorate"}
                      </span>
                    </div>

                    {/* LOCATION MARKERS */}
                    {filteredLocations.map((location, index) => (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          top: location.position.top,
                          left: location.position.left,
                        }}
                        onClick={() => setSelectedLocation(index)}>
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all",
                            getCategoryColor(location.type),
                            selectedLocation === index &&
                              "ring-4 ring-primary/30 scale-125"
                          )}>
                          <location.icon className="h-6 w-6" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* NAV HINT */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border text-sm flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-primary" />
                    {isRTL
                      ? "انقر على العلامات للحصول على التفاصيل"
                      : "Click markers for details"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
