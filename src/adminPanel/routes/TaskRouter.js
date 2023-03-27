const express = require("express");
const {
  createTask,
  getAllTasks,
  getTask,
} = require("../controllers/TasksController");
// const {

// } = require("../validators/DroneValidator");
const response = require("../middlewares/response");
const Task = require("../models/Task");

const TaskRouter = express.Router();

TaskRouter.route("/").post(createTask).get(response(Task), getAllTasks);
//   .delete(deleteManyDroneValidation, deleteDrones);

TaskRouter.route("/:id").get(getTask);
//   .put(updateDroneValidation, updateDrone)
//   .delete(deleteDrone);

module.exports = TaskRouter;
