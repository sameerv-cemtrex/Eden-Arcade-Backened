const express = require("express");
const {
  createNFTPrefabValidation,
  updateNFTPrefabValidation,
  deleteManyNFTPrefabValidation,
} = require("../validators/NFTPrefabValidator");
const {
  createNFTPrefab,
  getAllNFTPrefabs,
  getNFTPrefabById,
  updateNFTPrefab,
  deleteNFTPrefab,
  deleteMultipleNFTPrefabs,
} = require("../controllers/NFTPrefabController");

const response = require("../middlewares/response");

const NFTPrefab = require("../models/NFTPrefab");

const NFTPrefabRouter = express.Router();

NFTPrefabRouter.route("/")
  .post(createNFTPrefabValidation, createNFTPrefab)
  .get(response(NFTPrefab), getAllNFTPrefabs)
  .delete(deleteManyNFTPrefabValidation, deleteMultipleNFTPrefabs);

NFTPrefabRouter.route("/:id")
  .get(getNFTPrefabById)
  .put(updateNFTPrefabValidation, updateNFTPrefab)
  .delete(deleteNFTPrefab);

module.exports = NFTPrefabRouter;
