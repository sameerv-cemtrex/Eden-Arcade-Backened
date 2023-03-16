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

//swagger documentation for GET - get all guns
/**
 * @swagger
 * /api/v1/admin-panel/guns:
 *   get:
 *     summary: Get a list of all the guns with their details
 *     tags: [GUNS]
 *     description: Get a list of all the guns with their details
 *     responses:
 *       200:
 *         description: The created gun attachment
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

//swagger documentation for GET - get all guns
/**
 * @swagger
 * /api/v1/admin-panel/guns:
 *   get:
 *     summary: Get all guns with their details
 *     tags: [GUNS]
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
 *         description: Guns list
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for GET - get guns details by id
/**
 * @swagger
 * /api/v1/admin-panel/guns/{id}:
 *   get:
 *     summary: Get gun details by id
 *     tags: [GUNS]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *     responses:
 *       200:
 *         description: Gun object
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for PUT - update guns by id
/**
 * @swagger
 * /api/v1/admin-panel/guns/{id}:
 *   put:
 *     summary: Update a gun by ID
 *     tags: [GUNS]
 *     description: Updates an existing gun with the provided data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the gun to update
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gun'
 *     responses:
 *       200:
 *         description: The updated gun data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Gun not found
 *       500:
 *         description: Internal server error
 */

//swagger documentation for DELETE - delete guns by id
/**
 * @swagger
 *
 * /api/v1/admin-panel/guns/{id}:
 *   delete:
 *     tags: [GUNS]
 *     summary: Delete a gun by ID
 *     description: Deletes the gun with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the gun to delete
 *         required: true
 *         example: 640ada12ba88cc2ea54b975a
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The gun is deleted successfully.
 *       400:
 *         description: Invalid ID supplied.
 *       404:
 *         description: gun not found.
 *       500:
 *         description: Internal server error occurred while trying to delete the gun.
 */


//swagger documentation for DELETE - delete many guns by id
/**
 * @swagger
 * /api/v1/admin-panel/guns:
 *   delete:
 *     summary: Delete multiple guns by ids
 *     tags: [GUNS]
 *     description: Delete multiple guns by ids provided in the request body
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
 *                 description: Array of guns ids to be deleted
 *                 example: ["640afb35f975ca47907705f1","640afe5bfd1d600c2c6dfd91"]
 *     responses:
 *       200:
 *         description: Deletion Success message
 *       400:
 *         description: Bad request
 *       404:
 *         description: Gun not found
 */
