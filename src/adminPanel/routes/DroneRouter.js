const express = require("express");
const {
  adminCreatesDrone,
  getAllDrones,
} = require("../controllers/DronesController");
const { createDroneValidation } = require("../validators/DroneValidator");
const response = require("../middlewares/response");
const Drone = require("../models/Drone");

const DroneRouter = express.Router();

DroneRouter.route("/")
  .post(createDroneValidation, adminCreatesDrone)
  .get(response(Drone), getAllDrones)
  .delete();

DroneRouter.route("/:id").get().put().delete();

module.exports = DroneRouter;
