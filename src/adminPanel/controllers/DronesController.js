const Drone = require("../models/Drone");
const { validationResult } = require("express-validator");

//@desc Create a new drone
//@route POST /admin-panel/drones
//@access public
exports.adminCreatesDrone = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    droneType,
    gunType,
    damage,
    accuracy,
    fireRate,
    hitPoints,
    movementSpeed,
    turningSpeed,
    shootingEffectiveRange,
    shootingMaximumRange,
    touchDamage,
    magazineSize,
    reloadTime,
    patrolRangeMinimum,
    patrolRangeMaximum,
    patrolMovementSpeed,
    auditoryRange,
    visionRange,
    nearestDroneEngagedDetectionRange,
    respawning,
    aimPoints,
    noiseRange,
    patrolClearance,
    maximumClearance,
  } = req.body;

  //create drone
  const droneCreated = await Drone.create({
    name,
    droneType,
    gunType,
    damage,
    accuracy,
    fireRate,
    hitPoints,
    movementSpeed,
    turningSpeed,
    shootingEffectiveRange,
    shootingMaximumRange,
    touchDamage,
    magazineSize,
    reloadTime,
    patrolRangeMinimum,
    patrolRangeMaximum,
    patrolMovementSpeed,
    auditoryRange,
    visionRange,
    nearestDroneEngagedDetectionRange,
    respawning,
    aimPoints,
    noiseRange,
    patrolClearance,
    maximumClearance,
  });

  //send created drone
  res.status(201).json({
    status: true,
    message: "Drone created successfully",
    data: droneCreated,
  });
};

//@desc Get all drones
//@route GET /admin-panel/drones
//@access public
exports.getAllDrones = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get drone by id
//@route GET /admin-panel/drones/:id
//@access public
exports.getDrone = async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);

    if (!drone) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: drone,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update drone by id
//@route PUT /admin-panel/drones/:id
//@access public
exports.updateDrone = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    droneType,
    gunType,
    damage,
    accuracy,
    fireRate,
    hitPoints,
    movementSpeed,
    turningSpeed,
    shootingEffectiveRange,
    shootingMaximumRange,
    touchDamage,
    magazineSize,
    reloadTime,
    patrolRangeMinimum,
    patrolRangeMaximum,
    patrolMovementSpeed,
    auditoryRange,
    visionRange,
    nearestDroneEngagedDetectionRange,
    respawning,
    aimPoints,
    noiseRange,
    patrolClearance,
    maximumClearance,
  } = req.body;

  //check if gun-attachment exists
  const droneFound = await Drone.findById(req.params.id);
  if (!droneFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const droneUpdated = await Drone.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : droneFound.name,
      droneType: droneType ? droneType : droneFound.droneType,
      gunType: gunType ? gunType : droneFound.gunType,
      damage: damage ? damage : droneFound.damage,
      accuracy: accuracy ? accuracy : droneFound.accuracy,
      fireRate: fireRate ? fireRate : droneFound.fireRate,
      hitPoints: hitPoints ? hitPoints : droneFound.hitPoints,
      movementSpeed: movementSpeed ? movementSpeed : droneFound.movementSpeed,
      turningSpeed: turningSpeed ? turningSpeed : droneFound.turningSpeed,
      shootingEffectiveRange: shootingEffectiveRange
        ? shootingEffectiveRange
        : droneFound.shootingEffectiveRange,
      shootingMaximumRange: shootingMaximumRange
        ? shootingMaximumRange
        : droneFound.shootingMaximumRange,
      touchDamage: touchDamage ? touchDamage : droneFound.touchDamage,
      magazineSize: magazineSize ? magazineSize : droneFound.magazineSize,
      reloadTime: reloadTime ? reloadTime : droneFound.reloadTime,
      patrolRangeMinimum: patrolRangeMinimum
        ? patrolRangeMinimum
        : droneFound.patrolRangeMinimum,
      patrolRangeMaximum: patrolRangeMaximum
        ? patrolRangeMaximum
        : droneFound.patrolRangeMaximum,
      patrolMovementSpeed: patrolMovementSpeed
        ? patrolMovementSpeed
        : droneFound.patrolMovementSpeed,
      auditoryRange: auditoryRange ? auditoryRange : droneFound.auditoryRange,
      visionRange: visionRange ? visionRange : droneFound.visionRange,
      nearestDroneEngagedDetectionRange: nearestDroneEngagedDetectionRange
        ? nearestDroneEngagedDetectionRange
        : droneFound.nearestDroneEngagedDetectionRange,
      respawning: respawning ? respawning : droneFound.respawning,
      aimPoints: aimPoints ? aimPoints : droneFound.aimPoints,
      noiseRange: noiseRange ? noiseRange : droneFound.noiseRange,
      patrolClearance: patrolClearance
        ? patrolClearance
        : droneFound.patrolClearance,
      maximumClearance: maximumClearance
        ? maximumClearance
        : droneFound.maximumClearance,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Drone updated successfully",
    data: droneUpdated,
  });
};

//@desc Delete drone by id
//@route DELETE /admin-panel/drones/:id
//@access public
exports.deleteDrone = async (req, res) => {
  await Drone.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Drone deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple drones by id array
//@route DELETE /admin-panel/drones
//@access public
exports.deleteDrones = async (req, res) => {
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

    await Drone.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Drones deleted successfully.",
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
