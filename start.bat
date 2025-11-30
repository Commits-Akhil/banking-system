@echo off
REM Quick Start Script for Simple Banking System (Windows)

echo ==========================================
echo Simple Banking System - Quick Start
echo ==========================================
echo.
echo This will help you start all three components:
echo 1. C++ Processor (FD and Loan Calculator)
echo 2. Express Backend (API Server)
echo 3. Next.js Frontend (Web Interface)
echo.
echo ==========================================
echo.

REM Check if processor exists
if not exist "backend\cpp\processor.exe" (
    echo ERROR: C++ processor not compiled!
    echo Please compile with: cd backend\cpp ^&^& g++ processor.cpp -o processor.exe
    pause
    exit /b 1
)

REM Check if backend dependencies installed
if not exist "backend\node_modules" (
    echo ERROR: Backend dependencies not installed!
    echo Please run: cd backend ^&^& npm install
    pause
    exit /b 1
)

REM Check if frontend dependencies installed
if not exist "frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run: cd frontend ^&^& npm install
    pause
    exit /b 1
)

echo All checks passed!
echo.
echo To run the application, open 3 separate Command Prompts and run:
echo.
echo Command Prompt 1 (C++ Processor):
echo   cd backend\cpp
echo   processor.exe
echo.
echo Command Prompt 2 (Express Backend):
echo   cd backend
echo   npm start
echo.
echo Command Prompt 3 (Next.js Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
