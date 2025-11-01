import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { newsApi } from "@/lib/newsApi";

// Import mock images
import walkingInitiativeImg from "@/assets/walking-initiative.jpg";
import traditionalPotteryImg from "@/assets/traditional-pottery-najdi.jpg";
import sustainableTransportImg from "@/assets/sustainable-transport.jpg";

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const [news, setNews] = useState(null);
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // Check if it's a mock news article
        if (id.startsWith("mock-news-")) {
          const mockNewsData = getMockNews();
          const mockArticle = mockNewsData.find(
            (article) => article._id === id || article.id === id
          );

          if (mockArticle) {
            setNews(mockArticle);
          } else {
            setError("Mock news article not found");
          }
        } else {
          // Load from API
          const response = await newsApi.getNewsById(id);
          setNews(response.data);
        }
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
  }, [id, language]);

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
                src={
                  news.isMock
                    ? news.imageUrl
                    : newsApi.getImageUrl(news.imageUrl)
                }
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
