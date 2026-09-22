import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoBanner() {
  const { t } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      document.documentElement.style.setProperty(
        "--demo-banner-h",
        `${el.offsetHeight}px`,
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--demo-banner-h");
    };
  }, [t]);

  return (
    <div
      ref={ref}
      className="sticky top-0 z-[70] bg-amber-500 text-white text-center text-sm sm:text-base font-semibold py-2 px-4">
      {t("banner.demo")} · {t("banner.wake")}
    </div>
  );
}
