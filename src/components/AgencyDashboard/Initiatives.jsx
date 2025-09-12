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
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsConfig.map((stat) => (
          <Card key={stat.key}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
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

      {/* Initiatives List */}
      <Card>
        <CardHeader>
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

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
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
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`flex items-center justify-between text-sm ${
                          language === "ar" ? "font-arabic" : "font-sans"
                        }`}>
                        <span
                          className={`font-medium ${
                            language === "ar" ? "font-arabic" : "font-sans"
                          }`}>
                          {language === "ar" ? "المتطوعين:" : "Volunteers:"}
                        </span>
                        <span className="font-medium">
                          {initiative.volunteers || 0}{" "}
                          {language === "ar" ? "من" : "out of"}{" "}
                          {initiative.maxVolunteers || 10}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
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
    </div>
  );
};

export default Initiatives;
