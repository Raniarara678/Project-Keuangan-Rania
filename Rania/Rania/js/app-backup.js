// Main Application Logic for Dompet Aman
// Single Page Application (SPA) with vanilla JavaScript

const app = {
    // Current state
    currentPage: 'dashboard',
    user: null,
    settings: null,
    transactions: [],
    bills: [],
    savingsGoals: [],
    
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
            this.bills = JSON.parse(localStorage.getItem('bills')) || [];
            this.savingsGoals = JSON.parse(localStorage.getItem('savingsGoals')) || [];
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
            localStorage.setItem('bills', JSON.stringify(this.bills));
            localStorage.setItem('savingsGoals', JSON.stringify(this.savingsGoals));
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
        
        switch (this.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'transactions':
                this.renderTransactions();
                break;
            case 'analysis':
                this.renderAnalysis();
                break;
            case 'canBuy':
                this.renderCanBuy();
                break;
            case 'profile':
                this.renderProfile();
                break;
            case 'addTransaction':
                this.renderAddTransaction();
                break;
            case 'scanReceipt':
                this.renderScanReceipt();
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
    
    // Calculate financial summary
    getFinancialSummary() {
        const unpaidBills = getTotalUnpaidBills(this.bills);
        const savingsNeeded = calculateSavingsNeeded(this.savingsGoals);
        const daysUntilIncome = getDaysUntilNextIncome(this.settings.nextIncomeDate);
        
        const safeToSpend = calculateSafeToSpend(
            this.settings.currentBalance,
            unpaidBills,
            savingsNeeded,
            this.settings.bufferAmount
        );
        
        const dailyBudget = calculateDailyBudget(safeToSpend, daysUntilIncome);
        const todayExpenses = getTodayExpenses(this.transactions);
        const budgetStatus = getBudgetStatus(todayExpenses, dailyBudget);
        
        return {
            safeToSpend,
            dailyBudget,
            todayExpenses,
            budgetStatus,
            daysUntilIncome,
            unpaidBills,
            savingsNeeded,
            monthlyIncome: getMonthlyIncome(this.transactions),
            monthlyExpense: getMonthlyExpenses(this.transactions)
        };
    },
    
    // Render Dashboard
    renderDashboard() {
        this.showPage('dashboard-page');
        
        const summary = this.getFinancialSummary();
        
        // Update greeting
        document.getElementById('greeting').textContent = `Halo, ${this.user.name} 👋`;
        
        // Update safe to spend card
        document.getElementById('safe-amount').textContent = formatCurrencyShort(summary.safeToSpend);
        document.getElementById('daily-budget').textContent = formatCurrencyShort(summary.dailyBudget);
        document.getElementById('spent-today').textContent = formatCurrencyShort(summary.todayExpenses);
        document.getElementById('remaining-today').textContent = formatCurrencyShort(summary.dailyBudget - summary.todayExpenses);
        
        // Update progress bar
        const percentage = getBudgetPercentage(summary.todayExpenses, summary.dailyBudget);
        document.getElementById('budget-bar').style.width = percentage + '%';
        
        // Update status badge
        const statusDisplay = getBudgetStatusDisplay(summary.budgetStatus);
        const statusBadge = document.getElementById('status-badge');
        statusBadge.className = `inline-block px-4 py-2 rounded-full text-white ${statusDisplay.color} text-sm font-semibold`;
        statusBadge.textContent = `${statusDisplay.emoji} ${statusDisplay.label}`;
        
        // Update safe-card background based on status
        const safeCard = document.getElementById('safe-card');
        if (summary.budgetStatus === 'safe') {
            safeCard.className = 'bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-8 shadow-lg';
        } else if (summary.budgetStatus === 'warning') {
            safeCard.className = 'bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 mb-8 shadow-lg';
        } else {
            safeCard.className = 'bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 mb-8 shadow-lg';
        }
        
        // Update financial summary
        document.getElementById('summary-balance').textContent = formatCurrencyShort(this.settings.currentBalance);
        document.getElementById('summary-bills').textContent = formatCurrencyShort(summary.unpaidBills);
        document.getElementById('summary-savings').textContent = formatCurrencyShort(this.settings.savingsGoal);
        document.getElementById('summary-buffer').textContent = formatCurrencyShort(this.settings.bufferAmount);
        document.getElementById('summary-days').textContent = summary.daysUntilIncome + ' hari';
        
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
            if (count >= 3) break; // Show only 3 recent dates
            
            const dateLabel = getRelativeDateLabel(date);
            const transactionsOnDate = grouped[date].slice(0, 3);
            
            for (const txn of transactionsOnDate) {
                const categoryEmoji = getCategoryEmoji(txn.category);
                const categoryName = getCategoryName(txn.category);
                const isExpense = txn.type === 'expense';
                
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0';
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
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada transaksi</p>';
        }
    },
    
    // Render Transactions Page
    renderTransactions() {
        this.showPage('transactions-page');
        
        const container = document.getElementById('transactions-list');
        const grouped = groupTransactionsByDate(this.transactions);
        
        container.innerHTML = '';
        
        if (this.transactions.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada transaksi</p>';
            return;
        }
        
        for (const date in grouped) {
            const dateLabel = getRelativeDateLabel(date);
            const dateHeader = document.createElement('h3');
            dateHeader.className = 'text-sm font-bold text-gray-600 mt-4 mb-2 px-4';
            dateHeader.textContent = dateLabel;
            container.appendChild(dateHeader);
            
            for (const txn of grouped[date]) {
                const categoryEmoji = getCategoryEmoji(txn.category);
                const categoryName = getCategoryName(txn.category);
                const isExpense = txn.type === 'expense';
                
                const item = document.createElement('div');
                item.className = 'bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center mb-2';
                item.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">${categoryEmoji}</span>
                        <div>
                            <p class="font-medium">${categoryName}</p>
                            <p class="text-xs text-gray-500">${txn.description || 'Tidak ada keterangan'}</p>
                        </div>
                    </div>
                    <p class="font-bold ${isExpense ? 'text-red-600' : 'text-green-600'}">
                        ${isExpense ? '-' : '+'}${formatCurrencyShort(txn.amount)}
                    </p>
                `;
                container.appendChild(item);
            }
        }
    },
    
    // Render Analysis Page
    renderAnalysis() {
        this.showPage('analysis-page');
        
        const summary = this.getFinancialSummary();
        
        // Update monthly summary
        document.getElementById('monthly-income').textContent = formatCurrencyShort(summary.monthlyIncome);
        document.getElementById('monthly-expense').textContent = formatCurrencyShort(summary.monthlyExpense);
        document.getElementById('monthly-remaining').textContent = formatCurrencyShort(summary.monthlyIncome - summary.monthlyExpense);
        
        // Category breakdown
        const breakdown = calculateCategoryBreakdown(this.transactions);
        const categoryContainer = document.getElementById('category-breakdown');
        categoryContainer.innerHTML = '';
        
        if (Object.keys(breakdown).length === 0) {
            categoryContainer.innerHTML = '<p class="text-gray-500">Belum ada data</p>';
            return;
        }
        
        // Sort by amount descending
        const sorted = Object.entries(breakdown)
            .sort((a, b) => b[1] - a[1]);
        
        for (const [category, amount] of sorted) {
            const emoji = getCategoryEmoji(category);
            const name = getCategoryName(category);
            const percentage = (amount / summary.monthlyExpense) * 100;
            
            const item = document.createElement('div');
            item.className = 'mb-4';
            item.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span>${emoji} ${name}</span>
                    <span class="font-bold">${formatCurrencyShort(amount)}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">${percentage.toFixed(1)}%</p>
            `;
            categoryContainer.appendChild(item);
        }
    },
    
    // Render Can Buy Page
    renderCanBuy() {
        this.showPage('can-buy-page');
        
        // Hide result initially
        document.getElementById('affordability-result').classList.add('hidden');
    },
    
    // Render Profile Page
    renderProfile() {
        this.showPage('profile-page');
        
        document.getElementById('profile-name').textContent = this.user.name;
        document.getElementById('profile-email').textContent = this.user.email;
        document.getElementById('profile-balance').textContent = formatCurrencyShort(this.settings.currentBalance);
        document.getElementById('profile-income-date').textContent = formatDate(this.settings.nextIncomeDate);
        document.getElementById('profile-savings-target').textContent = formatCurrencyShort(this.settings.savingsGoal);
        document.getElementById('profile-buffer').textContent = formatCurrencyShort(this.settings.bufferAmount);
    },
    
    // Render Add Transaction Page
    renderAddTransaction() {
        this.showPage('add-transaction-page');
    },
    
    // Render Scan Receipt Page
    renderScanReceipt() {
        this.showPage('scan-receipt-page');
    },
    
    // Add transaction
    addTransaction(event) {
        event.preventDefault();
        
        const type = document.querySelector('input[name="type"]:checked').value;
        const amount = parseInt(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        
        if (!validateAmount(amount)) {
            alert('Jumlah tidak valid!');
            return;
        }
        
        const transaction = {
            id: 'txn_' + Date.now(),
            userId: this.user.id,
            type: type,
            amount: amount,
            category: category,
            description: description,
            date: getTodayString(),
            createdAt: new Date().toISOString()
        };
        
        this.transactions.unshift(transaction);
        this.saveToLocalStorage();
        
        // Reset form
        document.getElementById('type-expense').checked = true;
        document.getElementById('amount').value = '';
        document.getElementById('category').value = 'food';
        document.getElementById('description').value = '';
        
        alert('Transaksi berhasil ditambahkan!');
        this.navigate('dashboard');
    },
    
    // Check affordability
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
        document.getElementById('result-status').className = `mb-4 p-4 rounded-lg text-white text-center text-xl font-bold ${statusDisplay.color}`;
        document.getElementById('result-status').textContent = `${statusDisplay.emoji} ${statusDisplay.label}`;
        
        document.getElementById('result-price').textContent = formatCurrencyShort(itemPrice);
        document.getElementById('result-budget').textContent = formatCurrencyShort(summary.dailyBudget);
        
        if (result.status === 'warning') {
            const daysNeeded = Math.ceil(itemPrice / summary.dailyBudget);
            document.getElementById('result-days').textContent = daysNeeded + ' hari';
        } else {
            document.getElementById('result-days').textContent = result.status === 'safe' ? '0 hari' : 'Tidak bisa dibelanja';
        }
    },
    
    // Clear all data
    clearData() {
        if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak bisa dibatalkan!')) {
            localStorage.clear();
            location.reload();
        }
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Filter buttons on transactions page
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-gray-200'));
                this.classList.add('bg-blue-600', 'text-white');
                this.classList.remove('bg-gray-200');
                
                // TODO: Implement filter logic
            });
        });
    }
};

// Initialize app on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
