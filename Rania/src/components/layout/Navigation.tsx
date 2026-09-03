"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  BarChart3,
  ShoppingBag,
  Settings,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/transactions", label: "Transaksi", icon: CreditCard },
    { href: "/analysis", label: "Analisis", icon: BarChart3 },
    { href: "/can-buy", label: "Bisa Beli?", icon: ShoppingBag },
    { href: "/profile", label: "Profil", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  isActive
                    ? "text-blue-600 border-t-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 z-40">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Dompet Aman</h1>
          <p className="text-xs text-gray-500 mt-1">Personal Finance</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Add padding for mobile to account for bottom nav */}
      <div className="md:hidden h-20" />
    </>
  );
}
