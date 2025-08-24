import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Navigation, 
  Heart, 
  Building, 
  GraduationCap, 
  Droplets, 
  Car, 
  Shield,
  Leaf,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const InteractiveMapSimple = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(100);
  const [visibleCategories, setVisibleCategories] = useState([
    "حكومي", "محلي", "تعليمي", "خدمي", "أمني"
  ]);

  const content = {
    ar: {
      title: "خريطة محافظة حريملاء التفاعلية",
      subtitle: "استكشف مواقع الشركاء والمرافق الصحية في المحافظة",
      zoomIn: "تكبير",
      zoomOut: "تصغير", 
      reset: "إعادة تعيين",
      showDetails: "عرض التفاصيل",
      hideDetails: "إخفاء التفاصيل",
      filterTitle: "تصفية حسب النوع",
      categories: {
        "حكومي": "الجهات الحكومية",
        "محلي": "الجهات المحلية",
        "تعليمي": "المؤسسات التعليمية",
        "خدمي": "الخدمات العامة",
        "أمني": "الأجهزة الأمنية"
      },
      locations: [
        {
          name: "وزارة الصحة",
          type: "حكومي",
          description: "الجهة المشرفة على برنامج المدن الصحية",
          icon: Heart,
          position: { top: "20%", left: "30%" }
        },
        {
          name: "بلدية حريملاء", 
          type: "محلي",
          description: "الشريك المحلي في تنفيذ المبادرات",
          icon: Building,
          position: { top: "45%", left: "50%" }
        },
        {
          name: "إدارة التعليم",
          type: "تعليمي", 
          description: "تطوير البرامج التعليمية والتوعوية",
          icon: GraduationCap,
          position: { top: "35%", left: "70%" }
        },
        {
          name: "شركة المياه الوطنية",
          type: "خدمي",
          description: "ضمان جودة المياه وسلامة الشبكات", 
          icon: Droplets,
          position: { top: "60%", left: "25%" }
        },
        {
          name: "إدارة المرور",
          type: "أمني",
          description: "تحسين السلامة المرورية والنقل المستدام",
          icon: Car,
          position: { top: "65%", left: "65%" }
        },
        {
          name: "الدفاع المدني", 
          type: "أمني",
          description: "ضمان السلامة العامة وإدارة المخاطر",
          icon: Shield,
          position: { top: "25%", left: "75%" }
        }
      ]
    }
  };

  const current = content.ar; // Default to Arabic

  const getTypeColor = (type) => {
    const colors = {
      "حكومي": "bg-blue-500",
      "محلي": "bg-green-500",
      "تعليمي": "bg-purple-500",
      "خدمي": "bg-orange-500",
      "أمني": "bg-red-500"
    };
    return colors[type] || "bg-gray-500";
  };

  const toggleCategory = (category) => {
    setVisibleCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 20, 50));
  };

  const handleReset = () => {
    setMapZoom(100);
    setSelectedLocation(null);
  };

  const filteredLocations = current.locations.filter(location => 
    visibleCategories.includes(location.type)
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Zoom Controls */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">أدوات الخريطة</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    className="w-full justify-start"
                  >
                    <ZoomIn className="h-4 w-4 mr-2" />
                    {current.zoomIn}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    className="w-full justify-start"
                  >
                    <ZoomOut className="h-4 w-4 mr-2" />
                    {current.zoomOut}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="w-full justify-start"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {current.reset}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Filters */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">{current.filterTitle}</h3>
                <div className="space-y-2">
                  {Object.entries(current.categories).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={visibleCategories.includes(key) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(key)}
                      className="w-full justify-start"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-3">
            <Card className="h-96">
              <CardContent className="p-6 h-full">
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/30 overflow-hidden"
                  style={{ transform: `scale(${mapZoom / 100})` }}
                >
                  {/* Map Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center opacity-20">
                      <MapPin className="h-32 w-32 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">خريطة حريملاء</p>
                    </div>
                  </div>

                  {/* Location Markers */}
                  {filteredLocations.map((location, index) => {
                    const IconComponent = location.icon;
                    return (
                      <div
                        key={index}
                        className={`absolute w-8 h-8 ${getTypeColor(location.type)} rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-125 transition-all duration-200 ${
                          selectedLocation === index ? 'ring-4 ring-primary ring-offset-2' : ''
                        }`}
                        style={{
                          top: location.position.top,
                          left: location.position.left
                        }}
                        onClick={() => setSelectedLocation(selectedLocation === index ? null : index)}
                        title={location.name}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation !== null && (
          <div className="mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${getTypeColor(filteredLocations[selectedLocation].type)} rounded-full flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = filteredLocations[selectedLocation].icon;
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {filteredLocations[selectedLocation].name}
                    </h3>
                    <Badge variant="outline" className="mt-1">
                      {current.categories[filteredLocations[selectedLocation].type]}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {filteredLocations[selectedLocation].description}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSelectedLocation(null)}
                >
                  {current.hideDetails}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveMapSimple;

