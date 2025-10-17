import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import AnimatedCard from "@/components/animations/AnimatedCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { newsApi } from "@/lib/newsApi";

const AllNews = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getAllNews({ limit: 100 });
        setNewsData(response.data || []);
      } catch (error) {
        // Error fetching news
        setError("Failed to load news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const sortOptions = [
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "oldest", label: language === "ar" ? "الأقدم" : "Oldest" },
  ];

  // Filter and sort news
  const filteredNews = newsData
    .filter((news) => {
      const matchesSearch =
        searchTerm === "" ||
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        default:
          return 0;
      }
    });

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <AnimatedSection animation="fadeInUp" delay={0}>
          <div className="mb-8">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {t("news.title")}
            </h1>
            <p
              className={`text-xl text-muted-foreground ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {t("news.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection animation="fadeInUp" delay={200}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                      isRTL ? "right-3" : "left-3"
                    }`}
                  />
                  <Input
                    placeholder={t("news.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${
                      isRTL
                        ? "font-arabic text-right pr-10"
                        : "font-sans text-left pl-10"
                    }`}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className={
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }>
                    <SelectValue placeholder={t("common.sort")} />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className={
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <p
              className={`text-sm text-muted-foreground ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar"
                ? `عرض ${filteredNews.length} من ${newsData.length} مقال`
                : `Showing ${filteredNews.length} of ${newsData.length} articles`}
            </p>
          </div>
        </AnimatedSection>

        {/* News Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                {language === "ar" ? "جاري التحميل..." : "Loading..."}
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3
              className={`text-xl font-semibold mb-2 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "خطأ في التحميل" : "Loading Error"}
            </h3>
            <p
              className={`text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              {error}
            </p>
          </div>
        ) : (
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={120}
            animation="fadeInUp">
            {filteredNews.map((news, index) => (
              <AnimatedCard
                key={news._id || news.id}
                animation="fadeInUp"
                delay={index * 120}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* News Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={
                      news.imageUrl
                        ? newsApi.getImageUrl(news.imageUrl)
                        : "/assets/placeholder.svg"
                    }
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <CardTitle
                    className={`text-lg line-clamp-2 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {news.title}
                  </CardTitle>
                  <CardDescription
                    className={`line-clamp-3 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {news.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta Info */}
                  <div
                    className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${
                      isRTL ? "font-arabic" : "font-sans"
                    }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={() =>
                      navigateToTop(`/news/${news._id || news.id}`)
                    }>
                    {language === "ar" ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                </CardContent>
              </AnimatedCard>
            ))}
          </StaggeredContainer>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <AnimatedSection animation="fadeInUp" delay={400}>
            <div className="text-center py-12">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar" ? "لا توجد نتائج" : "No Results Found"}
              </h3>
              <p
                className={`text-muted-foreground ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "جرب البحث بكلمات مختلفة أو تغيير الفلاتر"
                  : "Try searching with different keywords or changing the filters"}
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default AllNews;
