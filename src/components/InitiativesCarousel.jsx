import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Leaf, Users, GraduationCap, Car, Building, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Import initiative images
import walkingImage from "@/assets/walking-initiative.jpg";
import gardenImage from "@/assets/green-garden.jpg";
import workshopImage from "@/assets/health-workshop.jpg";
import transportImage from "@/assets/sustainable-transport.jpg";

const InitiativesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const content = {
    ar: {
      title: "المبادرات المجتمعية",
      subtitle: "مبادرات متنوعة لبناء مجتمع صحي ومستدام",
      viewAll: "عرض جميع المبادرات",
      previous: "السابق",
      next: "التالي",
      autoPlay: "تشغيل تلقائي",
      pause: "إيقاف مؤقت",
      categories: {
        health: "صحية",
        environment: "بيئية", 
        social: "اجتماعية",
        education: "تعليمية",
        transport: "نقل",
        infrastructure: "بنية تحتية"
      },
      initiatives: [
        {
          title: "مبادرة المشي اليومي",
          description: "برنامج يومي لتشجيع المواطنين على المشي في مسارات آمنة ومخصصة لتحسين الصحة العامة",
          category: "health",
          participants: "250+ مشارك",
          status: "نشطة",
          image: walkingImage,
          impact: "تحسن في اللياقة البدنية بنسبة 85%"
        },
        {
          title: "حديقة المجتمع الخضراء",
          description: "إنشاء مساحات خضراء مجتمعية لتعزيز البيئة المحلية وتحسين جودة الهواء",
          category: "environment",
          participants: "15 متطوع",
          status: "قيد التنفيذ",
          image: gardenImage,
          impact: "زراعة 500 شجرة و1000 زهرة"
        },
        {
          title: "ورش التوعية الصحية",
          description: "برامج تعليمية شاملة لنشر الوعي الصحي في المجتمع وتقديم النصائح الطبية",
          category: "education",
          participants: "500+ مستفيد",
          status: "نشطة",
          image: workshopImage,
          impact: "12 ورشة عمل شهرياً"
        },
        {
          title: "مبادرة النقل المستدام",
          description: "تشجيع استخدام وسائل النقل الصديقة للبيئة والدراجات الهوائية لتقليل التلوث",
          category: "transport",
          participants: "100+ مشارك",
          status: "جديدة",
          image: transportImage,
          impact: "تقليل الانبعاثات بنسبة 30%"
        }
      ]
    },
    en: {
      title: "Community Initiatives",
      subtitle: "Diverse initiatives to build a healthy and sustainable community",
      viewAll: "View All Initiatives",
      previous: "Previous",
      next: "Next",
      autoPlay: "Auto Play",
      pause: "Pause",
      categories: {
        health: "Health",
        environment: "Environment",
        social: "Social", 
        education: "Education",
        transport: "Transport",
        infrastructure: "Infrastructure"
      },
      initiatives: [
        {
          title: "Daily Walking Initiative",
          description: "Daily program to encourage citizens to walk on safe and dedicated paths to improve public health",
          category: "health",
          participants: "250+ participants",
          status: "Active",
          image: walkingImage,
          impact: "85% improvement in physical fitness"
        },
        {
          title: "Community Green Garden",
          description: "Creating community green spaces to enhance the local environment and improve air quality",
          category: "environment", 
          participants: "15 volunteers",
          status: "In Progress",
          image: gardenImage,
          impact: "500 trees and 1000 flowers planted"
        },
        {
          title: "Health Awareness Workshops",
          description: "Comprehensive educational programs to spread health awareness in the community and provide medical advice",
          category: "education",
          participants: "500+ beneficiaries",
          status: "Active",
          image: workshopImage,
          impact: "12 workshops monthly"
        },
        {
          title: "Sustainable Transport Initiative",
          description: "Encouraging the use of environmentally friendly transportation and bicycles to reduce pollution",
          category: "transport",
          participants: "100+ participants",
          status: "New",
          image: transportImage,
          impact: "30% reduction in emissions"
        }
      ]
    }
  };

  const current = content.ar; // Default to Arabic
  const isRTL = true; // Default to RTL

  const categoryIcons = {
    health: Heart,
    environment: Leaf,
    social: Users,
    education: GraduationCap,
    transport: Car,
    infrastructure: Building
  };

  const categoryColors = {
    health: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300",
    environment: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300",
    social: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
    education: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300",
    transport: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300",
    infrastructure: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
  };

  const statusColors = {
    "نشطة": "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    "قيد التنفيذ": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
    "جديدة": "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    "Active": "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    "In Progress": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
    "New": "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % current.initiatives.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, current.initiatives.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % current.initiatives.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + current.initiatives.length) % current.initiatives.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/50 via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {current.subtitle}
          </p>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="h-10 w-10 p-0"
            >
              {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-2"
            >
              {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm">
                {isAutoPlay ? current.pause : current.autoPlay}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="h-10 w-10 p-0"
            >
              {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${isRTL ? currentSlide * 100 : -currentSlide * 100}%)` }}
            >
              {current.initiatives.map((initiative, index) => {
                const categoryKey = initiative.category;
                const IconComponent = categoryIcons[categoryKey];
                
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="bg-card border border-border shadow-lg overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 h-96">
                        {/* Image */}
                        <div className="relative overflow-hidden">
                          <img 
                            src={initiative.image} 
                            alt={initiative.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className={categoryColors[categoryKey]}>
                              <IconComponent className="h-3 w-3 mr-1" />
                              {current.categories[categoryKey]}
                            </Badge>
                            <Badge variant="secondary" className={`${statusColors[initiative.status]} bg-white/90`}>
                              {initiative.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-8 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-foreground mb-4">
                            {initiative.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {initiative.description}
                          </p>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">
                                المشاركون:
                              </span>
                              <span className="text-sm font-bold text-primary">
                                {initiative.participants}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">
                                التأثير:
                              </span>
                              <span className="text-sm font-bold text-secondary">
                                {initiative.impact}
                              </span>
                            </div>
                          </div>
                          
                          <Button className="w-full">
                            تفاصيل أكثر
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {current.initiatives.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" className="px-8 py-6">
            {current.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InitiativesCarousel;

