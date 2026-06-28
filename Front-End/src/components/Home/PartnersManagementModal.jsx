import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partnerApi } from "@/lib/partnerApi";
import { Edit2, Save, X, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PartnersManagementModal = ({ isOpen, setIsOpen, onPartnersUpdated }) => {
  const { language } = useTheme();
  const isRTL = language === "ar";

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Mode
  const [editingPartner, setEditingPartner] = useState(null);
  
  // Add Mode
  const [isAdding, setIsAdding] = useState(false);

  // Delete Confirmation State
  const [deletingPartnerId, setDeletingPartnerId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  // Form State
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPartners();
      resetForm();
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

  const resetForm = () => {
    setNameAr("");
    setNameEn("");
    setLogoFile(null);
    setEditingPartner(null);
    setIsAdding(false);
  };

  const handleEditClick = (partner) => {
    setIsAdding(false);
    setEditingPartner(partner);
    setNameAr(partner.name_ar);
    setNameEn(partner.name_en);
    setLogoFile(null);
  };

  const handleAddClick = () => {
    setEditingPartner(null);
    setIsAdding(true);
    setNameAr("");
    setNameEn("");
    setLogoFile(null);
  };

  const handleSave = async () => {
    if (!nameAr.trim() || !nameEn.trim()) {
      alert(isRTL ? "يرجى إدخال اسم الشريك بالعربية والإنجليزية" : "Please enter the partner's name in Arabic and English");
      return;
    }

    if (isAdding && !logoFile) {
      alert(isRTL ? "يرجى رفع شعار الشريك" : "Please upload a partner logo");
      return;
    }
    
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name_ar", nameAr);
      formData.append("name_en", nameEn);
      
      if (logoFile) {
        formData.append("logoFile", logoFile);
      }

      if (isAdding) {
        await partnerApi.createPartner(formData);
      } else if (editingPartner) {
        await partnerApi.updatePartner(editingPartner._id, formData);
      }

      // Refresh list
      await fetchPartners();
      resetForm();
      if (onPartnersUpdated) {
        onPartnersUpdated();
      }
    } catch (error) {
      console.error("Failed to save partner", error);
      alert(isRTL ? "حدث خطأ أثناء حفظ البيانات" : "An error occurred while saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingPartnerId(id);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPartnerId) return;

    try {
      setSaving(true);
      await partnerApi.deletePartner(deletingPartnerId);
      await fetchPartners();
      if (onPartnersUpdated) {
        onPartnersUpdated();
      }
    } catch (error) {
      console.error("Failed to delete partner", error);
      alert(isRTL ? "حدث خطأ أثناء حذف الشريك" : "An error occurred while deleting the partner");
    } finally {
      setSaving(false);
      setIsDeleteAlertOpen(false);
      setDeletingPartnerId(null);
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`max-w-4xl h-[85vh] flex flex-col ${isRTL ? "font-arabic" : "font-english"}`} dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader className="flex flex-row justify-between items-center border-b pb-4">
            <DialogTitle className="text-2xl font-bold text-amber-600">
              {isRTL ? "إدارة شركاء النجاح" : "Manage Success Partners"}
            </DialogTitle>
            {!isAdding && !editingPartner && (
              <Button onClick={handleAddClick} className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1">
                <Plus className="w-4 h-4" />
                {isRTL ? "إضافة شريك جديد" : "Add Partner"}
              </Button>
            )}
          </DialogHeader>

          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Form for Add Only */}
                {isAdding && (
                  <div className="p-6 border-2 border-dashed border-amber-500/50 rounded-lg bg-amber-50/20 dark:bg-amber-950/10 space-y-4 mb-6">
                    <h3 className="font-bold text-lg text-amber-700">
                      {isRTL ? "إضافة شريك جديد" : "Add New Partner"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{isRTL ? "الاسم (عربي) *" : "Name (Arabic) *"}</Label>
                        <Input 
                          value={nameAr} 
                          onChange={(e) => setNameAr(e.target.value)} 
                          dir="rtl"
                          placeholder="مثال: وزارة الصحة"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{isRTL ? "الاسم (إنجليزي) *" : "Name (English) *"}</Label>
                        <Input 
                          value={nameEn} 
                          onChange={(e) => setNameEn(e.target.value)} 
                          dir="ltr"
                          placeholder="Example: Ministry of Health"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>{isRTL ? "الشعار *" : "Logo *"}</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded border bg-white flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                            {logoFile ? (
                              <img src={URL.createObjectURL(logoFile)} alt="Preview" className="max-w-full max-h-full object-contain" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          <Input 
                            type="file" 
                            accept="image/*" 
                            required
                            onChange={(e) => setLogoFile(e.target.files[0])} 
                            className="flex-1 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
                      <Button variant="outline" onClick={resetForm} disabled={saving}>
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
                )}

                {/* Partners List */}
                <div className="space-y-3">
                  {partners.map((partner) => (
                    <div key={partner._id} className="p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
                      {editingPartner?._id === partner._id ? (
                        <div className="space-y-4">
                          <h3 className="font-bold text-md text-amber-700">
                            {isRTL ? `تعديل: ${partner.name_ar}` : `Edit: ${partner.name_en}`}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{isRTL ? "الاسم (عربي) *" : "Name (Arabic) *"}</Label>
                              <Input 
                                value={nameAr} 
                                onChange={(e) => setNameAr(e.target.value)} 
                                dir="rtl"
                                placeholder="مثال: وزارة الصحة"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{isRTL ? "الاسم (إنجليزي) *" : "Name (English) *"}</Label>
                              <Input 
                                value={nameEn} 
                                onChange={(e) => setNameEn(e.target.value)} 
                                dir="ltr"
                                placeholder="Example: Ministry of Health"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>{isRTL ? "تحديث الشعار" : "Update Logo"}</Label>
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded border bg-white flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
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
                                  className="flex-1 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
                            <Button variant="outline" onClick={resetForm} disabled={saving} size="sm">
                              <X className="w-4 h-4 mr-2" />
                              {isRTL ? "إلغاء" : "Cancel"}
                            </Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700" size="sm">
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
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded border bg-white flex items-center justify-center p-1 flex-shrink-0">
                              <img 
                                src={getFullLogoUrl(partner.logo)} 
                                alt={partner.name_ar} 
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full bg-muted rounded flex items-center justify-center text-xs text-muted-foreground" style={{display: 'none'}}>
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm md:text-base">{isRTL ? partner.name_ar : partner.name_en}</h4>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(partner)} disabled={saving}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(partner._id)} disabled={saving} className="bg-red-600 hover:bg-red-700 text-white">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className={`${isRTL ? "font-arabic text-right" : "font-english text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isRTL ? "تأكيد الحذف" : "Confirm Delete"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isRTL
                ? "هل أنت متأكد من حذف هذا الشريك نهائياً؟ سيتم حذف الشعار أيضاً."
                : "Are you sure you want to permanently delete this partner? The logo will also be deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={`${isRTL ? "flex-row-reverse" : ""}`}>
            <AlertDialogCancel disabled={saving}>
              {isRTL ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : isRTL ? (
                "حذف"
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PartnersManagementModal;
