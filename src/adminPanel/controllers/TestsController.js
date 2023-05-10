const { validationResult } = require("express-validator");

const { User, Task, TaskGiver, Items } = require("../../_helpers/db");
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

    const finalList = _.slice(task, 0, 2);

    tasks[giver.taskGiver] = finalList;
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

  res.status(200).json({
    message: "user updated successfully",
    user: user,
  });
};

exports.fetchCraftingList = async (req, res) => {
  const { userId, itemName } = req.body;
  const user = await User.findById(userId);
  const item = await Items.findOne({ name: itemName });
  const resources = user.resources;
  try {
    const itemInProgress = {
      itemName: item.name,
      startTime: new Date().getTime(),
      finishingTime: new Date(
        new Date().getTime() +
          item.craftingPrice.find((i) => i.resource === "time").quantity * 1000
      ).getTime(),
      rewards: item.craftingRewards,
    };

    // item.craftingPrice.map((item) => {
    //   if (item.resource !== "time") {
    //     resources[item.resource] -= item.quantity;
    //   }
    // });

    const craftingInventoryItem = {
      mainId: "",
      itemId: itemInProgress.itemName,
      posX: 0,
      posY: 0,
      rot: 0,
      buyTime: 0,
      insurance: 0,
      extra: null,
      child: [],
    };

    // // user.crafting.craftingInProgressItems.splice(_.indexOf(itemInProgress), 1);
    // user.resources = resources;
    // user.crafting.craftingInProgressItems = [
    //   ...user.crafting.craftingInProgressItems,
    //   itemInProgress,
    // ];

    // user.markModified("resources");
    // user.markModified("crafting");
    // await user.save();

    setTimeout(() => {
      console.log("time", new Date());
    }, item.craftingPrice.find((i) => i.resource === "time").quantity * 1000);

    res.status(200).json({
      message: "user updated successfully",
      length: itemInProgress,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err.code,
    });
  }
};

exports.unlockTaskGivers = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  const taskGivers = await TaskGiver.find().sort({ priority: 1 });

  if (user) {
    user.task.unlockedTaskGivers = [];

    if (taskGivers.length > 0) {
      for (tg of taskGivers) {
        const g = {
          taskGiver: tg.name,
          currentTask: 0,
        };
        user.task.unlockedTaskGivers.push(g);
        user.markModified("task");
      }
    }
    await user.save();
  }

  res.status(200).json({
    message: "task givers unlocked success",
    user: user,
  });
};
exports.getTasksByTaskGiver = async (req, res) => {
  let responseObj = {};
  let taskList = [];
  const { userId, taskgiver } = req.body;
  const user = await User.findById(userId);
  const completedTasks = user.task.completedTasks;
  const acceptedTaskId = user.task.acceptedTask.taskId;
  if (taskgiver && user) {
    const allTasks = await Task.find({
      giver: new RegExp(taskgiver, "i"),
    }).sort({ sequence: 1 });

    if (allTasks.length > 0) {
      // taskList = _.differenceBy(allTasks, completedTasks, "_id");
      taskList = allTasks.filter((at) => !completedTasks.includes(at.id));

      for (let tl of taskList) {
        if (tl.id === acceptedTaskId) {
          tl.isAccepted = true;
        }
      }

      const giverDetail = await TaskGiver.find({
        name: new RegExp(taskgiver, "i"),
      });
      responseObj = {
        giverDetail,
        taskList,
      };

      res.status(200).json({
        message: "task info fetched",
        data: responseObj,
      });
    }
  } else {
    res.status(404).json({
      message: "invalid inputs",
      data: responseObj,
    });
  }
};

exports.getAllTaskGivers = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (user) {
    const unlockedTaskGivers = user.task.unlockedTaskGivers.map(
      (e) => e.taskGiver
    );
    const acceptedTaskId = user.task.acceptedTask.taskId;
    const acceptedTask = await Task.findById(acceptedTaskId);

    const activeTaskGiver = acceptedTask.giver;

    const allTaskgivers = await TaskGiver.find();

    for (let at of allTaskgivers) {
      if (_.includes(unlockedTaskGivers, at.name)) {
        at.isUnlocked = true;
      }
      if (at.name.toLowerCase() === activeTaskGiver.toLowerCase()) {
        at.isActive = true;
      }
    }

    res.status(200).json({
      message: "Taskgivers fetched successfully",
      data: allTaskgivers,
    });
  }
};

exports.getHealthTest = async (req, res) => {
  const { userId, health } = req.body;
  const user = await User.findById(userId);

  _.assign(user.health, health);
  await user.save();

  if (user) {
    res.status(200).json({
      status: 200,
      data: user.health,
    });
  }
};
