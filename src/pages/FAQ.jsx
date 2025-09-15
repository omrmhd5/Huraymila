import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
  Shield,
  Leaf,
  GraduationCap,
  Building,
  Activity,
} from "lucide-react";

const FAQ = () => {
  const { language, theme } = useTheme();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const content = {
    ar: {
      title: "الأسئلة الشائعة",
      subtitle:
        "إجابات على أكثر الأسئلة شيوعاً حول برنامج مدينة حريملاء الصحية",
      categories: [
        {
          title: "عن البرنامج",
          icon: Heart,
          color: "bg-red-500",
          questions: [
            {
              question: "ما هو برنامج مدينة حريملاء الصحية؟",
              answer:
                "برنامج مدينة حريملاء الصحية هو مبادرة شاملة تهدف إلى تحسين جودة الحياة والصحة العامة في محافظة حريملاء من خلال تعزيز التعاون بين الجهات الحكومية والجمعيات الأهلية والمجتمع المحلي.",
            },
            {
              question: "ما هي أهداف البرنامج؟",
              answer:
                "يهدف البرنامج إلى تحسين المؤشرات الصحية، تعزيز أنماط الحياة الصحية، دعم المبادرات المجتمعية، وتطوير البنية التحتية الصحية والاجتماعية في المحافظة.",
            },
            {
              question: "من يمكنه المشاركة في البرنامج؟",
              answer:
                "يمكن لجميع أفراد المجتمع المشاركة في البرنامج سواء كمتطوعين أو مستفيدين من الخدمات. كما يمكن للجهات الحكومية والجمعيات الأهلية والقطاع الخاص المشاركة كشركاء.",
            },
          ],
        },
        {
          title: "المبادرات والأنشطة",
          icon: Activity,
          color: "bg-green-500",
          questions: [
            {
              question: "ما هي أنواع المبادرات المتاحة؟",
              answer:
                "يشمل البرنامج مبادرات صحية متنوعة مثل برامج التوعية الصحية، فحوصات طبية مجانية، أنشطة رياضية، برامج التغذية الصحية، ومبادرات الصحة النفسية.",
            },
            {
              question: "كيف يمكنني الانضمام لمبادرة؟",
              answer:
                "يمكنك التسجيل في المبادرات من خلال الموقع الإلكتروني أو زيارة مكتب التنسيق في المحافظة. سيتم التواصل معك لتأكيد المشاركة وتزويدك بالتفاصيل اللازمة.",
            },
            {
              question: "هل هناك رسوم للمشاركة في المبادرات؟",
              answer:
                "معظم المبادرات مجانية تماماً. قد توجد بعض الأنشطة المتخصصة التي تتطلب رسوم رمزية، وسيتم إعلام المشاركين مسبقاً بذلك.",
            },
          ],
        },
        {
          title: "التطوع",
          icon: Users,
          color: "bg-blue-500",
          questions: [
            {
              question: "كيف يمكنني التطوع في البرنامج؟",
              answer:
                "يمكنك التسجيل كمتطوع من خلال صفحة التطوع في الموقع، أو زيارة مكتب التنسيق. سنقوم بتقييم مهاراتك وتوجيهك للمبادرات المناسبة.",
            },
            {
              question: "ما هي متطلبات التطوع؟",
              answer:
                "لا توجد متطلبات خاصة للتطوع، فقط الرغبة في المساهمة في خدمة المجتمع. بعض المبادرات قد تتطلب مهارات معينة، وسيتم توضيح ذلك عند التسجيل.",
            },
            {
              question: "هل أحصل على شهادة تطوع؟",
              answer:
                "نعم، يحصل المتطوعون على شهادات تقديرية تثبت ساعات التطوع والمبادرات التي شاركوا فيها، مما يساعد في بناء السيرة الذاتية.",
            },
          ],
        },
        {
          title: "الخدمات الصحية",
          icon: Shield,
          color: "bg-purple-500",
          questions: [
            {
              question: "ما هي الخدمات الصحية المتاحة؟",
              answer:
                "نوفر فحوصات طبية شاملة، استشارات صحية، برامج التوعية، فحوصات الكشف المبكر، وخدمات الصحة النفسية والدعم الاجتماعي.",
            },
            {
              question: "هل الخدمات الصحية مجانية؟",
              answer:
                "نعم، جميع الخدمات الصحية المقدمة من خلال البرنامج مجانية تماماً لجميع أفراد المجتمع.",
            },
            {
              question: "كيف يمكنني حجز موعد للفحص الطبي؟",
              answer:
                "يمكنك حجز المواعيد من خلال الموقع الإلكتروني أو الاتصال بمركز الخدمات الصحية. سنقوم بتأكيد الموعد وإرسال التذكيرات المناسبة.",
            },
          ],
        },
        {
          title: "البيئة والاستدامة",
          icon: Leaf,
          color: "bg-emerald-500",
          questions: [
            {
              question: "ما هي مبادرات البيئة في البرنامج؟",
              answer:
                "نشمل برامج التشجير، تنظيف البيئة، إعادة التدوير، التوعية البيئية، وبرامج الطاقة المتجددة لتحقيق الاستدامة البيئية.",
            },
            {
              question: "كيف يمكنني المشاركة في الأنشطة البيئية؟",
              answer:
                "يمكنك الانضمام لفرق العمل البيئية، المشاركة في حملات التنظيف، أو اقتراح مبادرات بيئية جديدة من خلال قنوات التواصل المتاحة.",
            },
          ],
        },
        {
          title: "التعليم والتدريب",
          icon: GraduationCap,
          color: "bg-amber-500",
          questions: [
            {
              question: "ما هي برامج التدريب المتاحة؟",
              answer:
                "نوفر دورات تدريبية في الإسعافات الأولية، التوعية الصحية، القيادة المجتمعية، المهارات الحياتية، والتدريب المهني.",
            },
            {
              question: "هل يمكنني اقتراح موضوع تدريبي جديد؟",
              answer:
                "نعم، نرحب باقتراحاتكم لمواضيع تدريبية جديدة. يمكنكم إرسال الاقتراحات من خلال صفحة التواصل أو مكتب التنسيق.",
            },
          ],
        },
      ],
      contact: {
        title: "لم تجد إجابة لسؤالك؟",
        subtitle: "تواصل معنا وسنكون سعداء لمساعدتك",
        methods: [
          {
            icon: Phone,
            title: "اتصل بنا",
            details: "011-123-4567",
            description: "من الأحد إلى الخميس، 8 صباحاً - 4 مساءً",
          },
          {
            icon: Mail,
            title: "راسلنا",
            details: "info@huraymila-healthy-city.gov.sa",
            description: "سنرد عليك خلال 24 ساعة",
          },
          {
            icon: MapPin,
            title: "زرنا",
            details: "مكتب تنسيق برنامج المدينة الصحية",
            description: "محافظة حريملاء، الرياض",
          },
        ],
      },
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle:
        "Answers to the most common questions about Huraymila Healthy City Program",
      categories: [
        {
          title: "About the Program",
          icon: Heart,
          color: "bg-red-500",
          questions: [
            {
              question: "What is the Huraymila Healthy City Program?",
              answer:
                "The Huraymila Healthy City Program is a comprehensive initiative aimed at improving quality of life and public health in Huraymila Governorate through promoting cooperation between government agencies, civil society organizations, and the local community.",
            },
            {
              question: "What are the program's objectives?",
              answer:
                "The program aims to improve health indicators, promote healthy lifestyles, support community initiatives, and develop health and social infrastructure in the governorate.",
            },
            {
              question: "Who can participate in the program?",
              answer:
                "All community members can participate in the program either as volunteers or beneficiaries of services. Government agencies, civil society organizations, and the private sector can also participate as partners.",
            },
          ],
        },
        {
          title: "Initiatives & Activities",
          icon: Activity,
          color: "bg-green-500",
          questions: [
            {
              question: "What types of initiatives are available?",
              answer:
                "The program includes diverse health initiatives such as health awareness programs, free medical checkups, sports activities, healthy nutrition programs, and mental health initiatives.",
            },
            {
              question: "How can I join an initiative?",
              answer:
                "You can register for initiatives through the website or by visiting the coordination office in the governorate. We will contact you to confirm participation and provide necessary details.",
            },
            {
              question: "Are there fees for participating in initiatives?",
              answer:
                "Most initiatives are completely free. Some specialized activities may require symbolic fees, and participants will be informed in advance.",
            },
          ],
        },
        {
          title: "Volunteering",
          icon: Users,
          color: "bg-blue-500",
          questions: [
            {
              question: "How can I volunteer in the program?",
              answer:
                "You can register as a volunteer through the volunteering page on the website or by visiting the coordination office. We will assess your skills and direct you to suitable initiatives.",
            },
            {
              question: "What are the volunteering requirements?",
              answer:
                "There are no special requirements for volunteering, just the desire to contribute to community service. Some initiatives may require specific skills, which will be clarified during registration.",
            },
            {
              question: "Do I get a volunteer certificate?",
              answer:
                "Yes, volunteers receive certificates of appreciation that document volunteer hours and initiatives they participated in, helping build their resumes.",
            },
          ],
        },
        {
          title: "Health Services",
          icon: Shield,
          color: "bg-purple-500",
          questions: [
            {
              question: "What health services are available?",
              answer:
                "We provide comprehensive medical checkups, health consultations, awareness programs, early detection screenings, and mental health and social support services.",
            },
            {
              question: "Are health services free?",
              answer:
                "Yes, all health services provided through the program are completely free for all community members.",
            },
            {
              question: "How can I book a medical appointment?",
              answer:
                "You can book appointments through the website or by calling the health services center. We will confirm the appointment and send appropriate reminders.",
            },
          ],
        },
        {
          title: "Environment & Sustainability",
          icon: Leaf,
          color: "bg-emerald-500",
          questions: [
            {
              question:
                "What are the environmental initiatives in the program?",
              answer:
                "We include afforestation programs, environmental cleanup, recycling, environmental awareness, and renewable energy programs to achieve environmental sustainability.",
            },
            {
              question: "How can I participate in environmental activities?",
              answer:
                "You can join environmental work teams, participate in cleanup campaigns, or propose new environmental initiatives through available communication channels.",
            },
          ],
        },
        {
          title: "Education & Training",
          icon: GraduationCap,
          color: "bg-amber-500",
          questions: [
            {
              question: "What training programs are available?",
              answer:
                "We provide training courses in first aid, health awareness, community leadership, life skills, and vocational training.",
            },
            {
              question: "Can I suggest a new training topic?",
              answer:
                "Yes, we welcome your suggestions for new training topics. You can send suggestions through the contact page or coordination office.",
            },
          ],
        },
      ],
      contact: {
        title: "Didn't find an answer to your question?",
        subtitle: "Contact us and we'll be happy to help you",
        methods: [
          {
            icon: Phone,
            title: "Call Us",
            details: "011-123-4567",
            description: "Sunday to Thursday, 8 AM - 4 PM",
          },
          {
            icon: Mail,
            title: "Email Us",
            details: "info@huraymila-healthy-city.gov.sa",
            description: "We'll respond within 24 hours",
          },
          {
            icon: MapPin,
            title: "Visit Us",
            details: "Healthy City Program Coordination Office",
            description: "Huraymila Governorate, Riyadh",
          },
        ],
      },
    },
  };

  const current = content[language];
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
              {current.title}
            </h1>
            <p
              className={cn(
                "text-xl text-muted-foreground leading-relaxed",
                isRTL ? "font-arabic" : "font-english"
              )}>
              {current.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {current.categories.map((category, categoryIndex) => (
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
                {current.contact.title}
              </h2>
              <p
                className={cn(
                  "text-lg text-muted-foreground",
                  isRTL ? "font-arabic" : "font-english"
                )}>
                {current.contact.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {current.contact.methods.map((method, index) => (
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
