#!/bin/bash

echo "Setting up Robs Hockey Pool - MEAN Stack Application"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create .env file if it doesn't exist
echo "Creating environment file..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "Environment file created. Please edit .env with your configuration."
else
    echo "Environment file already exists."
fi

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "  npm run dev:full    # Start both backend and frontend"
echo "  npm run server      # Start backend only"
echo "  npm run client      # Start frontend only"
echo ""
echo "Make sure MongoDB is running before starting the application."
echo ""
echo "📋 Next steps:"
echo "1. Edit the .env file with your configuration"
echo "2. Start MongoDB: mongod"
echo "3. Start the backend: npm run dev"
echo "4. Start the frontend: npm run client"
echo "5. Or run both: npm run dev:full"
echo ""
echo "🌐 Backend will be available at: http://localhost:5000"
echo "🌐 Frontend will be available at: http://localhost:4200"
echo ""
echo "📚 For more information, see README.md" 