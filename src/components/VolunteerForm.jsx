import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Users,
  Leaf,
  GraduationCap,
  Car,
  Building,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const VolunteerForm = () => {
  const { toast } = useToast();
  const { language } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    ar: {
      title: "انضم إلى فريق التطوع",
      subtitle: "ساهم في بناء مجتمع حريملاء الصحي",
      form: {
        personalInfo: "المعلومات الشخصية",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        age: "العمر",
        education: "المستوى التعليمي",
        occupation: "المهنة",

        interests: "مجالات الاهتمام",
        selectInterests: "اختر المجالات التي تهتم بالتطوع فيها:",

        availability: "التوفر للتطوع",
        timeCommitment: "الوقت المتاح للتطوع",
        experience: "الخبرة السابقة",
        experienceDesc: "صف أي خبرة سابقة في التطوع أو المجالات ذات الصلة",

        motivation: "الدافع للتطوع",
        motivationDesc: "لماذا تريد التطوع في مدينة حريملاء الصحية؟",

        submit: "إرسال طلب التطوع",
        submitting: "جاري الإرسال...",

        success: "تم إرسال طلبك بنجاح!",
        successDesc: "سيتواصل معك فريقنا قريباً",
      },
      interests: [
        { id: "health", label: "الصحة العامة", icon: Heart },
        { id: "environment", label: "البيئة والاستدامة", icon: Leaf },
        { id: "social", label: "الأنشطة الاجتماعية", icon: Users },
        { id: "education", label: "التعليم والتوعية", icon: GraduationCap },
        { id: "transport", label: "النقل المستدام", icon: Car },
        { id: "infrastructure", label: "البنية التحتية", icon: Building },
      ],
      timeOptions: [
        { value: "2-4", label: "2-4 ساعات أسبوعياً" },
        { value: "4-8", label: "4-8 ساعات أسبوعياً" },
        { value: "8-16", label: "8-16 ساعة أسبوعياً" },
        { value: "16+", label: "أكثر من 16 ساعة أسبوعياً" },
      ],
      educationOptions: [
        { value: "high-school", label: "ثانوية عامة" },
        { value: "diploma", label: "دبلوم" },
        { value: "bachelor", label: "بكالوريوس" },
        { value: "master", label: "ماجستير" },
        { value: "phd", label: "دكتوراه" },
      ],
    },
    en: {
      title: "Join Our Volunteer Team",
      subtitle: "Contribute to building a healthy Harimlaa community",
      form: {
        personalInfo: "Personal Information",
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        age: "Age",
        education: "Education Level",
        occupation: "Occupation",

        interests: "Areas of Interest",
        selectInterests:
          "Select the areas you're interested in volunteering for:",

        availability: "Volunteer Availability",
        timeCommitment: "Time Commitment",
        experience: "Previous Experience",
        experienceDesc:
          "Describe any previous volunteering or relevant experience",

        motivation: "Motivation for Volunteering",
        motivationDesc:
          "Why do you want to volunteer with Harimlaa Healthy City?",

        submit: "Submit Volunteer Application",
        submitting: "Submitting...",

        success: "Application submitted successfully!",
        successDesc: "Our team will contact you soon",
      },
      interests: [
        { id: "health", label: "Public Health", icon: Heart },
        {
          id: "environment",
          label: "Environment & Sustainability",
          icon: Leaf,
        },
        { id: "social", label: "Social Activities", icon: Users },
        {
          id: "education",
          label: "Education & Awareness",
          icon: GraduationCap,
        },
        { id: "transport", label: "Sustainable Transport", icon: Car },
        { id: "infrastructure", label: "Infrastructure", icon: Building },
      ],
      timeOptions: [
        { value: "2-4", label: "2-4 hours per week" },
        { value: "4-8", label: "4-8 hours per week" },
        { value: "8-16", label: "8-16 hours per week" },
        { value: "16+", label: "More than 16 hours per week" },
      ],
      educationOptions: [
        { value: "high-school", label: "High School" },
        { value: "diploma", label: "Diploma" },
        { value: "bachelor", label: "Bachelor's Degree" },
        { value: "master", label: "Master's Degree" },
        { value: "phd", label: "PhD" },
      ],
    },
  };

  const current = content[language]; // Use language context
  const isRTL = language === "ar"; // Use language context

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestChange = (interestId, checked) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId]);
    } else {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: current.form.success,
      description: current.form.successDesc,
    });

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {current.title}
            </h2>
            <p className="text-xl text-muted-foreground">{current.subtitle}</p>
          </div>

          {/* Form */}
          <Card className="bg-card border border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                {current.form.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{current.form.fullName}</Label>
                    <Input id="fullName" required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{current.form.email}</Label>
                    <Input id="email" type="email" required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{current.form.phone}</Label>
                    <Input id="phone" type="tel" required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">{current.form.age}</Label>
                    <Input
                      id="age"
                      type="number"
                      min="16"
                      max="80"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">{current.form.education}</Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {current.educationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">
                      {current.form.occupation}
                    </Label>
                    <Input id="occupation" className="h-12" />
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {current.form.interests}
                  </h3>
                  <p className="text-muted-foreground">
                    {current.form.selectInterests}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {current.interests.map((interest) => (
                      <div
                        key={interest.id}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={interest.id}
                          checked={selectedInterests.includes(interest.id)}
                          onCheckedChange={(checked) =>
                            handleInterestChange(interest.id, checked)
                          }
                        />
                        <interest.icon className="h-5 w-5 text-primary" />
                        <Label
                          htmlFor={interest.id}
                          className="font-medium cursor-pointer">
                          {interest.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {current.form.availability}
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="timeCommitment">
                      {current.form.timeCommitment}
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {current.timeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Experience & Motivation */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      {current.form.experience}
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder={current.form.experienceDesc}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      {current.form.motivation}
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder={current.form.motivationDesc}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-12 py-6 text-lg font-semibold">
                    {isSubmitting
                      ? current.form.submitting
                      : current.form.submit}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerForm;
