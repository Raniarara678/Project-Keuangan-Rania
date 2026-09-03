"use client";

import { formatCurrency } from "@/utils/finance";

interface FinancialSummaryProps {
  balance: number;
  unpaidBills: number;
  savingsNeeded: number;
  buffer: number;
  daysUntilIncome: number;
  monthlyIncome: number;
}

export default function FinancialSummary({
  balance,
  unpaidBills,
  savingsNeeded,
  buffer,
  daysUntilIncome,
}: FinancialSummaryProps) {
  const summaryItems = [
    {
      label: "Saldo Sekarang",
      value: balance,
      icon: "💼",
      color: "bg-blue-50",
    },
    {
      label: "Tagihan Menunggu",
      value: unpaidBills,
      icon: "💳",
      color: "bg-red-50",
    },
    {
      label: "Target Tabungan",
      value: savingsNeeded,
      icon: "🏦",
      color: "bg-green-50",
    },
    {
      label: "Buffer Keamanan",
      value: buffer,
      icon: "🛡️",
      color: "bg-yellow-50",
    },
    {
      label: "Hari Menunggu",
      value: daysUntilIncome,
      icon: "📅",
      color: "bg-purple-50",
      isNumber: true,
    },
  ];

  return (
    <div>
      <h2 className="heading-md mb-4">📊 Ringkasan Keuangan</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className={`${item.color} card p-4 rounded-xl transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">{item.label}</p>
            <p className={`font-bold ${item.isNumber ? "text-lg" : "text-base"}`}>
              {item.isNumber ? item.value : formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
