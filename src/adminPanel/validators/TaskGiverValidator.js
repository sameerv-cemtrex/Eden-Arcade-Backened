const { body } = require("express-validator");

exports.createTaskGiverValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("photo").notEmpty().isString().withMessage("photo is required"),
  body("about").notEmpty().isString().withMessage("about is required"),
  body("taskGiverId")
    .isString()
    .notEmpty()
    .withMessage("taskGiverId is required"),
  body("priority").notEmpty().isNumeric().withMessage("priority is required"),
];

exports.updateTaskGiverValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("photo")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("photo is required"),
  body("about")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("about is required"),
  body("taskGiverId")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("taskGiverId is required"),
  body("priority")
    .optional()
    .notEmpty()
    .isNumeric()
    .withMessage("priority is required"),
];
