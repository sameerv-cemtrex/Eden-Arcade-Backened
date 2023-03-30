const { body } = require("express-validator");

exports.createLocationValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("locationId")
    .notEmpty()
    .isString()
    .withMessage("locationId is required"),
  body("locationDetectionRadius")
    .notEmpty()
    .isNumeric()
    .withMessage("locationDetectionRadius is required"),
];

exports.updateLocationValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("locationId")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("locationId is required"),
  body("locationDetectionRadius")
    .optional()
    .notEmpty()
    .isNumeric()
    .withMessage("locationDetectionRadius is required"),
];

exports.deleteManyLocationsValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
