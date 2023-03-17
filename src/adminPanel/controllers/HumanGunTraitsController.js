const HumanGunTrait = require("../models/HumanGunTrait");
const { validationResult } = require("express-validator");

//@desc Create a new human gun trait
//@route POST /admin-panel/human-gun-traits
//@access public
exports.adminCreatesHumanGunTrait = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { injuries, survival } = req.body;

  //create drone
  const humanGunTraitCreated = await HumanGunTrait.create({
    injuries,
    survival,
  });

  //send created drone
  res.status(201).json({
    status: true,
    message: "Human gun trait created successfully",
    data: humanGunTraitCreated,
  });
};

//@desc Get all human gun traits
//@route GET /admin-panel/human-gun-traits
//@access public
exports.getHumanGunTraits = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get human gun traits by id
//@route GET /admin-panel/human-gun-traits/:id
//@access public
exports.getHumanGunTrait = async (req, res, next) => {
  try {
    const humanGunTrait = await HumanGunTrait.findById(req.params.id);

    if (!humanGunTrait) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: humanGunTrait,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update human gun traits by id
//@route PUT /admin-panel/human-gun-traits/:id
//@access public
exports.updateHumanGunTrait = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { injuries, survival } = req.body;

  //check if human gun traits exists
  const humanGunTraitFound = await HumanGunTrait.findById(req.params.id);
  if (!humanGunTraitFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const humanGunTraitUpdated = await HumanGunTrait.findByIdAndUpdate(
    req.params.id,
    {
      injuries: injuries ? injuries : humanGunTraitFound.injuries,
      survival: survival ? survival : humanGunTraitFound.survival,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Human gun trairs values updated successfully",
    data: humanGunTraitUpdated,
  });
};

//@desc Delete human gun traits by id
//@route DELETE /admin-panel/human-gun-traits/:id
//@access public
exports.deleteHumanGunTrait = async (req, res) => {
  await HumanGunTrait.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Human gun trait deleted successfully.",
    data: {},
  });
};
