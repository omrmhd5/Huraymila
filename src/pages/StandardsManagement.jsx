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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    // Get status from standard or use default
    const status =
      statuses.find((s) => s.value === standard.status) || statuses[2]; // Default to "didnt_submit"

    return (
      <Badge
        variant={status.variant}
        className={`text-center ${status.className}`}>
        {status.label}
      </Badge>
    );
  };

  const getSubmissionCount = (standard) => {
    // Mock submission count - you can implement real logic
    return Math.floor(Math.random() * 5);
  };

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t("standardsManagement.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("standardsManagement.subtitle")}
        </p>
      </div>

      {/* Summary Statistics */}
      <div
        className={`grid grid-cols-1 md:grid-cols-5 gap-4
    ${language === "ar" ? "flex-row-reverse" : ""}`}>
        {[
          {
            value: standardsList.length,
            label: t("standardsManagement.totalStandards"),
            color: "text-foreground",
          },
          {
            value: standardsList.filter((s) => s.status === "approved").length,
            label: t("standardsManagement.approved"),
            color: "text-green-600",
          },
          {
            value: standardsList.filter((s) => s.status === "pending_approval")
              .length,
            label: t("standardsManagement.pendingApproval"),
            color: "text-yellow-600",
          },
          {
            value: standardsList.filter((s) => s.status === "rejected").length,
            label: t("standardsManagement.rejected"),
            color: "text-red-500",
          },
          {
            value: standardsList.filter((s) => s.status === "didnt_submit")
              .length,
            label: t("standardsManagement.didntSubmit"),
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
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      key: "id",
                      label: t("standardsManagement.id"),
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
                          {(() => {
                            const totalAgencies =
                              standard.assigned_agencies.length;

                            if (totalAgencies === 0) return "0%";

                            // Count only approved submissions
                            const approvedCount =
                              standard.status === "approved" ? 1 : 0;

                            const rawPercentage =
                              (approvedCount / totalAgencies) * 100;
                            const percentage = Math.max(
                              0,
                              Math.min(100, Math.round(rawPercentage))
                            );
                            return `${percentage}%`;
                          })()}
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
                          {t("standardsManagement.view")}
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
                      {(() => {
                        const totalAgencies =
                          selectedStandard.assigned_agencies.length;
                        if (totalAgencies === 0) return "0%";
                        const approvedCount =
                          selectedStandard.status === "approved" ? 1 : 0;
                        const rawPercentage =
                          (approvedCount / totalAgencies) * 100;
                        const percentage = Math.max(
                          0,
                          Math.min(100, Math.round(rawPercentage))
                        );
                        return `${percentage}%`;
                      })()}
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
    </div>
  );
};

export default StandardsManagement;
