const { body } = require("express-validator");

exports.createGunAttachmentValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("type").notEmpty().withMessage("type is required"),
  body("model").notEmpty().withMessage("model is required"),
  body("texture").notEmpty().withMessage("texture is required"),
  body("accuracyRating")
    .isNumeric()
    .notEmpty()
    .withMessage("accuracyRating is required"),
  body("damageRating")
    .isNumeric()
    .notEmpty()
    .withMessage("damageRating is required"),
  body("ergonomicsRating")
    .isNumeric()
    .notEmpty()
    .withMessage("ergonomicsRating is required"),
  body("fireRateRating")
    .isNumeric()
    .notEmpty()
    .withMessage("fireRateRating is required"),
  body("firingSoundGunshot")
    .isNumeric()
    .notEmpty()
    .withMessage("firingSoundGunshot is required"),
  body("firingVFXMuzzleFlash")
    .isNumeric()
    .notEmpty()
    .withMessage("firingVFXMuzzleFlash is required"),
  body("lengthInCm")
    .isNumeric()
    .notEmpty()
    .withMessage("lengthInCm is required"),
  body("rangeRating")
    .isNumeric()
    .notEmpty()
    .withMessage("rangeRating is required"),
  body("recoilRating")
    .isNumeric()
    .notEmpty()
    .withMessage("recoilRating is required"),
  body("weight").isNumeric().notEmpty().withMessage("weight is required"),
];

exports.updateGunAttachmentValidation = [
  body("name").optional().notEmpty().withMessage("name is required"),
  body("type").optional().notEmpty().withMessage("type is required"),
  body("model").optional().notEmpty().withMessage("model is required"),
  body("texture").optional().notEmpty().withMessage("texture is required"),
  body("accuracyRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("accuracyRating is required"),
  body("damageRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("damageRating is required"),
  body("ergonomicsRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("ergonomicsRating is required"),
  body("fireRateRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("fireRateRating is required"),
  body("firingSoundGunshot")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("firingSoundGunshot is required"),
  body("firingVFXMuzzleFlash")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("firingVFXMuzzleFlash is required"),
  body("lengthInCm")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("lengthInCm is required"),
  body("rangeRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("rangeRating is required"),
  body("recoilRating")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("recoilRating is required"),
  body("weight")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("weight is required"),
];

exports.deleteManyGunAttachmentValidation = [
  body("ids").isArray().notEmpty().withMessage("ids are required"),
];
