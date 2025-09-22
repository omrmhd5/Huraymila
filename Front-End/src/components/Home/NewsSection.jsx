import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NewsSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const news = [
    {
      id: 1,
      title: "إطلاق برنامج التوعية الصحية الشامل",
      titleEn: "Launch of Comprehensive Health Awareness Program",
      excerpt:
        "تم إطلاق برنامج شامل للتوعية الصحية يستهدف جميع فئات المجتمع في مدينة حريملاء...",
      excerptEn:
        "A comprehensive health awareness program targeting all community segments in Huraymila city has been launched...",
      content:
        "يهدف البرنامج إلى تعزيز الوعي الصحي وتشجيع الممارسات الصحية السليمة بين المواطنين. يتضمن البرنامج ورش عمل تعليمية وحملات توعوية في المدارس والمراكز التجارية والأماكن العامة.",
      contentEn:
        "The program aims to promote health awareness and encourage healthy practices among citizens. It includes educational workshops and awareness campaigns in schools, shopping centers, and public places.",
      category: "health",
      author: "د. أحمد محمد",
      authorEn: "Dr. Ahmed Mohammed",
      publishDate: "2024-01-15",
      readTime: "5 دقائق",
      readTimeEn: "5 min read",
      views: 1250,
      image: "/assets/health-workshop.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "مشروع التشجير الحضري يحقق نتائج مذهلة",
      titleEn: "Urban Afforestation Project Achieves Amazing Results",
      excerpt:
        "حقق مشروع التشجير الحضري في مدينة حريملاء نتائج مذهلة خلال الأشهر الماضية...",
      excerptEn:
        "The urban afforestation project in Huraymila city has achieved amazing results over the past months...",
      content:
        "تم زراعة أكثر من 1000 شجرة في مختلف أحياء المدينة، مما أدى إلى تحسين جودة الهواء وزيادة المساحات الخضراء. المشروع يهدف إلى تحقيق الاستدامة البيئية وتحسين جودة الحياة.",
      contentEn:
        "More than 1000 trees have been planted in various city neighborhoods, leading to improved air quality and increased green spaces. The project aims to achieve environmental sustainability and improve quality of life.",
      category: "environment",
      author: "م. سارة العتيبي",
      authorEn: "Eng. Sara Al-Otaibi",
      publishDate: "2024-01-12",
      readTime: "4 دقائق",
      readTimeEn: "4 min read",
      views: 890,
      image: "/assets/green-garden.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "مبادرة المشي الصحي تجذب 500 مشارك",
      titleEn: "Healthy Walking Initiative Attracts 500 Participants",
      excerpt:
        "نجحت مبادرة المشي الصحي في جذب أكثر من 500 مشارك من مختلف الأعمار...",
      excerptEn:
        "The healthy walking initiative has successfully attracted more than 500 participants from different age groups...",
      content:
        "تستهدف المبادرة تشجيع المواطنين على ممارسة المشي كرياضة يومية لتعزيز الصحة البدنية. تم إنشاء مسارات آمنة ومخصصة للمشي في مختلف أحياء المدينة.",
      contentEn:
        "The initiative aims to encourage citizens to practice walking as a daily exercise to promote physical health. Safe and dedicated walking paths have been created in various city neighborhoods.",
      category: "health",
      author: "أ. خالد الشمري",
      authorEn: "Mr. Khalid Al-Shamri",
      publishDate: "2024-01-10",
      readTime: "3 دقائق",
      readTimeEn: "3 min read",
      views: 1100,
      image: "/assets/walking-initiative.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "افتتاح مركز التثقيف الصحي للأطفال",
      titleEn: "Opening of Children's Health Education Center",
      excerpt:
        "تم افتتاح مركز التثقيف الصحي للأطفال في مدينة حريملاء بهدف تعزيز الثقافة الصحية...",
      excerptEn:
        "A children's health education center has been opened in Huraymila city to promote health culture...",
      content:
        "يقدم المركز برامج تعليمية تفاعلية للأطفال تهدف إلى تعزيز الثقافة الصحية والوعي بأهمية التغذية السليمة والنظافة الشخصية. المركز مجهز بأحدث التقنيات التعليمية.",
      contentEn:
        "The center provides interactive educational programs for children aimed at promoting health culture and awareness of the importance of proper nutrition and personal hygiene. The center is equipped with the latest educational technologies.",
      category: "education",
      author: "د. فاطمة الزهراني",
      authorEn: "Dr. Fatima Al-Zahrani",
      publishDate: "2024-01-08",
      readTime: "6 دقائق",
      readTimeEn: "6 min read",
      views: 750,
      image: "/assets/health-workshop.jpg",
      featured: false,
    },
  ];

  const isRTL = language === "ar";

  const getCategoryBadge = (category) => {
    const categoryLabels = {
      health: {
        ar: t("newsSection.categories.health"),
        en: t("newsSection.categories.health"),
        color: "bg-red-500",
      },
      environment: {
        ar: t("newsSection.categories.environment"),
        en: t("newsSection.categories.environment"),
        color: "bg-green-500",
      },
      community: {
        ar: t("newsSection.categories.community"),
        en: t("newsSection.categories.community"),
        color: "bg-blue-500",
      },
      education: {
        ar: t("newsSection.categories.education"),
        en: t("newsSection.categories.education"),
        color: "bg-purple-500",
      },
    };

    const categoryInfo = categoryLabels[category];
    return (
      <Badge variant="default" className={categoryInfo.color}>
        {language === "ar" ? categoryInfo.ar : categoryInfo.en}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <section className="py-20 bg-secondary/15">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {t("newsSection.title")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("newsSection.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("newsSection.subtitle")}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
            {t("newsSection.description")}
          </p>
        </div>

        {/* News Slideshow */}
        <div className="relative max-w-6xl mx-auto">
          {/* Slideshow Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${
                  isRTL ? currentSlide * 100 : -currentSlide * 100
                }%)`,
              }}>
              {news.map((newsItem, index) => (
                <div
                  key={newsItem.id}
                  className="w-full flex-shrink-0 min-w-full">
                  <Card className="overflow-hidden border-0 shadow-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative h-64 lg:h-96">
                        <img
                          src={newsItem.image}
                          alt={
                            language === "ar"
                              ? newsItem.title
                              : newsItem.titleEn
                          }
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 right-4">
                          {getCategoryBadge(newsItem.category)}
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-4 text-sm mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(newsItem.publishDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {language === "ar"
                                  ? newsItem.readTime
                                  : newsItem.readTimeEn}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-card">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>
                              {language === "ar"
                                ? newsItem.author
                                : newsItem.authorEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            <span>
                              {newsItem.views} {t("newsSection.views")}
                            </span>
                          </div>
                        </div>

                        <h3
                          className={cn(
                            "text-2xl lg:text-3xl font-bold text-foreground mb-4",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {language === "ar"
                            ? newsItem.title
                            : newsItem.titleEn}
                        </h3>

                        <p
                          className={cn(
                            "text-muted-foreground leading-relaxed mb-6 text-lg",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {language === "ar"
                            ? newsItem.excerpt
                            : newsItem.excerptEn}
                        </p>

                        <Button
                          size="lg"
                          className="w-fit"
                          onClick={() => navigateToTop(`/news/${newsItem.id}`)}>
                          {t("newsSection.readMore")}
                          <ArrowRight
                            className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div
            className={`flex items-center justify-between mt-8 ${
              isRTL ? "flex-row-reverse" : ""
            }`}>
            {/* Previous Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={prevSlide}
              className={`flex items-center gap-2 px-6 py-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}>
              <ChevronLeft className="w-5 h-5" />
              {t("newsSection.previous")}
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={togglePlayPause}
              className={`flex items-center gap-2 px-6 py-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}>
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  {t("newsSection.pause")}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t("newsSection.play")}
                </>
              )}
            </Button>

            {/* Next Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={nextSlide}
              className={`flex items-center gap-2 px-6 py-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}>
              {t("newsSection.next")}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {news.length}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
            onClick={() => navigateToTop("/news")}>
            {t("newsSection.viewAll")}
            <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
