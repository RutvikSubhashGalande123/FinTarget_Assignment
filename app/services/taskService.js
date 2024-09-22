const redis = require("../config/redisConfiguration");
const fs = require("fs");
const path = require("path");
const logFilePath = path.join(__dirname, "../../log/task.log");

// Queue task function
exports.queueTask = async (userId) => {
  // Push the task to the Redis queue for the user
  await redis.lpush(`tasks:${userId}`, Date.now());
  // Process task queue asynchronously
  processTaskQueue(userId);
};

// Process task queue
const processTaskQueue = async (userId) => {
  while (true) {
    // Pop tasks from Redis queue at a rate of 1 task per second
    const task = await redis.rpop(`tasks:${userId}`);
    if (task) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 task per second
      logTaskCompletion(userId);
    } else {
      break;
    }
  }
};

// Log task completion to file
const logTaskCompletion = (userId) => {
  const logMessage = `${userId} - task completed at ${Date.now()}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) throw err;
  });
};
