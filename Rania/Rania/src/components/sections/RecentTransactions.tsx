"use client";

import Link from "next/link";
import { Transaction } from "@/types";
import { formatCurrency, getCategoryEmoji, formatDate } from "@/utils/finance";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-600 mb-3">Belum ada pengeluaran.</p>
        <p className="text-sm text-gray-500">
          Catat pengeluaran pertamamu supaya Dompet Aman bisa mulai membantumu.
        </p>
        <Link
          href="/add-transaction?type=expense"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Tambah Pengeluaran
        </Link>
      </div>
    );
  }

  // Group by date
  const groupedTransactions: { [key: string]: Transaction[] } = {};
  transactions.forEach((tx) => {
    const dateKey = formatDate(new Date(tx.date));
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    groupedTransactions[dateKey].push(tx);
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-md">📝 Transaksi Terbaru</h2>
        <Link
          href="/transactions"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedTransactions).map(([date, txs]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">{date}</h3>
            <div className="space-y-2">
              {txs.map((tx) => (
                <div
                  key={tx.id}
                  className="card p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">
                      {getCategoryEmoji(tx.category)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gray-500">{tx.category}</p>
                    </div>
                  </div>
                  <p
                    className={`currency font-semibold ml-2 ${
                      tx.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.type === "expense" ? "-" : "+"}
                    {formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
