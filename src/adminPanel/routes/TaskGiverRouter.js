const express = require("express");
const {
  createTaskGiver,
  getAllTaskGivers,
  getTaskGiver,
  updateTaskGiver,
  deleteTaskGiver,
} = require("../controllers/TaskGiversController");
const response = require("../middlewares/response");
const TaskGiver = require("../models/TaskGiver");
const {
  createTaskGiverValidation,
  updateTaskGiverValidation,
} = require("../validators/TaskGiverValidator");

const TaskGiverRouter = express.Router();

TaskGiverRouter.route("/")
  .post(createTaskGiverValidation, createTaskGiver)
  .get(response(TaskGiver), getAllTaskGivers);

TaskGiverRouter.route("/:id")
  .get(getTaskGiver)
  .put(updateTaskGiverValidation, updateTaskGiver)
  .delete(deleteTaskGiver);

module.exports = TaskGiverRouter;
