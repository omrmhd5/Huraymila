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
  Star,
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
        "Discover how our initiatives have changed people's lives in Harimlaa",
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
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

        {/* Featured Story */}
        {stories
          .filter((story) => story.featured)
          .map((featuredStory) => (
            <Card key={featuredStory.id} className="mb-16 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredStory.image}
                    alt={
                      language === "ar"
                        ? featuredStory.title
                        : featuredStory.titleEn
                    }
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {getCategoryBadge(featuredStory.category)}
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(featuredStory.rating)}
                    <span className="text-sm text-muted-foreground">
                      {featuredStory.rating}/5
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {language === "ar"
                      ? featuredStory.title
                      : featuredStory.titleEn}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {language === "ar"
                      ? featuredStory.description
                      : featuredStory.descriptionEn}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">
                        {language === "ar" ? "قبل:" : "Before:"}
                      </span>
                      <p className="text-foreground">
                        {language === "ar"
                          ? featuredStory.before
                          : featuredStory.beforeEn}
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">
                        {language === "ar" ? "بعد:" : "After:"}
                      </span>
                      <p className="text-foreground">
                        {language === "ar"
                          ? featuredStory.after
                          : featuredStory.afterEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>
                        {language === "ar"
                          ? featuredStory.author
                          : featuredStory.authorEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>
                        {language === "ar"
                          ? featuredStory.location
                          : featuredStory.locationEn}
                      </span>
                    </div>
                  </div>

                  <blockquote className="border-r-4 border-primary pr-4 mb-6 italic text-muted-foreground">
                    "
                    {language === "ar"
                      ? featuredStory.testimonial
                      : featuredStory.testimonialEn}
                    "
                  </blockquote>

                  <Button
                    className="w-fit"
                    onClick={() =>
                      navigateToTop(`/success-stories/${story.id}`)
                    }>
                    {language === "ar" ? "اقرأ القصة كاملة" : "Read Full Story"}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories
            .filter((story) => !story.featured)
            .map((story) => (
              <Card
                key={story.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Story Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={story.image}
                    alt={language === "ar" ? story.title : story.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    {getCategoryBadge(story.category)}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(story.rating)}
                    <span className="text-sm text-muted-foreground">
                      {story.rating}/5
                    </span>
                  </div>

                  <CardTitle className="text-lg mb-2">
                    {language === "ar" ? story.title : story.titleEn}
                  </CardTitle>

                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {language === "ar"
                      ? story.description
                      : story.descriptionEn}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        {language === "ar" ? "قبل:" : "Before:"}
                      </span>
                      <p className="text-foreground text-xs">
                        {language === "ar" ? story.before : story.beforeEn}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        {language === "ar" ? "بعد:" : "After:"}
                      </span>
                      <p className="text-foreground text-xs">
                        {language === "ar" ? story.after : story.afterEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {language === "ar" ? story.author : story.authorEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>
                        {language === "ar" ? story.location : story.locationEn}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() =>
                      navigateToTop(`/success-stories/${story.id}`)
                    }>
                    {language === "ar" ? "اقرأ القصة" : "Read Story"}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
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
