#!/bin/bash

# Dompet Aman - Development Setup Script
# This script automates the setup process

echo "🚀 Dompet Aman - Development Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")" || exit

echo "📦 Installing dependencies..."
echo ""

# Install dependencies
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Demo user:"
echo "   Name: Raka"
echo "   Balance: Rp3.500.000"
echo ""
echo "4. Documentation:"
echo "   - README.md (full documentation)"
echo "   - QUICK_START.md (quick reference)"
echo "   - SETUP.md (detailed setup)"
echo ""
echo "Happy budgeting! 💚"
