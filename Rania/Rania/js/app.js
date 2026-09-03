// Main Application Logic for Dompet Aman v2.0
// Enhanced SPA with complete features: income, expense, wishlist, and profile editing

const app = {
    // Current state
    currentPage: 'dashboard',
    user: null,
    settings: null,
    transactions: [],
    wishlist: [],
    
    // Initialize application
    init() {
        this.loadFromLocalStorage();
        this.render();
        this.setupEventListeners();
    },
    
    // Load data from localStorage
    loadFromLocalStorage() {
        try {
            this.user = JSON.parse(localStorage.getItem('user')) || null;
            this.settings = JSON.parse(localStorage.getItem('settings')) || null;
            this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    },
    
    // Save data to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('settings', JSON.stringify(this.settings));
            localStorage.setItem('transactions', JSON.stringify(this.transactions));
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    // Navigate to a page
    navigate(page) {
        this.currentPage = page;
        this.render();
    },
    
    // Main render function
    render() {
        this.hideAllPages();
        this.updateNavigation();
        this.updateSidebarUser();
        
        switch (this.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'income':
                this.renderIncome();
                break;
            case 'expense':
                this.renderExpense();
                break;
            case 'wishlist':
                this.renderWishlist();
                break;
            case 'analysis':
                this.renderAnalysis();
                break;
            case 'can-buy':
                this.renderCanBuy();
                break;
            case 'scan-receipt':
                this.renderScanReceipt();
                break;
            case 'profile':
                this.renderProfile();
                break;
            default:
                this.renderDashboard();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    },
    
    // Hide all pages
    hideAllPages() {
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('hidden');
        });
    },
    
    // Show specific page
    showPage(pageId) {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.remove('hidden');
        }
    },
    
    // Update navigation styling
    updateNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === this.currentPage) {
                item.classList.add('active');
            }
        });
        
        document.querySelectorAll('.nav-item-mobile').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === this.currentPage) {
                item.classList.add('active');
            }
        });
    },

    // Update sidebar user greeting
    updateSidebarUser() {
        const el = document.getElementById('sidebar-user');
        if (el && this.user) {
            el.textContent = `Halo, ${this.user.name}! 👋`;
        }
    },
    
    // Calculate financial summary
    getFinancialSummary() {
        const daysUntilIncome = getDaysUntilNextIncome(this.settings.nextIncomeDate);
        
        const safeToSpend = calculateSafeToSpend(
            this.settings.currentBalance,
            0, // No unpaid bills in this version
            this.settings.savingsGoal,
            this.settings.bufferAmount
        );
        
        const dailyBudget = calculateDailyBudget(safeToSpend, daysUntilIncome);
        const todayExpenses = getTodayExpenses(this.transactions);
        const budgetStatus = getBudgetStatus(todayExpenses, dailyBudget);
        const monthlyIncome = getMonthlyIncome(this.transactions);
        const monthlyExpense = getMonthlyExpenses(this.transactions);
        
        return {
            safeToSpend,
            dailyBudget,
            todayExpenses,
            budgetStatus,
            daysUntilIncome,
            monthlyIncome,
            monthlyExpense,
            monthlyRemaining: monthlyIncome - monthlyExpense
        };
    },
    
    // ==================== DASHBOARD PAGE ====================
    renderDashboard() {
        this.showPage('dashboard-page');
        
        const summary = this.getFinancialSummary();
        
        // Update greeting
        document.getElementById('greeting').textContent = `Halo, ${this.user.name} 👋`;
        
        // Update safe to spend card
        document.getElementById('safe-amount').textContent = formatCurrencyShort(summary.safeToSpend);
        document.getElementById('daily-budget').textContent = formatCurrencyShort(summary.dailyBudget);
        document.getElementById('spent-today').textContent = `Terpakai: ${formatCurrencyShort(summary.todayExpenses)}`;
        document.getElementById('remaining-today').textContent = `Sisa: ${formatCurrencyShort(Math.max(0, summary.dailyBudget - summary.todayExpenses))}`;
        
        // Update progress bar
        const percentage = getBudgetPercentage(summary.todayExpenses, summary.dailyBudget);
        document.getElementById('budget-bar').style.width = percentage + '%';
        
        // Update status badge
        const statusDisplay = getBudgetStatusDisplay(summary.budgetStatus);
        const statusBadge = document.getElementById('status-badge');
        statusBadge.className = `inline-block px-5 py-2 rounded-full text-sm font-bold bg-white/30 backdrop-blur border border-white/50 text-white`;
        statusBadge.textContent = `${statusDisplay.emoji} ${statusDisplay.label} - ${statusDisplay.label === 'Aman' ? 'Belanja dengan tenang!' : statusDisplay.label === 'Perhatian' ? 'Mulai batasi pengeluaran' : 'Hentikan pengeluaran!'}`;
        
        // Update safe-card background based on status
        const safeCard = document.getElementById('safe-card');
        if (summary.budgetStatus === 'safe') {
            safeCard.className = 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 rounded-3xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden';
        } else if (summary.budgetStatus === 'warning') {
            safeCard.className = 'bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden';
        } else {
            safeCard.className = 'bg-gradient-to-br from-red-400 via-pink-400 to-red-500 rounded-3xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden';
        }
        
        // Update quick stats
        document.getElementById('stat-balance').textContent = formatCurrencyShort(this.settings.currentBalance);
        document.getElementById('stat-expense').textContent = formatCurrencyShort(summary.monthlyExpense);
        document.getElementById('stat-income').textContent = formatCurrencyShort(summary.monthlyIncome);
        document.getElementById('stat-days').textContent = summary.daysUntilIncome + ' hari';
        
        // Render recent transactions
        this.renderRecentTransactions();
    },
    
    // Render recent transactions
    renderRecentTransactions() {
        const container = document.getElementById('recent-transactions');
        const grouped = groupTransactionsByDate(this.transactions);
        
        container.innerHTML = '';
        
        let count = 0;
        for (const date in grouped) {
            if (count >= 5) break;
            
            const dateLabel = getRelativeDateLabel(date);
            const transactionsOnDate = grouped[date].slice(0, 3);
            
            for (const txn of transactionsOnDate) {
                const categoryEmoji = getCategoryEmoji(txn.category);
                const categoryName = getCategoryName(txn.category);
                const isExpense = txn.type === 'expense';
                
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 px-2 py-2 rounded transition';
                item.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">${categoryEmoji}</span>
                        <div>
                            <p class="font-medium text-sm">${categoryName}</p>
                            <p class="text-xs text-gray-500">${dateLabel}</p>
                        </div>
                    </div>
                    <p class="font-bold text-sm ${isExpense ? 'text-red-600' : 'text-green-600'}">
                        ${isExpense ? '-' : '+'}${formatCurrencyShort(txn.amount)}
                    </p>
                `;
                container.appendChild(item);
                count++;
            }
        }
        
        if (this.transactions.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada transaksi. Mulai catat pengeluaran Anda! 📊</p>';
        }
    },
    
    // ==================== INCOME PAGE ====================
    renderIncome() {
        this.showPage('income-page');
        this.renderIncomeList();
    },

    renderIncomeList() {
        const container = document.getElementById('income-list');
        const incomes = this.transactions.filter(t => t.type === 'income').sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = '';
        
        if (incomes.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada pemasukan tercatat 💰</p>';
            return;
        }
        
        for (const income of incomes) {
            const item = document.createElement('div');
            item.className = 'bg-white/80 backdrop-blur rounded-2xl shadow p-4 border-l-4 border-green-500 hover:shadow-lg transition';
            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-green-600">${income.category === 'salary' ? 'Gaji' : income.category === 'freelance' ? 'Freelance' : income.category === 'bonus' ? 'Bonus' : 'Pemasukan'}</p>
                        <p class="text-sm text-gray-600">${income.description || 'Tidak ada keterangan'}</p>
                        <p class="text-xs text-gray-500 mt-1">${formatDate(income.date)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-bold text-green-600">+ ${formatCurrencyShort(income.amount)}</p>
                        <button onclick="app.deleteTransaction('${income.id}')" class="text-xs text-red-500 hover:text-red-700 mt-2">Hapus</button>
                    </div>
                </div>
            `;
            container.appendChild(item);
        }
    },

    addIncome(event) {
        event.preventDefault();
        
        const source = document.getElementById('income-source').value;
        const amount = parseInt(document.getElementById('income-amount').value);
        const description = document.getElementById('income-desc').value;
        
        if (!validateAmount(amount)) {
            alert('Jumlah tidak valid!');
            return;
        }
        
        const transaction = {
            id: 'txn_' + Date.now(),
            userId: this.user.id,
            type: 'income',
            amount: amount,
            category: source,
            description: description,
            date: getTodayString(),
            createdAt: new Date().toISOString()
        };
        
        this.transactions.unshift(transaction);
        this.settings.currentBalance += amount;
        this.saveToLocalStorage();
        
        // Reset form
        document.getElementById('income-source').value = 'salary';
        document.getElementById('income-amount').value = '';
        document.getElementById('income-desc').value = '';
        
        alert('✅ Pemasukan berhasil ditambahkan!');
        this.renderIncome();
    },
    
    // ==================== EXPENSE PAGE ====================
    renderExpense() {
        this.showPage('expense-page');
        this.renderExpenseList();
    },

    renderExpenseList() {
        const container = document.getElementById('expense-list');
        const expenses = this.transactions.filter(t => t.type === 'expense').sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = '';
        
        if (expenses.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada pengeluaran tercatat 💸</p>';
            return;
        }
        
        for (const expense of expenses) {
            const emoji = getCategoryEmoji(expense.category);
            const name = getCategoryName(expense.category);
            
            const item = document.createElement('div');
            item.className = 'bg-white/80 backdrop-blur rounded-2xl shadow p-4 border-l-4 border-red-500 hover:shadow-lg transition';
            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-red-600">${emoji} ${name}</p>
                        <p class="text-sm text-gray-600">${expense.description || 'Tidak ada keterangan'}</p>
                        <p class="text-xs text-gray-500 mt-1">${formatDate(expense.date)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-bold text-red-600">- ${formatCurrencyShort(expense.amount)}</p>
                        <button onclick="app.deleteTransaction('${expense.id}')" class="text-xs text-red-500 hover:text-red-700 mt-2">Hapus</button>
                    </div>
                </div>
            `;
            container.appendChild(item);
        }
    },

    addExpense(event) {
        event.preventDefault();
        
        const category = document.getElementById('expense-category').value;
        const amount = parseInt(document.getElementById('expense-amount').value);
        const description = document.getElementById('expense-desc').value;
        
        if (!validateAmount(amount)) {
            alert('Jumlah tidak valid!');
            return;
        }
        
        const transaction = {
            id: 'txn_' + Date.now(),
            userId: this.user.id,
            type: 'expense',
            amount: amount,
            category: category,
            description: description,
            date: getTodayString(),
            createdAt: new Date().toISOString()
        };
        
        this.transactions.unshift(transaction);
        this.settings.currentBalance = Math.max(0, this.settings.currentBalance - amount);
        this.saveToLocalStorage();
        
        // Reset form
        document.getElementById('expense-category').value = 'food';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-desc').value = '';
        
        alert('✅ Pengeluaran berhasil ditambahkan!');
        this.renderExpense();
    },

    deleteTransaction(id) {
        const transaction = this.transactions.find(t => t.id === id);
        if (!transaction) return;

        if (confirm(`Hapus transaksi "${transaction.category}"?`)) {
            // Restore balance
            if (transaction.type === 'income') {
                this.settings.currentBalance -= transaction.amount;
            } else {
                this.settings.currentBalance += transaction.amount;
            }

            // Remove transaction
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveToLocalStorage();
            
            // Re-render
            if (this.currentPage === 'expense') {
                this.renderExpenseList();
            } else if (this.currentPage === 'income') {
                this.renderIncomeList();
            } else {
                this.render();
            }
        }
    },
    
    // ==================== WISHLIST PAGE ====================
    renderWishlist() {
        this.showPage('wishlist-page');
        this.renderWishlistList();
    },

    renderWishlistList() {
        const container = document.getElementById('wishlist-list');
        
        container.innerHTML = '';
        
        if (this.wishlist.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Wishlist kosong. Tambahkan barang impian Anda! ✨</p>';
            return;
        }
        
        for (const item of this.wishlist) {
            const progress = (item.saved / item.price) * 100;
            const categoryEmoji = item.category === 'electronics' ? '💻' : item.category === 'fashion' ? '👗' : item.category === 'travel' ? '✈️' : item.category === 'home' ? '🏠' : item.category === 'hobby' ? '🎮' : '📦';
            
            const card = document.createElement('div');
            card.className = 'bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 hover:shadow-xl transition border-t-4 border-purple-500';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="font-bold text-lg">${categoryEmoji} ${item.name}</p>
                        <p class="text-sm text-gray-600">Target: ${formatCurrencyShort(item.price)}</p>
                    </div>
                    <button onclick="app.removeWishlist('${item.id}')" class="text-red-500 hover:text-red-700 text-lg">✕</button>
                </div>
                <div class="mb-3">
                    <div class="flex justify-between text-xs text-gray-600 mb-2">
                        <span>Sudah: ${formatCurrencyShort(item.saved)}</span>
                        <span>${Math.round(progress)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all" style="width: ${progress}%"></div>
                    </div>
                </div>
                <button onclick="app.saveToWishlist('${item.id}')" class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition">
                    💾 Tambah Tabungan
                </button>
            `;
            container.appendChild(card);
        }
    },

    addWishlist(event) {
        event.preventDefault();
        
        const name = document.getElementById('wishlist-name').value;
        const price = parseInt(document.getElementById('wishlist-price').value);
        const category = document.getElementById('wishlist-category').value;
        
        if (!validateAmount(price)) {
            alert('Harga tidak valid!');
            return;
        }
        
        const item = {
            id: 'wish_' + Date.now(),
            name: name,
            price: price,
            saved: 0,
            category: category,
            addedDate: new Date().toISOString()
        };
        
        this.wishlist.push(item);
        this.saveToLocalStorage();
        
        // Reset form
        document.getElementById('wishlist-name').value = '';
        document.getElementById('wishlist-price').value = '';
        document.getElementById('wishlist-category').value = 'electronics';
        
        alert('✅ Item ditambahkan ke Wishlist!');
        this.renderWishlist();
    },

    removeWishlist(id) {
        if (confirm('Hapus dari Wishlist?')) {
            this.wishlist = this.wishlist.filter(item => item.id !== id);
            this.saveToLocalStorage();
            this.renderWishlist();
        }
    },

    saveToWishlist(id) {
        const item = this.wishlist.find(w => w.id === id);
        if (!item) return;

        const available = this.settings.currentBalance;
        const needMore = item.price - item.saved;

        if (available >= needMore) {
            item.saved = item.price;
            this.settings.currentBalance -= needMore;
            this.saveToLocalStorage();
            alert(`🎉 Selesai! Anda sudah cukup untuk membeli ${item.name}!`);
        } else {
            const toSave = Math.min(available, needMore);
            item.saved += toSave;
            this.settings.currentBalance -= toSave;
            this.saveToLocalStorage();
            alert(`✅ Ditabung ${formatCurrencyShort(toSave)}! Masih butuh ${formatCurrencyShort(needMore - toSave)}`);
        }
        
        this.renderWishlist();
    },
    
    // ==================== ANALYSIS PAGE ====================
    renderAnalysis() {
        this.showPage('analysis-page');
        
        const summary = this.getFinancialSummary();
        
        // 1. Health Status
        this.renderHealthStatus(summary);
        
        // 2. Monthly Summary
        document.getElementById('monthly-income').textContent = formatCurrencyShort(summary.monthlyIncome);
        document.getElementById('monthly-expense').textContent = formatCurrencyShort(summary.monthlyExpense);
        document.getElementById('monthly-remaining').textContent = formatCurrencyShort(summary.monthlyIncome - summary.monthlyExpense);
        
        // 3. Recommendations & Priorities
        this.renderRecommendations(summary);
        
        // 4. Category breakdown
        const breakdown = calculateCategoryBreakdown(this.transactions);
        const categoryContainer = document.getElementById('category-breakdown');
        categoryContainer.innerHTML = '';
        
        if (Object.keys(breakdown).length === 0) {
            categoryContainer.innerHTML = '<p class="text-gray-500">Belum ada data pengeluaran</p>';
        } else {
            const sorted = Object.entries(breakdown)
                .sort((a, b) => b[1] - a[1]);
            
            for (const [category, amount] of sorted) {
                const emoji = getCategoryEmoji(category);
                const name = getCategoryName(category);
                const percentage = summary.monthlyExpense > 0 ? (amount / summary.monthlyExpense) * 100 : 0;
                
                const item = document.createElement('div');
                item.className = 'mb-4';
                item.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-medium">${emoji} ${name}</span>
                        <span class="font-bold text-orange-600">${formatCurrencyShort(amount)}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${percentage.toFixed(1)}%</p>
                `;
                categoryContainer.appendChild(item);
            }
        }
        
        // 5. Trend Analysis
        this.renderTrendAnalysis();
    },

    renderHealthStatus(summary) {
        const container = document.getElementById('health-status-content');
        const savingsPercentage = summary.monthlyIncome > 0 ? (summary.monthlyRemaining / summary.monthlyIncome) * 100 : 0;
        const expensePercentage = summary.monthlyIncome > 0 ? (summary.monthlyExpense / summary.monthlyIncome) * 100 : 0;
        
        let status = 'SEHAT ✅';
        let statusColor = 'text-green-600';
        let statusBg = 'bg-green-50';
        let advice = [];

        if (summary.budgetStatus === 'danger') {
            status = 'KRITIS ⚠️';
            statusColor = 'text-red-600';
            statusBg = 'bg-red-50';
            advice.push('🚨 Pengeluaran sudah melampaui budget harian!');
        } else if (summary.budgetStatus === 'warning') {
            status = 'HATI-HATI 🟡';
            statusColor = 'text-yellow-600';
            statusBg = 'bg-yellow-50';
            advice.push('⚠️ Sisa budget harian sudah menipis!');
        } else {
            advice.push('✅ Budget harian masih aman!');
        }

        if (expensePercentage > 70) {
            advice.push('💡 Pengeluaran Anda sangat tinggi, pertimbangkan untuk mengurangi!');
        }

        if (savingsPercentage < 10) {
            advice.push('💰 Target tabungan terlalu rendah, tingkatkan untuk masa depan!');
        } else if (savingsPercentage > 30) {
            advice.push('🎉 Kemampuan menabung Anda sangat baik! Teruskan!');
        }

        container.innerHTML = `
            <div class="${statusBg} rounded-xl p-6 mb-4">
                <p class="text-lg font-bold ${statusColor} mb-2">Status Kesehatan: ${status}</p>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-700">Pengeluaran:</span>
                        <span class="font-bold ${expensePercentage > 70 ? 'text-red-600' : 'text-green-600'}">${expensePercentage.toFixed(1)}% dari pendapatan</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Tabungan:</span>
                        <span class="font-bold text-blue-600">${savingsPercentage.toFixed(1)}% dari pendapatan</span>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                ${advice.map(a => `<p class="text-sm text-gray-700 flex items-start gap-2"><span>${a.split(' ')[0]}</span><span>${a.substring(a.indexOf(' ') + 1)}</span></p>`).join('')}
            </div>
        `;
    },

    renderRecommendations(summary) {
        const container = document.getElementById('priority-recommendations');
        const breakdown = calculateCategoryBreakdown(this.transactions);
        const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
        
        const recommendations = [];

        if (sorted.length > 0) {
            const topCategory = sorted[0][0];
            const topAmount = sorted[0][1];
            const topPercentage = summary.monthlyExpense > 0 ? (topAmount / summary.monthlyExpense) * 100 : 0;
            
            if (topPercentage > 30) {
                recommendations.push({
                    priority: '🔴 URGENT',
                    title: `Kurangi ${getCategoryName(topCategory)}`,
                    desc: `Kategori ini ${topPercentage.toFixed(0)}% dari total pengeluaran`,
                    color: 'border-red-500'
                });
            }
        }

        if (summary.daysUntilIncome <= 5) {
            recommendations.push({
                priority: '🟠 HIGH',
                title: `Hemat untuk ${summary.daysUntilIncome} hari terakhir`,
                desc: `Budget harian: ${formatCurrencyShort(summary.dailyBudget)}`,
                color: 'border-orange-500'
            });
        }

        if (summary.monthlyRemaining < 0) {
            recommendations.push({
                priority: '🔴 CRITICAL',
                title: 'Anda over budget!',
                desc: `Kurangi pengeluaran sebesar ${formatCurrencyShort(Math.abs(summary.monthlyRemaining))}`,
                color: 'border-red-500'
            });
        }

        recommendations.push({
            priority: '🟢 GOAL',
            title: 'Tingkatkan tabungan',
            desc: `Target: ${formatCurrencyShort(this.settings.savingsGoal)}/bulan`,
            color: 'border-green-500'
        });

        if (recommendations.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Keuangan Anda sangat baik! ✨</p>';
        } else {
            container.innerHTML = recommendations.map(rec => `
                <div class="bg-white rounded-lg p-3 border-l-4 ${rec.color}">
                    <p class="font-bold text-sm">${rec.priority} ${rec.title}</p>
                    <p class="text-xs text-gray-600 mt-1">${rec.desc}</p>
                </div>
            `).join('');
        }
    },

    renderTrendAnalysis() {
        const container = document.getElementById('trend-chart');
        const days = 7;
        const trendData = {};

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayExpense = this.transactions
                .filter(t => t.type === 'expense' && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);
            
            trendData[dateStr] = dayExpense;
        }

        const maxExpense = Math.max(...Object.values(trendData), 1);
        const dates = Object.keys(trendData);

        container.innerHTML = dates.map(date => {
            const amount = trendData[date];
            const percentage = (amount / maxExpense) * 100;
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
            const dateLabel = dateObj.getDate();

            return `
                <div>
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-xs font-semibold">${dayName} ${dateLabel}</span>
                        <span class="text-sm font-bold text-red-600">${formatCurrencyShort(amount)}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // ==================== CAN BUY PAGE ====================
    renderCanBuy() {
        this.showPage('can-buy-page');
        document.getElementById('affordability-result').classList.add('hidden');
    },

    checkAffordability(event) {
        event.preventDefault();
        
        const itemName = document.getElementById('item-name').value;
        const itemPrice = parseInt(document.getElementById('item-price').value);
        
        if (!itemName || !validateAmount(itemPrice)) {
            alert('Masukkan nama barang dan harga dengan benar!');
            return;
        }
        
        const summary = this.getFinancialSummary();
        const result = canAffordPurchase(itemPrice, summary.safeToSpend, summary.dailyBudget, summary.daysUntilIncome);
        
        // Show result
        const resultDiv = document.getElementById('affordability-result');
        resultDiv.classList.remove('hidden');
        
        const statusDisplay = getBudgetStatusDisplay(result.status);
        const statusEl = document.getElementById('result-status');
        statusEl.className = `mb-6 p-6 rounded-xl text-white text-center text-2xl font-bold bg-gradient-to-r ${result.status === 'safe' ? 'from-green-500 to-emerald-600' : result.status === 'warning' ? 'from-yellow-500 to-orange-600' : 'from-red-500 to-pink-600'}`;
        statusEl.textContent = `${statusDisplay.emoji} ${statusDisplay.label}`;
        
        document.getElementById('result-price').textContent = formatCurrencyShort(itemPrice);
        document.getElementById('result-budget').textContent = formatCurrencyShort(summary.dailyBudget);
        
        if (result.status === 'warning') {
            const daysNeeded = Math.ceil(itemPrice / summary.dailyBudget);
            document.getElementById('result-days').textContent = `${daysNeeded} hari`;
        } else if (result.status === 'safe') {
            document.getElementById('result-days').textContent = 'Bisa dibeli hari ini! 🎉';
        } else {
            document.getElementById('result-days').textContent = 'Terlalu mahal, perlu waktu lama';
        }
    },
    
    // ==================== SCAN RECEIPT PAGE ====================
    renderScanReceipt() {
        this.showPage('scan-receipt-page');
        document.getElementById('receipt-preview').classList.add('hidden');
        document.getElementById('extracted-items-container').classList.add('hidden');
        document.getElementById('scan-empty-state').classList.remove('hidden');
    },

    scanReceipt(event) {
        event.preventDefault();
        
        const fileInput = document.getElementById('receipt-image');
        const storeName = document.getElementById('receipt-store').value || 'Merchant';
        
        if (!fileInput.files || !fileInput.files[0]) {
            alert('Pilih foto struk terlebih dahulu!');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;
            
            // Show preview
            document.getElementById('preview-image').src = imageData;
            document.getElementById('receipt-preview').classList.remove('hidden');
            document.getElementById('scan-empty-state').classList.add('hidden');
            
            // Simulate OCR extraction (mock data with random items)
            const mockItems = this.generateMockReceiptItems();
            this.displayExtractedItems(mockItems, storeName);
        };

        reader.readAsDataURL(file);
    },

    generateMockReceiptItems() {
        const categories = ['food', 'shopping', 'health', 'entertainment'];
        const items = [
            { name: 'Beras 5kg', price: 75000, category: 'food' },
            { name: 'Minyak Goreng 2L', price: 32000, category: 'food' },
            { name: 'Telur Ayam (isi 10)', price: 28000, category: 'food' },
            { name: 'Teh Botol', price: 15000, category: 'food' },
            { name: 'Roti Tawar', price: 18000, category: 'food' },
            { name: 'Sabun Cuci Piring', price: 8000, category: 'shopping' },
            { name: 'Shampo', price: 22000, category: 'health' },
            { name: 'Pasta Gigi', price: 15000, category: 'health' },
        ];

        // Random 3-5 items
        const numItems = Math.floor(Math.random() * 3) + 3;
        const shuffled = items.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, numItems);
    },

    displayExtractedItems(items, storeName) {
        const container = document.getElementById('extracted-items');
        let total = 0;

        container.innerHTML = items.map((item, index) => {
            total += item.price;
            const emoji = getCategoryEmoji(item.category);
            return `
                <div class="bg-white border-l-4 border-indigo-500 p-3 rounded-lg flex justify-between items-center">
                    <div class="flex-1">
                        <p class="font-semibold text-sm">${emoji} ${item.name}</p>
                    </div>
                    <input type="number" value="${item.price}" class="item-price w-24 px-2 py-1 border rounded text-right text-sm" data-index="${index}" data-category="${item.category}">
                </div>
            `;
        }).join('');

        document.getElementById('receipt-total').textContent = formatCurrencyShort(total);
        this.currentReceiptItems = items;
        this.currentReceiptStore = storeName;
        this.currentReceiptTotal = total;

        document.getElementById('extracted-items-container').classList.remove('hidden');
    },

    confirmExtractedItems(event) {
        event.preventDefault();
        
        const priceInputs = document.querySelectorAll('.item-price');
        let totalAmount = 0;
        const items = [];

        priceInputs.forEach((input, index) => {
            const price = parseInt(input.value) || 0;
            const category = input.dataset.category;
            const itemName = this.currentReceiptItems[index].name;
            
            totalAmount += price;
            items.push({
                name: itemName,
                price: price,
                category: category
            });
        });

        if (totalAmount === 0) {
            alert('Total tidak boleh 0!');
            return;
        }

        // Create transaction
        const transaction = {
            id: 'txn_' + Date.now(),
            userId: this.user.id,
            type: 'expense',
            amount: totalAmount,
            category: 'shopping', // Default category for receipt
            description: `Struk dari ${this.currentReceiptStore}`,
            date: getTodayString(),
            createdAt: new Date().toISOString(),
            receiptItems: items
        };

        this.transactions.unshift(transaction);
        this.settings.currentBalance = Math.max(0, this.settings.currentBalance - totalAmount);
        this.saveToLocalStorage();

        alert(`✅ Transaksi berhasil disimpan! Total: ${formatCurrencyShort(totalAmount)}`);
        this.renderScanReceipt();
        
        // Reset form
        document.getElementById('receipt-image').value = '';
        document.getElementById('receipt-store').value = '';
    },
    
    // ==================== PROFILE PAGE ====================
    renderProfile() {
        this.showPage('profile-page');
        this.loadProfileForm();
        this.displayProfileData();
    },

    loadProfileForm() {
        document.getElementById('profile-name-input').value = this.user.name || '';
        document.getElementById('profile-email-input').value = this.user.email || '';
        document.getElementById('profile-balance-input').value = this.settings.currentBalance || '';
        document.getElementById('profile-income-date-input').value = this.settings.nextIncomeDate || '';
        document.getElementById('profile-savings-input').value = this.settings.savingsGoal || '';
        document.getElementById('profile-buffer-input').value = this.settings.bufferAmount || '';
    },

    displayProfileData() {
        document.getElementById('profile-name-display').textContent = this.user.name || 'N/A';
        document.getElementById('profile-email-display').textContent = this.user.email || 'N/A';
        document.getElementById('profile-balance-display').textContent = formatCurrencyShort(this.settings.currentBalance);
        document.getElementById('profile-income-date-display').textContent = formatDate(this.settings.nextIncomeDate);
    },

    updateProfile(event) {
        event.preventDefault();
        
        const newName = document.getElementById('profile-name-input').value;
        const newEmail = document.getElementById('profile-email-input').value;
        const newBalance = parseInt(document.getElementById('profile-balance-input').value);
        const newIncomeDate = document.getElementById('profile-income-date-input').value;
        const newSavings = parseInt(document.getElementById('profile-savings-input').value);
        const newBuffer = parseInt(document.getElementById('profile-buffer-input').value);
        
        if (!newName || !newEmail || !validateAmount(newBalance) || !validateAmount(newSavings) || !validateAmount(newBuffer)) {
            alert('Mohon isi semua field dengan benar!');
            return;
        }
        
        this.user.name = newName;
        this.user.email = newEmail;
        this.settings.currentBalance = newBalance;
        this.settings.nextIncomeDate = newIncomeDate;
        this.settings.savingsGoal = newSavings;
        this.settings.bufferAmount = newBuffer;
        
        this.saveToLocalStorage();
        alert('✅ Profil berhasil diperbarui!');
        this.renderProfile();
    },
    
    // Clear all data
    clearData() {
        if (confirm('Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak bisa dibatalkan! ⚠️')) {
            localStorage.clear();
            location.reload();
        }
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Events setup if needed
    }
};

// Initialize app on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
