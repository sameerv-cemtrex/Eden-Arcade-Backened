const mongoose = require("mongoose");

module.exports = {
  userTasksSchema: new mongoose.Schema(
    {
      unlockedTaskGivers: {
        type: Array,
        default: [],
      },
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
  ),
};

