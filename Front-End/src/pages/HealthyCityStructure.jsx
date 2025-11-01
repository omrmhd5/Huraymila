import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Leaf,
  Users,
  Heart,
  BarChart3,
  BookOpen,
  HandHeart,
  Network,
  GraduationCap,
  Radio,
  Database,
  Settings,
  Handshake,
  Activity,
  ArrowLeft,
  Megaphone,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Icon mapping function
const getIcon = (iconString) => {
  const iconMap = {
    "shield/siren": Megaphone,
    "rocket/environment": Rocket,
    "family/health/heart": Users,
    "chart/bar/growth": BarChart3,
    "globe/book": BookOpen,
    "hands/volunteer": HandHeart,
    "globe/network": Network,
    "growth/training": Network,
    "communication/media": Network,
    "screen/data": Database,
    "settings/community": Settings,
    "people/handshake": Handshake,
    "skills/gear": Settings,
    "health/heartbeat": Activity,
  };

  return iconMap[iconString] || Users;
};

const orgStructure = {
  title: "Abha Healthy City - Organizational Structure",
  root: {
    main_committee_chair: ["رئيس اللجنة الرئيسية", "محافظ حريملاء"],
    city_coordinator: "منسق المحافظة",
    committees: {
      main_committee: {
        title: "كل الجهات",
        items: [
          { name: "مستشفى حريملاء العام", icon: "health/heartbeat" },
          { name: "بلدية حريملاء", icon: "settings/community" },
          { name: "شرطة محافظة حريملاء", icon: "shield/siren" },
          { name: "إدارة الدفاع المدني", icon: "shield/siren" },
          { name: "شعبة مرور حريملاء", icon: "shield/siren" },
          { name: "القوة الخاصة للأمن البيئي", icon: "shield/siren" },
          { name: "الكلية التطبيقية بحريملاء", icon: "globe/book" },
          { name: "وزارة البيئة والمياه والزراعة", icon: "rocket/environment" },
          { name: "شركة المياه الوطنية", icon: "screen/data" },
          { name: "جمعية حريملاء الخيرية", icon: "hands/volunteer" },
          { name: "جمعية التنمية الأهلية بحريملاء", icon: "people/handshake" },
          { name: "جمعية أصدقاء المرضى بحريملاء", icon: "hands/volunteer" },
          {
            name: "ممثل وزارة الموارد البشرية والتنمية الاجتماعية",
            icon: "people/handshake",
          },
          { name: "ممثل التعليم العام", icon: "globe/book" },
        ],
      },
      sub_committees: {
        title: "اللجان الفرعية",
        items: [
          {
            name: "الأمن والسلامة والطوارئ",
            icon: "shield/siren",
          },
          {
            name: "الإصحاح البيئي",
            icon: "rocket/environment",
          },
          {
            name: "جودة الحياة والرفاه",
            icon: "family/health/heart",
          },
          {
            name: "أنشطة القروض الصغيرة",
            icon: "chart/bar/growth",
          },
          {
            name: "التعليم ومحو الأمية",
            icon: "globe/book",
          },
        ],
      },
      supporting_committees: {
        title: "اللجان الداعمة",
        items: [
          {
            name: "التطوع",
            icon: "hands/volunteer",
          },
          {
            name: "الشراكات",
            icon: "globe/network",
          },
          {
            name: "التدريب والتطوير",
            icon: "growth/training",
          },
          {
            name: "الإعلام والاتصال",
            icon: "communication/media",
          },
        ],
      },
      city_vertical_units: {
        items: [
          {
            name: "مركز المعلومات المجتمعي",
            icon: "screen/data",
          },
          {
            name: "تنظيم المجتمع وتعبئته",
            icon: "settings/community",
          },
          {
            name: "التعاون والشراكة",
            icon: "people/handshake",
          },
          {
            name: "تنمية المهارات وبناء القدرات",
            icon: "skills/gear",
          },
          {
            name: "التنمية الصحية",
            icon: "health/heartbeat",
          },
        ],
      },
    },
  },
};

const OrgNode = ({ name, icon, level = 0, subtitle = null }) => {
  const { language } = useTheme();
  const isRTL = language === "ar";
  const IconComponent = icon ? getIcon(icon) : null;

  return (
    <Card className="bg-primary hover:opacity-90 transition-opacity border-0">
      <CardContent
        className={cn(
          "text-white",
          level === 0 && "p-8",
          level === 1 && "p-5",
          level === 2 && "p-4",
          level >= 3 && "p-3",
          isRTL && "font-arabic text-right"
        )}>
        {level >= 3 && IconComponent ? (
          // List item style with icon on left and text on right
          <div className="flex items-center gap-3" dir="rtl">
            <IconComponent className="w-4 h-4 text-white flex-shrink-0" />
            <p className="font-semibold text-white flex-1 text-right text-sm">
              {name}
            </p>
          </div>
        ) : (
          // Header/leader style - centered text
          <div className="text-center">
            <p
              className={cn(
                "font-bold text-white",
                level === 0 && "text-2xl mb-2",
                level === 1 && "text-lg mb-1",
                level === 2 && "text-base"
              )}>
              {name}
            </p>
            {subtitle && (
              <p
                className={cn(
                  "text-white opacity-90",
                  level === 0 && "text-base",
                  level === 1 && "text-sm"
                )}>
                {subtitle}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ConnectorLine = ({
  direction = "vertical",
  length = 32,
  className = "",
}) => {
  if (direction === "vertical") {
    return (
      <div
        className={`w-1 bg-white mx-auto ${className}`}
        style={{ height: `${length}px` }}></div>
    );
  }
  return <div className={`h-1 bg-white w-full ${className}`}></div>;
};

const HealthyCityStructure = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-background py-8">
      {/* Header */}
      <div className="relative h-48 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <h1
              className={cn(
                "text-3xl md:text-5xl font-bold mb-4 text-foreground",
                isRTL ? "font-arabic" : "font-english"
              )}>
              الهيكل التنظيمي
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-2",
              isRTL ? "font-arabic" : "font-english"
            )}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("common.backToHome")}
          </Button>
        </div>

        {/* Introduction Paragraph */}
        <div className="mb-12 max-w-4xl mx-auto">
          <p
            className={cn(
              "text-center text-lg md:text-xl text-muted-foreground leading-relaxed",
              isRTL ? "font-arabic" : "font-english"
            )}
            dir="rtl">
            يوضح الهيكل التنظيمي التالي البنية الإدارية والتنظيمية لمبادرة
            حريملاء محافظة صحية، حيث يتولى محافظ حريملاء رئاسة اللجنة الرئيسية،
            ويتفرع منها ثلاث محاور أساسية تشمل اللجان الفرعية، اللجان الداعمة،
            وجميع الجهات الشريكة التي تعمل بشكل متكامل لتحقيق رؤية المحافظة
            الصحية.
          </p>
        </div>

        {/* Organizational Chart */}
        <div className="flex flex-col items-center max-w-7xl mx-auto">
          {/* Level 1 - Main Committee Chair */}
          <div className="w-[400px]">
            <OrgNode
              name={orgStructure.root.main_committee_chair[0]}
              subtitle={orgStructure.root.main_committee_chair[1]}
              level={0}
            />
          </div>

          {/* Connector that splits to 2 branches */}
          <div className="relative w-full" style={{ height: "48px" }}>
            {/* Vertical line down from Main Committee Chair */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-white"
              style={{ height: "16px" }}></div>
            {/* Horizontal line splitting to 2 branches */}
            <div className="absolute top-4 left-[25%] right-[25%] h-1 bg-white"></div>
            {/* Vertical line 1 - All Entities */}
            <div
              className="absolute top-4 left-[25%] w-1 bg-white"
              style={{ height: "32px" }}></div>
            {/* Vertical line 2 - City Coordinator */}
            <div
              className="absolute top-4 right-[25%] w-1 bg-white"
              style={{ height: "32px" }}></div>
          </div>

          {/* Level 2 - Two columns */}
          <div className="flex justify-end gap-40 w-full px-8">
            {/* Column 1 - All Entities (direct items, no header) */}
            <div className="flex flex-col items-center w-[340px]">
              {/* All Entities Items */}
              <div className="space-y-2 w-full">
                {orgStructure.root.committees.main_committee.items.map(
                  (item, index) => (
                    <React.Fragment key={index}>
                      <OrgNode name={item.name} icon={item.icon} level={3} />
                      {index <
                        orgStructure.root.committees.main_committee.items
                          .length -
                          1 && (
                        <div className="py-1">
                          <ConnectorLine direction="vertical" length={16} />
                        </div>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>

            {/* Column 2 - City Coordinator with sub-branches */}
            <div className="flex flex-col items-center">
              {/* City Coordinator */}
              <div className="w-[340px] mb-3">
                <OrgNode name={orgStructure.root.city_coordinator} level={1} />
              </div>

              {/* Connector that splits to 2 branches */}
              <div className="relative w-full" style={{ height: "48px" }}>
                {/* Vertical line down from City Coordinator */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-white"
                  style={{ height: "16px" }}></div>
                {/* Horizontal line splitting to 2 branches */}
                <div className="absolute top-4 left-[20%] right-[20%] h-1 bg-white"></div>
                {/* Vertical line 1 - Supporting Committees */}
                <div
                  className="absolute top-4 left-[20%] w-1 bg-white"
                  style={{ height: "32px" }}></div>
                {/* Vertical line 2 - Sub Committees */}
                <div
                  className="absolute top-4 right-[20%] w-1 bg-white"
                  style={{ height: "32px" }}></div>
              </div>

              {/* Level 3 - Two sub-columns under City Coordinator */}
              <div className="flex justify-center gap-8 w-full">
                {/* Sub-Column 1 - Supporting Committees */}
                <div className="flex flex-col items-center w-[280px]">
                  <div className="w-full mb-3">
                    <OrgNode
                      name={
                        orgStructure.root.committees.supporting_committees.title
                      }
                      level={2}
                    />
                  </div>

                  {/* Connector to items */}
                  <div className="pb-2">
                    <ConnectorLine direction="vertical" length={24} />
                  </div>

                  {/* Supporting Committees Items */}
                  <div className="space-y-2 w-full">
                    {orgStructure.root.committees.supporting_committees.items.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <OrgNode
                            name={item.name}
                            icon={item.icon}
                            level={3}
                          />
                          {index <
                            orgStructure.root.committees.supporting_committees
                              .items.length -
                              1 && (
                            <div className="py-1">
                              <ConnectorLine direction="vertical" length={16} />
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>

                {/* Sub-Column 2 - Sub Committees */}
                <div className="flex flex-col items-center w-[280px]">
                  <div className="w-full mb-3">
                    <OrgNode
                      name={orgStructure.root.committees.sub_committees.title}
                      level={2}
                    />
                  </div>

                  {/* Connector to items */}
                  <div className="pb-2">
                    <ConnectorLine direction="vertical" length={24} />
                  </div>

                  {/* Sub-Committees Items */}
                  <div className="space-y-2 w-full">
                    {orgStructure.root.committees.sub_committees.items.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <OrgNode
                            name={item.name}
                            icon={item.icon}
                            level={3}
                          />
                          {index <
                            orgStructure.root.committees.sub_committees.items
                              .length -
                              1 && (
                            <div className="py-1">
                              <ConnectorLine direction="vertical" length={16} />
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>

                  {/* Connector between sub-committees and city vertical units */}
                  <div className="py-2">
                    <ConnectorLine direction="vertical" length={24} />
                  </div>

                  {/* City Vertical Units Items (appended under Sub-Committees) */}
                  <div className="space-y-2 w-full">
                    {orgStructure.root.committees.city_vertical_units.items.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <OrgNode
                            name={item.name}
                            icon={item.icon}
                            level={3}
                          />
                          {index <
                            orgStructure.root.committees.city_vertical_units
                              .items.length -
                              1 && (
                            <div className="py-1">
                              <ConnectorLine direction="vertical" length={16} />
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyCityStructure;
