const { validationResult } = require("express-validator");

const { User, Task, TaskGiver } = require("../../_helpers/db");

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.fetchAllAvailableTasksForUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  // const taskGiversUnlocked = user.task.unlockedTaskGivers;
  const taskGiversUnlocked = ["engineer", "doctor"];

  if (taskGiversUnlocked) {
    const tasks = await fetchTasks(taskGiversUnlocked);

    console.log("tasks ===>", tasks);
    res.status(200).json({
      message: "task fetched successfully",
      tasks,
    });
  }
};

const fetchTasks = async (taskGivers) => {
  const tasks = {};
  for (const giver of taskGivers) {
    const task = await Task.find({ giver });
    console.log("giver ===>", giver);

    tasks[giver] = task;

    console.log("tasks inside forOf ====> ", tasks);
  }
  console.log("tasks outside forOf ====> ", tasks);

  return tasks;
};
