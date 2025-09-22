import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Reusable function to map backend standards to language context
export const mapBackendStandardsToLanguageContext = (
  backendStandards,
  languageStandards
) => {
  return backendStandards.map((backendStandard) => {
    const languageStandard = languageStandards.find(
      (standard) => standard.number === backendStandard.number
    );
    return {
      id: backendStandard.number,
      number: backendStandard.number,
      standard:
        languageStandard?.standard || `Standard ${backendStandard.number}`,
      requirements: languageStandard?.requirements || [],
      assigned_agencies:
        backendStandard.assigned_agencies?.map(
          (agency) => agency.name || agency.name_ar
        ) || [],
      status: backendStandard.status,
      progress: backendStandard.progress,
    };
  });
};
