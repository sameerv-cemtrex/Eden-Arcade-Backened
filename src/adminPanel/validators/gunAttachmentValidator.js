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