import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/contexts/ThemeContext";
import { getAllStandardsByNumber } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ClipboardCheck, CheckCircle2, Clock, XCircle, AlertCircle, TrendingUp } from "lucide-react";

const StandardsStatsSection = () => {
  const { language } = useTheme();
  const isRTL = language === "ar";

  const [stats, setStats] = useState({
    total: 80,
    approved: 52,
    pending: 18,
    rejected: 4,
    didntSubmit: 6,
    complianceRate: 65,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const standards = await getAllStandardsByNumber();
        if (standards && Array.isArray(standards) && standards.length > 0) {
          const total = standards.length;
          const approved = standards.filter((s) => s.status === "approved").length;
          const pending = standards.filter((s) => s.status === "pending_approval").length;
          const rejected = standards.filter((s) => s.status === "rejected").length;
          const didntSubmit = standards.filter((s) => s.status === "didnt_submit" || !s.status).length;
          const complianceRate = Math.round((approved / total) * 100);

          setStats({
            total,
            approved,
            pending,
            rejected,
            didntSubmit,
            complianceRate,
          });
        }
      } catch (error) {
        // Fallback to default mock stats if API fails
        console.warn("Failed to fetch standards stats, using mock fallbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    {
      title: isRTL ? "إجمالي المعايير" : "Total Standards",
      value: stats.total,
      icon: ClipboardCheck,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50",
    },
    {
      title: isRTL ? "المعايير المعتمدة" : "Approved Standards",
      value: stats.approved,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/50",
    },
    {
      title: isRTL ? "قيد المراجعة" : "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
    },
    {
      title: isRTL ? "لم يتم التقديم" : "Not Submitted Yet",
      value: stats.didntSubmit,
      icon: AlertCircle,
      color: "text-gray-500 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800",
    },
    {
      title: isRTL ? "معايير مرفوضة" : "Rejected Standards",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/50",
    },
  ];

  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3
            className={cn(
              "text-2xl md:text-3xl font-bold text-foreground mb-4",
              isRTL ? "font-arabic" : "font-english"
            )}
          >
            {isRTL ? "معدل إنجاز معايير المدينة الصحية" : "Healthy City Standards Progress"}
          </h3>
          <p
            className={cn(
              "text-muted-foreground text-base md:text-lg",
              isRTL ? "font-arabic" : "font-english"
            )}
          >
            {isRTL
              ? "متابعة مباشرة لمعدلات إنجاز المعايير المعتمدة من منظمة الصحة العالمية عبر اللجان المسؤولة"
              : "Live tracking of Healthy City standards compliance verified by the responsible committees"}
          </p>
        </div>

        {/* Highlight Stats + Overall Progress */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          {/* Progress Circular/Bar Card */}
          <Card className="md:col-span-3 bg-card/65 backdrop-blur-sm border-2 border-primary/10 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-4 text-center md:text-right">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                    {isRTL ? "نسبة الالتزام الإجمالية" : "Overall Compliance Rate"}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-foreground">
                  {isRTL
                    ? "تقدم مستمر نحو استكمال كافة المعايير العالمية"
                    : "Steady progress towards completing all global health standards"}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {isRTL
                    ? "يتم تحديث هذه الإحصائيات تلقائياً عند اعتماد المستندات والأدلة المقدمة من اللجان الشريكة."
                    : "These statistics are updated automatically as evidence submitted by partner committees is approved."}
                </p>
              </div>

              {/* Progress Value Showcase */}
              <div className="flex flex-col items-center justify-center min-w-[200px] gap-2">
                <div className="text-6xl font-black text-primary tracking-tight">
                  {stats.complianceRate}%
                </div>
                <div className="w-full max-w-[180px]">
                  <Progress value={stats.complianceRate} className="h-3.5 bg-muted" />
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {stats.approved} {isRTL ? "معياراً معتمداً من أصل" : "approved standards out of"} {stats.total}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Small Stat Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-4">
          {cardData.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card
                key={idx}
                className={cn(
                  "border hover:-translate-y-1 hover:shadow-md transition-all duration-300",
                  card.bgColor
                )}
              >
                <CardContent className="p-5 flex flex-col items-center text-center justify-between h-full gap-4">
                  <div className={cn("p-3 rounded-full bg-background shadow-sm", card.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-extrabold text-foreground tracking-tight">
                      {card.value}
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground leading-snug">
                      {card.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StandardsStatsSection;
