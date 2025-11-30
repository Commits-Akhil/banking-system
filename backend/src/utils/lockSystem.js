const fs = require("fs");
const { lockFile } = require("./filePaths");

// Read lock (0 or 1)
function getLock() {
  return fs.readFileSync(lockFile, "utf8").trim();
}

// Set lock
function setLock(value) {
  fs.writeFileSync(lockFile, String(value));
}

// Wait until lock becomes expected
function waitFor(expected, cb) {
  const interval = setInterval(() => {
    if (getLock() === expected) {
      clearInterval(interval);
      cb();
    }
  }, 50);
}

module.exports = { getLock, setLock, waitFor };
