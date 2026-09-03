"use client";

import { useEffect, useState } from "react";
import { useFinanceStore } from "@/store/finance";
import {
  calculateSafeToSpend,
  calculateDailyBudget,
  getDaysUntilNextIncome,
  getTodayExpenses,
  getTotalUnpaidBills,
  calculateSavingsNeeded,
  formatCurrency,
  getBudgetStatus,
} from "@/utils/finance";
import { Transaction, Bill, SavingsGoal, FinancialSettings } from "@/types";
import SafeToSpendCard from "@/components/cards/SafeToSpendCard";
import QuickActions from "@/components/sections/QuickActions";
import FinancialSummary from "@/components/sections/FinancialSummary";
import RecentTransactions from "@/components/sections/RecentTransactions";

export default function Dashboard() {
  const { user, settings } = useFinanceStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [financialData, setFinancialData] = useState({
    safeToSpend: 0,
    dailyBudget: 0,
    daysUntilIncome: 0,
    todayExpenses: 0,
    unpaidBills: 0,
    savingsNeeded: 0,
    budgetStatus: "safe" as const,
  });

  // Load data from localStorage (in production, this would be from API)
  useEffect(() => {
    const txData = localStorage.getItem("demo-transactions");
    const billData = localStorage.getItem("demo-bills");
    const goalData = localStorage.getItem("demo-savings-goals");

    if (txData) setTransactions(JSON.parse(txData));
    if (billData) setBills(JSON.parse(billData));
    if (goalData) setSavingsGoals(JSON.parse(goalData));
  }, []);

  // Calculate financial data
  useEffect(() => {
    if (!settings) return;

    const unpaid = getTotalUnpaidBills(bills);
    const savings = calculateSavingsNeeded(savingsGoals);
    const safe = calculateSafeToSpend(
      settings.currentBalance,
      unpaid,
      savings,
      settings.bufferAmount
    );
    const days = getDaysUntilNextIncome(settings.nextIncomeDate);
    const daily = calculateDailyBudget(safe, days);
    const today = getTodayExpenses(transactions);
    const status = getBudgetStatus(today, daily);

    setFinancialData({
      safeToSpend: safe,
      dailyBudget: daily,
      daysUntilIncome: days,
      todayExpenses: today,
      unpaidBills: unpaid,
      savingsNeeded: savings,
      budgetStatus: status,
    });
  }, [settings, transactions, bills, savingsGoals]);

  if (!user || !settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data keuanganmu...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="md:ml-64 pb-24 md:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pt-6 pb-8 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Halo, {user.name} 👋
        </h1>
        <p className="text-gray-600 mt-2">Yuk cek kondisi uangmu hari ini.</p>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-6 space-y-6">
        {/* Safe to Spend Card */}
        <SafeToSpendCard
          safeToSpend={financialData.safeToSpend}
          dailyBudget={financialData.dailyBudget}
          todayExpenses={financialData.todayExpenses}
          budgetStatus={financialData.budgetStatus}
        />

        {/* Quick Actions */}
        <QuickActions />

        {/* Financial Summary */}
        <FinancialSummary
          balance={settings.currentBalance}
          unpaidBills={financialData.unpaidBills}
          savingsNeeded={financialData.savingsNeeded}
          buffer={settings.bufferAmount}
          daysUntilIncome={financialData.daysUntilIncome}
          monthlyIncome={0} // Would be calculated from transactions
        />

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions.slice(0, 5)} />
      </div>
    </main>
  );
}
