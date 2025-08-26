import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, Send, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Feedback = () => {
  const { user, loading } = useAuth();
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [message, setMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("يرجى كتابة رسالتك");
      return;
    }

    setSubmitting(true);

    try {
      // Mock implementation - simulate feedback submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("تم إرسال ملاحظاتك بنجاح! شكراً لك");
      setRating(0);
      setMessage("");
      setFeedbackType("general");
      setIsPublic(true);
    } catch (error) {
      toast.error("حدث خطأ في إرسال الملاحظات");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            الملاحظات والتقييم
          </h1>
          <p className="text-lg text-muted-foreground">
            شاركنا آراءك وملاحظاتك لمساعدتنا في تحسين خدماتنا
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                إرسال ملاحظات جديدة
              </CardTitle>
              <CardDescription>
                أخبرنا عن تجربتك مع مبادرة مدينة حريملاء الصحية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label>تقييمك العام</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-2 rounded-lg transition-colors ${
                          star <= rating
                            ? "text-yellow-500 bg-yellow-50"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}>
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rating === 0 && "اختر تقييماً"}
                    {rating === 1 && "ضعيف جداً"}
                    {rating === 2 && "ضعيف"}
                    {rating === 3 && "مقبول"}
                    {rating === 4 && "جيد"}
                    {rating === 5 && "ممتاز"}
                  </p>
                </div>

                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>نوع الملاحظات</Label>
                  <RadioGroup
                    value={feedbackType}
                    onValueChange={setFeedbackType}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="cursor-pointer">
                          ملاحظات عامة
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="initiative" id="initiative" />
                        <Label htmlFor="initiative" className="cursor-pointer">
                          مبادرة معينة
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="website" id="website" />
                        <Label htmlFor="website" className="cursor-pointer">
                          الموقع الإلكتروني
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="suggestion" id="suggestion" />
                        <Label htmlFor="suggestion" className="cursor-pointer">
                          اقتراحات
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <Label htmlFor="message">رسالتك</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب ملاحظاتك أو اقتراحاتك هنا..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {/* Privacy */}
                <div className="space-y-3">
                  <Label>خصوصية الملاحظات</Label>
                  <RadioGroup
                    value={isPublic ? "public" : "private"}
                    onValueChange={(value) => setIsPublic(value === "public")}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="cursor-pointer">
                          عامة (يمكن مشاركتها)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="cursor-pointer">
                          خاصة (للاستخدام الداخلي فقط)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      إرسال الملاحظات
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">معلومات مهمة:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• جميع الملاحظات يتم مراجعتها من قبل فريق العمل</li>
                <li>• الملاحظات العامة قد يتم مشاركتها لتحسين الخدمات</li>
                <li>• الملاحظات الخاصة تبقى سرية ولا يتم مشاركتها</li>
                <li>• نرد على جميع الملاحظات خلال 48 ساعة</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
