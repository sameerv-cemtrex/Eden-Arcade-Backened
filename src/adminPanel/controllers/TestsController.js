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
    const tg = giver.taskGiver;
    let task = await Task.find({ giver: tg });
    const completedTasks = user.task.completedTasks || [];
    let i = 0;
    for (let t of task) {
      if (completedTasks[i] == t._id) {
        t.isCompleted = true;
      }

      if (user.task.acceptedTask.taskId == t._id) {
        t.isAccepted = true;
      }
      i++;
    }

    _.remove(task, function (a) {
      return a.isCompleted === true;
    });

    _.slice(task, 0, 4);

    tasks[giver.taskGiver] = task;
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

  const taskInfo = await Task.findOne({ _id: taskId });
  console.log(taskInfo.id);
  if (taskInfo) {
    user.task.acceptedTask.taskId = taskId;
    user.task.acceptedTask.taskType = taskInfo.type;

    switch (taskInfo.type) {
      case "kill":
        console.log("Kill case");
        const progressKillType = {
          target: taskInfo.goal.target,
          reqCount: taskInfo.goal.count,
          weapon: taskInfo.goal.weapon,
          hitpoint: taskInfo.goal.hitpoint || "",
          currentCount: 0,
          progressPercentage: 0,
        };

        user.task.acceptedTask.progress = progressKillType;
        break;

      case "survival":
        const progressSurvivalType = {
          additionalCondition: taskInfo.goal.additionalCondition || {},
          reqExtractionCount: taskInfo.goal.extractionCount,
          currentExtractionCount: 0,
          progressPercentage: 0,
        };

        user.task.acceptedTask.progress = progressSurvivalType;
        break;
      case "waypoint-fetch":
        const progressWaypointFetchType = {
          additionalCondition: taskInfo.goal.additionalCondition || {},
          reqExtractionCount: taskInfo.goal.extractionCount,
          currentExtractionCount: 0,
          progressPercentage: 0,
        };

        user.task.acceptedTask.progress = progressWaypointFetchType;
        break;
      case "fetch":
        const progressFetchType = {
          additionalCondition: taskInfo.goal.additionalCondition || {},
          reqExtractionCount: taskInfo.goal.extractionCount,
          currentExtractionCount: 0,
          progressPercentage: 0,
        };

        user.task.acceptedTask.progress = progressFetchType;
        break;

      default:
        console.log("Wrong task type.");
        break;
    }
  }

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
