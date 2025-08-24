import { cn } from "@/lib/utils";
import { Heart, Building, GraduationCap, Droplets, Car, Shield, Globe, Briefcase } from "lucide-react";

const PartnersLogos = () => {
  const content = {
    ar: {
      title: "شركاؤنا في النجاح",
      partners: [
        { name: "منظمة الصحة العالمية", icon: Heart, category: "دولي" },
        { name: "وزارة الصحة", icon: Heart, category: "حكومي" },
        { name: "بلدية حريملاء", icon: Building, category: "محلي" },
        { name: "إدارة التعليم", icon: GraduationCap, category: "تعليمي" },
        { name: "شركة المياه الوطنية", icon: Droplets, category: "خدمي" },
        { name: "إدارة المرور", icon: Car, category: "أمني" },
        { name: "الدفاع المدني", icon: Shield, category: "أمني" },
        { name: "وزارة البيئة", icon: Globe, category: "حكومي" },
        { name: "غرفة التجارة", icon: Briefcase, category: "تجاري" },
        { name: "الهلال الأحمر", icon: Heart, category: "إنساني" },
        { name: "أمانة المنطقة", icon: Building, category: "حكومي" },
        { name: "إدارة الزراعة", icon: Globe, category: "حكومي" },
        { name: "جمعية خيرية", icon: Heart, category: "خيري" },
        { name: "مركز الأحياء", icon: Building, category: "مجتمعي" },
        { name: "النادي الأدبي", icon: GraduationCap, category: "ثقافي" },
        { name: "مركز الشباب", icon: Briefcase, category: "شبابي" },
        { name: "جمعية المهندسين", icon: Building, category: "مهني" },
        { name: "نادي كبار السن", icon: Heart, category: "اجتماعي" },
        { name: "مركز المرأة", icon: Heart, category: "اجتماعي" },
        { name: "رابطة الأطباء", icon: Heart, category: "طبي" }
      ]
    },
    en: {
      title: "Our Success Partners",
      partners: [
        { name: "World Health Organization", icon: Heart, category: "International" },
        { name: "Ministry of Health", icon: Heart, category: "Government" },
        { name: "Harimlaa Municipality", icon: Building, category: "Local" },
        { name: "Education Department", icon: GraduationCap, category: "Educational" },
        { name: "National Water Company", icon: Droplets, category: "Service" },
        { name: "Traffic Department", icon: Car, category: "Security" },
        { name: "Civil Defense", icon: Shield, category: "Security" },
        { name: "Ministry of Environment", icon: Globe, category: "Government" },
        { name: "Chamber of Commerce", icon: Briefcase, category: "Commercial" },
        { name: "Red Crescent", icon: Heart, category: "Humanitarian" },
        { name: "Regional Authority", icon: Building, category: "Government" },
        { name: "Agriculture Department", icon: Globe, category: "Government" },
        { name: "Charity Association", icon: Heart, category: "Charity" },
        { name: "Community Center", icon: Building, category: "Community" },
        { name: "Literary Club", icon: GraduationCap, category: "Cultural" },
        { name: "Youth Center", icon: Briefcase, category: "Youth" },
        { name: "Engineers Association", icon: Building, category: "Professional" },
        { name: "Senior Citizens Club", icon: Heart, category: "Social" },
        { name: "Women's Center", icon: Heart, category: "Social" },
        { name: "Doctors Association", icon: Heart, category: "Medical" }
      ]
    }
  };

  const current = content.ar; // Default to Arabic
  const isRTL = true; // Default to RTL

  const getCategoryColor = (category) => {
    const colors = {
      "دولي": "from-indigo-500 to-purple-600",
      "حكومي": "from-blue-500 to-blue-600",
      "محلي": "from-green-500 to-emerald-600",
      "تعليمي": "from-purple-500 to-violet-600",
      "خدمي": "from-orange-500 to-amber-600",
      "أمني": "from-red-500 to-rose-600",
      "تجاري": "from-teal-500 to-cyan-600",
      "إنساني": "from-pink-500 to-rose-600",
      "خيري": "from-emerald-500 to-green-600",
      "مجتمعي": "from-violet-500 to-purple-600",
      "ثقافي": "from-amber-500 to-orange-600",
      "شبابي": "from-cyan-500 to-blue-600",
      "مهني": "from-slate-500 to-gray-600",
      "اجتماعي": "from-rose-500 to-pink-600",
      "طبي": "from-red-500 to-rose-600",
      "International": "from-indigo-500 to-purple-600",
      "Government": "from-blue-500 to-blue-600",
      "Local": "from-green-500 to-emerald-600",
      "Educational": "from-purple-500 to-violet-600",
      "Service": "from-orange-500 to-amber-600",
      "Security": "from-red-500 to-rose-600",
      "Commercial": "from-teal-500 to-cyan-600",
      "Humanitarian": "from-pink-500 to-rose-600",
      "Charity": "from-emerald-500 to-green-600",
      "Community": "from-violet-500 to-purple-600",
      "Cultural": "from-amber-500 to-orange-600",
      "Youth": "from-cyan-500 to-blue-600",
      "Professional": "from-slate-500 to-gray-600",
      "Social": "from-rose-500 to-pink-600",
      "Medical": "from-red-500 to-rose-600"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <section className="py-12 bg-gradient-to-r from-muted/50 via-background to-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-bold text-center text-foreground mb-8">
          {current.title}
        </h3>

        {/* Partners Logos Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_60s_linear_infinite] hover:animate-none space-x-8 rtl:space-x-reverse">
            {/* First set */}
            {current.partners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-card hover:bg-card/80 rounded-lg border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer min-w-[140px]"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${getCategoryColor(partner.category)}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground text-center leading-tight">
                    {partner.name}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {partner.category}
                  </span>
                </div>
              );
            })}
            
            {/* Duplicate set for seamless loop */}
            {current.partners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-card hover:bg-card/80 rounded-lg border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer min-w-[140px]"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${getCategoryColor(partner.category)}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground text-center leading-tight">
                    {partner.name}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {partner.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Count */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-primary">20+</span> جهة شريكة تعمل معنا لتحقيق الرؤية
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersLogos;

