// Route configuration for the app
export const ROUTES = {
  // Public routes - accessible to everyone
  PUBLIC: {
    WELCOME: "/",
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
    HOME: "/(tabs)/home",
    COURSES: "/(tabs)/courses",
    COURSE_DETAIL: "/course",
  },
  
  // Protected routes - require authentication
  PROTECTED: {
    PROFILE: "/(tabs)/profile",
    SCHEDULE: "/(tabs)/schedule",
    WATCH: "/(tabs)/watch",
  },
  
  // Auth routes - for login/register
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
  }
};

// Route groups for the ProtectedRoute hook
export const PUBLIC_PATHS = [
  ROUTES.PUBLIC.WELCOME,
  ROUTES.PUBLIC.HOME,
  ROUTES.PUBLIC.COURSES,
  ROUTES.PUBLIC.COURSE_DETAIL,
  "/(auth)", // All auth routes
];

export const PROTECTED_PATHS = [
  ROUTES.PROTECTED.PROFILE,
  ROUTES.PROTECTED.SCHEDULE,
  ROUTES.PROTECTED.WATCH,
];

// Default redirect paths
export const DEFAULT_LOGIN_PATH = ROUTES.AUTH.LOGIN;
export const DEFAULT_HOME_PATH = ROUTES.PUBLIC.HOME; 