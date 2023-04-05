const { validationResult } = require("express-validator");

const { User, Task, TaskGiver } = require("../../_helpers/db");

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.fetchAllAvailableTasksForUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  const taskGiversUnlocked = user.task.unlockedTaskGivers;

  if (taskGiversUnlocked) {
    const allTasks = await fetchTasks(taskGiversUnlocked, user);

    res.status(200).json({
      message: "task fetched successfully",
      tasks: allTasks,
    });
  }
};

const fetchTasks = async (taskGivers, user) => {
  const tasks = {};
  for (const giver of taskGivers) {
    const task = await Task.find({ giver });
    console.log("giver ===>", giver);

    const completedTasks = user.task.completedTasks || [];
    let i = 0;
    for (let t of task) {
      console.log("Task =>", t);

      if (completedTasks[i] == t._id) {
        t.isCompleted = true;
        console.log("Completed task " + t._id);
      }

      if (user.task.acceptedTask.taskId == t._id) {
        t.isAccepted = true;
        console.log("Accepted task " + t._id);
      }

      i++;
    }

    tasks[giver] = task;
  }
  return tasks;
};

exports.updateUserTasks = async (req, res) => {
  const { userId, task } = req.body;
  const user = await User.findById(userId);

  // const taskGiversUnlocked = user.task.unlockedTaskGivers;
  const taskGiversUnlocked = ["engineer", "doctor"];

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { task },
    function (err, user) {
      if (err) {
        res.status(401).json({
          error: err,
        });
      }
      console.log("updated user ===>", user);
    }
  );

  res.status(200).json({
    message: "user updated successfully",
    user: updatedUser,
  });
};
