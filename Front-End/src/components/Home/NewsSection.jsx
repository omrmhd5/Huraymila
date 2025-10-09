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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Star,
  Pin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { newsApi } from "@/lib/newsApi";
import { formatDate } from "@/utils/dateUtils";

const NewsSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch prioritized news
  useEffect(() => {
    const fetchPrioritizedNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getPrioritizedNews(5);
        setNews(response.data || []);
      } catch (error) {
        console.error("Error fetching prioritized news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrioritizedNews();
  }, []);

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying || news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, news.length]);

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

  const isRTL = language === "ar";

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-4">
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
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no news
  if (news.length === 0) {
    return (
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-4">
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
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {language === "ar"
                ? "لا توجد أخبار متاحة حالياً"
                : "No news available at the moment"}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
                          src={
                            newsItem.imageUrl
                              ? newsApi.getImageUrl(newsItem.imageUrl)
                              : "/assets/placeholder.svg"
                          }
                          alt={newsItem.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {newsItem.priority && (
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-md">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-bold">
                                {newsItem.priority}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-4 text-sm mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(newsItem.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-card">
                        <h3
                          className={cn(
                            "text-2xl lg:text-3xl font-bold text-foreground mb-4",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {newsItem.title}
                        </h3>

                        <p
                          className={cn(
                            "text-muted-foreground leading-relaxed mb-6 text-lg",
                            isRTL ? "font-arabic" : "font-english"
                          )}>
                          {newsItem.subtitle}
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
