"use client";

import Navigation from "@/components/layout/Navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddTransactionPage() {
  return (
    <div className="md:ml-64 min-h-screen pb-24 md:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pt-4 pb-6 md:px-8 sticky top-0 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3 md:hidden"
        >
          <ArrowLeft size={20} />
          Kembali
        </Link>
        <h1 className="heading-lg">✏️ Tambah Transaksi</h1>
        <p className="text-gray-600 mt-2">Catat pengeluaran atau pemasukan</p>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6">
        <div className="card p-12 text-center">
          <p className="text-gray-600 text-lg mb-2">Fitur ini sedang dipersiapkan</p>
          <p className="text-gray-500">Form Tambah Transaksi akan segera tersedia</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
