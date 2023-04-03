const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
   userId: {
      type: String,
      default: "",
    },
    unlockedTaskGivers : ["Engineer"],
    acceptedTasks: [
        {
            taskId : {
                type : String
            },
            progress : {
                type: Object
            }
        }
    ],
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("User_Tasks", schema);
