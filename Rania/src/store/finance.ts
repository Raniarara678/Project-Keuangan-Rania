import { create } from "zustand";
import {
  Transaction,
  FinancialSettings,
  Receipt,
  Bill,
  SavingsGoal,
  WishlistItem,
  User,
} from "@/types";

interface FinanceStore {
  // User
  user: User | null;
  setUser: (user: User) => void;

  // Settings
  settings: FinancialSettings | null;
  setSettings: (settings: FinancialSettings) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;

  // Receipts
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  getReceiptById: (id: string) => Receipt | undefined;

  // Bills
  bills: Bill[];
  addBill: (bill: Bill) => void;
  updateBill: (id: string, bill: Partial<Bill>) => void;

  // Savings Goals
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void;

  // Wishlist
  wishlistItems: WishlistItem[];
  addWishlistItem: (item: WishlistItem) => void;
  removeWishlistItem: (id: string) => void;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),

  // Settings
  settings: null,
  setSettings: (settings) => set({ settings }),

  // Transactions
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // Receipts
  receipts: [],
  addReceipt: (receipt) =>
    set((state) => ({
      receipts: [...state.receipts, receipt],
    })),
  getReceiptById: (id) => {
    const state = get();
    return state.receipts.find((r) => r.id === id);
  },

  // Bills
  bills: [],
  addBill: (bill) =>
    set((state) => ({
      bills: [...state.bills, bill],
    })),
  updateBill: (id, updatedBill) =>
    set((state) => ({
      bills: state.bills.map((b) => (b.id === id ? { ...b, ...updatedBill } : b)),
    })),

  // Savings Goals
  savingsGoals: [],
  addSavingsGoal: (goal) =>
    set((state) => ({
      savingsGoals: [...state.savingsGoals, goal],
    })),
  updateSavingsGoal: (id, updatedGoal) =>
    set((state) => ({
      savingsGoals: state.savingsGoals.map((g) =>
        g.id === id ? { ...g, ...updatedGoal } : g
      ),
    })),

  // Wishlist
  wishlistItems: [],
  addWishlistItem: (item) =>
    set((state) => ({
      wishlistItems: [...state.wishlistItems, item],
    })),
  removeWishlistItem: (id) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((w) => w.id !== id),
    })),
}));
