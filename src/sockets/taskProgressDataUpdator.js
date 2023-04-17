const { Task } = require("../_helpers/db");
const Item = require("../adminPanel/models/Item");

exports.updateTaskProgressData = async (user, eventData) => {
  const task = user.task;

  switch (task.acceptedTask.task) {
    case "survival":
      await updateSurvivalTaskProgress(user);
      break;
    case "kill":
      await updateKillTaskProgress(user, eventData);
      break;
    case "fetch":
      await updateFetchTaskProgress(user);
      break;
    case "waypoint-fetch":
      await updateWaypointFetchTaskProgress(user);
      break;
    case "waypoint-exploration":
      await updateWaypointExplorationTaskProgress(user);
      break;

    default:
      break;
  }
};

const updateFetchTaskProgress = async () => {};
const updateSurvivalTaskProgress = async (user) => {
  const taskType = user.task.acceptedTask.taskType;
  if (taskType && taskType === "survival") {
    let progress = user.task.progress;
    progress.currentExtractionCount += 1;
    progress.progressPercentage =
      (progress.currentExtractionCount / progress.reqExtractionCount) * 100;

    await completeTask(progress, user);
  }
};

const updateKillTaskProgress = async (user, eventData) => {
  const taskType = user.task.acceptedTask.taskType;
  if (taskType && taskType === "kill") {
    let progress = user.task.progress;
    if (
      progress.target === eventData.target &&
      progress.weapon === eventData.weapon
    ) {
      if (progress.hitPoint) {
        if (progress.hitPoint === eventData.hitPoint) {
          progress.currentCount += 1;
        }
      } else {
        progress.currentCount += 1;
      }

      progress.progressPercentage =
        (progress.currentCount / progress.reqCount) * 100;
    }

    await completeTask(progress, user);
  }
};

const updateWaypointFetchTaskProgress = async (user, eventData) => {};

const updateWaypointExplorationTaskProgress = async (user, eventData) => {};

const completeTask = async (progress, user) => {
  if (progress && progress.progressPercentage === 100) {
    user.task.completedTasks.push(task.acceptedTask.taskId);
    const task = await Task.findById(task.acceptedTask.taskId);
    const taskGiver = task.giver;

    const unlockedTaskGivers = user.task.unlockedTaskGivers;

    for (const utg of unlockedTaskGivers) {
      if (utg.taskGiver === taskGiver) {
        utg.currentTask += 1;
      }
    }

    await updateTaskRewardInventory(user, user.task.acceptedTask);

    user.task.acceptedTask = {};

    user.markModified("task");

    await user.save();
  }
};

const updateTaskRewardInventory = async (user, task) => {
  const taskId = task.taskId;
  const taskToBeRewarded = await Task.findById({ taskId });

  const rewards = taskToBeRewarded.rewards;

  for (const reward of rewards) {
    const item = await Item.findOne({ name: reward.item });

    if (item) {
      const inventoryObj = {
        mainId: item.category,
        itemName: item.name,
        posX: 0,
        posY: 0,
        rot: 0,
        buyTime: new Date.now(),
        insurance: 0,
        extra: null,
        child: [],
      };

      user.taskRewardsInventory.push(inventoryObj);

      user.markModified("taskRewardsInventory");

      await user.save();
    }
  }
};
