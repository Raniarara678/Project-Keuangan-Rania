// Development Reference - Dompet Aman
// Quick lookup for components, utilities, and data structures

/**
 * PAGES ROUTING
 * 
 * Home:              /                    (Dashboard)
 * Transactions:      /transactions        (Transaction list)
 * Analysis:          /analysis            (Analytics & charts)
 * Can I Buy:         /can-buy             (Purchase decision)
 * Scan Receipt:      /scan-receipt        (Receipt scanner)
 * Add Transaction:   /add-transaction     (Add expense/income)
 * Profile:           /profile             (User settings)
 */

/**
 * MAIN COMPONENTS
 * 
 * Dashboard:         src/components/pages/Dashboard.tsx
 * Navigation:        src/components/layout/Navigation.tsx
 * SafeToSpendCard:   src/components/cards/SafeToSpendCard.tsx
 * QuickActions:      src/components/sections/QuickActions.tsx
 * FinancialSummary:  src/components/sections/FinancialSummary.tsx
 * RecentTransactions:src/components/sections/RecentTransactions.tsx
 */

/**
 * KEY UTILITIES
 * 
 * calculateSafeToSpend()      - Main financial calculation
 * calculateDailyBudget()      - Daily budget from safe amount
 * getTodayExpenses()          - Sum of today's expenses
 * getTotalUnpaidBills()       - Sum of unpaid bills
 * calculateSavingsNeeded()    - Monthly savings requirement
 * getBudgetStatus()           - Return 'safe' | 'warning' | 'danger'
 * canAffordPurchase()         - Check if purchase is affordable
 * formatCurrency()            - Format number to IDR
 * formatDate()                - Format date to Indonesian
 * getCategoryEmoji()          - Get emoji for expense category
 */

/**
 * EXPENSE CATEGORIES
 * 
 * 🍜 food           - Makanan
 * 🚗 transportation - Transportasi
 * 🏠 housing        - Rumah
 * 💳 bills          - Tagihan
 * 🛍️ shopping       - Belanja
 * 🎮 entertainment  - Hiburan
 * 💊 health         - Kesehatan
 * 📚 education      - Pendidikan
 * 📦 other          - Lainnya
 */

/**
 * DATA STRUCTURES
 * 
 * User {
 *   id, name, email, phoneNumber, avatar, createdAt
 * }
 * 
 * Transaction {
 *   id, userId, type, amount, category, description, date, receiptId, createdAt
 * }
 * 
 * Receipt {
 *   id, userId, storeName, storeAddress, transactionDate, 
 *   subtotal, discount, tax, total, paymentMethod, imageUrl, items, createdAt
 * }
 * 
 * Bill {
 *   id, userId, name, amount, dueDate, isRecurring, isPaid, createdAt
 * }
 * 
 * SavingsGoal {
 *   id, userId, name, targetAmount, currentAmount, targetDate, category, createdAt
 * }
 */

/**
 * ZUSTAND STORE ACTIONS
 * 
 * setUser(user)
 * setSettings(settings)
 * addTransaction(transaction)
 * removeTransaction(id)
 * addReceipt(receipt)
 * getReceiptById(id)
 * addBill(bill)
 * updateBill(id, bill)
 * addSavingsGoal(goal)
 * updateSavingsGoal(id, goal)
 * addWishlistItem(item)
 * removeWishlistItem(id)
 */

/**
 * CUSTOM HOOKS
 * 
 * useFinancialSummary()        - Get dashboard summary
 * useTransactionsByCategory()  - Filter by category
 * useTransactionsByDateRange() - Filter by date range
 * useLocalStorage()            - Persist to localStorage
 * useAsync()                   - Handle async operations
 * useDebounce()                - Debounce values
 * useIsMobile()                - Detect mobile device
 */

/**
 * STATUS INDICATORS
 * 
 * 🟢 SAFE    - 0-80% of daily budget used
 * 🟡 WARNING - 80-100% of daily budget used
 * 🔴 DANGER  - Over 100% of daily budget
 */

/**
 * DEMO DATA
 * 
 * User: Raka
 * Balance: Rp3.500.000
 * Next Income: 18 days from now
 * Unpaid Bills: Rp1.000.000
 * Savings Target: Rp500.000
 * Buffer: Rp200.000
 * 
 * Calculated Safe to Spend: Rp1.800.000
 * Calculated Daily Budget: Rp100.000
 */

/**
 * COLOR SYSTEM (Tailwind CSS)
 * 
 * Safe Green:    #22C55E (safe-500)
 * Warning Amber: #F59E0B (warning-500)
 * Danger Red:    #EF4444 (danger-500)
 * Primary Blue:  #3B82F6
 * Background:    #F9FAFB (slate-50)
 */

/**
 * STORAGE KEYS
 * 
 * demo-transactions
 * demo-bills
 * demo-savings-goals
 * dompet-aman-initialized
 */

/**
 * COMMON TASKS
 * 
 * Add new transaction:
 *   1. Call store.addTransaction(tx)
 *   2. Update localStorage
 *   3. Recalculate summary
 *   4. Show notification
 * 
 * Calculate budget status:
 *   1. Get today's expenses
 *   2. Get daily budget
 *   3. Call getBudgetStatus()
 *   4. Return emoji indicator
 * 
 * Create new page:
 *   1. mkdir src/app/[feature]
 *   2. Create page.tsx
 *   3. Import Navigation
 *   4. Add to nav links
 * 
 * Add new component:
 *   1. Create in src/components/[type]/
 *   2. Define props interface
 *   3. Import types from src/types/
 *   4. Use utilities from src/utils/
 */

/**
 * ENVIRONMENT VARIABLES
 * 
 * NEXT_PUBLIC_OCR_API_KEY    - For receipt scanning
 * NEXT_PUBLIC_AI_API_KEY     - For AI assistant
 * NEXT_PUBLIC_API_URL        - Backend API URL
 * DATABASE_URL               - Database connection
 * NEXTAUTH_SECRET            - Auth session secret
 */

/**
 * COMMANDS
 * 
 * npm install         - Install dependencies
 * npm run dev        - Start dev server (localhost:3000)
 * npm run build      - Build for production
 * npm start          - Run production build
 * npm run lint       - Run ESLint
 * npm run type-check - TypeScript check
 */

/**
 * FILE LOCATIONS BY FEATURE
 * 
 * Dashboard:
 *   - Components: src/components/cards/SafeToSpendCard.tsx
 *   - Components: src/components/sections/*.tsx
 *   - Page: src/app/page.tsx
 * 
 * Transactions:
 *   - Page: src/app/transactions/page.tsx
 *   - Form: (to be created)
 *   - Utils: src/utils/finance.ts
 * 
 * Receipt Scanner:
 *   - Page: src/app/scan-receipt/page.tsx
 *   - Form: (to be created)
 *   - Service: (to be created)
 * 
 * Analysis:
 *   - Page: src/app/analysis/page.tsx
 *   - Chart Components: (to be created)
 * 
 * State:
 *   - Store: src/store/finance.ts
 *   - Hooks: src/hooks/index.ts
 * 
 * Configuration:
 *   - Styles: src/app/globals.css
 *   - Theme: tailwind.config.ts
 *   - Types: src/types/index.ts
 */

/**
 * NEXT FEATURES TO BUILD (see ROADMAP.md)
 * 
 * Phase 2:
 *   - Add Transaction Form
 *   - Transactions Page
 *   - Receipt Scanner
 *   - Can I Buy Feature
 * 
 * Phase 3:
 *   - Analysis Page
 *   - Bills Management
 *   - Goals Tracking
 * 
 * Phase 4:
 *   - AI Assistant
 *   - Post-Receipt Analysis
 * 
 * Phase 5:
 *   - Backend Setup
 *   - User Authentication
 *   - Database
 *   - Real OCR
 */

export {};
