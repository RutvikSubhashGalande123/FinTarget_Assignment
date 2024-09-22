const redis = require("../config/redisConfiguration");
const RATE_LIMIT = 20; // 20 tasks per minute
const WINDOW_SIZE_IN_SECONDS = 60; // 1 minute

module.exports = async (req, res, next) => {
  const userId = req.body.user_id;
  const currentTime = Math.floor(Date.now() / 1000);

  const requestCount = (await redis.get(userId)) || 0;

  if (requestCount >= RATE_LIMIT) {
    return res
      .status(429)
      .json({ error: "Rate limit exceeded. Try again later." });
  }

  redis.multi().incr(userId).expire(userId, WINDOW_SIZE_IN_SECONDS).exec();

  next();
};
