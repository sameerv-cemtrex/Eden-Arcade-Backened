const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    usersCounter: {
      type: Number,
      default: 0,
    },
    tasksCounter: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Counters", schema);
