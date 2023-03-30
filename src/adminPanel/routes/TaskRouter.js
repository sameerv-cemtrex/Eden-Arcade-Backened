const express = require("express");
const {
  createTask,
  getAllTasks,
  getTask,
  deleteTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TasksController");
const response = require("../middlewares/response");
const Task = require("../models/Task");
const {
  deleteManyTasksValidation,
  updateTaskValidation,
} = require("../validators/taskValidator");

const TaskRouter = express.Router();

TaskRouter.route("/")
  .post(createTask)
  .get(response(Task), getAllTasks)
  .delete(deleteManyTasksValidation, deleteTasks);

TaskRouter.route("/:id")
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

module.exports = TaskRouter;
