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
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Contact = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
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
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
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
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    setSubmitting(true);

    try {
      // Mock implementation - simulate contact form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        language === "ar"
          ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً"
          : "Your message has been sent successfully! We'll contact you soon"
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        language === "ar"
          ? "حدث خطأ في إرسال الرسالة"
          : "An error occurred while sending the message"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === "ar" ? "البريد الإلكتروني" : "Email",
      value: "info@huraymila-healthy.city",
      description:
        language === "ar"
          ? "راسلنا عبر البريد الإلكتروني"
          : "Contact us via email",
    },
    {
      icon: Phone,
      title: language === "ar" ? "الهاتف" : "Phone",
      value: "+966-11-123-4567",
      description: language === "ar" ? "اتصل بنا مباشرة" : "Call us directly",
    },
    {
      icon: MapPin,
      title: language === "ar" ? "العنوان" : "Address",
      value: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
      description:
        language === "ar"
          ? "موقع مبادرة المدينة الصحية"
          : "Location of the Healthy City initiative",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {language === "ar" ? "اتصل بنا" : "Contact Us"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "نحن هنا للإجابة على استفساراتك ومساعدتك"
              : "We are here to answer your questions and help you"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {language === "ar"
                    ? "معلومات التواصل"
                    : "Contact Information"}
                </CardTitle>
                <CardDescription>
                  {language === "ar"
                    ? "طرق مختلفة للتواصل مع فريق مبادرة المدينة الصحية"
                    : "Different ways to contact the Healthy City initiative team"}
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
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                </CardTitle>
                <CardDescription>
                  {language === "ar"
                    ? "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن"
                    : "Fill out the form below and we'll get back to you as soon as possible"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === "ar" ? "الاسم الكامل *" : "Full Name *"}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={
                          language === "ar"
                            ? "أدخل اسمك الكامل"
                            : "Enter your full name"
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === "ar" ? "البريد الإلكتروني *" : "Email *"}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={
                          language === "ar"
                            ? "example@email.com"
                            : "example@email.com"
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={
                          language === "ar"
                            ? "+966-50-123-4567"
                            : "+966-50-123-4567"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {language === "ar" ? "الموضوع" : "Subject"}
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              language === "ar"
                                ? "اختر موضوع الرسالة"
                                : "Select a subject"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="استفسار عام">
                            {language === "ar"
                              ? "استفسار عام"
                              : "General Inquiry"}
                          </SelectItem>
                          <SelectItem value="معلومات عن المبادرات">
                            {language === "ar"
                              ? "معلومات عن المبادرات"
                              : "Information about initiatives"}
                          </SelectItem>
                          <SelectItem value="التطوع">
                            {language === "ar" ? "التطوع" : "Volunteering"}
                          </SelectItem>
                          <SelectItem value="شكوى أو اقتراح">
                            {language === "ar"
                              ? "شكوى أو اقتراح"
                              : "Complaint or Suggestion"}
                          </SelectItem>
                          <SelectItem value="أخرى">
                            {language === "ar" ? "أخرى" : "Other"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === "ar" ? "الرسالة *" : "Message *"}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={
                        language === "ar"
                          ? "اكتب رسالتك هنا..."
                          : "Write your message here..."
                      }
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
                        {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
