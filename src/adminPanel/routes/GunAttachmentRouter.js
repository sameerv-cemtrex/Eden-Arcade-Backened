const express = require("express");
const {
  adminCreatesGunAttachment,
  getAllGunAttachments,
  getGunAttachment,
  updateGunAttachment,
  deleteGunAttachment,
  deleteManyGunAttachments,
} = require("../controllers/GunAttachmentsController");
const {
  createGunAttachmentValidation,
  updateGunAttachmentValidation,
  deleteManyGunAttachmentValidation,
} = require("../validators/gunAttachmentValidator");
const response = require("../middlewares/response");
const GunAttachment = require("../models/GunAttachment");

const GunAttachmentRouter = express.Router();

//create new gun-attachments
GunAttachmentRouter.route("/")
  .post(createGunAttachmentValidation, adminCreatesGunAttachment)
  .get(response(GunAttachment), getAllGunAttachments)
  .delete(deleteManyGunAttachmentValidation, deleteManyGunAttachments);

GunAttachmentRouter.route("/:id")
  .get(getGunAttachment)
  .put(updateGunAttachmentValidation, updateGunAttachment)
  .delete(deleteGunAttachment);

module.exports = GunAttachmentRouter;
