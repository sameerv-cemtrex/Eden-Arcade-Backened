const mongoose = require("mongoose");

const baseSettingsSchema = new mongoose.Schema(
  {
    PlayerLevel_Cap: { type: Number, default: 0.0 },
    PlayerIntelligence_Cap: { type: Number, default: 0.0 },
    PlayerStrength_Cap: { type: Number, default: 0.0 },
    PlayerVitality_Cap: { type: Number, default: 0.0 },
    PlayerEndurance_Cap: { type: Number, default: 0.0 },
    BleedingDamage: { type: Number, default: 0.0 },
    SuffocationDamage: { type: Number, default: 0.0 },
    BaseSearchTime: { type: Number, default: 0.0 },
    CarryWeight_Base: { type: Number, default: 0.0 },
    BaseOverburdenModifier: { type: Number, default: 0.0 },
    BaseKnifeDamage: { type: Number, default: 0.0 },
    PlayerKnifeMastery: { type: Number, default: 0.0 },
    KnifeMastery_Cap: { type: Number, default: 0.0 },
  },
  {
    _id: false,
  }
);

const injuriesSchema = new mongoose.Schema(
  {
    Arm_InjuredThreshold: { type: Number, default: 0.0 },
    Leg_InjuredThreshold: { type: Number, default: 0.0 },
    Head_InjuredThreshold: { type: Number, default: 0.0 },
    Torso_InjuredThreshold: { type: Number, default: 0.0 },
    BleedingDamage: { type: Number, default: 0.0 },
    AccuracyModifier: new mongoose.Schema(
      {
        Arm_InjuredPenalty: { type: Number, default: 0.0 },
        Arm_DeadPenalty: { type: Number, default: 0.0 },
        Head_InjuredPenalty: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    ADSCostModifier: new mongoose.Schema(
      {
        Arm_InjuredPenalty: { type: Number, default: 0.0 },
        Arm_DeadPenalty: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    MovementSpeedModifier: new mongoose.Schema(
      {
        oneLegInjured: {
          type: Number,
          default: 0.0,
        },
        twoLegsInjured: {
          type: Number,
          default: 0.0,
        },
        oneLegInjured_OtherBlackedOut: {
          type: Number,
          default: 0.0,
        },
        bothLegsBlackedOut: {
          type: Number,
          default: 0.0,
        },
      },
      { _id: false }
    ),
    MovementStaminaModifier: new mongoose.Schema(
      {
        oneLegInjured: {
          type: Number,
          default: 0.0,
        },
        twoLegsInjured: {
          type: Number,
          default: 0.0,
        },
        oneLegInjured_OtherBlackedOut: {
          type: Number,
          default: 0.0,
        },
        bothLegsBlackedOut: {
          type: Number,
          default: 0.0,
        },
      },
      { _id: false }
    ),
    StaminaModifier: new mongoose.Schema(
      {
        torsoInjured: { type: Number, default: 0.0 },
        torsoBlackedOut: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
  },
  { _id: false }
);

const movementAndActionSchema = new mongoose.Schema(
  {
    BaseStaminaRechargeRate: {
      type: Number,
      default: 0.0,
    },
    staminaThreshold: new mongoose.Schema(
      {
        jumping: {
          type: Number,
          default: 0.0,
        },
        sprinting: { type: Number, default: 0.0 },
        ADS: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    staminaCost: new mongoose.Schema(
      {
        Jumping: { type: Number, default: 0.0 },
        Sprinting: { type: Number, default: 0.0 },
        ADS: { type: Number, default: 0.0 },
        Walking: { type: Number, default: 0.0 },
        CrouchWalking: { type: Number, default: 0.0 },
        Crawling: { type: Number, default: 0.0 },
        KnifeAttack: { type: Number, default: 0.0 },
        GrenadeThrow: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    energyCost: new mongoose.Schema(
      {
        Jumping: { type: Number, default: 0.0 },
        Sprinting: { type: Number, default: 0.0 },
        ADS: { type: Number, default: 0.0 },
        Walking: { type: Number, default: 0.0 },
        CrouchWalking: { type: Number, default: 0.0 },
        Crawling: { type: Number, default: 0.0 },
        KnifeAttack: { type: Number, default: 0.0 },
        GrenadeThrow: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    oxygenCost: new mongoose.Schema(
      {
        Jumping: { type: Number, default: 0.0 },
        Sprinting: { type: Number, default: 0.0 },
        ADS: { type: Number, default: 0.0 },
        Walking: { type: Number, default: 0.0 },
        CrouchWalking: { type: Number, default: 0.0 },
        Crawling: { type: Number, default: 0.0 },
        KnifeAttack: { type: Number, default: 0.0 },
        GrenadeThrow: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    hydrationCost: new mongoose.Schema(
      {
        Jumping: { type: Number, default: 0.0 },
        Sprinting: { type: Number, default: 0.0 },
        ADS: { type: Number, default: 0.0 },
        Walking: { type: Number, default: 0.0 },
        CrouchWalking: { type: Number, default: 0.0 },
        Crawling: { type: Number, default: 0.0 },
        KnifeAttack: { type: Number, default: 0.0 },
        GrenadeThrow: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
  },
  { _id: false }
);

const statBenefitSchema = new mongoose.Schema(
  {
    Endurance_MaximumStaminaRechargeModifier: { type: Number, default: 0.0 },
    Vitality_MaximumBleedingRateModifier: { type: Number, default: 0.0 },
    Vitality_MaximumSuffocationRateModifier: { type: Number, default: 0.0 },
    Strength_MaximumCarryWeightModifier: { type: Number, default: 0.0 },
    Strength_MaximumSpeedPenaltyModifier: { type: Number, default: 0.0 },
    Intelligence_MaximumSearchReductionModifier: { type: Number, default: 0.0 },
    Strength_MaximumKnifeDamageModifier: { type: Number, default: 0.0 },
    Vitality_MaximumEnergyPenaltyModifier: { type: Number, default: 0.0 },
    Vitality_MaximumOxygenPenaltyModifier: { type: Number, default: 0.0 },
  },
  { _id: false }
);

const survivalSchema = new mongoose.Schema(
  {
    Oxygen_LowThreshold: { type: Number, default: 0.0 },
    Energy_LowThreshold: { type: Number, default: 0.0 },
    Hydration_LowThreshold: { type: Number, default: 0.0 },
    OxygenLowModifier: { type: Number, default: 0.0 },
    OxygenZeroModifier: { type: Number, default: 0.0 },
    SuffocationDamage: { type: Number, default: 0.0 },
    EnergyLowModifier: { type: Number, default: 0.0 },
    EnergyZeroModifier: { type: Number, default: 0.0 },
    Hydration_Low_AccuracyModifier: { type: Number, default: 0.0 },
    Hydration_Empty_AccuracyModifier: { type: Number, default: 0.0 },
  },
  { _id: false }
);

const schema = mongoose.Schema(
  {
    baseSettings: baseSettingsSchema,
    injuries: injuriesSchema,
    movementAndActions: movementAndActionSchema,
    statBenefits: statBenefitSchema,
    skillBenefits: new mongoose.Schema(
      {
        KnifeMastery_MaximumKnifeDamageModifier: { type: Number, default: 0.0 },
      },
      { _id: false }
    ),
    survival: survivalSchema,
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Health", schema);
