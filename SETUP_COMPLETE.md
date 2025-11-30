# 🏦 Simple Banking System - Complete!

## ✅ What Has Been Built

A complete banking system with:

- **Frontend**: Next.js 14 with Tailwind CSS
- **Backend**: Express.js REST API
- **Calculator**: C++ processor for FD and Loan calculations
- **IPC**: Simple file-based inter-process communication
- **Storage**: Text files for user data and account balances

## 📂 Project Structure Created

```
banking-system/
├── frontend/              ✅ Next.js application
│   └── app/
│       ├── page.js        ✅ Home page
│       ├── login/         ✅ Login page
│       ├── dashboard/     ✅ Dashboard with all operations
│       ├── deposit/       ✅ Deposit money
│       ├── withdraw/      ✅ Withdraw money
│       ├── fd/            ✅ FD calculator
│       └── loan/          ✅ Loan calculator
│
├── backend/               ✅ Express.js server
│   ├── src/
│   │   ├── server.js      ✅ API endpoints
│   │   ├── bankingLogic.js ✅ Banking operations
│   │   └── utils/
│   │       ├── filePaths.js  ✅ File path constants
│   │       └── lockSystem.js ✅ Lock mechanism
│   │
│   ├── database/
│   │   ├── users.txt      ✅ User credentials
│   │   └── accounts/      ✅ User balances
│   │
│   ├── shared-data/
│   │   ├── main.txt       ✅ Input for C++
│   │   ├── result.txt     ✅ Output from C++
│   │   └── lock.txt       ✅ Synchronization lock
│   │
│   └── cpp/
│       └── processor.cpp  ✅ FD & Loan calculator
│
├── README.md              ✅ Complete documentation
└── start.sh               ✅ Helper script
```

## 🚀 How to Run

### Step 1: Start C++ Processor (Terminal 1)

```bash
cd backend/cpp
./processor
```

You should see: `C++ Processor started. Waiting for operations...`

### Step 2: Start Express Backend (Terminal 2)

```bash
cd backend
npm start
```

You should see: `Server running on http://localhost:5000`

### Step 3: Start Next.js Frontend (Terminal 3)

```bash
cd frontend
npm run dev
```

You should see: `Ready on http://localhost:3000`

### Step 4: Open Browser

Go to: **http://localhost:3000**

## 🧪 Test the Application

1. **Login**: Create a new user (e.g., user: `john`, password: `pass123`)
2. **Deposit**: Add ₹5000 to your account
3. **Withdraw**: Take out ₹1000
4. **Check Balance**: See your current balance (₹4000)
5. **FD Calculator**: Calculate returns on ₹10000 @ 7% for 5 years
6. **Loan Calculator**: Calculate EMI for ₹100000 @ 10% for 2 years

## 📝 Key Features

### Simple & Beginner-Friendly

- ✅ No complex classes or patterns
- ✅ Simple functions only
- ✅ Easy-to-understand code
- ✅ Line-by-line file operations
- ✅ Text files for storage (no database)

### File-Based IPC

- ✅ `lock.txt` for synchronization (0 = free, 1 = locked)
- ✅ `main.txt` for Express → C++ communication
- ✅ `result.txt` for C++ → Express communication

### Banking Operations

- ✅ User login/registration
- ✅ Deposit money
- ✅ Withdraw money
- ✅ Check balance
- ✅ FD maturity calculation (C++)
- ✅ Loan EMI calculation (C++)

## 🔧 Technologies Used

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Calculator**: C++ (compiled with g++)
- **Storage**: Plain text files
- **IPC**: File-based lock system

## 📚 Learning Points

This project teaches:

1. **Inter-Process Communication** using files
2. **Lock-based synchronization** for process coordination
3. **REST API design** with Express.js
4. **React state management** with hooks
5. **File I/O operations** in Node.js and C++
6. **Financial calculations** (FD and EMI formulas)

## ✨ What Makes This Special

1. **No Database**: Uses simple text files
2. **No Complex JS**: No classes, just functions
3. **Beginner-Friendly**: Easy to understand
4. **Real IPC**: Demonstrates process communication
5. **Practical**: Real-world banking operations
6. **Multi-Language**: JavaScript + C++ integration

## 🎯 All Requirements Met

✅ Simple text files for data storage
✅ One lock file for synchronization
✅ No complex code structures
✅ Beginner-friendly implementation
✅ Login system with auto-registration
✅ Banking operations (deposit, withdraw, balance)
✅ FD calculator using C++
✅ Loan calculator using C++
✅ File-based IPC between Express and C++
✅ Simple lock system
✅ Complete Next.js frontend
✅ Tailwind CSS styling
✅ Comprehensive documentation

## 📖 Next Steps

1. Try creating multiple users
2. Test concurrent operations
3. Examine the text files to see how data is stored
4. Modify the FD/Loan formulas in C++
5. Add more banking features

Enjoy learning with this simple banking system! 🎓
