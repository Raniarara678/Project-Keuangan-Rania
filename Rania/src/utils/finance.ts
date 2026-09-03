import { Transaction, Bill, SavingsGoal, FinancialSettings } from "@/types";

/**
 * Calculate safe amount to spend
 * Formula: Balance - Unpaid Bills - Safety Buffer - Savings Buffer
 */
export function calculateSafeToSpend(
  balance: number,
  unpaidBills: number,
  savingsRequired: number,
  buffer: number
): number {
  return Math.max(0, balance - unpaidBills - savingsRequired - buffer);
}

/**
 * Calculate daily budget based on days until next income
 */
export function calculateDailyBudget(
  safeToSpend: number,
  daysUntilIncome: number
): number {
  if (daysUntilIncome <= 0) return 0;
  return Math.floor(safeToSpend / daysUntilIncome);
}

/**
 * Get days remaining until next income date
 */
export function getDaysUntilNextIncome(nextIncomeDate: Date): number {
  const now = new Date();
  const diffTime = nextIncomeDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Calculate total expenses for today
 */
export function getTodayExpenses(transactions: Transaction[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      txDate.setHours(0, 0, 0, 0);
      return t.type === "expense" && txDate.getTime() === today.getTime();
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate total expenses for current month
 */
export function getMonthlyExpenses(transactions: Transaction[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      return (
        t.type === "expense" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate total income for current month
 */
export function getMonthlyIncome(transactions: Transaction[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      return (
        t.type === "income" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate total unpaid bills
 */
export function getTotalUnpaidBills(bills: Bill[]): number {
  return bills.filter((b) => !b.isPaid).reduce((sum, b) => sum + b.amount, 0);
}

/**
 * Calculate savings needed this month for goals
 */
export function calculateSavingsNeeded(goals: SavingsGoal[]): number {
  const now = new Date();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysRemaining = Math.max(
    1,
    Math.ceil((monthEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  const totalNeeded = goals.reduce((sum, goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (remaining <= 0) return sum;

    const goalDaysLeft = Math.ceil(
      (new Date(goal.targetDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (goalDaysLeft <= 0) return sum + remaining;

    // Allocate proportionally based on time remaining
    return sum + remaining / goalDaysLeft;
  }, 0);

  return Math.ceil(totalNeeded);
}

/**
 * Get status indicator (safe/warning/danger) based on remaining budget
 */
export function getBudgetStatus(spent: number, allowed: number): "safe" | "warning" | "danger" {
  const percentUsed = (spent / allowed) * 100;

  if (percentUsed > 100) return "danger";
  if (percentUsed > 80) return "warning";
  return "safe";
}

/**
 * Format currency to IDR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Get category emoji
 */
export function getCategoryEmoji(category: string): string {
  const emojis: { [key: string]: string } = {
    food: "🍜",
    transportation: "🚗",
    housing: "🏠",
    bills: "💳",
    shopping: "🛍️",
    entertainment: "🎮",
    health: "💊",
    education: "📚",
    other: "📦",
  };
  return emojis[category] || "📦";
}

/**
 * Check if purchase is affordable based on current budget
 */
export function canAffordPurchase(
  purchaseAmount: number,
  safeToSpend: number,
  dailyBudget: number,
  daysUntilIncome: number
): {
  status: "safe" | "caution" | "risky";
  message: string;
  newDailyBudget?: number;
} {
  if (purchaseAmount <= safeToSpend) {
    return {
      status: "safe",
      message: "Kamu masih bisa membeli ini tanpa mengganggu kebutuhan wajib dan target tabunganmu.",
    };
  }

  const deficit = purchaseAmount - safeToSpend;
  const adjustedDailyBudget = (safeToSpend - purchaseAmount) / daysUntilIncome;

  if (adjustedDailyBudget > 0) {
    return {
      status: "caution",
      message: `Setelah membeli ini, budget harianmu turun dari ${formatCurrency(dailyBudget)} menjadi ${formatCurrency(Math.floor(adjustedDailyBudget))} selama ${daysUntilIncome} hari.`,
      newDailyBudget: Math.floor(adjustedDailyBudget),
    };
  }

  return {
    status: "risky",
    message:
      "Pembelian ini akan membuat kebutuhan wajib atau target tabunganmu berisiko tidak terpenuhi.",
  };
}
