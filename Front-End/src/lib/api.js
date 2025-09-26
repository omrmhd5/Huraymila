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

// Agency API functions
export const getAllAgencies = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token is provided
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/agencies`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch agencies");
    }
    const agencies = await response.json();
    return agencies.data;
  } catch (error) {
    console.error("Error fetching agencies:", error);
    throw error;
  }
};

export const getAgencyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agencies/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch agency");
    }
    const agency = await response.json();
    return agency.data;
  } catch (error) {
    console.error("Error fetching agency:", error);
    throw error;
  }
};

export const createAgency = async (agencyData, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/agencies`, {
      method: "POST",
      headers,
      body: JSON.stringify(agencyData),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to create agency");
    }
    const agency = await response.json();
    return agency.data;
  } catch (error) {
    console.error("Error creating agency:", error);
    throw error;
  }
};

export const updateAgency = async (id, agencyData, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/agencies/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(agencyData),
    });
    if (!response.ok) {
      throw new Error("Failed to update agency");
    }
    const agency = await response.json();
    return agency.data;
  } catch (error) {
    console.error("Error updating agency:", error);
    throw error;
  }
};

export const deleteAgency = async (id, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/agencies/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      throw new Error("Failed to delete agency");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting agency:", error);
    throw error;
  }
};

// Toggle agency assignment to standard (two-way update)
export const toggleAgencyAssignment = async (
  standardId,
  agencyId,
  assigned,
  token
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/standards/${standardId}/agency/${agencyId}/toggle`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ assigned }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to toggle agency assignment");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error toggling agency assignment:", error);
    throw error;
  }
};
