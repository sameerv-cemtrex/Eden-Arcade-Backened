//swagger schema for gun attachments
/**
 * @swagger
 * components:
 *   schemas:
 *     Gun:
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

//swagger documentation for POST - create new guns
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