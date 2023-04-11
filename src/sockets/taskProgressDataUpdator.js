const { Task } = require("../_helpers/db");

exports.updateTaskProgressData = async (user) => {
  const task = user.task;

  switch (task.acceptedTask.task) {
    case "survival":
      await updateSurvivalTaskProgress(user);
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
const updateKillTaskProgress = async () => {};
const updateWaypointTaskProgress = async () => {};

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

    user.task.acceptedTask = {};
  }
};
