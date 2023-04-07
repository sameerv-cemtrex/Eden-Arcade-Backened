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
  let user = await User.findById(obj.id);
  const taskId = obj.taskId;
  if (user && taskId) {
    user.task.acceptedTask.taskId = taskId;
    user.task.acceptedTask.progress = 0;
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
