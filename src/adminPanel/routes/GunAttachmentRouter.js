const express = require("express");
const {
  adminCreatesGunAttachment,
  getAllGunAttachments,
  getGunAttachment,
  updateGunAttachment,
  deleteGunAttachment,
  patchGunAttachment,
  deleteManyGunAttachments,
} = require("../controllers/GunAttachmentsController");
const {
  createGunAttachmentValidation,
  updateGunAttachmentValidation,
} = require("../validators/gunAttachmentValidator");
const response = require("../middlewares/response");
const GunAttachment = require("../models/GunAttachment");

const GunAttachmentRouter = express.Router();

//create new gun-attachments
GunAttachmentRouter.route("/")
  .post(createGunAttachmentValidation, adminCreatesGunAttachment)
  .get(response(GunAttachment), getAllGunAttachments);

GunAttachmentRouter.route("/:id")
  .get(getGunAttachment)
  .put(updateGunAttachment)
  .delete(deleteGunAttachment);

GunAttachmentRouter.delete("/multiple/ids", deleteManyGunAttachments);

module.exports = GunAttachmentRouter;
