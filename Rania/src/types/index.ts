// User and Financial Types
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
}

export interface FinancialSettings {
  userId: string;
  currentBalance: number;
  nextIncomeDate: Date;
  savingsGoal: number;
  bufferAmount: number;
  currency: "IDR";
}

// Transaction Types
export type TransactionType = "expense" | "income";
export type ExpenseCategory =
  | "food"
  | "transportation"
  | "housing"
  | "bills"
  | "shopping"
  | "entertainment"
  | "health"
  | "education"
  | "other";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  receiptId?: string;
  createdAt: Date;
}

// Receipt Types
export interface Receipt {
  id: string;
  userId: string;
  storeName: string;
  storeAddress?: string;
  transactionDate: Date;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod?: string;
  imageUrl?: string;
  items: ReceiptItem[];
  createdAt: Date;
}

export interface ReceiptItem {
  id: string;
  receiptId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: ExpenseCategory;
  createdAt: Date;
}

// Bill Types
export interface Bill {
  id: string;
  userId: string;
  name: string;
  amount: number;
  dueDate: number; // day of month
  isRecurring: boolean;
  isPaid: boolean;
  createdAt: Date;
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category?: string;
  createdAt: Date;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  itemName: string;
  price: number;
  category: ExpenseCategory;
  addedDate: Date;
  status: "pending" | "purchased";
}

// Daily Budget Types
export interface DailyBudget {
  userId: string;
  date: Date;
  allowance: number;
  spent: number;
  remaining: number;
  isOverBudget: boolean;
}

// Dashboard Summary
export interface FinancialSummary {
  currentBalance: number;
  safeToSpend: number;
  dailyBudget: number;
  dailyBudgetRemaining: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  upcomingBills: number;
  savingsProgress: number;
  daysUntilNextIncome: number;
}
