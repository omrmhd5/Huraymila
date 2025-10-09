// API utility functions for news
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const newsApi = {
  // Get all news (public route)
  getAllNews: async (params = {}) => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = `${API_BASE_URL}/news${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch news");
    }

    return response.json();
  },

  // Get prioritized news for home page (public route)
  getPrioritizedNews: async (limit = 5) => {
    const response = await fetch(
      `${API_BASE_URL}/news/prioritized?limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch prioritized news");
    }

    return response.json();
  },

  // Get available priorities (governor only)
  getAvailablePriorities: async (token, excludeId = null) => {
    const url = excludeId
      ? `${API_BASE_URL}/news/available-priorities?excludeId=${excludeId}`
      : `${API_BASE_URL}/news/available-priorities`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch available priorities"
      );
    }

    return response.json();
  },

  // Get news by ID (public route)
  getNewsById: async (newsId) => {
    const response = await fetch(`${API_BASE_URL}/news/${newsId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch news article");
    }

    return response.json();
  },

  // Create new news (governor only)
  createNews: async (token, newsData, imageFile = null) => {
    const formData = new FormData();

    // Add text fields
    formData.append("title", newsData.title);
    formData.append("subtitle", newsData.subtitle);
    formData.append("description", newsData.description);
    if (newsData.date) {
      formData.append("date", newsData.date);
    }

    // Add image file if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create news article");
    }

    return response.json();
  },

  // Update news (governor only)
  updateNews: async (token, newsId, newsData, imageFile = null) => {
    const formData = new FormData();

    // Add text fields
    if (newsData.title !== undefined) {
      formData.append("title", newsData.title);
    }
    if (newsData.subtitle !== undefined) {
      formData.append("subtitle", newsData.subtitle);
    }
    if (newsData.description !== undefined) {
      formData.append("description", newsData.description);
    }
    if (newsData.date !== undefined) {
      formData.append("date", newsData.date);
    }
    if (newsData.priority !== undefined) {
      formData.append("priority", newsData.priority || "");
    }

    // Add image file if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/news/${newsId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update news article");
    }

    return response.json();
  },

  // Delete news (governor only)
  deleteNews: async (token, newsId) => {
    const response = await fetch(`${API_BASE_URL}/news/${newsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete news article");
    }

    return response.json();
  },

  // Get image URL for viewing/downloading
  getImageUrl: (imagePath) => {
    if (!imagePath) return null;
    return `${API_BASE_URL.replace("/api", "")}${imagePath}`;
  },
};
