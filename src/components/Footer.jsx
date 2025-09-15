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

const Footer = () => {
  const { language } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    ar: {
      description:
        "مبادرة مدينة حريملاء الصحية هي مشروع وطني يهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في المدينة من خلال مجموعة من البرامج والمبادرات المتنوعة.",
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { name: "الرئيسية", href: "/" },
          { name: "من نحن", href: "/about" },
          { name: "المبادرات", href: "/initiatives" },
          { name: "التطوع", href: "/volunteer" },
          { name: "اتصل بنا", href: "/contact" },
        ],
      },
      contact: {
        title: "معلومات التواصل",
        address: "مدينة حريملاء، منطقة الرياض، المملكة العربية السعودية",
        phone: "+966 11 234 5678",
        email: "info@huraymila-healthy.sa",
        workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م",
      },
      social: {
        title: "تابعنا على وسائل التواصل",
        description: "للحصول على آخر الأخبار والتحديثات",
      },
      bottom: {
        copyright: "© 2024 مبادرة مدينة حريملاء الصحية. جميع الحقوق محفوظة.",
        madeWith: "صنع بـ",
      },
    },
    en: {
      description:
        "Huraymila Healthy City Initiative is a national project aimed at promoting public health and improving quality of life in the city through a variety of programs and initiatives.",
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Initiatives", href: "/initiatives" },
          { name: "Volunteer", href: "/volunteer" },
          { name: "Contact", href: "/contact" },
        ],
      },
      contact: {
        title: "Contact Information",
        address: "Huraymila City, Riyadh Region, Saudi Arabia",
        phone: "+966 11 234 5678",
        email: "info@huraymila-healthy.sa",
        workingHours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
      },
      social: {
        title: "Follow Us on Social Media",
        description: "For latest news and updates",
      },
      bottom: {
        copyright:
          "© 2024 Huraymila Healthy City Initiative. All rights reserved.",
        madeWith: "Made with",
      },
    },
  };

  const current = content[language];
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
                {language === "ar"
                  ? "مدينة حريملاء الصحية"
                  : "Huraymila Healthy City"}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {current.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{current.bottom.madeWith}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>
                {language === "ar"
                  ? "في المملكة العربية السعودية"
                  : "in Saudi Arabia"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {current.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {current.quickLinks.links.map((link) => (
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
              {current.contact.title}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {current.contact.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {current.contact.phone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {current.contact.email}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  {current.contact.workingHours}
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
                {current.social.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {current.social.description}
              </p>
              <p className="text-sm text-muted-foreground text-center md:text-right py-4">
                {current.bottom.copyright}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
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
