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

  // Get initiative by ID
  getInitiativeById: async (token, initiativeId) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch initiative");
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
  createInitiative: async (token, initiativeData) => {
    const response = await fetch(`${API_BASE_URL}/initiatives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(initiativeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create initiative");
    }

    return response.json();
  },

  // Update initiative
  updateInitiative: async (token, initiativeId, initiativeData) => {
    const response = await fetch(
      `${API_BASE_URL}/initiatives/${initiativeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(initiativeData),
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
};
