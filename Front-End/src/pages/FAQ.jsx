import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Heart,
  Leaf,
  GraduationCap,
  Building,
  Activity,
} from "lucide-react";

const FAQ = () => {
  const { language, theme } = useTheme();
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const categories = [
    {
      title: t("faq.aboutProgram"),
      icon: Heart,
      color: "bg-red-500",
      questions: [
        {
          question: t("faq.whatIsProgram"),
          answer: t("faq.whatIsProgramAnswer"),
        },
        {
          question: t("faq.programObjectives"),
          answer: t("faq.programObjectivesAnswer"),
        },
        {
          question: t("faq.whoCanParticipate"),
          answer: t("faq.whoCanParticipateAnswer"),
        },
      ],
    },
    {
      title: t("faq.initiativesActivities"),
      icon: Activity,
      color: "bg-green-500",
      questions: [
        {
          question: t("faq.initiativeTypes"),
          answer: t("faq.initiativeTypesAnswer"),
        },
        {
          question: t("faq.howToJoinInitiative"),
          answer: t("faq.howToJoinInitiativeAnswer"),
        },
        {
          question: t("faq.initiativeFees"),
          answer: t("faq.initiativeFeesAnswer"),
        },
      ],
    },
    {
      title: t("faq.volunteering"),
      icon: Users,
      color: "bg-blue-500",
      questions: [
        {
          question: t("faq.howToVolunteer"),
          answer: t("faq.howToVolunteerAnswer"),
        },
        {
          question: t("faq.volunteerRequirements"),
          answer: t("faq.volunteerRequirementsAnswer"),
        },
        {
          question: t("faq.volunteerCertificate"),
          answer: t("faq.volunteerCertificateAnswer"),
        },
      ],
    },
    {
      title: t("faq.environmentSustainability"),
      icon: Leaf,
      color: "bg-emerald-500",
      questions: [
        {
          question: t("faq.environmentalInitiatives"),
          answer: t("faq.environmentalInitiativesAnswer"),
        },
        {
          question: t("faq.environmentalParticipation"),
          answer: t("faq.environmentalParticipationAnswer"),
        },
      ],
    },
    {
      title: t("faq.educationTraining"),
      icon: GraduationCap,
      color: "bg-amber-500",
      questions: [
        {
          question: t("faq.trainingPrograms"),
          answer: t("faq.trainingProgramsAnswer"),
        },
        {
          question: t("faq.suggestTrainingTopic"),
          answer: t("faq.suggestTrainingTopicAnswer"),
        },
      ],
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: t("faq.callUs"),
      details: t("faq.callUsDetails"),
      description: t("faq.callUsDesc"),
    },
    {
      icon: Mail,
      title: t("faq.emailUs"),
      details: t("faq.emailUsDetails"),
      description: t("faq.emailUsDesc"),
    },
    {
      icon: MapPin,
      title: t("faq.visitUs"),
      details: t("faq.visitUsDetails"),
      description: t("faq.visitUsDesc"),
    },
  ];
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={cn(
                "text-5xl font-bold text-foreground mb-6",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("faq.title")}
            </h1>
            <p
              className={cn(
                "text-xl text-muted-foreground leading-relaxed",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {t("faq.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2
                    className={cn(
                      "text-3xl font-bold text-foreground",
                      isRTL ? "font-arabic" : "font-english"
                    )}>
                    {category.title}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems[globalIndex];

                    return (
                      <Card
                        key={questionIndex}
                        className="border border-border hover:border-primary/50 transition-colors duration-200">
                        <CardHeader
                          className="cursor-pointer"
                          onClick={() => toggleItem(globalIndex)}>
                          <div className="flex items-center justify-between">
                            <CardTitle
                              className={cn(
                                "text-lg font-semibold text-foreground pr-4",
                                isRTL ? "font-arabic" : "font-english"
                              )}>
                              {item.question}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 hover:bg-primary/10">
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        {isOpen && (
                          <CardContent className="pt-0">
                            <Separator className="mb-4" />
                            <p
                              className={cn(
                                "text-muted-foreground leading-relaxed",
                                isRTL ? "font-arabic" : "font-english"
                              )}>
                              {item.answer}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className={cn(
                  "text-3xl font-bold text-foreground mb-4",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("faq.contactTitle")}
              </h2>
              <p
                className={cn(
                  "text-lg text-muted-foreground",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {t("faq.contactSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                      className={cn(
                        "text-xl font-semibold text-foreground",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {method.title}
                    </h3>
                    <p
                      className={cn(
                        "text-lg font-medium text-primary",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {method.details}
                    </p>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        isRTL ? "font-arabic" : "font-english"
                      )}>
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
