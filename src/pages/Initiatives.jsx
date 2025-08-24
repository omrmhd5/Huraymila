import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InitiativesSection from "@/components/InitiativesSection";
import { useAuth } from "@/components/AuthContext";

const Initiatives = () => {
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
      <Header />
      <main className="flex-1">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-primary mb-4">المبادرات</h1>
          <p className="text-lg text-muted-foreground">
            اكتشف المبادرات الصحية النشطة في مدينة حريملاء
          </p>
        </div>
        <InitiativesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Initiatives;