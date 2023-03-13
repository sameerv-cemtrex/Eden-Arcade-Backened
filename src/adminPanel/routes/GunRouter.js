const express = require("express");
const { createGun } = require("../controllers/GunsController");
const {} = require("../validators/gunDetailValidator");
const response = require("../middlewares/response");
const Gun = require("../models/Gun");

const GunRouter = express.Router();

GunRouter.route("/").post(createGun);

//create new gun-details

module.exports = GunRouter;
