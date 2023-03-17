const express = require("express");
const {
  adminCreatesDrone,
  getAllDrones,
  getDrone,
  updateDrone,
  deleteDrone,
  deleteDrones,
} = require("../controllers/DronesController");
const {
  createDroneValidation,
  updateDroneValidation,
  deleteManyDroneValidation,
} = require("../validators/DroneValidator");
const response = require("../middlewares/response");
const Drone = require("../models/Drone");

const DroneRouter = express.Router();

DroneRouter.route("/")
  .post(createDroneValidation, adminCreatesDrone)
  .get(response(Drone), getAllDrones)
  .delete(deleteManyDroneValidation, deleteDrones);

DroneRouter.route("/:id")
  .get(getDrone)
  .put(updateDroneValidation, updateDrone)
  .delete(deleteDrone);

module.exports = DroneRouter;
