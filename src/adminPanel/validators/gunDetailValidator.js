const { body } = require("express-validator");

exports.createGunValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("description is required"),
  body("magazineSize")
    .notEmpty()
    .isNumeric()
    .withMessage("magazine size is required"),
  body("minMaxSettings")
    .notEmpty()
    .isObject()
    .withMessage("minMaxSetting object is required"),
  body("additionalSettings")
    .isObject()
    .notEmpty()
    .withMessage("Additional settings obejct is required"),
  body("modifiers")
    .isObject()
    .notEmpty()
    .withMessage("modifiers object is required"),
  body("specificGunValues")
    .isObject()
    .notEmpty()
    .withMessage("specific gun values object is required"),
];

exports.updateGunValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("description")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("description is required"),
  body("magazineSize")
    .optional()
    .notEmpty()
    .isNumeric()
    .withMessage("magazine size is required"),
  body("minMaxSettings")
    .optional()
    .notEmpty()
    .isObject()
    .withMessage("minMaxSetting object is required"),
  body("additionalSettings")
    .optional()
    .isObject()
    .notEmpty()
    .withMessage("Additional settings obejct is required"),
  body("modifiers")
    .optional()
    .isObject()
    .notEmpty()
    .withMessage("modifiers object is required"),
  body("specificGunValues")
    .optional()
    .isObject()
    .notEmpty()
    .withMessage("specific gun values object is required"),
];

exports.deleteManyGunsValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
