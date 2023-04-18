const mongoose = require("mongoose");

//const MONGODB_URL = "mongodb://127.0.0.1:27017/ludo-api";
const MONGODB_URL =
  "mongodb+srv://edendev:Y5oST9CKMlr2rVbS@edendev.2whynwg.mongodb.net/test";

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../routers/user.model"),
  Squad: require("../sockets/squad.model"),
  Match: require("../sockets/matches.model"),
  SquadMatch: require("../sockets/squadMatches.model"),
  EpicLogin: require("../sockets/epicLogin.model"),
  Dome: require("../sockets/dome.model"),
  Gun: require("../sockets/gun.model"),
  Server: require("../sockets/server.model"),
  Items: require("../adminPanel/models/Item"),
  GunStatic: require("../adminPanel/models/Gun"),
  GunAttachmentStatic: require("../adminPanel/models/GunAttachment"),
  GunAttachmentStatic: require("../adminPanel/models/GunAttachment"),
  HumanGunTraits: require("../adminPanel/models/HumanGunTrait"),
  Drones:require("../adminPanel/models/Drone"),
  Items:require("../adminPanel/models/Item"),

  NpcStatic: require("../adminPanel/npcsStatic.model"),
  WeaponStatic: require("../adminPanel/weaponsStatic.model"),
  ArmorStatic: require("../adminPanel/armorStatic.model"),
  AmmosStatic: require("../adminPanel/ammosStatic.model"),
  BagPackStatic: require("../adminPanel/bagPackStatic.model"),
  TaskStatic: require("../adminPanel/taskStatic.model"),
  AttributeStatic: require("../adminPanel/attributesStatic.model"),

  Task: require("../adminPanel/models/Task"),
  TaskGiver: require("../adminPanel/models/TaskGiver"),
  // DomeSaleItems: require("../adminPanel/models/DomeSaleItem"),
};
