const redis = require("../config/redisConfiguration");
const logger = require("./logger"); // Import the logger module

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
      logger.logTaskCompletion(userId); // Log task completion using the logger
    } else {
      break;
    }
  }
};
