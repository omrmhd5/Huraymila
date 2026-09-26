import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { successStoryApi } from "@/lib/successStoryApi";

const SuccessStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  useEffect(() => {
    const fetchSuccessStory = async () => {
      try {
        setLoading(true);
        const response = await successStoryApi.getSuccessStoryById(id);
        setStory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSuccessStory();
    }
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-muted-foreground ${isRTL ? "font-arabic" : "font-sans"}`}>
            {language === "ar" ? "جاري تحميل قصة النجاح..." : "Loading success story..."}
          </p>
        </div>
      </div>
    );
  }

  // Error / not found
  if (error || !story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isRTL ? "font-arabic" : "font-sans"}`}>
            {language === "ar" ? "قصة النجاح غير موجودة" : "Success story not found"}
          </h1>
          <Button onClick={() => navigate("/success-stories")}>
            {language === "ar" ? "العودة إلى قصص النجاح" : "Back to Stories"}
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
            onClick={() => navigate("/success-stories")}
            className="flex items-center gap-2">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {language === "ar" ? "العودة إلى قصص النجاح" : "Back to Stories"}
          </Button>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">

          {/* Story Header */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${isRTL ? "font-arabic" : "font-sans"}`}>
              {story.author}
            </h1>
            <div
              className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${
                isRTL ? "font-arabic justify-end" : "font-sans"
              }`}>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(story.date)}</span>
              </div>
            </div>
          </div>

          {story.imageUrl && (
            <img
              src={successStoryApi.getImageUrl(story.imageUrl)}
              alt={story.author}
              className="w-full h-80 object-cover rounded-xl"
            />
          )}

          {/* Story Message */}
          <Card>
            <CardContent className="p-6">
              <h2
                className={`text-lg font-semibold mb-3 ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}>
                {language === "ar" ? "الرسالة" : "Message"}
              </h2>
              <p
                className={`text-base leading-relaxed text-foreground ${
                  isRTL ? "font-arabic text-right" : "font-sans text-left"
                }`}>
                {story.description}
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          {(story.email || story.phone) && (
            <Card>
              <CardContent className="p-6">
                <h2
                  className={`text-lg font-semibold mb-4 ${
                    isRTL ? "font-arabic text-right" : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "معلومات التواصل" : "Contact Information"}
                </h2>
                <div className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                  {story.email && (
                    <div
                      className={`flex items-center gap-3 text-sm text-muted-foreground ${
                        isRTL ? "font-arabic flex-row-reverse justify-end" : "font-sans"
                      }`}>
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>{story.email}</span>
                    </div>
                  )}
                  {story.phone && (
                    <div
                      className={`flex items-center gap-3 text-sm text-muted-foreground ${
                        isRTL ? "font-arabic flex-row-reverse justify-end" : "font-sans"
                      }`}>
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{story.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back button at bottom */}
          <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
            <Button
              variant="outline"
              onClick={() => navigate("/success-stories")}>
              {language === "ar" ? "العودة إلى قصص النجاح" : "Back to Stories"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
