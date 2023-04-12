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

exports.fetchCraftingList = async (req, res) => {
  const { userId, itemName } = req.body;
  const user = await User.findById(userId);
  const item = await Items.findOne({ name: itemName });
  const resources = user.resources;
  try {
    const itemInProgress = {
      itemName: item.name,
      finishingTime: new Date(
        new Date().getTime() +
          item.craftingPrice.find((i) => i.resource === "time").quantity * 60000
      ).getTime(),
      rewards: item.craftingRewards,
    };

    item.craftingPrice.map((item) => {
      if (item.resource !== "time") {
        resources[item.resource] -= item.quantity;
      }
    });

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

    // user.crafting.craftingInProgressItems.splice(_.indexOf(itemInProgress), 1);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        resources,
        crafting: {
          // craftingInProgressItems: [
          //   ...user.crafting.craftingInProgressItems,
          //   itemInProgress,
          // ],
          craftingRewardsInventory: [
            // ...user.crafting.craftingInventory,
            craftingInventoryItem,
          ],
        },
      },
      { new: true },
      function (err, user) {
        if (err) {
          res.status(401).json({
            error: err,
          });
        }
      }
    );

    res.status(200).json({
      message: "user updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err.code,
    });
  }
};
