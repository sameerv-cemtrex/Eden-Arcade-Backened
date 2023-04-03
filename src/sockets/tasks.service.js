const db = require("../_helpers/db");
const constants = require("../_helpers/constants");
const mongoose = require("mongoose");

const User = db.User;
const Task = db.Task;
const TaskGiver = db.TaskGiver;

module.exports = {
  acceptTask,
  fetchAvailableTasks,
};

//player accepts task
async function fetchAvailableTasks(socket, obj, cb, io) {
  console.log("Accepting new task ");
  const taskGivers = await TaskGiver.find().sort("priority")
  let user = await User.findById(obj.id);

  if (user) {
    const tasks = await Task.find()
    
  }
}
//player accepts task
async function acceptTask(socket, obj, cb, io) {
  console.log("Accepting new task ");
  let user = await User.findById(obj.id);
  if (user) {

  }
}
