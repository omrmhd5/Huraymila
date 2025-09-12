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

const Initiatives = ({ language, initiatives }) => {
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
    volunteers: 0,
    maxVolunteers: 10,
  });

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
        startDate: initiative.startDate,
        endDate: initiative.endDate,
        status: initiative.status,
        volunteers: initiative.volunteers || 0,
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
        volunteers: 0,
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
      volunteers: 0,
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
    (sum, init) => sum + (init.volunteers || 0),
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
      label: language === "ar" ? "إجمالي المبادرات" : "Total Initiatives",
      value: totalInitiatives,
      color: "",
    },
    {
      key: "completed",
      label: language === "ar" ? "المكتملة" : "Completed",
      value: completedInitiatives,
      color: "text-green-600",
    },
    {
      key: "active",
      label: language === "ar" ? "النشطة" : "Active",
      value: activeInitiatives,
      color: "text-blue-600",
    },
    {
      key: "cancelled",
      label: language === "ar" ? "الملغية" : "Cancelled",
      value: cancelledInitiatives,
      color: "text-red-600",
    },
    {
      key: "gathering",
      label: language === "ar" ? "جمع المتطوعين" : "Gathering Volunteers",
      value: gatheringVolunteersInitiatives,
      color: "text-yellow-600",
    },
    {
      key: "volunteers",
      label: language === "ar" ? "المتطوعين" : "Volunteers",
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
                {language === "ar" ? "المبادرات" : "Initiatives"}
              </CardTitle>
              <CardDescription
                className={language === "ar" ? "font-arabic" : "font-sans"}>
                {language === "ar"
                  ? "إدارة جميع المبادرات النشطة"
                  : "Manage all active initiatives"}
              </CardDescription>
            </div>
            <Button
              onClick={() => openInitiativeModal("add")}
              className={language === "ar" ? "mr-4" : "ml-4"}>
              <Plus className="w-4 h-4" />
              {language === "ar" ? "إضافة مبادرة" : "Add Initiative"}
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
                placeholder={
                  language === "ar"
                    ? "البحث في المبادرات..."
                    : "Search initiatives..."
                }
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
                  <SelectValue
                    placeholder={
                      language === "ar" ? "جميع الحالات" : "All Status"
                    }
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
                    {language === "ar" ? "جميع الحالات" : "All Status"}
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "مكتمل" : "Completed"}
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "نشط" : "Active"}
                  </SelectItem>
                  <SelectItem
                    value="cancelled"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar" ? "ملغي" : "Cancelled"}
                  </SelectItem>
                  <SelectItem
                    value="gathering volunteers"
                    className={
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }>
                    {language === "ar"
                      ? "جمع المتطوعين"
                      : "Gathering Volunteers"}
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
            {filteredInitiatives.length === 0 ? (
              <div
                className={`text-center py-8 ${
                  language === "ar"
                    ? "font-arabic text-right"
                    : "font-sans text-left"
                }`}>
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "لا توجد مبادرات تطابق البحث"
                    : "No initiatives match the search"}
                </p>
              </div>
            ) : (
              filteredInitiatives.map((initiative) => (
                <div key={initiative.id} className="border rounded-lg p-4">
                  <div
                    className={`flex items-start justify-between mb-4 ${
                      language === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}>
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
                            {language === "ar"
                              ? "تاريخ البداية:"
                              : "Start Date:"}
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
                            {language === "ar"
                              ? "تاريخ الانتهاء:"
                              : "End Date:"}
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
                            {language === "ar" ? "المتطوعين:" : "Volunteers:"}
                          </span>
                          <span className="font-medium">
                            {initiative.volunteers || 0}{" "}
                            {language === "ar" ? "/" : "out of"}{" "}
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
                                ((initiative.volunteers || 0) /
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
                        onClick={() => openViewModal(initiative)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInitiativeModal("edit", initiative)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteModal(initiative)}>
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
        onSubmit={closeInitiativeModal}
        language={language}
      />

      {/* Delete Modal */}
      <DeleteInitiativeModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        initiative={deleteModal.initiative}
        onConfirm={closeDeleteModal}
        language={language}
      />

      {/* View Volunteers Modal */}
      <ViewVolunteersModal
        isOpen={viewModal.isOpen}
        onClose={closeViewModal}
        initiative={viewModal.initiative}
        volunteers={null}
        formatDate={formatDate}
        language={language}
      />
    </div>
  );
};

export default Initiatives;
