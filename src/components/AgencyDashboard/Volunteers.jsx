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

const Volunteers = ({ language, volunteers }) => {
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
              {language === "ar" ? "المتطوعين" : "Volunteers"}
            </CardTitle>
            <CardDescription
              className={language === "ar" ? "font-arabic" : "font-sans"}>
              {language === "ar"
                ? "إدارة المتطوعين والمتطوعات"
                : "Manage volunteers"}
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
              placeholder={
                language === "ar"
                  ? "البحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
                  : "Search by name, email, or phone number..."
              }
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
                  {language === "ar" ? "الاسم الكامل" : "Full Name"}
                </TableHead>
                <TableHead
                  className={`${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </TableHead>
                <TableHead
                  className={`${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                </TableHead>
                <TableHead
                  className={`${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar"
                    ? "المبادرات المتطوع فيها"
                    : "Volunteered Initiatives"}
                </TableHead>
                <TableHead
                  className={`${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "تاريخ الانضمام" : "Join Date"}
                </TableHead>
                <TableHead
                  className={`${
                    language === "ar"
                      ? "font-arabic text-right"
                      : "font-sans text-left"
                  }`}>
                  {language === "ar" ? "الإجراءات" : "Actions"}
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
                            {language === "ar"
                              ? "لا توجد مبادرات"
                              : "No initiatives"}
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
                    {language === "ar"
                      ? "لا توجد نتائج للبحث"
                      : "No search results found"}
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
                {language === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {language === "ar"
                  ? `هل أنت متأكد من حذف المتطوع "${
                      deleteModal.volunteer?.fullName ||
                      deleteModal.volunteer?.name
                    }"؟ لا يمكن التراجع عن هذا الإجراء.`
                  : `Are you sure you want to delete the volunteer "${
                      deleteModal.volunteer?.fullName ||
                      deleteModal.volunteer?.name
                    }"? This action cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700">
                {language === "ar" ? "حذف" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default Volunteers;
