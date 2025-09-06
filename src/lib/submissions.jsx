import { useTheme } from "@/contexts/ThemeContext";

// Submission object structure
export const createSubmission = (standardId, submissionData = {}) => {
  const now = new Date();

  return {
    id:
      submissionData.id ||
      `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    standardId: standardId,
    submissionType: submissionData.submissionType || "text", // text, pdf, photo, video
    title: submissionData.title || "",
    description: submissionData.description || "",
    notes: submissionData.notes || "",
    status: submissionData.status || "pending", // pending, pending_approval, approved, rejected
    submittedAt: submissionData.submittedAt || now.toISOString(),
    submittedBy: submissionData.submittedBy || "Current User", // This would come from auth context
    files: submissionData.files || [], // Array of uploaded files
    fileUrl: submissionData.fileUrl || null, // For file uploads (legacy)
    fileSize: submissionData.fileSize || null,
    fileName: submissionData.fileName || null,
    createdAt: submissionData.createdAt || now.toISOString(),
    updatedAt: submissionData.updatedAt || now.toISOString(),
  };
};

// Get submission type options
export const getSubmissionTypeOptions = (language) => {
  return [
    {
      value: "text",
      label: language === "ar" ? "نص" : "Text",
      icon: "📝",
      description:
        language === "ar"
          ? "تقرير نصي أو وصف مكتوب"
          : "Text report or written description",
    },
    {
      value: "pdf",
      label: language === "ar" ? "ملف PDF" : "PDF File",
      icon: "📄",
      description:
        language === "ar" ? "مستند PDF أو تقرير" : "PDF document or report",
    },
    {
      value: "photo",
      label: language === "ar" ? "صورة" : "Photo",
      icon: "📷",
      description:
        language === "ar" ? "صورة أو صورة فوتوغرافية" : "Image or photograph",
    },
    {
      value: "video",
      label: language === "ar" ? "فيديو" : "Video",
      icon: "🎥",
      description:
        language === "ar" ? "فيديو أو تسجيل مرئي" : "Video or visual recording",
    },
  ];
};

// Get status options
export const getStatusOptions = (language) => {
  return [
    {
      value: "pending",
      label: language === "ar" ? "في الانتظار" : "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      value: "pending_approval",
      label: language === "ar" ? "في انتظار الموافقة" : "Pending Approval",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      value: "approved",
      label: language === "ar" ? "موافق عليه" : "Approved",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      value: "rejected",
      label: language === "ar" ? "مرفوض" : "Rejected",
      color: "bg-red-100 text-red-800 border-red-200",
    },
  ];
};

// Format submission date
export const formatSubmissionDate = (dateString, language) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(language === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Get submission status badge
export const getSubmissionStatusBadge = (status, language) => {
  const statusOptions = getStatusOptions(language);
  const statusOption = statusOptions.find((option) => option.value === status);

  if (!statusOption) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusOption.color}`}>
      {statusOption.label}
    </span>
  );
};
