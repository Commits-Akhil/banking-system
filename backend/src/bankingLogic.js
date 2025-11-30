const fs = require("fs");
const path = require("path");
const { usersFile, accountsFolder } = require("./utils/filePaths");

// Check if user exists in users.txt
function userExists(userId) {
  if (!fs.existsSync(usersFile)) {
    return false;
  }
  const users = fs.readFileSync(usersFile, "utf8");
  const lines = users.split("\n");
  for (let line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    if (parts[0] === userId) {
      return true;
    }
  }
  return false;
}

// Check password
function checkPassword(userId, password) {
  if (!fs.existsSync(usersFile)) {
    return false;
  }
  const users = fs.readFileSync(usersFile, "utf8");
  const lines = users.split("\n");
  for (let line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    if (parts[0] === userId && parts[1] === password) {
      return true;
    }
  }
  return false;
}

// Create new user
function createUser(userId, password) {
  const userData = userId + "," + password + "\n";
  fs.appendFileSync(usersFile, userData);
}

// Get account file path
function getAccountFile(userId) {
  return path.join(accountsFolder, userId + ".txt");
}

// Create new account
function createAccount(userId) {
  const accountFile = getAccountFile(userId);
  fs.writeFileSync(accountFile, "0");
}

// Get balance
function getBalance(userId) {
  const accountFile = getAccountFile(userId);
  if (!fs.existsSync(accountFile)) {
    return 0;
  }
  const balance = fs.readFileSync(accountFile, "utf8").trim();
  return parseInt(balance);
}

// Set balance
function setBalance(userId, amount) {
  const accountFile = getAccountFile(userId);
  fs.writeFileSync(accountFile, String(amount));
}

// Deposit
function deposit(userId, amount) {
  const currentBalance = getBalance(userId);
  const newBalance = currentBalance + amount;
  setBalance(userId, newBalance);
  return newBalance;
}

// Withdraw
function withdraw(userId, amount) {
  const currentBalance = getBalance(userId);
  if (currentBalance < amount) {
    return null; // Insufficient funds
  }
  const newBalance = currentBalance - amount;
  setBalance(userId, newBalance);
  return newBalance;
}

module.exports = {
  userExists,
  checkPassword,
  createUser,
  createAccount,
  getBalance,
  deposit,
  withdraw
};
