const express = require("express");
const {
  fetchAllAvailableTasksForUser,
  updateUserTasks,
} = require("../controllers/TestsController");

const TestRouter = express.Router();

TestRouter.route("/fetch-all-available-tasks").get(
  fetchAllAvailableTasksForUser
);

TestRouter.route("/update-user-tasks").put(updateUserTasks);

module.exports = TestRouter;
