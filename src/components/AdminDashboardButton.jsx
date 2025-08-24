import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboardButton = ({ language, userId }) => {
  // Mock implementation - always show admin button
  return (
    <Link to="/admin-dashboard">
      <Button
        variant="outline"
        size="sm"
        className="h-8 sm:h-9 px-3 sm:px-4 gap-2 transition-colors">
        <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">
          {language === "ar" ? "لوحة التحكم" : "Admin"}
        </span>
      </Button>
    </Link>
  );
};

export default AdminDashboardButton;
