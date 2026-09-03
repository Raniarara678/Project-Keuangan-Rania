import { useEffect, useState } from "react";
import { useFinanceStore } from "@/store/finance";
import {
  Transaction,
  Bill,
  SavingsGoal,
  FinancialSettings,
  FinancialSummary,
} from "@/types";
import {
  calculateSafeToSpend,
  calculateDailyBudget,
  getDaysUntilNextIncome,
  getTodayExpenses,
  getTotalUnpaidBills,
  calculateSavingsNeeded,
  getMonthlyExpenses,
  getMonthlyIncome,
} from "@/utils/finance";

/**
 * Hook to get financial summary for dashboard
 */
export function useFinancialSummary(): FinancialSummary | null {
  const { settings } = useFinanceStore();
  const [summary, setSummary] = useState<FinancialSummary | null>(null);

  // Load transactions and bills from localStorage for now
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);

  useEffect(() => {
    const txData = localStorage.getItem("demo-transactions");
    const billData = localStorage.getItem("demo-bills");
    const goalData = localStorage.getItem("demo-savings-goals");

    if (txData) setTransactions(JSON.parse(txData));
    if (billData) setBills(JSON.parse(billData));
    if (goalData) setSavingsGoals(JSON.parse(goalData));
  }, []);

  useEffect(() => {
    if (!settings) return;

    const unpaidBills = getTotalUnpaidBills(bills);
    const savingsNeeded = calculateSavingsNeeded(savingsGoals);
    const safeToSpend = calculateSafeToSpend(
      settings.currentBalance,
      unpaidBills,
      savingsNeeded,
      settings.bufferAmount
    );
    const daysUntilIncome = getDaysUntilNextIncome(settings.nextIncomeDate);
    const dailyBudget = calculateDailyBudget(safeToSpend, daysUntilIncome);

    const now = new Date();
    const savingsProgress = savingsGoals.length
      ? (savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0) /
          savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0)) *
        100
      : 0;

    setSummary({
      currentBalance: settings.currentBalance,
      safeToSpend,
      dailyBudget,
      dailyBudgetRemaining: Math.max(0, dailyBudget - getTodayExpenses(transactions)),
      monthlyIncome: getMonthlyIncome(transactions),
      monthlyExpenses: getMonthlyExpenses(transactions),
      upcomingBills: unpaidBills,
      savingsProgress,
      daysUntilNextIncome: daysUntilIncome,
    });
  }, [settings, transactions, bills, savingsGoals]);

  return summary;
}

/**
 * Hook to filter transactions by category
 */
export function useTransactionsByCategory(
  transactions: Transaction[],
  category?: string
): Transaction[] {
  return transactions.filter((tx) => !category || tx.category === category);
}

/**
 * Hook to get transactions for a specific date range
 */
export function useTransactionsByDateRange(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] {
  return transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= startDate && txDate <= endDate;
  });
}

/**
 * Hook for managing localStorage with JSON serialization
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Hook to handle async data fetching
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setStatus("pending");
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus("success");
    } catch (error) {
      setError(error as Error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (immediate) execute();
  }, [immediate]);

  return { execute, status, value, error };
}

/**
 * Hook to debounce values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to detect if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
