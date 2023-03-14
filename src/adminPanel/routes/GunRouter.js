const express = require("express");
const {
  createGun,
  getAllGuns,
  getGun,
  deleteManyGuns,
  updateGun,
  deleteGun,
} = require("../controllers/GunsController");
const {
  createGunValidation,
  updateGunValidation,
  deleteManyGunsValidation,
} = require("../validators/gunDetailValidator");
const response = require("../middlewares/response");
const Gun = require("../models/Gun");

const GunRouter = express.Router();

GunRouter.route("/")
  .post(createGunValidation, createGun)
  .get(response(Gun), getAllGuns)
  .delete(deleteManyGunsValidation, deleteManyGuns);

GunRouter.route("/:id")
  .get(getGun)
  .put(updateGunValidation, updateGun)
  .delete(deleteGun);

//create new gun-details

module.exports = GunRouter;
