// Same API host as the rest of the app. A relative "/api" hits the
// Vercel site and returns index.html instead of JSON.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://huraymila-demo.onrender.com/api");

export function getPublicAssetUrl(assetPath) {
  if (!assetPath) return "";
  if (assetPath.startsWith("http")) return assetPath;
  const origin = API_BASE_URL.replace(/\/api\/?$/, "");
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${origin}${path}`;
}

export const partnerApi = {
  // Get all partners
  getAllPartners: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/partners`);
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error("Failed to fetch partners");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching partners:", error);
      throw error;
    }
  },

  // Create a new partner (requires governor auth)
  createPartner: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/partners`, {
        method: "POST",
        headers,
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to create partner");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating partner:", error);
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

  // Delete a partner (requires governor auth)
  deletePartner: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: "DELETE",
        headers,
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete partner");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting partner:", error);
      throw error;
    }
  },
};
