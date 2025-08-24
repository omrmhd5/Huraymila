import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import InitiativesCarousel from "@/components/InitiativesCarousel";
import InteractiveMapSimple from "@/components/InteractiveMapSimple";
import PartnersLogos from "@/components/PartnersLogos";
import OptimizedHealthDashboard from "@/components/OptimizedHealthDashboard";
import NewsSection from "@/components/NewsSection";
import SuccessStories from "@/components/SuccessStories";
import PartnersSection from "@/components/PartnersSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";

const Index = () => {
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
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <SuccessStories />
        <OptimizedHealthDashboard />
        <InitiativesCarousel />
        <InteractiveMapSimple />
        <InitiativesSection />
        <PartnersSection />
        <PartnersLogos />
        <QuickLinksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
