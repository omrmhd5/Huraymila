import React, { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Contact = () => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setSubmitting(true);

    try {
      // Mock implementation - simulate contact form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("حدث خطأ في إرسال الرسالة");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: "info@harimlaa-healthy.city",
      description: "راسلنا عبر البريد الإلكتروني",
    },
    {
      icon: Phone,
      title: "الهاتف",
      value: "+966-11-123-4567",
      description: "اتصل بنا مباشرة",
    },
    {
      icon: MapPin,
      title: "العنوان",
      value: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
      description: "موقع مبادرة المدينة الصحية",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      value: "الأحد - الخميس: 8:00 ص - 4:00 م",
      description: "أوقات العمل الرسمية",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">اتصل بنا</h1>
          <p className="text-lg text-muted-foreground">
            نحن هنا للإجابة على استفساراتك ومساعدتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  معلومات التواصل
                </CardTitle>
                <CardDescription>
                  طرق مختلفة للتواصل مع فريق مبادرة المدينة الصحية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-sm font-medium text-primary">
                        {info.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle>ساعات العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الأحد - الخميس</span>
                    <span className="font-medium">8:00 ص - 4:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة</span>
                    <span className="font-medium">مغلق</span>
                  </div>
                  <div className="flex justify-between">
                    <span>السبت</span>
                    <span className="font-medium">9:00 ص - 1:00 م</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>ملاحظة:</strong> في أيام العطل الرسمية، قد تتغير
                    ساعات العمل
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>أرسل لنا رسالة</CardTitle>
                <CardDescription>
                  املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        required
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
                        placeholder="+966-50-123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">الموضوع</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر موضوع الرسالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="استفسار عام">
                            استفسار عام
                          </SelectItem>
                          <SelectItem value="معلومات عن المبادرات">
                            معلومات عن المبادرات
                          </SelectItem>
                          <SelectItem value="التطوع">التطوع</SelectItem>
                          <SelectItem value="شكوى أو اقتراح">
                            شكوى أو اقتراح
                          </SelectItem>
                          <SelectItem value="أخرى">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="اكتب رسالتك هنا..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}>
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>الأسئلة الشائعة</CardTitle>
            <CardDescription>إجابات على أكثر الأسئلة شيوعاً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <h4 className="font-medium mb-2">
                  كيف يمكنني الانضمام كمتطوع؟
                </h4>
                <p className="text-sm text-muted-foreground">
                  يمكنك التقديم عبر صفحة التطوع في الموقع أو التواصل معنا مباشرة
                  عبر البريد الإلكتروني
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <h4 className="font-medium mb-2">
                  ما هي المبادرات المتاحة حالياً؟
                </h4>
                <p className="text-sm text-muted-foreground">
                  لدينا عدة مبادرات نشطة تشمل التشجير الحضري، التوعية الصحية،
                  والأنشطة المجتمعية
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <h4 className="font-medium mb-2">
                  كيف يمكنني اقتراح مبادرة جديدة؟
                </h4>
                <p className="text-sm text-muted-foreground">
                  يمكنك إرسال اقتراحك عبر نموذج الاتصال أو البريد الإلكتروني مع
                  تفاصيل المبادرة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Contact;
