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
    // Error fetching standards
    throw error;
  }
};

// Get submissions by standard number
export const getSubmissionsByStandardNumber = async (standardNumber, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/submissions/standard/${standardNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const submissions = await response.json();
    return submissions.data; // Returns array of submissions
  } catch (error) {
    // Error fetching submissions
    throw error;
  }
};

// Update submission status
export const updateSubmissionStatus = async (submissionId, status, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/submissions/${submissionId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    // Error updating submission status
    throw error;
  }
};

// Update standard status and progress from submissions
export const updateStandardFromSubmissions = async (
  standardNumber,
  status,
  progress,
  token
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/standards/${standardNumber}/from-submissions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    // Error updating standard from submissions
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
    // Error fetching agencies
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
    // Error fetching agency
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
      // Response logged
      throw new Error("Failed to create agency");
    }
    const agency = await response.json();
    return agency.data;
  } catch (error) {
    // Error creating agency
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
    // Error updating agency
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
    // Error deleting agency
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
    // Error toggling agency assignment
    throw error;
  }
};
