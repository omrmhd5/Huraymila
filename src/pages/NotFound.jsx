import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { language } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("notFound.title")}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t("notFound.description")}
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              {t("notFound.home")}
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("notFound.goBack")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
