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
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Feedback = () => {
  const { user, loading } = useAuth();
  const { language } = useTheme();
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
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error(
        language === "ar" ? "يرجى كتابة رسالتك" : "Please write your message"
      );
      return;
    }

    setSubmitting(true);

    try {
      // Mock implementation - simulate feedback submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        language === "ar"
          ? "تم إرسال ملاحظاتك بنجاح! شكراً لك"
          : "Your feedback has been sent successfully! Thank you"
      );
      setRating(0);
      setMessage("");
      setFeedbackType("general");
      setIsPublic(true);
    } catch (error) {
      toast.error(
        language === "ar"
          ? "حدث خطأ في إرسال الملاحظات"
          : "An error occurred while sending feedback"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {language === "ar" ? "الملاحظات والتقييم" : "Feedback & Rating"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "شاركنا آراءك وملاحظاتك لمساعدتنا في تحسين خدماتنا"
              : "Share your opinions and feedback to help us improve our services"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {language === "ar"
                  ? "إرسال ملاحظات جديدة"
                  : "Send New Feedback"}
              </CardTitle>
              <CardDescription>
                {language === "ar"
                  ? "أخبرنا عن تجربتك مع مبادرة مدينة حريملاء الصحية"
                  : "Tell us about your experience with the Harimlaa Healthy City initiative"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label>
                    {language === "ar" ? "تقييمك العام" : "Your Overall Rating"}
                  </Label>
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
                  <Label>
                    {language === "ar" ? "نوع الملاحظات" : "Type of Feedback"}
                  </Label>
                  <RadioGroup
                    value={feedbackType}
                    onValueChange={setFeedbackType}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="cursor-pointer">
                          {language === "ar"
                            ? "ملاحظات عامة"
                            : "General Feedback"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="initiative" id="initiative" />
                        <Label htmlFor="initiative" className="cursor-pointer">
                          {language === "ar"
                            ? "مبادرة معينة"
                            : "Specific Initiative"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="website" id="website" />
                        <Label htmlFor="website" className="cursor-pointer">
                          {language === "ar" ? "الموقع الإلكتروني" : "Website"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="suggestion" id="suggestion" />
                        <Label htmlFor="suggestion" className="cursor-pointer">
                          {language === "ar" ? "اقتراحات" : "Suggestions"}
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <Label htmlFor="message">
                    {language === "ar" ? "رسالتك" : "Your Message"}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      language === "ar"
                        ? "اكتب ملاحظاتك أو اقتراحاتك هنا..."
                        : "Write your feedback or suggestions here..."
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {/* Privacy */}
                <div className="space-y-3">
                  <Label>
                    {language === "ar"
                      ? "خصوصية الملاحظات"
                      : "Privacy of Feedback"}
                  </Label>
                  <RadioGroup
                    value={isPublic ? "public" : "private"}
                    onValueChange={(value) => setIsPublic(value === "public")}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="cursor-pointer">
                          {language === "ar"
                            ? "عامة (يمكن مشاركتها)"
                            : "Public (can be shared)"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="cursor-pointer">
                          {language === "ar"
                            ? "خاصة (للاستخدام الداخلي فقط)"
                            : "Private (for internal use only)"}
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
                      {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {language === "ar" ? "إرسال الملاحظات" : "Send Feedback"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">
                {language === "ar" ? "معلومات مهمة:" : "Important Information:"}
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  •{" "}
                  {language === "ar"
                    ? "جميع الملاحظات يتم مراجعتها من قبل فريق العمل"
                    : "All feedback is reviewed by our team"}
                </li>
                <li>
                  •{" "}
                  {language === "ar"
                    ? "الملاحظات العامة قد يتم مشاركتها لتحسين الخدمات"
                    : "Public feedback may be shared to improve services"}
                </li>
                <li>
                  •{" "}
                  {language === "ar"
                    ? "الملاحظات الخاصة تبقى سرية ولا يتم مشاركتها"
                    : "Private feedback remains confidential and not shared"}
                </li>
                <li>
                  •{" "}
                  {language === "ar"
                    ? "نرد على جميع الملاحظات خلال 48 ساعة"
                    : "We respond to all feedback within 48 hours"}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
