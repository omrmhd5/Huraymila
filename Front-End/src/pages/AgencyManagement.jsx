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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  CheckSquare,
  MessageSquare,
  Send,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  getAllAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
  getAllStandardsByNumber,
  toggleAgencyAssignment,
} from "@/lib/api";
import { smsApi } from "@/lib/smsApi";
import { mapBackendStandardsToLanguageContext } from "@/lib/utils";

const AgencyManagement = () => {
  const { user, loading, token } = useAuth();
  const { language } = useTheme();
  const { t, standards } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [agenciesList, setAgenciesList] = useState([]);
  const [allStandards, setAllStandards] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    agencyId: null,
    agencyName: "",
  });
  const [viewStandards, setViewStandards] = useState({
    show: false,
    agency: null,
  });
  const [activeTab, setActiveTab] = useState("agency"); // "agency" or "committee"
  const [showPassword, setShowPassword] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactPerson: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    assignedStandards: [],
    agencyType: "agency",
  });

  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [isSendingSms, setIsSendingSms] = useState(false);

  const handleSendSms = async (e) => {
    e.preventDefault();
    if (!smsMessage.trim()) return;
    try {
      setIsSendingSms(true);
      const response = await smsApi.sendBroadcast(smsMessage, token);
      toast.success(response.message || "تم الإرسال بنجاح");
      setShowSmsModal(false);
      setSmsMessage("");
    } catch (error) {
      toast.error(error.message || "فشل إرسال الرسالة");
    } finally {
      setIsSendingSms(false);
    }
  };

  // Initialize agencies list and standards from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agenciesData, standardsData] = await Promise.all([
          getAllAgencies(token),
          getAllStandardsByNumber(),
        ]);
        setAgenciesList(agenciesData);

        // Map backend standards to language context for proper text display
        const mappedStandards = mapBackendStandardsToLanguageContext(
          standardsData,
          standards
        );
        setAllStandards(mappedStandards);
      } catch (error) {
        // Error fetching data
        toast.error("Failed to load data");
      }
    };

    // Only fetch data when standards are available and token exists
    if (standards && Array.isArray(standards) && token) {
      fetchData();
    }
  }, [standards, token]);

  // Page title for better UX
  useEffect(() => {
    document.title = `${t("agencyManagement.title")} - Admin Dashboard`;
  }, [language, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("contactPerson.")) {
      const contactField = name.split(".")[1];
      setFormData({
        ...formData,
        contactPerson: {
          ...formData.contactPerson,
          [contactField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      (!editingAgency && !formData.password.trim())
    ) {
      toast.error(t("agencyManagement.fillRequiredFields"));
      return;
    }

    try {
      if (editingAgency) {
        // Update existing agency
        const updatedAgency = await updateAgency(
          editingAgency._id,
          formData,
          token
        );
        setAgenciesList((prev) =>
          prev.map((agency) =>
            agency._id === editingAgency._id ? updatedAgency : agency
          )
        );
        toast.success(
          language === "ar"
            ? (editingAgency.agencyType === "committee" ? "تم تحديث بيانات اللجنة بنجاح" : "تم تحديث بيانات الجهة بنجاح")
            : (editingAgency.agencyType === "committee" ? "Committee updated successfully" : "Agency updated successfully")
        );
      } else {
        // Create new agency - exclude assignedStandards
        const { assignedStandards, ...agencyData } = formData;
        const newAgency = await createAgency(agencyData, token);
        setAgenciesList((prev) => [...prev, newAgency]);
        toast.success(
          language === "ar"
            ? (agencyData.agencyType === "committee" ? "تم إضافة اللجنة بنجاح" : "تم إضافة الجهة بنجاح")
            : (agencyData.agencyType === "committee" ? "Committee added successfully" : "Agency added successfully")
        );
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        contactPerson: {
          name: "",
          email: "",
          phoneNumber: "",
        },
        assignedStandards: [],
        agencyType: "agency",
      });
      setShowPassword(false);
      setShowAddForm(false);
      setEditingAgency(null);
    } catch (error) {
      // Error saving agency
      toast.error(t("agencyManagement.operationError"));
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      contactPerson: {
        name: "",
        email: "",
        phoneNumber: "",
      },
      assignedStandards: [],
      agencyType: activeTab,
    });
    setEditingAgency(null);
    setShowPassword(false);
    setShowAddForm(true);
  };

  const handleEdit = (agency) => {
    setEditingAgency(agency);
    setFormData({
      name: agency.name,
      email: agency.email,
      password: "", // Don't pre-fill password for security
      contactPerson: agency.contactPerson || {
        name: "",
        email: "",
        phoneNumber: "",
      },
      assignedStandards: agency.assignedStandards || [],
      agencyType: agency.agencyType || "agency",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (agencyId) => {
    const agency = agenciesList.find((a) => a._id === agencyId);
    setDeleteConfirm({ show: true, agencyId, agencyName: agency?.name || "" });
  };

  const confirmDelete = async () => {
    try {
      await deleteAgency(deleteConfirm.agencyId, token);
      setAgenciesList((prev) =>
        prev.filter((agency) => agency._id !== deleteConfirm.agencyId)
      );
      toast.success(language === "ar" ? "تم حذف الحساب بنجاح" : "Account deleted successfully");
      setDeleteConfirm({ show: false, agencyId: null, agencyName: "" });
    } catch (error) {
      // Error deleting agency
      toast.error(t("agencyManagement.deleteError"));
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, agencyId: null, agencyName: "" });
  };

  const handleViewStandards = async (agency) => {
    try {
      // Fetch the latest agency data with populated assignedStandards
      const updatedAgency = await getAllAgencies(token).then((agencies) =>
        agencies.find((a) => a._id === agency._id)
      );
      setViewStandards({ show: true, agency: updatedAgency || agency });
    } catch (error) {
      // Error fetching agency data
      // Fallback to original agency data
      setViewStandards({ show: true, agency });
    }
  };

  const closeViewStandards = () => {
    setViewStandards({ show: false, agency: null });
  };

  const handleStandardToggle = async (standardId, assigned) => {
    if (isToggling) return; // Prevent multiple clicks

    try {
      setIsToggling(true);

      // Find the standard to get its _id
      const standard = allStandards.find((s) => s.id === standardId);
      if (!standard) return;

      await toggleAgencyAssignment(
        standard._id,
        viewStandards.agency._id,
        assigned,
        token
      );

      // Refresh the agency data to get the latest state
      const updatedAgency = await getAllAgencies(token).then((agencies) =>
        agencies.find((a) => a._id === viewStandards.agency._id)
      );

      // Update the agencies list with fresh data
      setAgenciesList((prev) =>
        prev.map((agency) =>
          agency._id === viewStandards.agency._id ? updatedAgency : agency
        )
      );

      // Update the viewStandards agency with fresh data
      setViewStandards((prev) => ({
        ...prev,
        agency: updatedAgency || prev.agency,
      }));

      toast.success(
        language === "ar"
          ? (assigned ? "تم التكليف بالمعيار بنجاح" : "تم إلغاء التكليف بالمعيار بنجاح")
          : (assigned ? "Standard assigned successfully" : "Standard unassigned successfully")
      );
    } catch (error) {
      // Error toggling standard assignment
      toast.error(t("agencyManagement.standardToggleError"));
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {language === "ar" ? "إدارة الجهات واللجان" : "Agencies & Committees Management"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {language === "ar"
              ? "إدارة الحسابات والصلاحيات للجان الرئيسية والجهات الشريكة"
              : "Manage accounts and permissions for main committees and partner agencies"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button
            onClick={() => setShowSmsModal(true)}
            variant="secondary"
            className="flex items-center gap-2 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            <MessageSquare className="w-4 h-4" />
            {language === "ar" ? "إرسال رسالة نصية جماعية" : "Send Broadcast SMS"}
          </Button>
          <Button
            onClick={handleAddNew}
            className="flex items-center gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            {activeTab === "agency"
              ? (language === "ar" ? "إضافة جهة شريكة" : "Add Partner Agency")
              : (language === "ar" ? "إضافة لجنة رئيسية" : "Add Main Committee")}
          </Button>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="flex border-b border-muted">
        <button
          onClick={() => setActiveTab("agency")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "agency"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          } ${language === "ar" ? "font-arabic" : "font-english"}`}
        >
          {language === "ar" ? "الجهات الشريكة" : "Partner Agencies"}
        </button>
        <button
          onClick={() => setActiveTab("committee")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "committee"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          } ${language === "ar" ? "font-arabic" : "font-english"}`}
        >
          {language === "ar" ? "اللجان الرئيسية" : "Main Committees"}
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "agency"
              ? (language === "ar" ? "قائمة الجهات الشريكة" : "Partner Agencies List")
              : (language === "ar" ? "قائمة اللجان الرئيسية" : "Main Committees List")}
          </CardTitle>
          <CardDescription>
            {activeTab === "agency"
              ? (language === "ar" ? "إدارة وتعديل بيانات الجهات الشريكة" : "Manage and update partner agencies data")
              : (language === "ar" ? "إدارة وتعديل بيانات اللجان الرئيسية" : "Manage and update main committees data")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agenciesList.filter((agency) => (agency.agencyType || "agency") === activeTab).map((agency) => (
              <div key={agency.id} className="border rounded-lg p-3 md:p-4">
                <div
                  className={`flex flex-col md:flex-row items-start md:justify-between gap-4`}>
                  <div className="flex-1 w-full">
                    <div className={`flex items-center gap-3 mb-1`}>
                      <h3 className="text-base md:text-lg font-semibold">
                        {agency.name}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                      {agency.email}
                    </p>

                    {/* Assigned Standards Count */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckSquare className="w-4 h-4 text-green-600" />
                        <span className="font-medium">
                          {language === "ar" ? "المعايير المكلفة" : "Assigned Standards"}:
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {agency.assignedStandards?.length || 0}{" "}
                          {language === "ar" ? "معيار" : "Standard"}
                        </Badge>
                      </div>
                    </div>

                    {/* Contact Information Row */}
                    <div className={`mb-4`}>
                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-sm`}>
                        {[
                          {
                            key: "contactPerson",
                            label: language === "ar" ? "الشخص المسؤول" : "Contact Person",
                            value: agency.contactPerson?.name || "",
                            order: 1,
                          },
                          {
                            key: "email",
                            label: language === "ar" ? "البريد الإلكتروني" : "Email",
                            value: agency.contactPerson?.email || "",
                            order: 2,
                          },
                          {
                            key: "phone",
                            label: language === "ar" ? "رقم الهاتف" : "Phone",
                            value: agency.contactPerson?.phoneNumber || "",
                            order: 3,
                          },
                        ].map((field) => {
                          const order =
                            language === "ar"
                              ? 1 - field.order
                              : 5 - field.order;
                          return (
                            <div key={field.key} className={`order-${order}`}>
                              <span className="font-medium">{field.label}</span>
                              <p>{field.value}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 w-full md:w-auto flex-shrink-0 ${
                      language === "ar" ? "md:mr-4" : "md:ml-4"
                    }`}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(agency)}
                      className="flex-1 md:flex-initial">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewStandards(agency)}
                      className="flex-1 md:flex-initial">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(agency._id)}
                      className="flex-1 md:flex-initial text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingAgency
                  ? (formData.agencyType === "committee"
                      ? (language === "ar" ? "تعديل بيانات اللجنة الرئيسية" : "Edit Main Committee")
                      : (language === "ar" ? "تعديل بيانات الجهة الشريكة" : "Edit Partner Agency"))
                  : (formData.agencyType === "committee"
                      ? (language === "ar" ? "إضافة لجنة رئيسية جديدة" : "Add New Main Committee")
                      : (language === "ar" ? "إضافة جهة شريكة جديدة" : "Add New Partner Agency"))}
              </CardTitle>
              <CardDescription>
                {editingAgency
                  ? (language === "ar" ? "تحديث بيانات الحساب والمسؤول" : "Update account and contact person details")
                  : (language === "ar" ? "أدخل بيانات الحساب والمسؤول لإنشاء الكيان الجديد" : "Enter account and contact person details to create the new entity")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencyType">
                      {language === "ar" ? "نوع الحساب" : "Account Type"} *
                    </Label>
                    <select
                      id="agencyType"
                      name="agencyType"
                      value={formData.agencyType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="agency">{language === "ar" ? "جهة شريكة" : "Partner Agency"}</option>
                      <option value="committee">{language === "ar" ? "لجنة رئيسية" : "Main Committee"}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {formData.agencyType === "committee"
                        ? (language === "ar" ? "اسم اللجنة" : "Committee Name")
                        : (language === "ar" ? "اسم الجهة" : "Agency Name")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={
                        formData.agencyType === "committee"
                          ? (language === "ar" ? "مثال: اللجنة التطبيقية بحريملاء" : "e.g. Applied College Committee")
                          : (language === "ar" ? "مثال: مستشفى حريملاء العام" : "e.g. Huraymila General Hospital")
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === "ar" ? "البريد الإلكتروني للحساب" : "Account Email"} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={language === "ar" ? "مثال: agency@example.com" : "e.g. agency@example.com"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {language === "ar" ? "كلمة المرور" : "Password"}{" "}
                      {!editingAgency && "*"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={
                          editingAgency && !formData.password
                            ? "Enter new password to change"
                            : t("agencyManagement.passwordPlaceholder")
                        }
                        required={!editingAgency}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {language === "ar" ? "بيانات الشخص المسؤول" : "Contact Person Information"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson.name">
                        {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                      </Label>
                      <Input
                        id="contactPerson.name"
                        name="contactPerson.name"
                        value={formData.contactPerson.name}
                        onChange={handleInputChange}
                        placeholder={language === "ar" ? "الاسم الرباعي" : "Full Name"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson.email">
                        {language === "ar" ? "البريد الإلكتروني للمسؤول" : "Contact Person Email"} *
                      </Label>
                      <Input
                        id="contactPerson.email"
                        name="contactPerson.email"
                        type="email"
                        value={formData.contactPerson.email}
                        onChange={handleInputChange}
                        placeholder="example@agency.gov.sa"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson.phoneNumber">
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"} *
                    </Label>
                    <Input
                      id="contactPerson.phoneNumber"
                      name="contactPerson.phoneNumber"
                      value={formData.contactPerson.phoneNumber}
                      onChange={handleInputChange}
                      placeholder={language === "ar" ? "05xxxxxxxx" : "05xxxxxxxx"}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingAgency
                      ? (language === "ar" ? "تحديث البيانات" : "Update Details")
                      : (language === "ar" ? "إضافة" : "Add")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAgency(null);
                      setShowPassword(false);
                      setFormData({
                        name: "",
                        email: "",
                        password: "",
                        contactPerson: {
                          name: "",
                          email: "",
                          phoneNumber: "",
                        },
                        assignedStandards: [],
                        agencyType: "agency",
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
                  ? "هل أنت متأكد من رغبتك في حذف هذا الحساب نهائياً؟ سيتم إلغاء جميع ارتباطات المعايير الإرشادية الخاصة به."
                  : "Are you sure you want to permanently delete this account? All associated guide standard assignments will be unassigned."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">
                  {language === "ar" ? "اسم الحساب:" : "Account Name:"}
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
                  {t("agencyManagement.delete")}
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                  className="flex-1">
                  {t("agencyManagement.cancel")}
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
                {t("agencyManagement.standardsModalTitle")}
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
                  {t("agencyManagement.agencyInfo")}
                </h3>
                <p className="text-muted-foreground">
                  {viewStandards.agency.name}
                </p>
              </div>

              {/* Assigned Standards Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                  {t("agencyManagement.assignedStandardsSection")}
                  {isToggling && (
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("agencyManagement.assignedStandardsDescription")}
                </p>

                {(() => {
                  const assignedStandards = allStandards.filter((standard) => {
                    const isAssigned =
                      viewStandards.agency.assignedStandards?.some(
                        (assignedItem) => {
                          // Handle both populated objects and ID strings
                          const assignedId =
                            typeof assignedItem === "object"
                              ? assignedItem._id || assignedItem.id
                              : assignedItem;
                          return (
                            assignedId.toString() === standard._id.toString()
                          );
                        }
                      );
                    return isAssigned;
                  });

                  if (assignedStandards.length === 0) {
                    return (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {t("agencyManagement.noAssignedStandards")}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid gap-3">
                      {assignedStandards.map((standard) => (
                        <Card
                          key={standard._id}
                          className={`p-3 hover:shadow-sm transition-all cursor-pointer ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20 dark:ring-green-400 ${
                            isToggling ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() =>
                            !isToggling &&
                            handleStandardToggle(standard.id, false)
                          }>
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <input
                                type="checkbox"
                                checked={true}
                                onChange={() => {}} // Handled by card click
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-sm">
                                  #{standard.number}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-800">
                                  {t("agencyManagement.assigned")}
                                </Badge>
                              </div>
                              <h5 className="font-medium text-sm leading-relaxed mb-2">
                                {standard.standard}
                              </h5>
                              {standard.requirements &&
                                standard.requirements.length > 0 && (
                                  <div className="text-xs text-muted-foreground mb-2">
                                    <span className="font-medium">
                                      {t("agencyManagement.requirements")}:
                                    </span>
                                    <ul className="list-disc list-inside mt-1">
                                      {standard.requirements
                                        .slice(0, 2)
                                        .map((req, idx) => (
                                          <li key={idx} className="truncate">
                                            {req}
                                          </li>
                                        ))}
                                      {standard.requirements.length > 2 && (
                                        <li className="text-muted-foreground">
                                          +{standard.requirements.length - 2}{" "}
                                          {t(
                                            "agencyManagement.moreRequirements"
                                          )}
                                          ...
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* All Available Standards Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  {t("agencyManagement.allStandardsSection")}
                  {isToggling && (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("agencyManagement.allStandardsDescription")}
                </p>

                {(() => {
                  const unassignedStandards = allStandards.filter(
                    (standard) => {
                      const isAssigned =
                        viewStandards.agency.assignedStandards?.some(
                          (assignedItem) => {
                            // Handle both populated objects and ID strings
                            const assignedId =
                              typeof assignedItem === "object"
                                ? assignedItem._id || assignedItem.id
                                : assignedItem;
                            return (
                              assignedId.toString() === standard._id.toString()
                            );
                          }
                        );
                      return !isAssigned;
                    }
                  );

                  if (unassignedStandards.length === 0) {
                    return (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {t("agencyManagement.allStandardsAssigned")}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid gap-3">
                      {unassignedStandards.map((standard) => (
                        <Card
                          key={standard._id}
                          className={`p-3 hover:shadow-sm transition-all cursor-pointer hover:ring-2 hover:ring-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:ring-blue-400 ${
                            isToggling ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() =>
                            !isToggling &&
                            handleStandardToggle(standard.id, true)
                          }>
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <input
                                type="checkbox"
                                checked={false}
                                onChange={() => {}} // Handled by card click
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-sm">
                                  #{standard.number}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {t("agencyManagement.available")}
                                </Badge>
                              </div>
                              <h5 className="font-medium text-sm leading-relaxed mb-2">
                                {standard.standard}
                              </h5>
                              {standard.requirements &&
                                standard.requirements.length > 0 && (
                                  <div className="text-xs text-muted-foreground mb-2">
                                    <span className="font-medium">
                                      {t("agencyManagement.requirements")}:
                                    </span>
                                    <ul className="list-disc list-inside mt-1">
                                      {standard.requirements
                                        .slice(0, 2)
                                        .map((req, idx) => (
                                          <li key={idx} className="truncate">
                                            {req}
                                          </li>
                                        ))}
                                      {standard.requirements.length > 2 && (
                                        <li className="text-muted-foreground">
                                          +{standard.requirements.length - 2}{" "}
                                          {t(
                                            "agencyManagement.moreRequirements"
                                          )}
                                          ...
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
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

      {/* SMS Broadcast Modal */}
      <Dialog open={showSmsModal} onOpenChange={setShowSmsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              {language === "ar" ? "إرسال رسالة نصية (SMS)" : "Send SMS Broadcast"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "سيتم إرسال هذه الرسالة إلى جميع أرقام هواتف مسؤولي الاتصال في جميع الجهات."
                : "This message will be sent to all contact person phone numbers across all agencies."}
            </p>
            <div className="space-y-2">
              <Label>
                {language === "ar" ? "نص الرسالة" : "Message Body"}
              </Label>
              <Textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Type your message here..."}
                className="min-h-[100px] text-right"
                dir="rtl"
              />
              <p className="text-xs text-muted-foreground text-left" dir="ltr">
                {smsMessage.length} characters
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowSmsModal(false)}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button onClick={handleSendSms} disabled={isSendingSms || !smsMessage.trim()} className="bg-blue-600 hover:bg-blue-700">
                {isSendingSms ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {language === "ar" ? "إرسال" : "Send"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgencyManagement;
