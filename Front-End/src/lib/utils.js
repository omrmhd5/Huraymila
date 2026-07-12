import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { updateStandardFromSubmissions } from "./api";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Reusable function to map backend standards to language context
export const mapBackendStandardsToLanguageContext = (
  backendStandards,
  languageStandards,
  language = "ar"
) => {
  if (!backendStandards || !Array.isArray(backendStandards)) return [];

  return backendStandards.map((backendStandard) => {
    // Check if MongoDB has the standard texts
    const standardText = language === "ar" ? backendStandard.standard_ar : backendStandard.standard_en;
    const requirementsText = language === "ar" ? backendStandard.requirements_ar : backendStandard.requirements_en;

    if (standardText !== undefined && standardText !== null) {
      return {
        _id: backendStandard._id,
        id: backendStandard._id || backendStandard.number,
        number: backendStandard.number,
        standard: standardText,
        requirements: requirementsText || [],
        assigned_agencies:
          backendStandard.assigned_agencies?.map(
            (agency) => agency.name || agency.name_ar || (typeof agency === "string" ? agency : "")
          ) || [],
        status: backendStandard.status,
        progress: backendStandard.progress,
        // Expose raw properties for editing
        standard_ar: backendStandard.standard_ar,
        standard_en: backendStandard.standard_en,
        requirements_ar: backendStandard.requirements_ar || [],
        requirements_en: backendStandard.requirements_en || [],
      };
    }

    // Safety check for undefined languageStandards
    if (!languageStandards || !Array.isArray(languageStandards)) {
      // Language standards not available, using fallback text
      return {
        _id: backendStandard._id,
        id: backendStandard._id || backendStandard.number,
        number: backendStandard.number,
        standard: `Standard ${backendStandard.number}`,
        requirements: [],
        assigned_agencies:
          backendStandard.assigned_agencies?.map(
            (agency) => agency.name || agency.name_ar || (typeof agency === "string" ? agency : "")
          ) || [],
        status: backendStandard.status,
        progress: backendStandard.progress,
      };
    }

    // Fallback: match from local language context
    const languageStandard = languageStandards.find(
      (standard) => (standard.number === backendStandard.number || standard.id === backendStandard.number)
    );

    return {
      _id: backendStandard._id,
      id: backendStandard._id || backendStandard.number,
      number: backendStandard.number,
      standard:
        languageStandard?.standard || `Standard ${backendStandard.number}`,
      requirements: languageStandard?.requirements || [],
      assigned_agencies:
        backendStandard.assigned_agencies?.map(
          (agency) => agency.name || agency.name_ar || (typeof agency === "string" ? agency : "")
        ) || [],
      status: backendStandard.status,
      progress: backendStandard.progress,
    };
  });
};

// Function to calculate and update standard status and progress from submissions
export const updateStandardsFromSubmissions = async (
  standards,
  submissionsMap,
  token
) => {
  const updatePromises = standards.map(async (standard) => {
    const submissions = submissionsMap[standard.number] || [];

    // Calculate status based on ALL submissions
    let calculatedStatus = "didnt_submit";
    let calculatedProgress = 0;

    if (submissions.length === 0) {
      // No submissions at all
      calculatedStatus = "didnt_submit";
      calculatedProgress = 0;
    } else {
      // Check the status of all submissions
      const approvedCount = submissions.filter(
        (sub) => sub.status === "approved"
      ).length;
      const rejectedCount = submissions.filter(
        (sub) => sub.status === "rejected"
      ).length;
      const totalSubmissions = submissions.length;

      if (approvedCount === totalSubmissions) {
        // All submissions are approved
        calculatedStatus = "approved";
        calculatedProgress = 100;
      } else if (rejectedCount === totalSubmissions) {
        // All submissions are rejected
        calculatedStatus = "rejected";
        calculatedProgress = 0;
      } else {
        // Mix of statuses OR some pending submissions
        calculatedStatus = "pending_approval";
        calculatedProgress = Math.round(
          (approvedCount / totalSubmissions) * 100
        );
      }
    }

    // Update the standard in the database
    try {
      await updateStandardFromSubmissions(
        standard.number,
        calculatedStatus,
        calculatedProgress,
        token
      );
    } catch (error) {
      // Error updating standard
    }
  });

  await Promise.all(updatePromises);
};
