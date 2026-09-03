# 💰 Dompet Aman - Personal Finance Web App

Aplikasi personal finance modern yang membantu pengguna menjawab satu pertanyaan utama:

> **"Berapa uang yang sebenarnya aman untuk aku habiskan hari ini?"**

## 🎯 Fitur Utama

### 1. **Dashboard Intuitif**
- Greeting personal untuk setiap pengguna
- Hero card yang menampilkan "Uang Aman" dengan format besar dan mudah dibaca
- Daily budget dengan progress tracker
- Status indicator (🟢 Aman / 🟡 Perhatian / 🔴 Berisiko)

### 2. **Quick Actions**
- ➕ Tambah Pengeluaran
- 🧾 Scan Struk (AI Receipt Scanner)
- 🛒 Bisa Beli? (Purchase Decision Helper)

### 3. **Manajemen Transaksi**
- Catat pengeluaran dan pemasukan
- Kategori terintegrasi (Makanan, Transportasi, Rumah, dll)
- Filter berdasarkan tipe dan kategori
- Grouping by date

### 4. **AI Receipt Scanner** 🆕
- Foto atau upload struk belanja
- AI/OCR membaca dan mengekstrak informasi
- Review dan edit sebelum disimpan
- Breakdown by kategori otomatis
- Terintegrasi dengan AI Assistant

### 5. **Analisis Keuangan**
- Pie chart pengeluaran by kategori
- Insights otomatis (pengeluaran naik/turun, pola pengeluaran)
- Rekomendasi actionable

### 6. **Fitur "Bisa Beli?"**
- Input nama barang dan harga
- Analisis kemampuan membeli
- Simulasi dampak terhadap daily budget
- Rekomendasi tabungan

### 7. **Manajemen Tagihan & Target**
- Input tagihan rutin (listrik, internet, kos, dll)
- Target tabungan dengan progress tracking
- Wishlist untuk items yang ingin dibeli

### 8. **AI Assistant** 💬
- Chat untuk bertanya tentang keuangan
- Konteks dari data keuangan pengguna
- Tips dan rekomendasi otomatis

## 🏗️ Project Structure

```
dompet-aman/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home / Dashboard
│   │   ├── globals.css         # Global styles & Tailwind
│   │   ├── transactions/       # Transactions page
│   │   ├── analysis/           # Analysis page
│   │   ├── can-buy/            # Can I Buy? page
│   │   ├── scan-receipt/       # Receipt scanner page
│   │   ├── add-transaction/    # Add transaction form
│   │   └── profile/            # Profile & settings
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navigation.tsx  # Mobile bottom nav + desktop sidebar
│   │   ├── cards/
│   │   │   └── SafeToSpendCard.tsx
│   │   ├── sections/
│   │   │   ├── QuickActions.tsx
│   │   │   ├── FinancialSummary.tsx
│   │   │   └── RecentTransactions.tsx
│   │   └── pages/
│   │       └── Dashboard.tsx
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   │
│   ├── store/
│   │   └── finance.ts          # Zustand global state
│   │
│   ├── utils/
│   │   └── finance.ts          # Financial calculations
│   │
│   ├── lib/
│   │   └── demo-data.ts        # Demo/seed data
│   │
│   └── services/               # API services (future)
│
├── public/                     # Static assets
├── .eslintrc.json             # ESLint config
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
├── postcss.config.js          # PostCSS config
└── package.json               # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Safe**: Green (#22C55E - 🟢)
- **Warning**: Amber (#F59E0B - 🟡)
- **Danger**: Red (#EF4444 - 🔴)
- **Background**: Off-white (#F9FAFB)

### Typography
- **Font**: System stack (modern & clean)
- **Heading XL**: 2rem, bold
- **Heading MD**: 1.25rem, semibold
- **Body**: 1rem, regular
- **Small**: 0.875rem

### Components
- Rounded corners (12-24px)
- Minimal shadows (depth)
- Clear visual hierarchy
- Whitespace balanced
- Mobile-first responsive

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or use online editor)
- npm/yarn package manager
- Modern web browser

### Installation

1. **Open in VS Code**
   ```bash
   code .
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Visit `http://localhost:3000`
   - Demo user: Raka
   - Demo data: Loaded automatically

### Build for Production
```bash
npm run build
npm start
```

## 📊 Data Structure

### User
- ID, Name, Email, Phone, Avatar

### Transaction
- ID, User ID, Type (expense/income), Amount, Category, Date, Description

### Receipt (NEW)
- ID, User ID, Store Name, Date, Subtotal, Discount, Tax, Total
- Receipt Items (name, quantity, unit price, category)

### Bill
- ID, Name, Amount, Due Date, Recurring, Paid Status

### Savings Goal
- ID, Name, Target Amount, Current Amount, Target Date

### Wishlist
- ID, Item Name, Price, Category, Date Added, Status

## 💡 Key Formulas

### Safe to Spend
```
Uang Aman = Saldo - Tagihan Menunggu - Target Tabungan - Buffer
```

### Daily Budget
```
Budget Harian = Uang Aman / Hari sampai Gajian
```

### Adaptive Budget (if over budget)
```
Sisa Overspend / Hari Tersisa = Pengurangan Daily Budget
```

## 🔐 Security Notes

- Financial data stored in browser localStorage (demo)
- In production: Backend API with user authentication
- Never expose API keys in frontend
- Implement proper user authentication
- Use HTTPS for production

## 🤖 AI Features

### Receipt Scanning
- Vision API untuk OCR (placeholder untuk demo)
- Automatic item categorization
- Confidence scoring untuk extracted data

### AI Assistant (Tanya Dompet)
- Context-aware responses
- Uses financial data + transaction history
- Focus on budgeting, cash flow, daily spending
- No investment advice or high-risk recommendations

## 📱 Responsive Design

### Mobile (< 768px)
- Bottom navigation bar
- Full-width cards
- Optimized touch targets
- Vertical layout

### Desktop (≥ 768px)
- Left sidebar navigation
- Grid layouts where appropriate
- Max-width containers
- Horizontal layout option

## 🧪 Testing

Currently using demo data. To test:

1. **Dashboard Calculations**
   - Check: Safe to Spend = 1.8M (3.5M - 1M - 0.5M - 0.2M)
   - Check: Daily Budget = 100K (1.8M / 18 days)

2. **Transaction Flow**
   - Today spent: 80K
   - Status: 🟢 Safe (80K < 100K)

3. **Over Budget Scenario**
   - If spent 120K (>100K)
   - Status: 🔴 Over by 20K
   - Adaptive budget activates

## 📈 Development Roadmap

### Phase 1 ✅
- [x] UI/UX foundation
- [x] Dashboard with calculations
- [x] Navigation system
- [x] Demo data

### Phase 2 (In Progress)
- [ ] Add Transaction form
- [ ] Receipt Scanner UI
- [ ] Can I Buy? feature
- [ ] Transactions page

### Phase 3
- [ ] Analysis page with charts
- [ ] AI Assistant integration
- [ ] Bills management
- [ ] Savings goals tracking

### Phase 4
- [ ] Backend API
- [ ] User authentication
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Real receipt OCR

### Phase 5
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Budget planning tools
- [ ] Multi-currency support

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Other Platforms
- Netlify
- Railway
- Render
- AWS/GCP/Azure

## 📝 Notes

- Demo user: Raka
- Demo balance: Rp3.500.000
- Next income: 18 days (September 19, 2026)
- Language: Indonesian

## 📞 Support

For questions or issues:
1. Check demo data structure
2. Review financial calculations
3. Test with browser dev tools

## 📄 License

MIT License - Feel free to use and modify

---

**Happy budgeting with Dompet Aman! 💚**
