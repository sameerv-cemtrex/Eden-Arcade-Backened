const mongoose = require("mongoose");

const userTasksSchema = new mongoose.Schema(
  {
    unlockedTaskGivers: {
      type: Array,
      default : []
    }
     ,
    acceptedTasks: [
      {
        taskId: {
          type: String,
        },
        progress: {
          type: Object,
        },
      },
    ],
  },
  { _id: false, timestamps: true }
);
