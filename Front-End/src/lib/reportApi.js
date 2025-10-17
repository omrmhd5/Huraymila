const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const reportApi = {
  // Create new report (volunteer only)
  createReport: async (token, reportData, files = []) => {
    const formData = new FormData();

    // Append report data
    formData.append("title", reportData.title);
    formData.append("details", reportData.details);

    // Append files if provided
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file.file || file);
      });
    }

    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create report");
    }

    return response.json();
  },

  // Get all reports (admin/governor only)
  getAllReports: async (token, params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append("status", params.status);

    const url = `${API_BASE_URL}/reports${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch reports");
    }

    return response.json();
  },

  // Get my reports (volunteer only)
  getMyReports: async (token) => {
    const response = await fetch(`${API_BASE_URL}/reports/my-reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch your reports");
    }

    return response.json();
  },

  // Get single report by ID
  getReportById: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch report");
    }

    return response.json();
  },

  // Update report status (admin/governor only)
  updateReportStatus: async (token, id, status, adminNotes = "") => {
    const response = await fetch(`${API_BASE_URL}/reports/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, adminNotes }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update report status");
    }

    return response.json();
  },

  // Delete report
  deleteReport: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete report");
    }

    return response.json();
  },

  // Get reports statistics (admin only)
  getReportsStatistics: async (token) => {
    const response = await fetch(`${API_BASE_URL}/reports/statistics`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch statistics");
    }

    return response.json();
  },

  // Get file URL helper
  getFileUrl: (filePath) => {
    if (!filePath) return null;
    return `${API_BASE_URL.replace("/api", "")}${filePath}`;
  },

  // Get status badge configuration
  getStatusConfig: (status, language = "en") => {
    const statusConfigs = {
      pending: {
        color: "bg-yellow-500",
        text: language === "ar" ? "قيد الانتظار" : "Pending",
      },
      "under review": {
        color: "bg-blue-500",
        text: language === "ar" ? "قيد المراجعة" : "Under Review",
      },
      resolved: {
        color: "bg-green-500",
        text: language === "ar" ? "تم الحل" : "Resolved",
      },
      rejected: {
        color: "bg-red-500",
        text: language === "ar" ? "مرفوض" : "Rejected",
      },
    };

    return (
      statusConfigs[status] || {
        color: "bg-gray-500",
        text: status,
      }
    );
  },
};
