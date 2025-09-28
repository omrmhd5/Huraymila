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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, UserCheck, Phone, Mail, Calendar } from "lucide-react";

const ViewVolunteersModal = ({
  isOpen,
  onClose,
  initiative,
  volunteers,
  formatDate,
  language,
  loading = false,
  onApproveVolunteer,
  onRemoveVolunteer,
}) => {
  // Use actual volunteers data from the initiative
  const currentVolunteers = volunteers || [];

  const formatVolunteerDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
              ? `إجمالي المتطوعين: ${currentVolunteers.length} من ${
                  initiative?.maxVolunteers || 0
                }`
              : `Total volunteers: ${currentVolunteers.length} of ${
                  initiative?.maxVolunteers || 0
                }`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {currentVolunteers.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p
                className={`text-muted-foreground ${
                  language === "ar" ? "font-arabic" : "font-sans"
                }`}>
                {language === "ar"
                  ? "لا يوجد متطوعين في هذه المبادرة بعد"
                  : "No volunteers in this initiative yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentVolunteers.map((volunteerEntry, index) => {
                // Handle both old format (direct volunteer info) and new format (populated volunteer object)
                const volunteer = volunteerEntry.volunteer || volunteerEntry;
                const joinedAt = volunteerEntry.joinedAt || volunteer.joinDate;

                return (
                  <div
                    key={volunteer._id || volunteer.id || index}
                    className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
                      language === "ar" ? "rtl" : "ltr"
                    }`}>
                    <div
                      className={`flex items-center justify-between ${
                        language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}>
                      <div
                        className={`flex-1 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}>
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            language === "ar" ? "flex-row-reverse" : "flex-row"
                          }`}>
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-lg ${
                                language === "ar" ? "font-arabic" : "font-sans"
                              }`}>
                              {volunteer.fullName ||
                                volunteer.name ||
                                "Unknown Volunteer"}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ${
                            language === "ar" ? "text-right" : "text-left"
                          }`}>
                          <div
                            className={`flex items-center gap-2 ${
                              language === "ar"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}>
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span
                              className={
                                language === "ar" ? "font-arabic" : "font-sans"
                              }>
                              {volunteer.email || "No email"}
                            </span>
                          </div>

                          {volunteer.phoneNumber && (
                            <div
                              className={`flex items-center gap-2 ${
                                language === "ar"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}>
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span
                                className={
                                  language === "ar"
                                    ? "font-arabic"
                                    : "font-sans"
                                }>
                                {volunteer.phoneNumber}
                              </span>
                            </div>
                          )}

                          <div
                            className={`flex items-center gap-2 ${
                              language === "ar"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}>
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span
                              className={
                                language === "ar" ? "font-arabic" : "font-sans"
                              }>
                              {language === "ar" ? "انضم في:" : "Joined:"}{" "}
                              {formatVolunteerDate(joinedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {onRemoveVolunteer && (
                        <div
                          className={`${language === "ar" ? "ml-4" : "mr-4"}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              onRemoveVolunteer(
                                volunteerEntry._id || volunteerEntry.id
                              )
                            }
                            disabled={loading}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {language === "ar" ? "إغلاق" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewVolunteersModal;
