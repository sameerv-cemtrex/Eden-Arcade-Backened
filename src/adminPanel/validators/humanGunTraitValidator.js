const { body } = require("express-validator");

exports.humanGunTraitValidation = [
  body("injuries")
    .notEmpty()
    .isObject()
    .withMessage("injuries object is required"),
  body("survival")
    .isObject()
    .notEmpty()
    .withMessage("survival obejct is required"),
];

exports.updateHumanGunTraitValidation = [
  body("injuries")
    .notEmpty()
    .optional()
    .isObject()
    .withMessage("injuries object is required"),
  body("survival")
    .optional()
    .isObject()
    .notEmpty()
    .withMessage("survival obejct is required"),
];

exports.deleteHumanGunTraitsValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
