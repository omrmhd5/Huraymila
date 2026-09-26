function applyIndicatorCopy(indicator) {
  const value = indicator.currentValue;
  const target = indicator.targetValue;
  const unit = indicator.unit || "";
  const inverted = indicator.id === "trafficAccidents";
  const ratio = target === 0 ? 1 : value / target;
  const strong = inverted ? value <= target : ratio >= 0.9;
  const ok = inverted ? value <= target * 1.5 : ratio >= 0.7;

  indicator.status = strong
    ? { ar: "ممتاز", en: "Excellent" }
    : ok
      ? { ar: "جيد", en: "Good" }
      : { ar: "متوسط", en: "Medium" };

  const label = {
    airQuality: { ar: "مؤشر جودة الهواء", en: "air quality index" },
    waterQuality: { ar: "نقاء المياه", en: "water purity" },
    vaccination: { ar: "تغطية التطعيم", en: "vaccination coverage" },
    physicalActivity: { ar: "يمارسون النشاط بانتظام", en: "exercise regularly" },
    trafficAccidents: { ar: "حوادث شهرياً", en: "accidents per month" },
    recycling: { ar: "من النفايات المعاد تدويرها", en: "of waste recycled" },
  }[indicator.id] || { ar: "القيمة الحالية", en: "current value" };

  if (indicator.id === "trafficAccidents") {
    indicator.description = {
      ar: `${value} حادث شهرياً`,
      en: `${value} accidents per month`,
    };
    return indicator;
  }

  indicator.description = {
    ar: `${value}${unit} ${label.ar}`.trim(),
    en: `${value}${unit} ${label.en}`.trim(),
  };

  return indicator;
}

module.exports = { applyIndicatorCopy };
