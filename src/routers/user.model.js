const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userTasksSchema,
} = require("../adminPanel/models/UserTaskDetailsModule");

const craftingSchema = new mongoose.Schema(
  {
    craftingInProgressItems: {
      type: Array,
      required: false,
      default: [],
    },
    craftingRewardsInventory: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { _id: false, timestamps: false }
);

const healthSchema = new mongoose.Schema(
  {
    head: { type: Number, default: 30 },
    torso: { type: Number, default: 50 },
    rightArm: { type: Number, default: 30 },
    leftArm: { type: Number, default: 30 },
    rightLeg: { type: Number, default: 30 },
    leftLeg: { type: Number, default: 30 },
  },
  { _id: false, timestamps: false }
);

const achievementsSchema = new mongoose.Schema(
  {
    unlockedAchievements: {
      type: Array,
      default: [
        {
          Title: "Noob",
          Value: 0,
          Variable: "",
        },
        {
          Title: "Murderer",
          Value: 10,
          Variable: "Player Kills",
        },
        {
          Title: "Killer",
          Value: 50,
          Variable: "Player Kills",
        },
        {
          Title: "Slaughterer",
          Value: 100,
          Variable: "Player Kills",
        },
      ],
      required: true,
    },
    currentAchievement: {
      type: Object,
      default: {
        Title: "Noob",
        Value: 0,
        Variable: "",
      },
      required: true,
    },
  },
  { _id: false, timestamps: false }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "",
  },
  userName: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  characterModel: {
    type: String,
    default: "male",
    trim: true,
    required: false,
  },
  code: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  deviceId: {
    type: String,
    trim: true,
    required: false,

    lowercase: true,
  },
  callRequest: {
    type: Object,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/163/442/png-clipart-computer-icons-user-profile-icon-design-avatar-face-heroes.png",
  },

  is_online: {
    type: Number,
    required: false,
    default: 0,
  },
  socket_id: {
    type: String,
    default: "",
  },
  xumm_id: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },

  accountId: {
    type: Number,
    required: true,
    default: 0,
  },

  antiCheatId: {
    type: String,

    default: 0,
  },

  squadJoin: {
    type: String,
    default: "",
  },
  matchId: {
    type: String,
    default: "",
  },
  team: {
    type: Number,
    default: "",
  },
  squads: {
    type: Array,
    required: false,
    default: [],
  },
  taskReward: {
    type: Array,
    required: false,
    default: [],
  },
  insuranceReward: {
    type: Array,
    required: false,
    default: [],
  },
  insurance: {
    type: Array,
    required: false,
    default: [],
  },
  inventory: {
    type: Array,
    required: false,
    default: [],
  },
  loadout: {
    type: Object,
    required: false,
  },
  loadoutInGame: {
    type: Object,
    required: false,
  },
  houses: {
    type: Array,
    required: false,
    default: [],
  },
  defaultHouse: {
    type: Number,
    default: -1,
  },
  joinedDome: {
    type: Number,
    default: 0,
  },
  houseVisited: {
    type: Number,
    default: -1,
  },
  requestPasses: {
    type: Array,
    required: false,
    default: [],
  },
  recievedPasses: {
    type: Array,
    required: false,
    default: [],
  },
  playerStat: {
    type: Object,
    required: false,
  },
  stat: {
    type: Object,
    required: false,
  },
  otp: {
    type: Object,
    required: false,
  },
  resources: {
    type: Object,
    required: false,
  },

  notificationRequest: {
    type: Array,
    required: false,
    default: [],
  },
  requestsSend: {
    type: Array,
    required: false,
    default: [],
  },
  friends: {
    type: Array,
    required: false,
    default: [],
  },
  hash: {
    type: String,
    required: false,
  },
  salt: {
    type: String,
    required: false,
  },
  task: userTasksSchema,
  crafting: craftingSchema,
  task: userTasksSchema,
  taskRewardsInventory: {
    type: Array,
    default: [],
  },
  health: healthSchema,
  achievements: {
    type: achievementsSchema,
    default: {},
  },
});

userSchema.set("toJSON", {
  virtuals: true,
});

// Define the pre-save middleware function to set the default values for the achievements subdocument
userSchema.pre("save", function (next) {
  if (!this.otp) {
    this.otp = {
      otp: 0,
      expiredAt: 0,
    };
  }
  if (!this.achievements) {
    this.achievements = {
      unlockedAchievements: [
        {
          Title: "Noob",
          Value: 0,
          Variable: "",
        },
        {
          Title: "Murderer",
          Value: 10,
          Variable: "Player Kills",
        },
        {
          Title: "Killer",
          Value: 50,
          Variable: "Player Kills",
        },
        {
          Title: "Slaughterer",
          Value: 100,
          Variable: "Player Kills",
        },
      ],
      currentAchievement: {
        Title: "Noob",
        Value: 0,
        Variable: "",
      },
    };
  }
  if (!this.stat) {
    this.stat = {
      totalRaids: 0,
      survivedRaids: 0,
      survivalRate: 0.0,
      totalKillsCount: 0,
      totalDronesKills: 0,
      smallDronesKills: 0,
      mediumDronesKills: 0,
      largeDronesKills: 0,
      criticalHit: 0.0,
      totalClonesKills: 0,
      gunKills: 0,
      knifeKills: 0,
      grenadeKills: 0,
      headshots: 0.0,
      containersOpened: 0,
      deathsFromClones: 0,
      kdWithClones: 0,
      missingInAction: 0,
      itemsCrafted: 0,
      foodEaten: 0,
      waterDrunk: 0,
      medsInjected: 0,
      questCompleted: 0,
      deathsFromDrones: 0,
      kdWithDrones: 0,
      edenDrops: 0,
    };
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.statics.resetPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new Error("Unable to reset the password");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Passwords don't match");
  } else {
    user.password = newPassword;
    await user.save();
  }
  return user;
};

userSchema.statics.forgotNewPassword = async (id, newPassword) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new Error("Unable to update the password");
  }
  user.password = newPassword;
  await user.save();
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
