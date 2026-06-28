const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const smsApi = {
  // Send Broadcast SMS
  sendBroadcast: async (message, token) => {
    const response = await fetch(`${API_BASE_URL}/sms/broadcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send SMS broadcast");
    }

    return response.json();
  },

  // Get SMS Logs
  getSmsLogs: async (token) => {
    const response = await fetch(`${API_BASE_URL}/sms/logs`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch SMS logs");
    }

    return response.json();
  },
};
