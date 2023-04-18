const mongoose = require("mongoose");
const Item = require("./Item");
// const { Items } = require("../../_helpers/db");

const schema = mongoose.Schema({
  dome: {
    type: Number,
    default: 1,
  },
  startTime: {
    type: Number,
    default: 0,
  },
  endTime: {
    type: Number,
    default: 0,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },
});

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("DomeSaleItems", schema);
