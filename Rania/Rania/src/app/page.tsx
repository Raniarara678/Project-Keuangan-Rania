"use client";

import { useEffect } from "react";
import { useFinanceStore } from "@/store/finance";
import { DEMO_USER, DEMO_SETTINGS, DEMO_TRANSACTIONS, DEMO_BILLS, DEMO_SAVINGS_GOALS } from "@/lib/demo-data";
import Navigation from "@/components/layout/Navigation";
import Dashboard from "@/components/pages/Dashboard";

export default function Home() {
  const { setUser, setSettings, transactions, bills } = useFinanceStore();

  // Initialize demo data on mount
  useEffect(() => {
    setUser(DEMO_USER);
    setSettings(DEMO_SETTINGS);

    // This would typically come from an API, but for now we use localStorage
    const hasInitialized = localStorage.getItem("dompet-aman-initialized");
    if (!hasInitialized) {
      localStorage.setItem("demo-transactions", JSON.stringify(DEMO_TRANSACTIONS));
      localStorage.setItem("demo-bills", JSON.stringify(DEMO_BILLS));
      localStorage.setItem("demo-savings-goals", JSON.stringify(DEMO_SAVINGS_GOALS));
      localStorage.setItem("dompet-aman-initialized", "true");
    }
  }, [setUser, setSettings]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Dashboard />
      <Navigation />
    </div>
  );
}
