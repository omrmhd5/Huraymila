import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, LogIn, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const QuickLinksSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "روابط سريعة",
      subtitle: "الوصول السريع للخدمات المهمة",
    },
    en: {
      title: "Quick Links",
      subtitle: "Quick access to important services",
    },
  };

  const quickLinks = [
    {
      id: 1,
      title: "تقديم بلاغ",
      titleEn: "Submit Report",
      icon: FileText,
      color: "bg-red-500",
      href: "/report",
    },
    {
      id: 2,
      title: "تطوع في مبادرات",
      titleEn: "Volunteer in Initiatives",
      icon: Users,
      color: "bg-green-500",
      href: "/volunteer",
    },
    {
      id: 3,
      title: "تسجيل الدخول",
      titleEn: "Login",
      icon: LogIn,
      color: "bg-blue-500",
      href: "/login",
    },
  ];

  const current = content[language];
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.subtitle}
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
                    {language === "ar" ? link.title : link.titleEn}
                  </h3>

                  <Link to={link.href}>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {language === "ar" ? "ابدأ الآن" : "Get Started"}
                      <ArrowRight
                        className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                      />
                    </Button>
                  </Link>
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
