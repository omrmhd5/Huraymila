import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Filter,
  X,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/contexts/ThemeContext";

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for different service types
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        transform: rotate(-45deg);
      ">
        <div style="transform: rotate(45deg);">${icon}</div>
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const serviceIcons = {
  hospital: createCustomIcon("#ef4444", "🏥"),
  police: createCustomIcon("#3b82f6", "🚔"),
  fire: createCustomIcon("#f59e0b", "🚒"),
  pharmacy: createCustomIcon("#10b981", "💊"),
  school: createCustomIcon("#8b5cf6", "🏫"),
  restaurant: createCustomIcon("#f97316", "🍽️"),
  shopping: createCustomIcon("#06b6d4", "🛒"),
  park: createCustomIcon("#22c55e", "🌳"),
  bank: createCustomIcon("#84cc16", "🏦"),
  gas: createCustomIcon("#eab308", "⛽"),
  wifi: createCustomIcon("#6366f1", "📶"),
  default: createCustomIcon("#6b7280", "📍"),
};

// Component to handle map center updates
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

const InteractiveMap = () => {
  const { language } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([24.7136, 46.6753]); // Riyadh coordinates
  const [mapZoom, setMapZoom] = useState(13);

  const isRTL = language === "ar";

  // Service categories
  const categories = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "health", label: language === "ar" ? "صحة" : "Health" },
    { value: "emergency", label: language === "ar" ? "طوارئ" : "Emergency" },
    { value: "education", label: language === "ar" ? "تعليم" : "Education" },
    { value: "shopping", label: language === "ar" ? "تسوق" : "Shopping" },
    { value: "food", label: language === "ar" ? "طعام" : "Food" },
    { value: "finance", label: language === "ar" ? "مالية" : "Finance" },
    { value: "recreation", label: language === "ar" ? "ترفيه" : "Recreation" },
  ];

  // Mock service data - in a real app, this would come from an API
  const mockServices = [
    // Health Services
    {
      id: 1,
      name: language === "ar" ? "مستشفى الملك فهد" : "King Fahd Hospital",
      nameAr: "مستشفى الملك فهد",
      nameEn: "King Fahd Hospital",
      type: "hospital",
      category: "health",
      position: [24.7136, 46.6753],
      address:
        language === "ar"
          ? "شارع الملك فهد، الرياض"
          : "King Fahd Street, Riyadh",
      phone: "+966-11-123-4567",
      hours: language === "ar" ? "24/7" : "24/7",
      description:
        language === "ar"
          ? "مستشفى عام متكامل"
          : "General hospital with full services",
      rating: 4.5,
    },
    {
      id: 2,
      name: language === "ar" ? "صيدلية النور" : "Al-Nour Pharmacy",
      nameAr: "صيدلية النور",
      nameEn: "Al-Nour Pharmacy",
      type: "pharmacy",
      category: "health",
      position: [24.7146, 46.6763],
      address:
        language === "ar" ? "شارع العليا، الرياض" : "Al-Olaya Street, Riyadh",
      phone: "+966-11-234-5678",
      hours: language === "ar" ? "8:00 - 22:00" : "8:00 AM - 10:00 PM",
      description: language === "ar" ? "صيدلية 24 ساعة" : "24-hour pharmacy",
      rating: 4.2,
    },
    // Emergency Services
    {
      id: 3,
      name:
        language === "ar" ? "مركز شرطة النخيل" : "Al-Nakheel Police Station",
      nameAr: "مركز شرطة النخيل",
      nameEn: "Al-Nakheel Police Station",
      type: "police",
      category: "emergency",
      position: [24.7126, 46.6743],
      address:
        language === "ar" ? "حي النخيل، الرياض" : "Al-Nakheel District, Riyadh",
      phone: "999",
      hours: language === "ar" ? "24/7" : "24/7",
      description:
        language === "ar" ? "مركز شرطة محلي" : "Local police station",
      rating: 4.8,
    },
    {
      id: 4,
      name: language === "ar" ? "محطة إطفاء الرياض" : "Riyadh Fire Station",
      nameAr: "محطة إطفاء الرياض",
      nameEn: "Riyadh Fire Station",
      type: "fire",
      category: "emergency",
      position: [24.7156, 46.6773],
      address:
        language === "ar"
          ? "شارع الملك عبدالعزيز، الرياض"
          : "King Abdulaziz Street, Riyadh",
      phone: "998",
      hours: language === "ar" ? "24/7" : "24/7",
      description:
        language === "ar" ? "محطة إطفاء وطوارئ" : "Fire and emergency station",
      rating: 4.9,
    },
    // Education
    {
      id: 5,
      name:
        language === "ar"
          ? "مدرسة النور الابتدائية"
          : "Al-Nour Elementary School",
      nameAr: "مدرسة النور الابتدائية",
      nameEn: "Al-Nour Elementary School",
      type: "school",
      category: "education",
      position: [24.7116, 46.6733],
      address:
        language === "ar" ? "حي النزهة، الرياض" : "Al-Nuzha District, Riyadh",
      phone: "+966-11-345-6789",
      hours: language === "ar" ? "7:00 - 14:00" : "7:00 AM - 2:00 PM",
      description:
        language === "ar"
          ? "مدرسة ابتدائية حكومية"
          : "Public elementary school",
      rating: 4.3,
    },
    // Shopping
    {
      id: 6,
      name: language === "ar" ? "مركز النخيل التجاري" : "Al-Nakheel Mall",
      nameAr: "مركز النخيل التجاري",
      nameEn: "Al-Nakheel Mall",
      type: "shopping",
      category: "shopping",
      position: [24.7166, 46.6783],
      address:
        language === "ar" ? "شارع التحلية، الرياض" : "Al-Tahlia Street, Riyadh",
      phone: "+966-11-456-7890",
      hours: language === "ar" ? "10:00 - 23:00" : "10:00 AM - 11:00 PM",
      description:
        language === "ar" ? "مركز تسوق كبير" : "Large shopping center",
      rating: 4.1,
    },
    // Food
    {
      id: 7,
      name: language === "ar" ? "مطعم الشام" : "Al-Sham Restaurant",
      nameAr: "مطعم الشام",
      nameEn: "Al-Sham Restaurant",
      type: "restaurant",
      category: "food",
      position: [24.7106, 46.6723],
      address:
        language === "ar" ? "شارع العليا، الرياض" : "Al-Olaya Street, Riyadh",
      phone: "+966-11-567-8901",
      hours: language === "ar" ? "12:00 - 24:00" : "12:00 PM - 12:00 AM",
      description:
        language === "ar" ? "مطعم شرقي أصيل" : "Authentic Eastern restaurant",
      rating: 4.6,
    },
    // Finance
    {
      id: 8,
      name: language === "ar" ? "بنك الراجحي" : "Al-Rajhi Bank",
      nameAr: "بنك الراجحي",
      nameEn: "Al-Rajhi Bank",
      type: "bank",
      category: "finance",
      position: [24.7176, 46.6793],
      address:
        language === "ar"
          ? "شارع الملك فهد، الرياض"
          : "King Fahd Street, Riyadh",
      phone: "+966-11-678-9012",
      hours: language === "ar" ? "8:00 - 16:00" : "8:00 AM - 4:00 PM",
      description:
        language === "ar" ? "فرع بنك الراجحي" : "Al-Rajhi Bank branch",
      rating: 4.4,
    },
    // Recreation
    {
      id: 9,
      name: language === "ar" ? "حديقة الملك عبدالله" : "King Abdullah Park",
      nameAr: "حديقة الملك عبدالله",
      nameEn: "King Abdullah Park",
      type: "park",
      category: "recreation",
      position: [24.7086, 46.6713],
      address:
        language === "ar" ? "حي النزهة، الرياض" : "Al-Nuzha District, Riyadh",
      phone: "+966-11-789-0123",
      hours: language === "ar" ? "6:00 - 22:00" : "6:00 AM - 10:00 PM",
      description: language === "ar" ? "حديقة عامة كبيرة" : "Large public park",
      rating: 4.7,
    },
  ];

  // Load services on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setMapCenter(service.position);
    setMapZoom(16);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedService(null);
    setMapCenter([24.7136, 46.6753]);
    setMapZoom(13);
  };

  const getServiceIcon = (type) => {
    return serviceIcons[type] || serviceIcons.default;
  };

  const getServiceTypeLabel = (type) => {
    const labels = {
      hospital: language === "ar" ? "مستشفى" : "Hospital",
      pharmacy: language === "ar" ? "صيدلية" : "Pharmacy",
      police: language === "ar" ? "شرطة" : "Police",
      fire: language === "ar" ? "إطفاء" : "Fire",
      school: language === "ar" ? "مدرسة" : "School",
      restaurant: language === "ar" ? "مطعم" : "Restaurant",
      shopping: language === "ar" ? "تسوق" : "Shopping",
      bank: language === "ar" ? "بنك" : "Bank",
      park: language === "ar" ? "حديقة" : "Park",
    };
    return labels[type] || (language === "ar" ? "خدمة" : "Service");
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar" ? "الخريطة التفاعلية" : "Interactive Map"}
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar"
              ? "اكتشف الخدمات والمرافق في مدينتك"
              : "Discover services and facilities in your city"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search and Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "البحث والتصفية" : "Search & Filter"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                      isRTL ? "right-3" : "left-3"
                    }`}
                  />
                  <Input
                    placeholder={
                      language === "ar"
                        ? "البحث عن الخدمات..."
                        : "Search services..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${
                      isRTL
                        ? "font-arabic text-right pr-10"
                        : "font-sans text-left pl-10"
                    }`}
                  />
                </div>

                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}>
                  <SelectTrigger
                    className={
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }>
                    <SelectValue
                      placeholder={language === "ar" ? "التصنيف" : "Category"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className={
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearSelection}
                  className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                </Button>
              </CardContent>
            </Card>

            {/* Services List */}
            <Card>
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "الخدمات" : "Services"} (
                  {filteredServices.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {language === "ar" ? "جاري التحميل..." : "Loading..."}
                      </p>
                    </div>
                  ) : filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedService?.id === service.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                        onClick={() => handleServiceSelect(service)}>
                        <div className="flex items-start gap-3">
                          <div className="text-lg">
                            {getServiceTypeLabel(service.type) === "مستشفى" ||
                            getServiceTypeLabel(service.type) === "Hospital"
                              ? "🏥"
                              : getServiceTypeLabel(service.type) ===
                                  "صيدلية" ||
                                getServiceTypeLabel(service.type) === "Pharmacy"
                              ? "💊"
                              : getServiceTypeLabel(service.type) === "شرطة" ||
                                getServiceTypeLabel(service.type) === "Police"
                              ? "🚔"
                              : getServiceTypeLabel(service.type) === "إطفاء" ||
                                getServiceTypeLabel(service.type) === "Fire"
                              ? "🚒"
                              : getServiceTypeLabel(service.type) === "مدرسة" ||
                                getServiceTypeLabel(service.type) === "School"
                              ? "🏫"
                              : getServiceTypeLabel(service.type) === "مطعم" ||
                                getServiceTypeLabel(service.type) ===
                                  "Restaurant"
                              ? "🍽️"
                              : getServiceTypeLabel(service.type) === "تسوق" ||
                                getServiceTypeLabel(service.type) === "Shopping"
                              ? "🛒"
                              : getServiceTypeLabel(service.type) === "بنك" ||
                                getServiceTypeLabel(service.type) === "Bank"
                              ? "🏦"
                              : getServiceTypeLabel(service.type) === "حديقة" ||
                                getServiceTypeLabel(service.type) === "Park"
                              ? "🌳"
                              : "📍"}
                          </div>
                          <div
                            className={`flex-1 ${
                              isRTL ? "text-right" : "text-left"
                            }`}>
                            <h4
                              className={`font-medium text-sm ${
                                isRTL ? "font-arabic" : "font-sans"
                              }`}>
                              {service.name}
                            </h4>
                            <p
                              className={`text-xs text-muted-foreground ${
                                isRTL ? "font-arabic" : "font-sans"
                              }`}>
                              {service.address}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {getServiceTypeLabel(service.type)}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <span className="text-xs">⭐</span>
                                <span className="text-xs">
                                  {service.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">
                        {language === "ar"
                          ? "لا توجد خدمات"
                          : "No services found"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: "100%", width: "100%" }}
                  className="z-0">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <MapController center={mapCenter} zoom={mapZoom} />

                  {filteredServices.map((service) => (
                    <Marker
                      key={service.id}
                      position={service.position}
                      icon={getServiceIcon(service.type)}>
                      <Popup>
                        <div
                          className={`p-2 ${
                            isRTL ? "text-right" : "text-left"
                          }`}>
                          <h3
                            className={`font-bold text-lg mb-2 ${
                              isRTL ? "font-arabic" : "font-sans"
                            }`}>
                            {service.name}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span
                                className={`text-sm ${
                                  isRTL ? "font-arabic" : "font-sans"
                                }`}>
                                {service.address}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{service.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span
                                className={`text-sm ${
                                  isRTL ? "font-arabic" : "font-sans"
                                }`}>
                                {service.hours}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {getServiceTypeLabel(service.type)}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">⭐</span>
                                <span className="text-sm">
                                  {service.rating}
                                </span>
                              </div>
                            </div>
                            <p
                              className={`text-sm text-muted-foreground ${
                                isRTL ? "font-arabic" : "font-sans"
                              }`}>
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
