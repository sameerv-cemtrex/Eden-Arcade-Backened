const { body } = require("express-validator");

exports.createCollectableItemValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("resource").notEmpty().isString().withMessage("resource is required"),
  body("quantity").isNumeric().notEmpty().withMessage("quantity is required"),
];

exports.updateCollectableItemValidation = [
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

exports.deleteManyCollectableItemValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
