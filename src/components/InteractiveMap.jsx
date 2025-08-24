import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Heart, 
  Leaf, 
  Users, 
  AlertTriangle, 
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const InteractiveMap = () => {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [visibleLayers, setVisibleLayers] = useState({
    initiatives: true,
    reports: true,
    critical: true,
    airQuality: false
  });

  const content = {
    ar: {
      title: "الخريطة التفاعلية لحريملاء",
      subtitle: "استكشف المبادرات والبلاغات والنقاط المهمة في المدينة",
      layers: {
        all: "عرض الكل",
        initiatives: "المبادرات",
        reports: "البلاغات البيئية",
        critical: "النقاط الحرجة",
        airQuality: "جودة الهواء"
      },
      legend: "دليل الخريطة",
      toggleLayer: "إظهار/إخفاء الطبقة",
      locations: [
        {
          id: 1,
          name: "مبادرة المشي اليومي",
          type: "initiative",
          category: "health",
          lat: 25.0657,
          lng: 46.7120,
          description: "مسار المشي الرئيسي",
          status: "نشط"
        },
        {
          id: 2,
          name: "الحديقة المجتمعية",
          type: "initiative", 
          category: "environment",
          lat: 25.0680,
          lng: 46.7140,
          description: "مساحة خضراء مجتمعية",
          status: "مكتمل"
        },
        {
          id: 3,
          name: "بلاغ تلوث المياه",
          type: "report",
          category: "environment",
          lat: 25.0620,
          lng: 46.7100,
          description: "تسرب في الشبكة",
          status: "قيد المعالجة"
        },
        {
          id: 4,
          name: "نقطة تلوث هوائي",
          type: "critical",
          category: "environment",
          lat: 25.0700,
          lng: 46.7160,
          description: "منطقة تتطلب مراقبة",
          status: "تحت المراقبة"
        }
      ]
    }
  };

  const current = content.ar; // Default to Arabic
  const isRTL = true; // Default to RTL

  const getLocationIcon = (type) => {
    switch (type) {
      case 'initiative':
        return <Heart className="h-4 w-4" />;
      case 'report':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
        return <Zap className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'initiative':
        return 'bg-green-500';
      case 'report':
        return 'bg-blue-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "نشط": "bg-green-100 text-green-700",
      "مكتمل": "bg-blue-100 text-blue-700",
      "قيد المعالجة": "bg-yellow-100 text-yellow-700",
      "تحت المراقبة": "bg-orange-100 text-orange-700"
    };
    
    return (
      <Badge variant="outline" className={statusColors[status] || "bg-gray-100 text-gray-700"}>
        {status}
      </Badge>
    );
  };

  const toggleLayer = (layer) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const filteredLocations = current.locations.filter(location => {
    if (selectedLayer === 'all') return true;
    return location.type === selectedLayer;
  });

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Layer Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">اختيار الطبقات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(current.layers).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={selectedLayer === key ? "default" : "outline"}
                    onClick={() => setSelectedLayer(key)}
                    className="w-full justify-start"
                  >
                    {label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Layer Visibility */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{current.legend}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(visibleLayers).map(([layer, visible]) => (
                  <div key={layer} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{layer}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLayer(layer)}
                      className="h-8 w-8 p-0"
                    >
                      {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardContent className="p-6 h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/30">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">خريطة تفاعلية</p>
                      <p className="text-sm text-muted-foreground">سيتم إضافة الخريطة هنا</p>
                    </div>
                  </div>

                  {/* Location Markers */}
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`absolute w-6 h-6 ${getLocationColor(location.type)} rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-125 transition-transform duration-200`}
                      style={{
                        left: `${((location.lng - 46.70) / 0.02) * 100}%`,
                        top: `${((location.lat - 25.06) / 0.01) * 100}%`
                      }}
                      title={location.name}
                    >
                      {getLocationIcon(location.type)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Details */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            تفاصيل المواقع
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 ${getLocationColor(location.type)} rounded-full flex items-center justify-center`}>
                      {getLocationIcon(location.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {location.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {location.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {getStatusBadge(location.status)}
                    <span className="text-xs text-muted-foreground">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;

