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

const Initiatives = ({ language, initiatives }) => {
  // Component-specific functions
  const getStatusBadge = (status) => {
    switch (status) {
      case "مكتمل":
        return (
          <Badge variant="default" className="bg-green-500">
            مكتمل
          </Badge>
        );
      case "نشط":
        return (
          <Badge variant="default" className="bg-blue-500">
            نشط
          </Badge>
        );
      case "متوقف":
        return <Badge variant="secondary">متوقف</Badge>;
      case "معلق":
        return <Badge variant="outline">معلق</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
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
          {language === "ar" ? "المبادرات" : "Initiatives"}
        </CardTitle>
        <CardDescription
          className={language === "ar" ? "font-arabic" : "font-sans"}>
          {language === "ar"
            ? "إدارة جميع المبادرات النشطة"
            : "Manage all active initiatives"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initiatives.map((initiative) => (
            <div key={initiative.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "تاريخ البداية:" : "Start Date:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {formatDate(initiative.startDate)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "تاريخ الانتهاء:" : "End Date:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {formatDate(initiative.endDate)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "الميزانية:" : "Budget:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {formatCurrency(initiative.budget)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        {language === "ar" ? "المصروفات:" : "Spent:"}
                      </span>
                      <p
                        className={
                          language === "ar" ? "font-arabic" : "font-sans"
                        }>
                        {formatCurrency(initiative.spent)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`flex items-center justify-between text-sm ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                      <span className="font-medium">
                        {initiative.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${initiative.progress}%`,
                        }}></div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`text-sm font-medium ${
                        language === "ar" ? "font-arabic" : "font-sans"
                      }`}>
                      {language === "ar" ? "فريق العمل:" : "Team:"}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {initiative.team.map((member, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`text-xs ${
                            language === "ar" ? "font-arabic" : "font-sans"
                          }`}>
                          {member}
                        </Badge>
                      ))}
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

export default Initiatives;
