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
  User: require("../routers/user.model"),  
  UserPacks: require("../routers/userpacks.model"),
  Squad: require("../sockets/squad.model"),
  Match: require("../sockets/matches.model"),
  SquadMatch: require("../sockets/squadMatches.model"),
  EpicLogin: require("../sockets/epicLogin.model"),
  Dome: require("../sockets/dome.model"),
  NpcStatic: require("../adminPanel/npcsStatic.model"),
  WeaponStatic: require("../adminPanel/weaponsStatic.model"),
  ArmorStatic: require("../adminPanel/armorStatic.model"),
  AmmosStatic: require("../adminPanel/ammosStatic.model"),
  BagPackStatic: require("../adminPanel/bagPackStatic.model"),
  TaskStatic: require("../adminPanel/taskStatic.model"),
  AttributeStatic: require("../adminPanel/attributesStatic.model"),
};
