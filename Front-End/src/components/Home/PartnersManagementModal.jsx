import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partnerApi } from "@/lib/partnerApi";
import { Edit2, Save, X, Image as ImageIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PartnersManagementModal = ({ isOpen, setIsOpen, onPartnersUpdated }) => {
  const { language } = useTheme();
  const isRTL = language === "ar";

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState(null);

  // Form State
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPartners();
    }
  }, [isOpen]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const data = await partnerApi.getAllPartners();
      setPartners(data);
    } catch (error) {
      console.error("Failed to fetch partners", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (partner) => {
    setEditingPartner(partner);
    setNameAr(partner.name_ar);
    setNameEn(partner.name_en);
    setLogoFile(null);
  };

  const handleSave = async () => {
    if (!editingPartner) return;
    
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name_ar", nameAr);
      formData.append("name_en", nameEn);
      
      if (logoFile) {
        formData.append("logoFile", logoFile);
      }

      await partnerApi.updatePartner(editingPartner._id, formData);
      
      // Refresh list
      await fetchPartners();
      setEditingPartner(null);
      if (onPartnersUpdated) {
        onPartnersUpdated();
      }
    } catch (error) {
      console.error("Failed to save partner", error);
    } finally {
      setSaving(false);
    }
  };

  const getFullLogoUrl = (logoPath) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    
    const API_URL = import.meta.env.VITE_API_URL || 
                    (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api");
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}${logoPath}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`max-w-4xl h-[80vh] flex flex-col ${isRTL ? "font-arabic" : "font-english"}`} dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-600">
            {isRTL ? "إدارة شركاء النجاح" : "Manage Success Partners"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {partners.map((partner) => (
                <div key={partner._id} className="p-4 border rounded-lg bg-card shadow-sm">
                  {editingPartner?._id === partner._id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{isRTL ? "الاسم (عربي)" : "Name (Arabic)"}</Label>
                          <Input 
                            value={nameAr} 
                            onChange={(e) => setNameAr(e.target.value)} 
                            dir="rtl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{isRTL ? "الاسم (إنجليزي)" : "Name (English)"}</Label>
                          <Input 
                            value={nameEn} 
                            onChange={(e) => setNameEn(e.target.value)} 
                            dir="ltr"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>{isRTL ? "تحديث الشعار" : "Update Logo"}</Label>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded border bg-muted flex items-center justify-center overflow-hidden">
                              {logoFile ? (
                                <img src={URL.createObjectURL(logoFile)} alt="Preview" className="max-w-full max-h-full object-contain" />
                              ) : (
                                <img src={getFullLogoUrl(partner.logo)} alt="Current" className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                              )}
                            </div>
                            <Input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => setLogoFile(e.target.files[0])} 
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setEditingPartner(null)} disabled={saving}>
                          <X className="w-4 h-4 mr-2" />
                          {isRTL ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
                          {saving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {isRTL ? "حفظ" : "Save"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded border bg-white flex items-center justify-center p-1">
                          <img 
                            src={getFullLogoUrl(partner.logo)} 
                            alt={partner.name_ar} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground" style={{display: 'none'}}>
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{isRTL ? partner.name_ar : partner.name_en}</h4>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(partner)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnersManagementModal;
