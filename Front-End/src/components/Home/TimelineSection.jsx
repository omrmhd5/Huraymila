import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Rocket,
  TrendingUp,
  Activity,
  Award,
  CheckCircle2,
  Circle,
} from "lucide-react";

const TimelineSection = () => {
  const { language } = useTheme();
  const isRTL = language === "ar";

  const phases = [
    {
      year: "2022",
      title: isRTL ? "التأسيس والانطلاق" : "Foundation & Launch",
      description: isRTL
        ? "وضع الرؤية الاستراتيجية وتحديد الأهداف وتأسيس الهياكل التنظيمية الأولية لمبادرة حريملاء المحافظة الصحية وإطلاقها رسمياً"
        : "Setting the strategic vision, defining goals, establishing the initial organizational structures and launching it officially",
      status: isRTL ? "مكتمل" : "Completed",
      icon: CheckCircle2,
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      lineColor: "bg-green-500",
      iconBg: "bg-green-500 text-white shadow-green-500/20",
    },
    {
      year: "2023",
      title: isRTL ? "التفعيل والتوسع" : "Activation & Expansion",
      description: isRTL
        ? "بداية تفعيل المبادرات الأساسية وتأسيس الشراكات وتشكيل اللجان الاستراتيجية لبرنامج المدينة الصحية"
        : "Start of activating basic initiatives, establishing partnerships and forming strategic committees for the healthy city program",
      status: isRTL ? "مكتمل" : "Completed",
      icon: Rocket,
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      lineColor: "bg-green-500",
      iconBg: "bg-green-500 text-white shadow-green-500/20",
    },
    {
      year: "2024–2025",
      title: isRTL ? "التطوير والجاهزية" : "Development & Readiness",
      description: isRTL
        ? "تنفيذ المشاريع الكبرى وقياس مؤشرات الأداء وجاهزية اللجان والجهات الشريكة"
        : "Implementation of major projects, measuring performance indicators, and readiness of committees and partner agencies",
      status: isRTL ? "مكتمل" : "Completed",
      icon: TrendingUp,
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      lineColor: "bg-green-500",
      iconBg: "bg-green-500 text-white shadow-green-500/20",
    },
    {
      year: "2026",
      title: isRTL ? "الاعتماد والاستدامة" : "Accreditation & Sustainability",
      description: isRTL
        ? "الحصول على الاعتماد الرسمي لمدينة حريملاء الصحية من منظمة الصحة العالمية والعمل على استدامة البرامج والمبادرات"
        : "Obtaining official WHO accreditation for Huraymila Healthy City and working on program and initiative sustainability",
      status: isRTL ? "قيد التنفيذ" : "In Progress",
      icon: Award,
      badgeColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      lineColor: "bg-blue-500",
      iconBg: "bg-blue-500 text-white shadow-blue-500/20",
    },
  ];

  return (
    <section className="py-20 bg-primary/10 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6",
              isRTL ? "font-arabic" : "font-english",
            )}>
            {isRTL ? "الجدول الزمني للبرنامج" : "Program Timeline"}
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
              isRTL ? "font-arabic" : "font-english",
            )}>
            {isRTL
              ? "مراحل وخطوات تقدم مبادرة حريملاء محافظة صحية نحو تحقيق أهداف التنمية المستدامة"
              : "Phases and progress steps of the Huraymila Healthy Governorate initiative towards achieving sustainable development goals"}
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative max-w-6xl mx-auto mt-20">
          {/* Horizontal Line for Large Screens */}
          <div className="absolute top-[40px] left-[5%] right-[5%] h-1 bg-border rounded-full z-0 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center lg:items-start text-center lg:text-right relative group">
                  {/* Step Marker */}
                  <div className="flex items-center justify-center mb-6 lg:mb-8 relative">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg",
                        phase.iconBg,
                      )}>
                      <IconComponent className="w-9 h-9" />
                    </div>

                    {/* Progress dot inside connecting path */}
                    <div
                      className={cn(
                        "absolute -bottom-[32px] w-6 h-6 rounded-full border-4 border-background flex items-center justify-center lg:flex z-20 shadow",
                        phase.status === "مكتمل" || phase.status === "Completed"
                          ? "bg-green-500"
                          : phase.status === "قيد التنفيذ" ||
                              phase.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-muted",
                      )}
                      style={{
                        [isRTL ? "right" : "left"]: "38px",
                      }}>
                      {phase.status === "مكتمل" ||
                      phase.status === "Completed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Circle className="w-2 h-2 text-white fill-white" />
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <Card className="w-full bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border hover:border-primary/20 relative overflow-hidden">
                    {/* Active phase visual indicator border */}
                    {(phase.status === "قيد التنفيذ" ||
                      phase.status === "In Progress") && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
                    )}
                    {/* Completed phase visual indicator border */}
                    {(phase.status === "مكتمل" ||
                      phase.status === "Completed") && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
                    )}

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4 flex-row-reverse">
                        <span className="text-3xl font-extrabold text-foreground/20 group-hover:text-primary/20 transition-colors">
                          {phase.year}
                        </span>
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm",
                            phase.badgeColor,
                          )}>
                          {phase.status}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "text-xl font-bold text-foreground mb-3",
                          isRTL
                            ? "font-arabic text-right"
                            : "font-english text-left",
                        )}>
                        {phase.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground leading-relaxed",
                          isRTL
                            ? "font-arabic text-right"
                            : "font-english text-left",
                        )}>
                        {phase.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
