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
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("uniqueItems", schema);
