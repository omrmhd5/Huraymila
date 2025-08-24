import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageSquare, Users, Settings } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const SmsManagement = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("ar");
  const [theme, setTheme] = useState("light");

  // Send SMS Form
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Add Contact Form
  const [newContact, setNewContact] = useState({
    name: "",
    phone_number: "",
    category: "volunteer",
  });

  // Add Template Form
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    category: "general",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Temporarily disable database queries until tables are created
    console.log("Database tables will be available after migration approval");
    setContacts([]);
    setMessages([]);
    setTemplates([]);
  };

  const sendSMS = async () => {
    if (!messageText.trim() || selectedContacts.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار جهات اتصال وكتابة الرسالة",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock implementation - simulate SMS sending
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "تم الإرسال",
        description: `تم إرسال الرسائل إلى ${selectedContacts.length} جهة اتصال`,
      });

      setMessageText("");
      setSelectedContacts([]);
      setSelectedTemplate("");
      fetchData(); // Refresh messages list
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إرسال الرسائل",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addContact = async () => {
    if (!newContact.name.trim() || !newContact.phone_number.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Temporarily disabled until tables are created
    toast({
      title: "معلومة",
      description: "سيتم تفعيل هذه الوظيفة بعد إنشاء جداول قاعدة البيانات",
      variant: "default",
    });
  };

  const addTemplate = async () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Temporarily disabled until tables are created
    toast({
      title: "معلومة",
      description: "سيتم تفعيل هذه الوظيفة بعد إنشاء جداول قاعدة البيانات",
      variant: "default",
    });
  };

  const loadTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setMessageText(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "sent":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200">
            تم الإرسال
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">فشل</Badge>;
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "volunteer":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            متطوع
          </Badge>
        );
      case "partner":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            شريك
          </Badge>
        );
      case "beneficiary":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            مستفيد
          </Badge>
        );
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            إدارة الرسائل النصية
          </h1>
          <p className="text-lg text-muted-foreground">
            نظام شامل لإدارة وإرسال الرسائل النصية للمتطوعين والشركاء
          </p>
        </div>

        <Tabs defaultValue="send" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="send" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              إرسال رسالة
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              جهات الاتصال
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              القوالب
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              سجل الرسائل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send">
            <Card>
              <CardHeader>
                <CardTitle>إرسال رسالة جديدة</CardTitle>
                <CardDescription>
                  اختر جهات الاتصال واكتب رسالتك أو استخدم أحد القوالب المحفوظة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="template-select">اختيار قالب (اختياري)</Label>
                  <select
                    id="template-select"
                    className="w-full p-2 border rounded-md mt-1"
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      if (e.target.value) loadTemplate(e.target.value);
                    }}>
                    <option value="">اختر قالباً...</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">نص الرسالة</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>اختيار جهات الاتصال</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-3">
                    {contacts.map((contact) => (
                      <label
                        key={contact.id}
                        className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedContacts([
                                ...selectedContacts,
                                contact.id,
                              ]);
                            } else {
                              setSelectedContacts(
                                selectedContacts.filter(
                                  (id) => id !== contact.id
                                )
                              );
                            }
                          }}
                        />
                        <span className="text-sm">
                          {contact.name} ({contact.phone_number})
                        </span>
                        {getCategoryBadge(contact.category)}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    تم اختيار {selectedContacts.length} جهة اتصال
                  </p>
                </div>

                <Button onClick={sendSMS} disabled={loading} className="w-full">
                  {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إضافة جهة اتصال جديدة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">الاسم</Label>
                    <Input
                      id="contact-name"
                      value={newContact.name}
                      onChange={(e) =>
                        setNewContact({ ...newContact, name: e.target.value })
                      }
                      placeholder="اسم جهة الاتصال"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">رقم الهاتف</Label>
                    <Input
                      id="contact-phone"
                      value={newContact.phone_number}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="+966501234567"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-category">الفئة</Label>
                    <select
                      id="contact-category"
                      className="w-full p-2 border rounded-md"
                      value={newContact.category}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          category: e.target.value,
                        })
                      }>
                      <option value="volunteer">متطوع</option>
                      <option value="partner">شريك</option>
                      <option value="beneficiary">مستفيد</option>
                    </select>
                  </div>
                  <Button onClick={addContact} className="w-full">
                    إضافة جهة الاتصال
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>جهات الاتصال ({contacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p
                            className="text-sm text-muted-foreground"
                            dir="ltr">
                            {contact.phone_number}
                          </p>
                        </div>
                        {getCategoryBadge(contact.category)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إضافة قالب جديد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">اسم القالب</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                      placeholder="رسالة ترحيب بالمتطوعين"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-content">محتوى القالب</Label>
                    <Textarea
                      id="template-content"
                      value={newTemplate.content}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          content: e.target.value,
                        })
                      }
                      placeholder="مرحباً بكم في مبادرة هريملا..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">الفئة</Label>
                    <select
                      id="template-category"
                      className="w-full p-2 border rounded-md"
                      value={newTemplate.category}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          category: e.target.value,
                        })
                      }>
                      <option value="general">عام</option>
                      <option value="welcome">ترحيب</option>
                      <option value="reminder">تذكير</option>
                      <option value="announcement">إعلان</option>
                    </select>
                  </div>
                  <Button onClick={addTemplate} className="w-full">
                    إضافة القالب
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>القوالب المحفوظة ({templates.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {templates.map((template) => (
                      <div key={template.id} className="p-3 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {template.content}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadTemplate(template.id)}>
                          استخدم هذا القالب
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>سجل الرسائل المرسلة</CardTitle>
                <CardDescription>آخر 50 رسالة تم إرسالها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className="p-3 border rounded-md">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium" dir="ltr">
                            {message.phone_number}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString(
                              "ar-SA",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        {getStatusBadge(message.status)}
                      </div>
                      <p className="text-sm">{message.message_content}</p>
                      {message.error_message && (
                        <p className="text-sm text-red-600 mt-1">
                          خطأ: {message.error_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer language={language} />
    </div>
  );
};

export default SmsManagement;
