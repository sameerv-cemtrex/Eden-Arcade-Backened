const express = require("express");
const {
  createLocation,
  getLocation,
  getAllLocations,
  updateLocation,
  deleteLocations,
  deleteLocation,
} = require("../controllers/LocationsController");
const response = require("../middlewares/response");
const Location = require("../models/Location");
const {
  createLocationValidation,
  updateLocationValidation,
  deleteManyLocationsValidation,
} = require("../validators/LocationValidator");

const LocationRouter = express.Router();

LocationRouter.route("/")
  .post(createLocationValidation, createLocation)
  .get(response(Location), getAllLocations)
  .delete(deleteManyLocationsValidation, deleteLocations);

LocationRouter.route("/:id")
  .get(getLocation)
  .put(updateLocationValidation, updateLocation)
  .delete(deleteLocation);

module.exports = LocationRouter;
