// Base API URL configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api");

export const partnerApi = {
  // Get all partners
  getAllPartners: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/partners`);
      if (!response.ok) {
        throw new Error("Failed to fetch partners");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching partners:", error);
      throw error;
    }
  },

  // Update a partner (requires governor auth)
  updatePartner: async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      // When using FormData with fetch, do NOT set 'Content-Type' header manually.
      // The browser will set it automatically to 'multipart/form-data' with the correct boundary.

      const response = await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: "PUT",
        headers,
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to update partner");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating partner:", error);
      throw error;
    }
  },
};
