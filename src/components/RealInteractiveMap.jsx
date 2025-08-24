import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Navigation, 
  Home, 
  Building, 
  TreePine, 
  Zap,
  Settings,
  Layers,
  Search,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const RealInteractiveMap = () => {
  const mapContainer = useRef(null);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    ar: {
      title: "الخريطة التفاعلية لمحافظة حريملاء",
      subtitle: "استكشف المبادرات والخدمات والمرافق في محافظة حريملاء",
      search: "ابحث عن موقع...",
      legend: "دليل الرموز",
      resetView: "إعادة تعيين العرض",
      layers: {
        all: "جميع المواقع",
        health: "المرافق الصحية", 
        environment: "المبادرات البيئية",
        education: "المؤسسات التعليمية",
        partners: "الجهات الشريكة"
      },
      locationTypes: {
        health: "صحي",
        environment: "بيئي", 
        education: "تعليمي",
        municipal: "بلدي",
        partner: "شريك"
      }
    }
  };

  const current = content.ar; // Default to Arabic
  const isRTL = true; // Default to RTL

  // Sample locations for Harimlaa
  const locations = [
    {
      id: 1,
      name: "مركز حريملاء الصحي",
      type: "health",
      coordinates: [46.1528, 25.0028],
      description: "المركز الصحي الرئيسي في المحافظة"
    },
    {
      id: 2, 
      name: "منتزه الأمير سلمان",
      type: "environment",
      coordinates: [46.1500, 25.0050],
      description: "منتزه مجتمعي مع مساحات خضراء"
    },
    {
      id: 3,
      name: "مدرسة حريملاء الثانوية",
      type: "education",
      coordinates: [46.1550, 25.0000],
      description: "مؤسسة تعليمية رائدة"
    },
    {
      id: 4,
      name: "بلدية حريملاء",
      type: "municipal",
      coordinates: [46.1530, 25.0030],
      description: "المقر الرئيسي للبلدية"
    },
    {
      id: 5,
      name: "مركز الدفاع المدني",
      type: "partner",
      coordinates: [46.1510, 25.0010],
      description: "مركز خدمات الطوارئ"
    }
  ];

  const getLocationIcon = (type) => {
    switch (type) {
      case 'health':
        return <Home className="h-4 w-4" />;
      case 'environment':
        return <TreePine className="h-4 w-4" />;
      case 'education':
        return <Building className="h-4 w-4" />;
      case 'municipal':
        return <Building className="h-4 w-4" />;
      case 'partner':
        return <Zap className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'health':
        return 'bg-red-500';
      case 'environment':
        return 'bg-green-500';
      case 'education':
        return 'bg-blue-500';
      case 'municipal':
        return 'bg-purple-500';
      case 'partner':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredLocations = locations.filter(location => {
    if (selectedLayer !== 'all' && location.type !== selectedLayer) return false;
    if (searchQuery && !location.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleResetView = () => {
    setSelectedLayer('all');
    setSearchQuery('');
  };

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
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">البحث</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={current.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

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
                    <Layers className="h-4 w-4 mr-2" />
                    {label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{current.legend}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(current.locationTypes).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${getLocationColor(key)} rounded-full flex items-center justify-center`}>
                      {getLocationIcon(key)}
                    </div>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={handleResetView}
              className="w-full"
            >
              <Settings className="h-4 w-4 mr-2" />
              {current.resetView}
            </Button>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-3">
            <Card className="h-96">
              <CardContent className="p-6 h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/30">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">خريطة تفاعلية</p>
                      <p className="text-sm text-muted-foreground">سيتم إضافة خريطة Mapbox هنا</p>
                    </div>
                  </div>

                  {/* Location Markers */}
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`absolute w-6 h-6 ${getLocationColor(location.type)} rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-125 transition-transform duration-200`}
                      style={{
                        left: `${((location.coordinates[0] - 46.15) / 0.01) * 100}%`,
                        top: `${((location.coordinates[1] - 25.00) / 0.01) * 100}%`
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
            المواقع المحددة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Badge variant="outline" className="text-xs">
                      {current.locationTypes[location.type]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
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

export default RealInteractiveMap;

