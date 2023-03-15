const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    gunType: {
      type: String,
      default: "",
    },
    damage: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: String,
      default: "",
    },
    fireRate: {
      type: Number,
      default: 0,
    },
    hitPoints: {
      type: Number,
      default: 0,
    },
    movementSpeed: {
      type: Number,
      default: 0,
    },
    turningSpeed: {
      type: Number,
      default: 0,
    },
    shootingEffectiveRange: {
      type: Number,
      default: 0,
    },
    shootingMaximumRange: {
      type: Number,
      default: 0,
    },
    touchDamage: {
      type: Number,
      default: 0,
    },
    magzineSize: {
      type: Number,
      default: 0,
    },
    reloadTime: {
      type: Number,
      default: 0,
    },
    patrolRange: {
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
