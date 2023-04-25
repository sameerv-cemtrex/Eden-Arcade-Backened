const express = require("express");
const {
  createConsumableItem,
  getAllConsumableItems,
  deleteConsumableItem,
  deleteConsumableItems,
  updateConsumableItem,
  getConsumableItem,
} = require("../controllers/ConsumableItemsController");
const response = require("../middlewares/response");
const {
  createConsumableItemValidation,
  updateConsumableItemValidation,
  deleteManyConsumableItemValidation,
} = require("../validators/ConsumableItemValidator");
const ConsumableItem = require("../models/ConsumableItem");

const ConsumableItemRouter = express.Router();

ConsumableItemRouter.route("/")
  .post(createConsumableItemValidation, createConsumableItem)
  .get(response(ConsumableItem), getAllConsumableItems)
  .delete(deleteManyConsumableItemValidation, deleteConsumableItems);

ConsumableItemRouter.route("/:id")
  .get(getConsumableItem)
  .put(updateConsumableItemValidation, updateConsumableItem)
  .delete(deleteConsumableItem);

module.exports = ConsumableItemRouter;
