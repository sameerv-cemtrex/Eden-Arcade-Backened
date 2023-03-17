const express = require("express");
const {
  adminCreatesHumanGunTrait,
  updateHumanGunTrait,
  getHumanGunTraits,
  getHumanGunTrait,
  deleteHumanGunTrait,
} = require("../controllers/HumanGunTraitsController");
const {
  humanGunTraitValidation,
  updateHumanGunTraitValidation,
} = require("../validators/humanGunTraitValidator");
const response = require("../middlewares/response");
const HumanGunTrait = require("../models/HumanGunTrait");

const HumanGunTraitRouter = express.Router();

HumanGunTraitRouter.route("/")
  .post(humanGunTraitValidation, adminCreatesHumanGunTrait)
  .get(response(HumanGunTrait), getHumanGunTraits)
  .delete();

HumanGunTraitRouter.route("/:id")
  .get(getHumanGunTrait)
  .put(updateHumanGunTraitValidation, updateHumanGunTrait)
  .delete(deleteHumanGunTrait);

//create new gun-details

module.exports = HumanGunTraitRouter;
