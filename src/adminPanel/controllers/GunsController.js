const Gun = require("../models/Gun");
const { validationResult } = require("express-validator");

exports.createGun = async (req, res) => {
  // const resultValidation = validationResult(req);

  // if (resultValidation.errors.length > 0) {
  //   return res.status(400).json({
  //     errors: resultValidation.mapped(),
  //     oldData: req.body,
  //   });
  // }

  const { minMaxSetting, ADSSpeed } = req.body;

  //create gun
  const gunCreated = await Gun.create({
    minMaxSetting, ADSSpeed
  });

  //send student data
  res.status(201).json({
    status: true,
    message: "Gun created successfully",
    data: gunCreated,
  });
};
