import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Heart,
  Building,
  Building2,
  GraduationCap,
  Shield,
  Leaf,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  Loader2,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { mapApi } from "@/lib/mapApi";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;

// Huraymila city center
const HURAYMILA_CENTER = { lat: 25.1158, lng: 46.104 };
const DEFAULT_ZOOM = 13;

// Category config
const CATEGORY_CONFIG = {
  government: {
    color: "bg-blue-500",
    borderColor: "border-blue-600",
    icon: Building2,
    labelAr: "جهات حكومية",
    labelEn: "Government",
  },
  local: {
    color: "bg-green-500",
    borderColor: "border-green-600",
    icon: Building,
    labelAr: "جهات محلية / جمعيات",
    labelEn: "Local & NGOs",
  },
  educational: {
    color: "bg-purple-500",
    borderColor: "border-purple-600",
    icon: GraduationCap,
    labelAr: "مؤسسات تعليمية",
    labelEn: "Educational",
  },
  security: {
    color: "bg-red-500",
    borderColor: "border-red-600",
    icon: Shield,
    labelAr: "الأجهزة الأمنية",
    labelEn: "Security",
  },
  health: {
    color: "bg-teal-500",
    borderColor: "border-teal-600",
    icon: Heart,
    labelAr: "الخدمات الصحية",
    labelEn: "Health Services",
  },
  public: {
    color: "bg-orange-500",
    borderColor: "border-orange-600",
    icon: Leaf,
    labelAr: "الخدمات العامة",
    labelEn: "Public Services",
  },
};

// Custom Pin Component rendered inside AdvancedMarker
const CategoryPin = ({ category, isSelected }) => {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.public;
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 border-2",
        config.color,
        config.borderColor,
        isSelected ? "scale-125 ring-4 ring-white/50 shadow-xl" : "hover:scale-110"
      )}>
      <IconComponent className="w-5 h-5" />
    </div>
  );
};

// Zoom Controls — uses useMap() hook, must be inside <Map> tree
const ZoomControls = ({ onReset, zoomInLabel, zoomOutLabel, resetLabel }) => {
  const map = useMap();

  const handleZoomIn = () => {
    if (map) map.setZoom((map.getZoom() || DEFAULT_ZOOM) + 1);
  };
  const handleZoomOut = () => {
    if (map) map.setZoom(Math.max((map.getZoom() || DEFAULT_ZOOM) - 1, 8));
  };
  const handleReset = () => {
    if (map) {
      map.setCenter(HURAYMILA_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
    onReset();
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <Button
        onClick={handleZoomIn}
        variant="outline"
        size="sm"
        className="bg-background/90 backdrop-blur-sm shadow-md w-9 h-9 p-0">
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button
        onClick={handleZoomOut}
        variant="outline"
        size="sm"
        className="bg-background/90 backdrop-blur-sm shadow-md w-9 h-9 p-0">
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        size="sm"
        className="bg-background/90 backdrop-blur-sm shadow-md w-9 h-9 p-0">
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

const InteractiveMap = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState(
    Object.keys(CATEGORY_CONFIG)
  );

  const content = {
    ar: {
      title: "خريطة محافظة حريملاء التفاعلية",
      subtitle: "استكشف مواقع الشركاء والمرافق الصحية في المحافظة",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      reset: "إعادة تعيين",
      hideDetails: "إخفاء التفاصيل",
      filterTitle: "تصفية حسب النوع",
      clickHint: "انقر على العلامات للحصول على التفاصيل",
      loading: "جاري تحميل الخريطة...",
      noLocations: "لا توجد مواقع محفوظة. يرجى تشغيل أداة الاستيراد أولاً.",
      errorLoading: "تعذر تحميل بيانات الخريطة",
      address: "العنوان",
      rating: "التقييم",
    },
    en: {
      title: "Interactive Map of Huraymila Governorate",
      subtitle: "Explore partner locations and health facilities in the governorate",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      reset: "Reset",
      hideDetails: "Hide Details",
      filterTitle: "Filter by Category",
      clickHint: "Click markers for details",
      loading: "Loading map...",
      noLocations: "No locations found. Please run the seeder script first.",
      errorLoading: "Failed to load map data",
      address: "Address",
      rating: "Rating",
    },
  };

  const t = content[language] || content.en;

  // Load locations from our own backend (DB cache)
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await mapApi.getMapLocations();
        setLocations(response.data || []);
      } catch (err) {
        setError(t.errorLoading);
      } finally {
        setLoading(false);
      }
    };
    loadLocations();
  }, []);

  const toggleCategory = (category) => {
    setVisibleCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredLocations = locations.filter((loc) =>
    visibleCategories.includes(loc.category)
  );

  const getCategoryLabel = (category) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) return category;
    return isRTL ? config.labelAr : config.labelEn;
  };

  const getCategoryColor = (category) => {
    return CATEGORY_CONFIG[category]?.color || "bg-gray-500";
  };

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-4xl font-bold mb-4",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t.title}
          </h2>
          <p
            className={cn(
              "text-xl text-muted-foreground",
              isRTL ? "font-arabic" : "font-english"
            )}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="space-y-4">
            {/* Category Filters */}
            <Card>
              <CardContent className="space-y-3 p-4">
                <h3
                  className={cn(
                    "font-semibold text-sm",
                    isRTL ? "font-arabic text-right" : "font-english text-left"
                  )}>
                  {t.filterTitle}
                </h3>

                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <label
                      key={key}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition-opacity",
                        isRTL ? "flex-row-reverse" : "flex-row"
                      )}>
                      <input
                        type="checkbox"
                        checked={visibleCategories.includes(key)}
                        onChange={() => toggleCategory(key)}
                        className="accent-primary"
                      />
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0",
                          config.color
                        )}>
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {isRTL ? config.labelAr : config.labelEn}
                      </span>
                    </label>
                  );
                })}
              </CardContent>
            </Card>

            {/* Selected Location Info Card */}
            {selectedLocation && (
              <Card className="border-primary/30 shadow-md">
                <CardContent className="p-4">
                  <div
                    className={cn(
                      "flex items-start gap-2 mb-2",
                      isRTL ? "flex-row-reverse" : "flex-row"
                    )}>
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <h4
                      className={cn(
                        "font-bold text-sm leading-tight",
                        isRTL ? "font-arabic text-right" : "font-english text-left"
                      )}>
                      {isRTL
                        ? selectedLocation.name
                        : selectedLocation.nameEn || selectedLocation.name}
                    </h4>
                  </div>

                  <Badge
                    className={cn(
                      "mb-2 text-white text-xs",
                      getCategoryColor(selectedLocation.category)
                    )}>
                    {getCategoryLabel(selectedLocation.category)}
                  </Badge>

                  {selectedLocation.address && (
                    <p
                      className={cn(
                        "text-xs text-muted-foreground mt-2",
                        isRTL ? "font-arabic text-right" : "font-english text-left"
                      )}>
                      <span className="font-medium">{t.address}: </span>
                      {selectedLocation.address}
                    </p>
                  )}

                  {selectedLocation.rating && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ⭐ {t.rating}: {selectedLocation.rating}
                    </p>
                  )}

                  <Button
                    onClick={() => setSelectedLocation(null)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full mt-3 text-xs",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {t.hideDetails}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            {!loading && locations.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <p
                    className={cn(
                      "text-xs text-muted-foreground",
                      isRTL ? "font-arabic text-right" : "font-english text-left"
                    )}>
                    {isRTL
                      ? `${filteredLocations.length} من ${locations.length} موقع`
                      : `${filteredLocations.length} of ${locations.length} locations`}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* MAP AREA */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative h-[600px]">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {t.loading}
                        </p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                      <div className="text-center space-y-3">
                        <MapPin className="w-10 h-10 text-muted-foreground mx-auto" />
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {error}
                        </p>
                        {locations.length === 0 && (
                          <p className="text-xs text-muted-foreground font-mono bg-muted px-3 py-1 rounded">
                            node Back-End/utils/seedMapLocations.js
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                      <Map
                        mapId={GOOGLE_MAPS_ID}
                        defaultCenter={HURAYMILA_CENTER}
                        defaultZoom={DEFAULT_ZOOM}
                        gestureHandling="greedy"
                        disableDefaultUI={true}
                        className="w-full h-full">
                        {/* Custom Zoom Controls inside Map for useMap() access */}
                        <ZoomControls
                          onReset={() => setSelectedLocation(null)}
                          zoomInLabel={t.zoomIn}
                          zoomOutLabel={t.zoomOut}
                          resetLabel={t.reset}
                        />

                        {/* Markers */}
                        {filteredLocations.map((location) => (
                          <AdvancedMarker
                            key={location._id || location.placeId}
                            position={{ lat: location.lat, lng: location.lng }}
                            onClick={() => setSelectedLocation(location)}
                            title={isRTL ? location.name : location.nameEn || location.name}>
                            <CategoryPin
                              category={location.category}
                              isSelected={selectedLocation?._id === location._id}
                            />
                          </AdvancedMarker>
                        ))}
                      </Map>

                      {/* Click Hint */}
                      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border text-sm flex items-center gap-2 z-10 pointer-events-none">
                        <Navigation className="h-4 w-4 text-primary" />
                        <span
                          className={cn(
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {t.clickHint}
                        </span>
                      </div>
                    </APIProvider>
                  )}
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
