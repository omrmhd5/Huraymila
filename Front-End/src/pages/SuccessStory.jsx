import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Star,
  Heart,
  Share2,
  Quote,
  Award,
  TrendingUp,
  Target,
  Users,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { successStoryApi } from "@/lib/successStoryApi";
import { formatDate } from "@/utils/dateUtils";

const SuccessStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch success story from API
  useEffect(() => {
    const fetchSuccessStory = async () => {
      try {
        setLoading(true);
        const response = await successStoryApi.getSuccessStoryById(id);
        setStory(response.data);
      } catch (error) {
        // Error fetching success story
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSuccessStory();
    }
  }, [id]);

  // Mock success stories data (fallback)
  const mockStoriesData = {
    1: {
      id: 1,
      title: "تحول صحي مذهل",
      titleEn: "Amazing Health Transformation",
      description:
        "قصة أحمد الذي فقد 25 كيلوغراماً وتحسن صحته بشكل كبير من خلال برنامج المشي الصحي",
      descriptionEn:
        "Ahmed's story of losing 25 kilograms and significantly improving his health through the healthy walking program",
      content: `
        <p>كان أحمد يعاني من السمنة ومشاكل صحية متعددة. انضم إلى برنامج المشي الصحي وبدأ بالمشي يومياً لمدة 30 دقيقة. خلال 6 أشهر، فقد 25 كيلوغراماً وتحسنت صحته بشكل ملحوظ.</p>
        
        <p>يقول أحمد: "هذا البرنامج غير حياتي بالكامل. لم أكن أتخيل أن المشي البسيط يمكن أن يكون له هذا التأثير الكبير على صحتي ونفسيتي."</p>
        
        <p>تضمن البرنامج:</p>
        <ul>
          <li>جلسات مشي يومية مع مرشدين مختصين</li>
          <li>نظام غذائي صحي مصاحب</li>
          <li>متابعة طبية منتظمة</li>
          <li>مجموعة دعم من المشاركين الآخرين</li>
        </ul>
        
        <p>اليوم، أحمد أصبح مثالاً يحتذى به في الحي، ويساعد الآخرين في بدء رحلتهم نحو حياة صحية أفضل.</p>
      `,
      contentEn: `
        <p>Ahmed was suffering from obesity and multiple health problems. He joined the healthy walking program and started walking daily for 30 minutes. Within 6 months, he lost 25 kilograms and his health improved significantly.</p>
        
        <p>Ahmed says: "This program completely changed my life. I never imagined that simple walking could have such a big impact on my health and well-being."</p>
        
        <p>The program included:</p>
        <ul>
          <li>Daily walking sessions with specialized guides</li>
          <li>Accompanying healthy diet system</li>
          <li>Regular medical follow-up</li>
          <li>Support group from other participants</li>
        </ul>
        
        <p>Today, Ahmed has become a role model in the neighborhood, helping others start their journey towards a healthier life.</p>
      `,
      category: "صحة",
      categoryEn: "Health",
      author: "أحمد محمد الصالح",
      authorEn: "Ahmed Mohammed Al-Saleh",
      age: 35,
      location: "حي النزهة",
      locationEn: "Al-Nuzha District",
      before: "120 كجم، مشاكل في القلب",
      beforeEn: "120 kg, heart problems",
      after: "95 كجم، صحة ممتازة",
      afterEn: "95 kg, excellent health",
      duration: "6 أشهر",
      durationEn: "6 months",
      impact: "فقدان 25 كجم، تحسن في صحة القلب",
      impactEn: "Lost 25 kg, improved heart health",
      image: "/assets/health-workshop.jpg",
      publishDate: "2025-01-15",
      likes: 156,
      shares: 23,
      views: 2100,
      rating: 5,
      tags: ["صحة", "مشي", "تحول", "حريملاء"],
      tagsEn: ["Health", "Walking", "Transformation", "Huraymila"],
      testimonial: "هذا البرنامج غير حياتي بالكامل",
      testimonialEn: "This program completely changed my life",
    },
    2: {
      id: 2,
      title: "مبادرة بيئية ناجحة",
      titleEn: "Successful Environmental Initiative",
      description: "قصة حي النخيل الذي أصبح مثالاً للاستدامة البيئية",
      descriptionEn:
        "The story of Al-Nakheel district becoming a model for environmental sustainability",
      content: `
        <p>كان حي النخيل يعاني من مشاكل بيئية متعددة، من النفايات المتراكمة إلى قلة المساحات الخضراء. بدأت مجموعة من السكان النشطين مبادرة لتحويل الحي إلى منطقة صديقة للبيئة.</p>
        
        <p>تضمنت المبادرة:</p>
        <ul>
          <li>برنامج إعادة التدوير الشامل</li>
          <li>زراعة الأشجار والنباتات في الشوارع</li>
          <li>حملات تنظيف أسبوعية</li>
          <li>ورش توعية بيئية للأطفال</li>
        </ul>
        
        <p>النتائج كانت مذهلة: انخفضت النفايات بنسبة 60%، وازدادت المساحات الخضراء بنسبة 200%، وأصبح الحي مثالاً يحتذى به في المحافظة.</p>
      `,
      contentEn: `
        <p>Al-Nakheel district was suffering from multiple environmental problems, from accumulated waste to lack of green spaces. A group of active residents started an initiative to transform the district into an environmentally friendly area.</p>
        
        <p>The initiative included:</p>
        <ul>
          <li>Comprehensive recycling program</li>
          <li>Planting trees and plants in streets</li>
          <li>Weekly cleaning campaigns</li>
          <li>Environmental awareness workshops for children</li>
        </ul>
        
        <p>The results were amazing: waste decreased by 60%, green spaces increased by 200%, and the district became a model to follow in the city.</p>
      `,
      category: "بيئة",
      categoryEn: "Environment",
      author: "فريق البيئة",
      authorEn: "Environment Team",
      age: "مجموعة",
      location: "حي النخيل",
      locationEn: "Al-Nakheel District",
      before: "نفايات متراكمة، قلة المساحات الخضراء",
      beforeEn: "Accumulated waste, lack of green spaces",
      after: "بيئة نظيفة، مساحات خضراء واسعة",
      afterEn: "Clean environment, extensive green spaces",
      duration: "8 أشهر",
      durationEn: "8 months",
      impact: "انخفاض النفايات 60%، زيادة المساحات الخضراء 200%",
      impactEn: "60% waste reduction, 200% increase in green spaces",
      image: "/assets/green-garden.jpg",
      publishDate: "2025-01-10",
      likes: 89,
      shares: 34,
      views: 1450,
      rating: 5,
      tags: ["بيئة", "استدامة", "مجتمع", "حريملاء"],
      tagsEn: ["Environment", "Sustainability", "Community", "Huraymila"],
      testimonial: "أصبح حينا مثالاً يحتذى به",
      testimonialEn: "Our neighborhood became a model to follow",
    },
  };

  const isRTL = language === "ar";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "جاري تحميل قصة النجاح..."
              : "Loading success story..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("successStory.notFound")}
          </h1>
          <Button onClick={() => navigate("/success-stories")}>
            {t("successStory.backToStories")}
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
            onClick={() => navigate("/success-stories")}
            className={`${isRTL ? "mr-4" : "ml-4"}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("successStory.backToStories")}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Story Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {story.priority && (
                <Badge variant="secondary" className="px-3 py-1">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {language === "ar"
                    ? `أولوية ${story.priority}`
                    : `Priority ${story.priority}`}
                </Badge>
              )}
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {story.title}
            </h1>

            <p
              className={`text-xl text-muted-foreground mb-6 ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {story.subtitle}
            </p>

            {/* Story Meta */}
            <div
              className={`flex flex-wrap items-center gap-6 text-sm text-muted-foreground ${
                isRTL ? "font-arabic" : "font-sans"
              }`}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(story.date)}</span>
              </div>
            </div>
          </div>

          {/* Story Image */}
          {story.imageUrl && (
            <div className="mb-8">
              <img
                src={successStoryApi.getImageUrl(story.imageUrl)}
                alt={story.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Before/After Comparison */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {t("successStory.beforeAfter")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${isRTL ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-red-600 mb-2">
                      {t("successStory.before")}
                    </h4>
                    <p className="text-muted-foreground">{story.before}</p>
                  </div>
                  <div className={`${isRTL ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-green-600 mb-2">
                      {t("successStory.after")}
                    </h4>
                    <p className="text-muted-foreground">{story.after}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote Section */}
          <div className="mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-primary mt-1" />
                  <div
                    className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <blockquote
                      className={`text-lg italic mb-4 ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      "{story.quote}"
                    </blockquote>
                    <cite
                      className={`text-sm text-muted-foreground ${
                        isRTL ? "font-arabic" : "font-sans"
                      }`}>
                      — {story.author}
                    </cite>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Story Content */}
          <div
            className={`prose prose-lg max-w-none ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            <p className="text-lg leading-relaxed">{story.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
