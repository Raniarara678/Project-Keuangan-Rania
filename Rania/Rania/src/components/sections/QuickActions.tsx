"use client";

import Link from "next/link";
import { Plus, Receipt, ShoppingBag } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Add Expense */}
      <Link
        href="/add-transaction?type=expense"
        className="flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all active:scale-95"
      >
        <Plus size={20} />
        Tambah Pengeluaran
      </Link>

      {/* Scan Receipt */}
      <Link
        href="/scan-receipt"
        className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all active:scale-95"
      >
        <Receipt size={20} />
        Scan Struk
      </Link>

      {/* Can I Buy */}
      <Link
        href="/can-buy"
        className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all active:scale-95"
      >
        <ShoppingBag size={20} />
        Bisa Beli?
      </Link>
    </div>
  );
}
