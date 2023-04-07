const { validationResult } = require("express-validator");

const { User, Task, TaskGiver } = require("../../_helpers/db");
const { removeByAttr } = require("../utils/helpers");

const _ = require("lodash");

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.fetchAllAvailableTasksForUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  console.log(user);

  const taskGiversUnlocked = user.task.unlockedTaskGivers;

  console.log(taskGiversUnlocked);

  if (taskGiversUnlocked) {
    const allTasks = await fetchTasks(taskGiversUnlocked, user);

    console.log(allTasks);

    res.status(200).json({
      message: "task fetched successfully",
      tasks: allTasks,
    });
  }
};

const fetchTasks = async (taskGivers, user) => {
  const tasks = {};
  for (const giver of taskGivers) {
    let task = await Task.find({ giver });
    const completedTasks = user.task.completedTasks || [];
    let i = 0;
    for (let t of task) {
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

    _.remove(task, function (a) {
      return a.isCompleted === true;
    });

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

exports.acceptTaskByUser = async (req, res) => {
  const { userId, taskId } = req.body;
  const user = await User.findById(userId);

  user.task.acceptedTask.taskId = taskId;
  user.task.acceptedTask.progress = 0;
  await user.save();

  // const updatedUser = await User.findOneAndUpdate(
  //   { _id: userId },
  //   { task },
  //   function (err, user) {
  //     if (err) {
  //       res.status(401).json({
  //         error: err,
  //       });
  //     }
  //     console.log("updated user ===>", user);
  //   }
  // );

  res.status(200).json({
    message: "user updated successfully",
    user: user,
  });
};
