import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { updateStandardFromSubmissions } from "./api";

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

// Function to calculate and update standard status and progress from submissions
export const updateStandardsFromSubmissions = async (
  standards,
  submissionsMap
) => {
  const updatePromises = standards.map(async (standard) => {
    const submissions = submissionsMap[standard.number] || [];

    // Calculate status based on submissions
    let calculatedStatus = "didnt_submit";
    let calculatedProgress = 0;

    if (submissions.length > 0) {
      const approvedCount = submissions.filter(
        (sub) => sub.status === "approved"
      ).length;
      const rejectedCount = submissions.filter(
        (sub) => sub.status === "rejected"
      ).length;
      const pendingCount = submissions.filter(
        (sub) => sub.status === "pending"
      ).length;

      if (approvedCount === submissions.length) {
        calculatedStatus = "approved";
        calculatedProgress = 100;
      } else if (rejectedCount === submissions.length) {
        calculatedStatus = "rejected";
        calculatedProgress = 0;
      } else if (approvedCount > 0 || pendingCount > 0) {
        calculatedStatus = "pending_approval";
        calculatedProgress = Math.round(
          (approvedCount / submissions.length) * 100
        );
      }
    }

    // Update the standard in the database
    try {
      await updateStandardFromSubmissions(
        standard.number,
        calculatedStatus,
        calculatedProgress
      );
    } catch (error) {
      console.error(`Error updating standard ${standard.number}:`, error);
    }
  });

  await Promise.all(updatePromises);
};
