import React from "react";

import { useAuth } from "@/contexts/AuthContext";

const About = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">من نحن</h1>
          <p className="text-lg text-muted-foreground">
            تعرف على مبادرة مدينة حريملاء الصحية
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              مبادرة مدينة حريملاء الصحية هي مشروع وطني يهدف إلى تعزيز الصحة
              العامة وتحسين جودة الحياة في مدينة حريملاء من خلال مجموعة من
              البرامج والمبادرات المتنوعة التي تشمل الصحة البدنية والنفسية
              والاجتماعية.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              نحن نؤمن بأن الصحة هي حق أساسي لكل مواطن، ونعمل على توفير بيئة
              صحية وآمنة تمكن الأفراد والمجتمعات من تحقيق أقصى إمكاناتهم الصحية.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
