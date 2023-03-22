const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    usersCounter: {
      type: Number,
    },
    tasksCounter: {
      type: Number,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Counters", schema);
