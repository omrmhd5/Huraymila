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
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { language, theme, setLanguage, setTheme } = useTheme();
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
    { href: "/", label: language === "ar" ? "الرئيسية" : "Home" },
    { href: "/about", label: language === "ar" ? " عن البرنامج" : "About" },
    {
      href: "/about-huraymila",
      label: language === "ar" ? "عن حريملاء" : "About Huraymila",
    },
    {
      href: "/initiatives",
      label: language === "ar" ? "المبادرات" : "Initiatives",
    },
    { href: "/news", label: language === "ar" ? "الأخبار" : "News" },
    {
      href: "/success-stories",
      label: language === "ar" ? "قصص النجاح" : "Success Stories",
    },
    { href: "/contact", label: language === "ar" ? "اتصل بنا" : "Contact" },
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
                {language === "ar"
                  ? "مدينة حريملاء الصحية"
                  : "Huraymila Healthy City"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === "ar" ? "مبادرة وطنية" : "National Initiative"}
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
                  className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block text-sm">
                    {user.email?.split("@")[0] || "User"}
                  </span>
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigateToTop("/admin");
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left">
                      <User className="w-4 h-4" />
                      {language === "ar" ? "لوحة التحكم" : "Dashboard"}
                    </button>

                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive">
                      <LogOut className="w-4 h-4" />
                      {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => navigateToTop("/auth")}>
                  {language === "ar"
                    ? "تسجيل الدخول / إنشاء حساب"
                    : "Sign In / Sign Up"}
                </Button>
              </div>
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
              <div className="flex items-center gap-2 pt-4 border-t border-border">
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
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
