const { validationResult } = require("express-validator");

const { User, Task, TaskGiver } = require("../../_helpers/db");

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.fetchAllAvailableTasksForUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  let tasks

  const taskGiversUnlocked = user.tasks.unlockedTaskGivers

  if(taskGiversUnlocked){
    tasks = await Task.find({taskGiver : taskGiversUnlocked}) 
  }

  res.status(200).json({
    message: "user fetched successfully",
    data: user,
  });
};
