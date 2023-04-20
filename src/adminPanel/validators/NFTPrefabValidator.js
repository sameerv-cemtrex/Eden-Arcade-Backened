const { body } = require("express-validator");

exports.createNFTPrefabValidation = [
  body("name").isString().notEmpty().withMessage("name is required"),
  body("domeId").isNumeric().notEmpty().withMessage("dome Id is required"),
  body("panel1").isString().notEmpty().withMessage("Panel 1 is required"),
  body("panel2").isString().notEmpty().withMessage("Panel 2 is required"),
  body("panel3").isString().notEmpty().withMessage("Panel 3 is required"),
  body("panel4").isString().notEmpty().withMessage("Panel 4 is required"),
  body("panel5").isString().notEmpty().withMessage("Panel 5 is required"),
  body("panel6").isString().notEmpty().withMessage("Panel 6 is required"),
];

exports.updateNFTPrefabValidation = [
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("dome Id is required"),
  body("domeId")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("dome Id is required"),
  body("panel1")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 1 is required"),
  body("panel2")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 2 is required"),
  body("panel3")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 3 is required"),
  body("panel4")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 4 is required"),
  body("panel5")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 5 is required"),
  body("panel6")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Panel 6 is required"),
];

exports.deleteManyNFTPrefabValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
