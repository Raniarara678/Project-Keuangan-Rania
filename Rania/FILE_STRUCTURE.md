# 📁 Dompet Aman - File Directory & Purpose

## Project Root Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS theme config |
| `postcss.config.js` | PostCSS plugins |
| `.eslintrc.json` | ESLint rules |
| `.gitignore` | Git ignore patterns |
| `.env.example` | Environment variables template |
| `README.md` | Project documentation |
| `SETUP.md` | Setup instructions |

---

## Source Code Structure (`src/`)

### `src/app/` - Pages & Routes

```
app/
├── layout.tsx                 # Root layout with metadata
├── page.tsx                   # Home/Dashboard page (Entry point)
├── globals.css               # Global styles & Tailwind directives
├── transactions/
│   └── page.tsx             # Transaction list page
├── analysis/
│   └── page.tsx             # Financial analysis page
├── can-buy/
│   └── page.tsx             # "Bisa Beli?" decision helper
├── scan-receipt/
│   └── page.tsx             # Receipt scanner page
├── add-transaction/
│   └── page.tsx             # Add transaction form
└── profile/
    └── page.tsx             # User profile & settings
```

### `src/components/` - React Components

```
components/
├── layout/
│   └── Navigation.tsx        # Mobile nav + desktop sidebar
├── cards/
│   └── SafeToSpendCard.tsx  # Main hero card with daily budget
├── sections/
│   ├── QuickActions.tsx      # Three main action buttons
│   ├── FinancialSummary.tsx  # Summary cards grid
│   └── RecentTransactions.tsx # Transaction list
└── pages/
    └── Dashboard.tsx         # Main dashboard component
```

### `src/types/` - TypeScript Types

```
types/
└── index.ts                  # All TypeScript interfaces:
                              # - User
                              # - FinancialSettings
                              # - Transaction
                              # - Receipt
                              # - Bill
                              # - SavingsGoal
                              # - WishlistItem
                              # - FinancialSummary
```

### `src/store/` - State Management

```
store/
└── finance.ts               # Zustand store with:
                             # - User state
                             # - Transactions
                             # - Receipts
                             # - Bills
                             # - Savings Goals
                             # - Wishlist
```

### `src/utils/` - Utility Functions

```
utils/
└── finance.ts              # Financial calculation functions:
                            # - calculateSafeToSpend()
                            # - calculateDailyBudget()
                            # - getTodayExpenses()
                            # - getMonthlyExpenses()
                            # - getTotalUnpaidBills()
                            # - calculateSavingsNeeded()
                            # - getBudgetStatus()
                            # - canAffordPurchase()
                            # - formatCurrency()
                            # - formatDate()
                            # - getCategoryEmoji()
```

### `src/lib/` - Library Files

```
lib/
├── demo-data.ts            # Demo user and sample data:
                            # - DEMO_USER (Raka)
                            # - DEMO_SETTINGS
                            # - DEMO_TRANSACTIONS
                            # - DEMO_BILLS
                            # - DEMO_SAVINGS_GOALS
└── constants.ts            # Application constants:
                            # - Category lists
                            # - Budget thresholds
                            # - Storage keys
                            # - API endpoints
```

### `src/hooks/` - Custom Hooks

```
hooks/
└── index.ts               # Custom React hooks:
                           # - useFinancialSummary()
                           # - useTransactionsByCategory()
                           # - useTransactionsByDateRange()
                           # - useLocalStorage()
                           # - useAsync()
                           # - useDebounce()
                           # - useIsMobile()
```

### `src/services/` - API Services (Future)

```
services/
├── auth.ts                # Authentication APIs
├── transactions.ts        # Transaction APIs
├── receipts.ts           # Receipt & OCR APIs
└── analytics.ts          # Analytics APIs
```

---

## File Dependencies Map

```
page.tsx (Home)
    ↓
Dashboard.tsx
    ├─ SafeToSpendCard.tsx
    │   └─ finance.ts (utils)
    ├─ QuickActions.tsx
    ├─ FinancialSummary.tsx
    ├─ RecentTransactions.tsx
    │   └─ finance.ts (utils)
    └─ Navigation.tsx

Navigation.tsx
    ├─ Used by all pages
    └─ Links to all routes
```

---

## How Data Flows

```
Demo Data (demo-data.ts)
    ↓
localStorage (client storage)
    ↓
Zustand Store (finance.ts)
    ↓
Components (read state)
    ↓
UI (rendered)
    ↓
User Interaction
    ↓
Store Actions (update state)
    ↓
localStorage (save)
```

---

## Asset Organization

### Public Files (`/public/`)
- (To be added as needed)
  - Logos
  - Icons
  - Images
  - Favicons

### Styles
- Global styles in `src/app/globals.css`
- Tailwind classes in components
- CSS-in-JS not needed (Tailwind handles everything)

---

## Size Overview

```
Total Files Created: 20+
- Configuration files: 10
- Page files: 7
- Component files: 4
- Type definitions: 1
- Store: 1
- Utilities: 1
- Library: 2
- Hooks: 1
- Docs: 2

Total Lines of Code: ~2000+
```

---

## Key File Relationships

### Authentication & User
- `Dashboard.tsx` → reads user from store
- `store/finance.ts` → manages user state
- `types/index.ts` → defines User interface

### Financial Calculations
- Components → import from `utils/finance.ts`
- Hooks → use utility functions
- Dashboard → passes calculated values to cards

### Data Management
- `demo-data.ts` → initial data
- `store/finance.ts` → manages state
- `hooks/index.ts` → provides data hooks
- Components → consume hooks/store

### Navigation
- `app/layout.tsx` → wraps all pages
- `Navigation.tsx` → renders on all pages
- Each page → independent route

---

## Adding New Features

### Add New Page
1. Create folder in `src/app/[feature]/`
2. Create `page.tsx` inside
3. Add navigation link in `Navigation.tsx`
4. Add route to constants if needed

### Add New Component
1. Create file in `src/components/[type]/`
2. Import types from `types/index.ts`
3. Use utility functions from `utils/finance.ts`
4. Use store from `store/finance.ts` if needed

### Add New Utility
1. Create function in `src/utils/[domain].ts`
2. Export from same file
3. Import in components as needed
4. Add unit tests (future)

### Add New Hook
1. Add to `src/hooks/index.ts`
2. Export from same file
3. Use in components: `const data = useYourHook()`

---

## Naming Conventions

### Files
- Components: PascalCase (`Dashboard.tsx`)
- Pages: lowercase (`page.tsx`)
- Utils: camelCase (`finance.ts`)
- Hooks: camelCase (`useFinancialSummary`)

### Components
- Export default for page components
- Named export for reusable components
- Props interface ends with `Props`

### Variables
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Component props: camelCase

---

## Import Paths

Using `@/` alias for cleaner imports:
```typescript
// Instead of:
import { useFinanceStore } from "../../../store/finance"

// Use:
import { useFinanceStore } from "@/store/finance"
```

---

## Next Files to Create

### Phase 2 (Forms & Features)
- `src/components/forms/AddTransactionForm.tsx`
- `src/components/forms/ScanReceiptForm.tsx`
- `src/components/forms/CanBuyForm.tsx`
- `src/services/receipt.ts` (OCR integration)

### Phase 3 (Analytics & AI)
- `src/components/charts/ExpenseChart.tsx`
- `src/components/sections/AIAssistant.tsx`
- `src/services/ai.ts` (AI integration)

### Phase 4 (Backend)
- Backend API routes in `pages/api/` (or Next.js Route Handlers in `src/app/api/`)
- `src/services/api.ts` (API client)
- Environment configuration

---

**Current Status**: ✅ Foundation Complete
**Next Task**: Implement Add Transaction form & features

---
