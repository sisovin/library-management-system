export const cachePolicies = {
  default: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 60, // 1 minute
  },
  books: {
    maxAge: 86400, // 1 day
    staleWhileRevalidate: 300, // 5 minutes
  },
  search: {
    maxAge: 600, // 10 minutes
    staleWhileRevalidate: 30, // 30 seconds
  },
};
