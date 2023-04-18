const { body } = require("express-validator");

exports.createDomeSaleItemValidation = [
  body("dome").isNumeric().notEmpty().withMessage("dome is required"),
  body("startTime")
    .isNumeric()
    .notEmpty()
    .withMessage("start time is required"),
  body("endTime").isNumeric().notEmpty().withMessage("end time is required"),
  body("item").isString().notEmpty().withMessage("item is required"),
  body("discountedPrice")
    .isNumeric()
    .notEmpty()
    .withMessage("discount price is required"),
];

exports.updateDomeSaleItemValidation = [
  body("dome")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("dome is required"),
  body("startTime")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("start time is required"),
  body("endTime")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("end time is required"),
  body("item").optional().isString().notEmpty().withMessage("item is required"),
  body("discountedPrice")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("discount price is required"),
];

exports.deleteManyDomeSaleItemsValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
