// API utility for fetching map locations from our own backend DB
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const mapApi = {
  // GET /api/map-locations — returns all cached locations from MongoDB
  getMapLocations: async () => {
    const response = await fetch(`${API_BASE_URL}/map-locations`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch map locations");
    }

    return response.json();
  },
};
