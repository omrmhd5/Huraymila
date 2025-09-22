import HeroSection from "@/components/Home/HeroSection";
import AboutSection from "@/components/Home/AboutSection";
import InitiativesSection from "@/components/Home/InitiativesSection";
import InteractiveMap from "@/components/Home/InteractiveMap";
import NewsSection from "@/components/Home/NewsSection";
import SuccessStories from "@/components/Home/SuccessStories";
import PartnersSection from "@/components/Home/PartnersSection";
import SuccessPartners from "@/components/Home/SuccessPartners";
import QuickLinksSection from "@/components/Home/QuickLinksSection";
import HealthDashboard from "@/components/Home/HealthDashboard";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { loading } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <AnimatedSection animation="fadeIn" delay={0} duration={400}>
          <HeroSection />
        </AnimatedSection>
        <AnimatedSection animation="fadeInUp" delay={50} duration={400}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection animation="fadeInUp" delay={100} duration={400}>
          <SuccessStories />
        </AnimatedSection>
        <AnimatedSection animation="fadeInRight" delay={150} duration={400}>
          <NewsSection />
        </AnimatedSection>
        <AnimatedSection animation="scaleIn" delay={200} duration={400}>
          <HealthDashboard />
        </AnimatedSection>
        {/* <InteractiveMap /> */}
        <AnimatedSection animation="fadeInUp" delay={250} duration={400}>
          <InitiativesSection />
        </AnimatedSection>
        <AnimatedSection animation="fadeInDown" delay={300} duration={400}>
          <PartnersSection />
        </AnimatedSection>
        <AnimatedSection animation="fadeInUp" delay={325} duration={400}>
          <SuccessPartners />
        </AnimatedSection>
        <AnimatedSection animation="fadeInLeft" delay={350} duration={400}>
          <QuickLinksSection />
        </AnimatedSection>
      </main>
    </div>
  );
};

export default Home;
