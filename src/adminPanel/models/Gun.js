const mongoose = require("mongoose");
const {
  minMaxSettingSchema,
  additionalSettingsSchema,
  modifiersSchema,
  specificGunValuesSchema,
} = require("./GunDetailsModule");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    magazineSize: {
      type: Number,
      default: 0,
    },
    minMaxSettings: minMaxSettingSchema,
    additionalSettings: additionalSettingsSchema,
    modifiers: modifiersSchema,
    specificGunValues: specificGunValuesSchema,
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Guns", schema);
