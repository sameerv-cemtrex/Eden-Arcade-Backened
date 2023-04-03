const { object } = require("joi");
const mongoose = require("mongoose");
const Counter = require("./Counter");

const schema = mongoose.Schema(
  {
    taskId: {
      type: String,
      default: function () {
        return (
          "T_" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4)
        );
      },
    },
    sequence: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: 0,
    },
    giver: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    goal: {
      type: Object,
      default: {},
    },
    rewards: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Tasks", schema);
