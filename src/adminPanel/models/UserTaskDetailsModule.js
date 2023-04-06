const mongoose = require("mongoose");

const acceptedTaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: "",
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { _id: false, timestamps: false }
);

module.exports = {
  userTasksSchema: new mongoose.Schema(
    {
      unlockedTaskGivers: {
        type: Array,
        default: [],
      },
      acceptedTask: acceptedTaskSchema,

      completedTasks: {
        type: Array,
        default: [],
      },
    },
    { _id: false, timestamps: true }
  ),
};
