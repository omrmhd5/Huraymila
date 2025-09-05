import React, { useState } from "react";
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
import { useTheme } from "@/contexts/ThemeContext";
import Standards from "@/lib/standards";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const StandardsManagement = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [standards] = Standards();
  const [standardsList, setStandardsList] = useState(standards.records);

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

    // Status filtering logic
    const matchesStatus =
      selectedStatus === "all" || standard.status === selectedStatus;

    return matchesSearch && matchesAgency && matchesStatus;
  });

  const getStatusBadge = (standard) => {
    // Mock status - you can implement real status logic based on submissions
    const statuses = [
      {
        value: "approved",
        label: { ar: "تمت الموافقة", en: "Approved" },
        variant: "default",
        className: "bg-green-500",
      },
      {
        value: "pending_approval",
        label: { ar: "في انتظار الموافقة", en: "Pending Approval" },
        variant: "secondary",
        className: "bg-yellow-500",
      },
      {
        value: "didnt_submit",
        label: { ar: "لم يتم التقديم", en: "Didn't Submit" },
        variant: "outline",
        className: "bg-gray-300 text-black",
      },
      {
        value: "rejected",
        label: { ar: "مرفوض", en: "Rejected" },
        variant: "destructive",
        className: "bg-red-500",
      },
    ];

    // Get status from standard or use default
    const status =
      statuses.find((s) => s.value === standard.status) || statuses[2]; // Default to "didnt_submit"

    return (
      <Badge
        variant={status.variant}
        className={`text-center ${status.className}`}>
        {language === "ar" ? status.label.ar : status.label.en}
      </Badge>
    );
  };

  const getSubmissionCount = (standard) => {
    // Mock submission count - you can implement real logic
    return Math.floor(Math.random() * 5);
  };

  const viewSubmissions = (standardId) => {
    // Navigate to submissions view page
    navigate(`/admin/standards/${standardId}`);
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {language === "ar"
            ? "إدارة معايير المدينة الصحية"
            : "Health City Standards Management"}
        </h1>
        <p className="text-muted-foreground">
          {language === "ar"
            ? "مراقبة وإدارة المعايير الصحية الـ 80 مع متطلباتها والوكالات المسؤولة عنها"
            : "Monitor and manage the 80 health standards with their requirements and responsible agencies"}
        </p>
      </div>

      {/* Summary Statistics */}
      <div
        className={`grid grid-cols-1 md:grid-cols-5 gap-4
    ${language === "ar" ? "flex-row-reverse" : ""}`}>
        {[
          {
            value: standardsList.length,
            label: { en: "Total Standards", ar: "إجمالي المعايير" },
            color: "text-foreground",
          },
          {
            value: standardsList.filter((s) => s.status === "approved").length,
            label: { en: "Approved", ar: "تمت الموافقة" },
            color: "text-green-600",
          },
          {
            value: standardsList.filter((s) => s.status === "pending_approval")
              .length,
            label: { en: "Pending Approval", ar: "في انتظار الموافقة" },
            color: "text-yellow-600",
          },
          {
            value: standardsList.filter((s) => s.status === "rejected").length,
            label: { en: "Rejected", ar: "مرفوض" },
            color: "text-red-500",
          },
          {
            value: standardsList.filter((s) => s.status === "didnt_submit")
              .length,
            label: { en: "Didn't Submit", ar: "لم يتم التقديم" },
            color: "text-gray-400",
          },
        ]
          // reverse order if Arabic
          .sort(() => (language === "ar" ? -1 : 1))
          .map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? stat.label.ar : stat.label.en}
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
            {language === "ar" ? "البحث والتصفية" : "Search & Filters"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === "ar" ? "البحث في المعايير" : "Search Standards"}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={
                    language === "ar"
                      ? "ابحث في المعايير أو المتطلبات..."
                      : "Search standards or requirements..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === "ar" ? "الوكالة المسؤولة" : "Responsible Agency"}
              </label>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      language === "ar" ? "اختر الوكالة" : "Select Agency"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "ar" ? "جميع الوكالات" : "All Agencies"}
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
                {language === "ar" ? "حالة التقديم" : "Submission Status"}
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      language === "ar" ? "اختر الحالة" : "Select Status"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: "all", en: "All Statuses", ar: "جميع الحالات" },
                    { value: "approved", en: "Approved", ar: "تمت الموافقة" },
                    {
                      value: "pending_approval",
                      en: "Pending Approval",
                      ar: "في انتظار الموافقة",
                    },
                    {
                      value: "didnt_submit",
                      en: "Didn't Submit",
                      ar: "لم يتم التقديم",
                    },
                    { value: "rejected", en: "Rejected", ar: "مرفوض" },
                  ].map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {language === "ar" ? status.ar : status.en}
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
            <span>
              {language === "ar"
                ? "جدول المعايير الصحية"
                : "Health Standards Table"}
            </span>
            <Badge variant="outline">
              {filteredStandards.length}{" "}
              {language === "ar" ? "معيار" : "Standards"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    { key: "id", en: "ID", ar: "الرقم", className: "w-16" },
                    {
                      key: "standard",
                      en: "Standard",
                      ar: "المعيار",
                      className: "min-w-[300px]",
                    },
                    {
                      key: "requirements",
                      en: "Requirements",
                      ar: "المتطلبات",
                      className: "min-w-[200px]",
                    },
                    {
                      key: "agencies",
                      en: "Responsible Agencies",
                      ar: "الوكالات المسؤولة",
                      className: "min-w-[200px]",
                    },
                    {
                      key: "status",
                      en: "Status",
                      ar: "الحالة",
                      className: "w-24",
                    },
                    {
                      key: "submissions",
                      en: "Submissions",
                      ar: "التقديمات",
                      className: "w-24",
                    },
                    {
                      key: "actions",
                      en: "Actions",
                      ar: "الإجراءات",
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
                        {language === "ar" ? header.ar : header.en}
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStandards.map((standard) => (
                  <TableRow key={standard.id}>
                    <TableCell className="font-mono text-sm">
                      {standard.id}
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
                          {language === "ar" ? (
                            <>
                              {getSubmissionCount(standard)} /{" "}
                              {standard.assigned_agencies.length}
                            </>
                          ) : (
                            <>
                              {standard.assigned_agencies.length} /{" "}
                              {getSubmissionCount(standard)}
                            </>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewSubmissions(standard.id)}
                          className="w-full">
                          <Eye className="w-4 h-4 mr-1" />
                          {language === "ar" ? "عرض" : "View"}
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            standard.status === "approved" ||
                            standard.status === "rejected"
                              ? "default"
                              : "outlined"
                          }
                          disabled={standard.status === "didnt_submit"}
                          onClick={() => toggleStatus(standard)}
                          className={`w-full ${
                            standard.status === "rejected" ||
                            standard.status === "pending_approval"
                              ? "bg-green-700 text-green-50 border-green-200 hover:bg-green-500"
                              : standard.status === "approved"
                              ? "bg-red-700 text-red-50 border-red-200 hover:bg-red-500"
                              : "bg-gray-700 text-gray-50 border-gray-200"
                          }`}>
                          {standard.status === "approved" ? (
                            <XCircle className="w-4 h-4 mr-1" />
                          ) : standard.status === "didnt_submit" ? (
                            <AlertCircle className="w-4 h-4 mr-1" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          )}
                          {standard.status === "rejected" ||
                          standard.status === "pending_approval"
                            ? language === "ar"
                              ? "موافقة"
                              : "Approve"
                            : standard.status === "approved"
                            ? language === "ar"
                              ? "رفض"
                              : "Reject"
                            : language === "ar"
                            ? "لم يتم التقديم"
                            : "No Submissions"}
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
    </div>
  );
};

export default StandardsManagement;
