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

// Import mock images
import walkingInitiativeImg from "@/assets/walking-initiative.jpg";
import traditionalPotteryImg from "@/assets/traditional-pottery-najdi.jpg";
import sustainableTransportImg from "@/assets/sustainable-transport.jpg";

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

  // Mock news data
  const getMockNews = () => [
    {
      _id: "mock-news-1",
      id: "mock-news-1",
      title:
        language === "ar"
          ? "إطلاق مبادرة المشي اليومي لتعزيز الصحة العامة"
          : "Launch of Daily Walking Initiative to Promote Public Health",
      subtitle:
        language === "ar"
          ? "مبادرة جديدة تهدف لتشجيع سكان حريملاء على ممارسة المشي اليومي"
          : "New initiative aims to encourage Huraymila residents to practice daily walking",
      description:
        language === "ar"
          ? "أطلقت محافظة حريملاء الصحية مبادرة المشي اليومي كجزء من برنامجها الشامل لتعزيز الصحة العامة. تهدف المبادرة إلى تشجيع المواطنين على ممارسة رياضة المشي لمدة 30 دقيقة يومياً في الممرات المخصصة والحدائق العامة. تتضمن المبادرة تنظيم مسيرات جماعية صباحية ومسائية، وتوفير مرشدين صحيين، وإقامة ورش عمل توعوية حول فوائد المشي للصحة البدنية والنفسية."
          : "Huraymila Healthy City has launched the Daily Walking Initiative as part of its comprehensive program to promote public health. The initiative aims to encourage citizens to walk for 30 minutes daily in designated walkways and public gardens. The initiative includes organizing morning and evening group walks, providing health guides, and conducting awareness workshops on the physical and mental health benefits of walking.",
      date: new Date("2025-10-28").toISOString(),
      imageUrl: walkingInitiativeImg,
      isMock: true,
    },
    {
      _id: "mock-news-2",
      id: "mock-news-2",
      title:
        language === "ar"
          ? "ورش الفخار النجدي: إحياء التراث الحرفي الأصيل"
          : "Najdi Pottery Workshops: Reviving Authentic Craft Heritage",
      subtitle:
        language === "ar"
          ? "برنامج تدريبي متخصص لتعليم فن الفخار التقليدي"
          : "Specialized training program to teach traditional pottery art",
      description:
        language === "ar"
          ? "في إطار الحفاظ على التراث النجدي الأصيل، تنظم محافظة حريملاء الصحية سلسلة من ورش العمل المتخصصة في صناعة الفخار التقليدي. يشرف على الورش حرفيون متمرسون يمتلكون خبرة تمتد لعقود في هذا المجال. تتضمن الورش تعليم المشاركين تقنيات تشكيل الطين، والزخرفة التقليدية، وطرق الحرق القديمة. كما تهدف المبادرة إلى توثيق هذه الحرفة ونقلها للأجيال القادمة."
          : "As part of preserving authentic Najdi heritage, Huraymila Healthy City organizes a series of specialized workshops in traditional pottery making. The workshops are supervised by experienced craftsmen with decades of expertise in this field. The workshops include teaching participants clay shaping techniques, traditional decoration, and ancient firing methods. The initiative also aims to document this craft and pass it on to future generations.",
      date: new Date("2025-10-25").toISOString(),
      imageUrl: traditionalPotteryImg,
      isMock: true,
    },
    {
      _id: "mock-news-3",
      id: "mock-news-3",
      title:
        language === "ar"
          ? "تدشين نظام النقل المستدام في حريملاء"
          : "Launch of Sustainable Transportation System in Huraymila",
      subtitle:
        language === "ar"
          ? "مشروع رائد لتقليل الانبعاثات وتحسين جودة الهواء"
          : "Pioneering project to reduce emissions and improve air quality",
      description:
        language === "ar"
          ? "دشنت بلدية حريملاء بالتعاون مع برنامج المحافظة الصحية نظام النقل المستدام الذي يشمل توفير دراجات هوائية عامة، ومسارات آمنة للمشاة، ومحطات شحن للمركبات الكهربائية. يهدف المشروع إلى تقليل الاعتماد على المركبات التقليدية، وخفض نسبة التلوث البيئي، وتعزيز أسلوب حياة صحي ونشط. تم تخصيص ميزانية كبيرة لتطوير البنية التحتية اللازمة وتوسيع نطاق الخدمة تدريجياً."
          : "Huraymila Municipality, in cooperation with the Healthy City Program, has launched a sustainable transportation system that includes providing public bicycles, safe pedestrian paths, and electric vehicle charging stations. The project aims to reduce dependence on traditional vehicles, lower environmental pollution rates, and promote a healthy and active lifestyle. A significant budget has been allocated to develop the necessary infrastructure and gradually expand the service scope.",
      date: new Date("2025-10-20").toISOString(),
      imageUrl: sustainableTransportImg,
      isMock: true,
    },
  ];

  // Fetch news data from API and append mock news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getAllNews({ limit: 100 });
        const backendNews = response.data || [];

        // Append mock news to backend data
        const mockNews = getMockNews();
        const allNews = [...backendNews, ...mockNews];

        setNewsData(allNews);
      } catch (error) {
        // Error fetching news - show only mock data
        const mockNews = getMockNews();
        setNewsData(mockNews);
        setError(null); // Don't show error if we have mock data
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

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
                      news.isMock
                        ? news.imageUrl
                        : news.imageUrl
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
