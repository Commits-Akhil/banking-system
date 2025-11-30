#!/bin/bash

# Quick Start Script for Simple Banking System
# This script helps you run all three components

echo "=========================================="
echo "Simple Banking System - Quick Start"
echo "=========================================="
echo ""
echo "This will start:"
echo "1. C++ Processor (FD & Loan Calculator)"
echo "2. Express Backend (API Server)"
echo "3. Next.js Frontend (Web Interface)"
echo ""
echo "Make sure you have:"
echo "- Compiled C++ code (run: cd backend/cpp && g++ processor.cpp -o processor)"
echo "- Installed backend dependencies (run: cd backend && npm install)"
echo "- Installed frontend dependencies (run: cd frontend && npm install)"
echo ""
echo "=========================================="
echo ""

# Check if processor exists
if [ ! -f "backend/cpp/processor" ]; then
    echo "ERROR: C++ processor not compiled!"
    echo "Please run: cd backend/cpp && g++ processor.cpp -o processor"
    exit 1
fi

# Check if backend dependencies installed
if [ ! -d "backend/node_modules" ]; then
    echo "ERROR: Backend dependencies not installed!"
    echo "Please run: cd backend && npm install"
    exit 1
fi

# Check if frontend dependencies installed
if [ ! -d "frontend/node_modules" ]; then
    echo "ERROR: Frontend dependencies not installed!"
    echo "Please run: cd frontend && npm install"
    exit 1
fi

echo "Starting all services..."
echo ""
echo "NOTE: Open 3 separate terminals and run:"
echo ""
echo "Terminal 1 (C++ Processor):"
echo "  cd backend/cpp && ./processor"
echo ""
echo "Terminal 2 (Express Backend):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 3 (Next.js Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
