const mongoose = require("mongoose");

const minMaxValuesSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      default: 0,
      required: true,
    },
    max: {
      type: Number,
      default: 5,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const accuracyModifierSchema = new mongoose.Schema(
  {
    Crouching: {
      type: Number,
      default: 0.0,
    },
    Prone: {
      type: Number,
      default: 0.0,
    },
    ADS: {
      type: Number,
      default: 0.0,
    },
    SemiAuto: {
      type: Number,
      default: 0.0,
    },
    Stationary: {
      type: Number,
      default: 0.0,
    },
    Level: {
      type: Number,
      default: 0.0,
    },
    Intelligence: {
      type: Number,
      default: 0.0,
    },
    Marksmanship: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const ADSCostModifierSchema = new mongoose.Schema(
  {
    Crouching: {
      type: Number,
      default: 0.0,
    },
    Prone: {
      type: Number,
      default: 0.0,
    },
    Level: {
      type: Number,
      default: 0.0,
    },
    Endurance: {
      type: Number,
      default: 0.0,
    },
    Handling: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const recoilModifierSchema = new mongoose.Schema(
  {
    Crouching: {
      type: Number,
      default: 0.0,
    },
    Prone: {
      type: Number,
      default: 0.0,
    },
    ADS: {
      type: Number,
      default: 0.0,
    },
    Level: {
      type: Number,
      default: 0.0,
    },
    Strength: {
      type: Number,
      default: 0.0,
    },
    Handling: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const reliabilityModifierSchema = new mongoose.Schema(
  {
    Level: {
      type: Number,
      default: 0.0,
    },
    Intelligence: {
      type: Number,
      default: 0.0,
    },
    Mastery: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const reloadSpeedModifierSchema = new mongoose.Schema(
  {
    Level: {
      type: Number,
      default: 0.0,
    },
    Handling: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const ADSSpeedModifierSchema = new mongoose.Schema(
  {
    Level: {
      type: Number,
      default: 0.0,
    },
    Endurance: {
      type: Number,
      default: 0.0,
    },
    Handling: {
      type: Number,
      default: 0.0,
    },
  },
  { _id: false }
);

const chancesSchema = new mongoose.Schema(
  {
    grip: Number,
    stock: Number,
    foregrip: Number,
    scope: Number,
    silencer: Number,
    flashlight: Number,
    handguard: Number,
    dustCover: Number,
    backstock: Number,
    compensator: Number,
    pump: Number,
    barrel: Number,
    muzzleBreak: Number,
    slide: Number,
  },
  { _id: false }
);
const ratingsSchema = new mongoose.Schema(
  {
    accuracy: [minMaxValuesSchema],
    damage: [minMaxValuesSchema],
    ergonomics: [minMaxValuesSchema],
    fireRate: [minMaxValuesSchema],
    firingSound: [minMaxValuesSchema],
    firingVFX: [minMaxValuesSchema],
    range: [minMaxValuesSchema],
    recoil: [minMaxValuesSchema],
    reliability: [minMaxValuesSchema],
    reloadSpeed: [minMaxValuesSchema],
    chance: chancesSchema,
  },
  { _id: false }
);

const otherTraitsSchema = new mongoose.Schema(
  {
    length: Number,
    weight: Number,
    silencer: Boolean,
  },
  { _id: false }
);

module.exports = {
  minMaxSettingSchema: new mongoose.Schema(
    {
      accuracy: minMaxValuesSchema,
      ADSSpeed: minMaxValuesSchema,
      Damage: minMaxValuesSchema,
      SemiAuto_FireRate: minMaxValuesSchema,
      FullAuto_FireRate: minMaxValuesSchema,
      FiringAudio: minMaxValuesSchema,
      FiringVFX: minMaxValuesSchema,
      EffectiveRange: minMaxValuesSchema,
      SemiAuto_HorizontalRecoil: minMaxValuesSchema,
      SemiAuto_VerticalRecoil: minMaxValuesSchema,
      FullAuto_HorizontalRecoil: minMaxValuesSchema,
      FullAuto_VerticalRecoil: minMaxValuesSchema,
      SemiAuto_Reliability: minMaxValuesSchema,
      FullAuto_Reliability: minMaxValuesSchema,
      ReloadSpeed: minMaxValuesSchema,
    },
    {
      _id: false,
    }
  ),
  additionalSettingsSchema: new mongoose.Schema(
    {
      MovementSpeedPenalty: {
        type: Number,
        default: 0,
      },
      PickupDelay: {
        type: Number,
        default: 0,
      },
      SwapDelay: {
        type: Number,
        default: 0,
      },
    },
    {
      _id: false,
    }
  ),
  modifiersSchema: new mongoose.Schema(
    {
      AccuracyModifier: accuracyModifierSchema,
      DamageModifier: {
        Headshot: {
          type: Number,
          default: 0,
        },
      },
      ADSCostModifier: ADSCostModifierSchema,
      RecoilModifier: recoilModifierSchema,
      ReliabilityModifier: reliabilityModifierSchema,
      ReloadSpeedModifier: reloadSpeedModifierSchema,
      ADSSpeedModifier: ADSSpeedModifierSchema,
    },
    { _id: false }
  ),
  specificGunValuesSchema: new mongoose.Schema(
    {
      Ratings: ratingsSchema,
      OtherTraits: otherTraitsSchema,
    },
    { _id: false }
  ),
};
