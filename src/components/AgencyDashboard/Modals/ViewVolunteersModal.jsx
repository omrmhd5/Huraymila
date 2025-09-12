import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ViewVolunteersModal = ({
  isOpen,
  onClose,
  initiative,
  volunteers,
  formatDate,
  language,
}) => {
  // Modal-specific data function
  const getInitiativeVolunteers = (initiativeId) => {
    // This would typically come from your API/state
    return [
      {
        id: 1,
        fullName: "أحمد محمد الصالح",
        email: "ahmed@volunteer.com",
        phone: "+966-50-123-4567",
        joinDate: "2024-01-15",
      },
      {
        id: 2,
        fullName: "فاطمة العتيبي",
        email: "fatima@volunteer.com",
        phone: "+966-50-234-5678",
        joinDate: "2024-02-20",
      },
      {
        id: 3,
        fullName: "سعد القحطاني",
        email: "saad@volunteer.com",
        phone: "+966-50-345-6789",
        joinDate: "2024-03-10",
      },
    ];
  };

  // Use provided volunteers or get from function
  const displayVolunteers =
    volunteers || (initiative ? getInitiativeVolunteers(initiative.id) : []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle
            className={`${
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }`}>
            {language === "ar"
              ? `متطوعي المبادرة: ${initiative?.title}`
              : `Volunteers for: ${initiative?.title}`}
          </DialogTitle>
          <DialogDescription
            className={`${
              language === "ar"
                ? "font-arabic text-right"
                : "font-sans text-left"
            }`}>
            {language === "ar"
              ? "قائمة بجميع المتطوعين المسجلين في هذه المبادرة"
              : "List of all volunteers registered for this initiative"}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className={language === "ar" ? "font-arabic" : "font-sans"}>
                  {language === "ar" ? "الاسم الكامل" : "Full Name"}
                </TableHead>
                <TableHead
                  className={language === "ar" ? "font-arabic" : "font-sans"}>
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </TableHead>
                <TableHead
                  className={language === "ar" ? "font-arabic" : "font-sans"}>
                  {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                </TableHead>
                <TableHead
                  className={language === "ar" ? "font-arabic" : "font-sans"}>
                  {language === "ar" ? "تاريخ الانضمام" : "Join Date"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell
                    className={language === "ar" ? "font-arabic" : "font-sans"}>
                    {volunteer.fullName}
                  </TableCell>
                  <TableCell
                    className={language === "ar" ? "font-arabic" : "font-sans"}>
                    {volunteer.email}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap ${
                      language === "ar" ? "font-arabic" : "font-sans"
                    }`}>
                    {volunteer.phone}
                  </TableCell>
                  <TableCell
                    className={language === "ar" ? "font-arabic" : "font-sans"}>
                    {formatDate(volunteer.joinDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {language === "ar" ? "إغلاق" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewVolunteersModal;
