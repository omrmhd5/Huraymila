import HeroSection from "@/components/Home/HeroSection";
import AboutSection from "@/components/Home/AboutSection";
import InitiativesSection from "@/components/Home/InitiativesSection";
import InteractiveMap from "@/components/Home/InteractiveMap";
import NewsSection from "@/components/Home/NewsSection";
import SuccessStories from "@/components/Home/SuccessStories";
import PartnersSection from "@/components/Home/PartnersSection";
import QuickLinksSection from "@/components/Home/QuickLinksSection";
import HealthDashboard from "@/components/Home/HealthDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Home = () => {
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
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <AboutSection />
        <QuickLinksSection />
        <NewsSection />
        <SuccessStories />
        <HealthDashboard />
        {/* <InteractiveMap /> */}
        <InitiativesSection />
        <PartnersSection />
      </main>
    </div>
  );
};

export default Home;
