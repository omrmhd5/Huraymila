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
          thrivingAgriculture: "الزراعة المزدهرة",
          thrivingAgricultureDesc: "أراضي زراعية خصبة ومنتجة",
          continuousDevelopment: "التطوير المستمر",
          continuousDevelopmentDesc: "مشاريع تنموية حديثة ومستدامة",
        },
        stats: {
          population: "عدد السكان (2022)",
          founded: "سنة التأسيس",
          elevation: "الارتفاع",
          area: "المساحة",
          populationDensity: "الكثافة السكانية",
          saudis: "السعوديون",
          nonSaudis: "غير السعوديين",
          households: "عدد الأسر (2010)",
          dialingCode: "خطة ترقيم الهواتف",
          coordinates: "الإحداثيات",
          populationValue: "21,758 نسمة",
          foundedValue: "1400 هـ",
          elevationValue: "650 م",
          areaValue: "1,480 كم²",
          populationDensityValue: "15 نسمة/كم²",
          saudisValue: "12,724 (58.48%)",
          nonSaudisValue: "9,034 (41.52%)",
          householdsValue: "3,617 أسرة",
          dialingCodeValue: "011",
          coordinatesValue: "25°07′01″N 46°06′01″E",
        },
        keyFeatures: "المميزات الرئيسية",
        statistics: "الإحصائيات",
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
          participants: "مشارك",
          participantsNeeded: "مشارك مطلوب",
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
        copyright: "© 2024 مبادرة مدينة حريملاء الصحية. جميع الحقوق محفوظة.",
        madeWith: "صنع بـ",
        inSaudiArabia: "في المملكة العربية السعودية",
      },

      // Agency Dashboard
      agencyDashboard: {
        timeline: {
          title: "الجدول الزمني للبرنامج",
          phases: {
            launch: {
              year: "2024",
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
          founded: "سنة التأسيس",
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
        id: "الرقم",
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
        submitted: "قدمت التقديم",
        notSubmitted: "لم تقدم التقديم",
        approvedSubmissions: "نسبة التقديمات المعتمدة",
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
        submitted: "قدمت التقديم",
        notSubmitted: "لم تقدم التقديم",
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
        view: "عرض",
        approve: "موافقة",
        reject: "رفض",
        browserNotSupportVideo: "متصفحك لا يدعم تشغيل الفيديو",
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
        needed: "مطلوب",
      },
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
          thrivingAgriculture: "Thriving Agriculture",
          thrivingAgricultureDesc: "Fertile and productive agricultural lands",
          continuousDevelopment: "Continuous Development",
          continuousDevelopmentDesc:
            "Modern and sustainable development projects",
        },
        stats: {
          population: "Population (2022)",
          founded: "Founded",
          elevation: "Elevation",
          area: "Area",
          populationDensity: "Population Density",
          saudis: "Saudis",
          nonSaudis: "Non-Saudis",
          households: "Households (2010)",
          dialingCode: "Dialing Code",
          coordinates: "Coordinates",
          populationValue: "21,758 people",
          foundedValue: "1400 AH",
          elevationValue: "650 m",
          areaValue: "1,480 km²",
          populationDensityValue: "15 people/km²",
          saudisValue: "12,724 (58.48%)",
          nonSaudisValue: "9,034 (41.52%)",
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
          "© 2024 Huraymila Healthy City Initiative. All rights reserved.",
        madeWith: "Made with",
        inSaudiArabia: "in Saudi Arabia",
      },

      // Agency Dashboard
      agencyDashboard: {
        timeline: {
          title: "Program Timeline",
          phases: {
            launch: {
              year: "2024",
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
        id: "ID",
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
        view: "View",
        approve: "Approve",
        reject: "Reject",
        browserNotSupportVideo: "Your browser does not support video playback",
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
        needed: "needed",
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
    },
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(
          `Translation key not found: ${key} for language: ${language}`
        );
        return key;
      }
    }

    return value;
  };

  const value = {
    t,
    language,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
