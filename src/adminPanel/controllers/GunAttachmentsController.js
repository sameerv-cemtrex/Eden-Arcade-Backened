const GunAttachment = require("../models/GunAttachment");
const { validationResult } = require("express-validator");


//@desc Admin creates gun attachment
//@route POST /admin/gun-attachments
//@access Public
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

//@desc Get all gun attachment
//@route GET /admin-panel/gun-attachments
//@access public
exports.getAllGunAttachments = async (req, res) => {
  res.status(200).json(res.result)
};

//@desc Get gun attachment by id
//@route GET /admin-panel/gun-attachments/:id
//@access public
exports.getGunAttachment = async (req, res, next) => {

  try {
    const gunAttachment = await GunAttachment.findById(req.params.id);

    if (!gunAttachment) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: gunAttachment,
    });
  } catch (error) {
    error.statusCode = 404
    next(error)
  }



};

//@desc Update gun attachment by id
//@route PUT /admin-panel/gun-attachments/:id
//@access public
exports.updateGunAttachment = async (req, res) => {
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
  const updates = req.body
  console.log(updates)
  //check if gun-attachment exists
  const gunAttachmentFound = await GunAttachment.findById(req.params.id);
  if (!gunAttachmentFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const gunAttachmentUpdated = await GunAttachment.findByIdAndUpdate(
    req.params.id,
    {
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
    }, {
    new: true
  }
  );
  res.status(200).json({
    status: true,
    message: "Gun attachment updated successfully",
    data: gunAttachmentUpdated,
  });
};

//@desc Delete gun attachment by id
//@route DELETE /admin-panel/gun-attachments/:id
//@access public
exports.deleteGunAttachment = async (req, res) => {
  await GunAttachment.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: true,
    message: "Gun attachment deleted successfully.",
    data: {},
  });
};
