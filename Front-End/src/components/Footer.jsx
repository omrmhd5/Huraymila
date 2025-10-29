import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Heart,
  ArrowUp,
  Youtube,
  Music,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Custom X Logo Component
const XLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { language } = useTheme();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.initiatives"), href: "/initiatives" },
    { name: t("nav.contact"), href: "/contact" },
  ];
  const isRTL = language === "ar";

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ح</span>
              </div>
              <h3 className="text-lg font-bold text-primary">
                {t("nav.healthyCity")}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t("footer.madeWith")}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>{t("footer.inSaudiArabia")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.contactInfo")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {t("footer.address")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {t("footer.phone")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {t("footer.email")}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  {t("footer.workingHours")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-foreground mb-2">
                {t("footer.socialMedia")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("footer.socialMediaDesc")}
              </p>
              <p className="text-sm text-muted-foreground text-center md:text-right py-4">
                {t("footer.copyright")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <XLogo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Music className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="sm"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50">
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
};

export default Footer;
