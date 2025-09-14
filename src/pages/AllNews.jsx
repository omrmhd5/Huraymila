import React, { useState } from "react";
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

const AllNews = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const isRTL = language === "ar";

  // Mock news data
  const newsData = [
    {
      id: 1,
      title: "إطلاق مبادرة الصحة الوقائية في مدينة حريملاء",
      titleEn: "Launch of Preventive Health Initiative in Huraymila City",
      excerpt:
        "مبادرة جديدة للصحة الوقائية تهدف إلى تعزيز الوعي الصحي بين المواطنين",
      excerptEn:
        "New preventive health initiative aims to promote health awareness among citizens",
      author: "د. أحمد الصالح",
      authorEn: "Dr. Ahmed Al-Saleh",
      publishDate: "2024-01-15",
      readTime: "5",
      category: "صحة",
      categoryEn: "Health",
      image: "/assets/health-workshop.jpg",
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true,
    },
    {
      id: 2,
      title: "افتتاح مركز جديد للرعاية الصحية الأولية",
      titleEn: "Opening of New Primary Healthcare Center",
      excerpt: "مركز جديد مجهز بأحدث التقنيات الطبية يقدم خدمات شاملة",
      excerptEn:
        "New center equipped with latest medical technologies provides comprehensive services",
      author: "فريق التحرير",
      authorEn: "Editorial Team",
      publishDate: "2024-01-10",
      readTime: "3",
      category: "مرافق صحية",
      categoryEn: "Health Facilities",
      image: "/assets/green-garden.jpg",
      views: 980,
      likes: 67,
      comments: 15,
      featured: false,
    },
    {
      id: 3,
      title: "حملة التطعيم ضد الإنفلونزا الموسمية",
      titleEn: "Seasonal Flu Vaccination Campaign",
      excerpt:
        "انطلاق حملة التطعيم المجاني ضد الإنفلونزا في جميع المراكز الصحية",
      excerptEn:
        "Launch of free flu vaccination campaign in all health centers",
      author: "د. فاطمة العتيبي",
      authorEn: "Dr. Fatima Al-Otaibi",
      publishDate: "2024-01-08",
      readTime: "4",
      category: "تطعيمات",
      categoryEn: "Vaccinations",
      image: "/assets/walking-initiative.jpg",
      views: 750,
      likes: 45,
      comments: 12,
      featured: false,
    },
    {
      id: 4,
      title: "ورشة عمل حول التغذية السليمة للأطفال",
      titleEn: "Workshop on Proper Nutrition for Children",
      excerpt: "ورشة تفاعلية تهدف إلى تعليم الأمهات أساسيات التغذية الصحية",
      excerptEn:
        "Interactive workshop aimed at teaching mothers the basics of healthy nutrition",
      author: "أخصائية التغذية سارة القحطاني",
      authorEn: "Nutritionist Sarah Al-Qahtani",
      publishDate: "2024-01-05",
      readTime: "6",
      category: "تغذية",
      categoryEn: "Nutrition",
      image: "/assets/health-workshop.jpg",
      views: 620,
      likes: 38,
      comments: 8,
      featured: false,
    },
    {
      id: 5,
      title: "برنامج المشي الصحي في المنتزهات",
      titleEn: "Healthy Walking Program in Parks",
      excerpt: "برنامج أسبوعي للمشي الصحي في منتزهات المدينة مع مرشدين مختصين",
      excerptEn:
        "Weekly healthy walking program in city parks with specialized guides",
      author: "مدير النشاط البدني",
      authorEn: "Physical Activity Manager",
      publishDate: "2024-01-03",
      readTime: "3",
      category: "نشاط بدني",
      categoryEn: "Physical Activity",
      image: "/assets/walking-initiative.jpg",
      views: 890,
      likes: 52,
      comments: 18,
      featured: false,
    },
    {
      id: 6,
      title: "تطبيق جديد للرعاية الصحية الذكية",
      titleEn: "New Smart Healthcare App",
      excerpt: "إطلاق تطبيق ذكي يربط المواطنين بالخدمات الصحية المتاحة",
      excerptEn:
        "Launch of smart app connecting citizens with available health services",
      author: "فريق التطوير التقني",
      authorEn: "Technical Development Team",
      publishDate: "2024-01-01",
      readTime: "7",
      category: "تقنية",
      categoryEn: "Technology",
      image: "/assets/green-garden.jpg",
      views: 1100,
      likes: 78,
      comments: 25,
      featured: true,
    },
  ];

  const categories = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "صحة", label: language === "ar" ? "صحة" : "Health" },
    {
      value: "مرافق صحية",
      label: language === "ar" ? "مرافق صحية" : "Health Facilities",
    },
    { value: "تطعيمات", label: language === "ar" ? "تطعيمات" : "Vaccinations" },
    { value: "تغذية", label: language === "ar" ? "تغذية" : "Nutrition" },
    {
      value: "نشاط بدني",
      label: language === "ar" ? "نشاط بدني" : "Physical Activity",
    },
    { value: "تقنية", label: language === "ar" ? "تقنية" : "Technology" },
  ];

  const sortOptions = [
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "oldest", label: language === "ar" ? "الأقدم" : "Oldest" },
    {
      value: "most_viewed",
      label: language === "ar" ? "الأكثر مشاهدة" : "Most Viewed",
    },
    {
      value: "most_liked",
      label: language === "ar" ? "الأكثر إعجاباً" : "Most Liked",
    },
  ];

  // Filter and sort news
  const filteredNews = newsData
    .filter((news) => {
      const matchesSearch =
        searchTerm === "" ||
        (language === "ar" ? news.title : news.titleEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === "ar" ? news.excerpt : news.excerptEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        (language === "ar" ? news.category : news.categoryEn) ===
          categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishDate) - new Date(a.publishDate);
        case "oldest":
          return new Date(a.publishDate) - new Date(b.publishDate);
        case "most_viewed":
          return b.views - a.views;
        case "most_liked":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

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
              {language === "ar" ? "الأخبار" : "News"}
            </h1>
            <p
              className={`text-xl text-muted-foreground ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar"
                ? "تابع آخر الأخبار والتطورات في مدينة حريملاء الصحية"
                : "Stay updated with the latest news and developments in Huraymila Healthy City"}
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
                    placeholder={
                      language === "ar"
                        ? "البحث في الأخبار..."
                        : "Search news..."
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
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-48">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}>
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
              </div>

              {/* Sort */}
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className={
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }>
                    <SelectValue
                      placeholder={language === "ar" ? "ترتيب" : "Sort"}
                    />
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
        <StaggeredContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={120}
          animation="fadeInUp">
          {filteredNews.map((news, index) => (
            <AnimatedCard
              key={news.id}
              animation="fadeInUp"
              delay={index * 120}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* News Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={news.image}
                  alt={language === "ar" ? news.title : news.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {news.featured && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {language === "ar" ? "مميز" : "Featured"}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="absolute top-4 right-4 bg-background/80">
                  {language === "ar" ? news.category : news.categoryEn}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle
                  className={`text-lg line-clamp-2 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? news.title : news.titleEn}
                </CardTitle>
                <CardDescription
                  className={`line-clamp-3 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? news.excerpt : news.excerptEn}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta Info */}
                <div
                  className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${
                    isRTL ? "font-arabic" : "font-sans"
                  }`}>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>
                      {language === "ar" ? news.author : news.authorEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {news.readTime} {language === "ar" ? "د" : "min"}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{news.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{news.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{news.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <Button
                  className="w-full group-hover:bg-primary/90 transition-colors"
                  onClick={() => navigateToTop(`/news/${news.id}`)}>
                  {language === "ar" ? "اقرأ المزيد" : "Read More"}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                  />
                </Button>
              </CardContent>
            </AnimatedCard>
          ))}
        </StaggeredContainer>

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
