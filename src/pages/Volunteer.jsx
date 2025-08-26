import React from "react";

import VolunteerForm from "@/components/VolunteerForm";
import { useAuth } from "@/contexts/AuthContext";

const Volunteer = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">التطوع</h1>
          <p className="text-lg text-muted-foreground">
            انضم إلينا كمتطوع وساعد في بناء مدينة صحية
          </p>
        </div>
        <VolunteerForm />
      </main>
    </div>
  );
};

export default Volunteer;
