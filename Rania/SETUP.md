# 🚀 Dompet Aman - Setup Guide

Panduan lengkap untuk menjalankan aplikasi Dompet Aman di komputer Anda.

## Option 1: Local Development (Recommended)

### Persyaratan
- **Node.js** 18 atau lebih baru
- **npm** atau **yarn**
- **VS Code** (opsional tapi disarankan)

### Langkah-langkah

#### 1. Instalasi Node.js

**Windows:**
- Download dari https://nodejs.org/
- Pilih LTS version
- Jalankan installer dan ikuti instruksi
- Restart terminal/VS Code setelah instalasi

**Mac:**
```bash
# Menggunakan Homebrew
brew install node
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Verifikasi instalasi:**
```bash
node --version
npm --version
```

#### 2. Setup Project

```bash
# Navigate ke folder project
cd c:\Users\user\OneDrive\Desktop\Rania

# Install dependencies
npm install

# Tunggu proses instalasi selesai (1-3 menit)
```

#### 3. Jalankan Development Server

```bash
npm run dev
```

**Output:**
```
> dompet-aman@0.1.0 dev
> next dev

  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env

✓ Ready in 1.2s
```

#### 4. Buka di Browser

- **Desktop**: Buka http://localhost:3000
- **Mobile**: Gunakan IP address komputer Anda
  ```bash
  # Cek IP address
  ipconfig (Windows) atau ifconfig (Mac/Linux)
  # Contoh: http://192.168.1.100:3000
  ```

### Commands Penting

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm start

# Check untuk TypeScript errors
npm run type-check

# Run linter
npm run lint
```

### Troubleshooting

**Error: "node: command not found"**
- Pastikan Node.js sudah terinstall
- Restart terminal
- Verifikasi dengan `node --version`

**Error: "port 3000 already in use"**
```bash
# Kill process pada port 3000
# Windows: taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:3000 | xargs kill -9

# Atau gunakan port berbeda
npm run dev -- -p 3001
```

**Error: "npm install" stuck**
```bash
# Clear npm cache
npm cache clean --force

# Coba install ulang
rm -rf node_modules package-lock.json
npm install
```

---

## Option 2: Online Editors (No Installation)

Jika tidak ingin install Node.js, gunakan online editors:

### StackBlitz
1. Upload folder project ke StackBlitz
2. Buka `package.json` file
3. StackBlitz otomatis install dependencies
4. Aplikasi run langsung di browser

### GitHub + Vercel
1. Push project ke GitHub
2. Connect ke Vercel
3. Automatic deployment
4. Live URL generated

### Replit
1. Buat account di replit.com
2. Upload folder project
3. Run dalam browser

---

## Project Structure Reminder

```
Dompet Aman/
├── src/
│   ├── app/              # Pages & routes
│   ├── components/       # React components
│   ├── types/           # TypeScript types
│   ├── store/           # Global state (Zustand)
│   ├── utils/           # Utility functions
│   └── lib/             # Demo data
├── public/              # Static files
├── package.json         # Dependencies
└── README.md            # Project documentation
```

---

## Demo Data

Saat pertama kali membuka aplikasi:

**User:** Raka
- Saldo: Rp3.500.000
- Gajian: 18 hari dari sekarang
- Tagihan: Rp1.000.000
- Target Tabungan: Rp500.000
- Buffer: Rp200.000

**Hasil Kalkulasi:**
- Uang Aman: Rp1.800.000
- Daily Budget: Rp100.000/hari

Data disimpan di browser localStorage dan bisa diedit.

---

## Mengakses Features

### Dashboard (Home)
- URL: `/`
- Tampilkan: Safe-to-spend card, quick actions, summary

### Scan Struk
- URL: `/scan-receipt`
- Button: 🧾 Scan Receipt di dashboard

### Bisa Beli?
- URL: `/can-buy`
- Button: 🛒 Bisa Beli? di dashboard

### Transaksi
- URL: `/transactions`
- Button: 💳 Transaksi di navigation

### Analisis
- URL: `/analysis`
- Button: 📊 Analisis di navigation

### Profil
- URL: `/profile`
- Button: ⚙️ Profil di navigation

---

## Environment Variables (Untuk Nanti)

Buat file `.env.local` di root folder untuk API keys:

```env
# Receipt Scanner (Nanti)
NEXT_PUBLIC_OCR_API_KEY=your_key_here

# AI Assistant (Nanti)
NEXT_PUBLIC_AI_API_KEY=your_key_here

# Backend API (Nanti)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Jangan commit `.env.local` ke GitHub!**

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run dev server: `npm run dev`
3. ✅ Open browser: `http://localhost:3000`
4. Explore dashboard & features
5. Check browser console untuk debugging

---

## Performance Tips

- Clear browser cache jika ada issues
- Use incognito mode untuk test clean state
- Check Network tab di DevTools untuk API calls (nanti)
- Monitor console untuk warnings

---

## Code Editor Setup

### VS Code Extensions (Optional)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

---

## Need Help?

1. Check README.md untuk dokumentasi lengkap
2. Lihat demo data di `src/lib/demo-data.ts`
3. Review financial calculations di `src/utils/finance.ts`
4. Check component structure di `src/components/`

---

**Siap untuk mulai? Mari jalankan aplikasi! 🚀**
