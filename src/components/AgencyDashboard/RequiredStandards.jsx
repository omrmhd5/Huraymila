import React, { useState } from "react";
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

const RequiredStandards = ({ language, assignedStandards }) => {
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

  // Mock submissions data - in real app, this would come from API
  const [submissions, setSubmissions] = useState({});

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
            {language === "ar" ? "موافق عليه" : "Approved"}
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="destructive"
            className={language === "ar" ? "font-arabic" : "font-sans"}>
            {language === "ar" ? "مرفوض" : "Rejected"}
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge
            variant="secondary"
            className={`bg-yellow-100 text-yellow-800 border-yellow-200 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "في انتظار الموافقة" : "Pending Approval"}
          </Badge>
        );
      case "didnt_submit":
        return (
          <Badge
            variant="outline"
            className={`bg-gray-100 text-gray-700 border-gray-300 ${
              language === "ar" ? "font-arabic" : "font-sans"
            }`}>
            {language === "ar" ? "لم يقدم" : "Didn't Submit"}
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

  const getSubmissionTypeText = (type) => {
    switch (type) {
      case "text":
        return language === "ar" ? "نص" : "Text";
      case "pdf":
        return language === "ar" ? "ملف PDF" : "PDF File";
      case "photo":
        return language === "ar" ? "صورة" : "Photo";
      case "video":
        return language === "ar" ? "فيديو" : "Video";
      default:
        return language === "ar" ? "غير محدد" : "Undefined";
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
        // Add new submission
        setSubmissions((prev) => ({
          ...prev,
          [submissionData.standardId]: submissionData,
        }));
        toast.success(
          language === "ar"
            ? "تم إضافة التقديم بنجاح"
            : "Submission added successfully"
        );
      } else if (submissionModal.mode === "edit") {
        // Update existing submission
        setSubmissions((prev) => ({
          ...prev,
          [submissionData.standardId]: submissionData,
        }));
        toast.success(
          language === "ar"
            ? "تم تحديث التقديم بنجاح"
            : "Submission updated successfully"
        );
      }
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error(
        language === "ar" ? "حدث خطأ في حفظ التقديم" : "Error saving submission"
      );
    }
  };

  // Get submission for a standard
  const getSubmissionForStandard = (standardId) => {
    return submissions[standardId] || null;
  };
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
            {language === "ar"
              ? "ملخص المعايير المطلوبة"
              : "Required Standards Summary"}
          </CardTitle>
          <CardDescription
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {language === "ar"
              ? "المعايير المخصصة للجهة وحالة التنفيذ"
              : "Standards assigned to the agency and implementation status"}
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
                {language === "ar" ? "موافق عليه" : "Approved"}
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
                {language === "ar" ? "مرفوض" : "Rejected"}
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
                {language === "ar" ? "في انتظار الموافقة" : "Pending Approval"}
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
                {language === "ar" ? "لم يتم التقديم" : "Didn't Submit"}
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
            {language === "ar"
              ? "المعايير المخصصة للجهة"
              : "Assigned Standards"}
          </CardTitle>
          <CardDescription
            className={
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }>
            {language === "ar"
              ? "قائمة المعايير التي يجب على الجهة تنفيذها"
              : "List of standards that the agency must implement"}
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
                  <SelectValue
                    placeholder={language === "ar" ? "الكل" : "All"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "الكل" : "All"}
                  </SelectItem>
                  <SelectItem
                    value="approved"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "موافق عليه" : "Approved"}
                  </SelectItem>
                  <SelectItem
                    value="rejected"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "مرفوض" : "Rejected"}
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
                    <div
                      className={`flex items-center gap-3 ${
                        language === "ar" ? "flex-row-reverse" : ""
                      }`}>
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
                              <span>{`${standard.id}`}</span>
                            </>
                          ) : (
                            <>
                              {standard.id}. {standard.standard}
                            </>
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3 ${
                      language === "ar" ? "rtl" : "ltr"
                    }`}>
                    {language === "ar" ? (
                      <>
                        <div
                          className={`flex items-center gap-2 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {language === "ar" ? "الحالة:" : "Status:"}
                          </span>
                          {getStandardStatusBadge(standard.status)}
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {language === "ar"
                              ? "نوع التقديم:"
                              : "Submission Type:"}
                          </span>
                          <span
                            className={`text-muted-foreground ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {getSubmissionTypeText(standard.submissionType)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`flex items-center gap-2 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {language === "ar"
                              ? "نوع التقديم:"
                              : "Submission Type:"}
                          </span>
                          <span
                            className={`text-muted-foreground ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {getSubmissionTypeText(standard.submissionType)}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            language === "ar" ? "flex-row-reverse" : ""
                          }`}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {language === "ar" ? "الحالة:" : "Status:"}
                          </span>
                          {getStandardStatusBadge(standard.status)}
                        </div>
                      </>
                    )}
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
