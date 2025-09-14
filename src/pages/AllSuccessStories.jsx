import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  MapPin,
  Star,
  Heart,
  Share2,
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Quote,
  Award,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AllSuccessStories = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const isRTL = language === "ar";

  // Mock success stories data
  const storiesData = [
    {
      id: 1,
      title: "تحول صحي مذهل",
      titleEn: "Amazing Health Transformation",
      description: "قصة أحمد الذي فقد 25 كيلوغراماً وتحسن صحته بشكل كبير",
      descriptionEn:
        "Ahmed's story of losing 25 kilograms and significantly improving his health",
      author: "أحمد محمد الصالح",
      authorEn: "Ahmed Mohammed Al-Saleh",
      age: 35,
      location: "حي النزهة",
      locationEn: "Al-Nuzha District",
      category: "صحة",
      categoryEn: "Health",
      duration: "6 أشهر",
      durationEn: "6 months",
      impact: "فقدان 25 كجم، تحسن في صحة القلب",
      impactEn: "Lost 25 kg, improved heart health",
      image: "/assets/health-workshop.jpg",
      publishDate: "2024-01-15",
      likes: 156,
      shares: 23,
      views: 2100,
      rating: 5,
      featured: true,
    },
    {
      id: 2,
      title: "مبادرة بيئية ناجحة",
      titleEn: "Successful Environmental Initiative",
      description: "قصة حي النخيل الذي أصبح مثالاً للاستدامة البيئية",
      descriptionEn:
        "The story of Al-Nakheel district becoming a model for environmental sustainability",
      author: "فريق البيئة",
      authorEn: "Environment Team",
      age: "مجموعة",
      location: "حي النخيل",
      locationEn: "Al-Nakheel District",
      category: "بيئة",
      categoryEn: "Environment",
      duration: "8 أشهر",
      durationEn: "8 months",
      impact: "انخفاض النفايات 60%، زيادة المساحات الخضراء 200%",
      impactEn: "60% waste reduction, 200% increase in green spaces",
      image: "/assets/green-garden.jpg",
      publishDate: "2024-01-10",
      likes: 89,
      shares: 34,
      views: 1450,
      rating: 5,
      featured: false,
    },
    {
      id: 3,
      title: "تعليم صحي للأطفال",
      titleEn: "Health Education for Children",
      description: "مدرسة ابتدائية تتبنى برنامج التوعية الصحية الشامل",
      descriptionEn:
        "Elementary school adopts comprehensive health awareness program",
      author: "مديرة المدرسة فاطمة العتيبي",
      authorEn: "School Principal Fatima Al-Otaibi",
      age: "مؤسسة",
      location: "مدرسة النور الابتدائية",
      locationEn: "Al-Nour Elementary School",
      category: "تعليم",
      categoryEn: "Education",
      duration: "سنة واحدة",
      durationEn: "One year",
      impact: "تحسن في وعي الطلاب الصحي بنسبة 80%",
      impactEn: "80% improvement in students' health awareness",
      image: "/assets/walking-initiative.jpg",
      publishDate: "2024-01-08",
      likes: 67,
      shares: 18,
      views: 1200,
      rating: 4,
      featured: false,
    },
    {
      id: 4,
      title: "مجتمع متطوع نشط",
      titleEn: "Active Volunteer Community",
      description: "تطوع 200 شخص في حملات الصحة العامة",
      descriptionEn: "200 people volunteered in public health campaigns",
      author: "منسق التطوع سعد القحطاني",
      authorEn: "Volunteer Coordinator Saad Al-Qahtani",
      age: "مجتمع",
      location: "مدينة حريملاء",
      locationEn: "Huraymila City",
      category: "مجتمع",
      categoryEn: "Community",
      duration: "3 أشهر",
      durationEn: "3 months",
      impact: "200 متطوع، 50 حملة توعية",
      impactEn: "200 volunteers, 50 awareness campaigns",
      image: "/assets/health-workshop.jpg",
      publishDate: "2024-01-05",
      likes: 124,
      shares: 45,
      views: 1800,
      rating: 5,
      featured: true,
    },
    {
      id: 5,
      title: "مركز صحي ذكي",
      titleEn: "Smart Health Center",
      description: "تطبيق التكنولوجيا في تحسين الخدمات الصحية",
      descriptionEn: "Applying technology to improve health services",
      author: "فريق التطوير التقني",
      authorEn: "Technical Development Team",
      age: "مؤسسة",
      location: "مركز الصحة الأولية",
      locationEn: "Primary Health Center",
      category: "تقنية",
      categoryEn: "Technology",
      duration: "سنة ونصف",
      durationEn: "One and a half years",
      impact: "تقليل وقت الانتظار 70%، رضا المرضى 95%",
      impactEn: "70% reduction in waiting time, 95% patient satisfaction",
      image: "/assets/green-garden.jpg",
      publishDate: "2024-01-03",
      likes: 78,
      shares: 22,
      views: 1350,
      rating: 4,
      featured: false,
    },
    {
      id: 6,
      title: "برنامج التغذية الصحية",
      titleEn: "Healthy Nutrition Program",
      description: "تحسين عادات الأكل في المدارس والمجتمع",
      descriptionEn: "Improving eating habits in schools and community",
      author: "أخصائية التغذية نورا السعيد",
      authorEn: "Nutritionist Nora Al-Saeed",
      age: "مؤسسة",
      location: "مدارس حريملاء",
      locationEn: "Huraymila Schools",
      category: "تغذية",
      categoryEn: "Nutrition",
      duration: "سنتان",
      durationEn: "Two years",
      impact: "تحسن في عادات الأكل 60%، انخفاض السمنة 40%",
      impactEn: "60% improvement in eating habits, 40% reduction in obesity",
      image: "/assets/walking-initiative.jpg",
      publishDate: "2024-01-01",
      likes: 92,
      shares: 28,
      views: 1650,
      rating: 5,
      featured: false,
    },
  ];

  const categories = [
    { value: "all", label: language === "ar" ? "الكل" : "All" },
    { value: "صحة", label: language === "ar" ? "صحة" : "Health" },
    { value: "بيئة", label: language === "ar" ? "بيئة" : "Environment" },
    { value: "تعليم", label: language === "ar" ? "تعليم" : "Education" },
    { value: "مجتمع", label: language === "ar" ? "مجتمع" : "Community" },
    { value: "تقنية", label: language === "ar" ? "تقنية" : "Technology" },
    { value: "تغذية", label: language === "ar" ? "تغذية" : "Nutrition" },
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
    {
      value: "highest_rated",
      label: language === "ar" ? "الأعلى تقييماً" : "Highest Rated",
    },
  ];

  // Filter and sort stories
  const filteredStories = storiesData
    .filter((story) => {
      const matchesSearch =
        searchTerm === "" ||
        (language === "ar" ? story.title : story.titleEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === "ar" ? story.description : story.descriptionEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === "ar" ? story.author : story.authorEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        (language === "ar" ? story.category : story.categoryEn) ===
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
        case "highest_rated":
          return b.rating - a.rating;
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
        <div className="mb-8">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar" ? "قصص النجاح" : "Success Stories"}
          </h1>
          <p
            className={`text-xl text-muted-foreground ${
              isRTL ? "font-arabic text-right" : "font-sans text-left"
            }`}>
            {language === "ar"
              ? "اكتشف كيف غيرت مبادرتنا حياة الناس في مدينة حريملاء"
              : "Discover how our initiatives have changed people's lives in Huraymila"}
          </p>
        </div>

        {/* Search and Filters */}
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
                      ? "البحث في القصص..."
                      : "Search stories..."
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
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
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
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
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
              ? `عرض ${filteredStories.length} من ${storiesData.length} قصة`
              : `Showing ${filteredStories.length} of ${storiesData.length} stories`}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
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
                {story.featured && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {language === "ar" ? "مميز" : "Featured"}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="absolute top-4 right-4 bg-background/80">
                  {language === "ar" ? story.category : story.categoryEn}
                </Badge>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-background/80 px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{story.rating}</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle
                  className={`text-lg line-clamp-2 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? story.title : story.titleEn}
                </CardTitle>
                <CardDescription
                  className={`line-clamp-3 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? story.description : story.descriptionEn}
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
                      {language === "ar" ? story.author : story.authorEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {language === "ar" ? story.location : story.locationEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(story.publishDate)}</span>
                  </div>
                </div>

                {/* Impact */}
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <p
                      className={`text-sm text-green-800 dark:text-green-200 ${
                        isRTL ? "font-arabic text-right" : "font-sans text-left"
                      }`}>
                      {language === "ar" ? story.impact : story.impactEn}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{story.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{story.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      <span>{story.shares}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <Button
                  className="w-full group-hover:bg-primary/90 transition-colors"
                  onClick={() => navigateToTop(`/success-stories/${story.id}`)}>
                  {language === "ar" ? "اقرأ القصة" : "Read Story"}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredStories.length === 0 && (
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
        )}
      </div>
    </div>
  );
};

export default AllSuccessStories;
