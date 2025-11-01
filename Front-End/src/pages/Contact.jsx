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
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggeredContainer from "@/components/animations/StaggeredContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Youtube } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Custom X Logo Component
const XLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
  const { t } = useLanguage();
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
          <p className="text-muted-foreground">{t("common.loading")}</p>
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
      toast.error(t("common.fillRequiredFields"));
      return;
    }

    setSubmitting(true);

    try {
      // Mock implementation - simulate contact form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t("common.messageSent"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(t("common.errorSending"));
    } finally {
      setSubmitting(false);
    }
  };

  const isRTL = language === "ar";

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.emailContact"),
      value: "Hrmhcp11@gmail.com",
      description: t("contact.emailContactDesc"),
      link: "mailto:Hrmhcp11@gmail.com",
    },
    {
      icon: XLogo,
      title: isRTL ? "إكس" : "X",
      value: "@Hrm_HCP",
      description: isRTL ? "تابعنا على إكس" : "Follow us on X",
      link: "https://twitter.com/Hrm_HCP",
    },
    {
      icon: Youtube,
      title: isRTL ? "يوتيوب" : "YouTube",
      value: isRTL ? "قناة حريملاء الصحية" : "Huraymila Healthy City",
      description: isRTL ? "شاهد قناتنا على يوتيوب" : "Watch our YouTube channel",
      link: "https://youtube.com/channel/UChLyo00EAZd8YHhtKYFn-Ug?si=QsIMWTPtsnw9xA42",
    },
    {
      icon: MapPin,
      title: t("contact.addressContact"),
      value: t("contact.address"),
      description: t("contact.addressContactDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatedSection animation="fadeInUp" delay={0}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <AnimatedSection animation="fadeInLeft" delay={200}>
            <div className="lg:col-span-1 space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {t("contact.contactInformation")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.contactInformationDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const content = (
                      <div className="flex items-start gap-3">
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
                    );

                    return info.link ? (
                      <a
                        key={index}
                        href={info.link}
                        target={info.link.startsWith("http") ? "_blank" : undefined}
                        rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block hover:bg-accent/10 p-2 rounded-lg transition-colors">
                        {content}
                      </a>
                    ) : (
                      <div key={index} className="p-2">
                        {content}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="fadeInRight" delay={400}>
            <div className="lg:col-span-2">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>{t("contact.sendMessage")}</CardTitle>
                  <CardDescription>
                    {t("contact.sendMessageDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <StaggeredContainer
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      staggerDelay={50}
                      animation="fadeInUp">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.fullName")} *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("contact.fullNamePlaceholder")}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.email")} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("contact.emailPlaceholder")}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </StaggeredContainer>

                    <StaggeredContainer
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      staggerDelay={100}
                      animation="fadeInUp">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("contact.phonePlaceholder")}
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t("contact.subject")}</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData({ ...formData, subject: value })
                          }>
                          <SelectTrigger className="transition-all duration-300 focus:scale-105">
                            <SelectValue
                              placeholder={t("contact.subjectPlaceholder")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              {t("contact.generalInquiry")}
                            </SelectItem>
                            <SelectItem value="initiatives">
                              {t("contact.initiativeInfo")}
                            </SelectItem>
                            <SelectItem value="volunteering">
                              {t("contact.volunteering")}
                            </SelectItem>
                            <SelectItem value="complaint">
                              {t("contact.complaintSuggestion")}
                            </SelectItem>
                            <SelectItem value="other">
                              {t("contact.other")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </StaggeredContainer>

                    <AnimatedSection animation="fadeInUp" delay={600}>
                      <div className="space-y-2">
                        <Label htmlFor="message">
                          {t("contact.message")} *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t("contact.messagePlaceholder")}
                          rows={5}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeInUp" delay={800}>
                      <Button
                        type="submit"
                        className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        disabled={submitting}>
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            {t("common.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            {t("common.sendMessage")}
                          </>
                        )}
                      </Button>
                    </AnimatedSection>
                  </form>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
};

export default Contact;
