const express = require("express");
const {
  createCollectableItem,
  getAllCollectableItems,
  deleteCollectableItem,
  getCollectableItem,
  updateCollectableItem,
} = require("../controllers/CollectableItemsController");
const response = require("../middlewares/response");
const {
  createCollectableItemValidation,
  updateCollectableItemValidation,
  deleteManyCollectableItemValidation,
} = require("../validators/CollectableItemValidator");
const CollectableItem = require("../models/CollectableItem");

const CollectableItemRouter = express.Router();

CollectableItemRouter.route("/")
  .post(createCollectableItemValidation, createCollectableItem)
  .get(response(CollectableItem), getAllCollectableItems)
  .delete(deleteManyCollectableItemValidation, deleteCollectableItem);

CollectableItemRouter.route("/:id")
  .get(getCollectableItem)
  .put(updateCollectableItemValidation, updateCollectableItem)
  .delete(deleteCollectableItem);

module.exports = CollectableItemRouter;
