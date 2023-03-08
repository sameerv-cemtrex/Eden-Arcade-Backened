const { body } = require("express-validator");

exports.createGunAttachmentValidation = [
    body("part").notEmpty().withMessage("part is required"),
    body("model").notEmpty().withMessage("part is required"),
    body("texture").notEmpty().withMessage("part is required"),
    body("accuracyRating").isNumeric().notEmpty(),
    body("damageRating").isNumeric().notEmpty(),
    body("ergonomicsRating").isNumeric().notEmpty(),
    body("fireRateRating").isNumeric().notEmpty(),
    body("firingSoundGunshot").isNumeric().notEmpty(),
    body("firingVFXMuzzleFlash").isNumeric().notEmpty(),
    body("lengthInCm").isNumeric().notEmpty(),
    body("rangeRating").isNumeric().notEmpty(),
    body("recoilRating").isNumeric().notEmpty(),
    body("weight").isNumeric().notEmpty(),
];

exports.updateGunAttachmentValidation = [
    body("part").optional().notEmpty().withMessage("part is required"),
    body("model").optional().notEmpty().withMessage("part is required"),
    body("texture").optional().notEmpty().withMessage("part is required"),
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