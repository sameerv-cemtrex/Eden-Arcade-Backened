const mongoose = require("mongoose");

//const MONGODB_URL = "mongodb://127.0.0.1:27017/ludo-api";
const MONGODB_URL =
  "mongodb+srv://amit1234:Nsit_delhi3@cluster0.d7rgz.mongodb.net/kho-api?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/user.model"),  
  UserPacks: require("../models/userpacks.model"),
  Squad: require("../models/squad.model"),
  Match: require("../models/matches.model"),
  SquadMatch: require("../models/squadMatches.model"),
  EpicLogin: require("../models/epicLogin.model"),
  Dome: require("../models/dome.model"),
  NpcStatic: require("../adminPanel/npcsStatic.model"),
  WeaponStatic: require("../adminPanel/weaponsStatic.model"),
  ArmorStatic: require("../adminPanel/armorStatic.model"),
  AmmosStatic: require("../adminPanel/ammosStatic.model"),
  BagPackStatic: require("../adminPanel/bagPackStatic.model"),
  TaskStatic: require("../adminPanel/taskStatic.model"),
  AttributeStatic: require("../adminPanel/attributesStatic.model"),
};
