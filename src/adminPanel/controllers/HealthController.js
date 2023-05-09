const Health = require("../models/Health");
const _ = require("lodash");

/**
 * @desc add health system initially
 * @route POST /admin-panel/guns
 * @access Public
 */
exports.createHealth = async (req, res) => {
  const {
    baseSettings,
    injuries,
    movementAndActions,
    statBenefits,
    skillBenefits,
    survival,
  } = req.body;

  const healthCreated = await Health.create({
    baseSettings,
    injuries,
    movementAndActions,
    statBenefits,
    skillBenefits,
    survival,
  });

  res.status(201).json({
    status: true,
    message: "health created successfully",
    data: healthCreated,
  });
};

//@desc Get all guns
//@route GET /admin-panel/guns
//@access Public
exports.getHealth = async (req, res) => {
  res.status(200).json(res.result);
};

/**
 * @desc update health params
 * @route PUT /health/:id
 * @access Public
 */
exports.updateHealth = async (req, res) => {
  const health = await Health.findById(req.params.id);

  if (health) {
    try {
      console.log(health, req.body);

      res.status(200).json({
        status: true,
        message: "updated health traits succesfully",
        data: health,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
};
