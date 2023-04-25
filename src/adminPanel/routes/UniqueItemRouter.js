const express = require("express");
const {
  createUniqueItem,
  deleteUniqueItem,
  deleteUniqueItems,
  getAllUniqueItems,
  getUniqueItem,
  updateUniqueItem,
} = require("../controllers/UniqueItemsController");
const response = require("../middlewares/response");
const {
  createUniqueItemValidation,
  deleteManyUniqueItemValidation,
  updateUniqueItemValidation,
} = require("../validators/UniqueItemValidator");
const UniqueItem = require("../models/UniqueItem");

const UniqueItemRouter = express.Router();

UniqueItemRouter.route("/")
  .post(createUniqueItemValidation, createUniqueItem)
  .get(response(UniqueItem), getAllUniqueItems)
  .delete(deleteManyUniqueItemValidation, deleteUniqueItems);

UniqueItemRouter.route("/:id")
  .get(getUniqueItem)
  .put(updateUniqueItemValidation, updateUniqueItem)
  .delete(deleteUniqueItem);

module.exports = UniqueItemRouter;
