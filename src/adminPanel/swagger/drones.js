//swagger schema for drones
/**
 * @swagger
 * components:
 *   schemas:
 *     Drone:
 *       type: object
 *       properties:
 *         droneType:
 *           type: string
 *           description: Type of the drone
 *           example: Small
 *         gunType:
 *           type: string
 *           description: Type of the gun.
 *           example: Pistol
 *         damage:
 *           type: number
 *           description: Damage
 *           example: 50
 *         accuracy:
 *           type: number
 *           description: Accuracy
 *           example: 65
 *         fireRate:
 *           type: number
 *           description: Fire-rate
 *           example: 0.225
 *         hitPoints:
 *           type: number
 *           description: Hit points
 *           example: 100
 *         movementSpeed:
 *           type: number
 *           description: Movement speed
 *           example: 15
 *         turningSpeed:
 *           type: number
 *           description: Turning Speed
 *           example: 0
 *         shootingEffectiveRange:
 *           type: number
 *           description: Shooting Effective Range
 *           example: 25
 *         shootingMaximumRange:
 *           type: number
 *           description: Shooting Maximum Range
 *           example: 43.75
 *         touchDamage:
 *           type: number
 *           description: Touch Damage
 *           example: 15
 *         magazineSize:
 *           type: number
 *           description: Size of magazine
 *           example: 7
 *         reloadTime:
 *           type: number
 *           description: Time to reload the gun
 *           example: 2.2
 *         patrolRangeMinimum:
 *           type: number
 *           description: Minimum patrol range
 *           example: 150
 *         patrolRangeMaximum:
 *           type: number
 *           description: Maximum patrol range
 *           example: 262.5
 *         patrolMovementSpeed:
 *           type: number
 *           description: Speed of movement while patroling
 *           example: 2
 *         auditoryRange:
 *           type: number
 *           description: Auditory range
 *           example: 50
 *         visionRange:
 *           type: number
 *           description: Range of vision
 *           example: 200
 *         nearestDroneEngagedDetectionRange:
 *           type: number
 *           description: Nearest drone engaged detection range
 *           example: 20
 *         respawning:
 *           type: boolean
 *           description: Respawning yes/no
 *           example: true
 *         aimPoints:
 *           type: array
 *           description: Aim points
 *           example: ["Body"]
 *         noiseRange:
 *           type: number
 *           description: Noise range
 *           example: 2000
 *         patrolClearance:
 *           type: number
 *           description: Noise range
 *           example: 2
 *         maximumClearance:
 *           type: number
 *           description: Noise range
 *           example: 10
 */

//swagger documentation for POST - create new drone
/**
 * @swagger
 * /api/v1/admin-panel/drones:
 *   post:
 *     summary: Create a new gun
 *     tags: [DRONES]
 *     description: Creates a new drone with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Drone'
 *     responses:
 *       200:
 *         description: The created drone
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

//swagger documentation for GET - get all drones
/**
 * @swagger
 * /api/v1/admin-panel/drones:
 *   get:
 *     summary: Get all drones with their details
 *     tags: [DRONES]
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
 *         description: Drones list
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for GET - get drone details by id
/**
 * @swagger
 * /api/v1/admin-panel/drones/{id}:
 *   get:
 *     summary: Get drone details by id
 *     tags: [DRONES]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         example: 641315273256503d442741f7
 *     responses:
 *       200:
 *         description: Drone object
 *         contens:
 *           application/json:
 *       404:
 *         description: Not Found
 */

//swagger documentation for PUT - update drone by id
/**
 * @swagger
 * /api/v1/admin-panel/drones/{id}:
 *   put:
 *     summary: Update a drone by ID
 *     tags: [DRONES]
 *     description: Updates an existing drone with the provided data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the drone to update
 *         required: true
 *         example: 641315273256503d442741f7
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Drone'
 *     responses:
 *       200:
 *         description: The updated drone data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Drone not found
 *       500:
 *         description: Internal server error
 */

//swagger documentation for DELETE - delete drone by id
/**
 * @swagger
 *
 * /api/v1/admin-panel/drones/{id}:
 *   delete:
 *     tags: [DRONES]
 *     summary: Delete a drone by ID
 *     description: Deletes the drone with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the drone to delete
 *         required: true
 *         example: 641315273256503d442741f7
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The drone is deleted successfully.
 *       400:
 *         description: Invalid ID supplied.
 *       404:
 *         description: Drone not found.
 *       500:
 *         description: Internal server error occurred while trying to delete the drone.
 */

//swagger documentation for DELETE - delete many drones by id array
/**
 * @swagger
 * /api/v1/admin-panel/drones:
 *   delete:
 *     summary: Delete multiple drones by ids
 *     tags: [DRONES]
 *     description: Delete multiple drone by ids provided in the request body
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
 *                 description: Array of drone ids to be deleted
 *                 example: ["6413fb0fd4ab102c68415950","641315273256503d442741f7"]
 *     responses:
 *       200:
 *         description: Deletion Success message
 *       400:
 *         description: Bad request
 *       404:
 *         description: Gun not found
 */
