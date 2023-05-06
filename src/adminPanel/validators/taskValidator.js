const { body } = require("express-validator");

exports.createTaskValidation = [
  body("name").notEmpty().isString().withMessage("name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("giver").notEmpty().isString().withMessage("giver is required"),
  body("type").notEmpty().isString().withMessage("type is required"),
  body("goals").notEmpty().isArray().withMessage("goals is required"),
  body("rewards").notEmpty().isArray().withMessage("rewards is required"),
  body("extraRewards")
    .notEmpty()
    .isArray()
    .withMessage("Extra rewards is required"),
  body("statRewards")
    .notEmpty()
    .isArray()
    .withMessage("stat rewards is required"),
];

exports.updateTaskValidation = [
  body("name").optional().notEmpty().isString().withMessage("name is required"),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("giver")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("giver is required"),
  body("type").optional().notEmpty().isString().withMessage("type is required"),
  body("goals")
    .optional()
    .notEmpty()
    .isArray()
    .withMessage("goals array is required"),
  body("rewards")
    .optional()
    .isArray()
    .withMessage("rewards array is required"),
  body("extraRewards")
    .optional()
    .isArray()
    .withMessage("extra Rewards array is required"),
  body("statRewards")
    .optional()
    .isArray()
    .withMessage("stat rewards array is required"),
];

exports.deleteManyTasksValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
