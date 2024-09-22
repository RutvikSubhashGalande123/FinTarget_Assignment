const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const { user_id } = req.body;
    // Queue the task for the user
    await taskService.queueTask(user_id);
    return res.status(200).json({ message: "Task queued successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Task queuing failed", details: error.message });
  }
};
