// Tour Data - Contains all tour content organized by role and page
// This file will be expanded as we implement tours for each page

export const tourData = {
  // DIRECTOR ROLE TOURS
  director: {
    dashboard: {
      autoScan: true,
      title: {
        en: "Welcome to Director Dashboard",
        ar: "مرحباً بك في لوحة تحكم المدير"
  
      description: {
        en: "Let's explore the key features of your director dashboard",
        ar: "دعنا نستكشف الميزات الرئيسية في لوحة تحكمك"
  
      steps: [
        {
          id: 1,
          target: ".dashboard-header",
          title: {
            en: "Your Command Center",
            ar: "مركز القيادة الخاص بك"
      
          content: {
            en: "Welcome to your university's nerve center! Here you can monitor student enrollment, track financial health, and oversee all departments. The dashboard provides real-time insights into your institution's performance.",
            ar: "مرحباً بك في مركز أعصاب جامعتك! هنا يمكنك مراقبة تسجيل الطلاب وتتبع الصحة المالية والإشراف على جميع الأقسام. توفر لوحة التحكم رؤى فورية حول أداء مؤسستك."
      
          position: "bottom"
    
        {
          id: 2,
          target: ".summary-cards",
          title: {
            en: "Key Performance Indicators",
            ar: "مؤشرات الأداء الرئيسية"
      
          content: {
            en: "These cards give you instant insights into university performance. Click any card to see detailed analytics. Track enrollment trends, monitor budget health, and identify areas needing attention - all in one glance.",
            ar: "تعطيك هذه البطاقات رؤى فورية حول أداء الجامعة. انقر على أي بطاقة لرؤية التحليلات التفصيلية. تتبع اتجاهات التسجيل وراقب صحة الميزانية وحدد المجالات التي تحتاج إلى اهتمام - كل ذلك في لمحة واحدة."
      
          position: "top"
    
        {
          id: 3,
          target: ".quick-actions",
          title: {
            en: "Quick Actions Hub",
            ar: "مركز الإجراءات السريعة"
      
          content: {
            en: "Your shortcut to essential functions. The most-used actions appear first. Bookmark this section for quick access during busy periods. Each icon represents a different department or function you can manage.",
            ar: "الطريق المختصر إلى الوظائف الأساسية. تظهر الإجراءات الأكثر استخداماً أولاً. احفظ هذا القسم للوصول السريع خلال الفترات المزدحمة. يمثل كل أيقونة قسم أو وظيفة مختلفة يمكنك إدارتها."
      
          position: "left"
        }
      ]

    analytics: {
      title: {
        en: "Analytics & Reports",
        ar: "التحليلات والتقارير"
  
      description: {
        en: "Explore comprehensive analytics and reporting tools",
        ar: "استكشف أدوات التحليلات والتقارير الشاملة"
  
      steps: [
        {
          id: 1,
          target: ".analytics-header",
          title: {
            en: "Data Insights Hub",
            ar: "مركز رؤى البيانات"
      
          content: {
            en: "Welcome to your analytics command center! Here you can generate comprehensive reports, analyze trends, and make data-driven decisions for your university.",
            ar: "مرحباً بك في مركز قيادة التحليلات! هنا يمكنك إنشاء تقارير شاملة وتحليل الاتجاهات واتخاذ قرارات مدروسة لجامعتك."
      
          position: "bottom"
    
        {
          id: 2,
          target: ".chart-container",
          title: {
            en: "Interactive Charts",
            ar: "الرسوم البيانية التفاعلية"
      
          content: {
            en: "These interactive charts provide real-time insights. Hover over data points to see detailed information. Use the filters above to customize your view and export data for presentations.",
            ar: "توفر هذه الرسوم البيانية التفاعلية رؤى فورية. مرر المؤشر فوق نقاط البيانات لرؤية المعلومات التفصيلية. استخدم المرشحات أعلاه لتخصيص عرضك وتصدير البيانات للعروض التقديمية."
      
          position: "top"
        }
      ]

    departments: {
      title: {
        en: "Department Management",
        ar: "إدارة الأقسام"
  
      description: {
        en: "Manage university departments and organizational structure",
        ar: "إدارة أقسام الجامعة والهيكل التنظيمي"
  
      steps: [
        {
          id: 1,
          target: ".departments-header",
          title: {
            en: "Organizational Overview",
            ar: "نظرة عامة على التنظيم"
      
          content: {
            en: "Manage your university's organizational structure from this central hub. View department hierarchies, manage staff assignments, and monitor performance across all academic units.",
            ar: "أدر الهيكل التنظيمي لجامعتك من هذا المركز. اعرض التسلسل الهرمي للأقسام وأدر تعيينات الموظفين وراقب الأداء عبر جميع الوحدات الأكاديمية."
      
          position: "bottom"
        }
      ]
    }
  },

  // MARKETING HEAD ROLE TOURS
  'marketing-head': {
    dashboard: {
      title: {
        en: "Welcome to Marketing Dashboard",
        ar: "مرحباً بك في لوحة تحكم التسويق"
  
      description: {
        en: "Let's explore your marketing performance and campaign insights",
        ar: "دعنا نستكشف أداء التسويق ورؤى الحملات"
  
      steps: [
        {
          id: 1,
          target: ".marketing-header",
          title: {
            en: "Marketing Overview",
            ar: "نظرة عامة على التسويق"
      
          content: {
            en: "Track your marketing campaigns, lead generation, and conversion rates",
            ar: "تتبع حملاتك التسويقية وتوليد العملاء المحتملين ومعدلات التحويل"
      
          position: "bottom"
        }
      ]
    }
  },

  // ADMISSION HEAD ROLE TOURS
  'admission-head': {
    dashboard: {
      title: {
        en: "Welcome to Admission Dashboard",
        ar: "مرحباً بك في لوحة تحكم القبول"
  
      description: {
        en: "Let's explore your admission pipeline and student applications",
        ar: "دعنا نستكشف خط أنابيب القبول وطلبات الطلاب"
  
      steps: [
        {
          id: 1,
          target: ".admission-header",
          title: {
            en: "Admission Overview",
            ar: "نظرة عامة على القبول"
      
          content: {
            en: "Monitor applications, track leads, and manage the admission process",
            ar: "راقب الطلبات وتتبع العملاء المحتملين وأدر عملية القبول"
      
          position: "bottom"
        }
      ]
    }
  }
};

// Helper function to get tour data for a specific role and page
export const getTourData = (role, page) => {
  return tourData[role]?.[page] || null;
};

// Helper function to get tour steps for a specific role and page
export const getTourSteps = (role, page) => {
  const tour = getTourData(role, page);
  return tour?.steps || [];
};

// Helper function to get tour title for a specific role and page
export const getTourTitle = (role, page, language = 'en') => {
  const tour = getTourData(role, page);
  return tour?.title?.[language] || 'Tour';
};

// Helper function to get tour description for a specific role and page
export const getTourDescription = (role, page, language = 'en') => {
  const tour = getTourData(role, page);
  return tour?.description?.[language] || 'Page tour';
}; 
