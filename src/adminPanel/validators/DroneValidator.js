const { body } = require("express-validator");

exports.createDroneValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("droneType").notEmpty().withMessage("droneType is required"),
  body("gunType").notEmpty().withMessage("gunType is required"),
  body("damage").isNumeric().notEmpty().withMessage("damage is required"),
  body("accuracy").isNumeric().notEmpty().withMessage("accuracy is required"),
  body("fireRate").isNumeric().notEmpty().withMessage("fireRate is required"),
  body("hitPoints").isNumeric().notEmpty().withMessage("hitPoints is required"),
  body("movementSpeed")
    .isNumeric()
    .notEmpty()
    .withMessage("movementSpeed is required"),
  body("turningSpeed")
    .isNumeric()
    .notEmpty()
    .withMessage("turningSpeed is required"),
  body("shootingEffectiveRange")
    .isNumeric()
    .notEmpty()
    .withMessage("shootingEffectiveRange is required"),
  body("shootingMaximumRange")
    .isNumeric()
    .notEmpty()
    .withMessage("shootingMaximumRange is required"),
  body("touchDamage")
    .isNumeric()
    .notEmpty()
    .withMessage("touchDamage is required"),
  body("magazineSize")
    .isNumeric()
    .notEmpty()
    .withMessage("magazineSize is required"),
  body("reloadTime")
    .isNumeric()
    .notEmpty()
    .withMessage("reloadTime is required"),
  body("patrolRangeMinimum")
    .isNumeric()
    .notEmpty()
    .withMessage("patrolRangeMinimum is required"),
  body("patrolRangeMaximum")
    .isNumeric()
    .notEmpty()
    .withMessage("patrolRangeMaximum is required"),
  body("patrolMovementSpeed")
    .isNumeric()
    .notEmpty()
    .withMessage("patrolMovementSpeed is required"),
  body("auditoryRange")
    .isNumeric()
    .notEmpty()
    .withMessage("auditoryRange is required"),
  body("visionRange")
    .isNumeric()
    .notEmpty()
    .withMessage("visionRange is required"),
  body("nearestDroneEngagedDetectionRange")
    .isNumeric()
    .notEmpty()
    .withMessage("nearestDroneEngagedDetectionRange is required"),
  body("respawning")
    .isBoolean()
    .notEmpty()
    .withMessage("respawning is required"),
  body("aimPoints").isArray().notEmpty().withMessage("aimPoints is required"),
  body("noiseRange")
    .isNumeric()
    .notEmpty()
    .withMessage("noiseRange is required"),
  body("patrolClearance")
    .isNumeric()
    .notEmpty()
    .withMessage("patrolClearance is required"),
  body("maximumClearance")
    .isNumeric()
    .notEmpty()
    .withMessage("maximumClearance is required"),
];

exports.updateDroneValidation = [
  body("name").optional().notEmpty().withMessage("name is required"),
  body("droneType").optional().notEmpty().withMessage("droneType is required"),
  body("gunType").optional().notEmpty().withMessage("gunType is required"),
  body("damage")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("damage is required"),
  body("accuracy")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("accuracy is required"),
  body("fireRate")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("fireRate is required"),
  body("hitPoints")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("hitPoints is required"),
  body("movementSpeed")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("movementSpeed is required"),
  body("turningSpeed")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("turningSpeed is required"),
  body("shootingEffectiveRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("shootingEffectiveRange is required"),
  body("shootingMaximumRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("shootingMaximumRange is required"),
  body("touchDamage")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("touchDamage is required"),
  body("magazineSize")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("magazineSize is required"),
  body("reloadTime")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("reloadTime is required"),
  body("patrolRangeMinimum")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("patrolRangeMinimum is required"),
  body("patrolRangeMaximum")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("patrolRangeMaximum is required"),
  body("patrolMovementSpeed")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("patrolMovementSpeed is required"),
  body("auditoryRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("auditoryRange is required"),
  body("visionRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("visionRange is required"),
  body("nearestDroneEngagedDetectionRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("nearestDroneEngagedDetectionRange is required"),
  body("respawning")
    .optional()
    .isBoolean()
    .notEmpty()
    .withMessage("respawning is required"),
  body("aimPoints")
    .optional()
    .isArray()
    .notEmpty()
    .withMessage("aimPoints is required"),
  body("noiseRange")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("noiseRange is required"),
  body("patrolClearance")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("patrolClearance is required"),
  body("maximumClearance")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("maximumClearance is required"),
];

exports.deleteManyDroneValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
