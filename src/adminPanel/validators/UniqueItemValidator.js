const { body } = require("express-validator");

exports.createUniqueItemValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("resource").notEmpty().isString().withMessage("resource is required"),
  body("quantity").isNumeric().notEmpty().withMessage("quantity is required"),
];

exports.updateUniqueItemValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("resource")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("resource is required"),
  body("quantity")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("quantity is required"),
];

exports.deleteManyUniqueItemValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
