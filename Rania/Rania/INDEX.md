<!-- DOMPET AMAN - PROJECT INDEX -->

# 🏠 Dompet Aman Project Index

Welcome to **Dompet Aman** - Personal Finance Web App with AI Receipt Scanner.

This document is your central reference for navigating the project.

---

## 📚 Documentation (Start Here)

### Quick Reference
1. **[QUICK_START.md](QUICK_START.md)** ⚡ - 5 minute quick start guide
2. **[README.md](README.md)** 📖 - Full project documentation
3. **[SETUP.md](SETUP.md)** 🔧 - Detailed setup instructions

### Development
4. **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** 📁 - Code organization & dependencies
5. **[ROADMAP.md](ROADMAP.md)** 🗺️ - Feature implementation plan
6. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ✨ - Setup completion summary
7. **[DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md)** ✅ - All tasks & progress

### Code Reference
8. **[src/DEVELOPMENT_REFERENCE.ts](src/DEVELOPMENT_REFERENCE.ts)** 💡 - Code structure reference

---

## 🚀 Getting Started (3 Steps)

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Open
```
http://localhost:3000
```

**Demo User**: Raka | **Balance**: Rp3.500.000

---

## 📁 Project Structure

```
dompet-aman/
├── 📄 Documentation
│   ├── README.md                    Full docs
│   ├── QUICK_START.md              Quick guide
│   ├── SETUP.md                    Setup instructions
│   ├── ROADMAP.md                  Feature plan
│   ├── FILE_STRUCTURE.md           Code organization
│   ├── PROJECT_SUMMARY.md          Setup summary
│   └── DEVELOPMENT_CHECKLIST.md    Tasks & progress
│
├── ⚙️ Configuration
│   ├── package.json                Dependencies
│   ├── tsconfig.json               TypeScript config
│   ├── tailwind.config.ts          Tailwind theme
│   ├── next.config.js              Next.js config
│   ├── postcss.config.js           PostCSS config
│   ├── .eslintrc.json              ESLint rules
│   └── .env.example                Env template
│
└── 📦 Source Code (src/)
    ├── 🎨 app/                     Pages & routes
    │   ├── page.tsx                 Dashboard (home)
    │   ├── layout.tsx               Root layout
    │   ├── globals.css              Global styles
    │   └── [feature]/page.tsx       Feature pages
    │
    ├── 🧩 components/              React components
    │   ├── layout/
    │   │   └── Navigation.tsx       Nav bar/sidebar
    │   ├── cards/
    │   │   └── SafeToSpendCard.tsx Main hero card
    │   ├── sections/
    │   │   ├── QuickActions.tsx     3 main buttons
    │   │   ├── FinancialSummary.tsx Summary cards
    │   │   └── RecentTransactions.tsx Transaction list
    │   └── pages/
    │       └── Dashboard.tsx        Dashboard logic
    │
    ├── 📊 types/                    TypeScript types
    │   └── index.ts                 All interfaces
    │
    ├── 🔧 utils/                    Utilities
    │   └── finance.ts              Financial calculations
    │
    ├── 🎪 store/                    Global state
    │   └── finance.ts              Zustand store
    │
    ├── 🪝 hooks/                    Custom hooks
    │   └── index.ts                7 custom hooks
    │
    ├── 📚 lib/                      Library
    │   ├── constants.ts            Constants
    │   └── demo-data.ts            Demo user & data
    │
    └── 💡 DEVELOPMENT_REFERENCE.ts Code reference
```

---

## 🎯 Key Files Quick Links

### Pages (Routes)
| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | ✅ Complete |
| `/transactions` | `src/app/transactions/page.tsx` | ⏳ Placeholder |
| `/analysis` | `src/app/analysis/page.tsx` | ⏳ Placeholder |
| `/can-buy` | `src/app/can-buy/page.tsx` | ⏳ Placeholder |
| `/scan-receipt` | `src/app/scan-receipt/page.tsx` | ⏳ Placeholder |
| `/add-transaction` | `src/app/add-transaction/page.tsx` | ⏳ Placeholder |
| `/profile` | `src/app/profile/page.tsx` | ⏳ Placeholder |

### Components
| Name | File | Purpose |
|------|------|---------|
| Navigation | `src/components/layout/Navigation.tsx` | Mobile nav + desktop sidebar |
| Dashboard | `src/components/pages/Dashboard.tsx` | Main dashboard logic |
| SafeToSpendCard | `src/components/cards/SafeToSpendCard.tsx` | Hero card with budget |
| QuickActions | `src/components/sections/QuickActions.tsx` | 3 main buttons |
| FinancialSummary | `src/components/sections/FinancialSummary.tsx` | Summary cards |
| RecentTransactions | `src/components/sections/RecentTransactions.tsx` | Transaction list |

### Utilities & Logic
| Name | File | Purpose |
|------|------|---------|
| Finance Utils | `src/utils/finance.ts` | All calculations |
| Finance Store | `src/store/finance.ts` | Zustand state |
| Custom Hooks | `src/hooks/index.ts` | 7 reusable hooks |
| Types | `src/types/index.ts` | TypeScript interfaces |
| Demo Data | `src/lib/demo-data.ts` | Sample data |
| Constants | `src/lib/constants.ts` | App constants |

---

## 💰 Current Demo Data

### User
- **Name**: Raka
- **Email**: raka@example.com
- **Phone**: +62 812 3456 7890

### Financial Status
- **Balance**: Rp3.500.000
- **Next Income**: 18 days (Sept 19, 2026)
- **Unpaid Bills**: Rp1.000.000
- **Savings Goal**: Rp500.000
- **Safety Buffer**: Rp200.000

### Calculations
- **Safe to Spend**: Rp1.800.000 ✅
- **Daily Budget**: Rp100.000 ✅
- **Today Spent**: Rp80.000 (from demo)
- **Status**: 🟢 SAFE ✅

### Demo Transactions (8)
- 3 expenses today
- 2 expenses yesterday
- 2 expenses from Aug 25-28
- 1 income from Aug 18

---

## 📖 Documentation Map

### For Beginners
1. Read **QUICK_START.md** (5 minutes)
2. Run `npm install` and `npm run dev`
3. Open browser and explore dashboard
4. Check **README.md** for details

### For Development
1. Read **FILE_STRUCTURE.md** (understand code organization)
2. Review **ROADMAP.md** (feature plan)
3. Check **DEVELOPMENT_REFERENCE.ts** (code patterns)
4. Use **DEVELOPMENT_CHECKLIST.md** (track progress)

### For Implementation
1. Pick feature from **ROADMAP.md**
2. Create files in appropriate folder
3. Import types from `src/types/`
4. Use utilities from `src/utils/`
5. Update Zustand store if needed
6. Test and commit

---

## 🔧 Commands Reference

### Development
```bash
npm run dev         # Start dev server (localhost:3000)
npm run build       # Build for production
npm start           # Run production build
npm run type-check  # Check TypeScript
npm run lint        # Run ESLint
```

### Project Management
```bash
# Install dependencies
npm install

# Clean install
rm -rf node_modules package-lock.json
npm install

# Check for issues
npm run type-check
npm run lint
```

---

## 🎨 Design System

### Colors
- 🟢 **Safe**: `#22C55E` (Green)
- 🟡 **Warning**: `#F59E0B` (Amber)
- 🔴 **Danger**: `#EF4444` (Red)
- 🔵 **Primary**: `#3B82F6` (Blue)
- ⚪ **Background**: `#F9FAFB` (Off-white)

### Styling
- **Framework**: Tailwind CSS
- **Config**: `tailwind.config.ts`
- **Global Styles**: `src/app/globals.css`
- **Components**: Utility classes (no CSS-in-JS)

### Layout
- **Mobile**: 375px - 767px (bottom nav)
- **Tablet**: 768px - 1023px (sidebar appears)
- **Desktop**: 1024px+ (full sidebar)

---

## 📊 Feature Status

### Phase 1: Foundation ✅ COMPLETE
- [x] Project setup
- [x] Design system
- [x] Dashboard UI
- [x] Navigation system
- [x] Financial calculations
- [x] Demo data

### Phase 2: Core Features (Next)
- [ ] Add transaction form
- [ ] Transactions list
- [ ] Receipt scanner UI
- [ ] Can I Buy feature

### Phase 3: Analytics
- [ ] Analysis page
- [ ] Bills management
- [ ] Goals tracking

### Phase 4: AI
- [ ] Chat assistant
- [ ] Post-receipt analysis

### Phase 5: Backend
- [ ] Backend API
- [ ] User authentication
- [ ] Database
- [ ] Real OCR

---

## 🚀 Next Steps

1. **Run the project**: `npm run dev`
2. **Explore dashboard**: Open `http://localhost:3000`
3. **Check structure**: Read `FILE_STRUCTURE.md`
4. **Pick next feature**: See `ROADMAP.md`
5. **Start coding**: Follow `DEVELOPMENT_CHECKLIST.md`

---

## 💡 Tips & Tricks

### Adding a New Page
```bash
# 1. Create folder
mkdir src/app/new-feature

# 2. Create page
echo "page.tsx" > src/app/new-feature/page.tsx

# 3. Add to navigation
# Edit: src/components/layout/Navigation.tsx

# 4. Implement component
```

### Adding a New Component
```bash
# 1. Create file in appropriate folder
# src/components/[type]/NewComponent.tsx

# 2. Import types
import { YourType } from "@/types"

# 3. Use utilities
import { calculateSafeToSpend } from "@/utils/finance"

# 4. Export component
export default function NewComponent() { ... }
```

### Using the Store
```typescript
import { useFinanceStore } from "@/store/finance"

export function MyComponent() {
  const { user, transactions, addTransaction } = useFinanceStore()
  
  // Use store data and actions
}
```

### Using Calculations
```typescript
import {
  calculateSafeToSpend,
  calculateDailyBudget,
  getTodayExpenses,
  formatCurrency,
} from "@/utils/finance"

const safe = calculateSafeToSpend(balance, bills, savings, buffer)
const budget = calculateDailyBudget(safe, days)
const spent = getTodayExpenses(transactions)
const formatted = formatCurrency(amount)
```

---

## 📱 Responsive Design Test

### Mobile (375px)
```
✓ Bottom navigation visible
✓ Full-width cards
✓ Single column layout
✓ Large touch targets
```

### Tablet (768px)
```
✓ Sidebar appears
✓ Grid layouts work
✓ Proper spacing
```

### Desktop (1920px)
```
✓ Sidebar fixed
✓ Multi-column grids
✓ Max-width containers
```

---

## 🔗 External Resources

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Tools
- [Node.js](https://nodejs.org)
- [VS Code](https://code.visualstudio.com)
- [GitHub Desktop](https://desktop.github.com)

---

## ❓ FAQ

### Q: How do I run the project?
A: Execute `npm install` then `npm run dev`, open `http://localhost:3000`

### Q: Where's the demo data?
A: See `src/lib/demo-data.ts` - it's loaded automatically on first visit

### Q: How do I add a new feature?
A: Check `ROADMAP.md` for the plan, then follow `DEVELOPMENT_CHECKLIST.md`

### Q: Where are calculations done?
A: All in `src/utils/finance.ts` - see formula comments there

### Q: How's state managed?
A: Zustand store in `src/store/finance.ts` - data saved to localStorage

### Q: Can I customize the theme?
A: Yes, edit `tailwind.config.ts` for colors and spacing

---

## 📞 Support

### Documentation First
1. Check the relevant markdown file
2. Read code comments
3. Review examples

### Code Exploration
1. Check similar components
2. Review utility functions
3. Look at types/interfaces

### Resources
- **DEVELOPMENT_REFERENCE.ts** - Quick code lookup
- **FILE_STRUCTURE.md** - Where things are
- **ROADMAP.md** - What's coming next

---

## 📝 Important Files Checklist

Document tracking:
- ✅ README.md - Project overview
- ✅ QUICK_START.md - Quick reference
- ✅ SETUP.md - Setup guide
- ✅ ROADMAP.md - Feature plan
- ✅ FILE_STRUCTURE.md - Code organization
- ✅ PROJECT_SUMMARY.md - Setup summary
- ✅ DEVELOPMENT_CHECKLIST.md - Task tracking
- ✅ DEVELOPMENT_REFERENCE.ts - Code reference
- ✅ INDEX.md - This file!

---

## 🎯 Project Goals

**Primary Goal**: Build a personal finance app that answers:
> "Berapa uang yang aman untuk aku habiskan hari ini?"

**Core Values**:
- 💚 Simple and intuitive
- ⚡ Fast and responsive
- 📱 Mobile-first design
- 🤖 AI-powered insights
- 🔒 User data privacy

---

## ✨ Current State

```
Status:       🟢 Phase 1 Complete
Progress:     Foundation Ready
Next Task:    Phase 2 Features
Estimated:    5-7 days
Goal:         All core features in 6 weeks
```

---

## 🎓 Learning Path

1. **Beginner**: QUICK_START.md → README.md
2. **Developer**: FILE_STRUCTURE.md → DEVELOPMENT_REFERENCE.ts
3. **Architect**: ROADMAP.md → DEVELOPMENT_CHECKLIST.md
4. **Master**: All files + source code deep dive

---

## 💼 Project Stats

| Metric | Value |
|--------|-------|
| Files Created | 35+ |
| Lines of Code | ~2,000 |
| Components | 4 |
| Pages | 7 |
| Types | 10+ |
| Hooks | 7 |
| Config Files | 10 |
| Documentation | 8 files |

---

## 🎉 Ready to Start?

1. Open terminal
2. Run `npm install && npm run dev`
3. Open browser
4. Explore dashboard
5. Read documentation
6. Build features!

**Happy coding! Let's make Dompet Aman awesome! 🚀**

---

**Version**: 0.1.0  
**Last Updated**: September 1, 2026  
**Status**: Foundation Complete ✅

---

*This index is your central reference. Bookmark it!*
