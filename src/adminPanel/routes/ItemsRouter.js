const express = require("express");
const {
  createItem,
  getAllItems,
  deleteItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/ItemsController");
const response = require("../middlewares/response");
const Item = require("../models/Item");
const {
  createItemValidation,
  updateItemValidation,
  deleteManyItemsValidation,
} = require("../validators/itemValidator");

const ItemRouter = express.Router();

ItemRouter.route("/")
  .post(createItemValidation, createItem)
  .get(response(Item), getAllItems)
  .delete(deleteManyItemsValidation, deleteItems);

ItemRouter.route("/:id")
  .get(getItem)
  .put(updateItemValidation, updateItem)
  .delete(deleteItem);

module.exports = ItemRouter;
