const { body } = require("express-validator");

exports.createDroneValidation = [
  body("droneType").notEmpty().withMessage("droneType is required"),
  body("gunType").notEmpty().withMessage("gunType is required"),
  body("damage").isNumeric().notEmpty().withMessage("damage is required"),
  body("accuracy").isNumeric().notEmpty().withMessage("accuracy is required"),
  body("fireRate").isNumeric().notEmpty().withMessage("fireRate is required"),
  body("hitPoints").isNumeric().notEmpty().withMessage("hitPoints is required"),
  body("movementSpeed").isNumeric().notEmpty().withMessage("movementSpeed is required"),
  body("turningSpeed").isNumeric().notEmpty().withMessage("turningSpeed is required"),
  body("shootingEffectiveRange").isNumeric().notEmpty().withMessage("shootingEffectiveRange is required"),
  body("shootingMaximumRange").isNumeric().notEmpty().withMessage("shootingMaximumRange is required"),
  body("touchDamage").isNumeric().notEmpty().withMessage("touchDamage is required"),
  body("magazineSize").isNumeric().notEmpty().withMessage("magazineSize is required"),
  body("reloadTime").isNumeric().notEmpty().withMessage("reloadTime is required"),
  body("patrolRangeMinimum").isNumeric().notEmpty().withMessage("patrolRangeMinimum is required"),
  body("patrolRangeMaximum").isNumeric().notEmpty().withMessage("patrolRangeMaximum is required"),
  body("patrolMovementSpeed").isNumeric().notEmpty().withMessage("patrolMovementSpeed is required"),
  body("auditoryRange").isNumeric().notEmpty().withMessage("auditoryRange is required"),
  body("visionRange").isNumeric().notEmpty().withMessage("visionRange is required"),
  body("nearestDroneEngagedDetectionRange").isNumeric().notEmpty().withMessage("nearestDroneEngagedDetectionRange is required"),
  body("respawning").isBoolean().notEmpty().withMessage("respawning is required"),
  body("aimPoints").isArray().notEmpty().withMessage("aimPoints is required"),
  body("noiseRange").isNumeric().notEmpty().withMessage("noiseRange is required"),
  body("patrolClearance").isNumeric().notEmpty().withMessage("patrolClearance is required"),
  body("maximumClearance").isNumeric().notEmpty().withMessage("maximumClearance is required"),
];

exports.updateDroneValidation = [
  body("part").optional().notEmpty().withMessage("part is required"),
  body("model").optional().notEmpty().withMessage("model is required"),
  body("texture").optional().notEmpty().withMessage("texture is required"),
  body("accuracyRating").optional().isNumeric().notEmpty(),
  body("damageRating").optional().isNumeric().notEmpty(),
  body("ergonomicsRating").optional().isNumeric().notEmpty(),
  body("fireRateRating").optional().isNumeric().notEmpty(),
  body("firingSoundGunshot").optional().isNumeric().notEmpty(),
  body("firingVFXMuzzleFlash").optional().isNumeric().notEmpty(),
  body("lengthInCm").optional().isNumeric().notEmpty(),
  body("rangeRating").optional().isNumeric().notEmpty(),
  body("recoilRating").optional().isNumeric().notEmpty(),
  body("weight").optional().isNumeric().notEmpty(),
];

exports.deleteManyDroneValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
