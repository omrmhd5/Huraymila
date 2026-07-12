import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllStandardsByNumber,
  getSubmissionsByStandardNumber,
  updateStandard,
} from "@/lib/api";
import {
  mapBackendStandardsToLanguageContext,
  updateStandardsFromSubmissions,
} from "@/lib/utils";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const StandardsManagement = () => {
  const { language } = useTheme();
  const { t } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [standardsList, setStandardsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionsData, setSubmissionsData] = useState({});

  // Edit standard states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStandardNumber, setEditStandardNumber] = useState(null);
  const [editStandardAr, setEditStandardAr] = useState("");
  const [editStandardEn, setEditStandardEn] = useState("");
  const [editReqsAr, setEditReqsAr] = useState([]);
  const [editReqsEn, setEditReqsEn] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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
          languageStandards,
          language
        );

        setStandardsList(mappedStandards);

        // Fetch submissions for each standard
        const submissionsPromises = mappedStandards.map(async (standard) => {
          try {
            const submissions = await getSubmissionsByStandardNumber(
              standard.number,
              token
            );
            return { standardNumber: standard.number, submissions };
          } catch (error) {
            // Error fetching submissions for standard
            return { standardNumber: standard.number, submissions: [] };
          }
        });

        const submissionsResults = await Promise.all(submissionsPromises);
        const submissionsMap = {};
        submissionsResults.forEach(({ standardNumber, submissions }) => {
          submissionsMap[standardNumber] = submissions;
        });

        setSubmissionsData(submissionsMap);

        // Update standards with calculated status and progress
        await updateStandardsFromSubmissions(
          mappedStandards,
          submissionsMap,
          token
        );
      } catch (error) {
        // Error fetching standards
        setStandardsList([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStandards();
    }
  }, [t, token]);

  // Get unique agencies from standards
  const allAgencies = Array.from(
    new Set(standardsList.flatMap((standard) => standard.assigned_agencies))
  ).sort();

  // Filter standards based on search and filters
  const filteredStandards = standardsList.filter((standard) => {
    const matchesSearch =
      standard.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      standard.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesAgency =
      selectedAgency === "all" ||
      standard.assigned_agencies.includes(selectedAgency);

    // Status filtering logic based on calculated status
    const matchesStatus =
      selectedStatus === "all" ||
      getCalculatedStatus(standard) === selectedStatus;

    return matchesSearch && matchesAgency && matchesStatus;
  });

  // Helper function to calculate display status based on submissions
  const getCalculatedStatus = (standard) => {
    const submissions = submissionsData[standard.number] || [];

    if (submissions.length === 0) {
      // No submissions at all
      return "didnt_submit";
    } else {
      // Check the status of all submissions
      const approvedCount = submissions.filter(
        (sub) => sub.status === "approved"
      ).length;
      const rejectedCount = submissions.filter(
        (sub) => sub.status === "rejected"
      ).length;
      const totalSubmissions = submissions.length;

      if (approvedCount === totalSubmissions) {
        // All submissions are approved
        return "approved";
      } else if (rejectedCount === totalSubmissions) {
        // All submissions are rejected
        return "rejected";
      } else {
        // Mix of statuses OR some pending submissions
        return "pending_approval";
      }
    }
  };

  const getStatusBadge = (standard) => {
    const displayStatus = getCalculatedStatus(standard);

    const statuses = [
      {
        value: "approved",
        label: t("standardsManagement.approved"),
        variant: "default",
        className: "bg-green-500",
      },
      {
        value: "pending_approval",
        label: t("standardsManagement.pendingApproval"),
        variant: "secondary",
        className: "bg-yellow-500",
      },
      {
        value: "didnt_submit",
        label: t("standardsManagement.didntSubmit"),
        variant: "outline",
        className: "bg-gray-300 text-black",
      },
      {
        value: "rejected",
        label: t("standardsManagement.rejected"),
        variant: "destructive",
        className: "bg-red-500",
      },
    ];

    const status =
      statuses.find((s) => s.value === displayStatus) || statuses[2];

    return (
      <Badge
        variant={status.variant}
        className={`text-center ${status.className}`}>
        {status.label}
      </Badge>
    );
  };

  const getSubmissionCount = (standard) => {
    const submissions = submissionsData[standard.number] || [];
    return submissions.length;
  };

  const getAgencySubmissionStatus = (standard) => {
    const submissions = submissionsData[standard.number] || [];
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

  const viewSubmissions = (standardId) => {
    // Find the standard and show it in dialog
    const standard = standardsList.find((s) => s.id === standardId);
    if (standard) {
      setSelectedStandard(standard);
      setIsDialogOpen(true);
    }
  };

  const toggleStatus = (standard) => {
    // Create a new standards list with the updated status
    const updatedStandardsList = standardsList.map((s) =>
      s.id === standard.id
        ? {
            ...s,
            status: s.status === "approved" ? "rejected" : "approved",
          }
        : s
    );
    setStandardsList(updatedStandardsList);
  };

  const startEditing = (standard, e) => {
    if (e) e.stopPropagation();
    setEditStandardNumber(standard.number);
    setEditStandardAr(standard.standard_ar || standard.standard || "");
    setEditStandardEn(standard.standard_en || standard.standard || "");
    setEditReqsAr(standard.requirements_ar || (language === "ar" ? standard.requirements : []));
    setEditReqsEn(standard.requirements_en || (language === "en" ? standard.requirements : []));
    setIsEditModalOpen(true);
  };

  const handleAddRequirementAr = () => {
    setEditReqsAr([...editReqsAr, ""]);
  };

  const handleAddRequirementEn = () => {
    setEditReqsEn([...editReqsEn, ""]);
  };

  const handleRemoveRequirementAr = (index) => {
    setEditReqsAr(editReqsAr.filter((_, i) => i !== index));
  };

  const handleRemoveRequirementEn = (index) => {
    setEditReqsEn(editReqsEn.filter((_, i) => i !== index));
  };

  const handleReqChangeAr = (index, value) => {
    const updated = [...editReqsAr];
    updated[index] = value;
    setEditReqsAr(updated);
  };

  const handleReqChangeEn = (index, value) => {
    const updated = [...editReqsEn];
    updated[index] = value;
    setEditReqsEn(updated);
  };

  const handleSaveStandard = async () => {
    try {
      setIsSaving(true);
      const requirements_ar = editReqsAr.filter((r) => r.trim() !== "");
      const requirements_en = editReqsEn.filter((r) => r.trim() !== "");

      const updatedData = await updateStandard(
        editStandardNumber,
        {
          standard_ar: editStandardAr,
          standard_en: editStandardEn,
          requirements_ar,
          requirements_en,
        },
        token
      );

      const languageStandards = t("standards");
      const mappedUpdated = mapBackendStandardsToLanguageContext(
        [updatedData],
        languageStandards,
        language
      )[0];

      setStandardsList((prev) =>
        prev.map((s) =>
          s.number === editStandardNumber ? { ...s, ...mappedUpdated } : s
        )
      );

      setIsEditModalOpen(false);
      toast.success(
        language === "ar" ? "تم تحديث المعيار بنجاح" : "Standard updated successfully"
      );
    } catch (err) {
      console.error("Failed to update standard:", err);
      toast.error(
        language === "ar" ? "فشل تحديث المعيار" : "Failed to update standard"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري تحميل المعايير..." : "Loading standards..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {t("standardsManagement.title")}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {t("standardsManagement.subtitle")}
        </p>
      </div>

      {/* Summary Statistics */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4
    ${language === "ar" ? "flex-row-reverse" : ""}`}>
        {[
          {
            value: standardsList.length,
            label: t("standardsManagement.totalStandards"),
            color: "text-foreground",
          },
          {
            value: standardsList.filter(
              (s) => getCalculatedStatus(s) === "approved"
            ).length,
            label: t("standardsManagement.approved"),
            color: "text-green-600",
          },
          {
            value: standardsList.filter(
              (s) => getCalculatedStatus(s) === "pending_approval"
            ).length,
            label: t("standardsManagement.pendingApproval"),
            color: "text-yellow-600",
          },
          {
            value: standardsList.filter(
              (s) => getCalculatedStatus(s) === "rejected"
            ).length,
            label: t("standardsManagement.rejected"),
            color: "text-red-500",
          },
          {
            value: standardsList.filter(
              (s) => getCalculatedStatus(s) === "didnt_submit"
            ).length,
            label: t("standardsManagement.didntSubmit"),
            color: "text-gray-400",
          },
        ]
          // reverse order if Arabic
          .sort(() => (language === "ar" ? -1 : 1))
          .map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <div
                    className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t("standardsManagement.searchAndFilters")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("standardsManagement.searchStandards")}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("standardsManagement.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("standardsManagement.responsibleAgency")}
              </label>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("standardsManagement.selectAgency")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("standardsManagement.allAgencies")}
                  </SelectItem>
                  {allAgencies.map((agency) => (
                    <SelectItem key={agency} value={agency}>
                      {agency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("standardsManagement.submissionStatus")}
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("standardsManagement.selectStatus")}
                  />
                </SelectTrigger>
                <SelectContent>
                  {[
                    {
                      value: "all",
                      label: t("standardsManagement.allStatuses"),
                    },
                    {
                      value: "approved",
                      label: t("standardsManagement.approved"),
                    },
                    {
                      value: "pending_approval",
                      label: t("standardsManagement.pendingApproval"),
                    },
                    {
                      value: "didnt_submit",
                      label: t("standardsManagement.didntSubmit"),
                    },
                    {
                      value: "rejected",
                      label: t("standardsManagement.rejected"),
                    },
                  ].map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standards Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("standardsManagement.healthStandardsTable")}</span>
            <Badge variant="outline">
              {filteredStandards.length} {t("standardsManagement.standards")}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    {
                      key: "number",
                      label: t("standardsManagement.number"),
                      className: "w-16",
                    },
                    {
                      key: "standard",
                      label: t("standardsManagement.standard"),
                      className: "min-w-[300px]",
                    },
                    {
                      key: "requirements",
                      label: t("standardsManagement.requirements"),
                      className: "min-w-[200px]",
                    },
                    {
                      key: "agencies",
                      label: t("standardsManagement.responsibleAgencies"),
                      className: "min-w-[200px]",
                    },
                    {
                      key: "status",
                      label: t("standardsManagement.status"),
                      className: "w-24",
                    },
                    {
                      key: "submissions",
                      label: t("standardsManagement.submissions"),
                      className: "w-24",
                    },
                    {
                      key: "actions",
                      label: t("standardsManagement.actions"),
                      className: "w-32",
                    },
                  ]
                    // reverse order if Arabic
                    .slice(language === "ar" ? 0 : undefined) // clone array
                    .map((header) => (
                      <TableHead
                        key={header.key}
                        className={`${header.className} ${
                          language === "ar" ? "text-right" : ""
                        }`}>
                        {header.label}
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStandards.map((standard) => (
                  <TableRow key={standard.id}>
                    <TableCell className="font-mono text-sm">
                      {standard.number}
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="text-sm leading-relaxed">
                        {standard.standard}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {standard.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-baseline gap-2 text-xs">
                            ● <span className="mt-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {standard.assigned_agencies.map((agency, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs">
                            {agency}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(standard)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {standard.progress || 0}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewSubmissions(standard.id)}
                          className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          {t("standardsManagement.view")}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => startEditing(standard, e)}
                          className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 dark:text-amber-300 transition-colors">
                          {language === "ar" ? "تعديل" : "Edit"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Standard Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t("standardsManagement.standardDetails")}
            </DialogTitle>
          </DialogHeader>

          {selectedStandard && (
            <div className="space-y-6">
              {/* Standard Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("standardsManagement.standard")}
                  </h3>
                  <p className="text-sm leading-relaxed bg-muted p-3 rounded">
                    {selectedStandard.standard}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("standardsManagement.requirementsLabel")}
                  </h3>
                  <div className="space-y-2">
                    {selectedStandard.requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-baseline gap-2 text-sm">
                        <span className="text-primary">●</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("standardsManagement.responsibleAgenciesLabel")}
                  </h3>
                  <div className="space-y-4">
                    {/* Agencies with color coding */}
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const agencyStatuses =
                          getAgencySubmissionStatus(selectedStandard);
                        return selectedStandard.assigned_agencies.map(
                          (agency, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`${
                                agencyStatuses[agency] === "submitted"
                                  ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                                  : "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
                              }`}>
                              {agency}
                            </Badge>
                          )
                        );
                      })()}
                    </div>

                    {/* Inline Legend */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700"></Badge>
                        <span className="text-green-700 dark:text-green-300">
                          {t("standardsManagement.submitted")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700"></Badge>
                        <span className="text-red-700 dark:text-red-300">
                          {t("standardsManagement.notSubmitted")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("standardsManagement.status")}
                    </h3>
                    {getStatusBadge(selectedStandard)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("standardsManagement.approvedSubmissions")}
                    </h3>
                    <Badge variant="secondary" className="text-sm">
                      {selectedStandard.progress || 0}%
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="border-t pt-6">
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() =>
                      navigate(`/admin/standards/${selectedStandard.id}`)
                    }
                    className="w-full bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:border-blue-700 dark:text-blue-200 dark:hover:text-blue-100 transition-colors duration-200">
                    <Eye className="w-5 h-5 mr-2" />
                    {t("standardsManagement.viewDetailedSubmissions")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Standard Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={language === "ar" ? "text-right font-arabic" : "text-left"}>
              {language === "ar"
                ? `تعديل المعيار رقم ${editStandardNumber}`
                : `Edit Standard #${editStandardNumber}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Arabic Fields */}
            <div className="space-y-4 border-b pb-6">
              <h3 className={`text-lg font-semibold ${language === "ar" ? "text-right font-arabic text-primary" : "text-primary"}`}>
                البيانات باللغة العربية
              </h3>

              <div className="space-y-2">
                <label className={`block text-sm font-medium ${language === "ar" ? "text-right font-arabic" : ""}`}>
                  نص المعيار (عربي)
                </label>
                <textarea
                  value={editStandardAr}
                  onChange={(e) => setEditStandardAr(e.target.value)}
                  className={`flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground ${language === "ar" ? "text-right font-arabic" : ""}`}
                  dir="rtl"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddRequirementAr}
                    className={language === "ar" ? "font-arabic" : ""}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    إضافة متطلب
                  </Button>
                  <label className={`text-sm font-medium ${language === "ar" ? "font-arabic" : ""}`}>
                    المتطلبات (عربي)
                  </label>
                </div>

                <div className="space-y-2">
                  {editReqsAr.map((req, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveRequirementAr(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Input
                        value={req}
                        onChange={(e) => handleReqChangeAr(index, e.target.value)}
                        className={`flex-1 ${language === "ar" ? "text-right font-arabic" : ""}`}
                        dir="rtl"
                        placeholder={`المتطلب #${index + 1}`}
                      />
                    </div>
                  ))}
                  {editReqsAr.length === 0 && (
                    <p className={`text-xs text-muted-foreground text-center py-2 ${language === "ar" ? "font-arabic" : ""}`}>
                      لا توجد متطلبات مضافة حالياً
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* English Fields */}
            <div className="space-y-4 pb-6">
              <h3 className={`text-lg font-semibold ${language === "ar" ? "text-right font-arabic text-primary" : "text-primary"}`}>
                Data in English
              </h3>

              <div className="space-y-2">
                <label className={`block text-sm font-medium ${language === "ar" ? "text-right font-arabic" : ""}`}>
                  Standard Text (English)
                </label>
                <textarea
                  value={editStandardEn}
                  onChange={(e) => setEditStandardEn(e.target.value)}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                  dir="ltr"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddRequirementEn}
                    className={language === "ar" ? "font-arabic" : ""}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Requirement
                  </Button>
                  <label className={`text-sm font-medium ${language === "ar" ? "font-arabic" : ""}`}>
                    Requirements (English)
                  </label>
                </div>

                <div className="space-y-2">
                  {editReqsEn.map((req, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveRequirementEn(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Input
                        value={req}
                        onChange={(e) => handleReqChangeEn(index, e.target.value)}
                        className="flex-1"
                        dir="ltr"
                        placeholder={`Requirement #${index + 1}`}
                      />
                    </div>
                  ))}
                  {editReqsEn.length === 0 && (
                    <p className={`text-xs text-muted-foreground text-center py-2 ${language === "ar" ? "font-arabic" : ""}`}>
                      No requirements added yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSaving}
                className={language === "ar" ? "font-arabic" : ""}
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button
                onClick={handleSaveStandard}
                disabled={isSaving || !editStandardAr.trim() || !editStandardEn.trim()}
                className={language === "ar" ? "font-arabic" : ""}
              >
                {isSaving
                  ? (language === "ar" ? "جاري الحفظ..." : "Saving...")
                  : (language === "ar" ? "حفظ التغييرات" : "Save Changes")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StandardsManagement;
