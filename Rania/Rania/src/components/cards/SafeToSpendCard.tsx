"use client";

import { formatCurrency } from "@/utils/finance";

interface SafeToSpendCardProps {
  safeToSpend: number;
  dailyBudget: number;
  todayExpenses: number;
  budgetStatus: "safe" | "warning" | "danger";
}

const statusConfig = {
  safe: {
    bg: "bg-safe-50",
    border: "border-safe-200",
    text: "text-safe-700",
    badge: "🟢",
    message: "Kamu masih aman hari ini.",
  },
  warning: {
    bg: "bg-warning-50",
    border: "border-warning-200",
    text: "text-warning-700",
    badge: "🟡",
    message: "Budget hari ini tinggal sedikit.",
  },
  danger: {
    bg: "bg-danger-50",
    border: "border-danger-200",
    text: "text-danger-700",
    badge: "🔴",
    message: "Kamu melewati budget hari ini.",
  },
};

export default function SafeToSpendCard({
  safeToSpend,
  dailyBudget,
  todayExpenses,
  budgetStatus,
}: SafeToSpendCardProps) {
  const config = statusConfig[budgetStatus];
  const remaining = dailyBudget - todayExpenses;

  return (
    <div className={`card-lg p-6 md:p-8 ${config.bg} border ${config.border}`}>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          💰 Uang Aman
        </h2>
        <p className="text-xs text-gray-500">
          Uang yang aman digunakan sampai gajian berikutnya
        </p>
      </div>

      {/* Large Amount */}
      <div className="mb-6">
        <p className="currency-lg text-3xl md:text-4xl">
          {formatCurrency(safeToSpend)}
        </p>
      </div>

      {/* Daily Budget Section */}
      <div className="bg-white rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            📋 Batas Aman Hari Ini
          </h3>
          <span className={`text-lg font-bold ${config.text}`}>
            {config.badge}
          </span>
        </div>

        <p className="currency text-xl md:text-2xl mb-1">
          {formatCurrency(dailyBudget)}
        </p>
        <p className="text-xs text-gray-500 mb-4">/hari</p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Pengeluaran hari ini</span>
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(todayExpenses)} / {formatCurrency(dailyBudget)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                budgetStatus === "safe"
                  ? "bg-safe-500"
                  : budgetStatus === "warning"
                    ? "bg-warning-500"
                    : "bg-danger-500"
              }`}
              style={{
                width: `${Math.min((todayExpenses / dailyBudget) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className={`${config.text} text-sm font-medium flex items-start gap-2`}>
        <span className="text-lg">{config.badge}</span>
        <div>
          <p>{config.message}</p>
          {remaining > 0 ? (
            <p className="text-xs mt-1 opacity-75">
              Sisa budget hari ini: {formatCurrency(remaining)}
            </p>
          ) : (
            <p className="text-xs mt-1 opacity-75">
              Over budget: {formatCurrency(Math.abs(remaining))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
