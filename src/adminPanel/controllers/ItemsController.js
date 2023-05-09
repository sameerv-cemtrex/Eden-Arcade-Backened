const Item = require("../models/Item");
const { validationResult } = require("express-validator");

//@desc Create a new item
//@route POST /admin-panel/items
//@access public
exports.createItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    displayName,
    category,
    description,
    weight,
    sizeX,
    sizeY,
    edenPurchasePrice,
    edenSellingPrice,
    craftingPrice,
    isCraftable,
    craftingRewards,
  } = req.body;

  //check for duplicate by name
  const itemFound = await Item.findOne({ name });
  if (itemFound) {
    res.status(409).json({
      status: false,
      message: "Item with given name already exists",
      data: null,
    });
  }

  //create item
  const itemCreated = await Item.create({
    name,
    displayName,
    category,
    description,
    weight,
    sizeX,
    sizeY,
    edenPurchasePrice,
    edenSellingPrice,
    craftingPrice,
    isCraftable,
    craftingRewards,
  });

  //send created item
  res.status(201).json({
    status: true,
    message: "Item created successfully",
    data: itemCreated,
  });
};

//@desc Get all items
//@route GET /admin-panel/items
//@access public
exports.getAllItems = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get item by id
//@route GET /admin-panel/items/:id
//@access public
exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: item,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update item by id
//@route PUT /admin-panel/items/:id
//@access public
exports.updateItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    name,
    displayName,
    category,
    description,
    weight,
    sizeX,
    sizeY,
    edenPurchasePrice,
    edenSellingPrice,
    craftingPrice,
    isCraftable,
    craftingRewards,
  } = req.body;

  //check if item exists
  const itemFound = await Item.findById(req.params.id);
  if (!itemFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const itemUpdated = await Item.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : itemFound.name,
      displayName: displayName ? displayName : itemFound.displayName,
      category: category ? category : itemFound.category,
      description: description ? description : itemFound.description,
      weight: weight ? weight : itemFound.weight,
      sizeX: sizeX ? sizeX : itemFound.sizeX,
      sizeY: sizeY ? sizeY : itemFound.sizeY,
      edenPurchasePrice: edenPurchasePrice
        ? edenPurchasePrice
        : itemFound.edenPurchasePrice,
      edenSellingPrice: edenSellingPrice
        ? edenSellingPrice
        : itemFound.edenSellingPrice,
      craftingPrice: craftingPrice ? craftingPrice : itemFound.craftingPrice,
      isCraftable:
        isCraftable !== itemFound.isCraftable
          ? isCraftable
          : itemFound.isCraftable,
      craftingRewards: craftingRewards
        ? craftingRewards
        : itemFound.craftingRewards,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Item updated successfully",
    data: itemUpdated,
  });
};

//@desc Delete item by id
//@route DELETE /admin-panel/items/:id
//@access public
exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple items by id array
//@route DELETE /admin-panel/items
//@access public
exports.deleteItems = async (req, res) => {
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

    await Item.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Items deleted successfully.",
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
