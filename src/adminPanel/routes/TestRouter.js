const express = require("express");
const {
  fetchAllAvailableTasksForUser,
  updateUserTasks,
  acceptTaskByUser,
  fetchCraftingList,
  unlockTaskGivers,
} = require("../controllers/TestsController");

const TestRouter = express.Router();

TestRouter.route("/fetch-all-available-tasks").get(
  fetchAllAvailableTasksForUser
);

TestRouter.route("/update-user-tasks").put(updateUserTasks);
TestRouter.route("/unlock-task-givers").put(unlockTaskGivers);
TestRouter.route("/accept-tasks").put(acceptTaskByUser);
TestRouter.route("/crafting").get(fetchCraftingList);

module.exports = TestRouter;
