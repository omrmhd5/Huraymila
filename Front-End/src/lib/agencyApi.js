// API utility functions for agencies
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const agencyApi = {
  // Login agency
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/agencies/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return response.json();
  },

  // Get agency profile
  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/agencies/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    return response.json();
  },

  // Get assigned standards for agency
  getAssignedStandards: async (token) => {
    const response = await fetch(
      `${API_BASE_URL}/agencies/assigned-standards`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch assigned standards"
      );
    }

    return response.json();
  },

  // Get all standards
  getAllStandards: async () => {
    const response = await fetch(`${API_BASE_URL}/standards`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch standards");
    }

    return response.json();
  },

  // Create a new submission
  createSubmission: async (token, submissionData, files = []) => {
    const formData = new FormData();

    // Add text fields
    formData.append("standardNumber", submissionData.standardNumber);
    formData.append("title", submissionData.title);
    formData.append("description", submissionData.description);
    if (submissionData.notes) {
      formData.append("notes", submissionData.notes);
    }

    // Add files
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create submission");
    }

    return response.json();
  },

  // Get my submissions
  getMySubmissions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/submissions/my`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch submissions");
    }

    return response.json();
  },

  // Get my submissions for a specific standard
  getMySubmissionsByStandard: async (token, standardNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/submissions/standard/${standardNumber}/my`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch submissions");
    }

    return response.json();
  },

  // Update my submission
  updateMySubmission: async (
    token,
    submissionId,
    submissionData,
    files = []
  ) => {
    const formData = new FormData();

    // Add text fields
    if (submissionData.title !== undefined) {
      formData.append("title", submissionData.title);
    }
    if (submissionData.description !== undefined) {
      formData.append("description", submissionData.description);
    }
    if (submissionData.notes !== undefined) {
      formData.append("notes", submissionData.notes);
    }

    // Add files if provided
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(
      `${API_BASE_URL}/submissions/${submissionId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Don't set Content-Type when using FormData
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update submission");
    }

    return response.json();
  },
};
