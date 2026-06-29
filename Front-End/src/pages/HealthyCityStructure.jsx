import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const HealthyCityStructure = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  // We force Arabic for the diagram strings, but keep UI directional text dynamic
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-white py-8 font-sans">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8 flex justify-start" dir={isRTL ? "rtl" : "ltr"}>
          <button
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium",
              isRTL ? "font-arabic flex-row" : "font-english flex-row-reverse"
            )}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#186a3b] mb-3 font-arabic">
            الهيكل التنظيمي لمدينة حريملاء الصحية
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-arabic">
            رسم بياني يوضح التسلسل الإداري واللجان المشكلة والعلاقات التنسيقية
          </p>
        </div>

        {/* Chart Container - Scrollable on mobile */}
        <div className="w-full overflow-x-auto pb-16 font-arabic">
          <div
            className="min-w-[1000px] w-full flex flex-col items-center relative"
            dir="rtl">
            {/* Level 0: Top Node */}
            <div className="relative flex flex-col items-center">
              <div className="bg-[#186a3b] text-white font-bold text-xl py-3 px-8 rounded-lg border-4 border-[#c09a47] shadow-md z-10 text-center flex flex-col items-center justify-center">
                <span>محافظ حريملاء</span>
                <span className="text-sm font-normal mt-1 opacity-90">رئيس اللجنة الرئيسية لمدينة حريملاء الصحية</span>
              </div>
              {/* Vertical line down from top node */}
              <div className="w-0.5 h-10 bg-[#186a3b]"></div>
            </div>

            {/* Level 1: 4 columns */}
            {/* Horizontal line spanning columns */}
            <div className="w-full max-w-5xl relative">
              {/* The connecting horizontal line */}
              <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-[#186a3b]"></div>

              <div className="grid grid-cols-4 w-full relative">
                {/* Node 1 (Right): Main Committee */}
                <div className="flex flex-col items-center relative">
                  <div className="w-0.5 h-8 bg-[#186a3b]"></div>
                  <div className="bg-[#186a3b] text-white font-bold py-4 px-6 rounded-lg shadow-md z-10 text-center w-56 text-lg">
                    اللجنة الرئيسية
                  </div>
                </div>

                {/* Node 2: Advisory Committee */}
                <div className="flex flex-col items-center relative">
                  <div className="w-0.5 h-8 bg-[#186a3b]"></div>
                  <div className="bg-[#c09a47] text-white font-bold py-4 px-6 rounded-lg shadow-md z-10 text-center w-56 text-lg">
                    اللجنة الاستشارية
                  </div>
                </div>

                {/* Node 3: Financial Committee */}
                <div className="flex flex-col items-center relative">
                  <div className="w-0.5 h-8 bg-[#186a3b]"></div>
                  <div className="bg-[#c09a47] text-white font-bold py-4 px-6 rounded-lg shadow-md z-10 text-center w-56 text-lg">
                    اللجنة المالية
                  </div>
                </div>

                {/* Node 4 (Left): Coordination Office */}
                <div className="flex flex-col items-center relative">
                  <div className="w-0.5 h-8 bg-[#186a3b]"></div>
                  <div className="bg-[#186a3b] text-white font-bold py-4 px-6 rounded-lg shadow-md z-10 text-center w-56 text-lg">
                    مكتب تنسيق المدينة
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2: Gray Box & Lines turning inwards */}
            <div className="w-full max-w-5xl relative flex justify-center mt-12 mb-8">
              {/* The Grey Box (Sub-committees) */}
              <div className="bg-[#f3f4f6] rounded-xl p-8 shadow-sm w-[480px] relative z-10 border border-gray-200">
                <h3 className="text-[#c09a47] font-bold text-center text-xl mb-8">
                  اللجان الفرعية
                </h3>

                <div className="flex flex-col gap-4">
                  {/* Row 1 */}
                  <div className="flex justify-between gap-4">
                    <div className="bg-[#388e3c] text-white font-bold py-3 px-4 rounded-lg shadow-sm text-center flex-1 text-base">
                      لجنة الإصحاح
                      <br /> البيئي
                    </div>
                    <div className="bg-[#388e3c] text-white font-bold py-3 px-4 rounded-lg shadow-sm text-center flex-1 text-base">
                      لجنة الصحة
                      <br /> المدرسية
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex justify-center my-1">
                    <div className="bg-[#388e3c] text-white font-bold py-3 px-4 rounded-lg shadow-sm text-center w-[48%] text-base">
                      لجنة الأمن
                      <br /> والسلامة
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex justify-between gap-4">
                    <div className="bg-[#388e3c] text-white font-bold py-3 px-4 rounded-lg shadow-sm text-center flex-1 text-base">
                      لجنة التنمية
                      <br /> الصحية
                    </div>
                    <div className="bg-[#388e3c] text-white font-bold py-3 px-4 rounded-lg shadow-sm text-center flex-1 text-base">
                      لجنة التنمية
                      <br /> الاجتماعية
                    </div>
                  </div>
                </div>
              </div>

              {/* Solid line from Node 1 (Right) turning LEFT into grey box */}
              <div
                className="absolute right-[12.5%] border-r-2 border-b-2 border-[#186a3b] -top-12 z-0"
                style={{
                  width: "calc(37.5% - 240px)",
                  height: "calc(50% + 3rem)",
                }}>
                {/* Arrow head pointing left */}
                <div className="absolute left-0 -bottom-[5px] w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-solid border-transparent border-r-[#186a3b]"></div>
              </div>

              {/* Dotted line from Node 4 (Left) turning RIGHT into grey box */}
              <div
                className="absolute left-[12.5%] border-l-2 border-b-2 border-dashed border-[#186a3b] -top-12 z-0"
                style={{
                  width: "calc(37.5% - 240px)",
                  height: "calc(50% + 3rem)",
                }}>
                {/* Arrow head pointing right */}
                <div className="absolute right-0 -bottom-[5px] w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-solid border-transparent border-l-[#186a3b]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Committees List Section */}
        <div className="max-w-4xl mx-auto mt-16 font-arabic" dir="rtl">
          <h2 className="text-2xl font-bold text-[#186a3b] mb-6 text-center border-b pb-2 border-gray-200">
            أعضاء الهيكل التنظيمي واللجان الفرعية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#fcf8f2] p-6 rounded-xl border border-[#e8dcb8] shadow-sm">
              <h3 className="font-bold text-[#186a3b] text-lg mb-3">الهيكل الإداري:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                <li><strong>محافظ حريملاء (رئيس اللجنة الرئيسية لمدينة حريملاء الصحية):</strong> يتولى الإشراف والمتابعة العامة لأعمال البرنامج.</li>
                <li><strong>اللجنة الرئيسية:</strong> تعنى برسم السياسات العامة وإقرار الخطط.</li>
                <li><strong>اللجنة الاستشارية:</strong> تقديم المشورة والدعم الفني والخبرات.</li>
                <li><strong>اللجنة المالية:</strong> إدارة الموارد وتخصيص الميزانيات للمشاريع.</li>
              </ul>
            </div>
            <div className="bg-[#f4fbf7] p-6 rounded-xl border border-[#d8eedf] shadow-sm">
              <h3 className="font-bold text-[#388e3c] text-lg mb-3">اللجان الفرعية:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                <li><strong>لجنة التنمية الصحية:</strong> تعزيز الوعي الصحي وتطوير الخدمات الوقائية.</li>
                <li><strong>لجنة الصحة المدرسية:</strong> العناية بالبيئة المدرسية وصحة الطلاب.</li>
                <li><strong>لجنة الإصحاح البيئي:</strong> حماية البيئة والتخلص الآمن من النفايات والتشجير.</li>
                <li><strong>لجنة الأمن والسلامة:</strong> التوعية بالوقاية من الحوادث وتطبيق معايير السلامة.</li>
                <li><strong>لجنة التنمية الاجتماعية:</strong> الشراكة المجتمعية ودعم الفئات الأكثر احتياجاً.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyCityStructure;
