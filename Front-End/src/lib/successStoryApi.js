const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const successStoryApi = {
  // Get all success stories
  getAllSuccessStories: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.page) queryParams.append("page", params.page);

    const url = `${API_BASE_URL}/success-stories${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch success stories");
    }

    return response.json();
  },

  // Get single success story by ID
  getSuccessStoryById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/success-stories/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch success story");
    }

    return response.json();
  },

  // Get prioritized success stories for home page
  getPrioritizedSuccessStories: async (limit = 3) => {
    const response = await fetch(
      `${API_BASE_URL}/success-stories/prioritized?limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch prioritized success stories"
      );
    }

    return response.json();
  },

  // Get available priorities
  getAvailablePriorities: async (token, excludeId = null) => {
    const url = excludeId
      ? `${API_BASE_URL}/success-stories/available-priorities?excludeId=${excludeId}`
      : `${API_BASE_URL}/success-stories/available-priorities`;

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

  // Create new success story
  createSuccessStory: async (token, successStoryData, imageFile = null) => {
    const formData = new FormData();

    // Append all success story data
    formData.append("title", successStoryData.title);
    formData.append("subtitle", successStoryData.subtitle);
    formData.append("description", successStoryData.description);
    formData.append("author", successStoryData.author);
    formData.append("date", successStoryData.date);
    formData.append("quote", successStoryData.quote);
    formData.append("before", successStoryData.before);
    formData.append("after", successStoryData.after);

    // Append image if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/success-stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create success story");
    }

    return response.json();
  },

  // Update success story
  updateSuccessStory: async (token, id, successStoryData, imageFile = null) => {
    const formData = new FormData();

    // Only append fields that have actual values
    if (
      successStoryData.title !== undefined &&
      successStoryData.title !== null
    ) {
      formData.append("title", successStoryData.title);
    }
    if (
      successStoryData.subtitle !== undefined &&
      successStoryData.subtitle !== null
    ) {
      formData.append("subtitle", successStoryData.subtitle);
    }
    if (
      successStoryData.description !== undefined &&
      successStoryData.description !== null
    ) {
      formData.append("description", successStoryData.description);
    }
    if (
      successStoryData.author !== undefined &&
      successStoryData.author !== null
    ) {
      formData.append("author", successStoryData.author);
    }
    if (successStoryData.date !== undefined && successStoryData.date !== null) {
      formData.append("date", successStoryData.date);
    }
    if (
      successStoryData.quote !== undefined &&
      successStoryData.quote !== null
    ) {
      formData.append("quote", successStoryData.quote);
    }
    if (
      successStoryData.before !== undefined &&
      successStoryData.before !== null
    ) {
      formData.append("before", successStoryData.before);
    }
    if (
      successStoryData.after !== undefined &&
      successStoryData.after !== null
    ) {
      formData.append("after", successStoryData.after);
    }
    if (successStoryData.priority !== undefined) {
      formData.append("priority", successStoryData.priority || "");
    }

    // Append image if provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/success-stories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update success story");
    }

    return response.json();
  },

  // Delete success story
  deleteSuccessStory: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/success-stories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete success story");
    }

    return response.json();
  },

  // Get image URL helper
  getImageUrl: (imagePath) => {
    if (!imagePath) return "/assets/placeholder.svg";
    return `${API_BASE_URL.replace("/api", "")}${imagePath}`;
  },
};
