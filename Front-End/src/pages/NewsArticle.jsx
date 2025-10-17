import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { newsApi } from "@/lib/newsApi";

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getNewsById(id);
        setNews(response.data);
      } catch (error) {
        // Error fetching news
        setError("Failed to load news article");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1
            className={`text-2xl font-bold mb-4 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "خطأ في التحميل" : "Loading Error"}
          </h1>
          <p
            className={`text-muted-foreground mb-4 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}>
            {error ||
              (language === "ar"
                ? "لم يتم العثور على الخبر"
                : "News article not found")}
          </p>
          <Button onClick={() => navigate("/news")}>
            {language === "ar" ? "العودة للأخبار" : "Back to News"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/news")}
            className={`${isRTL ? "font-arabic" : "font-sans"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {language === "ar" ? "العودة للأخبار" : "Back to News"}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 text-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {news.title}
          </h1>

          {/* Subtitle */}
          <h2
            className={`text-xl md:text-2xl text-muted-foreground mb-6 ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {news.subtitle}
          </h2>

          {/* Date */}
          <div
            className={`flex items-center gap-2 mb-8 text-sm text-muted-foreground ${
              isRTL ? "font-arabic justify-end" : "font-sans justify-start"
            }`}>
            <Calendar className="w-4 h-4" />
            <span>{formatDate(news.date)}</span>
          </div>

          {/* News Image */}
          {news.imageUrl && (
            <div className="mb-8">
              <img
                src={newsApi.getImageUrl(news.imageUrl)}
                alt={news.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Description in a Card */}
          <Card>
            <CardContent className="p-8">
              <div
                className={`prose prose-lg max-w-none ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {news.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
