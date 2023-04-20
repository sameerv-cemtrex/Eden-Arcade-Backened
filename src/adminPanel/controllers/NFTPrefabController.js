const { validationResult } = require("express-validator");
const NFTPrefab = require("../models/NFTPrefab");

//@desc Create a new NFT prefab
//@route POST /admin-panel/nft-prefabs
//@access public
exports.createNFTPrefab = async (req, res) => {
  const resultValidation = validationResult(req);

  try {
    if (resultValidation.errors.length > 0) {
      return res.status(400).json({
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const { domeId, panel1, panel2, panel3, panel4, panel5, panel6 } = req.body;

    //create dome sale item
    let NftPrfabCreated = await NFTPrefab.create({
      domeId,
      panel1,
      panel2,
      panel3,
      panel4,
      panel5,
      panel6,
    });

    //send created dome sale item
    res.status(201).json({
      status: true,
      message: "NFT prefab created successfully",
      data: NftPrfabCreated,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};

//@desc Get all NFT prefabs
//@route GET /admin-panel/nft-prefabs
//@access public
exports.getAllNFTPrefabs = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get dome sale by id
//@route GET /admin-panel/dome-sales/:id
//@access public
exports.getNFTPrefabById = async (req, res, next) => {
  try {
    const NftPrefab = await NFTPrefab.findById(req.params.id);

    if (!NftPrefab) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: NftPrefab,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update NFT prefab by id
//@route PUT /admin-panel/nft-prefabs/:id
//@access public
exports.updateNFTPrefab = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { domeId, panel1, panel2, panel3, panel4, panel5, panel6 } = req.body;

  //check if gun-attachment exists
  const prefabFound = await NFTPrefab.findById(req.params.id);
  if (!prefabFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const prefabUpdated = await NFTPrefab.findByIdAndUpdate(
    req.params.id,
    {
      domeId: domeId ? domeId : prefabFound.domeId,
      panel1: panel1 ? panel1 : prefabFound.panel1,
      panel2: panel2 ? panel2 : prefabFound.panel2,
      panel3: panel3 ? panel3 : prefabFound.panel3,
      panel4: panel4 ? panel4 : prefabFound.panel4,
      panel5: panel5 ? panel5 : prefabFound.panel5,
      panel6: panel6 ? panel6 : prefabFound.panel6,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: true,
    message: "NFT prefab updated successfully",
    data: prefabUpdated,
  });
};

//@desc Delete NFT prefab by id
//@route DELETE /admin-panel/nft-prefabs/:id
//@access public
exports.deleteNFTPrefab = async (req, res) => {
  await NFTPrefab.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Dome sale item deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple NFT prefabs by id array
//@route DELETE /admin-panel/nft-prefabs
//@access public
exports.deleteMultipleNFTPrefabs = async (req, res) => {
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

    await NFTPrefab.deleteMany(query, (err, obj) => {
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
