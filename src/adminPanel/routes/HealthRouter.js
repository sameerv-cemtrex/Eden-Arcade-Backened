const express = require("express");
const {
  createHealth,
  getHealth,
  updateHealth,
} = require("../controllers/HealthController");
const response = require("../middlewares/response");
const Health = require("../models/Health");

const HealthRouter = express.Router();

HealthRouter.route("/").post(createHealth).get(response(Health), getHealth);

HealthRouter.route("/:id").put(updateHealth);

module.exports = HealthRouter;
