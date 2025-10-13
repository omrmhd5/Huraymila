import React, { useState, useEffect } from "react";
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
  Leaf,
  Users,
  Target,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { initiativeApi } from "@/lib/initiativeApi";

const InitiativesSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch approved initiatives from API
  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        setLoading(true);
        const response = await initiativeApi.getAllInitiatives({ limit: 3 });
        setInitiatives(response.data || []);
      } catch (error) {
        console.error("Error fetching initiatives:", error);
        setInitiatives([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  const isRTL = language === "ar";

  const getCategoryBadge = (category) => {
    const categoryLabels = {
      health: {
        ar: t("initiativesSection.categories.health"),
        en: t("initiativesSection.categories.health"),
        color: "bg-red-500",
      },
      environment: {
        ar: t("initiativesSection.categories.environment"),
        en: t("initiativesSection.categories.environment"),
        color: "bg-green-500",
      },
      community: {
        ar: t("initiativesSection.categories.community"),
        en: t("initiativesSection.categories.community"),
        color: "bg-blue-500",
      },
      education: {
        ar: t("initiativesSection.categories.education"),
        en: t("initiativesSection.categories.education"),
        color: "bg-purple-500",
      },
    };

    const categoryInfo = categoryLabels[category];

    // Handle undefined category
    if (!categoryInfo) {
      return (
        <Badge variant="default" className="bg-gray-500">
          {category || "Other"}
        </Badge>
      );
    }

    return (
      <Badge variant="default" className={categoryInfo.color}>
        {language === "ar" ? categoryInfo.ar : categoryInfo.en}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusLabels = {
      active: {
        ar: t("initiativesSection.status.active"),
        en: t("initiativesSection.status.active"),
        color: "bg-green-500",
      },
      completed: {
        ar: t("initiativesSection.status.completed"),
        en: t("initiativesSection.status.completed"),
        color: "bg-blue-500",
      },
      planning: {
        ar: t("initiativesSection.status.planning"),
        en: t("initiativesSection.status.planning"),
        color: "bg-yellow-500",
      },
      "gathering volunteers": {
        ar: "جمع المتطوعين",
        en: "Gathering Volunteers",
        color: "bg-orange-500",
      },
    };

    const statusInfo = statusLabels[status];

    // Handle undefined status
    if (!statusInfo) {
      return (
        <Badge variant="default" className="bg-gray-500">
          {status || "Unknown"}
        </Badge>
      );
    }

    return (
      <Badge variant="default" className={statusInfo.color}>
        {language === "ar" ? statusInfo.ar : statusInfo.en}
      </Badge>
    );
  };

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

  return (
    <section className="py-20 bg-secondary/15">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {t("initiativesSection.title")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("initiativesSection.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("initiativesSection.subtitle")}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
            {t("initiativesSection.description")}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {language === "ar"
                ? "جاري تحميل المبادرات..."
                : "Loading initiatives..."}
            </p>
          </div>
        )}

        {/* Initiatives Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {initiatives.slice(0, 3).map((initiative) => (
              <Card
                key={initiative.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Initiative Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={
                      initiative.imageUrl
                        ? `${
                            import.meta.env.VITE_API_BASE_URL?.replace(
                              "/api",
                              ""
                            ) || "http://localhost:5000"
                          }${initiative.imageUrl}`
                        : "/assets/health-workshop.jpg"
                    }
                    alt={initiative.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {initiative.category &&
                      getCategoryBadge(initiative.category)}
                    {initiative.status && getStatusBadge(initiative.status)}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl mb-2">
                    {initiative.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {initiative.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  {initiative.status !== "planning" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {initiative.volunteers?.length || 0}{" "}
                          {t("initiativesSection.details.of")}{" "}
                          {initiative.maxVolunteers || 0}{" "}
                          {t("initiativesSection.details.participants")}
                        </span>
                        <span className="font-medium">
                          {initiative.maxVolunteers
                            ? Math.round(
                                ((initiative.volunteers?.length || 0) /
                                  initiative.maxVolunteers) *
                                  100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              initiative.maxVolunteers
                                ? ((initiative.volunteers?.length || 0) /
                                    initiative.maxVolunteers) *
                                  100
                                : 0
                            }%`,
                          }}></div>
                      </div>
                      <p
                        className={`text-xs text-muted-foreground ${
                          isRTL
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {initiative.maxVolunteers -
                          (initiative.volunteers?.length || 0)}{" "}
                        {t("initiativesSection.details.participantsNeeded")}
                      </p>
                    </div>
                  )}

                  {/* Initiative Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {t("initiativesSection.details.startDate")}
                        </p>
                        <p className="text-muted-foreground">
                          {formatDate(initiative.startDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {t("initiativesSection.details.endDate")}
                        </p>
                        <p className="text-muted-foreground">
                          {formatDate(initiative.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {t("initiativesSection.details.location")}
                        </p>
                        <p className="text-muted-foreground">
                          {initiative.location || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {t("initiativesSection.details.participantsLabel")}
                        </p>
                        <p className="text-muted-foreground">
                          {initiative.volunteers?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={() =>
                      navigateToTop(
                        `/initiatives/${initiative._id || initiative.id}`
                      )
                    }>
                    {t("initiativesSection.details.viewDetails")}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
            onClick={() => navigateToTop("/initiatives")}>
            {t("initiativesSection.viewAll")}
            <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;
