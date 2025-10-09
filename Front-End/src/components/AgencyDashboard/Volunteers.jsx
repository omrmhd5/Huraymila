import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/dateUtils";
import { initiativeApi } from "@/lib/initiativeApi";
import { toast } from "sonner";

const Volunteers = ({ language }) => {
  const { t } = useLanguage();
  const { token } = useAuth();
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Local state
  const [loading, setLoading] = useState(true);
  const [initiatives, setInitiatives] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    volunteer: null, // flattened volunteer entry
  });

  // Load agency initiatives with populated volunteers
  useEffect(() => {
    const loadInitiatives = async () => {
      try {
        setLoading(true);
        const res = await initiativeApi.getMyInitiatives(token);
        setInitiatives(res.data || []);
      } catch (error) {
        console.error("Error loading initiatives:", error);
        toast.error(t("initiatives.loadError") || "Failed to load initiatives");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadInitiatives();
  }, [token, t]);

  // Flatten volunteers across initiatives
  const flattenedVolunteers = useMemo(() => {
    const result = [];
    for (const initiative of initiatives) {
      const vols = initiative?.volunteers || [];
      for (const entry of vols) {
        const volDoc = entry?.volunteer || {};
        result.push({
          entryId: entry?._id, // volunteer array entry id
          volunteerId: volDoc?._id || volDoc?.id, // volunteer document id
          initiativeId: initiative?._id || initiative?.id,
          initiativeTitle: initiative?.title,
          fullName: volDoc?.fullName || volDoc?.name || "",
          email: volDoc?.email || "",
          phoneNumber: volDoc?.phoneNumber || volDoc?.phone || "",
          joinedAt: entry?.joinedAt,
        });
      }
    }
    return result;
  }, [initiatives]);

  // Filter volunteers based on search term
  const filteredVolunteers = flattenedVolunteers.filter((volunteer) => {
    if (!searchTerm.trim()) return true;

    const searchTermLower = searchTerm.toLowerCase();
    const fullName = volunteer.fullName || "";
    const email = volunteer.email || "";
    const phone = volunteer.phoneNumber || "";

    // For Arabic text, we don't convert to lowercase as it can cause issues
    // For English text, we convert to lowercase for case-insensitive search
    const isArabic = /[\u0600-\u06FF]/.test(searchTerm);

    if (isArabic) {
      // Arabic search - case sensitive
      return (
        fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phone.includes(searchTerm)
      );
    } else {
      // English search - case insensitive
      return (
        fullName.toLowerCase().includes(searchTermLower) ||
        email.toLowerCase().includes(searchTermLower) ||
        phone.toLowerCase().includes(searchTermLower)
      );
    }
  });

  // Delete modal handlers
  const openDeleteModal = (volunteer) => {
    setDeleteModal({ isOpen: true, volunteer });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, volunteer: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.volunteer) return;
    try {
      setActionLoading(true);
      // Remove volunteer from initiative (requires entry volunteerId for route param)
      await initiativeApi.removeVolunteer(
        token,
        deleteModal.volunteer.initiativeId,
        deleteModal.volunteer.entryId // backend expects the initiative volunteer array entry id
      );
      toast.success(
        t("volunteers.removed") || "Volunteer removed successfully"
      );
      // Refresh initiatives after removal
      const res = await initiativeApi.getMyInitiatives(token);
      setInitiatives(res.data || []);
    } catch (error) {
      console.error("Error removing volunteer:", error);
      toast.error(
        error.message ||
          t("volunteers.removeFailed") ||
          "Failed to remove volunteer"
      );
    } finally {
      setActionLoading(false);
      closeDeleteModal();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div
          className={`flex items-center justify-between ${
            language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}>
          <div>
            <CardTitle
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {t("volunteers.title")}
            </CardTitle>
            <CardDescription
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {t("volunteers.description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div
          className={`mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
          <div className="relative">
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                language === "ar" ? "right-3" : "left-3"
              }`}
            />
            <Input
              placeholder={t("volunteers.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${
                language === "ar"
                  ? "font-arabic text-right pr-10"
                  : "font-sans text-left pl-10"
              }`}
            />
          </div>
        </div>

        {/* Volunteers Table */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {t("initiatives.loading") || "Loading..."}
            </p>
          </div>
        ) : (
          <div
            className={`rounded-md border ${
              language === "ar" ? "rtl" : "ltr"
            }`}>
            <Table dir={language === "ar" ? "rtl" : "ltr"}>
              <TableHeader>
                <TableRow className={language === "ar" ? "rtl" : "ltr"}>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.fullName")}
                  </TableHead>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.email")}
                  </TableHead>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.phoneNumber")}
                  </TableHead>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.volunteeredInitiatives")}
                  </TableHead>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.joinDate")}
                  </TableHead>
                  <TableHead
                    className={`${
                      language === "ar"
                        ? "font-arabic text-right"
                        : "font-sans text-left"
                    }`}>
                    {t("volunteers.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.length > 0 ? (
                  filteredVolunteers.map((volunteer) => (
                    <TableRow
                      key={`${volunteer.entryId}`}
                      className={language === "ar" ? "rtl" : "ltr"}>
                      <TableCell
                        className={`${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {volunteer.fullName}
                      </TableCell>
                      <TableCell
                        className={`${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {volunteer.email}
                      </TableCell>
                      <TableCell
                        className={`whitespace-nowrap ${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {volunteer.phoneNumber}
                      </TableCell>
                      <TableCell
                        className={`${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {volunteer.initiativeTitle ||
                              t("initiatives.title")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`${
                          language === "ar"
                            ? "font-arabic text-right"
                            : "font-sans text-left"
                        }`}>
                        {formatDate(volunteer.joinedAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteModal(volunteer)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className={language === "ar" ? "rtl" : "ltr"}>
                    <TableCell
                      colSpan={6}
                      className={`text-center py-8 ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {t("volunteers.noSearchResults")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AlertDialog open={deleteModal.isOpen} onOpenChange={closeDeleteModal}>
          <AlertDialogContent
            className={`${
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }`}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("volunteers.confirmDelete")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {`${t("volunteers.confirmDeleteMessage")} "${
                  deleteModal.volunteer?.fullName
                }"${t("volunteers.confirmDeleteMessageEnd")}`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("volunteers.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700">
                {t("volunteers.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default Volunteers;
