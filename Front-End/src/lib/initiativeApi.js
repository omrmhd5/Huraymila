// API utility functions for initiatives
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const initiativeApi = {
  // Get all initiatives (for governors and agencies)
  getAllInitiatives: async (token) => {
    const response = await fetch(`${API_BASE_URL}/initiatives`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch initiatives");
    }

    return response.json();
  },

  // Get initiative by ID (public route)
  getInitiativeById: async (initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching initiative");
    }

    return response.json();
  },

  // Get initiatives for current agency
  getMyInitiatives: async (token) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/agency/my-initiatives`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch your initiatives");
    }

    return response.json();
  },

  // Get initiatives by agency ID (for governors)
  getInitiativesByAgencyId: async (token, agencyId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/agency/${agencyId}`,
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
        errorData.message || "Failed to fetch agency initiatives"
      );
    }

    return response.json();
  },

  // Create new initiative
  createInitiative: async (token, initiativeData, imageFile = null) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(initiativeData).forEach((key) => {
      if (initiativeData[key] !== null && initiativeData[key] !== undefined) {
        formData.append(key, initiativeData[key]);
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/initiatives`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create initiative");
    }

    return response.json();
  },

  // Update initiative
  updateInitiative: async (
    token,
    initiativeId,
    initiativeData,
    imageFile = null
  ) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(initiativeData).forEach((key) => {
      if (initiativeData[key] !== null && initiativeData[key] !== undefined) {
        formData.append(key, initiativeData[key]);
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}`,
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
      throw new Error(errorData.message || "Failed to update initiative");
    }

    return response.json();
  },

  // Delete initiative
  deleteInitiative: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete initiative");
    }

    return response.json();
  },

  // Add volunteer to initiative
  addVolunteer: async (token, initiativeId, volunteerData) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/volunteers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(volunteerData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add volunteer");
    }

    return response.json();
  },

  // Remove volunteer from initiative
  removeVolunteer: async (token, initiativeId, volunteerId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/volunteers/${volunteerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove volunteer");
    }

    return response.json();
  },

  // Apply to initiative (volunteer only)
  applyToInitiative: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/apply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error applying to initiative");
    }

    return response.json();
  },

  // Withdraw from initiative (volunteer only)
  withdrawFromInitiative: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/withdraw`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error withdrawing from initiative");
    }

    return response.json();
  },

  // Get pending initiatives (governor only)
  getPendingInitiatives: async (token) => {
    const response = await fetch(`${API_BASE_URL}/initiatives/pending/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch pending initiatives"
      );
    }

    return response.json();
  },

  // Approve initiative (governor only)
  approveInitiative: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/approve`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to approve initiative");
    }

    return response.json();
  },

  // Decline initiative (governor only)
  declineInitiative: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}/decline`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to decline initiative");
    }

    return response.json();
  },
};
