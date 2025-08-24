import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Leaf, 
  Users, 
  Target, 
  Calendar,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  FileText,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const QuickLinksSection = () => {
  const { language } = useTheme();

  const content = {
    ar: {
      title: "روابط سريعة",
      subtitle: "الوصول السريع للخدمات والمعلومات المهمة",
      description: "نوفر لك روابط سريعة للوصول إلى الخدمات والمعلومات المهمة في مدينة حريملاء الصحية.",
      categories: {
        services: "الخدمات",
        resources: "الموارد",
        contact: "التواصل",
        downloads: "التحميلات"
      }
    },
    en: {
      title: "Quick Links",
      subtitle: "Quick access to important services and information",
      description: "We provide you with quick links to access important services and information in Harimlaa Healthy City.",
      categories: {
        services: "Services",
        resources: "Resources",
        contact: "Contact",
        downloads: "Downloads"
      }
    }
  };

  const quickLinks = [
    {
      id: 1,
      title: "التسجيل في المبادرات",
      titleEn: "Register for Initiatives",
      description: "انضم إلى المبادرات الصحية النشطة في المدينة",
      descriptionEn: "Join active health initiatives in the city",
      category: "services",
      icon: Target,
      color: "bg-blue-500",
      href: "/initiatives",
      badge: "جديد",
      badgeEn: "New"
    },
    {
      id: 2,
      title: "التطوع",
      titleEn: "Volunteer",
      description: "سجل كمتطوع وساعد في بناء مدينة صحية",
      descriptionEn: "Register as a volunteer and help build a healthy city",
      category: "services",
      icon: Users,
      color: "bg-green-500",
      href: "/volunteer",
      badge: "مطلوب",
      badgeEn: "Needed"
    },
    {
      id: 3,
      title: "التوعية الصحية",
      titleEn: "Health Awareness",
      description: "تعرف على أحدث المعلومات الصحية والنصائح",
      descriptionEn: "Learn about the latest health information and tips",
      category: "resources",
      icon: Heart,
      color: "bg-red-500",
      href: "/awareness",
      badge: "محدث",
      badgeEn: "Updated"
    },
    {
      id: 4,
      title: "التقارير الصحية",
      titleEn: "Health Reports",
      description: "اطلع على التقارير الصحية الشهرية والسنوية",
      descriptionEn: "View monthly and annual health reports",
      category: "resources",
      icon: FileText,
      color: "bg-purple-500",
      href: "/reports",
      badge: "شهري",
      badgeEn: "Monthly"
    },
    {
      id: 5,
      title: "الملاحظات والتقييم",
      titleEn: "Feedback & Rating",
      description: "شاركنا آراءك وملاحظاتك لتحسين الخدمات",
      descriptionEn: "Share your opinions and feedback to improve services",
      category: "contact",
      icon: Heart,
      color: "bg-orange-500",
      href: "/feedback",
      badge: "مهم",
      badgeEn: "Important"
    },
    {
      id: 6,
      title: "البلاغات البيئية",
      titleEn: "Environmental Reports",
      description: "بلغ عن المشاكل البيئية في المدينة",
      descriptionEn: "Report environmental issues in the city",
      category: "services",
      icon: Leaf,
      color: "bg-green-600",
      href: "/environmental-report",
      badge: "24/7",
      badgeEn: "24/7"
    },
    {
      id: 7,
      title: "تحميل الأدلة",
      titleEn: "Download Guides",
      description: "حمّل الأدلة الإرشادية والنماذج المهمة",
      descriptionEn: "Download important guides and forms",
      category: "downloads",
      icon: Download,
      color: "bg-indigo-500",
      href: "/downloads",
      badge: "PDF",
      badgeEn: "PDF"
    },
    {
      id: 8,
      title: "الموقع الإلكتروني",
      titleEn: "Website",
      description: "زور موقعنا الإلكتروني للحصول على معلومات أكثر",
      descriptionEn: "Visit our website for more information",
      category: "resources",
      icon: Globe,
      color: "bg-cyan-500",
      href: "https://harimlaa-healthy.city",
      badge: "خارجي",
      badgeEn: "External"
    }
  ];

  const contactInfo = [
    {
      title: "الهاتف",
      titleEn: "Phone",
      value: "+966-11-123-4567",
      icon: Phone,
      color: "bg-green-500"
    },
    {
      title: "البريد الإلكتروني",
      titleEn: "Email",
      value: "info@harimlaa-healthy.city",
      icon: Mail,
      color: "bg-blue-500"
    },
    {
      title: "العنوان",
      titleEn: "Address",
      value: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
      valueEn: "Harimlaa City, Riyadh, Saudi Arabia",
      icon: MapPin,
      color: "bg-purple-500"
    },
    {
      title: "ساعات العمل",
      titleEn: "Working Hours",
      value: "الأحد - الخميس: 8:00 ص - 4:00 م",
      valueEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
      icon: Calendar,
      color: "bg-orange-500"
    }
  ];

  const current = content[language];
  const isRTL = language === "ar";

  const getCategoryBadge = (category) => {
    const categoryLabels = {
      services: { ar: "الخدمات", en: "Services", color: "bg-blue-100 text-blue-700" },
      resources: { ar: "الموارد", en: "Resources", color: "bg-green-100 text-green-700" },
      contact: { ar: "التواصل", en: "Contact", color: "bg-purple-100 text-purple-700" },
      downloads: { ar: "التحميلات", en: "Downloads", color: "bg-orange-100 text-orange-700" }
    };

    const categoryInfo = categoryLabels[category];
    return (
      <Badge variant="outline" className={categoryInfo.color}>
        {language === "ar" ? categoryInfo.ar : categoryInfo.en}
      </Badge>
    );
  };

  const getStatusBadge = (badge, badgeEn) => {
    const badgeColors = {
      "جديد": "bg-green-500",
      "New": "bg-green-500",
      "مطلوب": "bg-blue-500",
      "Needed": "bg-blue-500",
      "محدث": "bg-yellow-500",
      "Updated": "bg-yellow-500",
      "شهري": "bg-purple-500",
      "Monthly": "bg-purple-500",
      "مهم": "bg-red-500",
      "Important": "bg-red-500",
      "24/7": "bg-indigo-500",
      "PDF": "bg-gray-500",
      "خارجي": "bg-cyan-500",
      "External": "bg-cyan-500"
    };

    const color = badgeColors[badge] || badgeColors[badgeEn] || "bg-gray-500";
    return (
      <Badge variant="default" className={color}>
        {language === "ar" ? badge : badgeEn}
      </Badge>
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {language === "ar" ? "الروابط السريعة" : "Quick Links"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {current.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Card key={link.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {getStatusBadge(link.badge, link.badgeEn)}
                  </div>
                  {getCategoryBadge(link.category)}
                </CardHeader>

                <CardContent>
                  <CardTitle className="text-lg mb-2">
                    {language === "ar" ? link.title : link.titleEn}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {language === "ar" ? link.description : link.descriptionEn}
                  </CardDescription>
                  
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {language === "ar" ? "زيارة الموقع" : "Visit Website"}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      </Button>
                    </a>
                  ) : (
                    <Link to={link.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {language === "ar" ? "عرض التفاصيل" : "View Details"}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            {language === "ar" ? "معلومات التواصل" : "Contact Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {language === "ar" ? info.title : info.titleEn}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? info.value : (info.valueEn || info.value)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="px-8 py-6 text-lg">
                {language === "ar" ? "اتصل بنا" : "Contact Us"}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                {language === "ar" ? "انضم إلينا" : "Join Us"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;

