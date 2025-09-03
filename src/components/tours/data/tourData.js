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
      },
      description: {
        en: "Let's explore the key features of your director dashboard",
        ar: "دعنا نستكشف الميزات الرئيسية في لوحة تحكمك"
      },
      steps: [
        {
          id: 1,
          target: ".dashboard-header",
          title: {
            en: "Your Command Center",
            ar: "مركز القيادة الخاص بك"
          },
          content: {
            en: "Welcome to your university's nerve center! Here you can monitor student enrollment, track financial health, and oversee all departments. The dashboard provides real-time insights into your institution's performance.",
            ar: "مرحباً بك في مركز أعصاب جامعتك! هنا يمكنك مراقبة تسجيل الطلاب وتتبع الصحة المالية والإشراف على جميع الأقسام. توفر لوحة التحكم رؤى فورية حول أداء مؤسستك."
          },
          position: "bottom"
        },
        {
          id: 2,
          target: ".summary-cards",
          title: {
            en: "Key Performance Indicators",
            ar: "مؤشرات الأداء الرئيسية"
          },
          content: {
            en: "These cards give you instant insights into university performance. Click any card to see detailed analytics. Track enrollment trends, monitor budget health, and identify areas needing attention - all in one glance.",
            ar: "تعطيك هذه البطاقات رؤى فورية حول أداء الجامعة. انقر على أي بطاقة لرؤية التحليلات التفصيلية. تتبع اتجاهات التسجيل وراقب صحة الميزانية وحدد المجالات التي تحتاج إلى اهتمام - كل ذلك في لمحة واحدة."
          },
          position: "top"
        },
        {
          id: 3,
          target: ".quick-actions",
          title: {
            en: "Quick Actions Hub",
            ar: "مركز الإجراءات السريعة"
          },
          content: {
            en: "Your shortcut to essential functions. The most-used actions appear first. Bookmark this section for quick access during busy periods. Each icon represents a different department or function you can manage.",
            ar: "الطريق المختصر إلى الوظائف الأساسية. تظهر الإجراءات الأكثر استخداماً أولاً. احفظ هذا القسم للوصول السريع خلال الفترات المزدحمة. يمثل كل أيقونة قسم أو وظيفة مختلفة يمكنك إدارتها."
          },
          position: "left"
        }
      ]
    },
    analytics: {
      autoScan: true,
      title: {
        en: "Analytics & Reports",
        ar: "التحليلات والتقارير"
      },
      description: {
        en: "Explore comprehensive analytics and reporting tools",
        ar: "استكشف أدوات التحليلات والتقارير الشاملة"
      },
      steps: [
        {
          id: 1,
          target: ".analytics-header",
          title: {
            en: "Data Insights Hub",
            ar: "مركز رؤى البيانات"
          },
          content: {
            en: "Welcome to your analytics command center! Here you can generate comprehensive reports, analyze trends, and make data-driven decisions for your university.",
            ar: "مرحباً بك في مركز قيادة التحليلات! هنا يمكنك إنشاء تقارير شاملة وتحليل الاتجاهات واتخاذ قرارات مدروسة لجامعتك."
          },
          position: "bottom"
        },
        {
          id: 2,
          target: ".chart-container",
          title: {
            en: "Interactive Charts",
            ar: "الرسوم البيانية التفاعلية"
          },
          content: {
            en: "These interactive charts provide real-time insights. Hover over data points to see detailed information. Use the filters above to customize your view and export data for presentations.",
            ar: "توفر هذه الرسوم البيانية التفاعلية رؤى فورية. مرر المؤشر فوق نقاط البيانات لرؤية المعلومات التفصيلية. استخدم المرشحات أعلاه لتخصيص عرضك وتصدير البيانات للعروض التقديمية."
          },
          position: "top"
        }
      ]
    },
    departments: {
      autoScan: true,
      title: {
        en: "Department Management",
        ar: "إدارة الأقسام"
      },
      description: {
        en: "Manage university departments and organizational structure",
        ar: "إدارة أقسام الجامعة والهيكل التنظيمي"
      },
      steps: [
        {
          id: 1,
          target: ".departments-header",
          title: {
            en: "Organizational Overview",
            ar: "نظرة عامة على التنظيم"
          },
          content: {
            en: "Manage your university's organizational structure from this central hub. View department hierarchies, manage staff assignments, and monitor performance across all academic units.",
            ar: "أدر الهيكل التنظيمي لجامعتك من هذا المركز. اعرض التسلسل الهرمي للأقسام وأدر تعيينات الموظفين وراقب الأداء عبر جميع الوحدات الأكاديمية."
          },
          position: "bottom"
        }
      ]
    },
    approvals: {
      autoScan: true,
      title: {
        en: "Approval Center",
        ar: "مركز الموافقات"
      },
      description: {
        en: "Review, approve, reject, or request revisions efficiently",
        ar: "قم بالمراجعة والاعتماد أو الرفض أو طلب التعديلات بكفاءة"
      },
      steps: []
    },
    'strategic-planning': {
      autoScan: true,
      title: {
        en: "Strategic Planning",
        ar: "التخطيط الإستراتيجي"
      },
      description: {
        en: "Align goals, track KPIs, plan roadmaps, and analyze trends",
        ar: "قم بمواءمة الأهداف وتتبع مؤشرات الأداء وخطط خارطة الطريق وحلل الاتجاهات"
      },
      steps: []
    },
    communication: {
      autoScan: true,
      title: {
        en: "Communication Hub",
        ar: "مركز التواصل"
      },
      description: {
        en: "Broadcast, collaborate, archive, and analyze communications",
        ar: "أرسل الإعلانات وتعاون وأرشف وحلل الاتصالات"
      },
      steps: []
    },
    audit: {
      autoScan: true,
      title: {
        en: "Audit & Compliance",
        ar: "التدقيق والامتثال"
      },
      description: {
        en: "Compliance overview, audit logs, and risk analytics",
        ar: "نظرة عامة على الامتثال وسجلات التدقيق وتحليلات المخاطر"
      },
      steps: []
    },
    calendar: {
      autoScan: true,
      title: {
        en: "Meetings & Calendar",
        ar: "الاجتماعات والتقويم"
      },
      description: {
        en: "Manage meetings and key calendar events",
        ar: "إدارة الاجتماعات وأحداث التقويم الرئيسية"
      },
      steps: []
    },
    users: {
      autoScan: true,
      title: {
        en: "User Management",
        ar: "إدارة المستخدمين"
      },
      description: {
        en: "Monitor user metrics and manage users across roles",
        ar: "راقب مقاييس المستخدمين وأدر المستخدمين عبر الأدوار"
      },
      steps: []
    },
    settings: {
      autoScan: true,
      title: {
        en: "Settings",
        ar: "الإعدادات"
      },
      description: {
        en: "Manage institutional, academic, access, notifications, and privacy",
        ar: "أدر إعدادات المؤسسة والأكاديمية والوصول والإشعارات والخصوصية"
      },
      steps: []
    },
    workspace: {
      autoScan: true,
      title: {
        en: "Workspace",
        ar: "مساحة العمل"
      },
      description: {
        en: "Central hub for training, compliance, and account tools",
        ar: "المركز الرئيسي للتدريب والامتثال وأدوات الحساب"
      },
      steps: []
    },
    support: {
      autoScan: true,
      title: {
        en: "Help & Support",
        ar: "المساعدة والدعم"
      },
      description: {
        en: "Help topics, FAQs, and contact options",
        ar: "مواضيع المساعدة والأسئلة الشائعة وخيارات الاتصال"
      },
      steps: []
    }
  },

  // MARKETING HEAD ROLE TOURS
  'marketing-head': {
    dashboard: {
      autoScan: true,
      title: {
        en: "Marketing Dashboard",
        ar: "لوحة تحكم التسويق"
      },
      description: {
        en: "Track KPIs, analyze performance, and manage team follow-ups",
        ar: "تتبع مؤشرات الأداء، حلّل الأداء، وأدر متابعات الفريق"
      },
      steps: []
    },
    analytics: {
      autoScan: true,
      title: {
        en: "Reporting & Analytics",
        ar: "التقارير والتحليلات"
      },
      description: {
        en: "Campaign analytics, ROI reports, and lead statistics",
        ar: "تحليلات الحملات وتقارير العائد وإحصاءات العملاء"
      },
      steps: []
    },
    team: {
      autoScan: true,
      title: {
        en: "Team Management",
        ar: "إدارة الفريق"
      },
      description: {
        en: "Structure, permissions, tasks, performance, and more",
        ar: "الهيكل، الأذونات، المهام، الأداء، والمزيد"
      },
      steps: []
    },
    leads: {
      autoScan: true,
      title: {
        en: "Leads Management",
        ar: "إدارة العملاء المحتملين"
      },
      description: {
        en: "Upload and manage leads with bulk actions",
        ar: "قم برفع العملاء وإدارتهم مع الإجراءات المجمعة"
      },
      steps: []
    },
    campaigns: {
      autoScan: true,
      title: {
        en: "Campaign Management",
        ar: "إدارة الحملات"
      },
      description: {
        en: "Plan campaigns, budgets, ROI, and metrics",
        ar: "خطط الحملات والميزانيات والعائد والمقاييس"
      },
      steps: []
    },
    resources: {
      autoScan: true,
      title: {
        en: "Resource Management",
        ar: "إدارة الموارد"
      },
      description: {
        en: "Manage budgets, assets, tools, and allocations",
        ar: "إدارة الميزانيات والأصول والأدوات والتوزيعات"
      },
      steps: []
    },
    communication: {
      autoScan: true,
      title: {
        en: "Communication Hub",
        ar: "مركز التواصل"
      },
      description: {
        en: "Broadcast, collaborate, archive, and analyze communications",
        ar: "أرسل الإعلانات وتعاون وأرشف وحلل الاتصالات"
      },
      steps: []
    },
    training: {
      autoScan: true,
      title: {
        en: "Training & Development",
        ar: "التدريب والتطوير"
      },
      description: {
        en: "Team training, skills, schedules, and learning resources",
        ar: "تدريب الفريق والمهارات والجداول والموارد التعليمية"
      },
      steps: []
    },
    workspace: {
      autoScan: true,
      title: {
        en: "Workspace",
        ar: "مساحة العمل"
      },
      description: {
        en: "Quick access to training, compliance, assets, tasks, and analytics",
        ar: "وصول سريع إلى التدريب والامتثال والأصول والمهام والتحليلات"
      },
      steps: []
    },
    support: {
      autoScan: true,
      title: {
        en: "Help & Support",
        ar: "المساعدة والدعم"
      },
      description: {
        en: "Create tickets, track status, and browse knowledge base",
        ar: "أنشئ التذاكر وتابع الحالة وتصفح قاعدة المعرفة"
      },
      steps: []
    }
  },

  // ADMISSION HEAD ROLE TOURS
  'admission-head': {
    dashboard: {
      autoScan: true,
      title: {
        en: "Admission Dashboard",
        ar: "لوحة تحكم القبول"
      },
      description: {
        en: "Explore the pipeline, KPIs, sources, departments, actions, and AI insights",
        ar: "استكشف خط الأنابيب والمؤشرات والمصادر والأقسام والإجراءات ورؤى الذكاء الاصطناعي"
      },
      steps: []
    },
    applications: {
      autoScan: true,
      title: {
        en: "Applications",
        ar: "الطلبات"
      },
      description: {
        en: "KPIs, status breakdowns, AI insights, tracker, verification, interviews, and offers",
        ar: "المؤشرات وتقسيم الحالة ورؤى الذكاء والمتعقب والتحقق والمقابلات والعروض"
      },
      steps: []
    },
    leads: {
      autoScan: true,
      title: {
        en: "Leads Management",
        ar: "إدارة العملاء المحتملين"
      },
      description: {
        en: "Capture, segment, nurture, and assign leads",
        ar: "التقاط العملاء وتجزئتهم وتنميتهم وتوزيعهم"
      },
      steps: []
    },
    schedule: {
      autoScan: true,
      title: {
        en: "Schedule & Appointments",
        ar: "الجدولة والمواعيد"
      },
      description: {
        en: "Manage calendars, interviews, bookings, and reminders",
        ar: "إدارة التقويمات والمقابلات والحجوزات والتذكيرات"
      },
      steps: []
    },
    payments: {
      autoScan: true,
      title: {
        en: "Payments Management",
        ar: "إدارة المدفوعات"
      },
      description: {
        en: "Invoices, payments, refunds, reminders, and reports",
        ar: "الفواتير والمدفوعات والمبالغ المستردة والتذكيرات والتقارير"
      },
      steps: []
    },
    documents: {
      autoScan: true,
      title: {
        en: "Documents & Verification",
        ar: "الوثائق والتحقق"
      },
      description: {
        en: "Manage requirements, uploads, verification, access, and compliance",
        ar: "إدارة المتطلبات والرفع والتحقق والوصول والامتثال"
      },
      steps: []
    },
    courses: {
      autoScan: true,
      title: {
        en: "Course Management",
        ar: "إدارة الدورات"
      },
      description: {
        en: "Catalog, visibility, seat monitoring, fee mapping, and readiness",
        ar: "الفهرس، الرؤية، مراقبة المقاعد، تعيين الرسوم، والجاهزية"
      },
      steps: []
    },
    search: {
      autoScan: true,
      title: {
        en: "Advanced Search & Filters",
        ar: "البحث المتقدم والمرشحات"
      },
      description: {
        en: "Filter leads and applications, save views, and analyze segments",
        ar: "تصفية العملاء والطلبات، حفظ العروض، وتحليل الشرائح"
      },
      steps: []
    },
    tools: {
      autoScan: true,
      title: {
        en: "Tools & Utilities",
        ar: "الأدوات والمرافق"
      },
      description: {
        en: "Automation, imports, exports, integrations, and logs",
        ar: "الأتمتة، الاستيراد، التصدير، التكاملات والسجلات"
      },
      steps: []
    },
    training: {
      autoScan: true,
      title: {
        en: "Training & Development",
        ar: "التدريب والتطوير"
      },
      description: {
        en: "Calendar, modules, onboarding, skill gaps, progress, trainers, feedback, knowledge hub, and gamification",
        ar: "التقويم والوحدات والإعداد وفجوات المهارات والتقدم والمدربون والتغذية ومركز المعرفة واللعبية"
      },
      steps: []
    },
    workspace: {
      autoScan: true,
      title: {
        en: "Workspace",
        ar: "مساحة العمل"
      },
      description: {
        en: "Quick links to training, compliance, HR, tasks, events, and more",
        ar: "روابط سريعة للتدريب والامتثال والموارد البشرية والمهام والفعاليات والمزيد"
      },
      steps: []
    },
    'lead-transfer': {
      autoScan: true,
      title: {
        en: "Lead Transfer Management",
        ar: "إدارة نقل العملاء"
      },
      description: {
        en: "Bulk transfers, conflict resolution, KPIs, workload, and history",
        ar: "تحويلات جماعية، حل التعارض، مؤشرات، عبء العمل والسجل"
      },
      steps: []
    },
    compliance: {
      autoScan: true,
      title: {
        en: "Compliance & Quality",
        ar: "الامتثال والجودة"
      },
      description: {
        en: "Audit trails, policy checks, risk management, and reports",
        ar: "مسارات التدقيق، فحوصات السياسات، إدارة المخاطر والتقارير"
      },
      steps: []
    },
    communication: {
      autoScan: true,
      title: {
        en: "Communication & Logs",
        ar: "التواصل والسجلات"
      },
      description: {
        en: "Send, track, and audit communications across channels",
        ar: "إرسال وتتبع وتدقيق الاتصالات عبر القنوات"
      },
      steps: []
    },
    support: {
      autoScan: true,
      title: {
        en: "Help & Support",
        ar: "المساعدة والدعم"
      },
      description: {
        en: "Raise tickets, track statuses, and browse knowledge base",
        ar: "ارفع التذاكر وتابع الحالات وتصفح قاعدة المعرفة"
      },
      steps: []
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