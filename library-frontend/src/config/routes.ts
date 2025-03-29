const routes = {
  home: '/',
  login: '/(auth)/login',
  register: '/(auth)/register',
  dashboard: '/(dashboard)',
  books: '/(dashboard)/books',
  bookDetails: '/(dashboard)/books/[id]',
  profile: '/(dashboard)/profile',
  adminDashboard: '/(admin)/dashboard',
  adminUsers: '/(admin)/users',
};

export default routes;
