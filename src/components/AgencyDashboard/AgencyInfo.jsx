import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AgencyInfo = ({ language, agencyData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={language === "ar" ? "font-arabic" : "font-sans"}>
          {language === "ar" ? "معلومات الجهة" : "Agency Information"}
        </CardTitle>
        <CardDescription
          className={language === "ar" ? "font-arabic" : "font-sans"}>
          {language === "ar"
            ? "تفاصيل الجهة وبيانات الدخول"
            : "Agency details and login information"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agency Information */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-semibold border-b pb-2 ${
                language === "ar" ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "معلومات الجهة" : "Agency Information"}
            </h3>
            <div className="space-y-3">
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "اسم الجهة:" : "Agency Name:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.name}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "الوصف:" : "Description:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.description}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "نوع الجهة:" : "Agency Type:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.type ||
                    (language === "ar" ? "غير محدد" : "Not specified")}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "الحالة:" : "Status:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.status || (language === "ar" ? "نشط" : "Active")}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "عدد المبادرات:"
                    : "Number of Initiatives:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.initiatives}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar"
                    ? "عدد المتطوعين:"
                    : "Number of Volunteers:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.volunteers}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-semibold border-b pb-2 ${
                language === "ar" ? "font-arabic" : "font-sans"
              }`}>
              {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
            </h3>
            <div className="space-y-3">
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "الشخص المسؤول:" : "Contact Person:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.contactPerson}
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
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.email}
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
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.phone}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "العنوان:" : "Address:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.address}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "بريد الجهة:" : "Agency Email:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {agencyData.agencyEmail}
                </p>
              </div>
              <div>
                <span
                  className={`font-medium ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  {language === "ar" ? "كلمة مرور الجهة:" : "Agency Password:"}
                </span>
                <p
                  className={`text-muted-foreground ${
                    language === "ar" ? "font-arabic" : "font-sans"
                  }`}>
                  ••••••••
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyInfo;
