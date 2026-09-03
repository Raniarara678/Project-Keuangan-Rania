# 🗺️ Dompet Aman - Implementation Roadmap

## Current Phase: FOUNDATION ✅ COMPLETE

### What's Been Built
- ✅ Next.js 14 project structure
- ✅ TypeScript & Tailwind setup
- ✅ Dashboard with Zustand state
- ✅ Financial calculations engine
- ✅ Demo data & responsive UI
- ✅ Navigation system
- ✅ 7 page routes

**Total**: ~2000 lines of code

---

## Phase 2: CORE FEATURES (Next Priority)

### 1. Add Transaction Form ✏️
**Files**: `src/components/forms/AddTransactionForm.tsx`

**Features**:
- [ ] Input form with fields:
  - Amount (number input with Rp formatting)
  - Category dropdown
  - Date picker
  - Description
  - Type toggle (expense/income)
- [ ] Form validation
- [ ] Submit to store & localStorage
- [ ] Success toast notification
- [ ] Auto-update dashboard

**Implementation Time**: 1-2 hours

---

### 2. Transactions Page 📝
**Files**: `src/app/transactions/page.tsx`

**Features**:
- [ ] List all transactions
- [ ] Group by date
- [ ] Filter options:
  - All / Expense / Income
  - By category
  - By date range
- [ ] Search functionality
- [ ] Delete transaction
- [ ] Edit transaction
- [ ] Empty state

**Implementation Time**: 2-3 hours

---

### 3. Receipt Scanner (MVP) 🧾
**Files**:
- `src/app/scan-receipt/page.tsx`
- `src/components/forms/ScanReceiptForm.tsx`
- `src/services/receipt.ts`

**User Flow**:
```
1. Upload/Capture Image
   ↓
2. Show loading (Reading receipt...)
   ↓
3. Display extracted data
   ↓
4. Review & edit items
   ↓
5. Confirm & save
   ↓
6. Show receipt insight
```

**Features**:
- [ ] Camera capture (mobile)
- [ ] File upload
- [ ] Image preview
- [ ] OCR extraction (mock initially)
- [ ] Review screen
- [ ] Item editor
- [ ] Save receipt
- [ ] Show budget impact

**Implementation Time**: 3-4 hours (mock), 6-8 hours (with real OCR)

**Mock OCR Response**:
```json
{
  "storeName": "Indomaret",
  "date": "2026-09-01",
  "total": 66500,
  "items": [
    {
      "name": "Indomie",
      "quantity": 3,
      "unitPrice": 4000,
      "category": "food"
    }
  ]
}
```

---

### 4. Can I Buy? Feature 🛒
**Files**:
- `src/app/can-buy/page.tsx`
- `src/components/forms/CanBuyForm.tsx`
- `src/components/sections/PurchaseAnalysis.tsx`

**User Flow**:
```
1. Input item name & price
   ↓
2. Calculate affordability
   ↓
3. Show status (🟢/🟡/🔴)
   ↓
4. Show simulation (before/after)
   ↓
5. Option to save to wishlist
```

**Features**:
- [ ] Item input form
- [ ] Price input with formatting
- [ ] Affordability calculation
- [ ] 3-level status output
- [ ] Before/after budget display
- [ ] Savings recommendation
- [ ] Add to wishlist button

**Implementation Time**: 1.5-2 hours

---

## Phase 3: ANALYTICS & INSIGHTS

### 1. Analysis Page 📊
**Files**: 
- `src/app/analysis/page.tsx`
- `src/components/charts/ExpenseChart.tsx`
- `src/components/sections/Insights.tsx`

**Features**:
- [ ] Pie/Donut chart by category
- [ ] Monthly total
- [ ] Category breakdown
- [ ] Auto-generated insights
- [ ] Comparison with previous month
- [ ] Trends and patterns

**Insights Examples**:
```
💡 Makanan naik 27% vs bulan lalu
💡 Pengeluaran terbesar: Makanan (35%)
💡 Kalau kurangi hiburan 200K, target tabungan tercapai
```

**Implementation Time**: 3-4 hours

---

### 2. Bills Management 💳
**Files**:
- `src/app/bills/page.tsx`
- `src/components/forms/AddBillForm.tsx`

**Features**:
- [ ] List all bills
- [ ] Add recurring bill
- [ ] Mark as paid/unpaid
- [ ] Due date indicator
- [ ] Impact on budget calculation
- [ ] Monthly bill summary

**Implementation Time**: 2-3 hours

---

### 3. Savings Goals 🏦
**Files**:
- `src/app/goals/page.tsx`
- `src/components/cards/GoalCard.tsx`

**Features**:
- [ ] Create goal
- [ ] Track progress
- [ ] Calculate needed savings/day
- [ ] Update progress
- [ ] Goal cards with progress bars
- [ ] Achievement notification

**Implementation Time**: 2 hours

---

## Phase 4: AI FEATURES

### 1. AI Assistant Chat 💬
**Files**:
- `src/components/sections/AIChatWidget.tsx`
- `src/services/ai.ts`

**Features**:
- [ ] Floating chat button
- [ ] Chat interface
- [ ] Context from financial data
- [ ] Response generation
- [ ] Sample questions

**Questions to support**:
- "Kenapa uangku cepat habis?"
- "Bulan ini aku boros nggak?"
- "Kalau aku beli X aman?"
- "Berapa yang harus aku tabung?"
- "Pengeluaran mana yang paling besar?"

**Implementation Time**: 4-6 hours (with API integration)

---

### 2. Post-Receipt AI Analysis 🧠
**Files**: Integration with existing AI Assistant

**Features**:
- [ ] "Ask AI about this receipt" button
- [ ] Quick question buttons
- [ ] Receipt context in chat
- [ ] Smart suggestions

---

## Phase 5: BACKEND & PRODUCTION

### 1. User Authentication 🔐
**Files**:
- Backend authentication routes
- NextAuth.js setup
- Protected routes

**Features**:
- [ ] Login page
- [ ] Register page
- [ ] Password reset
- [ ] Session management
- [ ] Protected routes

**Implementation Time**: 4-6 hours

---

### 2. Database Integration 🗄️
**Files**:
- Backend API routes
- Database schema
- ORM/Query builder

**Database Tables**:
- users
- transactions
- receipts
- receipt_items
- bills
- savings_goals
- wishlist_items

**Implementation Time**: 8-10 hours

---

### 3. Real OCR Integration 📸
**Files**:
- `src/services/receipt.ts` (actual API calls)
- Backend OCR processing

**Options**:
- Google Vision API
- Azure Computer Vision
- AWS Textract
- Tesseract.js (browser-based)

**Implementation Time**: 2-4 hours (per provider)

---

## Implementation Order Recommendation

### Week 1
1. ✅ Phase 1: Foundation (DONE)

### Week 2
2. Add Transaction Form (6-8 hours)
3. Transactions Page (6-8 hours)

### Week 3
4. Receipt Scanner MVP (8-10 hours)
5. Can I Buy? Feature (4-6 hours)

### Week 4
6. Analysis Page (8-10 hours)
7. Bills & Goals (6-8 hours)

### Week 5
8. AI Assistant (8-10 hours)

### Week 6-7
9. Backend Setup (12-16 hours)
10. Database Integration (12-16 hours)

### Week 8+
11. Real OCR Integration
12. Deployment & polishing

---

## Technology Stack

### Frontend ✅ DONE
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)

### Backend (To Add)
- Node.js/Express or Next.js API Routes
- PostgreSQL or MongoDB
- Prisma or Mongoose (ORM)
- NextAuth.js (auth)

### External APIs (To Integrate)
- OCR (Vision API / Azure / AWS)
- AI (OpenAI / Anthropic / Gemini)

### Deployment (To Add)
- Vercel (frontend)
- Railway/Render (backend)
- AWS/GCP (optional CDN)

---

## Estimated Timeline

| Phase | Features | Effort | Duration |
|-------|----------|--------|----------|
| 1 ✅ | Foundation | 30h | Done |
| 2 | Core Forms | 20h | 1 week |
| 3 | Analytics | 20h | 1 week |
| 4 | AI | 15h | 5 days |
| 5 | Backend | 40h | 2 weeks |
| **Total** | **Full App** | **125h** | **6 weeks** |

---

## Quick Feature Implementation Tips

### Add Transaction
1. Create form component
2. Add validation
3. Call store.addTransaction()
4. Trigger data update
5. Show success toast

### Receipt Scanner
1. Build upload UI
2. Add mock OCR response
3. Create review screen
4. Add item editor
5. Save as transaction

### Can I Buy
1. Build form
2. Calculate affordability
3. Show 3 status levels
4. Display before/after
5. Add wishlist option

### Analytics
1. Install recharts
2. Build pie chart
3. Extract expenses by category
4. Generate insights array
5. Display in UI

---

## Testing Checklist (For Each Feature)

- [ ] Desktop responsive (1920px, 1280px)
- [ ] Mobile responsive (375px, 768px)
- [ ] Dark mode (optional, can add later)
- [ ] Form validation
- [ ] Empty state
- [ ] Loading state
- [ ] Error handling
- [ ] localStorage persistence
- [ ] Touch interactions (mobile)
- [ ] Keyboard navigation

---

## Performance Goals

- [ ] Lighthouse score > 90
- [ ] First contentful paint < 1.5s
- [ ] Interactive < 2s
- [ ] Bundle size < 200KB (gzipped)
- [ ] Mobile fluid at 60fps

---

## Monitoring & Analytics (Future)

- [ ] Google Analytics
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] User behavior analysis

---

## Launch Checklist

- [ ] All features working
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Security audit
- [ ] Database backed up
- [ ] CI/CD pipeline
- [ ] Monitoring set up
- [ ] Documentation complete
- [ ] User guide prepared
- [ ] Support email ready

---

**Let's build Dompet Aman! 🚀**

Next task: Implement Add Transaction Form (Phase 2.1)
