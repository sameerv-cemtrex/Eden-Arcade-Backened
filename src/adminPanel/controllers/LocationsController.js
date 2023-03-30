const Location = require("../models/Location");
const { validationResult } = require("express-validator");

//@desc Create a new location
//@route POST /admin-panel/locations
//@access public
exports.createLocation = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, locationId, locationDetectionRadius } = req.body;

  //check for duplicate by name
  const locationFound = await Location.findOne({ name });
  if (locationFound) {
    res.status(409).json({
      status: false,
      message: "Location with given name already exists",
      data: null,
    });
  }

  //create location

  try {
    const locationCreated = await Location.create({
      name,
      locationId,
      locationDetectionRadius,
    });

    //send created item
    res.status(201).json({
      status: true,
      message: "Location created successfully",
      data: locationCreated,
    });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

//@desc Get all locations
//@route GET /admin-panel/locations
//@access public
exports.getAllLocations = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get location by id
//@route GET /admin-panel/locations/:id
//@access public
exports.getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      throw new Error("No data found", { statusCode: 404 });
    }
    res.status(200).json({
      status: true,
      data: location,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update location by id
//@route PUT /admin-panel/locations/:id
//@access public
exports.updateLocation = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, locationId, locationDetectionRadius } = req.body;

  //check if location exists
  const locationFound = await Location.findById(req.params.id);
  if (!locationFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const locationUpdated = await Location.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : locationFound.name,
      locationId: locationId ? locationId : locationFound.locationId,
      locationDetectionRadius: locationDetectionRadius
        ? locationDetectionRadius
        : locationFound.locationDetectionRadius,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Location updated successfully",
    data: locationUpdated,
  });
};

//@desc Delete location by id
//@route DELETE /admin-panel/locations/:id
//@access public
exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Location deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple locations by id array
//@route DELETE /admin-panel/locations
//@access public
exports.deleteLocations = async (req, res) => {
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

    await Location.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Locations deleted successfully.",
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
