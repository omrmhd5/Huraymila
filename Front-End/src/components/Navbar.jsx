import React, { useState, useEffect, Profiler } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, theme, setLanguage, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/about-huraymila", label: t("nav.aboutHuraymila") },
    { href: "/initiatives", label: t("nav.initiatives") },
    { href: "/news", label: t("nav.news") },
    { href: "/success-stories", label: t("nav.successStories") },
    { href: "/faq", label: t("nav.faq") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 rounded-lg flex items-center justify-center">
              <img src="assets/Logo.png" alt="Logo" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">
                {t("nav.healthyCity")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("nav.nationalInitiative")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => navigateToTop(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageChange}
              className="hidden sm:flex">
              <Globe className="w-4 h-4" />
              <span className="ml-2 text-xs">
                {language === "ar" ? "EN" : "عربي"}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeChange}
              className="hidden sm:flex">
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleUserMenu}
                  className={`flex items-center gap-2 ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block text-sm">
                    {user.email || user.name || "User"}
                  </span>
                </Button>

                {isUserMenuOpen && (
                  <div
                    className={`absolute ${
                      language === "ar" ? "left-0" : "right-0"
                    } mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50`}>
                    <div
                      className={`px-4 py-2 border-b border-border ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}>
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.type === "governor"
                          ? language === "ar"
                            ? "المحافظ"
                            : "Governor"
                          : user.type === "agency"
                          ? language === "ar"
                            ? "الوكالة"
                            : "Agency"
                          : user.type === "volunteer"
                          ? language === "ar"
                            ? "متطوع"
                            : "Volunteer"
                          : "User"}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const dashboardPath =
                          user.type === "governor"
                            ? "/admin"
                            : user.type === "agency"
                            ? "/agency-dashboard"
                            : user.type === "volunteer"
                            ? "/volunteer-dashboard"
                            : "/";
                        navigateToTop(dashboardPath);
                        setIsUserMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full ${
                        language === "ar"
                          ? "text-right flex-row-reverse"
                          : "text-left"
                      }`}>
                      <User className="w-4 h-4" />
                      {t("nav.dashboard")}
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-destructive ${
                        language === "ar"
                          ? "text-right flex-row-reverse"
                          : "text-left"
                      }`}>
                      <LogOut className="w-4 h-4" />
                      {t("nav.signOut")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button size="sm" onClick={() => navigateToTop("/auth")}>
                {t("nav.signInSignUp")}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    navigateToTop(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}>
                  {item.label}
                </button>
              ))}

              {/* Mobile Controls */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLanguageChange}
                    className="flex-1">
                    <Globe className="w-4 h-4 mr-2" />
                    {language === "ar" ? "English" : "عربي"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleThemeChange}
                    className="flex-1">
                    {theme === "light" ? (
                      <Moon className="w-4 h-4" />
                    ) : (
                      <Sun className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    navigateToTop("/auth");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full">
                  {t("nav.signInSignUp")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
