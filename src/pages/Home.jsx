import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import InteractiveMap from "@/components/InteractiveMap";
import NewsSection from "@/components/NewsSection";
import SuccessStories from "@/components/SuccessStories";
import PartnersSection from "@/components/PartnersSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import { useAuth } from "@/contexts/AuthContext";
import HealthDashboard from "@/components/HealthDashboard";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <SuccessStories />
        <HealthDashboard />
        <InteractiveMap />
        <InitiativesSection />
        <PartnersSection />
        <QuickLinksSection />
      </main>
    </div>
  );
};

export default Home;
