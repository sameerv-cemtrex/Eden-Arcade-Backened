const DomeSaleItem = require("../models/DomeSaleItem");
const { validationResult } = require("express-validator");

//@desc Create a new dome sale item
//@route POST /admin-panel/dome-sales
//@access public
exports.createDomeSaleItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { dome, startTime, endTime, item, discountedPrice } = req.body;

  //create dome sale item
  let domeSaleItemCreated = await DomeSaleItem.create({
    dome,
    startTime,
    endTime,
    item,
    discountedPrice,
  });
  domeSaleItemCreated = await domeSaleItemCreated
    .populate("item")
    .execPopulate();
  domeSaleItemCreated.save();

  //send created dome sale item
  res.status(201).json({
    status: true,
    message: "Dome sale item created successfully",
    data: domeSaleItemCreated,
  });
};

//@desc Get all dome sales
//@route GET /admin-panel/dome-sales
//@access public
exports.getAllDomeSales = async (req, res) => {
  const dome = await DomeSaleItem.find().populate("item");
  res.result.data = dome;
  res.status(200).json(res.result);
};

//@desc Get dome sale by id
//@route GET /admin-panel/dome-sales/:id
//@access public
exports.getDomeSale = async (req, res, next) => {
  try {
    const domeSale = await DomeSaleItem.findById(req.params.id).populate(
      "item"
    );

    if (!domeSale) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: domeSale,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update dome sale by id
//@route PUT /admin-panel/dome-sales/:id
//@access public
exports.updateDomeSaleItem = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { dome, startTime, endTime, item, discountedPrice } = req.body;

  //check if gun-attachment exists
  const domeSaleFound = await DomeSaleItem.findById(req.params.id);
  if (!domeSaleFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const domeSaleUpdated = await DomeSaleItem.findByIdAndUpdate(
    req.params.id,
    {
      dome: dome ? dome : domeSaleFound.dome,
      startTime: startTime ? startTime : domeSaleFound.startTime,
      endTime: endTime ? endTime : domeSaleFound.endTime,
      item: item ? item : domeSaleFound.item,
      discountedPrice: discountedPrice
        ? discountedPrice
        : domeSaleFound.discountedPrice,
    },
    {
      new: true,
    }
  ).populate("item");
  res.status(200).json({
    status: true,
    message: "dome sale updated successfully",
    data: domeSaleUpdated,
  });
};

//@desc Delete dome sale by id
//@route DELETE /admin-panel/dome-sales/:id
//@access public
exports.deleteDomeSaleItem = async (req, res) => {
  await DomeSaleItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Dome sale item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple dome sales by id array
//@route DELETE /admin-panel/dome-sales
//@access public
exports.deleteMultipleDomeSales = async (req, res) => {
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

    await DomeSaleItem.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Dome Sale Items deleted successfully.",
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
