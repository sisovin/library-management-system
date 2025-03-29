export const SITE_CONFIG = {
  appName: "Library Management System",
  appDescription: "Manage your library efficiently and effectively.",
  appVersion: "1.0.0",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  contactEmail: "support@librarymanagementsystem.com",
  socialMedia: {
    twitter: "https://twitter.com/libraryms",
    facebook: "https://facebook.com/libraryms",
    instagram: "https://instagram.com/libraryms",
  },
  features: {
    enableBookSearch: true,
    enableUserProfiles: true,
    enableAdminDashboard: true,
  },
};
