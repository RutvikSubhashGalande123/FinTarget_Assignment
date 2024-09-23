const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../../log/task.log");

const getFormattedTimestamp = () => {
  const now = new Date();
  return now.toISOString(); 
};
const logMessage = (level, userId, message) => {
  const logEntry = `[${getFormattedTimestamp()}] [${level.toUpperCase()}] User: ${userId} - ${message}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) throw err;
  });
};
const logTaskCompletion = (userId) => {
  logMessage("info", userId, "Task completed");
};
module.exports = { logTaskCompletion, logMessage };
