const mongoose = require("mongoose");
const Counter = require("./Counter");

const schema = mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
      default: async function () {
        const counter = await Counter.find();
        counter.tasksCounter += 1;
        await counter.save();
        return "t_" + counter.tasksCounter;
      },
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: Number,
      default: 0,
    },
    giver: {
      type: String,
      default: "",
    },
    type: {
      type: Number,
      default: 0,
    },
    goal: {
      type: Number,
      default: 0,
    },
    rewards: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("GunAttachments", schema);
