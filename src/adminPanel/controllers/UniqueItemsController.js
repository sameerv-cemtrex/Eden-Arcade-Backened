const { validationResult } = require("express-validator");
const UniqueItem = require("../models/UniqueItem");

//@desc Create a new unique item
//@route POST /admin-panel/unique-items
//@access public
exports.createUniqueItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check for duplicate by name
  const uniqueItemFound = await UniqueItem.findOne({ name });
  if (uniqueItemFound) {
    res.status(409).json({
      status: false,
      message: "Unique item with given name already exists",
      data: null,
    });
  }

  //create item
  const uniqueItemCreated = await UniqueItem.create({
    name,
    resource,
    quantity,
  });

  //send created item
  res.status(201).json({
    status: true,
    message: "Unique Item created successfully",
    data: uniqueItemCreated,
  });
};

//@desc Get all unique items
//@route GET /admin-panel/unique-items
//@access public
exports.getAllUniqueItems = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get unique item by id
//@route GET /admin-panel/unique-items/:id
//@access public
exports.getUniqueItem = async (req, res, next) => {
  try {
    const uniqueItem = await UniqueItem.findById(req.params.id);

    if (!uniqueItem) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: uniqueItem,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update unique item by id
//@route PUT /admin-panel/unique-items/:id
//@access public
exports.updateUniqueItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, resource, quantity } = req.body;

  //check if item exists
  const uniqueItemFound = await UniqueItem.findById(req.params.id);
  if (!uniqueItemFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const uniqueItemUpdated = await UniqueItem.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : uniqueItemFound.name,
      resource: resource ? resource : uniqueItemFound.resource,
      quantity: quantity ? quantity : uniqueItemFound.quantity,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Unique Item updated successfully",
    data: uniqueItemUpdated,
  });
};

//@desc Delete unique item by id
//@route DELETE /admin-panel/unique-items/:id
//@access public
exports.deleteUniqueItem = async (req, res) => {
  await UniqueItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Unique Item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple unique items by id array
//@route DELETE /admin-panel/unique-items
//@access public
exports.deleteUniqueItems = async (req, res) => {
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

    await UniqueItem.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Unique Items deleted successfully.",
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
