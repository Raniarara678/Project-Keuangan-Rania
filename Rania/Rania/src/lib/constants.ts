// Application constants

export const APP_NAME = "Dompet Aman";
export const APP_DESCRIPTION =
  "Personal Finance App - Tahu berapa uang yang aman untuk digunakan hari ini";
export const APP_VERSION = "0.1.0";

// Transaction Categories
export const EXPENSE_CATEGORIES = [
  { value: "food", label: "🍜 Makanan", emoji: "🍜" },
  { value: "transportation", label: "🚗 Transportasi", emoji: "🚗" },
  { value: "housing", label: "🏠 Rumah", emoji: "🏠" },
  { value: "bills", label: "💳 Tagihan", emoji: "💳" },
  { value: "shopping", label: "🛍️ Belanja", emoji: "🛍️" },
  { value: "entertainment", label: "🎮 Hiburan", emoji: "🎮" },
  { value: "health", label: "💊 Kesehatan", emoji: "💊" },
  { value: "education", label: "📚 Pendidikan", emoji: "📚" },
  { value: "other", label: "📦 Lainnya", emoji: "📦" },
];

export const INCOME_CATEGORIES = [
  { value: "salary", label: "💼 Gaji", emoji: "💼" },
  { value: "freelance", label: "💻 Freelance", emoji: "💻" },
  { value: "bonus", label: "🎁 Bonus", emoji: "🎁" },
  { value: "investment", label: "📈 Investasi", emoji: "📈" },
  { value: "other", label: "📦 Lainnya", emoji: "📦" },
];

// Budget thresholds
export const BUDGET_THRESHOLDS = {
  SAFE: 0.8, // 0-80% = safe
  WARNING: 0.8, // 80-100% = warning
  DANGER: 1.0, // >100% = danger
};

// Currency
export const DEFAULT_CURRENCY = "IDR";
export const CURRENCY_SYMBOL = "Rp";

// Date formats
export const DATE_FORMAT = "dd MMM yyyy";
export const DATE_TIME_FORMAT = "dd MMM yyyy HH:mm";
export const MONTH_YEAR_FORMAT = "MMMM yyyy";

// Storage keys
export const STORAGE_KEYS = {
  TRANSACTIONS: "dompet-aman-transactions",
  BILLS: "dompet-aman-bills",
  SAVINGS_GOALS: "dompet-aman-savings-goals",
  WISHLIST: "dompet-aman-wishlist",
  RECEIPTS: "dompet-aman-receipts",
  USER_SETTINGS: "dompet-aman-settings",
  INITIALIZED: "dompet-aman-initialized",
};

// API endpoints (for future backend)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
  },
  TRANSACTIONS: {
    LIST: "/api/transactions",
    CREATE: "/api/transactions",
    UPDATE: "/api/transactions/:id",
    DELETE: "/api/transactions/:id",
  },
  RECEIPTS: {
    LIST: "/api/receipts",
    CREATE: "/api/receipts",
    UPLOAD: "/api/receipts/upload",
    EXTRACT: "/api/receipts/extract",
  },
  BILLS: {
    LIST: "/api/bills",
    CREATE: "/api/bills",
    UPDATE: "/api/bills/:id",
  },
  GOALS: {
    LIST: "/api/savings-goals",
    CREATE: "/api/savings-goals",
    UPDATE: "/api/savings-goals/:id",
  },
};

// Validation rules
export const VALIDATION = {
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 9999999999,
  MIN_PASSWORD_LENGTH: 8,
  MAX_TRANSACTION_DESCRIPTION_LENGTH: 200,
};

// Default values
export const DEFAULTS = {
  DAYS_UNTIL_NEXT_INCOME: 30,
  BUFFER_AMOUNT: 200000,
  SAVINGS_PERCENTAGE: 0.1, // 10% of balance
};

// UI
export const UI = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
};
