import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import {
  MapPin,
  Users,
  Calendar,
  Award,
  Leaf,
  Building2,
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Mountain,
  Sun,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const AboutHuraymila = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images - you can replace these with actual images later
  const slideshowImages = [
    {
      name: "حافة العالم حريملاء",
      src: "/assets/slideshow/1.jpg",
      alt: "حافة العالم حريملاء",
      title: "حافة العالم حريملاء",
      description: "إطلالة ساحرة من أعلى منحدرات حافة العالم في حريملاء.",
    },
    {
      name: "مطل الجرف العظيم حريملاء",
      src: "/assets/slideshow/2.jpg",
      alt: "مطل الجرف العظيم حريملاء",
      title: "مطل الجرف العظيم حريملاء",
      description: "موقع مرتفع يكشف مشهداً بانورامياً للصحراء الواسعة.",
    },
    {
      name: "حافة العالم - قمة حريملاء",
      src: "/assets/slideshow/3.jpg",
      alt: "حافة العالم - قمة حريملاء",
      title: "حافة العالم - قمة حريملاء",
      description: "قمة صخرية مذهلة تجذب عشاق المغامرات والتصوير.",
    },
    {
      name: "مطل نهاية العالم حريملاء",
      src: "/assets/slideshow/4.jpg",
      alt: "مطل نهاية العالم حريملاء",
      title: "مطل نهاية العالم حريملاء",
      description: "مطل مرتفع يطل على الصحراء في مشهد يشبه نهاية العالم.",
    },
    {
      name: "طريق الصعود إلى حافة العالم حريملاء",
      src: "/assets/slideshow/5.jpg",
      alt: "طريق الصعود إلى حافة العالم حريملاء",
      title: "طريق الصعود إلى حافة العالم حريملاء",
      description: "مسار ترابي يقود الزوار نحو القمم العالية.",
    },
    {
      name: "المطل الشمالي في حافة العالم حريملاء",
      src: "/assets/slideshow/6.jpg",
      alt: "المطل الشمالي في حافة العالم حريملاء",
      title: "المطل الشمالي في حافة العالم حريملاء",
      description: "زاوية مختلفة تكشف عمق الجبال وتفاصيل الطبيعة.",
    },
    {
      name: "هايكنج مطل حافة العالم حريملاء",
      src: "/assets/slideshow/7.jpg",
      alt: "هايكنج مطل حافة العالم حريملاء",
      title: "هايكنج مطل حافة العالم حريملاء",
      description: "رحلة مشي ممتعة لعشاق الرياضة في أجواء جبلية.",
    },
    {
      name: "تسلق جبال حافة العالم حريملاء",
      src: "/assets/slideshow/8.jpg",
      alt: "تسلق جبال حافة العالم حريملاء",
      title: "تسلق جبال حافة العالم حريملاء",
      description: "تجربة فريدة لعشاق التحدي وتسلق الصخور.",
    },
    {
      name: "التخييم قرب حافة نهاية العالم حريملاء",
      src: "/assets/slideshow/9.jpg",
      alt: "التخييم قرب حافة نهاية العالم حريملاء",
      title: "التخييم قرب حافة نهاية العالم حريملاء",
      description: "خيام تحت سماء صافية بجوار الجرف العظيم.",
    },
    {
      name: "غروب الشمس من حافة العالم حريملاء",
      src: "/assets/slideshow/10.jpg",
      alt: "غروب الشمس من حافة العالم حريملاء",
      title: "غروب الشمس من حافة العالم حريملاء",
      description: "ألوان غروب خلابة تزين أفق الصحراء.",
    },
    {
      name: "المطل الغربي حافة نهاية العالم حريملاء",
      src: "/assets/slideshow/11.jpg",
      alt: "المطل الغربي حافة نهاية العالم حريملاء",
      title: "المطل الغربي حافة نهاية العالم حريملاء",
      description: "إطلالة على الجهة الغربية بأجواء هادئة.",
    },
    {
      name: "رحلات المغامرة في حافة العالم حريملاء",
      src: "/assets/slideshow/12.jpg",
      alt: "رحلات المغامرة في حافة العالم حريملاء",
      title: "رحلات المغامرة في حافة العالم حريملاء",
      description: "جولات جماعية لعشاق الاكتشاف والمغامرة.",
    },
    {
      name: "جولات استكشافية في حافة العالم حريملاء",
      src: "/assets/slideshow/13.jpg",
      alt: "جولات استكشافية في حافة العالم حريملاء",
      title: "جولات استكشافية في حافة العالم حريملاء",
      description: "أنشطة سياحية لاستكشاف الطبيعة والمطل.",
    },
    {
      name: "المطل الجنوبي حافة العالم حريملاء",
      src: "/assets/slideshow/14.jpg",
      alt: "المطل الجنوبي حافة العالم حريملاء",
      title: "المطل الجنوبي حافة العالم حريملاء",
      description: "زاوية أخرى تكشف عن امتداد الصخور والوديان.",
    },
    {
      name: "مطل السماء في حافة العالم حريملاء",
      src: "/assets/slideshow/15.jpg",
      alt: "مطل السماء في حافة العالم حريملاء",
      title: "مطل السماء في حافة العالم حريملاء",
      description: "موقع مرتفع يمنحك شعوراً وكأنك تلمس السماء.",
    },
  ];

  const content = {
    ar: {
      title: "عن محافظة حريملاء",
      subtitle: "جوهرة منطقة الرياض",
      description:
        "تقع محافظة حريملاء في منطقة الرياض شمال غرب مدينة الرياض على بعد 86 كيلومتراً. تتميز بموقعها الاستراتيجي وتراثها العريق وتشتهر بالزراعة والمواقع التاريخية.",

      history: {
        title: "التاريخ والتراث",
        description:
          "تتمتع حريملاء بتاريخ عريق يعود إلى قرون عديدة، حيث كانت محطة مهمة على طرق التجارة القديمة. تشتهر بتراثها المعماري التقليدي والمواقع الأثرية التي تعكس عراقة المنطقة.",
      },

      geography: {
        title: "الموقع الجغرافي",
        description:
          "تقع حريملاء في منطقة الرياض على ارتفاع 650 متر فوق مستوى سطح البحر، وتتميز بمناخها المعتدل وطبيعتها الخلابة التي تجمع بين الجبال والسهول الخضراء.",
      },

      economy: {
        title: "الاقتصاد والتنمية",
        description:
          "تعتمد حريملاء على الزراعة كركيزة أساسية للاقتصاد المحلي، بالإضافة إلى السياحة التراثية والتنمية الصناعية الحديثة التي تساهم في دفع عجلة التطوير.",
      },

      culture: {
        title: "الثقافة والمجتمع",
        description:
          "يتميز مجتمع حريملاء بالترابط الاجتماعي القوي والحفاظ على العادات والتقاليد الأصيلة، مع الانفتاح على التطورات الحديثة في مختلف المجالات.",
      },

      features: [
        {
          icon: Mountain,
          title: "الطبيعة الخلابة",
          description: "جبال وسهول تتميز بجمالها الطبيعي",
        },
        {
          icon: Sun,
          title: "المناخ المعتدل",
          description: "مناخ صحراوي معتدل على مدار السنة",
        },
        {
          icon: Leaf,
          title: "الزراعة المزدهرة",
          description: "أراضي زراعية خصبة ومنتجة",
        },
        {
          icon: Building2,
          title: "التطوير المستمر",
          description: "مشاريع تنموية حديثة ومستدامة",
        },
      ],

      stats: [
        { label: "عدد السكان (2022)", value: "21,758 نسمة", icon: Users },
        { label: "سنة التأسيس", value: "1400 هـ", icon: Calendar },
        { label: "الارتفاع", value: "650 م", icon: Mountain },
        { label: "المساحة", value: "1,480 كم²", icon: Globe },
        { label: "الكثافة السكانية", value: "15 نسمة/كم²", icon: Users },
        { label: "السعوديون", value: "12,724 (58.48%)", icon: Heart },
        { label: "غير السعوديين", value: "9,034 (41.52%)", icon: Globe },
        { label: "عدد الأسر (2010)", value: "3,617 أسرة", icon: Building2 },
        { label: "خطة ترقيم الهواتف", value: "011", icon: Phone },
        { label: "الإحداثيات", value: "25°07′01″N 46°06′01″E", icon: MapPin },
      ],

      cta: "اكتشف المزيد",
      backButton: "العودة للصفحة الرئيسية",
    },
    en: {
      title: "About Huraymila Governorate",
      subtitle: "The Jewel of Riyadh Region",
      description:
        "Huraymila Governorate is located in Riyadh region, 86 km northwest of Riyadh city. It is distinguished by its strategic location, rich heritage, and is known for agriculture and historical sites.",

      history: {
        title: "History & Heritage",
        description:
          "Huraymila boasts a rich history spanning centuries, having been an important stop on ancient trade routes. It is renowned for its traditional architectural heritage and archaeological sites that reflect the region's antiquity.",
      },

      geography: {
        title: "Geographic Location",
        description:
          "Located in Riyadh region at an elevation of 650 meters above sea level, Huraymila is characterized by its moderate climate and picturesque nature that combines mountains and green plains.",
      },

      economy: {
        title: "Economy & Development",
        description:
          "Huraymila relies on agriculture as a fundamental pillar of the local economy, in addition to heritage tourism and modern industrial development that contribute to driving development forward.",
      },

      culture: {
        title: "Culture & Society",
        description:
          "Huraymila's community is distinguished by strong social cohesion and preservation of authentic customs and traditions, while being open to modern developments in various fields.",
      },

      features: [
        {
          icon: Mountain,
          title: "Scenic Nature",
          description:
            "Mountains and plains distinguished by their natural beauty",
        },
        {
          icon: Sun,
          title: "Moderate Climate",
          description: "Moderate desert climate throughout the year",
        },
        {
          icon: Leaf,
          title: "Thriving Agriculture",
          description: "Fertile and productive agricultural lands",
        },
        {
          icon: Building2,
          title: "Continuous Development",
          description: "Modern and sustainable development projects",
        },
      ],

      stats: [
        { label: "Population (2022)", value: "21,758 residents", icon: Users },
        { label: "Founded", value: "1980", icon: Calendar },
        { label: "Elevation", value: "650 m", icon: Mountain },
        { label: "Area", value: "1,480 km²", icon: Globe },
        { label: "Population Density", value: "15 residents/km²", icon: Users },
        { label: "Saudis", value: "12,724 (58.48%)", icon: Heart },
        { label: "Non-Saudis", value: "9,034 (41.52%)", icon: Globe },
        {
          label: "Households (2010)",
          value: "3,617 households",
          icon: Building2,
        },
        { label: "Dialing Code", value: "011", icon: Phone },
        { label: "Coordinates", value: "25°07′01″N 46°06′01″E", icon: MapPin },
      ],

      cta: "Discover More",
      backButton: "Back to Home",
    },
  };

  const current = content[language];
  const isRTL = language === "ar";

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection animation="fadeIn" delay={0}>
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <AnimatedSection animation="fadeInDown" delay={200}>
                <h1
                  className={cn(
                    "text-4xl md:text-6xl font-bold mb-4",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.title}
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={400}>
                <p
                  className={cn(
                    "text-xl md:text-2xl opacity-90",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.subtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <AnimatedSection animation="fadeInLeft" delay={200}>
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className={cn(
                "flex items-center gap-2",
                isRTL ? "font-arabic" : "font-english"
              )}>
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              {current.backButton}
            </Button>
          </div>
        </AnimatedSection>

        {/* Slideshow */}
        <AnimatedSection animation="fadeInUp" delay={400}>
          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="relative h-96 md:h-[500px]">
                <div className="relative h-full">
                  <img
                    src={slideshowImages[currentSlide].src}
                    alt={slideshowImages[currentSlide].alt}
                    className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <AnimatedSection animation="fadeInUp" delay={600}>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3
                        className={cn(
                          "text-2xl font-bold mb-2",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {slideshowImages[currentSlide].title}
                      </h3>
                      <p
                        className={cn(
                          "text-lg opacity-90",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {slideshowImages[currentSlide].description}
                      </p>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300 hover:scale-110">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300 hover:scale-110">
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection animation="fadeInUp" delay={600}>
          <div className="mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <p
                  className={cn(
                    "text-lg text-foreground/80 leading-relaxed text-center max-w-4xl mx-auto",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Information Sections */}
        <AnimatedSection animation="fadeInUp" delay={800}>
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            staggerDelay={150}
            animation="fadeInUp">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {current.history.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.history.description}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {current.geography.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.geography.description}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {current.economy.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.economy.description}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-500" />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {current.culture.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-foreground/80 leading-relaxed",
                    isRTL ? "font-arabic" : "font-english"
                  )}>
                  {current.culture.description}
                </p>
              </CardContent>
            </Card>
          </StaggeredContainer>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection animation="fadeInUp" delay={1000}>
          <div className="mb-16">
            <AnimatedSection animation="fadeInDown" delay={1200}>
              <h2
                className={cn(
                  "text-3xl font-bold text-center mb-12",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {isRTL ? "المميزات الرئيسية" : "Key Features"}
              </h2>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={100}
              animation="scaleIn">
              {current.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-2",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </AnimatedSection>

        {/* Statistics */}
        <AnimatedSection animation="fadeInUp" delay={1200}>
          <div className="mb-16">
            <AnimatedSection animation="fadeInDown" delay={1400}>
              <h2
                className={cn(
                  "text-3xl font-bold text-center mb-12",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {isRTL ? "الإحصائيات" : "Statistics"}
              </h2>
            </AnimatedSection>
            <StaggeredContainer
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
              staggerDelay={80}
              animation="fadeInUp">
              {current.stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggeredContainer>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutHuraymila;
