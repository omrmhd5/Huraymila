import React from "react";
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
  Heart,
  Users,
  Target,
  ArrowRight,
  Quote,
  Award,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const SuccessStories = () => {
  const { language } = useTheme();
  const navigate = useNavigate();

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    ar: {
      title: "قصص النجاح",
      subtitle: "اكتشف كيف غيرت مبادرتنا حياة الناس في مدينة حريملاء",
      description:
        "نفخر بنجاحاتنا وإنجازاتنا في تعزيز الصحة العامة وتحسين جودة الحياة في المجتمع.",
      viewAll: "عرض جميع القصص",
      categories: {
        health: "صحة",
        environment: "بيئة",
        community: "مجتمع",
        education: "تعليم",
      },
    },
    en: {
      title: "Success Stories",
      subtitle:
        "Discover how our initiatives have changed people's lives in Huraymila",
      description:
        "We are proud of our successes and achievements in promoting public health and improving quality of life in the community.",
      viewAll: "View All Stories",
      categories: {
        health: "Health",
        environment: "Environment",
        community: "Community",
        education: "Education",
      },
    },
  };

  const stories = [
    {
      id: 1,
      title: "تحول صحي مذهل",
      titleEn: "Amazing Health Transformation",
      description:
        "قصة أحمد الذي فقد 25 كيلوغراماً وتحسن صحته بشكل كبير من خلال برنامج المشي الصحي",
      descriptionEn:
        "Ahmed's story of losing 25 kilograms and significantly improving his health through the healthy walking program",
      content:
        "كان أحمد يعاني من السمنة ومشاكل صحية متعددة. انضم إلى برنامج المشي الصحي وبدأ بالمشي يومياً لمدة 30 دقيقة. خلال 6 أشهر، فقد 25 كيلوغراماً وتحسنت صحته بشكل ملحوظ. يقول أحمد: 'هذا البرنامج غير حياتي بالكامل'.",
      contentEn:
        "Ahmed was suffering from obesity and multiple health problems. He joined the healthy walking program and started walking daily for 30 minutes. Within 6 months, he lost 25 kilograms and his health improved significantly. Ahmed says: 'This program completely changed my life'.",
      category: "health",
      author: "أحمد محمد الصالح",
      authorEn: "Ahmed Mohammed Al-Saleh",
      age: 35,
      location: "حي النزهة",
      locationEn: "Al-Nuzha District",
      before: "120 كجم، مشاكل في القلب",
      beforeEn: "120 kg, heart problems",
      after: "95 كجم، صحة ممتازة",
      afterEn: "95 kg, excellent health",
      rating: 5,
      testimonial:
        "هذا البرنامج غير حياتي بالكامل. أشعر الآن بالحيوية والنشاط كما لم أشعر من قبل.",
      testimonialEn:
        "This program completely changed my life. I now feel energetic and active like never before.",
      image: "/assets/health-workshop.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "حديقة المجتمع الخضراء",
      titleEn: "Community Green Garden",
      description:
        "قصة نجاح مشروع التشجير الحضري في تحويل منطقة صحراوية إلى حديقة خضراء جميلة",
      descriptionEn:
        "Success story of the urban afforestation project in transforming a desert area into a beautiful green garden",
      content:
        "كانت منطقة حي الشفاء منطقة صحراوية قاحلة. من خلال مشروع التشجير الحضري، تم زراعة أكثر من 200 شجرة وإنشاء حديقة مجتمعية جميلة. الآن أصبحت المنطقة وجهة للعائلات للتنزه والاسترخاء.",
      contentEn:
        "Al-Shifa district was a barren desert area. Through the urban afforestation project, more than 200 trees were planted and a beautiful community garden was created. Now the area has become a destination for families to walk and relax.",
      category: "environment",
      author: "سارة العتيبي",
      authorEn: "Sara Al-Otaibi",
      age: 28,
      location: "حي الشفاء",
      locationEn: "Al-Shifa District",
      before: "منطقة صحراوية قاحلة",
      beforeEn: "Barren desert area",
      after: "حديقة خضراء جميلة",
      afterEn: "Beautiful green garden",
      rating: 5,
      testimonial:
        "أرى الآن أطفالي يلعبون في حديقة جميلة بدلاً من الرمال. هذا التغيير رائع!",
      testimonialEn:
        "I now see my children playing in a beautiful garden instead of sand. This change is amazing!",
      image: "/assets/green-garden.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "توعية صحية للأطفال",
      titleEn: "Health Awareness for Children",
      description:
        "قصة نجاح برنامج التوعية الصحية في المدارس وتأثيره الإيجابي على الأطفال",
      descriptionEn:
        "Success story of the health awareness program in schools and its positive impact on children",
      content:
        "تم تطبيق برنامج التوعية الصحية في 5 مدارس ابتدائية في المدينة. تعلم الأطفال أهمية التغذية السليمة والنظافة الشخصية. النتائج كانت مذهلة: تحسن في عادات الأكل والنظافة لدى 90% من الأطفال.",
      contentEn:
        "The health awareness program was implemented in 5 primary schools in the city. Children learned about the importance of proper nutrition and personal hygiene. The results were amazing: improvement in eating and hygiene habits among 90% of children.",
      category: "education",
      author: "فاطمة الزهراني",
      authorEn: "Fatima Al-Zahrani",
      age: 32,
      location: "مدرسة الأمل الابتدائية",
      locationEn: "Al-Amal Primary School",
      before: "أطفال لا يعرفون أهمية التغذية",
      beforeEn: "Children unaware of nutrition importance",
      after: "أطفال واعون صحياً",
      afterEn: "Health-conscious children",
      rating: 5,
      testimonial:
        "أرى تغييراً كبيراً في عادات أطفالي. أصبحوا يختارون الطعام الصحي تلقائياً!",
      testimonialEn:
        "I see a big change in my children's habits. They now automatically choose healthy food!",
      image: "/assets/health-workshop.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "مبادرة المشي اليومي",
      titleEn: "Daily Walking Initiative",
      description:
        "قصة نجاح مبادرة المشي اليومي في تشجيع المجتمع على ممارسة الرياضة",
      descriptionEn:
        "Success story of the daily walking initiative in encouraging the community to exercise",
      content:
        "بدأت المبادرة بـ 50 مشارك فقط. الآن يشارك أكثر من 300 شخص يومياً في المشي الصحي. تم إنشاء مسارات آمنة ومخصصة للمشي في مختلف أحياء المدينة. النتائج: تحسن في الصحة العامة وزيادة في النشاط المجتمعي.",
      contentEn:
        "The initiative started with only 50 participants. Now more than 300 people participate daily in healthy walking. Safe and dedicated walking paths have been created in various city neighborhoods. Results: improvement in public health and increase in community activity.",
      category: "community",
      author: "خالد الشمري",
      authorEn: "Khalid Al-Shamri",
      age: 40,
      location: "حي الملك فهد",
      locationEn: "King Fahd District",
      before: "50 مشارك فقط",
      beforeEn: "Only 50 participants",
      after: "300+ مشارك يومياً",
      afterEn: "300+ daily participants",
      rating: 5,
      testimonial:
        "أرى الناس يتجمعون كل صباح للمشي معاً. هذا يخلق روحاً مجتمعية رائعة!",
      testimonialEn:
        "I see people gathering every morning to walk together. This creates a wonderful community spirit!",
      image: "/assets/walking-initiative.jpg",
      featured: false,
    },
  ];

  const current = content[language];
  const isRTL = language === "ar";

  const getCategoryBadge = (category) => {
    const categoryLabels = {
      health: { ar: "صحة", en: "Health", color: "bg-red-500" },
      environment: { ar: "بيئة", en: "Environment", color: "bg-green-500" },
      community: { ar: "مجتمع", en: "Community", color: "bg-blue-500" },
      education: { ar: "تعليم", en: "Education", color: "bg-purple-500" },
    };

    const categoryInfo = categoryLabels[category];
    return (
      <Badge variant="default" className={categoryInfo.color}>
        {language === "ar" ? categoryInfo.ar : categoryInfo.en}
      </Badge>
    );
  };

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {language === "ar" ? "قصص النجاح" : "Success Stories"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories
            .filter((story) => !story.featured)
            .map((story, index) => (
              <Card
                key={index}
                className="bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary opacity-50" />
                  </div>

                  {/* Story Text */}
                  <p
                    className={cn(
                      "text-muted-foreground leading-relaxed mb-6",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    "
                    {language === "ar"
                      ? story.testimonial
                      : story.testimonialEn}
                    "
                  </p>

                  {/* Initiative Badge */}
                  <Badge variant="secondary" className="mb-4">
                    {language === "ar" ? story.title : story.titleEn}
                  </Badge>

                  {/* Before and After */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {language === "ar" ? "قبل:" : "Before:"}
                      </span>
                      <p className="text-red-700 dark:text-red-300 text-xs">
                        {language === "ar" ? story.before : story.beforeEn}
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {language === "ar" ? "بعد:" : "After:"}
                      </span>
                      <p className="text-green-700 dark:text-green-300 text-xs">
                        {language === "ar" ? story.after : story.afterEn}
                      </p>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {story.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-semibold text-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {language === "ar" ? story.author : story.authorEn}
                      </h4>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          isRTL ? "font-arabic" : "font-english"
                        )}>
                        {language === "ar" ? story.location : story.locationEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
            onClick={() => navigateToTop("/success-stories")}>
            {current.viewAll}
            <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
