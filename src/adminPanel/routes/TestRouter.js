const express = require("express");
const {
  fetchAllAvailableTasksForUser,
} = require("../controllers/TestsController");


const TestRouter = express.Router();

TestRouter.route("/fetch-all-available-tasks")
.get(fetchAllAvailableTasksForUser);

module.exports = TestRouter;
