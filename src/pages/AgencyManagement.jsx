import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Users,
  Target,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  CheckSquare,
  Square,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import Standards from "@/lib/standards";

const AgencyManagement = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [agenciesList, setAgenciesList] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    agencyId: null,
    agencyName: "",
  });
  const [viewStandards, setViewStandards] = useState({
    show: false,
    agency: null,
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    agencyEmail: "",
    agencyPassword: "",
  });

  // Initialize agencies list
  useEffect(() => {
    setAgenciesList(agencies);
  }, []);

  // Get standards data
  const [standards, agencyToStandardsMap] = Standards();

  // Page title for better UX
  useEffect(() => {
    document.title =
      language === "ar"
        ? "إدارة الجهات - لوحة التحكم الإدارية"
        : "Agency Management - Admin Dashboard";
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Mock data
  const agencies = [
    {
      id: 1,
      name: "وزارة الصحة - حريملاء",
      description: "الجهة المسؤولة عن الصحة العامة في المدينة",
      contactPerson: "د. أحمد محمد",
      email: "ahmed@moh.gov.sa",
      phone: "+966-11-123-4567",
      address: "شارع الملك فهد، حريملاء",
      agencyEmail: "health@huraymila.gov.sa",
      agencyPassword: "health123",
      initiatives: 12,
      volunteers: 45,
    },
    {
      id: 2,
      name: "بلدية حريملاء",
      description: "إدارة البلدية والخدمات البلدية",
      contactPerson: "م. سارة العتيبي",
      email: "sara@baladiyah.gov.sa",
      phone: "+966-11-123-4568",
      address: "مبنى البلدية، حريملاء",
      agencyEmail: "municipality@huraymila.gov.sa",
      agencyPassword: "municipality123",
      initiatives: 8,
      volunteers: 32,
    },
    {
      id: 3,
      name: "مستشفى حريملاء العام",
      description: "المستشفى الرئيسي في المدينة",
      contactPerson: "د. فاطمة الزهراني",
      email: "fatima@hospital.gov.sa",
      phone: "+966-11-123-4569",
      address: "شارع المستشفى، حريملاء",
      agencyEmail: "hospital@huraymila.gov.sa",
      agencyPassword: "hospital123",
      initiatives: 15,
      volunteers: 120,
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    try {
      if (editingAgency) {
        // Update existing agency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAgenciesList((prev) =>
          prev.map((agency) =>
            agency.id === editingAgency.id ? { ...agency, ...formData } : agency
          )
        );
        toast.success(
          language === "ar"
            ? "تم تحديث بيانات الجهة بنجاح"
            : "Agency data updated successfully"
        );
      } else {
        // Create new agency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newAgency = {
          id: Date.now(), // Simple ID generation
          ...formData,
          initiatives: Math.floor(Math.random() * 20) + 5,
          volunteers: Math.floor(Math.random() * 50) + 10,
        };
        setAgenciesList((prev) => [...prev, newAgency]);
        toast.success(
          language === "ar"
            ? "تم إضافة الجهة الجديدة بنجاح"
            : "New agency added successfully"
        );
      }

      setFormData({
        name: "",
        description: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        agencyEmail: "",
        agencyPassword: "",
      });
      setShowAddForm(false);
      setEditingAgency(null);
    } catch (error) {
      toast.error(
        language === "ar"
          ? "حدث خطأ في العملية"
          : "An error occurred during the operation"
      );
    }
  };

  const handleEdit = (agency) => {
    setEditingAgency(agency);
    setFormData({
      name: agency.name,
      description: agency.description,
      contactPerson: agency.contactPerson,
      email: agency.email,
      phone: agency.phone,
      address: agency.address,
      agencyEmail: agency.agencyEmail,
      agencyPassword: agency.agencyPassword,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (agencyId) => {
    const agency = agenciesList.find((a) => a.id === agencyId);
    setDeleteConfirm({ show: true, agencyId, agencyName: agency?.name || "" });
  };

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAgenciesList((prev) =>
        prev.filter((agency) => agency.id !== deleteConfirm.agencyId)
      );
      toast.success(
        language === "ar" ? "تم حذف الجهة بنجاح" : "Agency deleted successfully"
      );
      setDeleteConfirm({ show: false, agencyId: null, agencyName: "" });
    } catch (error) {
      toast.error(
        language === "ar"
          ? "حدث خطأ في الحذف"
          : "An error occurred during deletion"
      );
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, agencyId: null, agencyName: "" });
  };

  const handleViewStandards = (agency) => {
    setViewStandards({ show: true, agency });
  };

  const closeViewStandards = () => {
    setViewStandards({ show: false, agency: null });
  };

  const getAgencyStandards = (agencyName) => {
    const standardIds = agencyToStandardsMap[agencyName] || [];
    return standards.records.filter((standard) =>
      standardIds.includes(standard.id)
    );
  };

  const getUnassignedStandards = (agencyName) => {
    const assignedIds = agencyToStandardsMap[agencyName] || [];
    return standards.records.filter(
      (standard) => !assignedIds.includes(standard.id)
    );
  };

  const toggleStandardAssignment = (standardId, agencyName) => {
    // This would typically update the backend
    // For now, we'll just show a toast message
    const isCurrentlyAssigned = (
      agencyToStandardsMap[agencyName] || []
    ).includes(standardId);
    const action = isCurrentlyAssigned ? "unassigned" : "assigned";

    toast.success(
      language === "ar"
        ? `تم ${isCurrentlyAssigned ? "إلغاء تعيين" : "تعيين"} المعيار بنجاح`
        : `Standard ${action} successfully`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "ar" ? "إدارة الجهات " : "Agency Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "إدارة الجهات الحكومية المشاركة في مبادرة المدينة الصحية"
              : "Manage government agencies participating in the Healthy City initiative"}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {language === "ar" ? "إضافة جهة جديدة" : "Add New Agency"}
        </Button>
      </div>

      <Tabs value="agencies" className="space-y-6">
        {/* Agencies Tab */}
        <TabsContent value="agencies">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ar" ? "قائمة الجهات" : "Agencies List"}
              </CardTitle>
              <CardDescription>
                {language === "ar"
                  ? "إدارة جميع الجهات المشاركة"
                  : "Manage all participating agencies"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agenciesList.map((agency) => (
                  <div key={agency.id} className="border rounded-lg p-4">
                    <div
                      className={`flex items-start justify-between ${
                        language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}>
                      <div className="flex-1">
                        <div
                          className={`flex items-center gap-3 mb-2 ${
                            language === "ar" ? "flex-row-reverse" : "flex-row"
                          }`}>
                          <h3 className="text-lg font-semibold">
                            {agency.name}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {agency.description}
                        </p>

                        {/* Agency Information Row */}
                        <div
                          className={`mb-4 w-1/2 ${
                            language === "ar"
                              ? "text-right justify-self-end"
                              : "text-left"
                          }`}>
                          <div
                            className={`grid grid-cols-1 md:grid-cols-2 text-sm ${
                              language === "ar"
                                ? "justify-items-end"
                                : "justify-items-start"
                            }`}>
                            <div
                              className={` mb-2 ${
                                language === "ar" ? "order-2" : "order-1"
                              }
                              `}>
                              <span className="font-medium">
                                {language === "ar"
                                  ? ":بريد الجهة"
                                  : "Agency Email:"}
                              </span>
                              <p>{agency.agencyEmail}</p>
                            </div>
                            <div
                              className={` mb-2 ${
                                language === "ar" ? "order-1" : "order-2"
                              }
                              `}>
                              <span className="font-medium">
                                {language === "ar"
                                  ? ":كلمة مرور الجهة"
                                  : "Agency Password:"}
                              </span>
                              <p className="font-mono text-xs bg-muted p-1 rounded">
                                {agency.agencyPassword ? "••••••••" : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information Row */}
                        <div
                          className={`mb-4 ${
                            language === "ar" ? "text-right" : "text-left"
                          }`}>
                          <div
                            className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm ${
                              language === "ar"
                                ? "justify-items-end"
                                : "justify-items-start"
                            }`}>
                            {[
                              {
                                key: "contactPerson",
                                label: {
                                  en: "Contact Person:",
                                  ar: "الشخص المسؤول:",
                                },
                                value: agency.contactPerson,
                                order: 1,
                              },
                              {
                                key: "email",
                                label: {
                                  en: "Person's Email:",
                                  ar: "البريد الشخص الإلكتروني:",
                                },
                                value: agency.email,
                                order: 2,
                              },
                              {
                                key: "phone",
                                label: { en: "Phone:", ar: "الهاتف:" },
                                value: agency.phone,
                                order: 3,
                              },
                              {
                                key: "address",
                                label: { en: "Address:", ar: "العنوان:" },
                                value: agency.address,
                                order: 4,
                              },
                            ].map((field) => {
                              const order =
                                language === "ar"
                                  ? 5 - field.order
                                  : field.order;
                              return (
                                <div
                                  key={field.key}
                                  className={`order-${order}`}>
                                  <span className="font-medium">
                                    {language === "ar"
                                      ? field.label.ar
                                      : field.label.en}
                                  </span>
                                  <p>{field.value}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-4 mt-3 text-sm text-muted-foreground ${
                            language === "ar" ? "justify-end" : "justify-start"
                          }`}>
                          <span
                            className={`flex items-center gap-1 ${
                              language === "ar" ? "order-2" : "order-1"
                            }`}>
                            <Target className="w-4 h-4" />
                            {agency.initiatives}{" "}
                            {language === "ar" ? "مبادرة" : "initiatives"}
                          </span>
                          <span
                            className={`flex items-center gap-1 ${
                              language === "ar" ? "order-1" : "order-2"
                            }`}>
                            {" "}
                            <Users className="w-4 h-4" />
                            {agency.volunteers}{" "}
                            {language === "ar" ? "متطوع" : "volunteers"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(agency)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewStandards(agency)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(agency.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingAgency
                  ? language === "ar"
                    ? "تعديل الجهة"
                    : "Edit Agency"
                  : language === "ar"
                  ? "إضافة جهة جديدة"
                  : "Add New Agency"}
              </CardTitle>
              <CardDescription>
                {editingAgency
                  ? language === "ar"
                    ? "تحديث بيانات الجهة"
                    : "Update agency data"
                  : language === "ar"
                  ? "إدخال بيانات الجهة الجديدة"
                  : "Enter new agency data"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === "ar" ? "اسم الجهة *" : "Agency Name *"}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={
                        language === "ar" ? "اسم الجهة" : "Agency name"
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    {language === "ar" ? "وصف الجهة *" : "Agency Description *"}
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={
                      language === "ar"
                        ? "وصف مختصر عن الجهة ومهامها"
                        : "Brief description of the agency and its tasks"
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencyEmail">
                      {language === "ar"
                        ? "بريد الجهة الإلكتروني"
                        : "Agency Email"}
                    </Label>
                    <Input
                      id="agencyEmail"
                      name="agencyEmail"
                      type="email"
                      value={formData.agencyEmail}
                      onChange={handleInputChange}
                      placeholder={
                        language === "ar"
                          ? "agency@example.gov.sa"
                          : "agency@example.gov.sa"
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencyPassword">
                      {language === "ar"
                        ? "كلمة مرور الجهة"
                        : "Agency Password"}
                    </Label>
                    <Input
                      id="agencyPassword"
                      name="agencyPassword"
                      value={formData.agencyPassword}
                      onChange={handleInputChange}
                      placeholder={
                        language === "ar" ? "كلمة المرور" : "Password"
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">
                      {language === "ar" ? "الشخص المسؤول" : "Contact Person"}
                    </Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder={
                        language === "ar"
                          ? "اسم الشخص المسؤول"
                          : "Contact person name"
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === "ar"
                        ? "البريد الشخص الإلكتروني"
                        : "Person's Email"}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@agency.gov.sa"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+966-11-123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    {language === "ar" ? "العنوان" : "Address"}
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={
                      language === "ar" ? "عنوان الجهة" : "Agency address"
                    }
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingAgency
                      ? language === "ar"
                        ? "تحديث"
                        : "Update"
                      : language === "ar"
                      ? "إضافة"
                      : "Add"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAgency(null);
                      setFormData({
                        name: "",
                        description: "",
                        contactPerson: "",
                        email: "",
                        phone: "",
                        address: "",
                        agencyEmail: "",
                        agencyPassword: "",
                      });
                    }}>
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                {language === "ar" ? "تأكيد الحذف" : "Confirm Deletion"}
              </CardTitle>
              <CardDescription>
                {language === "ar"
                  ? "هل أنت متأكد من حذف هذه الجهة؟"
                  : "Are you sure you want to delete this agency?"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">
                  {language === "ar" ? "اسم الجهة:" : "Agency Name:"}
                </p>
                <p className="text-muted-foreground">
                  {deleteConfirm.agencyName}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  className="flex-1">
                  {language === "ar" ? "حذف" : "Delete"}
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                  className="flex-1">
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Standards Modal */}
      <Dialog open={viewStandards.show} onOpenChange={setViewStandards}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {language === "ar" ? "المعايير المخصصة" : "Assigned Standards"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeViewStandards}
                className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {viewStandards.agency && (
            <div className="space-y-6">
              {/* Agency Info */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {viewStandards.agency.name}
                </h3>
                <p className="text-muted-foreground">
                  {viewStandards.agency.description}
                </p>
              </div>

              {/* Assigned Standards Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                  {language === "ar"
                    ? "المعايير المخصصة"
                    : "Assigned Standards"}
                </h4>

                {(() => {
                  const assignedStandards = getAgencyStandards(
                    viewStandards.agency.name
                  );

                  if (assignedStandards.length === 0) {
                    return (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {language === "ar"
                            ? "لا توجد معايير مخصصة لهذه الجهة"
                            : "No standards assigned to this agency"}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid gap-3 max-h-60 overflow-y-auto">
                      {assignedStandards.map((standard) => (
                        <Card
                          key={standard.id}
                          className="p-3 hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() =>
                                toggleStandardAssignment(
                                  standard.id,
                                  viewStandards.agency.name
                                )
                              }
                              className="mt-1 text-green-600 hover:text-green-700 transition-colors">
                              <CheckSquare className="w-4 h-4" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  #{standard.id}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {language === "ar" ? "معيار" : "Standard"}
                                </span>
                              </div>
                              <h5 className="font-medium text-sm leading-relaxed mb-2">
                                {standard.standard}
                              </h5>
                              <div className="text-xs text-muted-foreground">
                                {standard.requirements.length}{" "}
                                {language === "ar" ? "متطلب" : "requirements"}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Unassigned Standards Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-500" />
                  {language === "ar"
                    ? "المعايير غير المخصصة"
                    : "Unassigned Standards"}
                </h4>

                {(() => {
                  const unassignedStandards = getUnassignedStandards(
                    viewStandards.agency.name
                  );

                  if (unassignedStandards.length === 0) {
                    return (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {language === "ar"
                            ? "جميع المعايير مخصصة لهذه الجهة"
                            : "All standards are assigned to this agency"}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid gap-3 max-h-60 overflow-y-auto">
                      {unassignedStandards.map((standard) => (
                        <Card
                          key={standard.id}
                          className="p-3 hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() =>
                                toggleStandardAssignment(
                                  standard.id,
                                  viewStandards.agency.name
                                )
                              }
                              className="mt-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Square className="w-4 h-4" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  #{standard.id}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {language === "ar" ? "معيار" : "Standard"}
                                </span>
                              </div>
                              <h5 className="font-medium text-sm leading-relaxed mb-2">
                                {standard.standard}
                              </h5>
                              <div className="text-xs text-muted-foreground">
                                {standard.requirements.length}{" "}
                                {language === "ar" ? "متطلب" : "requirements"}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgencyManagement;
