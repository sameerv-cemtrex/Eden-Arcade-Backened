const db = require("../_helpers/db");
const constants = require("../_helpers/constants");
const mongoose = require("mongoose");

const User = db.User;
const Task = db.Task;
const TaskGiver = db.TaskGiver;

const _ = require("lodash");

module.exports = {
  acceptTask,
  fetchAvailableTasks,
  mergeTaskRewardsInventory,
  getActiveTaskDetails,
  getTaskDetails,
  getTaskGivers,
  getTasksByTaskgiver,
};

//player gets list of available tasks according to profile
async function fetchAvailableTasks(socket, obj, cb, io) {
  console.log("Fetching all available task ");
  let user = await User.findById(obj.id);

  if (user) {
    const taskGiversUnlocked = user.task.unlockedTaskGivers;

    if (taskGiversUnlocked) {
      const allTasks = await fetchTasks(taskGiversUnlocked, user);

      cb({
        status: 200,
        data: allTasks,
      });
    }
  }
}

//player accepts task
async function acceptTask(socket, obj, cb, io) {
  console.log("Accepting new task ");
  const userId = obj.id
  let user = await User.findById(userId);
  const taskId = obj.taskId;
  if (user && taskId) {
    //check for active task
    const currentAcceptedTask = user.task.acceptedTask;
    if (currentAcceptedTask.taskId && currentAcceptedTask.taskType) {
      cb({
        status: 409,
        message: "Conflict ! Incomplete task already present",
        data: {},
      });
    }

    const taskInfo = await Task.findOne({ _id: taskId });

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
            item: taskInfo.goal.item,
            reqQuantity: taskInfo.goal.quantity,
            currentQuantity: 0,
            progressPercentage: 0,
          };

          user.task.acceptedTask.progress = progressWaypointFetchType;
          break;
        case "waypoint-exploration":
          const progressWaypointExplorationType = {
            locationId: taskInfo.goal.locationId || {},
            locationPointRadius: taskInfo.goal.locationPointRadius,
            progressPercentage: 0,
          };

          user.task.acceptedTask.progress = progressWaypointExplorationType;
          break;
        case "fetch":
          const progressFetchType = {
            item: taskInfo.goal.item,
            reqQuantity: taskInfo.goal.quantity,
            currentQuantity: 0,
            progressPercentage: 0,
          };

          user.task.acceptedTask.progress = progressFetchType;
          break;

        default:
          console.log("Wrong task type.");
          break;
      }
    }

    await user.markModified("task");

    await user.save();
  }

  cb({
    status: 200,
    message: "task accepted successfully",
    data: user,
  });
}

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

    const finalTaskList = _.slice(task, 0, 2);

    tasks[giver.taskGiver] = finalTaskList;
  }
  return tasks;
};

//merge task rewards inventory to player's general inventory
async function mergeTaskRewardsInventory(socket, obj, cb, io) {
  const userId = obj.id;
  const user = await User.findById(userId);
  const taskRewardsInventory = user.taskRewardsInventory;

  const item = obj.item;

  if (item && user) {
    const inventoryObj = {
      mainId: item.category,
      itemName: item.name,
      posX: item.posX ? item.posX : 0,
      posY: item.posY ? item.posY : 0,
      rot: item.rot ? item.rot : 0,
      buyTime: new Date.now(),
      insurance: item.insurance ? item.insurance : 0,
      extra: null,
      child: [],
    };

    await user.inventory.push(inventoryObj);

    await user.markModified("inventory");

    await user.save();

    cb({
      status: 200,
      message: "task reward item merged to player inventory successfully",
      data: user,
    });
  }
}

async function getActiveTaskDetails(socket, obj, cb, io) {
  let activeTask = {};
  const userId = obj.id;
  if (userId) {
    let user = await User.findById(userId);
    if (user) {
      const taskId = user.tasks.acceptedTask.taskId;
      if (taskId) {
        const taskData = await Task.findById(taskId);
        const progress = user.acceptedTask.progress;
        const giverDetail = await TaskGiver.find({
          profession: new RegExp(taskData.giver, "i"),
        });
        activeTask = {
          taskData,
          progress,
          giverDetail,
        };

        cb({
          status: 200,
          message: "active task info successfully fetched.",
          data: activeTask,
        });
      } else {
        cb({
          status: 404,
          message: "No active task found.",
          data: {},
        });
      }
    }
  }
}

async function getTaskDetails(socket, obj, cb, io) {
  const userId = obj.id;
  const taskId = obj.id;
  if (userId && taskId) {
    let user = await User.findById(userId);
    if (user) {
      if (taskId) {
        const taskData = await Task.findById(taskId);

        if (taskData) {
          cb({
            status: 200,
            message: "task data fetched successfully",
            data: taskData,
          });
        } else {
          cb({
            status: 404,
            message: "task data not found",
            data: {},
          });
        }
      }
    }
  }
}

async function getTaskGivers(socket, obj, cb, io) {
  const user = await User.findById(obj.id);
  if (user) {
    const unlockedTaskGivers = user.task.unlockedTaskGivers.map(
      (e) => e.taskGiver
    );
    const acceptedTaskId = user.task.acceptedTask.taskId;
    const acceptedTask = await Task.findById(acceptedTaskId);

    const activeTaskGiver = acceptedTask.giver;

    const allTaskgivers = await TaskGiver.find();

    for (let at of allTaskgivers) {
      if (_.includes(unlockedTaskGivers, at.profession)) {
        at.isUnlocked = true;
      }
      if (at.profession.toLowerCase() === activeTaskGiver.toLowerCase()) {
        at.isActive = true;
      }
    }

    cb({
      status: 200,
      message: "Taskgivers fetched successfully",
      data: allTaskgivers,
    });
  }
}

async function getTasksByTaskgiver(socket, obj, cb, io) {
  let responseObj = {};
  let taskList = [];
  const userId = obj.id;
  const taskgiver = obj.taskgiver;
  const user = await User.findById(userId);

  if (taskgiver && user) {
    const completedTasks = user.task.completedTasks;
    const acceptedTaskId = user.task.acceptedTask.taskId;
    const allTasks = await Task.find({
      giver: new RegExp(taskgiver, "i"),
    }).sort({ sequence: 1 });

    if (allTasks.length > 0) {
      taskList = allTasks.filter((at) => !completedTasks.includes(at.id));

      for (let tl of taskList) {
        if (tl.id === acceptedTaskId) {
          tl.isAccepted = true;
        }
      }

      const giverDetail = await TaskGiver.find({
        profession: new RegExp(taskgiver, "i"),
      });
      responseObj = {
        giverDetail,
        taskList,
      };

      cb({
        status: 200,
        message: "task info fetched",
        data: responseObj,
      });
    }
  } else {
    cb({
      status: 404,
      message: "please provide valid taskgiver and user id",
      data: {},
    });
  }
}
