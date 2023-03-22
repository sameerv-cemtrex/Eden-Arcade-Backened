const mongoose = require("mongoose");

const injuriesSchema = new mongoose.Schema(
  {
    Arm_InjuredThreshold: {
      type: Number,
      default: 0.0,
    },
    Head_InjuredThreshold: {
      type: Number,
      default: 0.0,
    },
    Torso_InjuredThreshold: {
      type: Number,
      default: 0.0,
    },
    Arm_InjuredPenalty_AccuracyModifier: {
      type: Number,
      default: 0.0,
    },
    Arm_DeadPenalty_AccuracyModifier: {
      type: Number,
      default: 0.0,
    },
    Arm_InjuredPenalty_ADSCostModifier: {
      type: Number,
      default: 0.0,
    },
    Arm_DeadPenalty_ADSCostModifier: {
      type: Number,
      default: 0.0,
    },
    Head_InjuredPenalty_AccuracyModifier: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const survivalSchema = new mongoose.Schema(
  {
    Oxygen_LowThreshold: {
      type: Number,
      default: 0.0,
    },
    Hunger_LowThreshold: {
      type: Number,
      default: 0.0,
    },
    Hydration_LowThreshold: {
      type: Number,
      default: 0.0,
    },
    Hydration_Low_AccuracyModifier: {
      type: Number,
      default: 0.0,
    },
    Hydration_Empty_AccuracyModifier: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const schema = mongoose.Schema(
  {
    injuries: injuriesSchema,
    survival: survivalSchema,
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("HumanGunTraits", schema);
