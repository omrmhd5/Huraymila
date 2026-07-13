import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  ArrowRight,
  Plus,
} from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateUtils";
import { successStoryApi } from "@/lib/successStoryApi";

const AllSuccessStories = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  // Fetch success stories from API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setLoading(true);
        const response = await successStoryApi.getAllSuccessStories({ limit: 100 });
        setStoriesData(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuccessStories();
  }, []);

  const sortOptions = [
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "oldest", label: language === "ar" ? "الأقدم" : "Oldest" },
  ];

  // Filter and sort
  const filteredStories = storiesData
    .filter((story) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        (story.author || "").toLowerCase().includes(term) ||
        (story.description || "").toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
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
              {language === "ar" ? "قصص النجاح" : "Success Stories"}
            </h1>
            <p
              className={`text-xl text-muted-foreground ${
                isRTL ? "font-arabic text-right" : "font-sans text-left"
              }`}>
              {language === "ar"
                ? "اكتشف كيف غيرت مبادرتنا حياة الناس في محافظة حريملاء"
                : "Discover how our initiatives have changed people's lives in Huraymila"}
            </p>
          </div>
        </AnimatedSection>

        {/* Add Story Button */}
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className={`mb-8 flex ${isRTL ? "justify-start" : "justify-end"}`}>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                navigate("/contact?subject=successStories");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}>
              <Plus className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {language === "ar" ? "شارك قصة نجاحك" : "Share Your Story"}
            </Button>
          </div>
        </AnimatedSection>

        {/* Search & Sort */}
        <AnimatedSection animation="fadeInUp" delay={200}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                    isRTL ? "right-3" : "left-3"
                  }`}
                />
                <Input
                  placeholder={language === "ar" ? "البحث في القصص..." : "Search stories..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={isRTL ? "font-arabic text-right pr-10" : "font-sans text-left pl-10"}
                />
              </div>

              {/* Sort */}
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className={isRTL ? "font-arabic text-right" : "font-sans text-left"}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className={isRTL ? "font-arabic text-right" : "font-sans text-left"}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <p className={`text-sm text-muted-foreground ${isRTL ? "font-arabic text-right" : "font-sans text-left"}`}>
              {language === "ar"
                ? `عرض ${filteredStories.length} من ${storiesData.length} قصة`
                : `Showing ${filteredStories.length} of ${storiesData.length} stories`}
            </p>
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <AnimatedSection animation="fadeInUp" delay={300}>
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className={`text-muted-foreground ${isRTL ? "font-arabic" : "font-sans"}`}>
                {language === "ar" ? "جاري تحميل قصص النجاح..." : "Loading success stories..."}
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Error */}
        {error && (
          <AnimatedSection animation="fadeInUp" delay={300}>
            <div className="text-center py-16">
              <p className={`text-destructive ${isRTL ? "font-arabic" : "font-sans"}`}>{error}</p>
            </div>
          </AnimatedSection>
        )}

        {/* Stories Grid */}
        {!loading && !error && filteredStories.length > 0 && (
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={120}
            animation="fadeInUp">
            {filteredStories.map((story, index) => (
              <AnimatedCard
                key={story._id || story.id}
                animation="fadeInUp"
                delay={index * 100}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">

                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-lg line-clamp-1 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {story.author}
                  </CardTitle>
                  <CardDescription
                    className={`line-clamp-3 ${
                      isRTL ? "font-arabic text-right" : "font-sans text-left"
                    }`}>
                    {story.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                  {/* Meta */}
                  <div
                    className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground ${
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

                  {/* Read More */}
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={() => navigateToTop(`/success-stories/${story._id || story.id}`)}>
                    {language === "ar" ? "اقرأ القصة" : "Read Story"}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Button>
                </CardContent>
              </AnimatedCard>
            ))}
          </StaggeredContainer>
        )}

        {/* No results */}
        {!loading && !error && filteredStories.length === 0 && (
          <AnimatedSection animation="fadeInUp" delay={400}>
            <div className="text-center py-16">
              <h3 className={`text-xl font-semibold mb-2 ${isRTL ? "font-arabic" : "font-sans"}`}>
                {language === "ar" ? "لا توجد نتائج" : "No results found"}
              </h3>
              <p className={`text-muted-foreground ${isRTL ? "font-arabic" : "font-sans"}`}>
                {language === "ar" ? "جرب بحثاً مختلفاً" : "Try a different search"}
              </p>
            </div>
          </AnimatedSection>
        )}

      </div>
    </div>
  );
};

export default AllSuccessStories;
