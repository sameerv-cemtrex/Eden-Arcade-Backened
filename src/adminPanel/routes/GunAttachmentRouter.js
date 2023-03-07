const express = require("express");
const {
  adminCreatesGunAttachment, getAllGunAttachments, getGunAttachment, updateGunAttachment, deleteGunAttachment
} = require("../controllers/GunAttachmentsController");
const { body } = require("express-validator");
const { createGunAttachmentValidation } = require("../validators/gunAttachmentValidator")


const GunAttachmentRouter = express.Router();

//create new gun-attachments
GunAttachmentRouter.post(
  "/",
  createGunAttachmentValidation,
  adminCreatesGunAttachment
).get('/', getAllGunAttachments);

GunAttachmentRouter.get('/:id', getGunAttachment).put(updateGunAttachment).delete(deleteGunAttachment)

module.exports = GunAttachmentRouter;
