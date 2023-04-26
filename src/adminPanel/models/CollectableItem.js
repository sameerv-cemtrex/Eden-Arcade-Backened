const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    resource: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("collectableItems", schema);
