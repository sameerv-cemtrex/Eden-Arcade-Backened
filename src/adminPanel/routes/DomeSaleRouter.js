const express = require("express");
const {
  createDomeSaleItem,
  getAllDomeSales,
  getDomeSale,
  updateDomeSaleItem,
  deleteMultipleDomeSales,
  deleteDomeSaleItem,
  getDomeSaleByDomeNo,
} = require("../controllers/DomeSalesController");
const {
  createDomeSaleItemValidation,
  updateDomeSaleItemValidation,
  deleteManyDomeSaleItemsValidation,
} = require("../validators/DomeSaleItemValidator");

const response = require("../middlewares/response");

const DomeSaleItem = require("../models/DomeSaleItem");

const DomeSaleRouter = express.Router();

DomeSaleRouter.route("/")
  .post(createDomeSaleItemValidation, createDomeSaleItem)
  .get(response(DomeSaleItem), getAllDomeSales)
  .delete(deleteManyDomeSaleItemsValidation, deleteMultipleDomeSales);

DomeSaleRouter.route("/:id")
  .get(getDomeSale)
  .put(updateDomeSaleItemValidation, updateDomeSaleItem)
  .delete(deleteDomeSaleItem);

// DomeSaleRouter.route("/:dome").get(getDomeSaleByDomeNo);

module.exports = DomeSaleRouter;
