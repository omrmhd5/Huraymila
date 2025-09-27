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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InitiativeModal from "./Modals/InitiativeModal";
import DeleteInitiativeModal from "./Modals/DeleteInitiativeModal";
import ViewVolunteersModal from "./Modals/ViewVolunteersModal";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { initiativeApi } from "@/lib/initiativeApi";
import { toast } from "sonner";

const Initiatives = ({ language }) => {
  const { t } = useLanguage();
  const { token } = useAuth();

  // Data state
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  // Modal state management
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    initiative: null,
  });
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    initiative: null,
  });

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Unified initiative modal state
  const [initiativeModal, setInitiativeModal] = useState({
    isOpen: false,
    mode: "add", // "add" or "edit"
    initiative: null,
  });
  const [initiativeForm, setInitiativeForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "gathering volunteers",
    currentVolunteers: 0,
    maxVolunteers: 10,
  });

  // Load initiatives on component mount
  useEffect(() => {
    loadInitiatives();
  }, [token]);

  // API Functions
  const loadInitiatives = async () => {
    try {
      setLoading(true);
      const response = await initiativeApi.getMyInitiatives(token);
      setInitiatives(response.data || []);
    } catch (error) {
      console.error("Error loading initiatives:", error);
      toast.error(t("initiatives.loadError") || "Failed to load initiatives");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInitiative = async (formData, imageFile = null) => {
    try {
      setActionLoading(true);
      const response = await initiativeApi.createInitiative(
        token,
        {
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          maxVolunteers: parseInt(formData.maxVolunteers),
        },
        imageFile
      );

      toast.success(
        t("initiatives.createSuccess") || "Initiative created successfully"
      );
      await loadInitiatives(); // Refresh the list
      closeInitiativeModal();
    } catch (error) {
      console.error("Error creating initiative:", error);
      toast.error(error.message || "Failed to create initiative");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateInitiative = async (
    initiativeId,
    formData,
    imageFile = null
  ) => {
    try {
      setActionLoading(true);
      const response = await initiativeApi.updateInitiative(
        token,
        initiativeId,
        {
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          maxVolunteers: parseInt(formData.maxVolunteers),
        },
        imageFile
      );

      toast.success(
        t("initiatives.updateSuccess") || "Initiative updated successfully"
      );
      await loadInitiatives(); // Refresh the list
      closeInitiativeModal();
    } catch (error) {
      console.error("Error updating initiative:", error);
      toast.error(error.message || "Failed to update initiative");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteInitiative = async (initiativeId) => {
    try {
      setActionLoading(true);
      await initiativeApi.deleteInitiative(token, initiativeId);

      toast.success(
        t("initiatives.deleteSuccess") || "Initiative deleted successfully"
      );
      await loadInitiatives(); // Refresh the list
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting initiative:", error);
      toast.error(error.message || "Failed to delete initiative");
    } finally {
      setActionLoading(false);
    }
  };

  // Component-specific functions
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
      case "مكتمل":
        return (
          <Badge variant="default" className="bg-green-500">
            {language === "ar" ? "مكتمل" : "Completed"}
          </Badge>
        );
      case "active":
      case "نشط":
        return (
          <Badge variant="default" className="bg-blue-500">
            {language === "ar" ? "نشط" : "Active"}
          </Badge>
        );
      case "cancelled":
      case "ملغي":
        return (
          <Badge variant="default" className="bg-red-500">
            {language === "ar" ? "ملغي" : "Cancelled"}
          </Badge>
        );
      case "gathering volunteers":
      case "جمع المتطوعين":
        return (
          <Badge variant="default" className="bg-yellow-500">
            {language === "ar" ? "جمع المتطوعين" : "Gathering Volunteers"}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };

  // Unified modal handlers
  const openInitiativeModal = (mode, initiative = null) => {
    if (mode === "edit" && initiative) {
      setInitiativeForm({
        title: initiative.title,
        description: initiative.description,
        startDate: initiative.startDate.split("T")[0], // Format for date input
        endDate: initiative.endDate.split("T")[0], // Format for date input
        status: initiative.status,
        currentVolunteers: initiative.currentVolunteers || 0,
        maxVolunteers: initiative.maxVolunteers || 10,
      });
    } else {
      // Add mode - reset form
      setInitiativeForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "gathering volunteers",
        currentVolunteers: 0,
        maxVolunteers: 10,
      });
    }
    setInitiativeModal({ isOpen: true, mode, initiative });
  };

  const closeInitiativeModal = () => {
    setInitiativeModal({ isOpen: false, mode: "add", initiative: null });
    setInitiativeForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "gathering volunteers",
      currentVolunteers: 0,
      maxVolunteers: 10,
    });
  };

  const openDeleteModal = (initiative) => {
    setDeleteModal({ isOpen: true, initiative });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, initiative: null });
  };

  const openViewModal = (initiative) => {
    setViewModal({ isOpen: true, initiative });
  };

  const closeViewModal = () => {
    setViewModal({ isOpen: false, initiative: null });
  };

  // Filter initiatives based on search term and status
  const filteredInitiatives = initiatives.filter((initiative) => {
    const matchesSearch =
      initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || initiative.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalInitiatives = initiatives.length;
  const completedInitiatives = initiatives.filter(
    (init) => init.status === "completed" || init.status === "مكتمل"
  ).length;
  const activeInitiatives = initiatives.filter(
    (init) => init.status === "active" || init.status === "نشط"
  ).length;
  const cancelledInitiatives = initiatives.filter(
    (init) => init.status === "cancelled" || init.status === "ملغي"
  ).length;
  const gatheringVolunteersInitiatives = initiatives.filter(
    (init) =>
      init.status === "gathering volunteers" || init.status === "جمع المتطوعين"
  ).length;
  const totalVolunteers = initiatives.reduce(
    (sum, init) => sum + (init.currentVolunteers || 0),
    0
  );
  const maxVolunteers = initiatives.reduce(
    (sum, init) => sum + (init.maxVolunteers || 0),
    0
  );

  // Stats configuration
  const statsConfig = [
    {
      key: "total",
      label: t("initiatives.totalInitiatives"),
      value: totalInitiatives,
      color: "",
    },
    {
      key: "completed",
      label: t("initiatives.completed"),
      value: completedInitiatives,
      color: "text-green-600",
    },
    {
      key: "active",
      label: t("initiatives.active"),
      value: activeInitiatives,
      color: "text-blue-600",
    },
    {
      key: "cancelled",
      label: t("initiatives.cancelled"),
      value: cancelledInitiatives,
      color: "text-red-600",
    },
    {
      key: "gathering",
      label: t("initiatives.gatheringVolunteers"),
      value: gatheringVolunteersInitiatives,
      color: "text-yellow-600",
    },
    {
      key: "volunteers",
      label: t("initiatives.volunteers"),
      value: `${totalVolunteers}/${maxVolunteers}`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className={`space-y-6 ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Stats Overview */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 ${
          language === "ar" ? "text-right" : "text-left"
        }`}>
        {statsConfig.map((stat) => (
          <Card key={stat.key}>
            <CardContent className="p-6">
              <div
                className={`flex items-center justify-between ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}>
                <div className={language === "ar" ? "text-right" : "text-left"}>
                  <p
                    className={`text-sm font-medium text-muted-foreground ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-bold ${stat.color} ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader className={language === "ar" ? "text-right" : "text-left"}>
          <div
            className={`flex items-center justify-between ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}>
            <div>
              <CardTitle
                className={language === "ar" ? "font-arabic" : "font-sans"}>
                {t("initiatives.title")}
              </CardTitle>
              <CardDescription
                className={language === "ar" ? "font-arabic" : "font-sans"}>
                {t("initiatives.description")}
              </CardDescription>
            </div>
            <Button
              onClick={() => openInitiativeModal("add")}
              disabled={actionLoading}
              className={language === "ar" ? "mr-4" : "ml-4"}>
              <Plus className="w-4 h-4" />
              {t("initiatives.addInitiative")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`flex gap-4 mb-6 ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}>
            <div className="flex-1">
              <Input
                placeholder={t("initiatives.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  language === "ar"
                    ? "font-arabic text-right"
                    : "font-sans text-left"
                }
              />
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className={
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }>
                  <SelectValue placeholder={t("initiatives.allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("initiatives.allStatuses")}
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("initiatives.completed")}
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("initiatives.active")}
                  </SelectItem>
                  <SelectItem
                    value="cancelled"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("initiatives.cancelled")}
                  </SelectItem>
                  <SelectItem
                    value="gathering volunteers"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {t("initiatives.gatheringVolunteers")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initiatives List */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  {t("initiatives.loading") || "Loading initiatives..."}
                </p>
              </div>
            ) : filteredInitiatives.length === 0 ? (
              <div
                className={`text-center py-8 ${
                  language === "ar"
                    ? "font-arabic text-right"
                    : "font-sans text-left"
                }`}>
                <p className="text-muted-foreground">
                  {initiatives.length === 0
                    ? t("initiatives.noInitiatives") ||
                      "No initiatives found. Create your first initiative!"
                    : t("initiatives.noSearchResults") ||
                      "No initiatives match your search criteria."}
                </p>
              </div>
            ) : (
              filteredInitiatives.map((initiative) => (
                <div key={initiative.id} className="border rounded-lg p-4">
                  <div
                    className={`flex items-start justify-between mb-4 ${
                      language === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}>
                    {/* Initiative Image */}
                    {initiative.imageUrl && (
                      <div
                        className={`${
                          language === "ar" ? "ml-4" : "mr-4"
                        } flex-shrink-0`}>
                        <img
                          src={`${
                            import.meta.env.VITE_API_BASE_URL?.replace(
                              "/api",
                              ""
                            ) || "http://localhost:5000"
                          }${initiative.imageUrl}`}
                          alt={initiative.title}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <div
                      className={`flex-1 ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}>
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          language === "ar" ? "flex-row-reverse" : "flex-row"
                        }`}>
                        <h3
                          className={`text-lg font-semibold ${
                            language === "ar" ? "font-arabic" : "font-sans"
                          }`}>
                          {initiative.title}
                        </h3>
                        {getStatusBadge(initiative.status)}
                      </div>
                      <p
                        className={`text-muted-foreground mb-3 ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {initiative.description}
                      </p>

                      <div
                        className={`grid grid-cols-2 gap-4 text-sm mb-3 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}>
                        <div
                          className={language === "ar" ? "order-2" : "order-1"}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {t("initiatives.startDate")}
                          </span>
                          <p
                            className={
                              language === "ar" ? "font-arabic" : "font-sans"
                            }>
                            {formatDate(initiative.startDate)}
                          </p>
                        </div>
                        <div
                          className={language === "ar" ? "order-1" : "order-2"}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {t("initiatives.endDate")}
                          </span>
                          <p
                            className={
                              language === "ar" ? "font-arabic" : "font-sans"
                            }>
                            {formatDate(initiative.endDate)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div
                          className={`flex items-center justify-between text-sm ${
                            language === "ar"
                              ? "font-arabic flex-row-reverse"
                              : "font-sans flex-row"
                          }`}>
                          <span
                            className={`font-medium ${
                              language === "ar" ? "font-arabic" : "font-sans"
                            }`}>
                            {t("initiatives.volunteers")}
                          </span>
                          <span className="font-medium">
                            {initiative.currentVolunteers || 0}{" "}
                            {t("initiatives.outOf")}{" "}
                            {initiative.maxVolunteers || 10}
                          </span>
                        </div>
                        <div
                          className={`w-full bg-muted rounded-full h-2 ${
                            language === "ar" ? "rtl" : "ltr"
                          }`}>
                          <div
                            className={`bg-primary h-2 rounded-full transition-all duration-300 ${
                              language === "ar" ? "ml-auto" : "mr-auto"
                            }`}
                            style={{
                              width: `${
                                ((initiative.currentVolunteers || 0) /
                                  (initiative.maxVolunteers || 10)) *
                                100
                              }%`,
                            }}></div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 ${
                        language === "ar" ? "ml-4" : "mr-4"
                      }`}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openViewModal(initiative)}
                        disabled={actionLoading}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInitiativeModal("edit", initiative)}
                        disabled={actionLoading}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteModal(initiative)}
                        disabled={actionLoading}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Unified Initiative Modal (Add/Edit) */}
      <InitiativeModal
        isOpen={initiativeModal.isOpen}
        onClose={closeInitiativeModal}
        mode={initiativeModal.mode}
        initiative={initiativeModal.initiative}
        formData={initiativeForm}
        onFormChange={setInitiativeForm}
        onSubmit={(formData, imageFile) => {
          if (initiativeModal.mode === "add") {
            handleCreateInitiative(formData, imageFile);
          } else {
            handleUpdateInitiative(
              initiativeModal.initiative.id || initiativeModal.initiative._id,
              formData,
              imageFile
            );
          }
        }}
        loading={actionLoading}
        language={language}
      />

      {/* Delete Modal */}
      <DeleteInitiativeModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        initiative={deleteModal.initiative}
        onConfirm={() => {
          if (deleteModal.initiative) {
            handleDeleteInitiative(
              deleteModal.initiative.id || deleteModal.initiative._id
            );
          }
        }}
        loading={actionLoading}
        language={language}
      />

      {/* View Volunteers Modal */}
      <ViewVolunteersModal
        isOpen={viewModal.isOpen}
        onClose={closeViewModal}
        initiative={viewModal.initiative}
        volunteers={viewModal.initiative?.volunteers || []}
        formatDate={formatDate}
        language={language}
        onAddVolunteer={(volunteerData) => {
          // This could be implemented if needed
          console.log("Add volunteer:", volunteerData);
        }}
        onRemoveVolunteer={(volunteerId) => {
          // This could be implemented if needed
          console.log("Remove volunteer:", volunteerId);
        }}
      />
    </div>
  );
};

export default Initiatives;
