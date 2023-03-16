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

  //create gunAttachment
  const droneCreated = await Drone.create({
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

  //send gun attachment data
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