const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    weight: {
      type: Number,
      default: 0,
    },
    sizeX: {
      type: Number,
      default: 0,
    },
    sizeY: {
      type: Number,
      default: 0,
    },
    edenPurchasePrice: {
      type: Number,
      default: 0,
    },
    edenSellingPrice: {
      type: Number,
      default: 0,
    },
    craftingPrice: {
      type: Array,
      default: [],
    },
    isCraftable: {
      type: Boolean,
      default: false,
    },
    craftingRewards: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Items", schema);
