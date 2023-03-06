const GunAttachment = require("../models/GunAttachment");
const { validationResult } = require("express-validator");

//@desc Admin creates gun attachment
//@route POST /admin/gun-attachments
//@access Admin Only
exports.adminCreatesGunAttachment = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    part,
    model,
    texture,
    accuracyRating,
    damageRating,
    ergonomicsRating,
    fireRateRating,
    firingSoundGunshot,
    firingVFXMuzzleFlash,
    lengthInCm,
    rangeRating,
    recoilRating,
    weight,
  } = req.body;

  //create gunAttachment
  const gunAttachmentCreated = await GunAttachment.create({
    part,
    model,
    texture,
    accuracyRating,
    damageRating,
    ergonomicsRating,
    fireRateRating,
    firingSoundGunshot,
    firingVFXMuzzleFlash,
    lengthInCm,
    rangeRating,
    recoilRating,
    weight,
  });

  //send student data
  res.status(201).json({
    status: "success",
    message: "GunAttachemnt created successfully",
    data: gunAttachmentCreated,
  });
};
