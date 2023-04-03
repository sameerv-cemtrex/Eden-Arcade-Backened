const { validationResult } = require("express-validator");

const { User, Task, TaskGiver } = require("../../_helpers/db");

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.fetchAllAvailableTasksForUser = async (req, res) => {
  res.status(200).json({
    message: "Route Working for test controller",
  });
};
