import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";

const Volunteers = ({ language, volunteers }) => {
  // Component-specific functions
  const getVolunteerStatusBadge = (status) => {
    switch (status) {
      case "نشط":
        return (
          <Badge variant="default" className="bg-green-500">
            نشط
          </Badge>
        );
      case "إجازة":
        return <Badge variant="secondary">إجازة</Badge>;
      case "متوقف":
        return <Badge variant="outline">متوقف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US"
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className={language === "ar" ? "font-arabic" : "font-sans"}>
          {language === "ar" ? "المتطوعين" : "Volunteers"}
        </CardTitle>
        <CardDescription
          className={language === "ar" ? "font-arabic" : "font-sans"}>
          {language === "ar"
            ? "إدارة المتطوعين والمتطوعات"
            : "Manage volunteers"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {volunteer.name}
                    </h3>
                    {getVolunteerStatusBadge(volunteer.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "المنصب:" : "Position:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.position}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "القسم:" : "Department:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.department}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "البريد الإلكتروني:" : "Email:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.email}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "الهاتف:" : "Phone:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "تاريخ الانضمام:" : "Join Date:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {formatDate(volunteer.joinDate)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar"
                          ? "ساعات التطوع:"
                          : "Volunteer Hours:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.hours} {language === "ar" ? "ساعة" : "hours"}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar"
                          ? "المبادرات المشاركة:"
                          : "Initiatives Participated:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {volunteer.initiatives}{" "}
                        {language === "ar" ? "مبادرة" : "initiatives"}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    language === "ar" ? "mr-4" : "ml-4"
                  }`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Volunteers;
