import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoBanner() {
  const { t } = useLanguage();
  return (
    <div className="sticky top-0 z-[70] bg-amber-500 text-white text-center text-sm sm:text-base font-semibold py-2 px-4">
      {t("banner.demo")} · {t("banner.wake")}
    </div>
  );
}
