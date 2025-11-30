# Simple Banking System

A beginner-friendly banking application built with Next.js, Express.js, and C++ IPC.

## 📁 Project Structure

```
banking-system/
│
├── frontend/          (Next.js 14)
│   ├── app/
│   │   ├── page.jsx
│   │   ├── login/page.jsx
│   │   ├── dashboard/page.jsx
│   │   ├── deposit/page.jsx
│   │   ├── withdraw/page.jsx
│   │   ├── fd/page.jsx
│   │   └── loan/page.jsx
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── bankingLogic.js
│   │   └── utils/
│   │       ├── filePaths.js
│   │       └── lockSystem.js
│   │
│   ├── database/
│   │   ├── users.txt         # stores users (userId,password)
│   │   └── accounts/         # stores per-user account balance
│   │       └── userid.txt
│   │
│   ├── shared-data/
│   │   ├── main.txt          # Express writes input for C++
│   │   ├── result.txt        # C++ writes result for Express
│   │   └── lock.txt          # 0/1 lock file
│   │
│   └── cpp/
│       ├── processor.cpp     # FD & Loan calculators
│       └── build/
│
└── README.md
```

## 🎯 Features

- **Login System**: Create new users or login existing users
- **Deposit**: Add money to your account
- **Withdraw**: Take money from your account
- **Balance**: Check your current balance
- **FD Calculator**: Calculate Fixed Deposit maturity amount (uses C++)
- **Loan Calculator**: Calculate EMI for loans (uses C++)

## 🔄 How It Works

### Simple File-Based IPC

The system uses simple text files to communicate between Express.js and C++:

1. **lock.txt**: Contains `0` (free) or `1` (locked)
2. **main.txt**: Express writes operation data here
3. **result.txt**: C++ writes calculation results here

### Lock System Flow

```
1. Express waits for lock = 0
2. Express sets lock = 1
3. Express writes to main.txt
4. C++ reads main.txt (when lock = 1)
5. C++ calculates result
6. C++ writes to result.txt
7. C++ sets lock = 0
8. Express reads result.txt
9. Express returns result to frontend
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm
- g++ compiler (for C++)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 3: Compile C++ Code

```bash
cd backend/cpp
g++ processor.cpp -o processor
```

This creates an executable file named `processor` in the `backend/cpp` directory.

## 🚀 Running the Application

You need to run THREE processes in separate terminals:

### Terminal 1: Start C++ Processor

```bash
cd backend/cpp
./processor
```

You should see: `C++ Processor started. Waiting for operations...`

**Important**: The C++ processor MUST be running before you use FD or Loan calculators!

### Terminal 2: Start Express Backend

```bash
cd backend
npm start
```

You should see: `Server running on http://localhost:5000`

### Terminal 3: Start Next.js Frontend

```bash
cd frontend
npm run dev
```

You should see: `Ready on http://localhost:3000`

## 🧪 Testing the Application

### 1. Open your browser and go to http://localhost:3000

### 2. Test Login

- Enter any User ID (e.g., `john123`)
- Enter any Password (e.g., `password`)
- Click Login
- If it's a new user, an account will be created automatically
- You'll be redirected to the dashboard

### 3. Test Deposit

- Click "Deposit" button
- Enter amount (e.g., `5000`)
- Click Deposit
- You'll see your new balance

### 4. Test Withdraw

- Click "Withdraw" button
- Enter amount (e.g., `1000`)
- Click Withdraw
- You'll see your new balance

### 5. Test Balance

- Click "Refresh Balance" on dashboard
- Your current balance will be displayed

### 6. Test FD Calculator

- Click "FD Calculator"
- Enter Principal: `10000`
- Enter Rate: `7`
- Enter Time: `5`
- Click Calculate
- Result: `FD Maturity Amount = 14025`

### 7. Test Loan Calculator

- Click "Loan Calculator"
- Enter Loan Amount: `100000`
- Enter Annual Rate: `10`
- Enter Time: `2`
- Click Calculate EMI
- Result: `Loan EMI = 4614` (monthly EMI)

## 📝 Data Storage

All data is stored in simple text files:

### users.txt

```
john123,password
alice456,pass123
```

### accounts/john123.txt

```
5000
```

### lock.txt

```
0
```

## 🔧 Troubleshooting

### Issue: FD/Loan calculator not working

**Solution**: Make sure the C++ processor is running in a separate terminal

### Issue: "Error connecting to server"

**Solution**: Make sure the Express backend is running on port 5000

### Issue: Cannot compile C++ code

**Solution**: Install g++ compiler:

- macOS: `xcode-select --install`
- Linux: `sudo apt-get install g++`
- Windows: Install MinGW or use WSL

### Issue: Port already in use

**Solution**:

- Frontend: Change port in `frontend/package.json`
- Backend: Change PORT in `backend/src/server.js`

## 📚 Code Explanation

### Backend Architecture

**bankingLogic.js**: Simple functions for user and account management

- Uses `fs.readFileSync` and `fs.writeFileSync`
- No classes, just plain functions
- Reads/writes text files line by line

**lockSystem.js**: Simple polling-based lock

- Checks lock file every 50ms
- Waits until lock becomes expected value

**server.js**: Express API endpoints

- `/login`: Create or authenticate user
- `/deposit`: Add money
- `/withdraw`: Remove money
- `/balance/:userId`: Get balance
- `/fd`: Calculate FD (uses C++)
- `/loan`: Calculate EMI (uses C++)

### C++ Processor

**processor.cpp**: Infinite loop waiting for operations

- Checks `lock.txt` every 50ms
- When lock = 1, reads `main.txt`
- Calculates FD or Loan
- Writes result to `result.txt`
- Sets lock = 0

**FD Formula**: `A = P * (1 + r/100)^t`
**EMI Formula**: `EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]`

### Frontend Architecture

All pages use:

- `useState` for form data
- `fetch` to call backend API
- `localStorage` to store userId
- Simple forms with Tailwind CSS

## 🎓 Learning Points

This project demonstrates:

1. **File-based IPC**: Process communication using text files
2. **Lock-based synchronization**: Simple mutex using file flags
3. **REST API**: Express endpoints for frontend-backend communication
4. **React hooks**: useState, useEffect for state management
5. **C++ calculations**: Mathematical formulas for financial calculations

## 📄 License

This is a simple educational project. Feel free to use and modify!
