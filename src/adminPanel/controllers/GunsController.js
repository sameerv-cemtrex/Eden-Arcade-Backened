const Gun = require("../models/Gun");
const { validationResult } = require("express-validator");

//@desc Admin creates gun with details
//@route POST /admin-panel/guns
//@access Public
exports.createGun = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    description,
    magazineSize,
    minMaxSettings,
    additionalSettings,
    modifiers,
    specificGunValues,
  } = req.body;

  //create gun
  const gunCreated = await Gun.create({
    name,
    description,
    magazineSize,
    minMaxSettings,
    additionalSettings,
    modifiers,
    specificGunValues,
  });

  //send gun;s data
  res.status(201).json({
    status: true,
    message: "Gun created successfully",
    data: gunCreated,
  });
};

//@desc Get all guns
//@route GET /admin-panel/guns
//@access Public
exports.getAllGuns = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get gun by id
//@route GET /admin-panel/gun/:id
//@access Public
exports.getGun = async (req, res, next) => {
  try {
    const gun = await Gun.findById(req.params.id);

    if (!gun) {
      throw new Error("No data found", { statusCode: 404 });
    }
    res.status(200).json({
      status: true,
      data: gun,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update gun by id
//@route PUT /admin-panel/gun/:id
//@access Public
exports.updateGun = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    description,
    magazineSize,
    minMaxSettings,
    additionalSettings,
    modifiers,
    specificGunValues,
  } = req.body;

  //check if gun exists
  const gunFound = await Gun.findById(req.params.id);
  if (!gunFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found on given id.",
    });
  }
  const gunUpdated = await Gun.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : gunFound.name,
      description: description ? description : gunFound.description,
      magazineSize: magazineSize ? magazineSize : gunFound.magazineSize,
      minMaxSettings: minMaxSettings ? minMaxSettings : gunFound.minMaxSettings,
      additionalSettings: additionalSettings
        ? additionalSettings
        : gunFound.additionalSettings,
      modifiers: modifiers ? modifiers : gunFound.modifiers,
      specificGunValues: specificGunValues
        ? specificGunValues
        : gunFound.specificGunValues,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Gun details updated successfully",
    data: gunUpdated,
  });
};

//@desc Delete gun by id
//@route DELETE /admin-panel/guns/:id
//@access Public
exports.deleteGun = async (req, res) => {
  await Gun.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Gun deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple guns by id array
//@route DELETE /admin-panel/guns
//@access Public
exports.deleteManyGuns = async (req, res) => {
  try {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.status(400).json({
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const { ids } = req.body;
    const query = { _id: { $in: ids } };

    console.log(ids);

    await Gun.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Guns deleted successfully.",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};
