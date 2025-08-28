import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
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
} from "lucide-react";

const SubmissionsView = () => {
  const { standardId } = useParams();
  const navigate = useNavigate();
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  const standards = Standards();

  // Find the standard by ID
  const standard = standards.records_for_follow_up.find(
    (s) => s.id === parseInt(standardId)
  );

  // Mock submissions data - you can replace this with real data
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (standard) {
      // Generate mock submissions for this standard
      const mockSubmissions = generateMockSubmissions(standard);
      setSubmissions(mockSubmissions);
    }
  }, [standard]);

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
      const status = Math.random() > 0.3 ? "approved" : "pending";

      mockSubmissions.push({
        id: i + 1,
        type,
        agency,
        status,
        submittedAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        fileName: generateFileName(type, i + 1),
        fileSize: generateFileSize(type),
        description: generateDescription(type, standard),
        submittedBy: generateSubmitterName(agency),
        reviewNotes: status === "approved" ? generateReviewNotes() : null,
      });
    }

    return mockSubmissions.sort((a, b) => b.submittedAt - a.submittedAt);
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

  const generateFileSize = (type) => {
    const sizes = {
      text: "2-5 KB",
      pdf: "500-2 MB",
      image: "1-5 MB",
      video: "10-50 MB",
    };
    return sizes[type];
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

  const generateSubmitterName = (agency) => {
    const names = [
      "أحمد محمد",
      "فاطمة علي",
      "محمد عبدالله",
      "سارة أحمد",
      "علي حسن",
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateReviewNotes = () => {
    const notes = [
      "تم مراجعة الملف وتم الموافقة عليه",
      "الملف يلبي جميع المتطلبات المطلوبة",
      "محتوى ممتاز ومعلومات شاملة",
      "تم التحقق من صحة المعلومات المقدمة",
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  };

  const getStatusBadge = (status) => {
    if (status === "approved") {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          {language === "ar" ? "تمت الموافقة" : "Approved"}
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          {language === "ar" ? "في الانتظار" : "Pending"}
        </Badge>
      );
    }
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

  const getTypeLabel = (type) => {
    const labels = {
      text: language === "ar" ? "نص" : "Text",
      pdf: "PDF",
      image: language === "ar" ? "صورة" : "Image",
      video: language === "ar" ? "فيديو" : "Video",
    };
    return labels[type];
  };

  const filteredSubmissions =
    activeTab === "all"
      ? submissions
      : submissions.filter((sub) => sub.type === activeTab);

  if (!standard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {language === "ar" ? "المعيار غير موجود" : "Standard Not Found"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {language === "ar"
              ? "المعيار المطلوب غير موجود في النظام"
              : "The requested standard was not found in the system"}
          </p>
          <Button onClick={() => navigate("/admin/standards")}>
            {language === "ar" ? "العودة للمعايير" : "Back to Standards"}
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
            {language === "ar" ? "العودة للمعايير" : "Back to Standards"}
          </Button>

          <h1 className="text-3xl font-bold text-foreground">
            {language === "ar" ? "عرض التقديمات" : "View Submissions"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar"
              ? `المعيار ${standard.id}: ${standard.standard}`
              : `Standard ${standard.id}: ${standard.standard}`}
          </p>
        </div>

        <div className="text-right">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {submissions.length} {language === "ar" ? "تقديم" : "Submissions"}
          </Badge>
        </div>
      </div>

      {/* Standard Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {language === "ar" ? "تفاصيل المعيار" : "Standard Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                {language === "ar" ? "المعيار:" : "Standard:"}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {standard.standard}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                {language === "ar"
                  ? "الوكالات المسؤولة:"
                  : "Responsible Agencies:"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {standard.assigned_agencies.map((agency, index) => (
                  <Badge key={index} variant="secondary">
                    {agency}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              {language === "ar" ? "المتطلبات:" : "Requirements:"}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {submissions.filter((s) => s.type === "text").length}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "ملفات نصية" : "Text Files"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {submissions.filter((s) => s.type === "pdf").length}
              </div>
              <p className="text-sm text-muted-foreground">PDF Files</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {submissions.filter((s) => s.type === "image").length}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "صور" : "Images"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {submissions.filter((s) => s.type === "video").length}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "فيديوهات" : "Videos"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "ar" ? "التقديمات المقدمة" : "Submitted Materials"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                {language === "ar" ? "الكل" : "All"} ({submissions.length})
              </TabsTrigger>
              <TabsTrigger value="text">
                {language === "ar" ? "نصوص" : "Text"} (
                {submissions.filter((s) => s.type === "text").length})
              </TabsTrigger>
              <TabsTrigger value="pdf">
                PDF ({submissions.filter((s) => s.type === "pdf").length})
              </TabsTrigger>
              <TabsTrigger value="image">
                {language === "ar" ? "صور" : "Images"} (
                {submissions.filter((s) => s.type === "image").length})
              </TabsTrigger>
              <TabsTrigger value="video">
                {language === "ar" ? "فيديوهات" : "Videos"} (
                {submissions.filter((s) => s.type === "video").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "لا توجد تقديمات من هذا النوع"
                      : "No submissions of this type"}
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
                          {getStatusBadge(submission.status)}
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
                            <User className="w-3 h-3 text-muted-foreground" />
                            <span>{submission.submittedBy}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>
                              {submission.submittedAt.toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <File className="w-3 h-3 text-muted-foreground" />
                            <span>{submission.fileSize}</span>
                          </div>
                        </div>

                        {submission.reviewNotes && (
                          <div className="bg-green-50 p-2 rounded text-xs text-green-700">
                            <strong>
                              {language === "ar"
                                ? "ملاحظات المراجعة:"
                                : "Review Notes:"}
                            </strong>{" "}
                            {submission.reviewNotes}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            {language === "ar" ? "عرض" : "View"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsView;
