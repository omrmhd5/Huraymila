import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Edit, Plus } from "lucide-react";
import SubmissionModal from "@/components/AgencyDashboard/Modals/SubmissionModal";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { agencyApi } from "@/lib/agencyApi";

const RequiredStandards = ({ assignedStandards, loading = false }) => {
  const { t, language } = useLanguage();
  const { token } = useAuth();

  // Component-specific state
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Submission modal state
  const [submissionModal, setSubmissionModal] = useState({
    isOpen: false,
    mode: "add", // "add", "edit", "view"
    standardId: null,
    standardTitle: "",
    submission: null,
  });

  // Real submissions data from API
  const [submissions, setSubmissions] = useState({});
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  // Load submissions when component mounts
  useEffect(() => {
    const loadSubmissions = async () => {
      if (!token) return;

      try {
        setSubmissionsLoading(true);
        const response = await agencyApi.getMySubmissions(token);

        // Group submissions by standard number
        const submissionsByStandard = {};
        response.data.forEach((submission) => {
          const standardNumber = submission.standardNumber;
          if (!submissionsByStandard[standardNumber]) {
            submissionsByStandard[standardNumber] = [];
          }
          submissionsByStandard[standardNumber].push(submission);
        });

        setSubmissions(submissionsByStandard);
      } catch (error) {
        console.error("Error loading submissions:", error);
        toast.error(
          language === "ar"
            ? "فشل في تحميل التقديمات"
            : "Failed to load submissions"
        );
      } finally {
        setSubmissionsLoading(false);
      }
    };

    loadSubmissions();
  }, [token, language]);

  // Filter standards based on search and status
  const filteredStandards = assignedStandards.filter((standard) => {
    const matchesSearch =
      searchTerm === "" ||
      standard.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      standard.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || standard.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Component-specific functions
  const getStandardStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="default"
            className={`bg-green-500 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {t("requiredStandards.approved")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="destructive"
            className={language === "ar" ? "font-arabic" : "font-sans"}>
            {t("requiredStandards.rejected")}
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge
            variant="secondary"
            className={`bg-yellow-100 text-yellow-800 border-yellow-200 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {t("requiredStandards.pendingApproval")}
          </Badge>
        );
      case "didnt_submit":
        return (
          <Badge
            variant="outline"
            className={`bg-gray-100 text-gray-700 border-gray-300 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {t("requiredStandards.didntSubmit")}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className={language === "ar" ? "font-arabic" : "font-sans"}>
            {status}
          </Badge>
        );
    }
  };

  // Submission modal handlers
  const openSubmissionModal = (
    mode,
    standardId,
    standardTitle,
    submission = null
  ) => {
    setSubmissionModal({
      isOpen: true,
      mode,
      standardId,
      standardTitle,
      submission,
    });
  };

  const closeSubmissionModal = () => {
    setSubmissionModal({
      isOpen: false,
      mode: "add",
      standardId: null,
      standardTitle: "",
      submission: null,
    });
  };

  const handleSubmissionSubmit = async (submissionData) => {
    try {
      if (submissionModal.mode === "add") {
        // Find the standard to get the standardNumber
        const standard = assignedStandards.find(
          (s) => s.id === submissionModal.standardId
        );
        if (!standard) {
          throw new Error("Standard not found");
        }

        const apiData = {
          standardNumber: standard.number,
          title: submissionData.title,
          description: submissionData.description,
          notes: submissionData.notes,
        };

        const response = await agencyApi.createSubmission(
          token,
          apiData,
          submissionData.files
        );

        // Update local state
        setSubmissions((prev) => {
          const standardNumber = standard.number;
          const existingSubmissions = prev[standardNumber] || [];
          return {
            ...prev,
            [standardNumber]: [...existingSubmissions, response.data],
          };
        });

        toast.success(
          language === "ar"
            ? "تم إنشاء التقديم بنجاح"
            : "Submission created successfully"
        );

        // Optionally trigger a refresh of standards to update their status
        if (typeof window !== "undefined") {
          // Dispatch a custom event to notify other components
          window.dispatchEvent(
            new CustomEvent("submissionUpdated", {
              detail: { standardNumber: standard.number },
            })
          );
        }
      } else if (submissionModal.mode === "edit") {
        const updateData = {
          title: submissionData.title,
          description: submissionData.description,
          notes: submissionData.notes,
        };

        // For updates, we need to handle existing files
        // Keep existing files that weren't removed + add new files
        const existingFileUrls = submissionData.existingFiles
          ? submissionData.existingFiles.map((file) => file.url)
          : [];

        const response = await agencyApi.updateMySubmission(
          token,
          submissionModal.submission._id,
          { ...updateData, existingFileUrls },
          submissionData.files
        );

        // Update local state
        setSubmissions((prev) => {
          const standardNumber = submissionModal.submission.standardNumber;
          const existingSubmissions = prev[standardNumber] || [];
          const updatedSubmissions = existingSubmissions.map((sub) =>
            sub._id === response.data._id ? response.data : sub
          );
          return {
            ...prev,
            [standardNumber]: updatedSubmissions,
          };
        });

        toast.success(
          language === "ar"
            ? "تم تحديث التقديم بنجاح"
            : "Submission updated successfully"
        );

        // Optionally trigger a refresh of standards to update their status
        if (typeof window !== "undefined") {
          // Dispatch a custom event to notify other components
          window.dispatchEvent(
            new CustomEvent("submissionUpdated", {
              detail: {
                standardNumber: submissionModal.submission.standardNumber,
              },
            })
          );
        }
      }
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error(
        language === "ar"
          ? "حدث خطأ في معالجة التقديم"
          : "Error processing submission"
      );
    }
  };

  // Get submission for a standard
  const getSubmissionForStandard = (standardId) => {
    // Find the standard to get its number
    const standard = assignedStandards.find((s) => s.id === standardId);
    if (!standard) return null;

    const standardSubmissions = submissions[standard.number] || [];
    // Return the first submission for this standard (you might want to handle multiple submissions differently)
    return standardSubmissions.length > 0 ? standardSubmissions[0] : null;
  };
  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p
                className={`text-muted-foreground ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "جاري تحميل المعايير..."
                  : "Loading standards..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Standards Summary */}
      <Card>
        <CardHeader>
          <CardTitle
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {t("requiredStandards.title")}
          </CardTitle>
          <CardDescription
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {t("requiredStandards.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div
                className={`text-2xl font-bold text-green-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {
                  assignedStandards.filter((s) => s.status === "approved")
                    .length
                }
              </div>
              <div
                className={`text-sm text-green-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {t("requiredStandards.approved")}
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div
                className={`text-2xl font-bold text-red-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {
                  assignedStandards.filter((s) => s.status === "rejected")
                    .length
                }
              </div>
              <div
                className={`text-sm text-red-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {t("requiredStandards.rejected")}
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div
                className={`text-2xl font-bold text-yellow-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {
                  assignedStandards.filter(
                    (s) => s.status === "pending_approval"
                  ).length
                }
              </div>
              <div
                className={`text-sm text-yellow-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {t("requiredStandards.pendingApproval")}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div
                className={`text-2xl font-bold text-gray-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {
                  assignedStandards.filter((s) => s.status === "didnt_submit")
                    .length
                }
              </div>
              <div
                className={`text-sm text-gray-600 ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {t("requiredStandards.didntSubmit")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Standards List */}
      <Card>
        <CardHeader>
          <CardTitle
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {t("requiredStandards.assignedStandards")}
          </CardTitle>
          <CardDescription
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {t("requiredStandards.assignedStandardsDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Select Input */}
          <div className="mb-6 space-y-4">
            <div className="w-1/2">
              {/* Status filter dropdown */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className={
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }>
                  <SelectValue placeholder={t("requiredStandards.all")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("requiredStandards.all")}
                  </SelectItem>
                  <SelectItem
                    value="approved"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("requiredStandards.approved")}
                  </SelectItem>
                  <SelectItem
                    value="rejected"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("requiredStandards.rejected")}
                  </SelectItem>
                  <SelectItem
                    value="pending_approval"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "في انتظار الموافقة"
                      : "Pending Approval"}
                  </SelectItem>
                  <SelectItem
                    value="didnt_submit"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "لم يقدم" : "Didn't Submit"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredStandards.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                    />
                  </svg>
                </div>
                <p
                  className={`text-gray-500 ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "لا توجد معايير تطابق البحث"
                    : "No standards match your search"}
                </p>
              </div>
            ) : (
              filteredStandards.map((standard) => (
                <div key={standard.id} className="border rounded-lg p-4">
                  <div
                    className={`flex items-start justify-between mb-3 ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}>
                    <div className={`flex items-center gap-3`}>
                      <span> </span>
                      <div
                        className={
                          language === "ar" ? "text-right" : "text-left"
                        }>
                        <h3
                          className={`flex items-center justify-between text-lg font-semibold ${
                            language === "ar" ? "font-arabic" : "font-sans"
                          }`}>
                          {language === "ar" ? (
                            <>
                              <span>{standard.standard}</span>
                              <span>{`${standard.number}`}</span>
                            </>
                          ) : (
                            <>
                              {standard.number}. {standard.standard}
                            </>
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 mb-3 ${
                      language === "ar" ? "flex-row-reverse rtl" : "ltr"
                    }`}>
                    <span
                      className={`font-medium text-sm ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "الحالة:" : "Status:"}
                    </span>
                    {getStandardStatusBadge(standard.status)}
                  </div>

                  <div className={`mb-3 ${language === "ar" ? "rtl" : "ltr"}`}>
                    <span
                      className={`font-medium text-sm ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "المتطلبات:" : "Requirements:"}
                    </span>
                    <ul
                      className={`text-sm text-muted-foreground mt-1 ${
                        language === "ar"
                          ? "text-right font-arabic list-disc list-inside"
                          : "text-left font-sans list-disc list-inside"
                      }`}
                      dir={language === "ar" ? "rtl" : "ltr"}>
                      {standard.requirements.map((req, index) => (
                        <li
                          key={index}
                          className={
                            language === "ar" ? "text-right" : "text-left"
                          }>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`flex items-center gap-2 ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}>
                    {getSubmissionForStandard(standard.id) ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openSubmissionModal(
                              "view",
                              standard.id,
                              standard.standard,
                              getSubmissionForStandard(standard.id)
                            )
                          }
                          className={
                            language === "ar" ? "font-arabic" : "font-sans"
                          }>
                          <Eye className="w-4 h-4" />
                          {language === "ar"
                            ? "عرض التقديم"
                            : "View Submission"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openSubmissionModal(
                              "edit",
                              standard.id,
                              standard.standard,
                              getSubmissionForStandard(standard.id)
                            )
                          }
                          className={
                            language === "ar" ? "font-arabic" : "font-sans"
                          }>
                          <Edit className="w-4 h-4" />
                          {language === "ar"
                            ? "تعديل التقديم"
                            : "Edit Submission"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openSubmissionModal(
                            "add",
                            standard.id,
                            standard.standard
                          )
                        }
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        <Plus className="w-4 h-4" />
                        {language === "ar" ? "إضافة تقديم" : "Add Submission"}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={submissionModal.isOpen}
        onClose={closeSubmissionModal}
        mode={submissionModal.mode}
        standardId={submissionModal.standardId}
        standardTitle={submissionModal.standardTitle}
        submission={submissionModal.submission}
        onSubmit={handleSubmissionSubmit}
      />
    </div>
  );
};

export default RequiredStandards;
