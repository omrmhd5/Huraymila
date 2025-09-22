const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all standards from backend
export const getAllStandardsByNumber = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/standards`);
    if (!response.ok) {
      throw new Error("Failed to fetch standards");
    }
    const standards = await response.json();
    return standards.data; // Returns array of standards with number, status, progress, assigned_agencies
  } catch (error) {
    console.error("Error fetching standards:", error);
    throw error;
  }
};

// Get submissions by standard number
export const getSubmissionsByStandardNumber = async (standardNumber) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/submissions/standard/${standardNumber}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const submissions = await response.json();
    return submissions.data; // Returns array of submissions
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

// Update submission status
export const updateSubmissionStatus = async (submissionId, status) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/submissions/${submissionId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update submission status");
    }
    const submission = await response.json();
    return submission.data; // Returns updated submission
  } catch (error) {
    console.error("Error updating submission status:", error);
    throw error;
  }
};

// Update standard status and progress from submissions
export const updateStandardFromSubmissions = async (
  standardNumber,
  status,
  progress
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/standards/${standardNumber}/from-submissions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, progress }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update standard from submissions");
    }
    const standard = await response.json();
    return standard.data; // Returns updated standard
  } catch (error) {
    console.error("Error updating standard from submissions:", error);
    throw error;
  }
};
