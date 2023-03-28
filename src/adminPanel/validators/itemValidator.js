const { body } = require("express-validator");

exports.createItemValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("category").notEmpty().isString().withMessage("category is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("sizeX").isNumeric().notEmpty().withMessage("sizeX is required"),
  body("sizeY").isNumeric().notEmpty().withMessage("sizeY is required"),
  body("edenPurchasePrice")
    .isNumeric()
    .notEmpty()
    .withMessage("edenPurchasePrice is required"),
  body("edenSellingPrice")
    .isNumeric()
    .notEmpty()
    .withMessage("edenSellingPrice is required"),
  body("craftingPrice")
    .isNumeric()
    .notEmpty()
    .withMessage("craftingPrice is required"),
];

exports.updateItemValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("category")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("category is required"),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("sizeX")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("sizeX is required"),
  body("sizeY")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("sizeY is required"),
  body("edenPurchasePrice")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("edenPurchasePrice is required"),
  body("edenSellingPrice")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("edenSellingPrice is required"),
  body("craftingPrice")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("craftingPrice is required"),
];

exports.deleteManyItemsValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
