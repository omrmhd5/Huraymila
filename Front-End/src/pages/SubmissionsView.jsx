import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { agencyApi } from "@/lib/agencyApi";
import { toast } from "sonner";
import {
  getAllStandardsByNumber,
  getSubmissionsByStandardNumber,
  updateSubmissionStatus,
} from "@/lib/api";
import { mapBackendStandardsToLanguageContext } from "@/lib/utils";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  X,
} from "lucide-react";

const SubmissionsView = () => {
  const { standardId } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { t } = useLanguage();
  const { token } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [standardsList, setStandardsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState("all");

  // Find the standard by ID (handle both number and ObjectId)
  const standard = standardsList.find(
    (s) => s.id === parseInt(standardId) || s._id === standardId
  );

  // Real submissions data - will be fetched from backend
  const [submissions, setSubmissions] = useState([]);

  // Fetch standards from backend and map to language context
  useEffect(() => {
    const fetchStandards = async () => {
      try {
        setLoading(true);
        const backendStandards = await getAllStandardsByNumber();
        const languageStandards = t("standards");

        // Map backend data to language context data using reusable function
        const mappedStandards = mapBackendStandardsToLanguageContext(
          backendStandards,
          languageStandards
        );

        setStandardsList(mappedStandards);
      } catch (error) {
        console.error("Error fetching standards:", error);
        setStandardsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandards();
  }, [t]);

  // Function to determine agency submission status
  const getAgencySubmissionStatus = (standard) => {
    const agencyStatuses = {};
    standard.assigned_agencies.forEach((agency) => {
      // Check if agency has submitted for this standard
      const hasSubmitted = submissions.some((submission) => {
        const agencyName =
          submission.agency?.name || submission.agency?.name_ar;
        return agencyName === agency;
      });
      agencyStatuses[agency] = hasSubmitted ? "submitted" : "not_submitted";
    });
    return agencyStatuses;
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (standard) {
        try {
          const submissionsData = await getSubmissionsByStandardNumber(
            standard.number
          );
          setSubmissions(submissionsData);
        } catch (error) {
          console.error("Error fetching submissions:", error);
          setSubmissions([]);
        }
      }
    };

    fetchSubmissions();
  }, [standard]);

  const getStatusBadge = (submission) => {
    const statuses = [
      {
        value: "approved",
        label: t("submissionsView.approved"),
        variant: "default",
        className: "bg-green-500",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
      },
      {
        value: "pending",
        label: t("submissionsView.pending"),
        variant: "secondary",
        className: "bg-yellow-500",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      {
        value: "rejected",
        label: t("submissionsView.rejected"),
        variant: "destructive",
        className: "bg-red-500",
        icon: <XCircle className="w-3 h-3 mr-1" />,
      },
    ];

    // Get status from submission or use default
    const status =
      statuses.find((s) => s.value === submission.status) || statuses[1]; // Default to "pending"

    return (
      <Badge
        variant={status.variant}
        className={`text-center ${status.className}`}>
        {status.icon}
        {status.label}
      </Badge>
    );
  };

  const toggleSubmissionStatus = async (submission) => {
    try {
      // Determine new status based on current status
      let newStatus;
      if (submission.status === "approved") {
        newStatus = "rejected";
      } else if (submission.status === "rejected") {
        newStatus = "approved";
      } else {
        newStatus = "approved"; // Default pending to approved
      }

      // Update via API
      const updatedSubmission = await updateSubmissionStatus(
        submission._id,
        newStatus
      );

      // Update local state
      const updatedSubmissions = submissions.map((s) =>
        s._id === submission._id ? updatedSubmission : s
      );
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error("Error updating submission status:", error);
    }
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderModalContent = () => {
    if (!selectedSubmission) return null;

    return (
      <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Submission Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("submissionsView.title")}
              </h3>
              <p className="text-sm leading-relaxed bg-muted p-3 rounded">
                {selectedSubmission.title}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("submissionsView.description")}
              </h3>
              <p className="text-sm leading-relaxed bg-muted p-3 rounded">
                {selectedSubmission.description}
              </p>
            </div>

            {selectedSubmission.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("submissionsView.notes")}
                </h3>
                <p className="text-sm leading-relaxed bg-muted p-3 rounded">
                  {selectedSubmission.notes}
                </p>
              </div>
            )}

            {/* Files */}
            {selectedSubmission.filesUrls &&
              selectedSubmission.filesUrls.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("submissionsView.files")} (
                    {selectedSubmission.filesUrls.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedSubmission.filesUrls.map((url, index) => {
                      // Extract filename from URL
                      const filename = url.split("/").pop();
                      const fileExtension =
                        filename.split(".").pop()?.toLowerCase() || "";

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          {/* File Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>

                          {/* File Details */}
                          <div
                            className={`flex-1 min-w-0 ${
                              language === "ar" ? "text-right" : "text-left"
                            }`}>
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm font-medium text-gray-900 truncate ${
                                  language === "ar"
                                    ? "font-arabic"
                                    : "font-sans"
                                }`}>
                                {filename}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {fileExtension && (
                                <p
                                  className={`text-xs text-gray-500 ${
                                    language === "ar"
                                      ? "font-arabic"
                                      : "font-sans"
                                  }`}>
                                  {fileExtension.toUpperCase()}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Download Button */}
                          <div className="flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={async () => {
                                try {
                                  // Extract submission ID and filename from file URL
                                  // URL format: "/submissions/{submissionId}/{filename}"
                                  const urlParts = url.split("/");
                                  const submissionId = urlParts[2];
                                  const filename = urlParts[3];

                                  if (!token) {
                                    toast.error(
                                      language === "ar"
                                        ? "يرجى تسجيل الدخول لتحميل الملفات"
                                        : "Please log in to download files"
                                    );
                                    return;
                                  }

                                  // Download using secure API
                                  const blob =
                                    await agencyApi.downloadSubmissionFile(
                                      token,
                                      submissionId,
                                      filename
                                    );

                                  // Create download link
                                  const downloadUrl =
                                    window.URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = downloadUrl;
                                  a.download = filename;
                                  document.body.appendChild(a);
                                  a.click();
                                  window.URL.revokeObjectURL(downloadUrl);
                                  document.body.removeChild(a);
                                } catch (error) {
                                  console.error("Download error:", error);
                                  toast.error(
                                    language === "ar"
                                      ? "فشل في تحميل الملف"
                                      : "Failed to download file"
                                  );
                                }
                              }}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  const filteredSubmissions = (() => {
    let filtered = submissions;

    // Filter by agency
    if (selectedAgency !== "all") {
      filtered = filtered.filter((sub) => {
        const agencyName = sub.agency?.name || sub.agency?.name_ar;
        return agencyName === selectedAgency;
      });
    }

    return filtered;
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading standard...</p>
        </div>
      </div>
    );
  }

  if (!standard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t("submissionsView.standardNotFound")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("submissionsView.standardNotFoundDescription")}
          </p>
          <Button onClick={() => navigate("/admin/standards")}>
            {t("submissionsView.backToStandards")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/standards")}
            className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("submissionsView.backToStandards")}
          </Button>

          <h1 className="text-3xl font-bold text-foreground">
            {t("submissionsView.viewSubmissions")}
          </h1>
        </div>

        <div className="text-right">
          <Badge
            variant="outline"
            className="text-lg px-4 py-2 whitespace-nowrap">
            {submissions.length} {t("submissionsView.submissions")}
          </Badge>
        </div>
      </div>

      {/* Standard Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t("submissionsView.standardDetails")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                {`${t("submissionsView.standardLabel")} ${standard.number}:`}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {standard.standard}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                {t("submissionsView.responsibleAgencies")}
              </h4>
              <div className="space-y-3">
                {/* Agencies with color coding */}
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const agencyStatuses = getAgencySubmissionStatus(standard);
                    return standard.assigned_agencies.map((agency, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`${
                          agencyStatuses[agency] === "submitted"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700"
                        }`}>
                        {agency}
                      </Badge>
                    ));
                  })()}
                </div>

                {/* Inline Legend */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700"></Badge>
                    <span className="text-green-700 dark:text-green-300">
                      {t("submissionsView.submitted")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700"></Badge>
                    <span className="text-red-700 dark:text-red-300">
                      {t("submissionsView.notSubmitted")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              {t("submissionsView.requirements")}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {standard.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            status: "approved",
            color: "text-green-600",
            label: t("submissionsView.approved"),
          },
          {
            status: "pending",
            color: "text-yellow-600",
            label: t("submissionsView.pending"),
          },
          {
            status: "rejected",
            color: "text-red-600",
            label: t("submissionsView.rejected"),
          },
        ].map(({ status, color, label }) => (
          <Card key={status}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${color}`}>
                  {submissions.filter((s) => s.status === status).length}
                </div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Acceptance Percentage Card */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(() => {
                  const approvedCount = submissions.filter(
                    (s) => s.status === "approved"
                  ).length;
                  const totalCount = submissions.length;
                  const percentage =
                    totalCount > 0
                      ? Math.round((approvedCount / totalCount) * 100)
                      : 0;
                  return `${percentage}%`;
                })()}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("submissionsView.acceptanceRate")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>{t("submissionsView.submittedMaterials")}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Agency Filter */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("submissionsView.filterByAgency")}
                </label>
                <Select
                  value={selectedAgency}
                  onValueChange={setSelectedAgency}>
                  <SelectTrigger className="w-64">
                    <SelectValue
                      placeholder={t("submissionsView.selectAgency")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("submissionsView.allAgencies")}
                    </SelectItem>
                    {standard?.assigned_agencies.map((agency) => (
                      <SelectItem key={agency} value={agency}>
                        {agency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {submissions.length === 0
                  ? t("submissionsView.noSubmissionsYet")
                  : t("submissionsView.noSubmissionsForAgency")}
              </p>
              {submissions.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {t("submissionsView.submissionsWillAppearHere")}
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubmissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <FileText className="w-5 h-5 text-blue-500" />
                      {getStatusBadge(submission)}
                    </div>
                    <CardTitle className="text-lg">
                      {submission.title ||
                        t("submissionsView.untitledSubmission")}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {submission.description ||
                        t("submissionsView.noDescription")}
                    </p>

                    {submission.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        {submission.notes}
                      </p>
                    )}

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3 text-muted-foreground" />
                        <span>
                          {submission.agency?.name ||
                            submission.agency?.name_ar ||
                            t("submissionsView.unknownAgency")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>
                          {submission.createdAt
                            ? new Date(
                                submission.createdAt
                              ).toLocaleDateString()
                            : t("submissionsView.noDate")}
                        </span>
                      </div>

                      {submission.filesUrls &&
                        submission.filesUrls.length > 0 && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-3 h-3 text-muted-foreground" />
                            <span>
                              {submission.filesUrls.length}{" "}
                              {t("submissionsView.files")}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => openModal(submission)}>
                        <Eye className="w-4 h-4 mr-1" />
                        {t("submissionsView.view")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          if (
                            !submission.filesUrls ||
                            submission.filesUrls.length === 0
                          ) {
                            toast.error(
                              language === "ar"
                                ? "لا توجد ملفات للتحميل"
                                : "No files to download"
                            );
                            return;
                          }

                          // Download first file or show file selection if multiple
                          try {
                            const firstFileUrl = submission.filesUrls[0];
                            const urlParts = firstFileUrl.split("/");
                            const submissionId = urlParts[2];
                            const filename = urlParts[3];

                            if (!token) {
                              toast.error(
                                language === "ar"
                                  ? "يرجى تسجيل الدخول لتحميل الملفات"
                                  : "Please log in to download files"
                              );
                              return;
                            }

                            const blob = await agencyApi.downloadSubmissionFile(
                              token,
                              submissionId,
                              filename
                            );

                            const downloadUrl =
                              window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = downloadUrl;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(downloadUrl);
                            document.body.removeChild(a);
                          } catch (error) {
                            console.error("Download error:", error);
                            toast.error(
                              language === "ar"
                                ? "فشل في تحميل الملف"
                                : "Failed to download file"
                            );
                          }
                        }}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Status Toggle Button */}
                    <Button
                      size="sm"
                      variant={
                        submission.status === "approved" ||
                        submission.status === "rejected"
                          ? "default"
                          : "outlined"
                      }
                      onClick={() => toggleSubmissionStatus(submission)}
                      className={`w-full ${
                        submission.status === "rejected" ||
                        submission.status === "pending"
                          ? "bg-green-700 dark:bg-green-600 text-green-50 border-green-200 dark:border-green-500 hover:bg-green-500 dark:hover:bg-green-500"
                          : submission.status === "approved"
                          ? "bg-red-700 dark:bg-red-600 text-red-50 border-red-200 dark:border-red-500 hover:bg-red-500 dark:hover:bg-red-500"
                          : "bg-gray-700 dark:bg-gray-600 text-gray-50 border-gray-200 dark:border-gray-500"
                      }`}>
                      {submission.status === "approved" ? (
                        <XCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {submission.status === "rejected" ||
                      submission.status === "pending"
                        ? t("submissionsView.approve")
                        : submission.status === "approved"
                        ? t("submissionsView.reject")
                        : ""}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal for viewing submissions */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {selectedSubmission?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex justify-center items-center py-4">
            {renderModalContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsView;
