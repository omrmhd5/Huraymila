const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get health indicators (public route)
export const getHealthIndicators = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health-indicators`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch health indicators");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching health indicators:", error);
    throw error;
  }
};

// Update health indicators (governor only)
export const updateHealthIndicators = async (token, indicators) => {
  try {
    const response = await fetch(`${API_BASE_URL}/health-indicators`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ indicators }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update health indicators");
    }

    return result.data;
  } catch (error) {
    console.error("Error updating health indicators:", error);
    throw error;
  }
};
