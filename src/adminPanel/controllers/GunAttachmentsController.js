const GunAttachment = require("../models/GunAttachment");

//@desc Admin creates gun attachment
//@route POST /admin/gun-attachments
//@access Admin Only
exports.adminCreatesGunAttachment = async (req, res) => {
  const { body } = req;
  //if gunAttachment already exists
  const gunAttachmentFound = await GunAttachment.findOne({ attachmentId });
  if (gunAttachmentFound) {
    throw new Error("Gun Attachment already exists");
  }

  //create gunAttachment
  const gunAttachmentCreated = await GunAttachment.create({
    body,
  });

  //send student data
  res.status(201).json({
    status: "success",
    message: "GunAttachemnt created successfully",
    data: gunAttachmentCreated,
  });
};
