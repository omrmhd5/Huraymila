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
  // Safety check for undefined languageStandards
  if (!languageStandards || !Array.isArray(languageStandards)) {
    // Language standards not available, using fallback text
    return backendStandards.map((backendStandard) => ({
      _id: backendStandard._id,
      id: backendStandard._id || backendStandard.number,
      number: backendStandard.number,
      standard: `Standard ${backendStandard.number}`,
      requirements: [],
      assigned_agencies:
        backendStandard.assigned_agencies?.map(
          (agency) => agency.name || agency.name_ar
        ) || [],
      status: backendStandard.status,
      progress: backendStandard.progress,
    }));
  }

  return backendStandards.map((backendStandard) => {
    const languageStandard = languageStandards.find(
      (standard) => standard.number === backendStandard.number
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
