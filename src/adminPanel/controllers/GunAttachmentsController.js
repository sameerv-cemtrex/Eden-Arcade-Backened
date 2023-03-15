const GunAttachment = require("../models/GunAttachment");
const { validationResult } = require("express-validator");

//swagger schema for gun attachments
/**
 * @swagger
 * components:
 *   schemas:
 *     GunAttachment:
 *       type: object
 *       properties:
 *         part:
 *           type: string
 *           description: The part of the gun attachment.
 *           example: Grip
 *         model:
 *           type: integer
 *           description: The model of the gun attachment.
 *           example: 1
 *         texture:
 *           type: string
 *           description: The texture of the gun attachment.
 *           example: A
 *         accuracyRating:
 *           type: integer
 *           description: The accuracy rating of the gun attachment.
 *           example: 0
 *         damageRating:
 *           type: integer
 *           description: The damage rating of the gun attachment.
 *           example: 0
 *         ergonomicsRating:
 *           type: integer
 *           description: The ergonomics rating of the gun attachment.
 *           example: 0
 *         fireRateRating:
 *           type: integer
 *           description: The fire rate rating of the gun attachment.
 *           example: 0
 *         firingSoundGunshot:
 *           type: integer
 *           description: The firing sound gunshot of the gun attachment.
 *           example: 0
 *         firingVFXMuzzleFlash:
 *           type: integer
 *           description: The firing VFX muzzle flash of the gun attachment.
 *           example: 0
 *         lengthInCm:
 *           type: integer
 *           description: The length in cm of the gun attachment.
 *           example: 5
 *         rangeRating:
 *           type: integer
 *           description: The range rating of the gun attachment.
 *           example: 0
 *         recoilRating:
 *           type: integer
 *           description: The recoil rating of the gun attachment.
 *           example: 0
 *         weight:
 *           type: number
 *           description: The weight of the gun attachment.
 *           example: 1.2
 */

//@desc Admin creates gun attachment
//@route POST /admin/gun-attachments
//@access Public

//swagger documentation for POST - create new gun attachments
/**
 * @swagger
 * /api/v1/admin-panel/gun-attachments:
 *   post:
 *     summary: Create a new gun attachment
 *     tags: [GUN_ATTACHMENTS]
 *     description: Creates a new gun attachment with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GunAttachment'
 *     responses:
 *       200:
 *         description: The created gun attachment
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

exports.adminCreatesGunAttachment = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const {
    part,
    model,
    texture,
    accuracyRating,
    damageRating,
    ergonomicsRating,
    fireRateRating,
    firingSoundGunshot,
    firingVFXMuzzleFlash,
    lengthInCm,
    rangeRating,
    recoilRating,
    weight,
  } = req.body;

  //create gunAttachment
  const gunAttachmentCreated = await GunAttachment.create({
    part,
    model,
    texture,
    accuracyRating,
    damageRating,
    ergonomicsRating,
    fireRateRating,
    firingSoundGunshot,
    firingVFXMuzzleFlash,
    lengthInCm,
    rangeRating,
    recoilRating,
    weight,
  });

  //send gun attachment data
  res.status(201).json({
    status: true,
    message: "GunAttachemnt created successfully",
    data: gunAttachmentCreated,
  });
};

//@desc Get all gun attachment
//@route GET /admin-panel/gun-attachments
//@access public

//swagger documentation for GET - get all gun attachments
/**
 * @swagger
 * /api/v1/admin-panel/gun-attachments:
 *   get:
 *     summary: Get all gun attachments
 *     tags: [GUN_ATTACHMENTS]
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *         required: false
 *         default: 1
 *       - in: query
 *         name: per_page
 *         type: number
 *         required: false
 *         default: 2
 *     responses:
 *       200:
 *         description: Gun attachments list
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

exports.getAllGunAttachments = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get gun attachment by id
//@route GET /admin-panel/gun-attachments/:id
//@access public

//swagger documentation for GET - get gun attachments by id
/**
 * @swagger
 * /api/v1/admin-panel/gun-attachments/{id}:
 *   get:
 *     summary: Get gun attachment by id
 *     tags: [GUN_ATTACHMENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *     responses:
 *       200:
 *         description: Gun attachment object
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

exports.getGunAttachment = async (req, res, next) => {
  try {
    const gunAttachment = await GunAttachment.findById(req.params.id);

    if (!gunAttachment) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: gunAttachment,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update gun attachment by id
//@route PUT /admin-panel/gun-attachments/:id
//@access public

//swagger documentation for PUT - update gun attachments by id
/**
 * @swagger
 * /api/v1/admin-panel/gun-attachments/{id}:
 *   put:
 *     summary: Update a gun attachment by ID
 *     tags: [GUN_ATTACHMENTS]
 *     description: Updates an existing gun attachment with the provided data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the gun attachment to update
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GunAttachment'
 *     responses:
 *       200:
 *         description: The updated gun attachment
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Gun attachment not found
 *       500:
 *         description: Internal server error
 */
exports.updateGunAttachment = async (req, res) => {
  const {
    part,
    model,
    texture,
    accuracyRating,
    damageRating,
    ergonomicsRating,
    fireRateRating,
    firingSoundGunshot,
    firingVFXMuzzleFlash,
    lengthInCm,
    rangeRating,
    recoilRating,
    weight,
  } = req.body;

  //check if gun-attachment exists
  const gunAttachmentFound = await GunAttachment.findById(req.params.id);
  if (!gunAttachmentFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const gunAttachmentUpdated = await GunAttachment.findByIdAndUpdate(
    req.params.id,
    {
      part: part ? part : gunAttachmentFound.part,
      model: model ? model : gunAttachmentFound.model,
      texture: texture ? texture : gunAttachmentFound.texture,
      accuracyRating: accuracyRating
        ? accuracyRating
        : gunAttachmentFound.accuracyRating,
      damageRating: damageRating
        ? damageRating
        : gunAttachmentFound.damageRating,
      ergonomicsRating: ergonomicsRating
        ? ergonomicsRating
        : gunAttachmentFound.ergonomicsRating,
      fireRateRating: fireRateRating
        ? fireRateRating
        : gunAttachmentFound.fireRateRating,
      firingSoundGunshot: firingSoundGunshot
        ? firingSoundGunshot
        : gunAttachmentFound.firingSoundGunshot,
      firingVFXMuzzleFlash: firingVFXMuzzleFlash
        ? firingVFXMuzzleFlash
        : gunAttachmentFound.firingVFXMuzzleFlash,
      lengthInCm: lengthInCm ? lengthInCm : gunAttachmentFound.lengthInCm,
      rangeRating: rangeRating ? rangeRating : gunAttachmentFound.rangeRating,
      recoilRating: recoilRating
        ? recoilRating
        : gunAttachmentFound.recoilRating,
      weight: weight ? weight : gunAttachmentFound.weight,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Gun attachment updated successfully",
    data: gunAttachmentUpdated,
  });
};

//@desc Delete gun attachment by id
//@route DELETE /admin-panel/gun-attachments/:id
//@access public

/**
 * @swagger
 *
 * /api/v1/admin-panel/gun-attachments/{id}:
 *   delete:
 *     tags: [GUN_ATTACHMENTS]
 *     summary: Delete a gun attachment by ID
 *     description: Deletes the gun attachment with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the gun attachment to delete
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The gun attachment is deleted successfully.
 *       400:
 *         description: Invalid ID supplied.
 *       404:
 *         description: gun attachment not found.
 *       500:
 *         description: Internal server error occurred while trying to delete the gun attachment.
 */

exports.deleteGunAttachment = async (req, res) => {
  await GunAttachment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Gun attachment deleted successfully.",
    data: {},
  });
};

//@desc Delete many gun attachment by id array
//@route DELETE /admin-panel/gun-attachments/many
//@access public

/**
 * @swagger
 * /api/v1/admin-panel/gun-attachments:
 *   delete:
 *     summary: Delete multiple gun attachments by ids
 *     tags: [GUN_ATTACHMENTS]
 *     description: Delete multiple gun attachments by ids provided in the request body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of gun attachment ids to be deleted
 *                 example: ["640afb35f975ca47907705f1","640afe5bfd1d600c2c6dfd91"]
 *     responses:
 *       200:
 *         description: Deletion Success message
 *       400:
 *         description: Bad request
 *       404:
 *         description: Gun attachment not found
 */

exports.deleteManyGunAttachments = async (req, res) => {
  try {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.status(400).json({
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const { ids } = req.body;
    const query = { _id: { $in: ids } };

    console.log(ids);

    await GunAttachment.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Gun attachments deleted successfully.",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};
