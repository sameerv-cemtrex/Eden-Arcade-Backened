const { validationResult } = require("express-validator");
const ConsumableItem = require("../models/ConsumableItem");

//@desc Create a new consumable item
//@route POST /admin-panel/consumable-items
//@access public
exports.createConsumableItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check for duplicate by name
  const consumableItemFound = await ConsumableItem.findOne({ name });
  if (consumableItemFound) {
    res.status(409).json({
      status: false,
      message: "Consumable item with given name already exists",
      data: null,
    });
  }

  //create item
  const consumableItemCreated = await ConsumableItem.create({
    name,
    resource,
    quantity,
  });

  //send created item
  res.status(201).json({
    status: true,
    message: "Consumable Item created successfully",
    data: consumableItemCreated,
  });
};

//@desc Get all consumable items
//@route GET /admin-panel/consumable-items
//@access public
exports.getAllConsumableItems = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get consumable item by id
//@route GET /admin-panel/consumable-items/:id
//@access public
exports.getConsumableItem = async (req, res, next) => {
  try {
    const consumableItem = await ConsumableItem.findById(req.params.id);

    if (!consumableItem) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: consumableItem,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update consumable item by id
//@route PUT /admin-panel/consumable-items/:id
//@access public
exports.updateConsumableItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check if item exists
  const consumableItemFound = await ConsumableItem.findById(req.params.id);
  if (!consumableItemFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const consumableItemUpdated = await ConsumableItem.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : consumableItemFound.name,
      resource: resource ? resource : consumableItemFound.resource,
      quantity: quantity ? quantity : consumableItemFound.quantity,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Consumable Item updated successfully",
    data: consumableItemUpdated,
  });
};

//@desc Delete consumable item by id
//@route DELETE /admin-panel/consumable-items/:id
//@access public
exports.deleteConsumableItem = async (req, res) => {
  await ConsumableItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Consumable Item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple consumable items by id array
//@route DELETE /admin-panel/consumable-items
//@access public
exports.deleteConsumableItems = async (req, res) => {
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

    await ConsumableItem.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Consumable Items deleted successfully.",
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
