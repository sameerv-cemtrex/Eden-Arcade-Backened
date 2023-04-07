const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    attachmentId: {
      type: String,
      required: true,
      default: function () {
        return (
          "GUNATT" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4)
        );
      },
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    model: {
      type: Number,
      default: 0,
    },
    texture: {
      type: String,
      default: "",
    },
    accuracyRating: {
      type: Number,
      default: 0,
    },
    damageRating: {
      type: Number,
      default: 0,
    },
    ergonomicsRating: {
      type: Number,
      default: 0,
    },
    fireRateRating: {
      type: Number,
      default: 0,
    },
    firingSoundGunshot: {
      type: Number,
      default: 0,
    },
    firingVFXMuzzleFlash: {
      type: Number,
      default: 0,
    },
    lengthInCm: {
      type: Number,
      default: 0,
    },
    rangeRating: {
      type: Number,
      default: 0,
    },
    recoilRating: {
      type: Number,
      default: 0,
    },
    weight: {
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
