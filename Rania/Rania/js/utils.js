// Utility Functions for Dompet Aman

// Category Emoji Mapping
const CATEGORY_EMOJI = {
    food: '🍜',
    transport: '🚗',
    housing: '🏠',
    credit: '💳',
    shopping: '🛍️',
    entertainment: '🎮',
    health: '💊',
    education: '📚',
    other: '📦',
    salary: '💰',
    travel: '✈️',
    electronics: '💻'
};

// Format currency to Indonesian Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format currency with 'Rp' prefix only (no decimals)
function formatCurrencyShort(amount) {
    const formatter = new Intl.NumberFormat('id-ID');
    return 'Rp ' + formatter.format(amount);
}

// Format date to Indonesian format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', locale: 'id-ID' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Format date to short format (e.g., "1 Sep")
function formatDateShort(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Get category emoji
function getCategoryEmoji(category) {
    return CATEGORY_EMOJI[category] || '📦';
}

// Get category name in Indonesian
function getCategoryName(category) {
    const names = {
        food: 'Makanan',
        transport: 'Transportasi',
        housing: 'Tempat Tinggal',
        credit: 'Cicilan',
        shopping: 'Belanja',
        entertainment: 'Hiburan',
        health: 'Kesehatan',
        education: 'Pendidikan',
        other: 'Lainnya',
        salary: 'Gaji',
        travel: 'Perjalanan',
        electronics: 'Elektronik'
    };
    return names[category] || 'Lainnya';
}

// Calculate days until next income
function getDaysUntilNextIncome(nextIncomeDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const incomeDate = new Date(nextIncomeDate);
    incomeDate.setHours(0, 0, 0, 0);
    
    const timeDiff = incomeDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff > 0 ? daysDiff : 0;
}

// Get today's date as YYYY-MM-DD string
function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Get yesterday's date as YYYY-MM-DD string
function getYesterdayString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

// Get today's expenses
function getTodayExpenses(transactions) {
    const today = getTodayString();
    return transactions
        .filter(t => t.type === 'expense' && t.date === today)
        .reduce((sum, t) => sum + t.amount, 0);
}

// Get monthly expenses
function getMonthlyExpenses(transactions) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions
        .filter(t => {
            if (t.type !== 'expense') return false;
            const txDate = new Date(t.date);
            return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
}

// Get monthly income
function getMonthlyIncome(transactions) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions
        .filter(t => {
            if (t.type !== 'income') return false;
            const txDate = new Date(t.date);
            return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
}

// Get total unpaid bills
function getTotalUnpaidBills(bills) {
    return bills
        .filter(b => !b.isPaid)
        .reduce((sum, b) => sum + b.amount, 0);
}

// Calculate savings needed
function calculateSavingsNeeded(savingsGoals) {
    return savingsGoals
        .reduce((sum, goal) => {
            const needed = goal.targetAmount - goal.currentAmount;
            return sum + (needed > 0 ? needed : 0);
        }, 0);
}

// Calculate safe to spend amount
function calculateSafeToSpend(balance, unpaidBills, savingsRequired, buffer) {
    const safeAmount = balance - unpaidBills - savingsRequired - buffer;
    return Math.max(0, safeAmount);
}

// Calculate daily budget
function calculateDailyBudget(safeToSpend, daysUntilIncome) {
    if (daysUntilIncome <= 0) return 0;
    return Math.floor(safeToSpend / daysUntilIncome);
}

// Get budget status
function getBudgetStatus(spent, allowed) {
    if (allowed <= 0) return 'danger';
    
    const percentage = spent / allowed;
    
    if (percentage <= 0.8) return 'safe';
    if (percentage <= 1.0) return 'warning';
    return 'danger';
}

// Get budget status emoji and color
function getBudgetStatusDisplay(status) {
    const displays = {
        safe: { emoji: '🟢', label: 'Aman', color: 'bg-green-500' },
        warning: { emoji: '🟡', label: 'Perhatian', color: 'bg-yellow-500' },
        danger: { emoji: '🔴', label: 'Berisiko', color: 'bg-red-500' }
    };
    return displays[status] || displays.danger;
}

// Check if can afford purchase
function canAffordPurchase(amount, safeToSpend, dailyBudget, daysUntilIncome) {
    const affordableImmediate = amount <= dailyBudget;
    const affordableTotal = amount <= safeToSpend;
    
    let status = 'safe';
    let message = `Aman! Kurangi budget harian sebesar ${formatCurrency(amount)}`;
    let newDailyBudget = dailyBudget - amount;
    
    if (!affordableImmediate && affordableTotal) {
        status = 'warning';
        const daysNeeded = Math.ceil(amount / dailyBudget);
        message = `Perlu menabung ${daysNeeded} hari untuk membeli ini`;
        newDailyBudget = 0;
    } else if (!affordableTotal) {
        status = 'danger';
        message = 'Sayangnya, terlalu mahal untuk dibelanja sekarang';
        newDailyBudget = 0;
    }
    
    return { status, message, newDailyBudget };
}

// Get transactions by category
function getTransactionsByCategory(transactions, category) {
    return transactions.filter(t => t.category === category);
}

// Get transactions by type
function getTransactionsByType(transactions, type) {
    return transactions.filter(t => t.type === type);
}

// Group transactions by date (newest first)
function groupTransactionsByDate(transactions) {
    const grouped = {};
    
    transactions.forEach(t => {
        const date = t.date;
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(t);
    });
    
    // Sort dates descending
    return Object.keys(grouped)
        .sort((a, b) => new Date(b) - new Date(a))
        .reduce((result, date) => {
            result[date] = grouped[date];
            return result;
        }, {});
}

// Calculate category breakdown (sum by category)
function calculateCategoryBreakdown(transactions) {
    const breakdown = {};
    
    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            if (!breakdown[t.category]) {
                breakdown[t.category] = 0;
            }
            breakdown[t.category] += t.amount;
        });
    
    return breakdown;
}

// Get percentage of budget spent
function getBudgetPercentage(spent, allowed) {
    if (allowed <= 0) return 100;
    return Math.min(100, Math.round((spent / allowed) * 100));
}

// Parse date string from input (HTML date input)
function parseDate(dateString) {
    return new Date(dateString + 'T00:00:00').toISOString().split('T')[0];
}

// Check if date is today
function isToday(dateString) {
    return dateString === getTodayString();
}

// Check if date is yesterday
function isYesterday(dateString) {
    return dateString === getYesterdayString();
}

// Get relative date label
function getRelativeDateLabel(dateString) {
    const today = getTodayString();
    const yesterday = getYesterdayString();
    
    if (dateString === today) return 'Hari Ini';
    if (dateString === yesterday) return 'Kemarin';
    
    return formatDate(dateString);
}

// Validate currency input
function validateAmount(amount) {
    return typeof amount === 'number' && amount > 0 && isFinite(amount);
}

// Round to nearest rupiah (1000)
function roundToNearestThousand(amount) {
    return Math.round(amount / 1000) * 1000;
}
