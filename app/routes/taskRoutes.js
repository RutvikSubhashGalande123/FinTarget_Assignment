const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const rateLimiter = require("../middlewares/rateLimiter");

// POST /task
router.post("/task", rateLimiter, taskController.createTask);

module.exports = router;
