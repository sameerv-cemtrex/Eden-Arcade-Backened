const express = require("express");
const db = require("../_helpers/db");
const router = express.Router();
//const { customAlphabet } = require('nanoid');
//const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
const { sendVerificationMail } = require("../email/mail");
const userPacks = require("./userpacks.service");
const validator = require("validator");
const { ResumeToken } = require("mongodb");
const User = db.User;
const UserPacks = db.UserPacks;
const Match = db.Match;
const Squad = db.Squad;
const SquadMatch = db.SquadMatch;
const EpicLogin = db.EpicLogin;
const Dome = db.Dome;

const Verification = require("../sockets/verification.modal");
const constants = require("../_helpers/constants");
//const weaponsStaticData = require("../jsons/weapons");
//const armorStaticData = require("../jsons/armor");
///const bagpackStaticData = require("../jsons/bagPack");
//const ammosStaticData = require("../jsons/ammos");
//const xpStaticData = require("../jsons/xp");



const NpcStatic = db.NpcStatic;
const WeaponStatic = db.WeaponStatic;
const ArmorStatic = db.ArmorStatic;
const AmmosStatic = db.AmmosStatic;
const BagPackStatic = db.BagPackStatic;
const TaskStatic = db.TaskStatic;
const AttributeStatic = db.AttributeStatic;
const Server = db.Server;



const adminPanel = require("../adminPanel/adminPanel");
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
//var config = require('../config');
router.post("/adminPanel/editUserByAccounId/:id", async (req, res) => {
  console.log("calling" + req.params.id);
  adminPanel.editUserByAccountId(req, res);
});
/**
 * @swagger
 * /server/createServer/{country}:
 *   post:
 *     summary: Create a new server 
 *     tags: [Server]
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         
 *         description: Category of static data ..eg -weaponsStatic
 *      
 *     responses:
 *       200:
 *         description: Server successfully added
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Server already exist
 */
router.post("/server/createServer/:country", async (req, res) => {
  let server = await Server.findOne({ country: req.params.country });
  if (server) {
    res.status(200).send({
      message: "Server already exist",
      status: 200
    });
  }
  else {
    let server = new Server();
    server.country = req.params.country;

    let d = {
      port: 7777,
      team: 0

    }
    let d1 = {
      port: 5555,
      team: 0

    }
    let d2 = {
      port: 3333,
      team: 0

    }
    server.servers.push(d);
    server.servers.push(d1);
    server.servers.push(d2);
    await server.save();
    res.status(200).send({
      message: server,
      status: 200
    });
  }
}

);



/**
 * @swagger
 * components:
 *   schemas:
 *     UserById:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *        
 *       example:
 *         id: 637c67c6f9567d35dcb007dc
 *   
 */
/**
 * @swagger
 * /adminPanel/getUserByAccounId/{id}:
 *   get:
 *     summary: Get particular static data of inventory,npcs or tasks
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of static data
 
 *            
 *     responses:
 *       200:
 *         description: The list of static data of that category
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that category was not found
 */
router.get("/adminPanel/getUserByAccounId/:id", async (req, res) => {
  console.log("calling" + req.params.id);
  adminPanel.getUserByAccountId(req, res);
});
/**
 * @swagger
 * /adminPanel/getAllData/{_id}/{category}:
 *   get:
 *     summary: Get particular static data of inventory,npcs or tasks
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of static data
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *            
 *     responses:
 *       200:
 *         description: The list of static data of that category
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that category was not found
 */
router.get('/adminPanel/getAllData/:_id/:category', async (req, res) => {
  console.log("calling");
  adminPanel.getSingleData(req, res);
});



/**
 * @swagger
 * /adminPanel/getAllData/{category}:
 *   get:
 *     summary: Get particular static data of inventory,npcs or tasks
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *     responses:
 *       200:
 *         description: The list of static data of that category
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that category was not found
 */
router.get('/adminPanel/getAllData/:category', async (req, res) => {
  console.log("calling");
  adminPanel.getData(req, res);
});
/**
 * @swagger
 * /adminPanel/deleteAllData/{category}:
 *   post:
 *     summary: Delete multiple items of static data 
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'          
 *     responses:
 *       200:
 *         description: The items are successfully deleted
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that id is not found
 */

router.post("/adminPanel/deleteAllData/:category", async (req, res) => {
  console.log(req.body + "   " + req.params)
  adminPanel.deleteMoreData(req, res);
});


/**
 * @swagger
 * /adminPanel/deleteData/{_id}/{category}:
 *   post:
 *     summary: Delete a specified item of static data 
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of static data
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *            
 *     responses:
 *       200:
 *         description: The item was successfully deleted
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that id is not found
 */

router.post("/adminPanel/deleteData/:_id/:category", async (req, res) => {
  adminPanel.deleteData(req, res);
});
/**
 * @swagger
 * /adminPanel/editData/{_id}/{category}:
 *   post:
 *     summary: Edit a specified item of static data 
 *     tags: [Admin Panel]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of static data
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'      
 *     responses:
 *       200:
 *         description: The item was successfully edited
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that id is not found
 */
router.post("/adminPanel/editData/:_id/:category", async (req, res) => {
  adminPanel.editData(req, res);
});

router.post("/adminPanel/addAllData/:category", async (req, res) => {
  adminPanel.addAllData(req, res);
});
/**
 * @swagger
 * /adminPanel/addData/{category}:
 *   post:
 *     summary: Add a specified item of static data 
 *     tags: [Admin Panel]
 *     parameters:
 *       
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of static data ..eg -weaponsStatic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'      
 *     responses:
 *       200:
 *         description: The item was successfully edited
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: Static data of that id is not found
 */
router.post("/adminPanel/addData/:category", async (req, res) => {
  adminPanel.addData(req, res);
});


/**
 * @swagger
 * /basic/getAllData:
 *   get:
 *     summary: Get all static data of inventory,npcs and tasks
 *     tags: [BASIC]
 *     
 *     responses:
 *       200:
 *         description: The list of static data of that category
 *         contens:
 *           application/json:
 *            
 *
 */
router.get("/basic/getAllData", async (req, res) => {
  console.log("get all static data ");
  let npc = await NpcStatic.find({ name: { "$exists": true } });
  let weapons = await WeaponStatic.find({ name: { "$exists": true } });
  let ammos = await AmmosStatic.find({ name: { "$exists": true } });
  let armor = await ArmorStatic.find({ name: { "$exists": true } });
  let bagPack = await BagPackStatic.find({ name: { "$exists": true } });
  let task = await TaskStatic.find({ name: { "$exists": true } });
  let attributes = await AttributeStatic.find({ name: { "$exists": true } });

  let weaponsData =
  {
    id: 1,
    name: "weapon",
    data: weapons
  }
  let armorData =
  {
    id: 2,
    name: "armor",
    data: armor
  }
  let ammosData =
  {
    id: 3,
    name: "ammos",
    data: ammos
  }
  let bagPackData =
  {
    id: 4,
    name: "bagPack",
    data: bagPack
  }
  let message =
  {
    npc: npc,
    weaponsData: weaponsData,
    ammosData: ammosData,
    armorData: armorData,
    bagPackData: bagPackData,
    task: task,
    attributes: attributes
  }
  res.status(200).send({
    status: 200,
    message: message

  });

});


/**
 * @swagger
 * /user/userAllData:
 *   post:
 *     summary: Get user data by user id
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */

router.post("/user/userAllData", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    res.status(200).send({
      status: 200,
      message: user
    });
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
});



router.post("/match/userPlayingDetails", async (req, res) => {
  let user = await User.findById(req.body.id);
  console.log(user._id);
  user.code = req.body.code;
  await user.save();
  res.status(200).send({
    status: 200,
    message: user.code
  });

});
router.post("/match/userPlaying", async (req, res) => {
  console.log("Player Plays " + req.body.id + "   " + req.body.code + "   ");
  let user = await User.findById(req.body.id);
  console.log("Player Plays MATCH" + user.matchId);
  user.code = req.body.code;
  await user.save();
  res.status(200).send({
    status: 200,

  });

});

router.post("/match/userQuits", async (req, res) => {
  console.log("Player Quits Again " + req.body.id.length);
  if (req.body.id.length > 0) {
    let user = await User.findById(req.body.id);
    if (user) {
      user.code = "";
      await user.save();

      res.status(200).send({
        status: 200,

      });
    }
  }

});
/**
 * @swagger
 * /basic/currentTime:
 *   get:
 *     summary: Get current time of server
 *     tags: [BASIC]
 *     
 *     responses:
 *       200:
 *         description: Get current time of server
 *         contens:
 *           application/json:
 *            
 *       
 */
router.get("/basic/currentTime", async (req, res) => {
  let cur = Math.floor(new Date().getTime() / 1000);
  res.status(200).send({
    message: cur,
  });

});
/**
 * @swagger
 * /basic/getUserPackById:
 *   post:
 *     summary: Get user data by user id
 *     tags: [BASIC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */

router.post("/basic/getUserPackById", async (req, res) => {
  let user = await UserPacks.findById(req.body.id);
  if (user) {
    res.status(200).send({
      message: user,
      status: 200
    });
  }

});
/**
 * @swagger
 * /basic/getUserByUserPackId:
 *   post:
 *     summary: Get user data by user user pack id
 *     tags: [BASIC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/basic/getUserByUserPackId", async (req, res) => {
  let user = await User.findOne({ userPackId: req.body.id });
  if (user) {
    let d = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      is_online: user.is_online,
      userPackId: user.userPackId

    }
    res.status(200).send({
      message: d,
      status: 200
    });
  }

});
/**
 * @swagger
 * /basic/getUserById:
 *   post:
 *     summary: Get user data by id
 *     tags: [BASIC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/basic/getUserById", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    let d = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      is_online: user.is_online,
      userPackId: user.userPackId

    }
    res.status(200).send({
      message: d,
      status: 200
    });
  }

});


router.post("/basic/getUserByAccounId", async (req, res) => {
  let user = await User.findOne({ accountId: req.body.accountId });
  if (user) {
    let d = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      is_online: user.is_online,
      userPackId: user.userPackId

    }
    res.status(200).send({
      message: d,
      status: 200
    });
  }
  else {
    res.status(400).send({
      message: "no user found",
      status: 400
    });

  }


});

router.post("/friend/requestList", async (req, res) => {
  let userPack = await UserPacks.findById(req.body.id);
  if (userPack) {
    if (!Array.isArray(userPack.requestsSend)) {
      userPack.requestsSend = [];
    }
    res.status(200).send({
      message: userPack.requestsSend,
      status: 200
    });
  }
});

router.post("/friend/friendsList", async (req, res) => {
  let userPack = await UserPacks.findById(req.body.id);
  if (userPack) {
    if (!Array.isArray(userPack.friends)) {
      userPack.friends = [];
    }
    res.status(200).send({
      message: userPack.friends,
      status: 200
    });
  }
});

router.post("/friend/notificationList", async (req, res) => {
  let userPack = await UserPacks.findById(req.body.id);
  if (userPack) {
    if (!Array.isArray(userPack.notificationRequest)) {
      userPack.notificationRequest = [];
    }
    res.status(200).send({
      message: userPack.notificationRequest,
      status: 200
    });
  }
});

/* router.post("/friend/acceptRequest", async (req, res) => {
  let requestUserPack = await UserPacks.findById(req.body.requestId);
  let userPack = await UserPacks.findById(req.body.id);



  if (!Array.isArray(requestUserPack.notificationRequest)) {
    requestUserPack.notificationRequest = [];
  }
  if (!Array.isArray(userPack.requestsSend)) {
    userPack.requestsSend = [];

  }
  if (!Array.isArray(userPack.friends)) {
    userPack.friends = [];
  }

  let alreadyFriend = false
  for (let i = 0; i < userPack.friends.length; i++) {
    if (JSON.stringify(userPack.friends[i]) == JSON.stringify(requestUserPack._id)) {
      alreadyFriend = true;
      break;
    }
  }
  if (alreadyFriend) {
    userPack.notificationRequest.pull(requestUserPack._id);
    requestUserPack.requestsSend.pull(userPack._id);
    await userPack.save();
    await requestUserPack.save();
    res.status(200).send({
      message: "Already A Friend",
      status: 200
    });

  }

  if (!alreadyFriend) {
    userPack.friends.push(requestUserPack._id);
    requestUserPack.friends.push(userPack._id);
    userPack.notificationRequest.pull(requestUserPack._id);
    requestUserPack.requestsSend.pull(userPack._id);
    await userPack.save();
    await requestUserPack.save();
    res.status(200).send({
      message: userPack,
      status: 200
    });
  }


});

router.post("/friend/rejectRequest", async (req, res) => {
  let requestUserPack = await UserPacks.findById(req.body.requestId);
  let userPack = await UserPacks.findById(req.body.id);



  if (!Array.isArray(requestUserPack.notificationRequest)) {
    requestUserPack.notificationRequest = [];
  }
  if (!Array.isArray(userPack.requestsSend)) {
    userPack.requestsSend = [];

  }




  userPack.notificationRequest.pull(requestUserPack._id);
  requestUserPack.requestsSend.pull(userPack._id);
  await userPack.save();
  await requestUserPack.save();
  res.status(200).send({
    message: userPack,
    status: 200
  });


});

router.post("/friend/sendRequest", async (req, res) => {
  let requestUserPack = await UserPacks.findById(req.body.requestId);
  let userPack = await UserPacks.findById(req.body.id);
  console.log(requestUserPack._id);
  console.log(userPack._id);
  if (userPack && requestUserPack) {
    if (!Array.isArray(userPack.friends)) {
      userPack.friends = [];
    }
    let alreadyFriend = false;
    let alreadyFriendRequestSend = false;

    if (!Array.isArray(userPack.requestsSend)) {
      userPack.requestsSend = [];

    }


    for (let i = 0; i < userPack.friends.length; i++) {
      if (JSON.stringify(userPack.friends[i]) == JSON.stringify(requestUserPack._id)) {
        alreadyFriend = true;
        break;
      }
    }

    if (alreadyFriend) {
      res.status(200).send({
        message: "Already A Friend",
        status: 200
      });
    }



    if (!alreadyFriend) {
      for (let i = 0; i < userPack.requestsSend.length; i++) {
        if (JSON.stringify(userPack.requestsSend[i]) == JSON.stringify(requestUserPack._id)) {

          alreadyFriendRequestSend = true;
          break;
        }
      }

    }


    if (alreadyFriendRequestSend) {
      res.status(200).send({
        message: "Already A Friend Request Send",
        status: 200
      });
    }


    if (!alreadyFriend && !alreadyFriendRequestSend) {
      if (!Array.isArray(requestUserPack.notificationRequest)) {
        requestUserPack.notificationRequest = [];
      }
      userPack.requestsSend.push(requestUserPack._id);
      requestUserPack.notificationRequest.push(userPack._id);
      await userPack.save();
      await requestUserPack.save();
      res.status(200).send({
        message: "Request Send",
        status: 200
      });
    }

  }

}); */

router.post("/friend/findIfFriend", async (req, res) => {
  // let requestUserPack = await UserPacks.findById( req.body.requestId );
  let requestId = req.body.requestId;
  let userPack = await UserPacks.findById(req.body.id);
  let alreadyFriend = false;
  let alreadyFriendRequestSend = false;
  let sameUser = false
  if (userPack) {
    if (JSON.stringify(requestId) == JSON.stringify(userPack._id)) {
      sameUser = true;
      res.status(500).send({
        message: "Same User",
        status: 500
      });
    }
    console.log(requestId);
    console.log(userPack._id);
    if (userPack && !sameUser) {
      if (!Array.isArray(userPack.friends)) {
        userPack.friends = [];
      }


      if (!Array.isArray(userPack.requestsSend)) {
        userPack.requestsSend = [];

      }
      if (!Array.isArray(userPack.notificationRequest)) {
        userPack.notificationRequest = [];

      }
      for (let i = 0; i < userPack.notificationRequest.length; i++) {
        if (JSON.stringify(userPack.notificationRequest[i]) == JSON.stringify(requestId)) {
          alreadyFriend = true;
          break;
        }
      }

      for (let i = 0; i < userPack.friends.length; i++) {
        if (JSON.stringify(userPack.friends[i]) == JSON.stringify(requestId)) {
          alreadyFriend = true;
          break;
        }
      }

      if (alreadyFriend && !sameUser) {
        res.status(400).send({
          message: "Already A Friend",
          status: 400
        });
      }



      if (!alreadyFriend && !sameUser) {
        for (let i = 0; i < userPack.requestsSend.length; i++) {
          if (JSON.stringify(userPack.requestsSend[i]) == JSON.stringify(requestId)) {

            alreadyFriendRequestSend = true;
            break;
          }
        }

      }


      if (alreadyFriendRequestSend && !sameUser) {
        res.status(300).send({
          message: "Already A Friend Request Send",
          status: 300
        });
      }


      if (!alreadyFriend && !alreadyFriendRequestSend && !sameUser) {

        res.status(200).send({
          message: "Can Send Request",
          status: 200
        });
      }



    }
  }
  else {
    res.status(600).send({
      message: "User Not Found",
      status: 600
    });
  }

});

router.post("/users/addName", async (req, res) => {

  let user = await User.findOne({ deviceId: req.body.deviceId });

  if (user) {

    user.name = req.body.name;
    await user.save();
    res.status(200).send({
      message: user,
      status: 200

    });
  }

});

/* router.get("/basic/getStaticData", async (req, res) => {
  let d =
  {
    armorData: armorStaticData,
    weaponsdata: weaponsStaticData,
    bagPackdata: bagpackStaticData,
    ammosdata: ammosStaticData,
    xpData: xpStaticData
  }

  res.status(200).send({
    message: d,
  });
}); */

router.post("/users/saveAntiCheatId", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    user.antiCheatId = req.body.antiCheatId;
    await user.save();
    res.status(200).send({
      message: "AntiCheatId saved"
    });

  }
  else {
    res.status(400).send({
      message: "User not found"
    });

  }

});

router.post("/users/epicLogin", async (req, res) => {
  let auth = req.headers.authorization;
  var stringArray = auth.split(" ");
  let user = await User.findById(stringArray[1]);
  if (user) {
    console.log("USER  FOUND" + user.userPackId + "   " + user.name);
    res.status(200).send({
      account: user.userPackId,
      name: user.name
    });
  }
  else {
    console.log("USER NOT FOUND");

  }

});

router.post("/users/updateLevel", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    user.playerStat.playerLevel = req.body.level;
    user.markModified("playerStat");
    res.status(200).send({
      message: user.playerStat,
      status: 200,

    });
    await user.save();
  }
});
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/users/register", async (req, res) => {

  let user = await User.findOne({ deviceId: req.body.deviceId });

  if (user) {
    user.deviceId = req.body.deviceId;

    await user.save();

    res.status(200).send({
      message: user,
      status: 200

    });
  } else {
    let user = new User();
    let userPack = new UserPacks();

    let count = await User.find({ deviceId: { "$exists": true } }).count();

    user.accountId = count + 100000;
    user.userPackId = userPack._id;
    userPack.userId = user._id;
    let d = {
      playerLevel: 0,
      strength: 0,
      endurance: 0,
      vitality: 0,
      intelligence: 0,
      gunMastery: 0,
      gunMarksmanship: 0,
      gunHandling: 0,
      craftsmanship: 0,
      knifeMastery: 0


    }
    let d1 = {
      water: 0,
      fire: 0,
      air: 0,
      heat: 0
    }
    user.playerStat = d;
    user.resources = d1;
    // const secret = config.secret;
    // save user token
    // user.token = secret;
    user.deviceId = req.body.deviceId;
    await user.save();
    await userPack.save();
    res.status(200).send({
      message: user,
      status: 200,

    });
  }
});

/**
 * @swagger
 * /users/updateResource:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/users/updateResource", async (req, res) => {

  let user = await User.findOne({ accountId: req.body.id });

  if (user) {

    let d1 = {
      water: 0,
      fire: 0,
      air: 0,
      heat: 0
    }

    user.resources = d1;
    await user.save();

    res.status(200).send({
      message: user,
      status: 200

    });
  } else {



  }
});


/**
 * @swagger
 * /users/updateResource:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/users/updateDefaultHouse", async (req, res) => {

   let user = await User.findById(req.body.id);

  if(user)
  {

    user.defaultHouse=req.body.defaultHouse;
    await user.save();

    res.status(200).send({
      message: user.defaultHouse,
      status: 200

    });
  } 
 
});

router.post("/squad/getSquadDataByUser", async (req, res) => {
  console.log(req.body);
  let user = await User.findById(req.body.id);
  if (user) {
    if (user.squadJoin.length > 0) {
      let squad = await Squad.findById(user.squadJoin);
      if (squad) {

        res.status(200).send({
          squad: squad,
          status: 200
        });
      }
      else {
        res.status(400).send({

          status: 400
        });
      }
    }
    else {
      res.status(400).send({

        status: 400
      });
    }
  }
});

router.post("/squad/getSquadData", async (req, res) => {
  let squad = await Squad.findById(req.body.id);
  if (squad) {

    res.status(200).send({
      squad: squad,
      status: 200
    });
  }
  else {
    res.status(400).send({

      status: 400
    });
  }
});
/**
 * @swagger
 * /user/deleteAllSquads:
 *   post:
 *     summary: Delete all squads of user
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserById'
 *            
 *     responses:
 *       200:
 *         description: 
 *         contens:
 *           application/json:
 *            
 *       400:
 *         description: User of that id not found
 */
router.post("/user/deleteAllSquads", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    if (!Array.isArray(user.squads)) {
      user.squads = [];
    }
    for (let i = 0; i < user.squads.length; i++) {
      user.squads.pop();
    }
    user.squadJoin = "";

    await user.save();
    res.status(200).send({
      message: user.squads,
      status: 200
    });
  }
});

router.post("/user/userSquads", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    if (!Array.isArray(user.squads)) {
      user.squads = [];
    }
    res.status(200).send({
      message: user.squads,
      status: 200
    });
  }
});

router.get("/match/remove", async (req, res) => {
  await Match.remove();
  await SquadMatch.remove();
  await Squad.remove();
  let user = await User.find({ deviceId: { "$exists": true } });
  console.log(user.length + "   all users deleted")
  for (let i = 0; i < user.length; i++) {
    user[i].squadJoin = "";
    user[i].matchId = "";
    user[i].team = 0;
    user[i].callRequest = null;
    while (user[i].squads.length > 0) {
      user[i].squads.pop();
    }
    await user[i].save();
  }

});

router.get("/eden/remove", async (req, res) => {
  await Dome.remove();

  let user = await User.find({ deviceId: { "$exists": true } });
  console.log(user.length + "   domesREMOVE")
  for (let i = 0; i < user.length; i++) {

    user[i].joinedDome = 0;

    while (user[i].recievedPasses.length > 0) {
      user[i].recievedPasses.pop();
    }
    while (user[i].houses.length > 0) {
      user[i].houses.pop();
    }
    while (user[i].requestPasses.length > 0) {
      user[i].requestPasses.pop();
    }
    await user[i].save();
  }

});


async function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  return today;
}


module.exports = router;
