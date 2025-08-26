import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Target,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AgencyManagement = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    type: "health",
    status: "active",
  });

  // Page title for better UX
  useEffect(() => {
    document.title = "إدارة الوكالات - لوحة التحكم الإدارية";
  }, []);

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

  // Mock data
  const agencies = [
    {
      id: 1,
      name: "وزارة الصحة - حريملاء",
      description: "الجهة المسؤولة عن الصحة العامة في المدينة",
      contactPerson: "د. أحمد محمد",
      email: "ahmed@moh.gov.sa",
      phone: "+966-11-123-4567",
      address: "شارع الملك فهد، حريملاء",
      type: "health",
      status: "active",
      initiatives: 12,
      employees: 45,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "بلدية حريملاء",
      description: "إدارة البلدية والخدمات البلدية",
      contactPerson: "م. سارة العتيبي",
      email: "sara@baladiyah.gov.sa",
      phone: "+966-11-123-4568",
      address: "مبنى البلدية، حريملاء",
      type: "municipality",
      status: "active",
      initiatives: 8,
      employees: 32,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "مستشفى حريملاء العام",
      description: "المستشفى الرئيسي في المدينة",
      contactPerson: "د. فاطمة الزهراني",
      email: "fatima@hospital.gov.sa",
      phone: "+966-11-123-4569",
      address: "شارع المستشفى، حريملاء",
      type: "health",
      status: "active",
      initiatives: 15,
      employees: 120,
      createdAt: "2024-01-05",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      if (editingAgency) {
        // Mock update
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("تم تحديث بيانات الوكالة بنجاح");
      } else {
        // Mock create
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("تم إضافة الوكالة الجديدة بنجاح");
      }

      setFormData({
        name: "",
        description: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        type: "health",
        status: "active",
      });
      setShowAddForm(false);
      setEditingAgency(null);
    } catch (error) {
      toast.error("حدث خطأ في العملية");
    }
  };

  const handleEdit = (agency) => {
    setEditingAgency(agency);
    setFormData({
      name: agency.name,
      description: agency.description,
      contactPerson: agency.contactPerson,
      email: agency.email,
      phone: agency.phone,
      address: agency.address,
      type: agency.type,
      status: agency.status,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (agencyId) => {
    if (confirm("هل أنت متأكد من حذف هذه الوكالة؟")) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("تم حذف الوكالة بنجاح");
      } catch (error) {
        toast.error("حدث خطأ في الحذف");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            نشط
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">غير نشط</Badge>;
      case "pending":
        return <Badge variant="outline">في الانتظار</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "health":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            صحة
          </Badge>
        );
      case "municipality":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            بلدية
          </Badge>
        );
      case "education":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            تعليم
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            إدارة الوكالات
          </h1>
          <p className="text-muted-foreground">
            إدارة الوكالات الحكومية المشاركة في مبادرة المدينة الصحية
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة وكالة جديدة
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="agencies">الوكالات</TabsTrigger>
          <TabsTrigger value="initiatives">المبادرات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      إجمالي الوكالات
                    </p>
                    <p className="text-2xl font-bold">{agencies.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      المبادرات النشطة
                    </p>
                    <p className="text-2xl font-bold">35</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      الموظفين
                    </p>
                    <p className="text-2xl font-bold">197</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      معدل النشاط
                    </p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>أحدث النشاطات</CardTitle>
              <CardDescription>آخر التحديثات والمبادرات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agencies.slice(0, 3).map((agency) => (
                  <div
                    key={agency.id}
                    className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{agency.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {agency.initiatives} مبادرة نشطة
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(agency.status)}
                      {getTypeBadge(agency.type)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agencies Tab */}
        <TabsContent value="agencies">
          <Card>
            <CardHeader>
              <CardTitle>قائمة الوكالات</CardTitle>
              <CardDescription>إدارة جميع الوكالات المشاركة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agencies.map((agency) => (
                  <div key={agency.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {agency.name}
                          </h3>
                          {getStatusBadge(agency.status)}
                          {getTypeBadge(agency.type)}
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {agency.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">الشخص المسؤول:</span>
                            <p>{agency.contactPerson}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              البريد الإلكتروني:
                            </span>
                            <p>{agency.email}</p>
                          </div>
                          <div>
                            <span className="font-medium">الهاتف:</span>
                            <p>{agency.phone}</p>
                          </div>
                          <div>
                            <span className="font-medium">العنوان:</span>
                            <p>{agency.address}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {agency.initiatives} مبادرة
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {agency.employees} موظف
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(agency.createdAt).toLocaleDateString(
                              "ar-SA"
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(agency)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(agency.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives">
          <Card>
            <CardHeader>
              <CardTitle>مبادرات الوكالات</CardTitle>
              <CardDescription>المبادرات النشطة لكل وكالة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض المبادرات هنا قريباً
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>تقارير الأداء</CardTitle>
              <CardDescription>تقارير دورية عن أداء الوكالات</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض التقارير هنا قريباً
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingAgency ? "تعديل الوكالة" : "إضافة وكالة جديدة"}
              </CardTitle>
              <CardDescription>
                {editingAgency
                  ? "تحديث بيانات الوكالة"
                  : "إدخال بيانات الوكالة الجديدة"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الوكالة *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="اسم الوكالة"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">نوع الوكالة</Label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md">
                      <option value="health">صحة</option>
                      <option value="municipality">بلدية</option>
                      <option value="education">تعليم</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الوكالة *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="وصف مختصر عن الوكالة ومهامها"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">الشخص المسؤول</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="اسم الشخص المسؤول"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@agency.gov.sa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+966-11-123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">الحالة</Label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md">
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                      <option value="pending">في الانتظار</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="عنوان الوكالة"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingAgency ? "تحديث" : "إضافة"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAgency(null);
                      setFormData({
                        name: "",
                        description: "",
                        contactPerson: "",
                        email: "",
                        phone: "",
                        address: "",
                        type: "health",
                        status: "active",
                      });
                    }}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgencyManagement;
