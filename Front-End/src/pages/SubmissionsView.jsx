import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import Standards from "@/lib/standards";
import {
  ArrowLeft,
  FileText,
  Image,
  Video,
  File,
  Download,
  Eye,
  Calendar,
  User,
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
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [standards, agencyToStandardsMap] = Standards();
  const [selectedAgency, setSelectedAgency] = useState("all");

  // Find the standard by ID
  const standard = standards.records.find((s) => s.id === parseInt(standardId));

  // Mock submissions data - you can replace this with real data
  const [submissions, setSubmissions] = useState([]);

  // Function to determine agency submission status
  const getAgencySubmissionStatus = (standard) => {
    // Mock submission status for each agency
    // In real implementation, this would come from your data
    const agencyStatuses = {};
    standard.assigned_agencies.forEach((agency) => {
      // Randomly assign submission status for demo purposes
      // In real app, this would be based on actual submission data
      agencyStatuses[agency] =
        Math.random() > 0.5 ? "submitted" : "not_submitted";
    });
    return agencyStatuses;
  };

  useEffect(() => {
    if (standard) {
      // Generate mock submissions for this standard
      const mockSubmissions = generateMockSubmissions(standard);
      setSubmissions(mockSubmissions);
    }
  }, []);

  const generateMockSubmissions = (standard) => {
    const submissionTypes = ["text", "pdf", "image", "video"];
    const agencies = standard.assigned_agencies;
    const mockSubmissions = [];

    // Generate 3-8 random submissions
    const numSubmissions = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < numSubmissions; i++) {
      const type =
        submissionTypes[Math.floor(Math.random() * submissionTypes.length)];
      const agency = agencies[Math.floor(Math.random() * agencies.length)];
      // Initialize with random status from the 3 possible statuses
      const statuses = ["approved", "pending_approval", "rejected"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      mockSubmissions.push({
        id: i + 1,
        type,
        agency,
        status,
        submittedAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        fileName: generateFileName(type, i + 1),
        description: generateDescription(type, standard),
        content: generateMockContent(type, i + 1),
      });
    }

    return mockSubmissions.sort((a, b) => b.submittedAt - a.submittedAt);
  };

  const generateMockContent = (type, index) => {
    switch (type) {
      case "text":
        return `هذا هو محتوى النص للمعيار رقم ${index}. يحتوي على تفاصيل شاملة حول تنفيذ المعيار والمتطلبات المطلوبة. يتم تقديم هذا التقرير من قبل الجهة المسؤولة لتوثيق التقدم المحرز في تطبيق المعايير الصحية للمدينة.

This is the text content for standard number ${index}. It contains comprehensive details about the implementation of the standard and the required requirements. This report is submitted by the responsible agency to document the progress made in applying the health standards for the city.`;

      case "pdf":
        return `محتوى PDF للمعيار ${index} - يحتوي على:
• تقرير مفصل عن التنفيذ
• صور توضيحية للمشروع
• جداول البيانات والإحصائيات
• الملاحظات والتوصيات

PDF content for standard ${index} - contains:
• Detailed implementation report
• Illustrative project photos
• Data tables and statistics
• Notes and recommendations`;

      case "image":
        return `https://picsum.photos/800/600?random=${index}`;

      case "video":
        return `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`;

      default:
        return "";
    }
  };

  const generateFileName = (type, index) => {
    const baseNames = {
      text: [
        "تقرير_المعيار",
        "Standard_Report",
        "تقييم_الأداء",
        "Performance_Assessment",
      ],
      pdf: [
        "وثيقة_المعيار",
        "Standard_Document",
        "تقرير_مفصل",
        "Detailed_Report",
      ],
      image: [
        "صورة_المعيار",
        "Standard_Image",
        "صورة_الموقع",
        "Location_Photo",
      ],
      video: [
        "فيديو_المعيار",
        "Standard_Video",
        "تسجيل_المشروع",
        "Project_Recording",
      ],
    };

    const baseName =
      baseNames[type][Math.floor(Math.random() * baseNames[type].length)];
    const extensions = { text: "txt", pdf: "pdf", image: "jpg", video: "mp4" };
    return `${baseName}_${index}.${extensions[type]}`;
  };

  const generateDescription = (type, standard) => {
    const descriptions = {
      text: `تقرير تنفيذ المعيار ${standard.id}: ${standard.standard.substring(
        0,
        50
      )}...`,
      pdf: `وثيقة مفصلة حول تطبيق المعيار ${standard.id} مع الأدلة والملاحظات`,
      image: `صور توضيحية لتنفيذ المعيار ${standard.id} في الموقع`,
      video: `تسجيل مرئي لعملية تنفيذ المعيار ${standard.id} والنتائج المحققة`,
    };
    return descriptions[type];
  };

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
        value: "pending_approval",
        label: t("submissionsView.pendingApproval"),
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
      statuses.find((s) => s.value === submission.status) || statuses[1]; // Default to "pending_approval"

    return (
      <Badge
        variant={status.variant}
        className={`text-center ${status.className}`}>
        {status.icon}
        {status.label}
      </Badge>
    );
  };

  const toggleSubmissionStatus = (submission) => {
    // Create a new submissions list with the updated status
    const updatedSubmissions = submissions.map((s) =>
      s.id === submission.id
        ? {
            ...s,
            status: s.status === "approved" ? "rejected" : "approved",
          }
        : s
    );
    setSubmissions(updatedSubmissions);
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const getTypeIcon = (type) => {
    const icons = {
      text: <FileText className="w-5 h-5 text-blue-500" />,
      pdf: <File className="w-5 h-5 text-red-500" />,
      image: <Image className="w-5 h-5 text-green-500" />,
      video: <Video className="w-5 h-5 text-purple-500" />,
    };
    return icons[type];
  };

  const renderModalContent = () => {
    if (!selectedSubmission) return null;

    switch (selectedSubmission.type) {
      case "video":
        return (
          <div className="w-full max-w-4xl">
            <video
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh] rounded-lg"
              src={selectedSubmission.content}>
              {t("submissionsView.browserNotSupportVideo")}
            </video>
          </div>
        );

      case "image":
        return (
          <div className="w-full max-w-4xl">
            <img
              src={selectedSubmission.content}
              alt={selectedSubmission.fileName}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        );

      case "text":
      case "pdf":
        return (
          <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed p-4 bg-muted rounded-lg">
                {selectedSubmission.content}
              </pre>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const filteredSubmissions = (() => {
    let filtered = submissions;

    // Filter by type (tab)
    if (activeTab !== "all") {
      filtered = filtered.filter((sub) => sub.type === activeTab);
    }

    // Filter by agency
    if (selectedAgency !== "all") {
      filtered = filtered.filter((sub) => sub.agency === selectedAgency);
    }

    return filtered;
  })();

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
                {`${t("submissionsView.standardLabel")} ${standard.id}:`}
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

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            type: "text",
            color: "text-blue-600",
            label: t("submissionsView.textFiles"),
          },
          {
            type: "pdf",
            color: "text-red-600",
            label: t("submissionsView.pdfFiles"),
          },
          {
            type: "image",
            color: "text-green-600",
            label: t("submissionsView.images"),
          },
          {
            type: "video",
            color: "text-purple-600",
            label: t("submissionsView.videos"),
          },
          {
            type: "total",
            color: "text-foreground",
            label: t("submissionsView.totalSubmissions"),
          },
        ].map(({ type, color, label }) => (
          <Card key={type}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${color}`}>
                  {type === "total"
                    ? submissions.length
                    : submissions.filter((s) => s.type === type).length}
                </div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            status: "approved",
            color: "text-green-600",
            label: t("submissionsView.approved"),
          },
          {
            status: "pending_approval",
            color: "text-yellow-600",
            label: t("submissionsView.pendingApproval"),
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

      {/* Submissions Tabs */}
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              {[
                {
                  value: "all",
                  label: t("submissionsView.all"),
                  count: submissions.length,
                },
                {
                  value: "text",
                  label: t("submissionsView.text"),
                  count: submissions.filter((s) => s.type === "text").length,
                },
                {
                  value: "pdf",
                  label: t("submissionsView.pdf"),
                  count: submissions.filter((s) => s.type === "pdf").length,
                },
                {
                  value: "image",
                  label: t("submissionsView.image"),
                  count: submissions.filter((s) => s.type === "image").length,
                },
                {
                  value: "video",
                  label: t("submissionsView.video"),
                  count: submissions.filter((s) => s.type === "video").length,
                },
              ].map(({ value, label, count }) => (
                <TabsTrigger key={value} value={value}>
                  {label} ({count})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {t("submissionsView.noSubmissionsOfThisType")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSubmissions.map((submission) => (
                    <Card
                      key={submission.id}
                      className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          {getTypeIcon(submission.type)}
                          {getStatusBadge(submission)}
                        </div>
                        <CardTitle className="text-lg">
                          {submission.fileName}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {submission.description}
                        </p>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Building className="w-3 h-3 text-muted-foreground" />
                            <span>{submission.agency}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>
                              {submission.submittedAt.toLocaleDateString()}
                            </span>
                          </div>
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
                          <Button size="sm" variant="outline">
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
                            submission.status === "pending_approval"
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
                          submission.status === "pending_approval"
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal for viewing submissions */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedSubmission?.type)}
                {selectedSubmission?.fileName}
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
