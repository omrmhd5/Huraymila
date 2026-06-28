// API utility for fetching map locations from our own backend DB
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const mapApi = {
  // GET /api/map-locations — returns cached locations from MongoDB
  getMapLocations: async (token) => {
    const response = await fetch(`${API_BASE_URL}/map-locations`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch map locations");
    }

    return response.json();
  },

  // POST /api/map-locations — create a custom marker
  createMapLocation: async (data, token) => {
    const response = await fetch(`${API_BASE_URL}/map-locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create map location");
    }

    return response.json();
  },

  // PUT /api/map-locations/:id — update a custom marker
  updateMapLocation: async (id, data, token) => {
    const response = await fetch(`${API_BASE_URL}/map-locations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update map location");
    }

    return response.json();
  },

  // DELETE /api/map-locations/:id — delete a custom marker
  deleteMapLocation: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/map-locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete map location");
    }

    return response.json();
  },
};
