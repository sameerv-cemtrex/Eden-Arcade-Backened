const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name must be unique"],
    },
    locationId: {
      type: String,
      unique: [true, "locationId must be unique"],
    },
    locationDetectionRadius: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Locations", schema);
