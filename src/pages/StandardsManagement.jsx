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
  FileText,
  Image,
  Video,
  File,
} from "lucide-react";

const StandardsManagement = () => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const standards = Standards();

  // Get unique agencies from standards
  const allAgencies = Array.from(
    new Set(
      standards.records_for_follow_up.flatMap(
        (standard) => standard.assigned_agencies
      )
    )
  ).sort();

  // Filter standards based on search and filters
  const filteredStandards = standards.records_for_follow_up.filter(
    (standard) => {
      const matchesSearch =
        standard.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
        standard.requirements.some((req) =>
          req.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesAgency =
        selectedAgency === "all" ||
        standard.assigned_agencies.includes(selectedAgency);

      // For now, all standards are considered "active" - you can add status logic later
      const matchesStatus = selectedStatus === "all" || true;

      return matchesSearch && matchesAgency && matchesStatus;
    }
  );

  const getStatusBadge = (standard) => {
    // Mock status - you can implement real status logic based on submissions
    const hasSubmissions = Math.random() > 0.7; // Random for demo
    return hasSubmissions ? (
      <Badge variant="default" className="bg-green-500">
        {language === "ar" ? "تم التقديم" : "Submitted"}
      </Badge>
    ) : (
      <Badge variant="secondary">
        {language === "ar" ? "في الانتظار" : "Pending"}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {standards.records_for_follow_up.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "إجمالي المعايير" : "Total Standards"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(Math.random() * 30) + 20}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "تم التقديم" : "Submitted"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.floor(Math.random() * 20) + 10}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "قيد المراجعة" : "Under Review"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Math.floor(Math.random() * 15) + 5}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "في الانتظار" : "Pending"}
              </p>
            </div>
          </CardContent>
        </Card>
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
                  <SelectItem value="all">
                    {language === "ar" ? "جميع الحالات" : "All Statuses"}
                  </SelectItem>
                  <SelectItem value="submitted">
                    {language === "ar" ? "تم التقديم" : "Submitted"}
                  </SelectItem>
                  <SelectItem value="pending">
                    {language === "ar" ? "في الانتظار" : "Pending"}
                  </SelectItem>
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
                  <TableHead className="w-16">
                    {language === "ar" ? "الرقم" : "ID"}
                  </TableHead>
                  <TableHead className="min-w-[300px]">
                    {language === "ar" ? "المعيار" : "Standard"}
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    {language === "ar" ? "المتطلبات" : "Requirements"}
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    {language === "ar"
                      ? "الوكالات المسؤولة"
                      : "Responsible Agencies"}
                  </TableHead>
                  <TableHead className="w-24">
                    {language === "ar" ? "الحالة" : "Status"}
                  </TableHead>
                  <TableHead className="w-24">
                    {language === "ar" ? "التقديمات" : "Submissions"}
                  </TableHead>
                  <TableHead className="w-32">
                    {language === "ar" ? "الإجراءات" : "Actions"}
                  </TableHead>
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
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {getSubmissionCount(standard)}
                        </Badge>
                        <div className="flex gap-1">
                          <FileText className="w-3 h-3 text-blue-500" />
                          <Image className="w-3 h-3 text-green-500" />
                          <Video className="w-3 h-3 text-purple-500" />
                          <File className="w-3 h-3 text-orange-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewSubmissions(standard.id)}
                        className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        {language === "ar" ? "عرض" : "View"}
                      </Button>
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
