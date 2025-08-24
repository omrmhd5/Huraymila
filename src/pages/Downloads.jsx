import React from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Image,
  FileVideo,
  FileAudio,
  Calendar,
  HardDrive,
} from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const Downloads = () => {
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

  const downloadCategories = [
    {
      name: "المستندات",
      icon: FileText,
      color: "bg-blue-500",
      files: [
        {
          name: "دليل المدينة الصحية.pdf",
          size: "2.4 MB",
          date: "2024-01-15",
          downloads: 1250,
          type: "pdf",
        },
        {
          name: "التقرير السنوي 2023.pdf",
          size: "5.8 MB",
          date: "2024-01-10",
          downloads: 890,
          type: "pdf",
        },
        {
          name: "دليل المتطوعين.pdf",
          size: "1.2 MB",
          date: "2024-01-05",
          downloads: 2100,
          type: "pdf",
        },
      ],
    },
    {
      name: "الصور",
      icon: Image,
      color: "bg-green-500",
      files: [
        {
          name: "صور المبادرات الصحية.zip",
          size: "15.2 MB",
          date: "2024-01-12",
          downloads: 456,
          type: "zip",
        },
        {
          name: "شعار المدينة الصحية.png",
          size: "2.1 MB",
          date: "2024-01-08",
          downloads: 1200,
          type: "png",
        },
      ],
    },
    {
      name: "الفيديوهات",
      icon: FileVideo,
      color: "bg-purple-500",
      files: [
        {
          name: "فيديو تعريفي بالمدينة.mp4",
          size: "45.6 MB",
          date: "2024-01-14",
          downloads: 678,
          type: "mp4",
        },
        {
          name: "مقابلة مع مدير المبادرة.mp4",
          size: "32.1 MB",
          date: "2024-01-06",
          downloads: 445,
          type: "mp4",
        },
      ],
    },
    {
      name: "الملفات الصوتية",
      icon: FileAudio,
      color: "bg-orange-500",
      files: [
        {
          name: "بودكاست الصحة المجتمعية.mp3",
          size: "18.7 MB",
          date: "2024-01-11",
          downloads: 234,
          type: "mp3",
        },
      ],
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "zip":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "png":
      case "jpg":
        return <Image className="w-5 h-5 text-green-500" />;
      case "mp4":
        return <FileVideo className="w-5 h-5 text-purple-500" />;
      case "mp3":
        return <FileAudio className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDownload = (fileName) => {
    // Mock download functionality
    console.log(`Downloading: ${fileName}`);
    // In a real app, this would trigger an actual download
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            الملفات المتاحة للتحميل
          </h1>
          <p className="text-lg text-muted-foreground">
            تحميل المستندات والمواد المتعلقة بمبادرة مدينة حريملاء الصحية
          </p>
        </div>

        <div className="space-y-8">
          {downloadCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.files.map((file, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <div>
                            <CardTitle className="text-sm font-medium line-clamp-2">
                              {file.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-3 h-3" />
                                {file.size}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {file.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(file.date).toLocaleDateString("ar-SA")}
                        </span>
                        <span>{file.downloads} تحميل</span>
                      </div>
                      <Button
                        onClick={() => handleDownload(file.name)}
                        size="sm"
                        className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Download Guidelines */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>إرشادات التحميل</CardTitle>
            <CardDescription>
              معلومات مهمة حول تحميل واستخدام الملفات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">قبل التحميل:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• تأكد من توفر مساحة كافية على جهازك</li>
                  <li>• استخدم اتصال إنترنت مستقر</li>
                  <li>• أغلق التطبيقات غير الضرورية</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">بعد التحميل:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• فحص الملفات للتأكد من سلامتها</li>
                  <li>• الاحتفاظ بنسخة احتياطية</li>
                  <li>• مشاركة المحتوى مع المهتمين</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Downloads;
