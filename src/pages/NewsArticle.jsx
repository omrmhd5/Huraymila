import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();

  // Mock news data - in real app, this would come from API
  const newsData = {
    1: {
      id: 1,
      title: "إطلاق مبادرة الصحة الوقائية في مدينة حريملاء",
      titleEn: "Launch of Preventive Health Initiative in Huraymila City",
      content: `
        <p>تعلن مدينة حريملاء الصحية عن إطلاق مبادرة جديدة للصحة الوقائية تهدف إلى تعزيز الوعي الصحي بين المواطنين وتشجيعهم على اتباع نمط حياة صحي.</p>
        
        <p>تتضمن المبادرة عدة برامج فرعية تشمل:</p>
        <ul>
          <li>برامج التوعية بالتغذية السليمة</li>
          <li>حملات الكشف المبكر عن الأمراض</li>
          <li>ورش عمل حول النشاط البدني</li>
          <li>برامج الإقلاع عن التدخين</li>
        </ul>
        
        <p>وقد أكد الدكتور أحمد الصالح، مدير الصحة العامة في المدينة، أن هذه المبادرة تأتي في إطار استراتيجية المدينة لتحقيق رؤية 2030 في مجال الصحة العامة.</p>
        
        <p>من المقرر أن تبدأ المبادرة في الأسبوع القادم وتستمر لمدة ستة أشهر، مع إمكانية تمديدها حسب النتائج المحققة.</p>
      `,
      contentEn: `
        <p>Huraymila Healthy City announces the launch of a new preventive health initiative aimed at promoting health awareness among citizens and encouraging them to follow a healthy lifestyle.</p>
        
        <p>The initiative includes several sub-programs including:</p>
        <ul>
          <li>Healthy nutrition awareness programs</li>
          <li>Early disease detection campaigns</li>
          <li>Physical activity workshops</li>
          <li>Smoking cessation programs</li>
        </ul>
        
        <p>Dr. Ahmed Al-Saleh, Director of Public Health in the city, confirmed that this initiative comes within the framework of the city's strategy to achieve Vision 2030 in the field of public health.</p>
        
        <p>The initiative is scheduled to begin next week and continue for six months, with the possibility of extension based on the results achieved.</p>
      `,
      excerpt: "مبادرة جديدة للصحة الوقائية تهدف إلى تعزيز الوعي الصحي",
      excerptEn:
        "New preventive health initiative aims to promote health awareness",
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
      tags: ["صحة وقائية", "مبادرات", "حريملاء"],
      tagsEn: ["Preventive Health", "Initiatives", "Huraymila"],
    },
    2: {
      id: 2,
      title: "افتتاح مركز جديد للرعاية الصحية الأولية",
      titleEn: "Opening of New Primary Healthcare Center",
      content: `
        <p>تم افتتاح مركز جديد للرعاية الصحية الأولية في حي النخيل، والذي يضم أحدث التجهيزات الطبية ويقدم خدمات صحية شاملة للمواطنين.</p>
        
        <p>يضم المركز:</p>
        <ul>
          <li>عيادات متخصصة في مختلف التخصصات الطبية</li>
          <li>مختبر طبي مجهز بأحدث التقنيات</li>
          <li>صيدلية تقدم الأدوية بأسعار مخفضة</li>
          <li>قسم للطوارئ يعمل على مدار الساعة</li>
        </ul>
        
        <p>وقد أشاد وزير الصحة بالجهود المبذولة في تطوير البنية التحتية الصحية في المدينة.</p>
      `,
      contentEn: `
        <p>A new primary healthcare center has been opened in Al-Nakheel district, featuring the latest medical equipment and providing comprehensive health services to citizens.</p>
        
        <p>The center includes:</p>
        <ul>
          <li>Specialized clinics in various medical specialties</li>
          <li>Medical laboratory equipped with latest technologies</li>
          <li>Pharmacy offering medicines at reduced prices</li>
          <li>24-hour emergency department</li>
        </ul>
        
        <p>The Minister of Health praised the efforts made in developing the health infrastructure in the city.</p>
      `,
      excerpt: "مركز جديد مجهز بأحدث التقنيات الطبية",
      excerptEn: "New center equipped with latest medical technologies",
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
      tags: ["مركز صحي", "رعاية أولية", "تجهيزات طبية"],
      tagsEn: ["Health Center", "Primary Care", "Medical Equipment"],
    },
  };

  const article = newsData[id];
  const isRTL = language === "ar";

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("newsArticle.notFound")}
          </h1>
          <Button onClick={() => navigate("/news")}>
            {t("newsArticle.backToNews")}
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/news")}
            className={`${isRTL ? "mr-4" : "ml-4"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("newsArticle.backToNews")}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="px-3 py-1">
                {language === "ar" ? article.category : article.categoryEn}
              </Badge>
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar" ? article.title : article.titleEn}
            </h1>

            <p
              className={`text-xl text-muted-foreground mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar" ? article.excerpt : article.excerptEn}
            </p>

            {/* Article Meta */}
            <div
              className={`flex flex-wrap items-center gap-6 text-sm text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {language === "ar" ? article.author : article.authorEn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {article.readTime} {t("newsArticle.minRead")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="mb-8">
            <img
              src={article.image}
              alt={language === "ar" ? article.title : article.titleEn}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div
            className={`prose prose-lg max-w-none ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            <div
              dangerouslySetInnerHTML={{
                __html: language === "ar" ? article.content : article.contentEn,
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {t("newsArticle.tags")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(language === "ar" ? article.tags : article.tagsEn).map(
                (tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                )
              )}
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t("newsArticle.share")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
