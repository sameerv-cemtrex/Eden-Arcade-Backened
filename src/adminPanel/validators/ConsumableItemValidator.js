const { body } = require("express-validator");

exports.createConsumableItemValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("resource").notEmpty().isString().withMessage("resource is required"),
  body("quantity").isNumeric().notEmpty().withMessage("quantity is required"),
];

exports.updateConsumableItemValidation = [
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

exports.deleteManyConsumableItemValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
