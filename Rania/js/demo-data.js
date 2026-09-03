// Demo Data for Dompet Aman
// This data is loaded on first visit

const DEMO_USER = {
    id: 'user_001',
    name: 'Raka',
    email: 'raka@example.com',
    createdAt: '2026-08-01'
};

const DEMO_SETTINGS = {
    userId: 'user_001',
    currentBalance: 3500000, // Rp 3.5M
    nextIncomeDate: '2026-09-19', // 18 days from Sept 1
    savingsGoal: 500000, // Rp 500K monthly
    bufferAmount: 200000, // Rp 200K buffer
    currency: 'IDR'
};

const DEMO_TRANSACTIONS = [
    {
        id: 'txn_001',
        userId: 'user_001',
        type: 'expense',
        amount: 50000,
        category: 'food',
        description: 'Makan siang di warung',
        date: '2026-09-01',
        createdAt: '2026-09-01T12:30:00Z'
    },
    {
        id: 'txn_002',
        userId: 'user_001',
        type: 'expense',
        amount: 30000,
        category: 'transport',
        description: 'Ojol ke kantor',
        date: '2026-09-01',
        createdAt: '2026-09-01T08:15:00Z'
    },
    {
        id: 'txn_003',
        userId: 'user_001',
        type: 'expense',
        amount: 100000,
        category: 'shopping',
        description: 'Belanja kebutuhan rumah',
        date: '2026-08-31',
        createdAt: '2026-08-31T15:45:00Z'
    },
    {
        id: 'txn_004',
        userId: 'user_001',
        type: 'expense',
        amount: 25000,
        category: 'food',
        description: 'Kopi pagi',
        date: '2026-08-31',
        createdAt: '2026-08-31T07:30:00Z'
    },
    {
        id: 'txn_005',
        userId: 'user_001',
        type: 'expense',
        amount: 80000,
        category: 'entertainment',
        description: 'Nonton bioskop',
        date: '2026-08-30',
        createdAt: '2026-08-30T19:00:00Z'
    },
    {
        id: 'txn_006',
        userId: 'user_001',
        type: 'expense',
        amount: 15000,
        category: 'health',
        description: 'Obat flu',
        date: '2026-08-29',
        createdAt: '2026-08-29T10:20:00Z'
    },
    {
        id: 'txn_007',
        userId: 'user_001',
        type: 'income',
        amount: 5000000,
        category: 'salary',
        description: 'Gaji bulanan',
        date: '2026-08-14',
        createdAt: '2026-08-14T09:00:00Z'
    }
];

const DEMO_BILLS = [
    {
        id: 'bill_001',
        userId: 'user_001',
        name: 'Listrik',
        amount: 400000,
        dueDate: '2026-09-05',
        isRecurring: true,
        isPaid: false,
        createdAt: '2026-08-01'
    },
    {
        id: 'bill_002',
        userId: 'user_001',
        name: 'Internet',
        amount: 300000,
        dueDate: '2026-09-05',
        isRecurring: true,
        isPaid: false,
        createdAt: '2026-08-01'
    },
    {
        id: 'bill_003',
        userId: 'user_001',
        name: 'Kos',
        amount: 1000000,
        dueDate: '2026-09-01',
        isRecurring: true,
        isPaid: true,
        createdAt: '2026-08-01'
    },
    {
        id: 'bill_004',
        userId: 'user_001',
        name: 'Asuransi',
        amount: 300000,
        dueDate: '2026-09-10',
        isRecurring: true,
        isPaid: true,
        createdAt: '2026-08-01'
    }
];

const DEMO_SAVINGS_GOALS = [
    {
        id: 'goal_001',
        userId: 'user_001',
        name: 'Liburan ke Bali',
        targetAmount: 3000000,
        currentAmount: 1200000,
        targetDate: '2026-12-31',
        category: 'travel',
        createdAt: '2026-07-01'
    },
    {
        id: 'goal_002',
        userId: 'user_001',
        name: 'Laptop Gaming',
        targetAmount: 8000000,
        currentAmount: 2500000,
        targetDate: '2026-12-31',
        category: 'electronics',
        createdAt: '2026-06-15'
    },
    {
        id: 'goal_003',
        userId: 'user_001',
        name: 'Emergency Fund',
        targetAmount: 5000000,
        currentAmount: 3000000,
        targetDate: '2026-12-31',
        category: 'savings',
        createdAt: '2026-05-01'
    }
];

// Function to initialize localStorage with demo data
function initializeDemoData() {
    const hasData = localStorage.getItem('user');
    
    if (!hasData) {
        localStorage.setItem('user', JSON.stringify(DEMO_USER));
        localStorage.setItem('settings', JSON.stringify(DEMO_SETTINGS));
        localStorage.setItem('transactions', JSON.stringify(DEMO_TRANSACTIONS));
        localStorage.setItem('bills', JSON.stringify(DEMO_BILLS));
        localStorage.setItem('savingsGoals', JSON.stringify(DEMO_SAVINGS_GOALS));
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDemoData);
} else {
    initializeDemoData();
}
