import {
  User,
  Transaction,
  FinancialSettings,
  Bill,
  SavingsGoal,
} from "@/types";

// Demo User
export const DEMO_USER: User = {
  id: "user-1",
  name: "Raka",
  email: "raka@example.com",
  phoneNumber: "+62 812 3456 7890",
  avatar: undefined,
  createdAt: new Date("2024-08-01"),
};

// Demo Financial Settings
export const DEMO_SETTINGS: FinancialSettings = {
  userId: "user-1",
  currentBalance: 3500000,
  nextIncomeDate: new Date(new Date().getTime() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
  savingsGoal: 500000,
  bufferAmount: 200000,
  currency: "IDR",
};

// Demo Transactions
export const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    userId: "user-1",
    type: "expense",
    amount: 35000,
    category: "food",
    description: "Makan siang di warung",
    date: new Date(),
    createdAt: new Date(),
  },
  {
    id: "tx-2",
    userId: "user-1",
    type: "expense",
    amount: 20000,
    category: "transportation",
    description: "Ojek ke kantor",
    date: new Date(),
    createdAt: new Date(),
  },
  {
    id: "tx-3",
    userId: "user-1",
    type: "expense",
    amount: 25000,
    category: "food",
    description: "Kopi dan pastry",
    date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: "tx-4",
    userId: "user-1",
    type: "expense",
    amount: 120000,
    category: "shopping",
    description: "Beli keperluan harian",
    date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: "tx-5",
    userId: "user-1",
    type: "expense",
    amount: 50000,
    category: "entertainment",
    description: "Tiket bioskop",
    date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: "tx-6",
    userId: "user-1",
    type: "expense",
    amount: 85000,
    category: "food",
    description: "Makan malam dengan teman",
    date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: "tx-7",
    userId: "user-1",
    type: "income",
    amount: 5000000,
    category: "other",
    description: "Gaji bulan Agustus",
    date: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: "tx-8",
    userId: "user-1",
    type: "expense",
    amount: 45000,
    category: "shopping",
    description: "Beli kaos dan celana",
    date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
];

// Demo Bills
export const DEMO_BILLS: Bill[] = [
  {
    id: "bill-1",
    userId: "user-1",
    name: "Tagihan Listrik",
    amount: 400000,
    dueDate: 5,
    isRecurring: true,
    isPaid: true,
    createdAt: new Date(),
  },
  {
    id: "bill-2",
    userId: "user-1",
    name: "Internet",
    amount: 300000,
    dueDate: 10,
    isRecurring: true,
    isPaid: false,
    createdAt: new Date(),
  },
  {
    id: "bill-3",
    userId: "user-1",
    name: "Kos",
    amount: 1000000,
    dueDate: 1,
    isRecurring: true,
    isPaid: true,
    createdAt: new Date(),
  },
  {
    id: "bill-4",
    userId: "user-1",
    name: "Asuransi Kesehatan",
    amount: 300000,
    dueDate: 15,
    isRecurring: true,
    isPaid: false,
    createdAt: new Date(),
  },
];

// Demo Savings Goals
export const DEMO_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: "goal-1",
    userId: "user-1",
    name: "Dana Liburan",
    targetAmount: 3000000,
    currentAmount: 1200000,
    targetDate: new Date("2026-12-31"),
    category: "vacation",
    createdAt: new Date(),
  },
  {
    id: "goal-2",
    userId: "user-1",
    name: "Beli Laptop",
    targetAmount: 8000000,
    currentAmount: 2500000,
    targetDate: new Date("2026-12-31"),
    category: "gadgets",
    createdAt: new Date(),
  },
  {
    id: "goal-3",
    userId: "user-1",
    name: "Emergency Fund",
    targetAmount: 5000000,
    currentAmount: 3000000,
    targetDate: new Date("2027-06-30"),
    category: "emergency",
    createdAt: new Date(),
  },
];
