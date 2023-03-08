const express = require("express");
const {
  adminCreatesGunAttachment, getAllGunAttachments, getGunAttachment, updateGunAttachment, deleteGunAttachment
} = require("../controllers/GunAttachmentsController");
const { createGunAttachmentValidation, updateGunAttachmentValidation } = require("../validators/gunAttachmentValidator");
const response = require("../middlewares/response");
const GunAttachment = require("../models/GunAttachment");


const GunAttachmentRouter = express.Router();

//create new gun-attachments
GunAttachmentRouter.post(
  "/",
  createGunAttachmentValidation,
  adminCreatesGunAttachment
).get("/", response(GunAttachment), getAllGunAttachments);

GunAttachmentRouter.get('/:id', getGunAttachment).put("/:id", updateGunAttachment).delete("/:id", deleteGunAttachment)

module.exports = GunAttachmentRouter;
