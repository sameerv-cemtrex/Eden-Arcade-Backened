//swagger schema for gun attachments
/**
 * @swagger
 * components:
 *   schemas:
 *     Gun:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the gun.
 *           example: AK 74
 *         description:
 *           type: string
 *           description: Description of the gun.
 *           example: This is AK 74
 *         minMaxSettings:
 *           type: object
 *           description: Object for setting the min and max values.
 *           example: {}
 *         additionalSettings:
 *           type: object
 *           description: Object for additional settings.
 *           example: {}
 *         modifiers:
 *           type: object
 *           description: Object to hold modifiers values.
 *           example: {}
 *         specificGunValues:
 *           type: object
 *           description: Specific gun related values.
 *           example: {}
 *         
 */

//swagger documentation for POST - create new guns
/**
 * @swagger
 * /api/v1/admin-panel/guns:
 *   post:
 *     summary: Create a new gun
 *     tags: [GUNS]
 *     description: Creates a new gun with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gun'
 *     responses:
 *       200:
 *         description: The created gun attachment
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */