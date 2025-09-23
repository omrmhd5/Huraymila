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
} from "@/lib/api";

const AgencyManagement = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();
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
  const [showPassword, setShowPassword] = useState(false);
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
  });

  // Initialize agencies list from backend
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const agenciesData = await getAllAgencies();
        setAgenciesList(agenciesData);
      } catch (error) {
        console.error("Error fetching agencies:", error);
        toast.error("Failed to load agencies");
      }
    };

    fetchAgencies();
  }, []);

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
        const updatedAgency = await updateAgency(editingAgency._id, formData);
        setAgenciesList((prev) =>
          prev.map((agency) =>
            agency._id === editingAgency._id ? updatedAgency : agency
          )
        );
        toast.success(t("agencyManagement.agencyUpdated"));
      } else {
        // Create new agency - exclude assignedStandards
        const { assignedStandards, ...agencyData } = formData;
        const newAgency = await createAgency(agencyData);
        setAgenciesList((prev) => [...prev, newAgency]);
        toast.success(t("agencyManagement.agencyAdded"));
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
      });
      setShowPassword(false);
      setShowAddForm(false);
      setEditingAgency(null);
    } catch (error) {
      console.error("Error saving agency:", error);
      toast.error(t("agencyManagement.operationError"));
    }
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
    });
    setShowAddForm(true);
  };

  const handleDelete = async (agencyId) => {
    const agency = agenciesList.find((a) => a._id === agencyId);
    setDeleteConfirm({ show: true, agencyId, agencyName: agency?.name || "" });
  };

  const confirmDelete = async () => {
    try {
      await deleteAgency(deleteConfirm.agencyId);
      setAgenciesList((prev) =>
        prev.filter((agency) => agency._id !== deleteConfirm.agencyId)
      );
      toast.success(t("agencyManagement.agencyDeleted"));
      setDeleteConfirm({ show: false, agencyId: null, agencyName: "" });
    } catch (error) {
      console.error("Error deleting agency:", error);
      toast.error(t("agencyManagement.deleteError"));
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("agencyManagement.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("agencyManagement.subtitle")}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t("agencyManagement.addNewAgency")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("agencyManagement.agenciesList")}</CardTitle>
          <CardDescription>
            {t("agencyManagement.manageAgencies")}
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
                      className={`flex items-center gap-3 mb-1 ${
                        language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}>
                      <h3 className="text-lg font-semibold">{agency.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{agency.email}</p>

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
                            label: t("agencyManagement.contactPerson"),
                            value: agency.contactPerson?.name || "",
                            order: 1,
                          },
                          {
                            key: "email",
                            label: t("agencyManagement.personEmail"),
                            value: agency.contactPerson?.email || "",
                            order: 2,
                          },
                          {
                            key: "phone",
                            label: t("agencyManagement.phone"),
                            value: agency.contactPerson?.phoneNumber || "",
                            order: 3,
                          },
                        ].map((field) => {
                          const order =
                            language === "ar" ? field.order : 5 - field.order;
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
                      onClick={() => handleDelete(agency._id)}>
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
                  ? t("agencyManagement.editAgency")
                  : t("agencyManagement.addNewAgencyTitle")}
              </CardTitle>
              <CardDescription>
                {editingAgency
                  ? t("agencyManagement.updateAgencyData")
                  : t("agencyManagement.enterNewAgencyData")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t("agencyManagement.agencyName")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("agencyManagement.agencyNamePlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t("agencyManagement.agencyEmailField")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("agencyManagement.agencyEmailPlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {t("agencyManagement.agencyPasswordField")}{" "}
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
                    {t("agencyManagement.contactPersonInfo")}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson.name">
                        {t("agencyManagement.contactPersonField")} *
                      </Label>
                      <Input
                        id="contactPerson.name"
                        name="contactPerson.name"
                        value={formData.contactPerson.name}
                        onChange={handleInputChange}
                        placeholder={t(
                          "agencyManagement.contactPersonPlaceholder"
                        )}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson.email">
                        {t("agencyManagement.personEmailField")} *
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
                      {t("agencyManagement.phoneNumber")} *
                    </Label>
                    <Input
                      id="contactPerson.phoneNumber"
                      name="contactPerson.phoneNumber"
                      value={formData.contactPerson.phoneNumber}
                      onChange={handleInputChange}
                      placeholder={t("agencyManagement.phonePlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingAgency
                      ? t("agencyManagement.update")
                      : t("agencyManagement.add")}
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
                      });
                    }}>
                    {t("agencyManagement.cancel")}
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
                {t("agencyManagement.confirmDeletion")}
              </CardTitle>
              <CardDescription>
                {t("agencyManagement.confirmDeleteMessage")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">
                  {t("agencyManagement.agencyNameLabel")}
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
                {t("agencyManagement.assignedStandards")}
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
                  {t("agencyManagement.assignedStandards")}
                </h4>

                {(() => {
                  const assignedStandards =
                    viewStandards.agency.assignedStandards || [];

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
                    <div className="grid gap-3 max-h-60 overflow-y-auto">
                      {assignedStandards.map((standard) => (
                        <Card
                          key={standard._id}
                          className="p-3 hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 text-green-600">
                              <CheckSquare className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  #{standard.number}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {t("agencyManagement.standard")}
                                </span>
                              </div>
                              <h5 className="font-medium text-sm leading-relaxed mb-2">
                                Standard {standard.number}
                              </h5>
                              <div className="text-xs text-muted-foreground">
                                Status: {standard.status} | Progress:{" "}
                                {standard.progress}%
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
