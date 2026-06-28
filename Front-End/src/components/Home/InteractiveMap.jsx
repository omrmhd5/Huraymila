import React, { useState, useEffect } from "react";
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
  Home,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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
  custom: {
    color: "bg-red-600",
    borderColor: "border-red-700",
    icon: Home,
    labelAr: "مواقعنا الخاصة",
    labelEn: "Our Custom Locations",
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
  const { user, token } = useAuth();

  // Define allowed agencies: "الامن و السلامة" and "التنمية الصحية"
  const isAllowedAgency =
    user &&
    user.type === "agency" &&
    (user.name === "الامن و السلامة" || user.name === "التنمية الصحية");

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState(
    Object.keys(CATEGORY_CONFIG)
  );

  // States for adding/editing custom markers
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formCoords, setFormCoords] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    address: "",
  });

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
        const response = await mapApi.getMapLocations(token);
        setLocations(response.data || []);
      } catch (err) {
        setError(t.errorLoading);
      } finally {
        setLoading(false);
      }
    };
    loadLocations();
  }, [token]);

  const toggleCategory = (category) => {
    setVisibleCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter which categories can be viewed in the filter section
  const availableCategories = Object.keys(CATEGORY_CONFIG).filter(
    (key) => key !== "custom" || isAllowedAgency
  );

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

  // Map Click Handler for placing custom markers
  const handleMapClick = (e) => {
    if (!isAddingMode) return;
    let lat = null;
    let lng = null;

    if (e.detail?.latLng) {
      lat = typeof e.detail.latLng.lat === "function" ? e.detail.latLng.lat() : e.detail.latLng.lat;
      lng = typeof e.detail.latLng.lng === "function" ? e.detail.latLng.lng() : e.detail.latLng.lng;
    } else if (e.latLng) {
      lat = e.latLng.lat();
      lng = e.latLng.lng();
    }

    if (lat !== null && lng !== null) {
      setFormCoords({ lat, lng });
      setEditingLocation(null);
      setFormData({ name: "", nameEn: "", address: "" });
      setIsFormOpen(true);
      setIsAddingMode(false);
    }
  };

  // Handle Edit Action
  const handleStartEdit = (loc) => {
    setEditingLocation(loc);
    setFormData({
      name: loc.name,
      nameEn: loc.nameEn || "",
      address: loc.address || "",
    });
    setFormCoords({
      lat: loc.lat,
      lng: loc.lng,
    });
    setIsFormOpen(true);
  };

  // Handle Delete Action
  const handleDeleteClick = async (id) => {
    const confirmMessage = isRTL
      ? "هل أنت متأكد من رغبتك في حذف هذا الموقع المخصص؟"
      : "Are you sure you want to delete this custom location?";
    if (!confirm(confirmMessage)) return;

    try {
      setLoading(true);
      await mapApi.deleteMapLocation(id, token);
      setLocations((prev) => prev.filter((loc) => loc._id !== id));
      setSelectedLocation(null);
    } catch (err) {
      alert(err.message || "Error deleting location");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submission (Create / Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert(isRTL ? "يرجى إدخال اسم الموقع" : "Please enter location name");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name,
        nameEn: formData.nameEn,
        address: formData.address,
        lat: formCoords.lat,
        lng: formCoords.lng,
      };

      if (editingLocation) {
        const response = await mapApi.updateMapLocation(
          editingLocation._id,
          payload,
          token
        );
        setLocations((prev) =>
          prev.map((loc) =>
            loc._id === editingLocation._id ? response.data : loc
          )
        );
        setSelectedLocation(response.data);
      } else {
        const response = await mapApi.createMapLocation(payload, token);
        setLocations((prev) => [...prev, response.data]);
      }

      setIsFormOpen(false);
      setEditingLocation(null);
    } catch (err) {
      alert(err.message || "Error saving location");
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Add Custom Location Button (Only visible to allowed agencies) */}
            {isAllowedAgency && (
              <Button
                onClick={() => {
                  setIsAddingMode(true);
                  setSelectedLocation(null);
                }}
                disabled={isAddingMode}
                className="w-full bg-[#186a3b] hover:bg-[#186a3b]/90 text-white font-bold flex items-center justify-center gap-2 py-3 rounded-lg shadow-md font-arabic">
                <MapPin className="w-4 h-4" />
                {isRTL ? "إضافة موقع مخصص جديد" : "Add Custom Location"}
              </Button>
            )}

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

                {availableCategories.map((key) => {
                  const config = CATEGORY_CONFIG[key];
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

                  {/* Actions for custom locations */}
                  {isAllowedAgency && selectedLocation.isCustom && (
                    <div className="flex gap-2 mt-4" dir={isRTL ? "rtl" : "ltr"}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartEdit(selectedLocation)}
                        className="flex-1 text-xs">
                        {isRTL ? "تعديل" : "Edit"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(selectedLocation._id)}
                        className="flex-1 text-xs bg-red-600 hover:bg-red-700 text-white">
                        {isRTL ? "حذف" : "Delete"}
                      </Button>
                    </div>
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
            <Card className="overflow-hidden shadow-xl relative">
              <CardContent className="p-0">
                <div className="relative h-[600px]">
                  {/* Overlay Adding Mode Banner */}
                  {isAddingMode && (
                    <div className="absolute top-4 left-4 right-4 bg-primary text-white p-3 rounded-lg shadow-lg z-50 text-center text-sm font-semibold animate-pulse font-arabic flex justify-between items-center" dir="rtl">
                      <span>📍 انقر فوق أي مكان على الخريطة لتحديد موقع العلامة المخصصة الجديدة.</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsAddingMode(false)}
                        className="text-xs bg-white text-primary hover:bg-white/95 border-0">
                        {isRTL ? "إلغاء" : "Cancel"}
                      </Button>
                    </div>
                  )}

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
                        onClick={handleMapClick}
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

      {/* Elegant Overlay Modal for adding/editing a marker */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl border border-gray-200">
            <form onSubmit={handleFormSubmit}>
              <CardContent className="p-6 space-y-4 font-arabic" dir="rtl">
                <h3 className="text-lg font-bold text-right text-foreground border-b pb-2 mb-2">
                  {editingLocation ? "تعديل موقع مخصص" : "إضافة موقع مخصص جديد"}
                </h3>
                
                <div className="space-y-4 text-right">
                  <div>
                    <label className="text-sm font-semibold block text-right mb-1 text-gray-700">الاسم (بالعربية) *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border p-2.5 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="مثال: مقر الأمن والسلامة الجديد"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block text-right mb-1 text-gray-700">الاسم (بالإنجليزي)</label>
                    <input
                      type="text"
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      className="w-full border p-2.5 rounded-lg text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Example: Security & Safety HQ"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block text-right mb-1 text-gray-700">العنوان</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full border p-2.5 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="العنوان أو الحي"
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-2 border-t pt-2" dir="ltr">
                    <span>Lat: {formCoords?.lat.toFixed(6)}</span>
                    <span>Lng: {formCoords?.lng.toFixed(6)}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)} className="px-4">
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="px-4">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "حفظ"}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}
    </section>
  );
};

export default InteractiveMap;
