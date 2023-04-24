const { validationResult } = require("express-validator");
const CollectableItem = require("../models/CollectableItem");

//@desc Create a new collectible item
//@route POST /admin-panel/collectable-items
//@access public
exports.createCollectableItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check for duplicate by name
  const collectableItemFound = await CollectableItem.findOne({ name });
  if (collectableItemFound) {
    res.status(409).json({
      status: false,
      message: "Collectable item with given name already exists",
      data: null,
    });
  }

  //create item
  const collectableItemCreated = await CollectableItem.create({
    name,
    resource,
    quantity,
  });

  //send created item
  res.status(201).json({
    status: true,
    message: "Collectable Item created successfully",
    data: collectableItemCreated,
  });
};

//@desc Get all collectable items
//@route GET /admin-panel/collectable-items
//@access public
exports.getAllCollectableItems = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get collectable item by id
//@route GET /admin-panel/collectable-items/:id
//@access public
exports.getCollectableItem = async (req, res, next) => {
  try {
    const collectableItem = await CollectableItem.findById(req.params.id);

    if (!collectableItem) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: collectableItem,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update collectable item by id
//@route PUT /admin-panel/collectable-items/:id
//@access public
exports.updateCollectableItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check if item exists
  const collectableItemFound = await CollectableItem.findById(req.params.id);
  if (!collectableItemFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const collectableItemUpdated = await CollectableItem.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : collectableItemFound.name,
      resource: resource ? resource : collectableItemFound.resource,
      quantity: quantity ? quantity : collectableItemFound.quantity,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Collectable Item updated successfully",
    data: collectableItemUpdated,
  });
};

//@desc Delete collectable item by id
//@route DELETE /admin-panel/collectable-items/:id
//@access public
exports.deleteCollectableItem = async (req, res) => {
  await CollectableItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Collectable Item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple collectable items by id array
//@route DELETE /admin-panel/collectable-items
//@access public
exports.deleteCollectableItems = async (req, res) => {
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

    await CollectableItem.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Collectable Items deleted successfully.",
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
