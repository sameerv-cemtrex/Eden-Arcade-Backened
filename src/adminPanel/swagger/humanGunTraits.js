//swagger schema for HumanGunTrait
/**
 * @swagger
 * components:
 *   schemas:
 *     HumanGunTrait:
 *       type: object
 *       properties:
 *         injuries:
 *           type: object
 *         survival:
 *           type: object
 */

//swagger documentation for POST - create new HumanGunTrait
/**
 * @swagger
 * /api/v1/admin-panel/human-gun-traits:
 *   post:
 *     summary: Create a new HumanGunTrait
 *     tags: [HumanGunTrait]
 *     description: Creates a new HumanGunTrait with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HumanGunTrait'
 *     responses:
 *       200:
 *         description: The created HumanGunTrait values
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

//swagger documentation for GET - get all drones
/**
 * @swagger
 * /api/v1/admin-panel/human-gun-traits:
 *   get:
 *     summary: Get all HumanGunTrait values with their details
 *     tags: [HumanGunTrait]
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
 *         description: HumanGunTrait list
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for GET - get HumanGunTrait details by id
/**
 * @swagger
 * /api/v1/admin-panel/human-gun-traits/{id}:
 *   get:
 *     summary: Get HumanGunTrait details by id
 *     tags: [HumanGunTrait]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         example: 641315273256503d442741f7
 *     responses:
 *       200:
 *         description: HumanGunTrait object
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for PUT - update HumanGunTrait by id
/**
 * @swagger
 * /api/v1/admin-panel/human-gun-traits/{id}:
 *   put:
 *     summary: Update a HumanGunTrait by ID
 *     tags: [HumanGunTrait]
 *     description: Updates an existing HumanGunTrait with the provided data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the HumanGunTrait to update
 *         required: true
 *         example: 641315273256503d442741f7
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HumanGunTrait'
 *     responses:
 *       200:
 *         description: The updated HumanGunTrait data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: HumanGunTrait not found
 *       500:
 *         description: Internal server error
 */

//swagger documentation for DELETE - delete HumanGunTrait by id
/**
 * @swagger
 *
 * /api/v1/admin-panel/human-gun-traits/{id}:
 *   delete:
 *     tags: [HumanGunTrait]
 *     summary: Delete a HumanGunTrait by ID
 *     description: Deletes the HumanGunTrait with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the HumanGunTrait to delete
 *         required: true
 *         example: 641315273256503d442741f7
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The HumanGunTrait is deleted successfully.
 *       400:
 *         description: Invalid ID supplied.
 *       404:
 *         description: HumanGunTrait not found.
 *       500:
 *         description: Internal server error occurred while trying to delete the HumanGunTrait.
 */
