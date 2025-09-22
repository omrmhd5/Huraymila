import React, { useState } from "react";
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

const Volunteers = ({ language, volunteers }) => {
  const { t } = useLanguage();
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    volunteer: null,
  });

  // Component-specific functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };

  // Filter volunteers based on search term
  const filteredVolunteers = volunteers.filter((volunteer) => {
    if (!searchTerm.trim()) return true;

    const searchTermLower = searchTerm.toLowerCase();
    const fullName = volunteer.fullName || volunteer.name || "";
    const email = volunteer.email || "";
    const phone = volunteer.phone || "";

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

  const handleDelete = () => {
    // Here you would typically delete the volunteer from your state/API
    console.log("Deleting volunteer:", deleteModal.volunteer.id);
    closeDeleteModal();
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
        <div
          className={`rounded-md border ${language === "ar" ? "rtl" : "ltr"}`}>
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
                    key={volunteer.id}
                    className={language === "ar" ? "rtl" : "ltr"}>
                    <TableCell
                      className={`${
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-sans text-left"
                      }`}>
                      {volunteer.fullName || volunteer.name}
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
                      {volunteer.phone}
                    </TableCell>
                    <TableCell
                      className={`${
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-sans text-left"
                      }`}>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(volunteer.initiatives) &&
                        volunteer.initiatives.length > 0 ? (
                          volunteer.initiatives.map((initiative, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {initiative}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground">
                            {t("volunteers.noInitiatives")}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      className={`${
                        language === "ar"
                          ? "font-arabic text-right"
                          : "font-sans text-left"
                      }`}>
                      {formatDate(volunteer.joinDate)}
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
                  deleteModal.volunteer?.fullName || deleteModal.volunteer?.name
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
