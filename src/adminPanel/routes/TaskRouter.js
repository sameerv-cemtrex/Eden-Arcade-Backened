const express = require("express");
const {
    createTask
} = require("../controllers/TasksController");
// const {
  
// } = require("../validators/DroneValidator");
const response = require("../middlewares/response");
const Task = require("../models/Task");

const TaskRouter = express.Router();

TaskRouter.route("/")
  .post(createTask)
//   .get(response(Drone), getAllDrones)
//   .delete(deleteManyDroneValidation, deleteDrones);

// TaskRouter.route("/:id")
//   .get(getDrone)
//   .put(updateDroneValidation, updateDrone)
//   .delete(deleteDrone);

module.exports = TaskRouter;
