const mongoose = require("mongoose");

const schema = mongoose.Schema({
  domeId: { type: Number, default: 1 },
  panel1: { type: String, default: "" },
  panel2: { type: String, default: "" },
  panel3: { type: String, default: "" },
  panel4: { type: String, default: "" },
  panel5: { type: String, default: "" },
  panel6: { type: String, default: "" },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("NFTPrefabs", schema);
