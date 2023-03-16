const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      default: function () {
        return (
          "DRONE" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4)
        );
      },
    },
    droneType: {
      type: String,
      default: "",
    },
    gunType: {
      type: String,
      default: "",
    },
    damage: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
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
    patrolRangeMinimum: {
      type: Number,
      default: 0,
    },
    patrolRangeMaximum: {
      type: Number,
      default: 0,
    },
    patrolMovementSpeed: {
      type: Number,
      default: 0,
    },
    auditoryRange: {
      type: Number,
      default: 0,
    },
    visionRange: {
      type: Number,
      default: 0,
    },
    nearestDroneEngagedDetectionRange: {
      type: Number,
      default: 0,
    },
    respawning: {
      type: Boolean,
      default: false,
    },
    aimPoints: [
      {
        type: String,
        default: "Body",
      },
    ],
    noiseRange: {
      type: Number,
      default: 0,
    },
    patrolClearance: {
      type: Number,
      default: 0,
    },
    maximumClearance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Drones", schema);
