const express = require("express");
const {} = require("../controllers/ConsumableItemsController");
const response = require("../middlewares/response");
const {
  createConsumableItemValidation: createCollectableItemValidation,
  updateConsumableItemValidation: updateCollectableItemValidation,
  deleteManyCollectableItemValidation,
} = require("../validators/ConsumableItemValidator");
const ConsumableItem = require("../models/ConsumableItem");

const ConsumableItemRouter = express.Router();

ConsumableItemRouter.route("/")
  .post(createCollectableItemValidation, createCollectableItem)
  .get(response(CollectableItem), getAllCollectableItems)
  .delete(deleteManyCollectableItemValidation, deleteCollectableItem);

ConsumableItemRouter.route("/:id")
  .get(getCollectableItem)
  .put(updateCollectableItemValidation, updateCollectableItem)
  .delete(deleteCollectableItem);

module.exports = ConsumableItemRouter;
