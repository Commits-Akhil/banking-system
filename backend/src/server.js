const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {
  userExists,
  checkPassword,
  createUser,
  createAccount,
  getBalance,
  deposit,
  withdraw
} = require("./bankingLogic");
const { setLock, waitFor } = require("./utils/lockSystem");
const { mainFile, resultFile } = require("./utils/filePaths");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Login endpoint
app.post("/login", (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: "Missing userId or password" });
  }

  // Check if user exists
  if (userExists(userId)) {
    // Verify password
    if (checkPassword(userId, password)) {
      return res.json({ success: true, message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } else {
    // Create new user
    createUser(userId, password);
    createAccount(userId);
    return res.json({ success: true, message: "New user created" });
  }
});

// Deposit endpoint
app.post("/deposit", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  const parsedAmount = parseInt(amount);
  if (parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  const newBalance = deposit(userId, parsedAmount);
  res.json({ success: true, balance: newBalance });
});

// Withdraw endpoint
app.post("/withdraw", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  const parsedAmount = parseInt(amount);
  if (parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  const newBalance = withdraw(userId, parsedAmount);
  if (newBalance === null) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  res.json({ success: true, balance: newBalance });
});

// Balance endpoint
app.get("/balance/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  const balance = getBalance(userId);
  res.json({ success: true, balance: balance });
});

// FD Calculator endpoint
app.post("/fd", (req, res) => {
  const { principal, rate, time } = req.body;

  if (!principal || !rate || !time) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Wait for lock to be 0
  waitFor("0", () => {
    // Set lock to 1
    setLock(1);

    // Write to main.txt
    const data = "FD\n" + principal + "\n" + rate + "\n" + time + "\n";
    fs.writeFileSync(mainFile, data);

    // Wait for C++ to process and set lock to 0
    waitFor("0", () => {
      // Read result.txt
      const result = fs.readFileSync(resultFile, "utf8").trim();
      res.json({ success: true, result: result });
    });
  });
});

// Loan Calculator endpoint
app.post("/loan", (req, res) => {
  const { principal, rate, time } = req.body;

  if (!principal || !rate || !time) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Wait for lock to be 0
  waitFor("0", () => {
    // Set lock to 1
    setLock(1);

    // Write to main.txt
    const data = "LOAN\n" + principal + "\n" + rate + "\n" + time + "\n";
    fs.writeFileSync(mainFile, data);

    // Wait for C++ to process and set lock to 0
    waitFor("0", () => {
      // Read result.txt
      const result = fs.readFileSync(resultFile, "utf8").trim();
      res.json({ success: true, result: result });
    });
  });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
