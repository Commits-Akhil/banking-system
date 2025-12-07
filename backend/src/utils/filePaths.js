const path = require("path");

// Database paths
const usersFile = path.join(__dirname, "../../database/users.txt");
const accountsFolder = path.join(__dirname, "../../database/accounts");

// Shared data paths
const mainFile = path.join(__dirname, "../../shared-data/main.txt");
const resultFile = path.join(__dirname, "../../shared-data/result.txt");

module.exports = {
  usersFile,
  accountsFolder,
  mainFile,
  resultFile
};
