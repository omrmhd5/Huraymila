// Get all standards from backend
export const getAllStandardsByNumber = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/standards`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch standards");
    }
    const standards = await response.json();
    return standards.data; // Returns array of standards with number, status, progress, assigned_agencies
  } catch (error) {
    console.error("Error fetching standards:", error);
    throw error;
  }
};
