import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Plus,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { successStoryApi } from "@/lib/successStoryApi";

const AllSuccessStories = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    author: "",
    date: "",
    quote: "",
    before: "",
    after: "",
  });

  const isRTL = language === "ar";

  // Fetch success stories from API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setLoading(true);
        const response = await successStoryApi.getAllSuccessStories({
          limit: 100,
        });
        setStoriesData(response.data || []);
      } catch (error) {
        console.error("Error fetching success stories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Mock success stories data (fallback)
  const mockStoriesData = [
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
    { value: "all", label: t("allSuccessStories.all") },
    { value: "صحة", label: t("allSuccessStories.health") },
    { value: "بيئة", label: t("allSuccessStories.environment") },
    { value: "تعليم", label: t("allSuccessStories.education") },
    { value: "مجتمع", label: t("allSuccessStories.community") },
    { value: "تقنية", label: t("allSuccessStories.technology") },
    { value: "تغذية", label: t("allSuccessStories.nutrition") },
  ];

  const sortOptions = [
    { value: "newest", label: t("allSuccessStories.newest") },
    { value: "oldest", label: t("allSuccessStories.oldest") },
    {
      value: "most_viewed",
      label: t("allSuccessStories.mostViewed"),
    },
    {
      value: "most_liked",
      label: t("allSuccessStories.mostLiked"),
    },
    {
      value: "highest_rated",
      label: t("allSuccessStories.highestRated"),
    },
  ];

  // Filter and sort stories
  const filteredStories = storiesData
    .filter((story) => {
      const matchesSearch =
        searchTerm === "" ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.quote.toLowerCase().includes(searchTerm.toLowerCase());

      // For now, we'll show all stories since we don't have categories in the new model
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert(
          language === "ar"
            ? "خطأ في المصادقة. يرجى تسجيل الدخول أولاً."
            : "Authentication error. Please login first."
        );
        return;
      }

      await successStoryApi.createSuccessStory(token, formData);

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        author: "",
        date: "",
        quote: "",
        before: "",
        after: "",
      });
      setIsModalOpen(false);

      // Refresh data
      const response = await successStoryApi.getAllSuccessStories({
        limit: 100,
      });
      setStoriesData(response.data || []);

      // Show success message
      alert(
        language === "ar"
          ? "تم إضافة قصة النجاح بنجاح!"
          : "Success story added successfully!"
      );
    } catch (error) {
      console.error("Error creating success story:", error);
      alert(
        language === "ar"
          ? "فشل في إضافة قصة النجاح: " + error.message
          : "Failed to add success story: " + error.message
      );
    }
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
              {t("allSuccessStories.title")}
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
        </AnimatedSection>

        {/* Add Story Button */}
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className="mb-8 flex justify-end">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("allSuccessStories.addStory")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {language === "ar"
                      ? "إضافة قصة نجاح جديدة"
                      : "Add New Success Story"}
                  </DialogTitle>
                  <DialogDescription>
                    {language === "ar"
                      ? "شارك قصتك الملهمة مع المجتمع"
                      : "Share your inspiring story with the community"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        {t("allSuccessStories.titleField")}
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "أدخل عنوان قصة النجاح"
                            : "Enter success story title"
                        }
                        required
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">
                        {language === "ar" ? "العنوان الفرعي" : "Subtitle"}
                      </Label>
                      <Input
                        id="subtitle"
                        value={formData.subtitle}
                        onChange={(e) =>
                          handleInputChange("subtitle", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "أدخل العنوان الفرعي"
                            : "Enter subtitle"
                        }
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        {language === "ar"
                          ? "الوصف المختصر"
                          : "Short Description"}
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "وصف مختصر عن قصة النجاح"
                            : "Brief description of the success story"
                        }
                        rows={3}
                        required
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date">
                        {language === "ar" ? "التاريخ" : "Date"}
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        required
                      />
                    </div>

                    {/* Quote */}
                    <div className="space-y-2">
                      <Label htmlFor="quote">
                        {language === "ar" ? "الاقتباس" : "Quote"}
                      </Label>
                      <Textarea
                        id="quote"
                        value={formData.quote}
                        onChange={(e) =>
                          handleInputChange("quote", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "أدخل اقتباس من قصة النجاح"
                            : "Enter a quote from the success story"
                        }
                        rows={2}
                        required
                      />
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                      <Label htmlFor="author">
                        {t("allSuccessStories.author")}
                      </Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) =>
                          handleInputChange("author", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "اسم المؤلف أو الشخص المسؤول"
                            : "Author name or responsible person"
                        }
                        required
                      />
                    </div>

                    {/* Before */}
                    <div className="space-y-2">
                      <Label htmlFor="before">
                        {t("allSuccessStories.before")}
                      </Label>
                      <Textarea
                        id="before"
                        value={formData.before}
                        onChange={(e) =>
                          handleInputChange("before", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "وصف الحالة قبل المبادرة (مثال: كان وزني 100 كجم، لم أكن أمارس الرياضة)"
                            : "Describe the situation before the initiative (e.g., I weighed 100kg, I didn't exercise)"
                        }
                        rows={3}
                        required
                      />
                    </div>

                    {/* After */}
                    <div className="space-y-2">
                      <Label htmlFor="after">
                        {t("allSuccessStories.after")}
                      </Label>
                      <Textarea
                        id="after"
                        value={formData.after}
                        onChange={(e) =>
                          handleInputChange("after", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "وصف الحالة بعد المبادرة (مثال: أصبح وزني 75 كجم، أمارس الرياضة بانتظام)"
                            : "Describe the situation after the initiative (e.g., I now weigh 75kg, I exercise regularly)"
                        }
                        rows={3}
                        required
                      />
                    </div>

                    {/* Body/Actual Text */}
                    <div className="space-y-2">
                      <Label htmlFor="body">
                        {t("allSuccessStories.fullStory")}
                      </Label>
                      <Textarea
                        id="body"
                        value={formData.body}
                        onChange={(e) =>
                          handleInputChange("body", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "اكتب القصة كاملة بالتفصيل"
                            : "Write the complete story in detail"
                        }
                        rows={6}
                        required
                      />
                    </div>

                    {/* Author's Comment */}
                    <div className="space-y-2">
                      <Label htmlFor="authorComment">
                        {language === "ar"
                          ? "تعليق المؤلف"
                          : "Author's Comment"}
                      </Label>
                      <Textarea
                        id="authorComment"
                        value={formData.authorComment}
                        onChange={(e) =>
                          handleInputChange("authorComment", e.target.value)
                        }
                        placeholder={
                          language === "ar"
                            ? "تعليق شخصي أو نصيحة من المؤلف"
                            : "Personal comment or advice from the author"
                        }
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}>
                      {t("allSuccessStories.cancel")}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90">
                      {t("allSuccessStories.addStoryButton")}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}>
                  <SelectTrigger
                    className={
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }>
                    <SelectValue
                      placeholder={t("allSuccessStories.category")}
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
                    <SelectValue placeholder={t("allSuccessStories.sort")} />
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
                ? `عرض ${filteredStories.length} من ${storiesData.length} قصة`
                : `Showing ${filteredStories.length} of ${storiesData.length} stories`}
            </p>
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <AnimatedSection animation="fadeInUp" delay={300}>
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p
                className={`text-muted-foreground ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "جاري تحميل قصص النجاح..."
                  : "Loading success stories..."}
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Error State */}
        {error && (
          <AnimatedSection animation="fadeInUp" delay={300}>
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
          </AnimatedSection>
        )}

        {/* Stories Grid */}
        {!loading && !error && (
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={150}
            animation="fadeInUp">
            {filteredStories.map((story, index) => (
              <AnimatedCard
                key={story._id || story.id}
                animation="fadeInUp"
                delay={index * 150}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Story Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={
                      story.imageUrl
                        ? successStoryApi.getImageUrl(story.imageUrl)
                        : "/assets/placeholder.svg"
                    }
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {story.priority && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {story.priority}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle
                    className={`text-lg line-clamp-2 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {story.title}
                  </CardTitle>
                  <CardDescription
                    className={`line-clamp-3 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {story.subtitle}
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
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(story.date)}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Quote className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p
                        className={`text-sm text-blue-800 dark:text-blue-200 italic ${
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        "{story.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={() =>
                      navigateToTop(`/success-stories/${story._id || story.id}`)
                    }>
                    {t("allSuccessStories.readStory")}
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
        {!loading && !error && filteredStories.length === 0 && (
          <AnimatedSection animation="fadeInUp" delay={400}>
            <div className="text-center py-12">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {t("common.noResults")}
              </h3>
              <p
                className={`text-muted-foreground ${
                  isRTL ? "font-arabic" : "font-sans"
                }`}>
                {t("common.tryDifferentFilters")}
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default AllSuccessStories;
