const express = require("express");
const {
  adminCreatesGunAttachment,
} = require("../controllers/GunAttachmentsController");
const { body } = require("express-validator");

const GunAttachmentRouter = express.Router();

//validators
const createGunAttachmentValidator = [
  body("part").notEmpty().withMessage("part is required"),
  body("model").notEmpty().withMessage("part is required"),
  body("texture").notEmpty().withMessage("part is required"),
  body("accuracyRating").isNumeric().notEmpty(),

  body("damageRating").isNumeric().notEmpty(),
  body("ergonomicsRating").isNumeric().notEmpty(),
  body("fireRateRating").isNumeric().notEmpty(),
  body("firingSoundGunshot").isNumeric().notEmpty(),
  body("firingVFXMuzzleFlash").isNumeric().notEmpty(),
  body("lengthInCm").isNumeric().notEmpty(),
  body("rangeRating").isNumeric().notEmpty(),
  body("recoilRating").isNumeric().notEmpty(),
  body("weight").isNumeric().notEmpty(),
];

//create new gun-attachments
GunAttachmentRouter.post(
  "/",
  createGunAttachmentValidator,
  adminCreatesGunAttachment
);

module.exports = GunAttachmentRouter;
