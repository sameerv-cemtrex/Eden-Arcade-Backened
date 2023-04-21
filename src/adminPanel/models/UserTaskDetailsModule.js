const mongoose = require("mongoose");

const acceptedTaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: "",
    },
    taskType: {
      type: String,
      default: "",
    },
    progress: {
      type: Object,
      default: {},
    },
  },
  { _id: false, timestamps: false }
);

const unlockedTaskGiversSchema = new mongoose.Schema(
  {
    taskGiver: {
      type: String,
      default: "engineer",
    },
    currentTask: {
      type: Number,
      default: 0,
    },
  },
  { _id: false, timestamps: false }
);

module.exports = {
  userTasksSchema: new mongoose.Schema(
    {
      unlockedTaskGivers: [unlockedTaskGiversSchema],
      acceptedTask: acceptedTaskSchema,

      completedTasks: {
        type: Array,
        default: [],
      },
    },
    { _id: false, timestamps: true }
  ),
};
