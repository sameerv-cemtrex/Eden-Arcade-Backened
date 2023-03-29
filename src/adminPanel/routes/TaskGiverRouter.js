const express = require("express");
const {
  createTaskGiver,
  getAllTaskGivers,
  getTaskGiver,
} = require("../controllers/TaskGiversController");
const response = require("../middlewares/response");
const TaskGiver = require("../models/TaskGiver");
const {
  createTaskGiverValidation,
} = require("../validators/TaskGiverValidator");

const TaskGiverRouter = express.Router();

TaskGiverRouter.route("/")
  .post(createTaskGiverValidation, createTaskGiver)
  .get(response(TaskGiver), getAllTaskGivers);
//   .delete(deleteManyItemsValidation, deleteItems);

TaskGiverRouter.route("/:id").get(getTaskGiver);
//   .put(updateItemValidation, updateItem)
//   .delete(deleteItem);

module.exports = TaskGiverRouter;
