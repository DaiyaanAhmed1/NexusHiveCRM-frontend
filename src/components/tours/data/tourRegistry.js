// Tour Registry - Maps which pages have tours available for each role
// This determines whether the star button shows "Start Tour" or "Tour Coming Soon"

export const tourRegistry = {
  // DIRECTOR ROLE - 12 pages
  director: {
    dashboard: true,           // ✅ Has tour
    analytics: true,           // ✅ Has tour
    departments: true,         // ✅ Has tour
    approvals: true,           // ✅ Has tour
    'strategic-planning': true, // ✅ Has tour
    communication: true,       // ✅ Has tour
    audit: true,               // ✅ Has tour
    calendar: true,            // ✅ Has tour
    users: true,               // ✅ Has tour
    settings: true,            // ✅ Has tour
    workspace: true,           // ✅ Has tour
    support: true              // ✅ Has tour
  },

  // MARKETING HEAD ROLE - 12 pages
  'marketing-head': {
    dashboard: true,           // ✅ Has tour
    analytics: true,           // ✅ Has tour
    campaigns: true,           // ✅ Has tour
    leads: true,               // ✅ Has tour
    resources: true,           // ✅ Has tour
    communication: true,       // ✅ Has tour
    training: true,            // ✅ Has tour
    content: true,             // ✅ Has tour
    social: true,              // ✅ Has tour
    events: true,              // ✅ Has tour
    budget: true,              // ✅ Has tour
    team: true,                // ✅ Has tour
    settings: true,            // ✅ Has tour
    workspace: true,           // ✅ Has tour
    support: true              // ✅ Has tour
  },

  // ADMISSION HEAD ROLE - 13 pages
  'admission-head': {
    dashboard: true,           // ✅ Has tour
    leads: true,               // ✅ Has tour
    applications: true,        // ✅ Has tour
    schedule: true,            // ✅ Has tour
    communication: true,       // ✅ Has tour
    payments: true,            // ✅ Has tour
    documents: true,           // ✅ Has tour
    search: true,              // ✅ Has tour
    tools: true,               // ✅ Has tour
    workspace: true,           // ✅ Has tour
    'lead-transfer': true,     // ✅ Has tour
    courses: true,             // ✅ Has tour
    training: true,            // ✅ Has tour
    compliance: true,          // ✅ Has tour
    support: true              // ✅ Has tour
  }
};

// Helper function to check if a page has a tour
export const hasTour = (role, page) => {
  return tourRegistry[role]?.[page] || false;
};

// Helper function to get all available tours for a role
export const getAvailableTours = (role) => {
  return Object.keys(tourRegistry[role] || {}).filter(page => tourRegistry[role][page]);
};

// Helper function to get tour status for smart button behavior
export const getTourStatus = (role, page) => {
  if (hasTour(role, page)) {
    return {
      available: true,
      text: 'Start Tour',
      icon: '⭐',
      action: 'start'
    };
  } else {
    return {
      available: false,
      text: 'Tour Coming Soon',
      icon: '🚧',
      action: 'coming-soon'
    };
  }
}; 