import React from "react";

import InitiativesSection from "@/components/Home/InitiativesSection";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Initiatives = () => {
  const { loading } = useAuth();
  const { language } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {language === "ar" ? "المبادرات" : "Initiatives"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "اكتشف المبادرات الصحية النشطة في مدينة حريملاء"
              : "Discover active health initiatives in Harimlaa City"}
          </p>
        </div>
        <InitiativesSection />
      </main>
    </div>
  );
};

export default Initiatives;
