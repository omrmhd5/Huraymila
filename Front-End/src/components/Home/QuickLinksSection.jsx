import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, LogIn, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickLinksSection = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Navigation helper function
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    {
      id: 1,
      title: t("quickLinksSection.links.submitReport"),
      icon: FileText,
      color: "bg-red-500",
      href: "/report",
    },
    {
      id: 2,
      title: t("quickLinksSection.links.volunteerInInitiatives"),
      icon: Users,
      color: "bg-green-500",
      href: "/initiatives",
    },
    {
      id: 3,
      title: t("quickLinksSection.links.login"),
      icon: LogIn,
      color: "bg-blue-500",
      href: "/login",
    },
  ];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("quickLinksSection.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("quickLinksSection.subtitle")}
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Card
                key={link.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                <CardContent className="p-8">
                  <div
                    className={`w-20 h-20 ${link.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {link.title}
                  </h3>

                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => navigateToTop(link.href)}>
                    {t("quickLinksSection.getStarted")}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
