import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const LanguageContext = createContext(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { language } = useTheme();

  const translations = {
    ar: {
      // Navigation
      nav: {
        home: "الرئيسية",
        about: "عن البرنامج",
        aboutHuraymila: "عن حريملاء",
        initiatives: "المبادرات",
        news: "الأخبار",
        successStories: "قصص النجاح",
        faq: "الأسئلة الشائعة",
        contact: "اتصل بنا",
        dashboard: "لوحة التحكم",
        signOut: "تسجيل الخروج",
        signInSignUp: "تسجيل الدخول / إنشاء حساب",
        nationalInitiative: "مبادرة وطنية",
        healthyCity: "مدينة حريملاء الصحية",
      },

      // Common
      common: {
        loading: "جاري التحميل...",
        search: "بحث",
        filter: "تصفية",
        sort: "ترتيب",
        all: "الكل",
        newest: "الأحدث",
        oldest: "الأقدم",
        mostViewed: "الأكثر مشاهدة",
        mostLiked: "الأكثر إعجاباً",
        mostVolunteers: "الأكثر متطوعين",
        mostProgress: "الأكثر تقدم",
        viewDetails: "عرض التفاصيل",
        readMore: "اقرأ المزيد",
        backToHome: "العودة للصفحة الرئيسية",
        discoverMore: "اكتشف المزيد",
        joinUs: "انضم إلينا",
        featured: "مميز",
        active: "نشط",
        completed: "مكتمل",
        cancelled: "ملغي",
        gatheringVolunteers: "جمع متطوعين",
        noResults: "لا توجد نتائج",
        tryDifferentSearch: "جرب البحث بكلمات مختلفة أو تغيير الفلاتر",
        showing: "عرض",
        of: "من",
        initiatives: "مبادرات",
        articles: "مقال",
        volunteers: "متطوع",
        volunteersNeeded: "متطوع مطلوب",
        min: "د",
        views: "مشاهدات",
        likes: "إعجابات",
        shares: "مشاركات",
        comments: "تعليقات",
        sendMessage: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        messageSent: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً",
        errorSending: "حدث خطأ في إرسال الرسالة",
        fillRequiredFields: "يرجى ملء جميع الحقول المطلوبة",
      },

      // Home Page
      home: {
        title: "مدينة حريملاء الصحية",
        subtitle: "مبادرة وطنية لتعزيز الصحة العامة وتحسين جودة الحياة",
        description:
          "نعمل معاً لبناء مدينة صحية ومستدامة من خلال المبادرات المجتمعية والشراكات الاستراتيجية مع الجهات الحكومية والمؤسسات الصحية.",
        healthInitiatives: "مبادرة صحية",
        activeVolunteers: "متطوع نشط",
        environmentalProjects: "مشروع بيئي",
        partnerOrganizations: "جهة شريكة",
        joinUs: "انضم إلينا",
      },

      // About Section
      about: {
        title: "عن برنامج مدينة حريملاء الصحية",
        subtitle: "مبادرة وطنية رائدة ضمن برنامج المدن الصحية السعودي",
        description:
          "برنامج مدينة حريملاء الصحية هو مبادرة وطنية طموحة تهدف إلى تحويل محافظة حريملاء إلى نموذج متقدم للمدن الصحية في المملكة العربية السعودية، من خلال تطبيق أحدث المعايير العالمية وأفضل الممارسات في مجال الصحة المجتمعية والتنمية المستدامة.",
        vision: {
          title: "رؤيتنا",
          description:
            "أن تكون حريملاء مدينة صحية نموذجية تحقق أعلى معايير جودة الحياة لسكانها وزوارها، وتساهم في تحقيق رؤية المملكة 2030.",
        },
        mission: {
          title: "رسالتنا",
          description:
            "تطوير وتنفيذ مبادرات صحية مبتكرة ومستدامة تعزز من صحة المجتمع ورفاهيته من خلال الشراكة الفعالة بين القطاعات الحكومية والخاصة والمجتمع المدني.",
        },
        objectives: {
          title: "أهدافنا الاستراتيجية",
          list: [
            "تحسين المؤشرات الصحية في المحافظة بنسبة 30% خلال 3 سنوات",
            "زيادة المساحات الخضراء في المدينة إلى 40% من إجمالي المساحة",
            "توعية 80% من سكان المدينة بثقافة الصحة والبيئة",
            "تطوير 20 مبادرة صحية جديدة سنوياً",
            "إقامة شبكة من الشركاء المحليين والدوليين",
            "تحقيق الاستدامة البيئية في جميع مشاريعنا",
            "تطوير برامج تدريبية متخصصة للعاملين في القطاع الصحي",
            "إنشاء نظام متكامل لرصد وتقييم المبادرات الصحية",
          ],
        },
        stats: {
          founded: "تأسس",
          healthInitiatives: "مبادرة صحية",
          beneficiaries: "مستفيد",
          partnerOrganizations: "منظمة شريكة",
        },
        features: {
          title: "المميزات الرئيسية",
          healthInitiatives: "المبادرات الصحية",
          healthInitiativesDesc: "برامج شاملة لتعزيز الصحة العامة",
          communityPartnership: "الشراكة المجتمعية",
          communityPartnershipDesc: "تعاون فعال مع جميع فئات المجتمع",
          environmentalSustainability: "الاستدامة البيئية",
          environmentalSustainabilityDesc: "حماية البيئة للأجيال القادمة",
          innovation: "الابتكار والتطوير",
          innovationDesc: "استخدام أحدث التقنيات والأساليب",
        },
        discoverMore: "اكتشف المزيد",
        stats: {
          title: "الإحصائيات",
        },
      },

      // About Huraymila
      aboutHuraymila: {
        title: "عن محافظة حريملاء",
        subtitle: "جوهرة منطقة الرياض",
        description:
          "تقع محافظة حريملاء في منطقة الرياض شمال غرب مدينة الرياض على بعد 86 كيلومتراً. تتميز بموقعها الاستراتيجي وتراثها العريق وتشتهر بالزراعة والمواقع التاريخية.",
        history: {
          title: "التاريخ والتراث",
          description:
            "تتمتع حريملاء بتاريخ عريق يعود إلى قرون عديدة، حيث كانت محطة مهمة على طرق التجارة القديمة. تشتهر بتراثها المعماري التقليدي والمواقع الأثرية التي تعكس عراقة المنطقة.",
        },
        geography: {
          title: "الموقع الجغرافي",
          description:
            "تقع حريملاء في منطقة الرياض على ارتفاع 650 متر فوق مستوى سطح البحر، وتتميز بمناخها المعتدل وطبيعتها الخلابة التي تجمع بين الجبال والسهول الخضراء.",
        },
        economy: {
          title: "الاقتصاد والتنمية",
          description:
            "تعتمد حريملاء على الزراعة كركيزة أساسية للاقتصاد المحلي، بالإضافة إلى السياحة التراثية والتنمية الصناعية الحديثة التي تساهم في دفع عجلة التطوير.",
        },
        culture: {
          title: "الثقافة والمجتمع",
          description:
            "يتميز مجتمع حريملاء بالترابط الاجتماعي القوي والحفاظ على العادات والتقاليد الأصيلة، مع الانفتاح على التطورات الحديثة في مختلف المجالات.",
        },
        features: {
          scenicNature: "الطبيعة الخلابة",
          scenicNatureDesc: "جبال وسهول تتميز بجمالها الطبيعي",
          moderateClimate: "المناخ المعتدل",
          moderateClimateDesc: "مناخ صحراوي معتدل على مدار السنة",
          thrivingAgriculture: "انتاج العسل البري",
          thrivingAgricultureDesc:
            "إنتاج عسل بري عالي الجودة من المناحل المحلية",
          continuousDevelopment: "التطوير المستمر",
          continuousDevelopmentDesc: "مشاريع تنموية حديثة ومستدامة",
        },
        stats: {
          population: "عدد السكان",
          founded: "سنة التأسيس",
          elevation: "الارتفاع",
          area: "المساحة",
          populationDensity: "الكثافة السكانية",
          saudis: "السعوديون",
          nonSaudis: "غير السعوديين",
          households: "عدد الأسر (2010)",
          dialingCode: "خطة ترقيم الهواتف",
          coordinates: "الإحداثيات",
          populationValue: "15,000 نسمة",
          foundedValue: "1400 هـ",
          elevationValue: "650 م",
          areaValue: "1,480 كم²",
          populationDensityValue: "15 نسمة/كم²",
          saudisValue: "8,772 (58.48%)",
          nonSaudisValue: "6,228 (41.52%)",
          householdsValue: "3,617 أسرة",
          dialingCodeValue: "011",
          coordinatesValue: "25°07′01″N 46°06′01″E",
        },
        keyFeatures: "الميز النسبية",
        statistics: "أعرف اكثر",
      },

      // Initiatives
      initiatives: {
        title: "المبادرات",
        subtitle: "اكتشف المبادرات النشطة في مدينة حريملاء الصحية",
        searchPlaceholder: "البحث في المبادرات...",
        category: "التصنيف",
        status: "الحالة",
        health: "صحة",
        environment: "بيئة",
        education: "تعليم",
        community: "مجتمع",
        location: "الموقع",
        startDate: "تاريخ البداية",
        volunteers: "متطوعين",
        progress: "التقدم",
        healthAwareness: "برنامج التوعية الصحية",
        healthAwarenessDesc:
          "برنامج شامل للتوعية بأهمية الصحة الوقائية والتغذية السليمة",
        urbanGreening: "مشروع التشجير الحضري",
        urbanGreeningDesc:
          "مبادرة لزيادة المساحات الخضراء في المدينة وتحسين جودة الهواء",
        healthyWalking: "مبادرة المشي الصحي",
        healthyWalkingDesc: "برنامج أسبوعي للمشي الصحي في منتزهات المدينة",
        schoolNutrition: "برنامج التغذية المدرسية",
        schoolNutritionDesc:
          "تحسين التغذية في المدارس وتوعية الطلاب بأهمية الغذاء الصحي",
        recyclingProject: "مشروع إعادة التدوير",
        recyclingProjectDesc:
          "برنامج شامل لإعادة تدوير النفايات وتقليل التلوث البيئي",
        vaccinationCampaign: "حملة التطعيم المجتمعي",
        vaccinationCampaignDesc:
          "حملة تطعيم شاملة لجميع فئات المجتمع ضد الأمراض المعدية",
        cityHealthCenter: "مركز المدينة الصحي",
        throughoutCity: "جميع أنحاء المدينة",
        cityPark: "منتزه المدينة",
        huraymilaSchools: "مدارس حريملاء",
        allNeighborhoods: "جميع الأحياء",
        healthCenters: "المراكز الصحية",
      },

      // Partners Section
      partnersSection: {
        title: "شبكة التكامل المجتمعي",
        subtitle:
          "جودة الحياة تتحقق بتكامل المجتمع والجهات في تقديم الخدمات وتطويرها.",
        centerEntity: {
          name: "المجتمع والمتطوعون",
          description: "الركيزة الأساسية لكل المبادرات",
          stats: "500+ متطوع نشط",
          organizations: "17 جهة شريكة",
        },
        stats: {
          partnerOrganizations: "جهات شريكة",
          integratedInitiatives: "مبادرة تكاملية",
          activeVolunteers: "متطوع نشط",
          communitySatisfaction: "رضا المجتمع",
        },
      },

      // Success Partners
      successPartners: {
        title: "شركاؤنا في النجاح",
        partners: {
          ministryOfHealth: "وزارة الصحة",
          ministryOfEducation: "وزارة التعليم",
          ministryOfEnvironment: "وزارة البيئة والمياه والزراعة",
          ministryOfHumanResources: "وزارة الموارد البشرية والتنمية الاجتماعية",
          huraymilaHospital: "مستشفى حريملاء العام",
          civilDefense: "الدفاع المدني",
          nationalWaterCompany: "شركة المياه الوطنية",
          huraymilaGovernorate: "محافظة حريملاء",
          riyadhMunicipality: "بلدية حريملاء",
          environmentalSecurity: "القوة الخاصة للأمن البيئي",
          police: "الشرطة",
          trafficDepartment: "المرور",
          charityAssociation: "جمعية حريملاء الخيرية",
          developmentAssociation: "جمعية التنمية الأهلية بحريملاء",
          imamUniversity: "جامعة الإمام محمد بن سعود الإسلامية",
          who: "منظمة الصحة العالمية",
          friendsOfPatients: "جمعية أصدقاء المرضى بحريملاء",
        },
      },

      // Initiatives Section
      initiativesSection: {
        title: "المبادرات",
        subtitle: "اكتشف المبادرات النشطة في مدينة حريملاء الصحية",
        description:
          "نقدم مجموعة متنوعة من المبادرات التي تهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في المجتمع.",
        viewAll: "عرض جميع المبادرات",
        categories: {
          health: "صحة",
          environment: "بيئة",
          community: "مجتمع",
          education: "تعليم",
        },
        status: {
          active: "نشط",
          completed: "مكتمل",
          planning: "قيد التخطيط",
        },
        details: {
          of: "من",
          participants: "مشاركين",
          participantsNeeded: "مشاركين مطلوبين",
          startDate: "تاريخ البداية",
          endDate: "تاريخ الانتهاء",
          location: "الموقع",
          participantsLabel: "المشاركون",
          viewDetails: "عرض التفاصيل",
        },
      },

      // Quick Links Section
      quickLinksSection: {
        title: "روابط سريعة",
        subtitle: "الوصول السريع للخدمات المهمة",
        links: {
          submitReport: "تقديم بلاغ",
          volunteerInInitiatives: "تطوع في مبادرات",
          login: "تسجيل الدخول",
        },
        getStarted: "ابدأ الآن",
      },

      // Health Dashboard
      healthDashboard: {
        title: "لوحة المؤشرات الصحية",
        subtitle: "مؤشرات مباشرة لجودة الحياة في حريملاء",
        lastUpdate: "آخر تحديث",
        excellent: "ممتاز",
        target: "الهدف",
        indicators: {
          airQuality: {
            title: "جودة الهواء",
            status: "جيد",
            description: "PM2.5: 12 μg/m³",
            detail: "مستويات PM2.5 ضمن معايير منظمة الصحة العالمية",
          },
          waterQuality: {
            title: "جودة المياه",
            status: "ممتاز",
            description: "نقاء 99.8%",
            detail: "نقاء المياه يتجاوز المعايير الوطنية",
          },
          vaccination: {
            title: "معدل التطعيمات",
            status: "عالي",
            description: "96% من السكان",
            detail: "تغطية التطعيمات للسكان",
          },
          physicalActivity: {
            title: "النشاط البدني",
            status: "متوسط",
            description: "68% يمارسون الرياضة",
            detail: "البالغون الذين يمارسون الرياضة بانتظام",
          },
          trafficAccidents: {
            title: "الحوادث المرورية",
            status: "منخفض",
            description: "12 حادث/شهر",
            detail: "حوادث المرور الشهرية",
          },
          recycling: {
            title: "إعادة التدوير",
            status: "جيد",
            description: "74% من النفايات",
            detail: "نسبة إعادة تدوير النفايات",
          },
        },
        status: {
          excellent: "ممتاز",
          good: "جيد",
          medium: "متوسط",
          low: "منخفض",
          high: "عالي",
        },
        summary: {
          healthIndicators: "مؤشرات صحية",
          excellentIndicators: "مؤشرات ممتازة",
          positiveTrend: "اتجاه إيجابي",
          performanceAverage: "متوسط الأداء",
        },
      },

      // Success Stories
      successStories: {
        title: "قصص النجاح",
        subtitle: "اكتشف كيف غيرت مبادرتنا حياة الناس في مدينة حريملاء",
        description:
          "نفخر بنجاحاتنا وإنجازاتنا في تعزيز الصحة العامة وتحسين جودة الحياة في المجتمع.",
        viewAll: "عرض جميع القصص",
        before: "قبل",
        after: "بعد",
        categories: {
          health: "صحة",
          environment: "بيئة",
          community: "مجتمع",
          education: "تعليم",
        },
      },

      // News Section
      newsSection: {
        title: "أحدث الأخبار",
        subtitle: "تابع آخر التحديثات والمبادرات في مدينة حريملاء الصحية",
        description:
          "نوفر لك أحدث الأخبار والتطورات في مجال الصحة العامة والمبادرات المجتمعية.",
        viewAll: "عرض جميع الأخبار",
        readMore: "اقرأ المزيد",
        previous: "السابق",
        next: "التالي",
        play: "تشغيل",
        pause: "إيقاف",
        views: "مشاهد",
        categories: {
          health: "صحة",
          environment: "بيئة",
          community: "مجتمع",
          education: "تعليم",
        },
      },

      // Interactive Map
      interactiveMap: {
        title: "الخريطة التفاعلية",
        subtitle: "اكتشف الخدمات والمرافق في مدينتك",
        searchAndFilter: "البحث والتصفية",
        searchPlaceholder: "البحث عن الخدمات...",
        category: "التصنيف",
        clearFilters: "مسح الفلاتر",
        services: "الخدمات",
        noServices: "لا توجد خدمات",
        categories: {
          all: "الكل",
          health: "صحة",
          emergency: "طوارئ",
          education: "تعليم",
          shopping: "تسوق",
          food: "طعام",
          finance: "مالية",
          recreation: "ترفيه",
        },
        serviceTypes: {
          hospital: "مستشفى",
          pharmacy: "صيدلية",
          police: "شرطة",
          fire: "إطفاء",
          school: "مدرسة",
          restaurant: "مطعم",
          shopping: "تسوق",
          bank: "بنك",
          park: "حديقة",
          service: "خدمة",
        },
      },

      // News
      news: {
        title: "الأخبار",
        subtitle: "تابع آخر الأخبار والتطورات في مدينة حريملاء الصحية",
        searchPlaceholder: "البحث في الأخبار...",
        category: "التصنيف",
        health: "صحة",
        healthFacilities: "مرافق صحية",
        vaccinations: "تطعيمات",
        nutrition: "تغذية",
        physicalActivity: "نشاط بدني",
        technology: "تقنية",
        preventiveHealth: "إطلاق مبادرة الصحة الوقائية في مدينة حريملاء",
        preventiveHealthDesc:
          "مبادرة جديدة للصحة الوقائية تهدف إلى تعزيز الوعي الصحي بين المواطنين",
        newHealthCenter: "افتتاح مركز جديد للرعاية الصحية الأولية",
        newHealthCenterDesc:
          "مركز جديد مجهز بأحدث التقنيات الطبية يقدم خدمات شاملة",
        fluVaccination: "حملة التطعيم ضد الإنفلونزا الموسمية",
        fluVaccinationDesc:
          "انطلاق حملة التطعيم المجاني ضد الإنفلونزا في جميع المراكز الصحية",
        nutritionWorkshop: "ورشة عمل حول التغذية السليمة للأطفال",
        nutritionWorkshopDesc:
          "ورشة تفاعلية تهدف إلى تعليم الأمهات أساسيات التغذية الصحية",
        walkingProgram: "برنامج المشي الصحي في المنتزهات",
        walkingProgramDesc:
          "برنامج أسبوعي للمشي الصحي في منتزهات المدينة مع مرشدين مختصين",
        smartHealthcareApp: "تطبيق جديد للرعاية الصحية الذكية",
        smartHealthcareAppDesc:
          "إطلاق تطبيق ذكي يربط المواطنين بالخدمات الصحية المتاحة",
        author: "المؤلف",
        publishDate: "تاريخ النشر",
        readTime: "وقت القراءة",
        views: "مشاهدات",
        likes: "إعجابات",
        comments: "تعليقات",
      },

      // Contact
      contact: {
        title: "اتصل بنا",
        subtitle: "نحن هنا للإجابة على استفساراتك ومساعدتك",
        contactInformation: "معلومات التواصل",
        contactInformationDesc:
          "طرق مختلفة للتواصل مع فريق مبادرة المدينة الصحية",
        sendMessage: "أرسل لنا رسالة",
        sendMessageDesc: "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن",
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        email: "البريد الإلكتروني",
        emailPlaceholder: "example@email.com",
        phone: "رقم الهاتف",
        phonePlaceholder: "+966-50-123-4567",
        subject: "الموضوع",
        subjectPlaceholder: "اختر موضوع الرسالة",
        message: "الرسالة",
        messagePlaceholder: "اكتب رسالتك هنا...",
        generalInquiry: "استفسار عام",
        initiativeInfo: "معلومات عن المبادرات",
        volunteering: "التطوع",
        workingHours: "ساعات العمل",
        complaintSuggestion: "شكوى أو اقتراح",
        other: "أخرى",
        emailContact: "البريد الإلكتروني",
        emailContactDesc: "راسلنا عبر البريد الإلكتروني",
        phoneContact: "الهاتف",
        phoneContactDesc: "اتصل بنا مباشرة",
        addressContact: "العنوان",
        addressContactDesc: "موقع مبادرة المدينة الصحية",
        address: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
        emailAddress: "info@huraymila-healthy.city",
        phoneNumber: "+966-11-123-4567",
      },

      // FAQ
      faq: {
        title: "الأسئلة الشائعة",
        subtitle:
          "إجابات على أكثر الأسئلة شيوعاً حول برنامج مدينة حريملاء الصحية",
        aboutProgram: "عن البرنامج",
        initiativesActivities: "المبادرات والأنشطة",
        volunteering: "التطوع",
        environmentSustainability: "البيئة والاستدامة",
        educationTraining: "التعليم والتدريب",
        whatIsProgram: "ما هو برنامج مدينة حريملاء الصحية؟",
        whatIsProgramAnswer:
          "برنامج مدينة حريملاء الصحية هو مبادرة شاملة تهدف إلى تحسين جودة الحياة والصحة العامة في محافظة حريملاء من خلال تعزيز التعاون بين الجهات الحكومية والجمعيات الأهلية والمجتمع المحلي.",
        programObjectives: "ما هي أهداف البرنامج؟",
        programObjectivesAnswer:
          "يهدف البرنامج إلى تحسين المؤشرات الصحية، تعزيز أنماط الحياة الصحية، دعم المبادرات المجتمعية، وتطوير البنية التحتية الصحية والاجتماعية في المحافظة.",
        whoCanParticipate: "من يمكنه المشاركة في البرنامج؟",
        whoCanParticipateAnswer:
          "يمكن لجميع أفراد المجتمع المشاركة في البرنامج سواء كمتطوعين أو مستفيدين من الخدمات. كما يمكن للجهات الحكومية والجمعيات الأهلية والقطاع الخاص المشاركة كشركاء.",
        initiativeTypes: "ما هي أنواع المبادرات المتاحة؟",
        initiativeTypesAnswer:
          "يشمل البرنامج مبادرات صحية متنوعة مثل برامج التوعية الصحية، فحوصات طبية مجانية، أنشطة رياضية، برامج التغذية الصحية، ومبادرات الصحة النفسية.",
        howToJoinInitiative: "كيف يمكنني الانضمام لمبادرة؟",
        howToJoinInitiativeAnswer:
          "يمكنك التسجيل في المبادرات من خلال الموقع الإلكتروني أو زيارة مكتب التنسيق في المحافظة. سيتم التواصل معك لتأكيد المشاركة وتزويدك بالتفاصيل اللازمة.",
        initiativeFees: "هل هناك رسوم للمشاركة في المبادرات؟",
        initiativeFeesAnswer:
          "معظم المبادرات مجانية تماماً. قد توجد بعض الأنشطة المتخصصة التي تتطلب رسوم رمزية، وسيتم إعلام المشاركين مسبقاً بذلك.",
        howToVolunteer: "كيف يمكنني التطوع في البرنامج؟",
        howToVolunteerAnswer:
          "يمكنك التسجيل كمتطوع من خلال صفحة التطوع في الموقع، أو زيارة مكتب التنسيق. سنقوم بتقييم مهاراتك وتوجيهك للمبادرات المناسبة.",
        volunteerRequirements: "ما هي متطلبات التطوع؟",
        volunteerRequirementsAnswer:
          "لا توجد متطلبات خاصة للتطوع، فقط الرغبة في المساهمة في خدمة المجتمع. بعض المبادرات قد تتطلب مهارات معينة، وسيتم توضيح ذلك عند التسجيل.",
        volunteerCertificate: "هل أحصل على شهادة تطوع؟",
        volunteerCertificateAnswer:
          "نعم، يحصل المتطوعون على شهادات تقديرية تثبت ساعات التطوع والمبادرات التي شاركوا فيها، مما يساعد في بناء السيرة الذاتية.",
        environmentalInitiatives: "ما هي مبادرات البيئة في البرنامج؟",
        environmentalInitiativesAnswer:
          "نشمل برامج التشجير، تنظيف البيئة، إعادة التدوير، التوعية البيئية، وبرامج الطاقة المتجددة لتحقيق الاستدامة البيئية.",
        environmentalParticipation: "كيف يمكنني المشاركة في الأنشطة البيئية؟",
        environmentalParticipationAnswer:
          "يمكنك الانضمام لفرق العمل البيئية، المشاركة في حملات التنظيف، أو اقتراح مبادرات بيئية جديدة من خلال قنوات التواصل المتاحة.",
        trainingPrograms: "ما هي برامج التدريب المتاحة؟",
        trainingProgramsAnswer:
          "نوفر دورات تدريبية في الإسعافات الأولية، التوعية الصحية، القيادة المجتمعية، المهارات الحياتية، والتدريب المهني.",
        suggestTrainingTopic: "هل يمكنني اقتراح موضوع تدريبي جديد؟",
        suggestTrainingTopicAnswer:
          "نعم، نرحب باقتراحاتكم لمواضيع تدريبية جديدة. يمكنكم إرسال الاقتراحات من خلال صفحة التواصل أو مكتب التنسيق.",
        contactTitle: "لم تجد إجابة لسؤالك؟",
        contactSubtitle: "تواصل معنا وسنكون سعداء لمساعدتك",
        callUs: "اتصل بنا",
        callUsDetails: "011-123-4567",
        callUsDesc: "من الأحد إلى الخميس، 8 صباحاً - 4 مساءً",
        emailUs: "راسلنا",
        emailUsDetails: "info@huraymila-healthy-city.gov.sa",
        emailUsDesc: "سنرد عليك خلال 24 ساعة",
        visitUs: "زرنا",
        visitUsDetails: "مكتب تنسيق برنامج المدينة الصحية",
        visitUsDesc: "محافظة حريملاء، الرياض",
      },

      // Auth
      auth: {
        title: "مرحباً بك",
        subtitle: "سجل دخولك أو سجل كمتطوع جديد",
        signIn: "تسجيل الدخول",
        signUp: "سجل كمتطوع",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        signInButton: "دخول",
        signUpButton: "سجل كمتطوع",
        backToHome: "العودة للصفحة الرئيسية",
        emailPlaceholder: "your@email.com",
        passwordPlaceholder: "••••••••",
        fullNamePlaceholder: "الاسم الكامل",
        phonePlaceholder: "+966 50 123 4567",
        hasAccount: "لديك حساب؟",
        noAccount: "ليس لديك حساب؟",
        switchToSignIn: "تسجيل الدخول",
        switchToSignUp: "سجل كمتطوع",
      },

      // Footer
      footer: {
        description:
          "مبادرة مدينة حريملاء الصحية هي مشروع وطني يهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في المدينة من خلال مجموعة من البرامج والمبادرات المتنوعة.",
        quickLinks: "روابط سريعة",
        contactInfo: "معلومات التواصل",
        address: "مدينة حريملاء، منطقة الرياض، المملكة العربية السعودية",
        phone: "+966 11 234 5678",
        email: "info@huraymila-healthy.sa",
        workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م",
        socialMedia: "تابعنا على وسائل التواصل",
        socialMediaDesc: "للحصول على آخر الأخبار والتحديثات",
        copyright: "© 2025 مبادرة مدينة حريملاء الصحية. جميع الحقوق محفوظة.",
        madeWith: "صنع بـ",
        inSaudiArabia: "في المملكة العربية السعودية",
      },

      // Agency Dashboard
      agencyDashboard: {
        timeline: {
          title: "الجدول الزمني للبرنامج",
          phases: {
            launch: {
              year: "2025",
              title: "إطلاق البرنامج",
              description: "بداية المبادرات الأساسية وتأسيس الشراكات",
              status: "مكتمل",
            },
            expansion: {
              year: "2025",
              title: "التوسع والتطوير",
              description: "تنفيذ المشاريع الكبرى وزيادة المشاركة المجتمعية",
              status: "قيد التنفيذ",
            },
            evaluation: {
              year: "2026",
              title: "التقييم والتحسين",
              description: "تقييم النتائج وتطوير المبادرات القائمة",
              status: "مخطط",
            },
            accreditation: {
              year: "2027",
              title: "الاعتماد العالمي",
              description: "التقدم للحصول على اعتماد منظمة الصحة العالمية",
              status: "مخطط",
            },
          },
        },
      },

      // Initiative Page
      initiative: {
        backToInitiatives: "العودة للمبادرات",
        applyNow: "تطوع الآن",
        share: "مشاركة",
        volunteersNeeded: "متطوع مطلوب",
        progress: "التقدم",
        location: "الموقع",
        startDate: "تاريخ البداية",
        duration: "المدة",
        category: "التصنيف",
        status: "الحالة",
        description: "الوصف",
        objectives: "الأهداف",
        requirements: "المتطلبات",
        benefits: "الفوائد",
        contact: "التواصل",
        apply: "تطوع",
        cancel: "إلغاء",
        applying: "جاري التطوع...",
        applied: "تم التطوع بنجاح!",
        error: "حدث خطأ في التطوع",
        notFound: "المبادرة غير موجودة",
        active: "نشط",
        completed: "مكتمل",
        cancelled: "ملغي",
        gatheringVolunteers: "جمع متطوعين",
        health: "صحة",
        environment: "بيئة",
        community: "مجتمع",
        education: "تعليم",
        volunteers: "متطوع",
        volunteerProgress: "تقدم المتطوعين",
        of: "من",
        tags: "العلامات",
      },

      // News Article Page
      newsArticle: {
        notFound: "المقال غير موجود",
        backToNews: "العودة للأخبار",
        minRead: "دقائق قراءة",
        tags: "العلامات",
        share: "مشاركة",
      },

      // Success Story Page
      successStory: {
        notFound: "القصة غير موجودة",
        backToStories: "العودة للقصص",
        beforeAfter: "قبل وبعد",
        before: "قبل",
        after: "بعد",
        achievedResults: "النتائج المحققة",
        tags: "العلامات",
        share: "مشاركة",
      },

      // About Page
      aboutPage: {
        title: "من نحن",
        subtitle: "مبادرة مدينة حريملاء الصحية",
        description:
          "نحن مبادرة وطنية تهدف إلى تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال مجموعة من البرامج والمبادرات المتنوعة.",
        mission: "مهمتنا",
        missionText:
          "تعزيز الصحة العامة وتحسين جودة الحياة في مدينة حريملاء من خلال المبادرات المجتمعية والشراكات الاستراتيجية.",
        vision: "رؤيتنا",
        visionText:
          "أن تكون مدينة حريملاء نموذجاً للمدينة الصحية المستدامة في المملكة العربية السعودية.",
        values: "قيمنا",
        valuesList: [
          "الشفافية والمصداقية",
          "الشراكة المجتمعية",
          "الابتكار والتطوير",
          "الاستدامة البيئية",
          "الجودة والتميز",
        ],
        goals: "أهدافنا",
        goalsText:
          "نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تساهم في بناء مجتمع صحي ومستدام",
        goalsList: [
          "تحسين مؤشرات الصحة العامة في المدينة بنسبة 30% خلال 3 سنوات",
          "زيادة المساحات الخضراء في المدينة إلى 40% من إجمالي المساحة",
          "توعية 80% من سكان المدينة بالثقافة الصحية والبيئية",
          "تطوير 20 مبادرة صحية جديدة سنوياً",
          "إنشاء شبكة من الشركاء المحليين والدوليين",
          "تحقيق الاستدامة البيئية في جميع مشاريعنا",
          "تطوير برامج تدريبية متخصصة للعاملين في القطاع الصحي",
          "إنشاء نظام متكامل لرصد وتقييم المبادرات",
        ],
        stats: {
          founded: "سنة الأنطلاق",
          healthInitiatives: "مبادرة صحية",
          beneficiaries: "مستفيد",
          partnerOrganizations: "جهة شريكة",
        },
        features: {
          initiatives: {
            title: "المبادرات",
            description:
              "برامج متنوعة لتعزيز الصحة البدنية والنفسية والاجتماعية",
          },
          environment: {
            title: "البيئة المستدامة",
            description: "مشاريع لحماية البيئة وتحسين جودة الهواء والمياه",
          },
          community: {
            title: "التوعية المجتمعية",
            description: "حملات توعوية لتعزيز الثقافة الصحية في المجتمع",
          },
          partnerships: {
            title: "الشراكات الاستراتيجية",
            description: "تعاون مع المؤسسات الحكومية والخاصة لتحقيق الأهداف",
          },
        },
        contact: "تواصل معنا",
        contactDescription: "نحن هنا لخدمتكم ومساعدتكم في أي وقت",
        address: "مدينة حريملاء، الرياض، المملكة العربية السعودية",
        phone: "+966-11-123-4567",
        email: "info@huraymila-healthy.city",
        workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م",
      },

      // NotFound Page
      notFound: {
        title: "الصفحة غير موجودة",
        description: "عذراً، الصفحة التي تبحث عنها غير موجودة",
        home: "الصفحة الرئيسية",
        goBack: "رجوع",
      },

      // All Success Stories Page
      allSuccessStories: {
        title: "قصص النجاح",
        addStory: "إضافة قصة نجاح",
        titleField: "العنوان",
        author: "المؤلف",
        before: "قبل",
        after: "بعد",
        fullStory: "النص الكامل",
        cancel: "إلغاء",
        addStoryButton: "إضافة القصة",
        category: "التصنيف",
        sort: "ترتيب",
        featured: "مميز",
        readStory: "اقرأ القصة",
        noResults: "لا توجد نتائج",
        all: "الكل",
        health: "صحة",
        environment: "بيئة",
        education: "تعليم",
        community: "مجتمع",
        technology: "تقنية",
        nutrition: "تغذية",
        newest: "الأحدث",
        oldest: "الأقدم",
        mostViewed: "الأكثر مشاهدة",
        mostLiked: "الأكثر إعجاباً",
        highestRated: "الأعلى تقييماً",
      },
      agencyManagement: {
        title: "إدارة الجهات",
        subtitle: "إدارة الجهات الحكومية المشاركة في مبادرة المدينة الصحية",
        addNewAgency: "إضافة جهة جديدة",
        agenciesList: "قائمة الجهات",
        manageAgencies: "إدارة جميع الجهات المشاركة",
        agencyEmail: "بريد الجهة:",
        agencyPassword: "كلمة مرور الجهة:",
        contactPerson: "الشخص المسؤول:",
        contactPersonInfo: "معلومات الشخص المسؤول",
        personEmail: "البريد الشخص الإلكتروني:",
        phone: "الهاتف:",
        address: "العنوان:",
        initiatives: "مبادرة",
        volunteers: "متطوع",
        editAgency: "تعديل الجهة",
        updateAgencyData: "تحديث بيانات الجهة",
        addNewAgencyTitle: "إضافة جهة جديدة",
        enterNewAgencyData: "إدخال بيانات الجهة الجديدة",
        agencyName: "اسم الجهة",
        agencyNamePlaceholder: "اسم الجهة",
        agencyDescription: "وصف الجهة",
        agencyDescriptionPlaceholder: "وصف مختصر عن الجهة ومهامها",
        agencyEmailField: "بريد الجهة الإلكتروني",
        agencyEmailPlaceholder: "agency@example.gov.sa",
        agencyPasswordField: "كلمة مرور الجهة",
        passwordPlaceholder: "كلمة المرور",
        contactPersonField: "الشخص المسؤول",
        contactPersonPlaceholder: "اسم الشخص المسؤول",
        personEmailField: "البريد الشخص الإلكتروني",
        phoneNumber: "رقم الهاتف",
        phonePlaceholder: "+966-11-123-4567",
        addressField: "العنوان",
        addressPlaceholder: "عنوان الجهة",
        update: "تحديث",
        add: "إضافة",
        cancel: "إلغاء",
        confirmDeletion: "تأكيد الحذف",
        confirmDeleteMessage: "هل أنت متأكد من حذف هذه الجهة؟",
        agencyNameLabel: "اسم الجهة:",
        delete: "حذف",
        assignedStandards: "المعايير المخصصة",
        allStandards: "جميع المعايير",
        standards: "معايير",
        noAssignedStandards: "لا توجد معايير مخصصة لهذه الجهة",
        standard: "معيار",
        requirements: "متطلب",
        unassignedStandards: "المعايير غير المخصصة",
        allStandardsAssigned: "جميع المعايير مخصصة لهذه الجهة",
        standardAssigned: "تم تعيين المعيار بنجاح",
        standardUnassigned: "تم إلغاء تعيين المعيار بنجاح",
        fillRequiredFields: "يرجى ملء جميع الحقول المطلوبة",
        agencyUpdated: "تم تحديث بيانات الجهة بنجاح",
        agencyAdded: "تم إضافة الجهة الجديدة بنجاح",
        operationError: "حدث خطأ في العملية",
        agencyDeleted: "تم حذف الجهة بنجاح",
        deleteError: "حدث خطأ في الحذف",
        // Standards Modal Translations
        standardsModalTitle: "معايير الجهة المخصصة",
        agencyInfo: "معلومات الجهة",
        assignedStandardsSection: "المعايير المخصصة",
        assignedStandardsDescription: "المعايير المخصصة حالياً لهذه الجهة",
        allStandardsSection: "جميع المعايير المتاحة",
        allStandardsDescription: "انقر لتعيين معايير لهذه الجهة",
        assigned: "مخصص",
        available: "متاح",
        requirements: "المتطلبات",
        moreRequirements: "متطلبات إضافية",
        allStandardsAssigned: "جميع المعايير مخصصة لهذه الجهة",
        standardAssignedSuccess: "تم تعيين المعيار بنجاح",
        standardUnassignedSuccess: "تم إلغاء تعيين المعيار بنجاح",
        standardToggleError: "فشل في تحديث تعيين المعيار",
      },
      report: {
        title: "تقديم بلاغ",
        subtitle:
          "شاركنا ملاحظاتك وبلاغاتك لتحسين الخدمات في مدينة حريملاء الصحية",
        back: "العودة",
        yourInformation: "معلوماتك الشخصية",
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        emailAddress: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور",
        reportDetails: "تفاصيل البلاغ",
        reportTitle: "عنوان البلاغ",
        reportTitlePlaceholder: "أدخل عنوان البلاغ",
        reportDescription: "وصف البلاغ",
        reportDescriptionPlaceholder:
          "اكتب وصفاً مفصلاً للبلاغ أو المشكلة التي تريد الإبلاغ عنها",
        uploadFiles: "رفع الملفات",
        uploadDescription: "يمكنك رفع الصور أو الفيديوهات لدعم بلاغك (اختياري)",
        dragFiles: "اسحب الملفات هنا أو انقر للرفع",
        supportedFormats:
          "يدعم: JPG, PNG, MP4, MOV (حد أقصى 10 ميجابايت لكل ملف)",
        uploadedFiles: "الملفات المرفوعة:",
        submitReport: "إرسال البلاغ",
        submitting: "جاري الإرسال...",
        reportSubmitted: "تم إرسال البلاغ بنجاح!",
      },
      standardsManagement: {
        title: "إدارة معايير المدينة الصحية",
        subtitle:
          "مراقبة وإدارة المعايير الصحية الـ 80 مع متطلباتها والجهات المسؤولة عنها",
        totalStandards: "إجمالي المعايير",
        approved: "تمت الموافقة",
        pendingApproval: "في انتظار الموافقة",
        rejected: "مرفوض",
        didntSubmit: "لم يتم التقديم",
        searchAndFilters: "البحث والتصفية",
        searchStandards: "البحث في المعايير",
        searchPlaceholder: "ابحث في المعايير أو المتطلبات...",
        responsibleAgency: "الجهة المسؤولة",
        selectAgency: "اختر الجهة",
        allAgencies: "جميع الجهات",
        submissionStatus: "حالة التقديم",
        selectStatus: "اختر الحالة",
        allStatuses: "جميع الحالات",
        healthStandardsTable: "جدول المعايير الصحية",
        standards: "معيار",
        number: "الرقم",
        standard: "المعيار",
        requirements: "المتطلبات",
        responsibleAgencies: "الجهات المسؤولة",
        status: "الحالة",
        submissions: "التقديمات",
        actions: "الإجراءات",
        view: "عرض",
        standardDetails: "تفاصيل المعيار",
        requirementsLabel: "المتطلبات",
        responsibleAgenciesLabel: "الجهات المسؤولة",
        submitted: "تم رفع المعيار",
        notSubmitted: "لم  ترفع المعيار",
        approvedSubmissions: "نسبة المعايير المعتمدة",
        viewDetailedSubmissions: "عرض التقديمات التفصيلية",
      },
      submissionsView: {
        standardNotFound: "المعيار غير موجود",
        standardNotFoundDescription: "المعيار المطلوب غير موجود في النظام",
        backToStandards: "العودة للمعايير",
        viewSubmissions: "عرض التقديمات",
        submissions: "تقديمات",
        standardDetails: "تفاصيل المعيار",
        standardLabel: "معيار",
        responsibleAgencies: "الجهات المسؤولة:",
        submitted: "تم رفع المعيار",
        notSubmitted: "لم ترفع المعيار",
        requirements: "المتطلبات:",
        textFiles: "ملفات نصية",
        pdfFiles: "ملفات PDF",
        images: "صور",
        videos: "فيديوهات",
        totalSubmissions: "إجمالي التقديمات",
        approved: "تمت الموافقة",
        pendingApproval: "في انتظار الموافقة",
        rejected: "مرفوض",
        acceptanceRate: "نسبة القبول",
        submittedMaterials: "التقديمات المقدمة",
        filterByAgency: "تصفية حسب الجهة",
        selectAgency: "اختر الجهة",
        allAgencies: "جميع الجهات",
        all: "الكل",
        text: "نصوص",
        pdf: "ملفات PDF",
        image: "صور",
        video: "فيديوهات",
        noSubmissionsOfThisType: "لا توجد تقديمات من هذا النوع",
        noSubmissionsYet: "لا توجد تقديمات بعد",
        submissionsWillAppearHere: "ستظهر التقديمات هنا",
        view: "عرض",
        approve: "موافقة",
        reject: "رفض",
        browserNotSupportVideo: "متصفحك لا يدعم تشغيل الفيديو",
        pending: "في الانتظار",
        title: "العنوان",
        description: "الوصف",
        notes: "ملاحظات",
        files: "ملفات",
        file: "ملف",
        untitledSubmission: "تقديم بدون عنوان",
        noDescription: "لا يوجد وصف",
        unknownAgency: "جهة غير معروفة",
        noDate: "لا يوجد تاريخ",
        noSubmissionsForAgency: "لا توجد تقديمات لهذه الجهة",
      },
      volunteers: {
        title: "المتطوعين",
        description: "إدارة المتطوعين والمتطوعات",
        searchPlaceholder: "البحث بالاسم أو البريد الإلكتروني أو رقم الهاتف...",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        volunteeredInitiatives: "المبادرات المتطوع فيها",
        joinDate: "تاريخ الانضمام",
        actions: "الإجراءات",
        noInitiatives: "لا توجد مبادرات",
        noSearchResults: "لا توجد نتائج للبحث",
        confirmDelete: "تأكيد الحذف",
        confirmDeleteMessage: "هل أنت متأكد من حذف المتطوع",
        confirmDeleteMessageEnd: "؟ لا يمكن التراجع عن هذا الإجراء.",
        cancel: "إلغاء",
        delete: "حذف",
        removed: "تمت إزالة المتطوع بنجاح",
      },
      initiatives: {
        title: "المبادرات",
        description: "إدارة المبادرات الصحية",
        addInitiative: "إضافة مبادرة جديدة",
        searchPlaceholder: "البحث في المبادرات...",
        statusFilter: "تصفية حسب الحالة",
        allStatuses: "جميع الحالات",
        totalInitiatives: "إجمالي المبادرات",
        completed: "المكتملة",
        active: "النشطة",
        cancelled: "الملغية",
        gatheringVolunteers: "جمع المتطوعين",
        totalVolunteers: "إجمالي المتطوعين",
        maxVolunteers: "الحد الأقصى للمتطوعين",
        initiativeTitle: "عنوان المبادرة",
        description: "الوصف",
        startDate: "تاريخ البداية",
        endDate: "تاريخ النهاية",
        status: "الحالة",
        volunteers: "المتطوعين",
        maxVolunteersLabel: "الحد الأقصى للمتطوعين",
        actions: "الإجراءات",
        view: "عرض",
        edit: "تعديل",
        delete: "حذف",
        noInitiatives: "لا توجد مبادرات",
        noSearchResults: "لا توجد نتائج للبحث",
        confirmDelete: "تأكيد الحذف",
        confirmDeleteMessage: "هل أنت متأكد من حذف المبادرة",
        confirmDeleteMessageEnd: "؟ لا يمكن التراجع عن هذا الإجراء.",
        cancel: "إلغاء",
        save: "حفظ",
        add: "إضافة",
        update: "تحديث",
        viewVolunteers: "عرض المتطوعين",
        volunteersCount: "متطوع",
        of: "من",
        outOf: "من",
        needed: "مطلوب",
        loading: "جاري التحميل...",
        loadError: "فشل في تحميل المبادرات",
        createSuccess: "تم إنشاء المبادرة بنجاح",
        updateSuccess: "تم تحديث المبادرة بنجاح",
        deleteSuccess: "تم حذف المبادرة بنجاح",
      },

      standards: [
        {
          number: 1,
          standard:
            "اختيار ممثلي المجموعة / المتطوعين وتدريبهم على تقييم الاحتياجات وتحديد الأولويات وتحليل البيانات وإعداد المشروع وآليات الرصد والتسجيل والتقارير.",
          requirements: [
            "بيان بأسماء المتطوعين",
            "بيان بالدورات التدريبيه وعددها والتقارير الخاصه بكل دوره",
          ],
        },
        {
          number: 2,
          standard:
            "تم تشكيل لجنة تنسيق المدينة الصحية، وتسجيلها لدى السلطات المحلية باعتبارها منظمة مجتمعية أو منظمة غير حكومية، وتم توجيه الأعضاء بشأن مهامهم ومسؤولياتهم.",
          requirements: [
            "قرار تأسيس لجنة التنسيق و أدوار ومهام أعضائها",
            "بيان الجان فرعية لتنسيق المبادرات الخاصه بالمدينه الصحيه",
          ],
        },
        {
          number: 3,
          standard:
            "ممثلو المجتمع / المتطوعون هم شركاء نشطين في مجال الصحة المحلية والتخطيط والإجراءات الاجتماعية مع ضمان استخدام الرعاية الصحية الأخرى في الخدمات الاجتماعية في المجموعات الخاصة بهم.",
          requirements: [
            "ما يفيد بآليات التواصل مع المتطوعين",
            "تقارير الأنشطه التي قاموا بها في المجالات المختلفه",
          ],
        },
        {
          number: 4,
          standard:
            "إشراف مراقبو لجنة تنسيق المدينة الصحية على المشاريع الاجتماعية والاقتصادية، وسجلات الإنجازات والمُعوقات ويحددون الحلول المحلية للمشكلات المحلية.",
          requirements: [
            "بيان بالخطط التشغيلية من قبل المنسقين من مختلف القطاعات",
            "تقارير الرصد والتقارير الدوريه",
          ],
        },
        {
          number: 5,
          standard:
            "ه تبحث لجنة تنسيق المدينة الصحية عن الموارد وتبني علاقات مع الشركاء المحتملين لمزيد من التنمية في مناطقهم المحلية.",
          requirements: [
            "بيان بالشركاء المحليين",
            "الاتفاقيات المختلفه. مع الشركاء",
          ],
        },
        {
          number: 6,
          standard:
            "تم إنشاء أو التخطيط لمركز اجتماعي أو لاستخدامات مختلفة وفقاً لاحتياجات المجتمع وإجراء التدريب على سبيل المثال: عقد زيارات ميدانيه، تقديمه بمثابة مركز معلومات للمجتمع أو عقد الفعاليات المحلية الثقافية والوطنية والدينية ... الخ).",
          requirements: [
            "معلومات عن المركز المجتمعي وامكانياته",
            "زيارات ميدانيه",
          ],
        },
        {
          number: 7,
          standard:
            "تم وضع وتسجيل المرأة والمجموعات الشبابية كمساهمون في تدابير التنمية المحلية.",
          requirements: [
            "بيان بجماعات المرأه والمجموعات الشبابية المساهمه في أنشطه المدينه الصحيه",
            "تقارير الأنشطه التي تم المشاركه فيها أو تنفيذها",
          ],
        },
        {
          number: 8,
          standard:
            "تم ترشيح أعضاء لجنة تنسيق المدينة الصحية رسمياً من قبل مختلف القطاعات ذات الصلة بالمعايير.",
          requirements: ["بيان بالمنسقين رسمياً من مختلف القطاعات"],
        },
        {
          number: 9,
          standard:
            "تم تشكيل لجنة تنسيق المدينة الصحية تحت قيادة رئيس بلدية أو محافظ، وتضع أعضاءها من ممثلي جميع القطاعات ذات الصلة. ويتم تسجيل محاضر جميع الاجتماعات وإعداد تقارير بها.",
          requirements: [
            "صياغة عضوية اللجنة العليا من قبل جميع مديري القطاعات المختلفة",
          ],
        },
        {
          number: 10,
          standard:
            "تم تعيين منسق رسمي لبرنامج المدينة الصحية وتوفير عدد كاف من الموظفين والحيز المادي والمرافق.",
          requirements: [
            "قرار تعيين منسق برنامج المدينة الصحية",
            "زياره مكتب التنسيق للإطلاع علي المكتب وتجهيزاته",
          ],
        },
        {
          number: 11,
          standard:
            "يجتمع أعضاء فريق القطاعات المشتركة مع لجنة تنسيق المدينة الصحية وتقديم المشورة الفنية والدعم للمجتمع.",
          requirements: ["تقارير الاجتماعات"],
        },
        {
          number: 12,
          standard:
            "تم تحديد الشركاء المحتملين والاتصال بهم ويجري العمل على مشروع مشترك واحد على الأقل مع الشركاء في موقع تنفيذ المدينة الصحية.",
          requirements: [
            "بيان بشركاء برنامج المدينة الصحية",
            "بيان بالبرامج المختلفه التي تم تنفيذها من قبل الشركاء في إطار برنامج المدينه الصحيه",
          ],
        },
        {
          number: 13,
          standard:
            "تم تسجل القضايا المالية المتعلقة بأنشطة مشتركة وإعداد تقارير عنها ومشاركتها مع المجتمع من أجل الشفافية.",
          requirements: [
            "بيان تعيين منسق مالي لمتابعة جميع الإجراءات المالية ذات الصلة بالمكتب التنفيذي.",
          ],
        },
        {
          number: 14,
          standard:
            "تم توثيق قصص النجاح ونشرها واستخدامها من أجل وضع استراتيجية وأدوات شاملة للدعوة مع الأخذ بعين الاعتبار للثقافة المحلية ويجري تنفيذها من قبل لجنة تنمية المجتمع المحلي.",
          requirements: ["بيان بقصص النجاح", "خطه الدعاية والإعلان"],
        },
        {
          number: 15,
          standard:
            "تم تحديد ذوي الاحتياج في المجتمع وفقاً لمعايير محددة وافق عليها فريق تنسيق المدينة وتعطى الأولوية لهم في توفير القروض المدرة للدخل.",
          requirements: [
            "بيان بذوي الاحتياج الذين يمكن أن يستفيدوا من الدعم المالي",
            "بيان بما تم عمله لدعم محدودي الدخل",
          ],
        },
        {
          number: 16,
          standard:
            "تم عمل روابط بين المهارات المحلية ومراكز التدريب المهني وأنشطة القروض الصغيرة وضمان أن المنطقة تتجه نحو الاكتفاء الذاتي.",
          requirements: [
            "بيان بالبرامج التدريبية وأنشطه القروض الصغيره",
            "بيان بقصص النجاح وبناء الشراكات",
            "زيارات ميدانيه",
          ],
        },
        {
          number: 17,
          standard:
            "تم تسجيل جميع القضايا المالية ومتابعتها من قبل أمين الشؤون المالية في لجنة تنسيق المدينة الصحية.",
          requirements: [
            "سجلات القضايا المالية لتوضيح المتابعه من قبل المنسق المالي للجنة المدينة الصحية.",
          ],
        },
        {
          number: 18,
          standard:
            "تم تسديد القروض على أساس منتظم، وتم وضع آلية متابعة من قبل لجنة تنسيق المدينة الصحية أو النظام المصرفي المحلي في المكان.",
          requirements: ["بيان بآليات المتابعه"],
        },
        {
          number: 19,
          standard:
            "تم فتح حساب مصرفي للجنة تنسيق المدينة الصحية أو مكتب البرنامج وتذهب جميع التفاعلات المالية المتعلقة بالقروض الصغيرة من خلال البنوك ذات الصلة. منسق البرنامج والمجتمع يدركون ذلك جيداً.",
          requirements: [
            "بيانات الحساب المصرفي لمكتب تنسيق برنامج المدينة الصحية وشفاف لكافة اللجان.",
            "الاتفاقيات التي تم التوقيع عليها مع بعض الشركات التجارية لرعاية ودعم المشاريع (إن وجد)",
          ],
        },
        {
          number: 20,
          standard:
            "يتم أخذ ٥ - ١٠ رسوم خدمة من كل قرض مدر للدخل ويتم تحصيلها في حساب منفصل لاستخدامها في أنشطة التنمية الاجتماعية (أي؛ صناديق التنمية الاجتماعية).",
          requirements: ["بيان بما يفيد (إن وجد)"],
        },
        {
          number: 21,
          standard:
            "يضمن ممثلو المجتمع الإيداع لأقساط شهرية في الوقت المناسب من المستفيدين ضمن مجموعاتهم الخاصة والإبقاء على المال المسدد متجدد للأنشطة المستقبلية.",
          requirements: ["بيان بما يفيد (إن وجد)"],
        },
        {
          number: 22,
          standard:
            "يلتحق جميع الأطفال المستحقين (بنات وبنين) في المدرسة ولم ينقطع أي طالب",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 23,
          standard:
            "يقوم مديرو المدارس بعقد اجتماعات دورية مع لجان التنمية المجتمعية المحلية والآباء وغيرهم من أصحاب المصلحة لتقييم نوعية التعليم والبيئة المدرسية والحالة الصحية للأطفال والعلاقات بين الآباء والأطفال والمعلمين من أجل التغلب على أوجه القصور أو المشاكل القائمة.",
          requirements: [
            "محاضر الاجتماعات مع قادة المجتمع المحلي وأولياء الأمور",
            "بيان بالاحتياجات والمشاكل الرئيسية المتعلقة بالتعليم والمدارس وما تم عمله من تدخلات ومبادرات",
          ],
        },
        {
          number: 24,
          standard:
            "معايير جودة التعليم في مكانها الصحيح في المدارس الواقعة في مواقع البرنامج.",
          requirements: [
            "بيان بمعايير الجودة المتعلقة بالتعليم في المدارس في أنحاء المدينه",
            "بيان بهيئات الاعتماد والمدارس الحاصلة علي الاعتماد في مواقع تنفيذ برنامج المدينة الصحية",
          ],
        },
        {
          number: 25,
          standard:
            "تم تشكيل لجنة فرعية للتعليم في إطار لجنة تنمية المجتمع ويتم مراقبة المدارس بانتظام. تنسق اللجنة الفرعية مع إدارة التعليم المحلية.",
          requirements: [
            "زيارات ميدانيه",
            "قرار تشكيل اللجنة وما تم عمله",
            "محاضر الاجتماعات مع مكتب تنسيق برنامج المدينة الصحية.",
          ],
        },
        {
          number: 26,
          standard:
            "تم تشجيع فئات الشباب والنساء ليكونوا أعضاء فاعلين في حملة محو الأمية على أساس تطوعي.",
          requirements: ["ما يفيد التنفيذ", "زيارات ميدانيه"],
        },
        {
          number: 27,
          standard:
            "تم تدريب ممثلي المجتمع ومتطوعي الصحة على المسائل الصحية ذات الأولوية والبرامج ذات الصلة بالصحة. وهم ينشطون في مجال تعزيز الصحة والتعليم ويتابعون الإجراءات من خلال اتصال منتظم مع مزودي الرعاية الصحية المحلية.",
          requirements: [
            "بيان ببرامج التدريب المستمرة للعاملين في مجال الصحة",
            "تقارير التنفيذ",
          ],
        },
        {
          number: 28,
          standard:
            "يعمل ممثلو المجتمع ومتطوعو الصحة على تسجيل والإبلاغ عن المواليد والوفيات والإحصاءات الحيوية الأخرى.",
          requirements: [
            "تفاصيل نظام تسجيل والإبلاغ عن المواليد والوفيات والإحصاءات الحيوية.",
          ],
        },
        {
          number: 29,
          standard:
            "أنشأت لجنة تنسيق المدينة الصحية، بالتعاون مع مزودي خدمات الرعاية الصحية، نظم الإحالة المستدامة.",
          requirements: [
            "تفاصيل نظام الإحالة في القطاع العام وبين القطاعين العام والخاص.",
          ],
        },
        {
          number: 30,
          standard:
            "يتم تدريب المجتمع بصورة نشطة في مشاريع البحوث وإشراكه القائمة على المشاركة المجتمعية.",
          requirements: ["تفاصيل إجراء البحوث المجتمعية المشتركة ونتائجها"],
        },
        {
          number: 31,
          standard:
            "تم تشكيل لجنة فرعية تابعة للجنة تنسيق المدينة الصحية لإدارة والإشراف على خدمات الرعاية الصحية المحلية.",
          requirements: [
            "قرار تشكيل اللجنة الفرعية التابعة للجنة تنسيق المدينة الصحية لإدارة والإشراف على خدمات الرعاية الصحية المحلية",
          ],
        },
        {
          number: 32,
          standard:
            "تتوفر جميع الأدوية الأساسية واللقاحات والأدوات الطبية (حسب احتياجات النظام الصحي المحلي) في المرافق الصحية بالمناطق الحضرية.",
          requirements: [
            "تفاصيل النظام وآلية تتفيذه لضمان توافر الأدوية الأساسية واللقاحات على أساس مستمر.",
          ],
        },
        {
          number: 33,
          standard:
            "يتم تقييم جودة خدمات الرعاية الصحية، ورضا العملاء بالخدمات الصحية، ومستوى تدريب موظفي الرعاية الصحية، والتفاعلات بين مزودي الرعاية الصحية والمجتمع واتخاذ الإجراءات وفقاً لذلك.",
          requirements: [
            "معايير جوده خدمات الرعايه الصحيه",
            "بيان بأنشطه عمليات المسح الدورية لقياس الجودة ورضا العملاء.",
            "زيارات ميدانيه",
          ],
        },
        {
          number: 34,
          standard:
            "تتلقى جميع النساء الحوامل الرعاية قبل الولادة في الوقت المناسب (بما في ذلك لقاحات الكزاز). وقد تم إعداد خطة الولادة الآمنة لجميع النساء الحوامل في المرحلة الثالثة من الحمل وتصل جميع النساء إلى ولادة آمنة ونظيفة حيث يتم ذلك بمساعدة قابلات ماهرات.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 35,
          standard:
            "تتلقى جميع الأمهات رعاية ما بعد الولادة لمدة ٤٠ يوماً على الأقل بعد الولادة.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 36,
          standard:
            "تم تحصين جميع الأطفال تماماً ضد الأمراض التي يمكن الوقاية منها باللقاحات بعمر سنة واحدة.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 37,
          standard:
            "تم تسجيل جميع الأطفال حديثي الولادة من قبل ممثلي المجتمع ومتطوعي الصحة وتم تلقيحهم عند الولادة وخلال السنة الأولى من الحياة وفقاً لجدول برنامج التحصين الوطني الموسع (برنامج التحصين الموسع).",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 38,
          standard:
            "لجنة تنسيق المدينة الصحية وممثلو المجتمع ومتطوعو الصحة يشاركون بنشاط في حملات شلل الأطفال في حال تم إجراء أي منها.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 39,
          standard:
            "لجميع الأطفال تحت سن 5 سنوات حق الحصول على خدمات الرعاية الصحية المنتظمة (بما في ذلك مراقبة النمو ونظام متابعة الأداء في المكان.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 40,
          standard:
            "تم تحديد الأطفال المصابين بسوء التغذية والأمهات اللاتي يعانين من نقص فيتامين ألف وأنيميا نقص الحديد وتلقي العلاج والمتابعة والرعاية.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 41,
          standard:
            "ويجري تنفيذ استراتيجية المعالجة قصيرة الأمد لمرض السل باستخدام ممثلي المجتمع المدربين أو المتطوعين كشركاء في العلاج.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 42,
          standard:
            "يجري تنفيذ برنامج مكافحة الملاريا إذا لزم الأمر بمشاركة نشطة من ممثلي المجتمع أو المتطوعين وقيادة لجان تنمية المجتمع المحلي.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 43,
          standard:
            "يقوم ممثلو المجتمع ومتطوعو الصحة بالإبلاغ عن جميع الحالات السل والملاريا المشتبه فيها وفيروس نقص المناعة البشرية وغيره من الأمراض المعدية إلى أقرب مرفق صحي وتنفيذ أنشطة المتابعة وفقاً للتدريب الذي تلقوه من العاملين في المرافق الصحية وضمان أن يشارك أفراد الأسرة في الأنشطة البدنية الصحية الأسبوعية.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 44,
          standard:
            "تم إبالغ المجتمعات حول طرق انتقال فيروس نقص المناعة البشرية / اإليدز وتدابير الوقاية منها. ويتم دعم جميع الحاالت التي تم تشخيصها من فيروس نقص المناعة البشرية / اإليدز من قبل ممثلي المجتمع ومتطوعي الصحية.",
          requirements: ["بيان بأنشطه التوعيه"],
        },
        {
          number: 45,
          standard:
            "يتم تحديد جميع المرضى من ذوي األمراض المزمنة (مثل المصابين بداء السكري وارتفاع ضغط الدم وأمراض القلب واألوعية الدموية والسرطان واضطرابات الكلى ... الخ)، وتم وضع خطة لمتابعتهم في مكان ممثلي المجتمع ومتطوعي الصحة، الذين يضمنون بأن يتلقى جميع األفراد الفحوصات الطبية والدواء في الوقت المناسب.",
          requirements: [
            "تفاصيل برنامج الفحص للكشف المبكر عن األمراض غير المعدية",
            "تفاصيل برامج الرعاية الصحية لكبار السن",
          ],
        },
        {
          number: 46,
          standard:
            "تم تحديد جميع حاالت االضطرابات النفسية وتعاطي مواد اإلدمان وتلقي الدعم والمساعدة من المجتمع. وتم تنفيذ األنشطة التعليمية في المجتمع للحد من وصمة العار.",
          requirements: [
            "بيان بما يفيد مثل الخط الساخن لتقديم المساعدة الالزمة وإحالة قضايا تعاطي المخدرات.",
            "الرعاية االجتماعية للحد من االدمان",
          ],
        },
        {
          number: 47,
          standard:
            "تم تحديد كافة األشخاص من ذوي اإلعاقات الجسدية وتلقي الدعم المجتمعي لضمان قدرتهم على كسب العيش.",
          requirements: [
            "بيان تلقي الدعم لذوي اإلعاقة العقلية والبدنية",
            "أنشطه التدريب المهني ة توفير فرص العمل ذات الصلة لهم.",
          ],
        },
        {
          number: 48,
          standard:
            "تم تحديد المناطق الخطرة في مواقع البرنامج وتم اتخاذ اإلجراءات / التدابير المناسبة للحد من الوفيات واإلصابات واإلعاقات الناجمة عن الحوادث.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 49,
          standard:
            "منطقة تنفيذ البرنامج خالية من الجريمة والعنف والتمييز ضد النساء والرجال والمجموعات العرقية.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 50,
          standard:
            "يتبنى المجتمع ويعزز تنمية الطفولة المبكرة والدور والمجتمعات الصديقة للطفل.",
          requirements: [
            "بيان بالمبادرات واألنشطة في هذا الصدد والمبادرات والبرامج المختلفة من قبل الشؤون االجتماعية.",
          ],
        },
        {
          number: 51,
          standard:
            "العمل على مبادرة المدرسة الصحية في جميع المدارس بمواقع تنفيذ البرنامج.",
          requirements: [
            "خطة السنوية من قبل دائرة الصحة المدرسية في وزارة الصحة.",
            "برامج توفير األطعمة الصحية مع حساب السعرات الحرارية في مقاصف المدارس.",
            "برامج الصحه المدرسيه",
            "زيارات ميدانيه",
          ],
        },
        {
          number: 52,
          standard:
            "إجراءات الصحة والسالمة المهنية (وخاصة الوقاية من الحوادث) هي المعمول بها في جميع أماكن العمل وتسهيل وتسريع وصول العمال إلى معدات وخدمات اإلسعافات األولية.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 53,
          standard:
            "موقع تنفيذ البرنامج نظيف وفيه ما يكفي من المساحات الخضراء.",
          requirements: ["زيارات ميدانيه"],
        },
        {
          number: 54,
          standard:
            "تم وضع نظام فعال إلدارة النفايات الصلبة على مستوى المجتمع في موقع تنفيذ البرنامج.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 55,
          standard:
            "تم تعيين وحماية مصادر المياه. تم وضع خطة لمعالجة المياه، ولجنة تنسيق المدينة الصحية على علم بذلك.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 56,
          standard:
            "تحصل جميع األسر على وصول مستدام إلى مياه شرب آمنة وخدمات صرف صحي أساسية. وهم يدركون المخاطر المرتبطة بالمياه غير اآلمنة ومعرفة كيفية تنقية المياه باستخدام ما هو متاح محلياً.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 57,
          standard:
            "تم تدريب ممثلي المجتمع / المتطوعين في الحفاظ على أوضاع بيئية / صحية سليمة والتدابير ذات الصلة في متناول الجمهور مثل أماكن السوق الصحية والمستشفيات الصحية، والمدارس الصحية ... الخ.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه للمبادرات ذات الصله"],
        },
        {
          number: 58,
          standard:
            "يشارك المجتمع في مجال سالمة األغذية وتتم مراقبة جميع محالت/أسواق األغذية الصحية من قبل دوائر وطنية للسالمة الغذائية.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه للمبادرات ذات الصله"],
        },
        {
          number: 59,
          standard:
            "أسواق الغذاء الصحي سهلة الوصول لبيع المنتجات األساسية مثل الملح المعالج باليود.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 60,
          standard:
            "يحظر التدخين في األماكن المغلقة واألماكن العامة، وقد تم وضع واعتماد إنشاء مدينة خالية من التدخين.",
          requirements: [
            "بيان بقرارات/سياسات عدم التدخين في األماكن العامة وتحديد االنتهاكات.",
            "بيان بآليات التنفيذ واألنشطه ذات الصله",
            "زيارات ميدانيه",
          ],
        },
        {
          number: 61,
          standard:
            "تم تأسيس مركز إلدارة نوعية على األساس المجتمعي في موقع تنفيذ برنامج المدينة الصحية (يشمل البلدية) لضمان أن يتم الرصد المنظم لتلوث الهواء. يدرك المجتمع مخاطر تلوث الهواء.",
          requirements: ["خطة رصد تلوث الهواء", "بيان باألنشطه ذات الصله"],
        },
        {
          number: 62,
          standard: "يقوم مخططو المدن بتنفيذ التدابير التي تمنع تلوث الهواء.",
          requirements: ["بيان بالقرارات الداعمه"],
        },
        {
          number: 63,
          standard:
            "يجري تقييم ألثر مخططات تقسيم المناطق الحضرية واإلسكان على تلوث الهواء قبل اعتمادها. تضم مشاريع اإلسكان هذه، على سبيل المثال، وصول األسر إلى وقود نظيف وتهوية وتحسين مواقد المطبخ وأجهزة التدفئة.",
          requirements: ["بيان بالقرارات الداعمه"],
        },
        {
          number: 64,
          standard:
            "تم إنشاء مركز المعلومات المجتمعية ويتم تدريب ممثلي المجتمع/المتطوعين وأعضاء الفريق المشترك بين القطاعات لجمع المعلومات األساسية وتحليلها واستخدامها لتخطيط التنمية المحلية.",
          requirements: [
            "بيان بالمركز المسئول عن اإلحصاء والمعلومات",
            "آليه جمع البيانات والتحليل والنشر الستخدامها في التخطيط على المستوى المحلي.",
          ],
        },
        {
          number: 65,
          standard:
            "يتم عرض المعلومات الرئيسية في مركز المعلومات المجتمعية أو المكتب المحلي لبرنامج المدينة الصحية ومشاركتها مع المجتمع والقطاعات/ الشركاء اآلخرين المعنيين.",
          requirements: [
            "آليه توزيع البيانات لإلستفاده منها في التخطيط ودعم القرار بالقطاعات المختلفة.",
          ],
        },
        {
          number: 66,
          standard:
            "تم استخدام المعلومات األساسية ألغراض الدعوة والرصد من قبل لجنة تنمية المجتمع المحلي وأصحاب المصلحة اآلخرين.",
          requirements: [
            "آليه التواصل بين المركز ومختلف القطاعات لتبادل اإلحصاءات الالزمة لمشاريع التنمية.",
          ],
        },
        {
          number: 67,
          standard:
            "أشكال ونتائج المسح األساسي والمعلومات بشأن المشاريع الحالية موثقة توثيقا ً جيداً حتى اآلن ومتوفرة لدى لجنة تنمية المجتمع المحلي ومركز تنسيق المدينة الصحية.",
          requirements: ["التقارير ذات الصلة"],
        },
        {
          number: 68,
          standard:
            "تم إنشاء ملف تعريف للمدينة، ويتم تحديثه واستخدامه بانتظام ألغراض التخطيط والرصد.",
          requirements: ["صوره من الملف التعريفي للمدينه"],
        },
        {
          number: 69,
          standard:
            "تم تقييم المهارات المحلية، والمصالح والتكنولوجيات المناسبة وتعزيزها.",
          requirements: ["التقارير ذات الصله."],
        },
        {
          number: 70,
          standard:
            "أنشئت مراكز للتدريب على المهارات المرتبطة بالسوق المحلية للذكور واإلناث، واعتمادها من قبل فرق مشترك بين القطاعات.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 71,
          standard:
            "لجنة تنسيق المدينة الصحية تعطي األولوية لتوفير قروض صغيرة لطالب مراكز التدريب المهني.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 72,
          standard:
            "مراكز التدريب المهني قائمة على التمويل الذاتي واإلدارة الذاتية من قبل المجتمع أو المنظمات المحلية غير الحكومية.",
          requirements: ["بيان بما يفيد"],
        },
        {
          number: 73,
          standard:
            "أنشئت مراكز للتدريب على الحاسوب ودروس اللغة والمرافق الرياضية، وغيرها، يتم إدارتها ذاتيا من قبل المجتمع والمنظمات المحلية غير الحكومية.",
          requirements: ["بيان بما يفيد", "زيارات ميدانيه"],
        },
        {
          number: 74,
          standard: "تم تحديد الناس المبتكرين ودعمهم وتشجيعهم.",
          requirements: ["بيان بقصص النجاح"],
        },
        {
          number: 75,
          standard:
            "تم تحديد حاالت الطوارئ المعروفة التي وقعت في السنوات الـ 20 الماضية وتم توثيق عدد الضحايا والبنية التحتية المحلية التي تضررت.",
          requirements: ["ملفات التوثيق"],
        },
        {
          number: 76,
          standard:
            "تشكلت لجنة فرعية للتأهب لحاالت الطوارئ واالستجابة لها، وتم توجيهها وتم تعيين مهام األعضاء.",
          requirements: ["بيان بتشكيل اللجنة وعضويتها"],
        },
        {
          number: 77,
          standard:
            "تم تطوير ملف تعريف للمدينة وتم االحتفاظ بنسخة من هذا الملف خارج منطقة تنفيذ البرنامج.",
          requirements: ["الملف المطور"],
        },
        {
          number: 78,
          standard:
            "تم تدريب ممثلي المجتمع ومتطوعي الصحة على خطط التأهب لحاالت الطوارئ، وكيفية التعامل مع حاالت الطوارئ وتقديم اإلسعافات األولية متى وأينما طلب.",
          requirements: ["تقارير الدورات التدريبيه"],
        },
        {
          number: 79,
          standard:
            "تم إعداد خطة طوارئ ومشاركتها مع السلطات المحلية المختصة لتعبئة الموارد والعمل الالزم. المجتمع على علم بخطة الطوارئ، وماذا يفعل، ومن منهم يقدم التقارير ومن وماذا يفعل أثناء حالة الطوارئ.",
          requirements: ["بيان بالخطة التفصيليه"],
        },
        {
          number: 80,
          standard:
            "تم تحديد الفئات المستضعفة (مثل النساء الحوامل واألشخاص الذين يعانون من إعاقات جسدية والمرضى المزمنين والذين يعانون من سوء التغذية والمسنين واألشخاص الذين يعانون من اضطرابات عقلية، الخ) وتمت مشاركة معلومات الطوارئ هذه مع السلطات المختصة مسبقاً.",
          requirements: ["نسخه من البيانات"],
        },
      ],
    },

    en: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        aboutHuraymila: "About Huraymila",
        initiatives: "Initiatives",
        news: "News",
        successStories: "Success Stories",
        faq: "FAQ",
        contact: "Contact",
        dashboard: "Dashboard",
        signOut: "Sign Out",
        signInSignUp: "Sign In / Sign Up",
        nationalInitiative: "National Initiative",
        healthyCity: "Huraymila Healthy City",
      },

      // Common
      common: {
        loading: "Loading...",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        all: "All",
        newest: "Newest",
        oldest: "Oldest",
        mostViewed: "Most Viewed",
        mostLiked: "Most Liked",
        mostVolunteers: "Most Volunteers",
        mostProgress: "Most Progress",
        viewDetails: "View Details",
        readMore: "Read More",
        backToHome: "Back to Home",
        discoverMore: "Discover More",
        joinUs: "Join Us",
        featured: "Featured",
        active: "Active",
        completed: "Completed",
        cancelled: "Cancelled",
        gatheringVolunteers: "Gathering Volunteers",
        noResults: "No Results Found",
        tryDifferentSearch:
          "Try searching with different keywords or changing the filters",
        showing: "Showing",
        of: "of",
        initiatives: "initiatives",
        articles: "articles",
        volunteers: "volunteers",
        volunteersNeeded: "volunteers needed",
        min: "min",
        views: "views",
        likes: "likes",
        shares: "shares",
        comments: "comments",
        sendMessage: "Send Message",
        sending: "Sending...",
        messageSent:
          "Your message has been sent successfully! We'll contact you soon",
        errorSending: "An error occurred while sending the message",
        fillRequiredFields: "Please fill in all required fields",
      },

      // Home Page
      home: {
        title: "Huraymila Healthy City",
        subtitle:
          "National initiative to promote public health and improve quality of life",
        description:
          "We work together to build a healthy and sustainable city through community initiatives and strategic partnerships with government agencies and health institutions.",
        healthInitiatives: "Health Initiatives",
        activeVolunteers: "Active Volunteers",
        environmentalProjects: "Environmental Projects",
        partnerOrganizations: "Partner Organizations",
        joinUs: "Join Us",
      },

      // About Section
      about: {
        title: "About Huraymila Healthy City Program",
        subtitle:
          "Leading national initiative within the Saudi Healthy Cities Program",
        description:
          "The Huraymila Healthy City Program is an ambitious national initiative aimed at transforming Huraymila Governorate into an advanced model for healthy cities in Saudi Arabia, through applying the latest international standards and best practices in community health and sustainable development.",
        vision: {
          title: "Our Vision",
          description:
            "To make Huraymila a model healthy city that achieves the highest standards of quality of life for its residents and visitors, and contributes to achieving Saudi Vision 2030.",
        },
        mission: {
          title: "Our Mission",
          description:
            "To develop and implement innovative and sustainable health initiatives that enhance community health and well-being through effective partnership between government, private, and civil society sectors.",
        },
        objectives: {
          title: "Our Strategic Objectives",
          list: [
            "Improve health indicators in the governorate by 30% within 3 years",
            "Increase green spaces in the city to 40% of total area",
            "Educate 80% of city residents about health and environmental culture",
            "Develop 20 new health initiatives annually",
            "Establish a network of local and international partners",
            "Achieve environmental sustainability in all our projects",
            "Develop specialized training programs for healthcare workers",
            "Create an integrated system for monitoring and evaluating health initiatives",
          ],
        },
        stats: {
          founded: "Founded",
          healthInitiatives: "Health Initiatives",
          beneficiaries: "Beneficiaries",
          partnerOrganizations: "Partner Organizations",
        },
        features: {
          title: "Key Features",
          healthInitiatives: "Health Initiatives",
          healthInitiativesDesc:
            "Comprehensive programs to promote public health",
          communityPartnership: "Community Partnership",
          communityPartnershipDesc:
            "Effective cooperation with all community segments",
          environmentalSustainability: "Environmental Sustainability",
          environmentalSustainabilityDesc:
            "Protecting the environment for future generations",
          innovation: "Innovation & Development",
          innovationDesc: "Using the latest technologies and methods",
        },
        discoverMore: "Discover More",
        stats: {
          title: "Statistics",
        },
      },

      // About Huraymila
      aboutHuraymila: {
        title: "About Huraymila Governorate",
        subtitle: "The Jewel of Riyadh Region",
        description:
          "Huraymila Governorate is located in Riyadh region, 86 km northwest of Riyadh city. It is distinguished by its strategic location, rich heritage, and is known for agriculture and historical sites.",
        history: {
          title: "History & Heritage",
          description:
            "Huraymila boasts a rich history spanning centuries, having been an important stop on ancient trade routes. It is renowned for its traditional architectural heritage and archaeological sites that reflect the region's antiquity.",
        },
        geography: {
          title: "Geographic Location",
          description:
            "Located in Riyadh region at an elevation of 650 meters above sea level, Huraymila is characterized by its moderate climate and picturesque nature that combines mountains and green plains.",
        },
        economy: {
          title: "Economy & Development",
          description:
            "Huraymila relies on agriculture as a fundamental pillar of the local economy, in addition to heritage tourism and modern industrial development that contribute to driving development forward.",
        },
        culture: {
          title: "Culture & Society",
          description:
            "Huraymila's community is distinguished by strong social cohesion and preservation of authentic customs and traditions, while being open to modern developments in various fields.",
        },
        features: {
          scenicNature: "Scenic Nature",
          scenicNatureDesc:
            "Mountains and plains distinguished by their natural beauty",
          moderateClimate: "Moderate Climate",
          moderateClimateDesc: "Moderate desert climate throughout the year",
          thrivingAgriculture: "Wild Honey Production",
          thrivingAgricultureDesc:
            "High-quality wild honey production from local beehives",
          continuousDevelopment: "Continuous Development",
          continuousDevelopmentDesc:
            "Modern and sustainable development projects",
        },
        stats: {
          population: "Population",
          founded: "Founded",
          elevation: "Elevation",
          area: "Area",
          populationDensity: "Population Density",
          saudis: "Saudis",
          nonSaudis: "Non-Saudis",
          households: "Households (2010)",
          dialingCode: "Dialing Code",
          coordinates: "Coordinates",
          populationValue: "15,000 people",
          foundedValue: "1400 AH",
          elevationValue: "650 m",
          areaValue: "1,480 km²",
          populationDensityValue: "15 people/km²",
          saudisValue: "8,772 (58.48%)",
          nonSaudisValue: "6,228 (41.52%)",
          householdsValue: "3,617 households",
          dialingCodeValue: "011",
          coordinatesValue: "25°07′01″N 46°06′01″E",
        },
        keyFeatures: "Key Features",
        statistics: "Statistics",
      },

      // Initiatives
      initiatives: {
        title: "Health Initiatives",
        subtitle: "Discover Active Initiatives in Huraymila Healthy City",
        searchPlaceholder: "Search initiatives...",
        category: "Category",
        status: "Status",
        health: "Health",
        environment: "Environment",
        education: "Education",
        community: "Community",
        location: "Location",
        startDate: "Start Date",
        volunteers: "Volunteers",
        progress: "Progress",
        healthAwareness: "Health Awareness Program",
        healthAwarenessDesc:
          "Comprehensive program for awareness of preventive health and proper nutrition",
        urbanGreening: "Urban Greening Project",
        urbanGreeningDesc:
          "Initiative to increase green spaces in the city and improve air quality",
        healthyWalking: "Healthy Walking Initiative",
        healthyWalkingDesc: "Weekly healthy walking program in city parks",
        schoolNutrition: "School Nutrition Program",
        schoolNutritionDesc:
          "Improving nutrition in schools and educating students about the importance of healthy food",
        recyclingProject: "Recycling Project",
        recyclingProjectDesc:
          "Comprehensive program for waste recycling and reducing environmental pollution",
        vaccinationCampaign: "Community Vaccination Campaign",
        vaccinationCampaignDesc:
          "Comprehensive vaccination campaign for all community segments against infectious diseases",
        cityHealthCenter: "City Health Center",
        throughoutCity: "Throughout the City",
        cityPark: "City Park",
        huraymilaSchools: "Huraymila Schools",
        allNeighborhoods: "All Neighborhoods",
        healthCenters: "Health Centers",
      },

      // Partners Section
      partnersSection: {
        title: "Community Integration Network",
        subtitle:
          "Each organization provides services to the community while benefiting from citizen data and feedback to improve performance",
        centerEntity: {
          name: "Community & Volunteers",
          description: "The foundation of all initiatives",
          stats: "500+ active volunteers",
          organizations: "17 Organizations",
        },
        stats: {
          partnerOrganizations: "Partner Organizations",
          integratedInitiatives: "Integrated Initiatives",
          activeVolunteers: "Active Volunteers",
          communitySatisfaction: "Community Satisfaction",
        },
      },

      // Success Partners
      successPartners: {
        title: "Our Partners in Success",
        partners: {
          ministryOfHealth: "Ministry of Health",
          ministryOfEducation: "Ministry of Education",
          ministryOfEnvironment:
            "Ministry of Environment, Water and Agriculture",
          ministryOfHumanResources:
            "Ministry of Human Resources and Social Development",
          huraymilaHospital: "Huraymila General Hospital",
          civilDefense: "Saudi Civil Defense",
          nationalWaterCompany: "National Water Company",
          huraymilaGovernorate: "Huraymila Governorate Interior",
          riyadhMunicipality: "Riyadh Municipality",
          environmentalSecurity: "Special Forces for Environmental Security",
          police: "Police",
          trafficDepartment: "Traffic Department",
          charityAssociation: "Huraymila Charity Association",
          developmentAssociation: "Huraymila Community Development Association",
          imamUniversity: "Imam Muhammad bin Saud Islamic University",
          who: "World Health Organization",
          friendsOfPatients: "Huraymila Friends of Patients Association",
        },
      },

      // Initiatives Section
      initiativesSection: {
        title: "Health Initiatives",
        subtitle: "Discover Active Initiatives in Huraymila Healthy City",
        description:
          "We offer a variety of health initiatives aimed at promoting public health and improving quality of life in the community.",
        viewAll: "View All Initiatives",
        categories: {
          health: "Health",
          environment: "Environment",
          community: "Community",
          education: "Education",
        },
        status: {
          active: "Active",
          completed: "Completed",
          planning: "Planning",
        },
        details: {
          of: "of",
          participants: "participants",
          participantsNeeded: "participants needed",
          startDate: "Start Date",
          endDate: "End Date",
          location: "Location",
          participantsLabel: "Participants",
          viewDetails: "View Details",
        },
      },

      // Quick Links Section
      quickLinksSection: {
        title: "Quick Links",
        subtitle: "Quick access to important services",
        links: {
          submitReport: "Submit Report",
          volunteerInInitiatives: "Volunteer in Initiatives",
          login: "Login",
        },
        getStarted: "Get Started",
      },

      // Health Dashboard
      healthDashboard: {
        title: "Health Indicators Dashboard",
        subtitle: "Real-time quality of life indicators in Huraymila",
        lastUpdate: "Last Update",
        excellent: "Excellent",
        target: "Target",
        indicators: {
          airQuality: {
            title: "Air Quality",
            status: "Good",
            description: "PM2.5: 12 μg/m³",
            detail: "PM2.5 levels within WHO standards",
          },
          waterQuality: {
            title: "Water Quality",
            status: "Excellent",
            description: "99.8% purity",
            detail: "Water purity exceeds national standards",
          },
          vaccination: {
            title: "Vaccination Rate",
            status: "High",
            description: "96% of population",
            detail: "Population vaccination coverage",
          },
          physicalActivity: {
            title: "Physical Activity",
            status: "Medium",
            description: "68% exercise regularly",
            detail: "Adults engaging in regular exercise",
          },
          trafficAccidents: {
            title: "Traffic Accidents",
            status: "Low",
            description: "12 accidents/month",
            detail: "Monthly traffic accident incidents",
          },
          recycling: {
            title: "Recycling",
            status: "Good",
            description: "74% of waste",
            detail: "Waste recycling percentage",
          },
        },
        status: {
          excellent: "Excellent",
          good: "Good",
          medium: "Medium",
          low: "Low",
          high: "High",
        },
        summary: {
          healthIndicators: "Health Indicators",
          excellentIndicators: "Excellent Indicators",
          positiveTrend: "Positive Trend",
          performanceAverage: "Performance Average",
        },
      },

      // Success Stories
      successStories: {
        title: "Success Stories",
        subtitle:
          "Discover how our initiatives have changed people's lives in Huraymila",
        description:
          "We are proud of our successes and achievements in promoting public health and improving quality of life in the community.",
        viewAll: "View All Stories",
        before: "Before",
        after: "After",
        categories: {
          health: "Health",
          environment: "Environment",
          community: "Community",
          education: "Education",
        },
      },

      // News Section
      newsSection: {
        title: "Latest News",
        subtitle:
          "Follow the latest updates and initiatives in Huraymila Healthy City",
        description:
          "We provide you with the latest news and developments in public health and community initiatives.",
        viewAll: "View All News",
        readMore: "Read More",
        previous: "Previous",
        next: "Next",
        play: "Play",
        pause: "Pause",
        views: "views",
        categories: {
          health: "Health",
          environment: "Environment",
          community: "Community",
          education: "Education",
        },
      },

      // Interactive Map
      interactiveMap: {
        title: "Interactive Map",
        subtitle: "Discover services and facilities in your city",
        searchAndFilter: "Search & Filter",
        searchPlaceholder: "Search services...",
        category: "Category",
        clearFilters: "Clear Filters",
        services: "Services",
        noServices: "No services found",
        categories: {
          all: "All",
          health: "Health",
          emergency: "Emergency",
          education: "Education",
          shopping: "Shopping",
          food: "Food",
          finance: "Finance",
          recreation: "Recreation",
        },
        serviceTypes: {
          hospital: "Hospital",
          pharmacy: "Pharmacy",
          police: "Police",
          fire: "Fire",
          school: "School",
          restaurant: "Restaurant",
          shopping: "Shopping",
          bank: "Bank",
          park: "Park",
          service: "Service",
        },
      },

      // News
      news: {
        title: "News",
        subtitle:
          "Stay updated with the latest news and developments in Huraymila Healthy City",
        searchPlaceholder: "Search news...",
        category: "Category",
        health: "Health",
        healthFacilities: "Health Facilities",
        vaccinations: "Vaccinations",
        nutrition: "Nutrition",
        physicalActivity: "Physical Activity",
        technology: "Technology",
        preventiveHealth:
          "Launch of Preventive Health Initiative in Huraymila City",
        preventiveHealthDesc:
          "New preventive health initiative aims to promote health awareness among citizens",
        newHealthCenter: "Opening of New Primary Healthcare Center",
        newHealthCenterDesc:
          "New center equipped with latest medical technologies provides comprehensive services",
        fluVaccination: "Seasonal Flu Vaccination Campaign",
        fluVaccinationDesc:
          "Launch of free flu vaccination campaign in all health centers",
        nutritionWorkshop: "Workshop on Proper Nutrition for Children",
        nutritionWorkshopDesc:
          "Interactive workshop aimed at teaching mothers the basics of healthy nutrition",
        walkingProgram: "Healthy Walking Program in Parks",
        walkingProgramDesc:
          "Weekly healthy walking program in city parks with specialized guides",
        smartHealthcareApp: "New Smart Healthcare App",
        smartHealthcareAppDesc:
          "Launch of smart app connecting citizens with available health services",
        author: "Author",
        publishDate: "Publish Date",
        readTime: "Read Time",
        views: "Views",
        likes: "Likes",
        comments: "Comments",
      },

      // Contact
      contact: {
        title: "Contact Us",
        subtitle: "We are here to answer your questions and help you",
        contactInformation: "Contact Information",
        contactInformationDesc:
          "Different ways to contact the Healthy City initiative team",
        sendMessage: "Send Us a Message",
        sendMessageDesc:
          "Fill out the form below and we'll get back to you as soon as possible",
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        email: "Email",
        emailPlaceholder: "example@email.com",
        phone: "Phone Number",
        phonePlaceholder: "+966-50-123-4567",
        subject: "Subject",
        subjectPlaceholder: "Select a subject",
        message: "Message",
        messagePlaceholder: "Write your message here...",
        generalInquiry: "General Inquiry",
        initiativeInfo: "Information about initiatives",
        volunteering: "Volunteering",
        workingHours: "Working Hours",
        complaintSuggestion: "Complaint or Suggestion",
        other: "Other",
        emailContact: "Email",
        emailContactDesc: "Contact us via email",
        phoneContact: "Phone",
        phoneContactDesc: "Call us directly",
        addressContact: "Address",
        addressContactDesc: "Location of the Healthy City initiative",
        address: "Huraymila City, Riyadh, Saudi Arabia",
        emailAddress: "info@huraymila-healthy.city",
        phoneNumber: "+966-11-123-4567",
      },

      // FAQ
      faq: {
        title: "Frequently Asked Questions",
        subtitle:
          "Answers to the most common questions about Huraymila Healthy City Program",
        aboutProgram: "About the Program",
        initiativesActivities: "Initiatives & Activities",
        volunteering: "Volunteering",
        environmentSustainability: "Environment & Sustainability",
        educationTraining: "Education & Training",
        whatIsProgram: "What is the Huraymila Healthy City Program?",
        whatIsProgramAnswer:
          "The Huraymila Healthy City Program is a comprehensive initiative aimed at improving quality of life and public health in Huraymila Governorate through promoting cooperation between government agencies, civil society organizations, and the local community.",
        programObjectives: "What are the program's objectives?",
        programObjectivesAnswer:
          "The program aims to improve health indicators, promote healthy lifestyles, support community initiatives, and develop health and social infrastructure in the governorate.",
        whoCanParticipate: "Who can participate in the program?",
        whoCanParticipateAnswer:
          "All community members can participate in the program either as volunteers or beneficiaries of services. Government agencies, civil society organizations, and the private sector can also participate as partners.",
        initiativeTypes: "What types of initiatives are available?",
        initiativeTypesAnswer:
          "The program includes diverse health initiatives such as health awareness programs, free medical checkups, sports activities, healthy nutrition programs, and mental health initiatives.",
        howToJoinInitiative: "How can I join an initiative?",
        howToJoinInitiativeAnswer:
          "You can register for initiatives through the website or by visiting the coordination office in the governorate. We will contact you to confirm participation and provide necessary details.",
        initiativeFees: "Are there fees for participating in initiatives?",
        initiativeFeesAnswer:
          "Most initiatives are completely free. Some specialized activities may require symbolic fees, and participants will be informed in advance.",
        howToVolunteer: "How can I volunteer in the program?",
        howToVolunteerAnswer:
          "You can register as a volunteer through the volunteering page on the website or by visiting the coordination office. We will assess your skills and direct you to suitable initiatives.",
        volunteerRequirements: "What are the volunteering requirements?",
        volunteerRequirementsAnswer:
          "There are no special requirements for volunteering, just the desire to contribute to community service. Some initiatives may require specific skills, which will be clarified during registration.",
        volunteerCertificate: "Do I get a volunteer certificate?",
        volunteerCertificateAnswer:
          "Yes, volunteers receive certificates of appreciation that document volunteer hours and initiatives they participated in, helping build their resumes.",
        environmentalInitiatives:
          "What are the environmental initiatives in the program?",
        environmentalInitiativesAnswer:
          "We include afforestation programs, environmental cleanup, recycling, environmental awareness, and renewable energy programs to achieve environmental sustainability.",
        environmentalParticipation:
          "How can I participate in environmental activities?",
        environmentalParticipationAnswer:
          "You can join environmental work teams, participate in cleanup campaigns, or propose new environmental initiatives through available communication channels.",
        trainingPrograms: "What training programs are available?",
        trainingProgramsAnswer:
          "We provide training courses in first aid, health awareness, community leadership, life skills, and vocational training.",
        suggestTrainingTopic: "Can I suggest a new training topic?",
        suggestTrainingTopicAnswer:
          "Yes, we welcome your suggestions for new training topics. You can send suggestions through the contact page or coordination office.",
        contactTitle: "Didn't find an answer to your question?",
        contactSubtitle: "Contact us and we'll be happy to help you",
        callUs: "Call Us",
        callUsDetails: "011-123-4567",
        callUsDesc: "Sunday to Thursday, 8 AM - 4 PM",
        emailUs: "Email Us",
        emailUsDetails: "info@huraymila-healthy-city.gov.sa",
        emailUsDesc: "We'll respond within 24 hours",
        visitUs: "Visit Us",
        visitUsDetails: "Healthy City Program Coordination Office",
        visitUsDesc: "Huraymila Governorate, Riyadh",
      },

      // Auth
      auth: {
        title: "Hello, Welcome",
        subtitle: "Sign in or sign up as a volunteer",
        signIn: "Sign In",
        signUp: "Sign Up as Volunteer",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        fullName: "Full Name",
        phone: "Phone Number",
        signInButton: "Sign In",
        signUpButton: "Sign Up as Volunteer",
        backToHome: "Back to Home",
        emailPlaceholder: "your@email.com",
        passwordPlaceholder: "••••••••",
        fullNamePlaceholder: "Full Name",
        phonePlaceholder: "+966 50 123 4567",
        hasAccount: "Have an account?",
        noAccount: "Don't have an account?",
        switchToSignIn: "Sign In",
        switchToSignUp: "Sign Up as Volunteer",
      },

      // Footer
      footer: {
        description:
          "Huraymila Healthy City Initiative is a national project aimed at promoting public health and improving quality of life in the city through a variety of programs and initiatives.",
        quickLinks: "Quick Links",
        contactInfo: "Contact Information",
        address: "Huraymila City, Riyadh Region, Saudi Arabia",
        phone: "+966 11 234 5678",
        email: "info@huraymila-healthy.sa",
        workingHours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
        socialMedia: "Follow Us on Social Media",
        socialMediaDesc: "For latest news and updates",
        copyright:
          "© 2025 Huraymila Healthy City Initiative. All rights reserved.",
        madeWith: "Made with",
        inSaudiArabia: "in Saudi Arabia",
      },

      // Agency Dashboard
      agencyDashboard: {
        timeline: {
          title: "Program Timeline",
          phases: {
            launch: {
              year: "2025",
              title: "Program Launch",
              description:
                "Start of basic initiatives and establishing partnerships",
              status: "Completed",
            },
            expansion: {
              year: "2025",
              title: "Expansion & Development",
              description:
                "Implementation of major projects and increased community participation",
              status: "In Progress",
            },
            evaluation: {
              year: "2026",
              title: "Evaluation & Improvement",
              description:
                "Results evaluation and development of existing initiatives",
              status: "Planned",
            },
            accreditation: {
              year: "2027",
              title: "Global Accreditation",
              description: "Apply for WHO accreditation",
              status: "Planned",
            },
          },
        },
      },

      // Initiative Page
      initiative: {
        backToInitiatives: "Back to Initiatives",
        applyNow: "Apply Now",
        share: "Share",
        volunteersNeeded: "volunteers needed",
        progress: "Progress",
        location: "Location",
        startDate: "Start Date",
        duration: "Duration",
        category: "Category",
        status: "Status",
        description: "Description",
        objectives: "Objectives",
        requirements: "Requirements",
        benefits: "Benefits",
        contact: "Contact",
        apply: "Apply",
        cancel: "Cancel",
        applying: "Applying...",
        applied: "Successfully applied!",
        error: "Error applying",
        notFound: "Initiative Not Found",
        active: "Active",
        completed: "Completed",
        cancelled: "Cancelled",
        gatheringVolunteers: "Gathering Volunteers",
        health: "Health",
        environment: "Environment",
        community: "Community",
        education: "Education",
        volunteers: "volunteers",
        volunteerProgress: "Volunteer Progress",
        of: "of",
        tags: "Tags",
      },

      // News Article Page
      newsArticle: {
        notFound: "Article Not Found",
        backToNews: "Back to News",
        minRead: "min read",
        tags: "Tags",
        share: "Share",
      },

      // Success Story Page
      successStory: {
        notFound: "Story Not Found",
        backToStories: "Back to Stories",
        beforeAfter: "Before & After",
        before: "Before",
        after: "After",
        achievedResults: "Achieved Results",
        tags: "Tags",
        share: "Share",
      },

      // About Page
      aboutPage: {
        title: "About Us",
        subtitle: "Huraymila Healthy City Initiative",
        description:
          "We are a national initiative aimed at promoting public health and improving quality of life in Huraymila City through a variety of programs and initiatives.",
        mission: "Our Mission",
        missionText:
          "To promote public health and improve quality of life in Huraymila city through community initiatives and strategic partnerships.",
        vision: "Our Vision",
        visionText:
          "To make Huraymila city a model for sustainable healthy cities in Saudi Arabia.",
        values: "Our Values",
        valuesList: [
          "Transparency and Credibility",
          "Community Partnership",
          "Innovation and Development",
          "Environmental Sustainability",
          "Quality and Excellence",
        ],
        goals: "Our Goals",
        goalsText:
          "We strive to achieve a set of strategic goals that contribute to building a healthy and sustainable community",
        goalsList: [
          "Improve public health indicators in the city by 30% within 3 years",
          "Increase green spaces in the city to 40% of total area",
          "Educate 80% of city residents about health and environmental culture",
          "Develop 20 new health initiatives annually",
          "Establish a network of local and international partners",
          "Achieve environmental sustainability in all our projects",
          "Develop specialized training programs for healthcare workers",
          "Create an integrated system for monitoring and evaluating initiatives",
        ],
        stats: {
          founded: "Founded",
          healthInitiatives: "Health Initiatives",
          beneficiaries: "Beneficiaries",
          partnerOrganizations: "Partner Organizations",
        },
        features: {
          initiatives: {
            title: "Initiatives",
            description:
              "Diverse programs to promote physical, mental and social health",
          },
          environment: {
            title: "Sustainable Environment",
            description:
              "Projects to protect the environment and improve air and water quality",
          },
          community: {
            title: "Community Awareness",
            description:
              "Awareness campaigns to promote health culture in the community",
          },
          partnerships: {
            title: "Strategic Partnerships",
            description:
              "Cooperation with government and private institutions to achieve goals",
          },
        },
        contact: "Contact Us",
        contactDescription: "We are here to serve you and help you at any time",
        address: "Huraymila City, Riyadh, Saudi Arabia",
        phone: "+966-11-123-4567",
        email: "info@huraymila-healthy.city",
        workingHours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
      },

      // NotFound Page
      notFound: {
        title: "Page Not Found",
        description: "Sorry, the page you're looking for doesn't exist",
        home: "Home",
        goBack: "Go Back",
      },

      // All Success Stories Page
      allSuccessStories: {
        title: "Success Stories",
        addStory: "Add Success Story",
        titleField: "Title",
        author: "Author",
        before: "Before",
        after: "After",
        fullStory: "Full Story Text",
        cancel: "Cancel",
        addStoryButton: "Add Story",
        category: "Category",
        sort: "Sort",
        featured: "Featured",
        readStory: "Read Story",
        noResults: "No Results Found",
        all: "All",
        health: "Health",
        environment: "Environment",
        education: "Education",
        community: "Community",
        technology: "Technology",
        nutrition: "Nutrition",
        newest: "Newest",
        oldest: "Oldest",
        mostViewed: "Most Viewed",
        mostLiked: "Most Liked",
        highestRated: "Highest Rated",
      },
      agencyManagement: {
        title: "Agency Management",
        subtitle:
          "Manage government agencies participating in the Healthy City initiative",
        addNewAgency: "Add New Agency",
        agenciesList: "Agencies List",
        manageAgencies: "Manage all participating agencies",
        agencyEmail: "Agency Email:",
        agencyPassword: "Agency Password:",
        contactPerson: "Contact Person:",
        contactPersonInfo: "Contact Person Information",
        personEmail: "Person's Email:",
        phone: "Phone:",
        address: "Address:",
        initiatives: "initiatives",
        volunteers: "volunteers",
        editAgency: "Edit Agency",
        updateAgencyData: "Update agency data",
        addNewAgencyTitle: "Add New Agency",
        enterNewAgencyData: "Enter new agency data",
        agencyName: "Agency Name",
        agencyNamePlaceholder: "Agency name",
        agencyDescription: "Agency Description",
        agencyDescriptionPlaceholder:
          "Brief description of the agency and its tasks",
        agencyEmailField: "Agency Email",
        agencyEmailPlaceholder: "agency@example.gov.sa",
        agencyPasswordField: "Agency Password",
        passwordPlaceholder: "Password",
        contactPersonField: "Contact Person",
        contactPersonPlaceholder: "Contact person name",
        personEmailField: "Person's Email",
        phoneNumber: "Phone Number",
        phonePlaceholder: "+966-11-123-4567",
        addressField: "Address",
        addressPlaceholder: "Agency address",
        update: "Update",
        add: "Add",
        cancel: "Cancel",
        confirmDeletion: "Confirm Deletion",
        confirmDeleteMessage: "Are you sure you want to delete this agency?",
        agencyNameLabel: "Agency Name:",
        delete: "Delete",
        assignedStandards: "Assigned Standards",
        allStandards: "All Standards",
        standards: "standards",
        noAssignedStandards: "No standards assigned to this agency",
        standard: "Standard",
        requirements: "requirements",
        unassignedStandards: "Unassigned Standards",
        allStandardsAssigned: "All standards are assigned to this agency",
        standardAssigned: "Standard assigned successfully",
        standardUnassigned: "Standard unassigned successfully",
        fillRequiredFields: "Please fill in all required fields",
        agencyUpdated: "Agency data updated successfully",
        agencyAdded: "New agency added successfully",
        operationError: "An error occurred during the operation",
        agencyDeleted: "Agency deleted successfully",
        deleteError: "An error occurred during deletion",
        // Standards Modal Translations
        standardsModalTitle: "Agency Assigned Standards",
        agencyInfo: "Agency Information",
        assignedStandardsSection: "Assigned Standards",
        assignedStandardsDescription:
          "Standards currently assigned to this agency",
        allStandardsSection: "All Available Standards",
        allStandardsDescription: "Click to assign standards to this agency",
        assigned: "Assigned",
        available: "Available",
        requirements: "Requirements",
        moreRequirements: "more requirements",
        allStandardsAssigned: "All standards are assigned to this agency",
        standardAssignedSuccess: "Standard assigned successfully",
        standardUnassignedSuccess: "Standard unassigned successfully",
        standardToggleError: "Failed to update standard assignment",
      },
      report: {
        title: "Submit Report",
        subtitle:
          "Share your observations and reports to improve services in Huraymila Healthy City",
        back: "Back",
        yourInformation: "Your Information",
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        emailAddress: "Email Address",
        emailPlaceholder: "Enter your email address",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        reportDetails: "Report Details",
        reportTitle: "Report Title",
        reportTitlePlaceholder: "Enter report title",
        reportDescription: "Report Description",
        reportDescriptionPlaceholder:
          "Write a detailed description of the report or issue you want to report",
        uploadFiles: "Upload Files",
        uploadDescription:
          "You can upload photos or videos to support your report (optional)",
        dragFiles: "Drag files here or click to upload",
        supportedFormats: "Supports: JPG, PNG, MP4, MOV (max 10MB per file)",
        uploadedFiles: "Uploaded Files:",
        submitReport: "Submit Report",
        submitting: "Submitting...",
        reportSubmitted: "Report submitted successfully!",
      },
      standardsManagement: {
        title: "Health City Standards Management",
        subtitle:
          "Monitor and manage the 80 health standards with their requirements and responsible agencies",
        totalStandards: "Total Standards",
        approved: "Approved",
        pendingApproval: "Pending Approval",
        rejected: "Rejected",
        didntSubmit: "Didn't Submit",
        searchAndFilters: "Search & Filters",
        searchStandards: "Search Standards",
        searchPlaceholder: "Search standards or requirements...",
        responsibleAgency: "Responsible Agency",
        selectAgency: "Select Agency",
        allAgencies: "All Agencies",
        submissionStatus: "Submission Status",
        selectStatus: "Select Status",
        allStatuses: "All Statuses",
        healthStandardsTable: "Health Standards Table",
        standards: "Standards",
        number: "Number",
        standard: "Standard",
        requirements: "Requirements",
        responsibleAgencies: "Responsible Agencies",
        status: "Status",
        submissions: "Submissions",
        actions: "Actions",
        view: "View",
        standardDetails: "Standard Details",
        requirementsLabel: "Requirements",
        responsibleAgenciesLabel: "Responsible Agencies",
        submitted: "Submitted",
        notSubmitted: "Not Submitted",
        approvedSubmissions: "Approved Submissions",
        viewDetailedSubmissions: "View Detailed Submissions",
      },
      submissionsView: {
        standardNotFound: "Standard Not Found",
        standardNotFoundDescription:
          "The requested standard was not found in the system",
        backToStandards: "Back to Standards",
        viewSubmissions: "View Submissions",
        submissions: "Submissions",
        standardDetails: "Standard Details",
        standardLabel: "Standard",
        responsibleAgencies: "Responsible Agencies:",
        submitted: "Submitted",
        notSubmitted: "Not Submitted",
        requirements: "Requirements:",
        textFiles: "Text Files",
        pdfFiles: "PDF Files",
        images: "Images",
        videos: "Videos",
        totalSubmissions: "Total Submissions",
        approved: "Approved",
        pendingApproval: "Pending Approval",
        rejected: "Rejected",
        acceptanceRate: "Acceptance Rate",
        submittedMaterials: "Submitted Materials",
        filterByAgency: "Filter by Agency",
        selectAgency: "Select Agency",
        allAgencies: "All Agencies",
        all: "All",
        text: "Text",
        pdf: "PDF",
        image: "Images",
        video: "Videos",
        noSubmissionsOfThisType: "No submissions of this type",
        noSubmissionsYet: "No submissions yet",
        submissionsWillAppearHere: "Submissions will appear here",
        view: "View",
        approve: "Approve",
        reject: "Reject",
        browserNotSupportVideo: "Your browser does not support video playback",
        pending: "Pending",
        title: "Title",
        description: "Description",
        notes: "Notes",
        files: "Files",
        file: "File",
        untitledSubmission: "Untitled Submission",
        noDescription: "No Description",
        unknownAgency: "Unknown Agency",
        noDate: "No Date",
        noSubmissionsForAgency: "No submissions for this agency",
      },
      volunteers: {
        title: "Volunteers",
        description: "Manage volunteers",
        searchPlaceholder: "Search by name, email, or phone number...",
        fullName: "Full Name",
        email: "Email",
        phoneNumber: "Phone Number",
        volunteeredInitiatives: "Volunteered Initiatives",
        joinDate: "Join Date",
        actions: "Actions",
        noInitiatives: "No initiatives",
        noSearchResults: "No search results found",
        confirmDelete: "Confirm Delete",
        confirmDeleteMessage: "Are you sure you want to delete the volunteer",
        confirmDeleteMessageEnd: "? This action cannot be undone.",
        cancel: "Cancel",
        delete: "Delete",
        removed: "Volunteer removed successfully",
      },
      initiatives: {
        title: "Initiatives",
        description: "Manage health initiatives",
        addInitiative: "Add New Initiative",
        searchPlaceholder: "Search initiatives...",
        statusFilter: "Filter by Status",
        allStatuses: "All Statuses",
        totalInitiatives: "Total Initiatives",
        completed: "Completed",
        active: "Active",
        cancelled: "Cancelled",
        gatheringVolunteers: "Gathering Volunteers",
        totalVolunteers: "Total Volunteers",
        maxVolunteers: "Max Volunteers",
        initiativeTitle: "Initiative Title",
        description: "Description",
        startDate: "Start Date",
        endDate: "End Date",
        status: "Status",
        volunteers: "Volunteers",
        maxVolunteersLabel: "Max Volunteers",
        actions: "Actions",
        view: "View",
        edit: "Edit",
        delete: "Delete",
        noInitiatives: "No initiatives",
        noSearchResults: "No search results found",
        confirmDelete: "Confirm Delete",
        confirmDeleteMessage: "Are you sure you want to delete the initiative",
        confirmDeleteMessageEnd: "? This action cannot be undone.",
        cancel: "Cancel",
        save: "Save",
        add: "Add",
        update: "Update",
        viewVolunteers: "View Volunteers",
        volunteersCount: "volunteers",
        of: "of",
        outOf: "of",
        needed: "needed",
        loading: "Loading initiatives...",
        loadError: "Failed to load initiatives",
        createSuccess: "Initiative created successfully",
        updateSuccess: "Initiative updated successfully",
        deleteSuccess: "Initiative deleted successfully",
      },
      requiredStandards: {
        title: "Required Standards Summary",
        subtitle: "Standards assigned to the agency and implementation status",
        assignedStandards: "Assigned Standards",
        assignedStandardsDesc:
          "List of standards that the agency must implement",
        all: "All",
        approved: "Approved",
        rejected: "Rejected",
        pendingApproval: "Pending Approval",
        didntSubmit: "Didn't Submit",
        status: "Status:",
        submissionType: "Submission Type:",
        requirements: "Requirements:",
        text: "Text",
        pdfFile: "PDF File",
        photo: "Photo",
        video: "Video",
        undefined: "Undefined",
        noStandardsMatch: "No standards match the search",
        viewSubmission: "View Submission",
        editSubmission: "Edit Submission",
        addSubmission: "Add Submission",
        submissionAdded: "Submission added successfully",
        submissionUpdated: "Submission updated successfully",
        errorSaving: "Error saving submission",
      },

      standards: [
        {
          number: 1,
          standard:
            "Selection of group representatives / volunteers and their training on needs assessment, priority setting, data analysis, project preparation, and monitoring, recording and reporting mechanisms.",
          requirements: [
            "Statement of volunteers' names",
            "Statement of training courses, their number and the reports for each course",
          ],
        },
        {
          number: 2,
          standard:
            "The Healthy City Coordination Committee has been formed, registered with local authorities as a community or non-governmental organization, and members have been guided on their tasks and responsibilities.",
          requirements: [
            "Decision to establish the Coordination Committee and the roles and responsibilities of its members",
            "Statement of subcommittees to coordinate initiatives specific to the healthy city",
          ],
        },
        {
          number: 3,
          standard:
            "Community representatives / volunteers are active partners in local health, planning, and social actions, while ensuring the use of other health care in social services within their own groups.",
          requirements: [
            "Proof of communication mechanisms with volunteers",
            "Reports of activities they have carried out in different fields",
          ],
        },
        {
          number: 4,
          standard:
            "Healthy City Coordination Committee monitors social and economic projects, records achievements and obstacles, and identifies local solutions to local problems.",
          requirements: [
            "Statement of operational plans from coordinators from various sectors",
            "Monitoring and periodic reports",
          ],
        },
        {
          number: 5,
          standard:
            "The Healthy City Coordination Committee seeks resources and builds relationships with potential partners for further development in their local areas.",
          requirements: [
            "Statement of local partners",
            "Various agreements with partners",
          ],
        },
        {
          number: 6,
          standard:
            "A community center has been established or planned for various uses according to community needs and training has been conducted, for example: holding field visits, serving as a community information center, or holding local cultural, national, and religious events, etc.).",
          requirements: [
            "Information about the community center and its capabilities",
            "Field visits",
          ],
        },
        {
          number: 7,
          standard:
            "Women and youth groups have been placed and registered as contributors to local development measures.",
          requirements: [
            "Statement of women's groups and youth groups contributing to healthy city activities",
            "Reports of activities participated in or implemented",
          ],
        },
        {
          number: 8,
          standard:
            "Members of the Healthy City Coordination Committee have been officially nominated by the various sectors relevant to the standards.",
          requirements: [
            "Statement of coordinators officially from various sectors",
          ],
        },
        {
          number: 9,
          standard:
            "The Healthy City Coordination Committee has been formed under the leadership of a mayor or governor, and its members are representatives from all relevant sectors. Minutes of all meetings are recorded and reports are prepared.",
          requirements: [
            "Drafting of the membership of the Higher Committee by all directors of the different sectors",
          ],
        },
        {
          number: 10,
          standard:
            "An official coordinator for the Healthy City program has been appointed and an adequate number of staff, physical space, and facilities have been provided.",
          requirements: [
            "Decision to appoint the Healthy City program coordinator",
            "Visit to the coordination office to view the office and its equipment",
          ],
        },
        {
          number: 11,
          standard:
            "Members of the inter-sectoral team meet with the Healthy City Coordination Committee and provide technical advice and support to the community.",
          requirements: ["Meeting reports"],
        },
        {
          number: 12,
          standard:
            "Potential partners have been identified and contacted, and at least one joint project is underway with partners at the Healthy City implementation site.",
          requirements: [
            "Statement of Healthy City program partners",
            "Statement of the different programs that have been implemented by the partners within the framework of the Healthy City program",
          ],
        },
        {
          number: 13,
          standard:
            "Financial issues related to joint activities have been recorded, reported, and shared with the community for transparency.",
          requirements: [
            "Statement appointing a financial coordinator to follow up on all financial procedures related to the Executive Office.",
          ],
        },
        {
          number: 14,
          standard:
            "Success stories have been documented, published, and used to develop a comprehensive advocacy strategy and tools, taking into account the local culture and being implemented by the local community development committee.",
          requirements: [
            "Statement of success stories",
            "Advertising and publicity plan",
          ],
        },
        {
          number: 15,
          standard:
            "The needy in the community have been identified according to specific criteria approved by the City Coordination Team and are given priority in providing income-generating loans.",
          requirements: [
            "Statement of needy people who can benefit from financial support",
            "Statement of what has been done to support low-income individuals",
          ],
        },
        {
          number: 16,
          standard:
            "Links have been made between local skills, vocational training centers, and micro-loan activities, ensuring that the area is moving towards self-sufficiency.",
          requirements: [
            "Statement of training programs and micro-loan activities",
            "Statement of success stories and building partnerships",
            "Field visits",
          ],
        },
        {
          number: 17,
          standard:
            "All financial issues have been recorded and followed up by the financial secretary of the Healthy City Coordination Committee.",
          requirements: [
            "Records of financial issues to clarify follow-up by the financial coordinator of the Healthy City Committee.",
          ],
        },
        {
          number: 18,
          standard:
            "Loans are repaid on a regular basis, and a follow-up mechanism has been put in place by the Healthy City Coordination Committee or the local banking system.",
          requirements: ["Statement of follow-up mechanisms"],
        },
        {
          number: 19,
          standard:
            "A bank account has been opened for the Healthy City Coordination Committee or the program office, and all financial interactions related to micro-loans go through the relevant banks. The program coordinator and the community are well aware of this.",
          requirements: [
            "Bank account details of the Healthy City program coordination office and transparent to all committees.",
            "Agreements signed with some commercial companies to sponsor and support projects (if any)",
          ],
        },
        {
          number: 20,
          standard:
            "5-10% service fees are taken from each income-generating loan and collected in a separate account to be used for social development activities (i.e., social development funds).",
          requirements: ["Statement proving this (if any)"],
        },
        {
          number: 21,
          standard:
            "Community representatives ensure timely monthly installment deposits from beneficiaries within their own groups and keep the repaid money renewed for future activities.",
          requirements: ["Statement proving this (if any)"],
        },
        {
          number: 22,
          standard:
            "All eligible children (girls and boys) are enrolled in school and no student has dropped out.",
          requirements: ["Statement proving this"],
        },
        {
          number: 23,
          standard:
            "School principals hold regular meetings with local community development committees, parents, and other stakeholders to evaluate the quality of education, school environment, health status of children, and relationships between parents, children, and teachers in order to overcome existing shortcomings or problems.",
          requirements: [
            "Minutes of meetings with local community leaders and parents",
            "Statement of key needs and problems related to education and schools and what interventions and initiatives have been done",
          ],
        },
        {
          number: 24,
          standard:
            "Quality education standards are in place in schools located in program sites.",
          requirements: [
            "Statement of quality standards related to education in schools throughout the city",
            "Statement of accreditation bodies and schools that have received accreditation in the Healthy City program implementation sites",
          ],
        },
        {
          number: 25,
          standard:
            "A subcommittee for education has been formed within the Community Development Committee and schools are regularly monitored. The subcommittee coordinates with the local Directorate of Education.",
          requirements: [
            "Field visits",
            "Decision to form the committee and what has been done",
            "Minutes of meetings with the Healthy City program coordination office.",
          ],
        },
        {
          number: 26,
          standard:
            "Youth and women's groups have been encouraged to be active members of the literacy campaign on a voluntary basis.",
          requirements: ["Proof of implementation", "Field visits"],
        },
        {
          number: 27,
          standard:
            "Community representatives and health volunteers have been trained on priority health issues and health-related programs. They are active in health promotion and education and follow up on actions through regular contact with local health care providers.",
          requirements: [
            "Statement of continuous training programs for health workers",
            "Implementation reports",
          ],
        },
        {
          number: 28,
          standard:
            "Community representatives and health volunteers work to record and report births, deaths, and other vital statistics.",
          requirements: [
            "Details of the system for recording and reporting births, deaths, and vital statistics.",
          ],
        },
        {
          number: 29,
          standard:
            "The Healthy City Coordination Committee, in cooperation with health care providers, has established sustainable referral systems.",
          requirements: [
            "Details of the referral system in the public sector and between the public and private sectors.",
          ],
        },
        {
          number: 30,
          standard:
            "The community is actively trained in research projects and engaged based on community participation.",
          requirements: [
            "Details of the joint community research and its results",
          ],
        },
        {
          number: 31,
          standard:
            "A subcommittee of the Healthy City Coordination Committee has been formed to manage and supervise local health care services.",
          requirements: [
            "Decision to form the subcommittee of the Healthy City Coordination Committee to manage and supervise local health care services",
          ],
        },
        {
          number: 32,
          standard:
            "All essential medicines, vaccines, and medical tools (according to the needs of the local health system) are available in health facilities in urban areas.",
          requirements: [
            "Details of the system and its implementation mechanism to ensure the continuous availability of essential medicines and vaccines.",
          ],
        },
        {
          number: 33,
          standard:
            "The quality of health care services, customer satisfaction with health services, the level of training of health care staff, and the interactions between health care providers and the community are evaluated and actions are taken accordingly.",
          requirements: [
            "Quality standards for health care services",
            "Statement of periodic survey activities to measure quality and customer satisfaction.",
            "Field visits",
          ],
        },
        {
          number: 34,
          standard:
            "All pregnant women receive timely prenatal care (including tetanus vaccines). A safe delivery plan has been prepared for all pregnant women in the third trimester of pregnancy, and all women have access to a safe and clean delivery, which is done with the help of skilled midwives.",
          requirements: ["Statement proving this", "Field visits"],
        },
        {
          number: 35,
          standard:
            "All mothers receive postnatal care for at least 40 days after delivery.",
          requirements: ["Statement proving this"],
        },
        {
          number: 36,
          standard:
            "All children are fully immunized against vaccine-preventable diseases by the age of one year.",
          requirements: ["Statement proving this"],
        },
        {
          number: 37,
          standard:
            "All newborns have been registered by community representatives and health volunteers and have been vaccinated at birth and during the first year of life according to the schedule of the National Expanded Immunization Program (Expanded Immunization Program).",
          requirements: ["Statement proving this"],
        },
        {
          number: 38,
          standard:
            "The Healthy City Coordination Committee, community representatives, and health volunteers actively participate in polio campaigns if any are conducted.",
          requirements: ["Statement proving this"],
        },
        {
          number: 39,
          standard:
            "All children under 5 years of age have the right to receive regular health care services (including growth monitoring and a performance follow-up system in place).",
          requirements: ["Statement proving this", "Field visits"],
        },
        {
          number: 40,
          standard:
            "Children with malnutrition and mothers with vitamin A deficiency and iron deficiency anemia have been identified and receive treatment, follow-up, and care.",
          requirements: ["Statement proving this"],
        },
        {
          id: 41,
          standard:
            "A short-term treatment strategy for tuberculosis is being implemented using trained community representatives or volunteers as treatment partners.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this"],
          status: "pending_approval",
        },
        {
          id: 42,
          standard:
            "A malaria control program is being implemented if necessary with the active participation of community representatives or volunteers and the leadership of local community development committees.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this"],
          status: "approved",
        },
        {
          id: 43,
          standard:
            "Community representatives and health volunteers report all suspected cases of tuberculosis, malaria, HIV, and other infectious diseases to the nearest health facility and carry out follow-up activities in accordance with the training they received from health facility workers and ensure that family members participate in weekly healthy physical activities.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this"],
          status: "didnt_submit",
        },
        {
          id: 44,
          standard:
            "Communities have been informed about the ways of transmission of HIV/AIDS and prevention measures. All diagnosed cases of HIV/AIDS are supported by community representatives and health volunteers.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement of awareness activities"],
          status: "didnt_submit",
        },
        {
          id: 45,
          standard:
            "All patients with chronic diseases (such as those with diabetes, high blood pressure, cardiovascular diseases, cancer, kidney disorders, etc.) are identified, and a follow-up plan has been put in place by community representatives and health volunteers, who ensure that all individuals receive timely medical examinations and medication.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: [
            "Details of the screening program for the early detection of non-communicable diseases",
            "Details of health care programs for the elderly",
          ],
          status: "approved",
        },
        {
          id: 46,
          standard:
            "All cases of mental disorders and substance abuse have been identified and receive support and assistance from the community. Educational activities have been implemented in the community to reduce stigma.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: [
            "Statement proving this, such as a hotline for providing necessary assistance and referring drug abuse issues.",
            "Social care to reduce addiction",
          ],
          status: "rejected",
        },
        {
          id: 47,
          standard:
            "All persons with physical disabilities have been identified and receive community support to ensure their ability to earn a living.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: [
            "Statement of receiving support for people with intellectual and physical disabilities",
            "Vocational training activities and providing relevant employment opportunities for them.",
          ],
          status: "pending_approval",
        },
        {
          id: 48,
          standard:
            "Dangerous areas at the program sites have been identified and appropriate actions/measures have been taken to reduce deaths, injuries, and disabilities resulting from accidents.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this"],
          status: "rejected",
        },
        {
          id: 49,
          standard:
            "The program implementation area is free of crime, violence, and discrimination against women, men, and ethnic groups.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this"],
          status: "rejected",
        },
        {
          id: 50,
          standard:
            "The community adopts and promotes early childhood development, roles, and child-friendly communities.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: [
            "Statement of initiatives and activities in this regard and the various initiatives and programs by Social Affairs.",
          ],
          status: "pending_approval",
        },
        {
          id: 51,
          standard:
            "Work on the Healthy School initiative in all schools at the program implementation sites.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: [
            "Annual plan by the School Health Department at the Ministry of Health.",
            "Programs to provide healthy foods with calorie counting in school cafeterias.",
            "School health programs",
            "Field visits",
          ],
          status: "didnt_submit",
        },
        {
          id: 52,
          standard:
            "Occupational health and safety procedures (especially accident prevention) are in place in all workplaces and facilitate and accelerate workers' access to first aid equipment and services.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this", "Field visits"],
          status: "pending_approval",
        },
        {
          id: 53,
          standard:
            "The program implementation site is clean and has enough green spaces.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Field visits"],
          status: "rejected",
        },
        {
          id: 54,
          standard:
            "An effective solid waste management system has been put in place at the community level at the program implementation site.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
          ],
          requirements: ["Statement proving this", "Field visits"],
          status: "didnt_submit",
        },
        {
          id: 55,
          standard:
            "Water sources have been designated and protected. A water treatment plan has been put in place, and the Healthy City Coordination Committee is aware of it.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
            "Directorate of Education",
          ],
          requirements: ["Statement proving this"],
          status: "approved",
        },
        {
          id: 56,
          standard:
            "All families have sustainable access to safe drinking water and basic sanitation services. They are aware of the risks associated with unsafe water and know how to purify water using what is locally available.",
          assigned_agencies: [
            "Ministry of Health (Health Affairs - Hospitals - Health Sector - Health Care Centers)",
            "Ministry of Human Resources and Social Development",
          ],
          requirements: ["Statement proving this"],
          status: "approved",
        },
        {
          id: 57,
          standard:
            "Community representatives / volunteers have been trained in maintaining sound environmental / health conditions and related measures accessible to the public, such as healthy market places, healthy hospitals, healthy schools, etc.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: [
            "Statement proving this",
            "Field visits for related initiatives",
          ],
          status: "pending_approval",
        },
        {
          id: 58,
          standard:
            "The community is involved in food safety and all healthy food outlets/markets are monitored by national food safety departments.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: [
            "Statement proving this",
            "Field visits for related initiatives",
          ],
          status: "rejected",
        },
        {
          id: 59,
          standard:
            "Healthy food markets are easily accessible for selling basic products such as iodized salt.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: ["Statement proving this", "Field visits"],
          status: "pending_approval",
        },
        {
          id: 60,
          standard:
            "Smoking is prohibited in enclosed and public places, and the establishment of a smoke-free city has been put in place and adopted.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: [
            "Statement of non-smoking decisions/policies in public places and identification of violations.",
            "Statement of implementation mechanisms and related activities",
            "Field visits",
          ],
          status: "didnt_submit",
        },
        {
          id: 61,
          standard:
            "A community-based quality management center has been established at the Healthy City program implementation site (including the municipality) to ensure systematic monitoring of air pollution. The community is aware of the risks of air pollution.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: [
            "Air pollution monitoring plan",
            "Statement of related activities",
          ],
          status: "pending_approval",
        },
        {
          id: 62,
          standard:
            "City planners implement measures that prevent air pollution.",
          assigned_agencies: ["Civil Defense", "Red Crescent"],
          requirements: ["Statement of supporting decisions"],
          status: "didnt_submit",
        },
        {
          id: 63,
          standard:
            "The impact of urban and housing zoning schemes on air pollution is evaluated before they are adopted. These housing projects include, for example, families' access to clean fuel, ventilation, and improved kitchen stoves and heating devices.",
          assigned_agencies: ["Directorate of Education", "Neighborhood Club"],
          requirements: ["Statement of supporting decisions"],
          status: "rejected",
        },
        {
          id: 64,
          standard:
            "A community information center has been established and community representatives/volunteers and members of the inter-sectoral team are trained to collect, analyze, and use basic information for local development planning.",
          assigned_agencies: ["Directorate of Education", "Neighborhood Club"],
          requirements: [
            "Statement of the center responsible for statistics and information",
            "Mechanism for data collection, analysis, and dissemination for use in local-level planning.",
          ],
          status: "didnt_submit",
        },
        {
          id: 65,
          standard:
            "Key information is displayed at the community information center or the local Healthy City program office and shared with the community and other relevant sectors/partners.",
          assigned_agencies: ["Directorate of Education", "Neighborhood Club"],
          requirements: [
            "Mechanism for distributing data to benefit from it in planning and decision-making in different sectors.",
          ],
          status: "didnt_submit",
        },
        {
          id: 66,
          standard:
            "Basic information has been used for advocacy and monitoring purposes by the local community development committee and other stakeholders.",
          assigned_agencies: ["Directorate of Education", "Neighborhood Club"],
          requirements: [
            "Mechanism for communication between the center and different sectors to exchange the necessary statistics for development projects.",
          ],
          status: "rejected",
        },
        {
          id: 67,
          standard:
            "The forms and results of the basic survey and information on current projects are well-documented so far and are available to the local community development committee and the Healthy City coordination center.",
          assigned_agencies: ["Directorate of Education", "Neighborhood Club"],
          requirements: ["Relevant reports"],
          status: "didnt_submit",
        },
        {
          id: 68,
          standard:
            "A city profile has been created and is regularly updated and used for planning and monitoring purposes.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["A copy of the city profile"],
          status: "pending_approval",
        },
        {
          id: 69,
          standard:
            "Local skills, interests, and appropriate technologies have been evaluated and promoted.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["Relevant reports."],
          status: "approved",
        },
        {
          id: 70,
          standard:
            "Training centers for skills related to the local market have been established for males and females and have been approved by inter-sectoral teams.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["Statement proving this", "Field visits"],
          status: "didnt_submit",
        },
        {
          id: 71,
          standard:
            "The Healthy City Coordination Committee gives priority to providing micro-loans to students of vocational training centers.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["Statement proving this"],
          status: "didnt_submit",
        },
        {
          id: 72,
          standard:
            "Vocational training centers are self-financed and self-managed by the community or local non-governmental organizations.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["Statement proving this"],
          status: "pending_approval",
        },
        {
          id: 73,
          standard:
            "Computer training centers, language classes, sports facilities, etc., have been established and are self-managed by the community and local non-governmental organizations.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Charitable Societies - Civil Societies)",
            "General Organization for Technical and Vocational Training",
            "Ministry of Education (Universities - Schools - Neighborhood Club - Educational Platforms)",
          ],
          requirements: ["Statement proving this", "Field visits"],
          status: "rejected",
        },
        {
          id: 74,
          standard:
            "Innovative people have been identified, supported, and encouraged.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["Statement of success stories"],
          status: "pending_approval",
        },
        {
          id: 75,
          standard:
            "Known emergencies that occurred in the past 20 years have been identified, and the number of victims and damaged local infrastructure has been documented.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["Documentation files"],
          status: "rejected",
        },
        {
          id: 76,
          standard:
            "A subcommittee for emergency preparedness and response has been formed, guided, and its members' tasks assigned.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: [
            "Statement of the formation of the committee and its membership",
          ],
          status: "approved",
        },
        {
          id: 77,
          standard:
            "A city profile has been developed and a copy of this file is kept outside the program implementation area.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["The developed file"],
          status: "didnt_submit",
        },
        {
          id: 78,
          standard:
            "Community representatives and health volunteers have been trained on emergency preparedness plans, how to deal with emergencies, and provide first aid whenever and wherever needed.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["Reports of the training courses"],
          status: "didnt_submit",
        },
        {
          id: 79,
          standard:
            "An emergency plan has been prepared and shared with the competent local authorities to mobilize the necessary resources and action. The community is aware of the emergency plan, what to do, who reports what, and what to do during an emergency.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["Statement of the detailed plan"],
          status: "rejected",
        },
        {
          id: 80,
          standard:
            "Vulnerable groups (such as pregnant women, people with physical disabilities, chronic patients, malnourished people, the elderly, people with mental disorders, etc.) have been identified, and this emergency information has been shared with the competent authorities in advance.",
          assigned_agencies: [
            "Ministry of Human Resources and Social Development (Social Security - Charitable Societies - Civil Societies)",
          ],
          requirements: ["A copy of the data"],
          status: "rejected",
        },
      ],
    },
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Warning: Translation key not found
        return key;
      }
    }

    return value;
  };

  const value = {
    t,
    language,
    translations: translations[language],
    standards: translations[language].standards,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
