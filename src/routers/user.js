const express = require("express");
const db = require("../_helpers/db");
const router = express.Router();
//const { customAlphabet } = require('nanoid');
//const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
const { sendVerificationMail } = require("../email/mail");
const validator = require("validator");
const { ResumeToken } = require("mongodb");
const User = db.User;
//const UserPacks = db.UserPacks;
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
// const ApiResponse = require("../_helpers/ApiResponse");
const { apiResponse } = require("../_helpers/ApiResponse");

const NpcStatic = db.NpcStatic;
const WeaponStatic = db.WeaponStatic;
const ArmorStatic = db.ArmorStatic;
const AmmosStatic = db.AmmosStatic;
const BagPackStatic = db.BagPackStatic;
const TaskStatic = db.TaskStatic;
const AttributeStatic = db.AttributeStatic;
const Server = db.Server;

const adminPanel = require("../adminPanel/adminPanel");
const { request } = require("express");
const { updateTotalRaidsData } = require("../sockets/playerStatsDataUpdator");
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var crypto = require('crypto'); 
//var config = require('../config');

//temporary
let paginatedData = {};
let linksData = {};


   
 // Method to check the entered password is correct or not 
 async function validPassword(password,user) { 
     var hash = crypto.pbkdf2Sync(password,  
     user.salt, 1000, 64, `sha512`).toString(`hex`); 
     return this.hash === hash; 
 }; 

/**
 * @swagger
 * /user/login/{userName}/{password}:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: userName
 *       - in: path
 *         name: password
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
router.post("/user/login/:userName/:password", async (req, res) => {
  let response;

  try {
   
    let user;
    if (req.params.userName && req.params.userName !== "") {
      user = await User.findOne({ email: req.params.userName });
    }
    if (user == null) {
      user = await User.findOne({ userName: req.params.userName });
    }
    if (!user) {
      let errors = [];
      errors.push(constants.USER_NOT_FOUND);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_MULTIPLE_CHOICES,
        null,
        errors,
        { error: errors },
        null,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
     
     // let pass =  await bcrypt.hash( req.params.password)
    
      const isMatch =   await validPassword(req.params.password,user);

      console.log(isMatch)
      if (!isMatch) {
        let errors = []
        errors.push(constants.PASSWORDS_NOT_MATCHED);
        response = apiResponse(
          res,
          true,
          constants.STATUS_CODE_MULTIPLE_CHOICES,
          null,
          errors,
          { error: errors },
          null,
          paginatedData,
          linksData
        );
        res.send(response);
      } else {
        console.log("password  " + req.params.password);
        response = apiResponse(
          res,
          true,
          constants.STATUS_CODE_OK,
          constants.USER_CREATED,
          null,
          user,
          paginatedData,
          linksData
        );
        res.send(response);
      }
    }
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /user/forgetPassword/{email}:
 *   post:
 *     summary: Forget password
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: email
 *     responses:
 *       200:
 *         description: User Details
 *         contens:
 *           application/json:
 *
 *       400:
 *         description: User of that id not found
 */
router.post("/user/forgetPassword/:email", async (req, res) => {
  let response;

  try {
    let user;
    if (req.params.email && req.params.email !== "") {
      user = await User.findOne({ email: req.params.email });
    }

    if (user) {
      let otp = Math.random().toString().substr(2, 6);
      user.otp.otp = otp;
      user.otp.expiredAt = Date.now() + 100000;
      await user.save();
      let d = {};
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        null,
        null,
        d,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      let errors = [];
      errors.push(constants.DATA_NOT_FOUND);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_CREATED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /user/newPassword/{email}/{password}:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: email
 *       - in: path
 *         name: password
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
router.post("/user/newPassword/:email/:password", async (req, res) => {
  let response;

  try {
    let user;
    if (req.params.email && req.params.email !== "") {
      user = await User.findOne({ email: req.params.email });
    }
    if (user) {
      user.salt = crypto.randomBytes(16).toString('hex'); 
      user.hash = crypto.pbkdf2Sync(req.params.password, user.salt,  
      1000, 64, `sha512`).toString(`hex`); 
       
      let d = {};
      await user.save();
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        null,
        null,
        d,
        paginatedData,
        linksData
      );

      res.send(response);
    } else {
      let errors = [];
      errors.push(constants.DATA_NOT_FOUND);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_CREATED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /user/checkOtp/{email}/{otp}:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: email
 *       - in: path
 *         name: otp
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
router.post("/user/checkOtp/:email/:otp", async (req, res) => {
  let response;

  try {
    let user;
    if (req.params.email && req.params.email !== "") {
      user = await User.findOne({ email: req.params.email });
    }

    if (user) {
      if (user.otp.otp === req.params.otp && user.otp.expiredAt <= Date.Now) {
        let d = {};
        await user.save();
        response = apiResponse(
          res,
          true,
          constants.STATUS_CODE_OK,
          null,
          null,
          d,
          paginatedData,
          linksData
        );
      } else {
        let errors = [];
        errors.push(constants.DATA_NOT_FOUND);
        response = apiResponse(
          res,
          true,
          constants.STATUS_CODE_NOT_FOUND,
          null,
          errors,
          { error: errors },
          null,
          paginatedData,
          linksData
        );
      }

      res.send(response);
    } else {
      let errors = [];
      errors.push(constants.DATA_NOT_FOUND);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_CREATED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /user/signUp/{email}/{userName}/{password}:
 *   post:
 *     summary: Create new user
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: email
 *       - in: path
 *         name: userName
 *       - in: path
 *         name: password
 *
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
router.post("/user/signUp/:email/:userName/:password", async (req, res) => {
  let response;

  try {
    let errors = []
    let user;
    if (req.params.email && req.params.email !== "") {
      user = await User.findOne({ email: req.params.email });
    }
    if (req.params.userName && req.params.userName !== "") {   
      user = await User.findOne({ userName: req.params.userName });
      if(user)
      {
        errors.push(constants.USERNAME_NOT_AVAILABLE);
      }
    }
    if (user) {  
      errors.push(constants.USER_EXISTS);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_MULTIPLE_CHOICES,
        null,
        errors,
        { error: errors },
        null,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      let user = new User();

      user.email = req.params.email;     
      user.userName = req.params.userName;
      console.log("salt  "+crypto.randomBytes(16).toString('hex'));
      let s = crypto.randomBytes(16).toString('hex'); 
      
      user.salt = crypto.randomBytes(16).toString('hex'); 
    
     user.hash = crypto.pbkdf2Sync(req.params.password, user.salt,  
     1000, 64, `sha512`).toString(`hex`); 
      
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
        knifeMastery: 0,
      };
      let d1 = {
        water: 0,
        fire: 0,
        air: 0,
        heat: 0,
      };
      user.playerStat = d;
      user.resources = d1;

      await user.save();

      console.log("password  " + req.params.password);
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.USER_CREATED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /user/getUsers/{userName}/{page}:
 *   get:
 *     summary: Create new user
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: userName
 *       - in: path
 *         name: page
 *
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
router.get("/user/getUsers/:userName/:page", async (req, res) => {
  let response;

  try {
    console.log(req.params.userName);
    let user;
    if (req.params.userName && req.params.userName !== "") {
      let regexValue = req.params.userName;
      user = await User.find(
        { name: new RegExp(regexValue, "i") },
        { matchId: 1, name: 1, avatar: 1, is_online: 1 }
      )
        .skip(req.params.page * 10)
        .limit(10);
    }
    console.log(user);
    response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      null,
      null,
      user,
      paginatedData,
      linksData
    );
    res.send(response);
  } catch (error) {
    console.log(error.message);
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * /friend/requestList/{id}/{page}:
 *   post:
 *     summary: Create new user
 *     tags: [FRIEND]
 *     parameters:
 *       - in: path
 *         name: id
 *
 *       - in: path
 *         name: page
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
router.post("/friend/requestList/:id/:page", async (req, res) => {
  let response;
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      if (!Array.isArray(user.requestsSend)) {
        user.requestsSend = [];
      }
      let friends = [];
      for (let i = req.params.page * 10; i < (req.params.page * 10) + 10; i++) {
        if (user.requestsSend.length > i) {
          let data = await User.findById(user.requestsSend[i], { "matchId": 1, "name": 1, "avatar": 1, "is_online": 1 });
          friends.push(data);
        }
      }
      const data = friends;
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /friend/friendsList/{userName}/{id}/{page}/{ra}/{online}:
 *   post:
 *     summary: Create new user
 *     tags: [FRIEND]
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: path
 *         name: page
 *       - in: path
 *         name: ra
 *       - in: path
 *         name: online
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
router.post("/friend/friendsList/:id/:page/:ra/:online", async (req, res) => {
  let response;

  try {
    let user = await User.findById(req.params.id);
    if (user) {
      if (!Array.isArray(user.friends)) {
        user.friends = [];
      }
      let friends = [];
      for (let i = req.params.page * 10; i < (req.params.page * 10) + 10; i++) {
        if (user.friends.length > i) {
          console.log("FRIENDS  "+req.params.page);
          let data = await User.findById(user.friends[i].id, { "matchId": 1, "name": 1, "avatar": 1, "is_online": 1 });
          if (req.params.online == 1) {
            if (data.is_online == 1) {
              friends.push(data);
            }
          }
          else if (req.params.ra == 1) {
            if (Date.Now() - user.friends[i].time <= 10000) {
              friends.push(data);
            }
          }
          /* if (req.params.userName.length > 0) {
            if (data.userName.includes(req.params.userName)) {

            }
          } */
          else
           {
            friends.push(data);
          }
        }
      }
      const data = friends;
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /friend/notificationList/{id}/{page}:
 *   post:
 *     summary: Create new user
 *     tags: [FRIEND]
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: path
 *         name: page
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
router.post("/friend/notificationList/:id/:page", async (req, res) => {
  let response;

  try {
    let user = await User.findById(req.params.id);
    if (user) {
      if (!Array.isArray(user.notificationRequest)) {
        user.notificationRequest = [];
      } let friends = [];
      for (let i = req.params.page * 10; i < (req.params.page * 10) + 10; i++) {
        if (user.notificationRequest.length > i) {
          let data = await User.findById(user.notificationRequest[i], { "matchId": 1, "name": 1, "avatar": 1, "is_online": 1 });
          friends.push(data);
        }
      }
      const data = friends;
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/**
 * @swagger
 * /friend/findIfFriend/{id}/{requestId}:
 *   post:
 *     summary: Create new user
 *     tags: [FRIEND]
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: path
 *         name: requestId
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
router.post("/friend/findIfFriend/:id/:requestId", async (req, res) => {
  let response;
  try {
    let requestId = req.params.requestId;
    let userPack = await User.findById(req.params.id);
    let alreadyFriend = false;
    let alreadyFriendRequestSend = false;
    let sameUser = false;
    if (userPack) {
      if (JSON.stringify(requestId) == JSON.stringify(userPack._id)) {
        sameUser = true;
        response = apiResponse(
          res,
          false,
          constants.STATUS_CODE_BAD_REQUEST,
          constants.SAME_USER,
          null,
          {},
          paginatedData,
          linksData
        );
        res.send(response);
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
          if (
            JSON.stringify(userPack.notificationRequest[i]) ==
            JSON.stringify(requestId)
          ) {
            alreadyFriend = true;
            break;
          }
        }

        for (let i = 0; i < userPack.friends.length; i++) {
          if (
            JSON.stringify(userPack.friends[i]) == JSON.stringify(requestId)
          ) {
            alreadyFriend = true;
            break;
          }
        }

        if (alreadyFriend && !sameUser) {
          response = apiResponse(
            res,
            false,
            constants.STATUS_CODE_BAD_REQUEST,
            constants.ALREADY_FRIEND,
            null,
            {},
            paginatedData,
            linksData
          );
          res.send(response);
        }

        if (!alreadyFriend && !sameUser) {
          for (let i = 0; i < userPack.requestsSend.length; i++) {
            if (
              JSON.stringify(userPack.requestsSend[i]) ==
              JSON.stringify(requestId)
            ) {
              alreadyFriendRequestSend = true;
              break;
            }
          }
        }

        if (alreadyFriendRequestSend && !sameUser) {
          response = apiResponse(
            res,
            false,
            constants.STATUS_CODE_MULTIPLE_CHOICES,
            constants.ALREADY_REQUEST_SENT,
            null,
            {},
            paginatedData,
            linksData
          );
          res.send(response);
        }

        if (!alreadyFriend && !alreadyFriendRequestSend && !sameUser) {
          let d = {
            message: "can send request",
          };
          response = apiResponse(
            res,
            true,
            constants.STATUS_CODE_OK,
            constants.CAN_SEND_REQUEST,
            null,
            d,
            paginatedData,
            linksData
          );
          res.send(response);
        }
      }
    } else {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_NOT_FOUND,
        constants.DATA_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

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
  let response;

  try {
    let server = await Server.findOne({ country: req.params.country });
    if (server) {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.SERVER_EXISTS,
        null,
        [],
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      let server = new Server();
      server.country = req.params.country;

      let d = {
        port: 7777,
        team: 0,
      };
      let d1 = {
        port: 5555,
        team: 0,
      };
      let d2 = {
        port: 3333,
        team: 0,
      };
      server.servers.push(d);
      server.servers.push(d1);
      server.servers.push(d2);
      await server.save();

      const data = server;

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_CREATED,
        constants.SERVER_CREATED,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

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
 *         id: 63e37750d22d0d0664b8892f
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
router.get("/adminPanel/getAllData/:_id/:category", async (req, res) => {
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
router.get("/adminPanel/getAllData/:category", async (req, res) => {
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
  console.log(req.body + "   " + req.params);
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

  let response;

  let npc = await NpcStatic.find({ name: { $exists: true } });
  let weapons = await WeaponStatic.find({ name: { $exists: true } });
  let ammos = await AmmosStatic.find({ name: { $exists: true } });
  let armor = await ArmorStatic.find({ name: { $exists: true } });
  let bagPack = await BagPackStatic.find({ name: { $exists: true } });
  let task = await TaskStatic.find({ name: { $exists: true } });
  let attributes = await AttributeStatic.find({ name: { $exists: true } });

  let weaponsData = {
    id: 1,
    name: "weapon",
    data: weapons,
  };
  let armorData = {
    id: 2,
    name: "armor",
    data: armor,
  };
  let ammosData = {
    id: 3,
    name: "ammos",
    data: ammos,
  };
  let bagPackData = {
    id: 4,
    name: "bagPack",
    data: bagPack,
  };
  const data = {
    npc: npc,
    weaponsData: weaponsData,
    ammosData: ammosData,
    armorData: armorData,
    bagPackData: bagPackData,
    task: task,
    attributes: attributes,
  };

  response = apiResponse(
    res,
    true,
    constants.STATUS_CODE_OK,
    constants.DATA_FOUND,
    null,
    data,
    paginatedData,
    linksData
  );
  res.send(response);
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
  let response;
  try {
    let user = await User.findById(req.body.id);
    if (user) {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_NOT_FOUND,
        constants.DATA_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: MATCH
 *   description: Endpoints related to match data
 * /match/userPlayingDetails:
 *   post:
 *     summary: Match users playing details
 *     description: Use this endpoint to get info regarding Match users playing details
 *     tags: [MATCH]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User id
 *                 example: "63d78172ca0cd0ba12aae18a"
 *               code:
 *                 type: string
 *                 description: code
 *                 example: "DOME123"
 *
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/match/userPlayingDetails", async (req, res) => {
  let response;
  try {
    let user = await User.findById(req.body.id);
    console.log(user._id);
    user.code = req.body.code;
    await user.save();

    response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      constants.DATA_FOUND,
      null,
      { code: user.code },
      paginatedData,
      linksData
    );
    res.send(response);
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: MATCH
 *   description: Endpoints related to match data
 * /match/userPlaying:
 *   post:
 *     summary: Match users playing
 *     description: Use this endpoint to get info regarding Match users playing
 *     tags: [MATCH]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User id
 *                 example: "63d78172ca0cd0ba12aae18a"
 *               code:
 *                 type: string
 *                 description: code
 *                 example: "DOME123"
 *
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/match/userPlaying", async (req, res) => {
  let response;
  console.log("Player Plays " + req.body.id + "   " + req.body.code + "   ");
  let user = await User.findById(req.body.id);
  console.log("Player Plays MATCH" + user.matchId);
  user.code = req.body.code;
  await user.save();
  response = apiResponse(
    res,
    true,
    constants.STATUS_CODE_OK,
    constants.DATA_FOUND,
    null,
    {},
    paginatedData,
    linksData
  );
  res.send(response);
});

/**
 * @swagger
 * tags:
 *   name: MATCH
 *   description: Endpoints related to match data
 * /match/userQuits:
 *   post:
 *     summary: Match user quits
 *     description: Use this endpoint to get info regarding user quiting a match
 *     tags: [MATCH]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User id
 *                 example: "63d78172ca0cd0ba12aae18a"
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/match/userQuits", async (req, res) => {
  let response;
  try {
    console.log("Player Quits Again " + req.body.id.length);
    if (req.body.id.length > 0) {
      let user = await User.findById(req.body.id);
      if (user) {
        user.code = "";
        await user.save();

        response = apiResponse(
          res,
          true,
          constants.STATUS_CODE_OK,
          constants.DATA_FOUND,
          null,
          {},
          paginatedData,
          linksData
        );
        res.send(response);
      }
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
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
  try {
    let currentTime = Math.floor(new Date().getTime() / 1000);
    const response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      constants.DATA_FOUND,
      null,
      { currentTime },
      paginatedData,
      linksData
    );
    res.send(response);
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
/* 

router.post("/basic/getUserPackById", async (req, res) => {
  let response;

  try {
    let user = await UserPacks.findById(req.body.id);
    if (user) {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.DATA_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

 
router.post("/basic/getUserByUserPackId", async (req, res) => {
  let response;

  try {
    let user = await User.findOne({ userPackId: req.body.id });
    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        is_online: user.is_online,
        userPackId: user.userPackId,
      };

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});
 * /

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
  let response;
  try {
    let user = await User.findById(req.body.id);
    if (user) {
      let data = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        is_online: user.is_online,
      };
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: BASIC
 *   description: Endpoints related to Users friends related data
 * /basic/getUserByAccounId:
 *   post:
 *     summary: Get user by account id
 *     description: Use this endpoint for friend request list by userPackId
 *     tags: [BASIC]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: number
 *                 description: Account id of user
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/basic/getUserByAccounId", async (req, res) => {
  let response;

  try {
    let user = await User.findOne({ accountId: req.body.accountId });
    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        is_online: user.is_online,
      };

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        data,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.DATA_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Endpoints related to Users data
 * /users/addName:
 *   post:
 *     summary: Update name of the user
 *     description: Use this endpoint to update name of the user by deviceId
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 description: The device Id of the user
 *                 example: "63d7804aca0cd0ba12aae151"
 *               name:
 *                 type: string
 *                 description: Name to be updated
 *                 example: "User CK"
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/users/addName", async (req, res) => {
  let response;

  let user = await User.findOne({ deviceId: req.body.deviceId });

  if (user) {
    user.name = req.body.name ? req.body.name : user.name;
    await user.save();

    response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      constants.DATA_UPDATED,
      null,
      user,
      paginatedData,
      linksData
    );
    res.send(response);
  } else {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_NOT_FOUND,
      constants.USER_NOT_FOUND,
      null,
      {},
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Endpoints related to user data
 * /users/saveAntiCheatId:
 *   post:
 *     summary: Save anti-cheat ID for user
 *     description: Use this endpoint to save the anti-cheat ID for the user
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "63e37750d22d0d0664b8892f"
 *               antiCheatId:
 *                 type: string
 *                 description: The anti-cheat ID to be saved for the user
 *                 example: "0"
 *     responses:
 *       200:
 *         description: Anti-cheat ID saved successfully
 *       404:
 *         description: User not found
 *       400:
 *          description: Bad Request
 */
router.post("/users/saveAntiCheatId", async (req, res) => {
  let response;
  let user = await User.findById(req.body.id);
  if (user) {
    user.antiCheatId = req.body.antiCheatId;
    await user.save();
    response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      constants.DATA_UPDATED,
      null,
      user,
      paginatedData,
      linksData
    );
    res.send(response);
  } else {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_NOT_FOUND,
      constants.USER_NOT_FOUND,
      null,
      {},
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

router.post("/users/epicLogin", async (req, res) => {
  let response;
  let auth = req.headers.authorization;
  var stringArray = auth.split(" ");
  console.log("stringArray : ", stringArray);
  let user = await User.findById(stringArray[1]);
  if (user) {
    const data = {
      account: user.userPackId,
      name: user.name,
    };
    response = apiResponse(
      res,
      true,
      constants.STATUS_CODE_OK,
      constants.DATA_FOUND,
      null,
      data,
      paginatedData,
      linksData
    );
    res.send(response);
  } else {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_NOT_FOUND,
      constants.USER_NOT_FOUND,
      null,
      {},
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Endpoints related to users data
 * /users/updateLevel:
 *   post:
 *     summary: Update the level of user by userId
 *     description: Use this endpoint to update the level of user by user ID
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "63d7804aca0cd0ba12aae151"
 *               level:
 *                 type: number
 *                 description: The level to be updated
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully updated the user level
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 */
router.post("/users/updateLevel", async (req, res) => {
  let response;
  try {
    let user = await User.findById(req.body.id);
    if (user) {
      user.playerStat.playerLevel = req.body.level;
      user.markModified("playerStat");

      await user.save();

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        user.playerStat,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
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
  let response;

  try {
    console.log("device iD   " + req.body.deviceId);
    let user = await User.findOne({ deviceId: req.body.deviceId });

    if (user) {
      user.deviceId = req.body.deviceId;

      await user.save();

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.USER_FETCHED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      let user = new User();
      //  let userPack = new UserPacks();

      let count = await User.find({ deviceId: { $exists: true } }).count();

      user.accountId = count + 100000;

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
        knifeMastery: 0,
      };
      let d1 = {
        water: 0,
        fire: 0,
        air: 0,
        heat: 0,
      };
      user.playerStat = d;
      user.resources = d1;
      // const secret = config.secret;
      // save user token
      // user.token = secret;
      user.deviceId = req.body.deviceId;
      await user.save();

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_CREATED,
        constants.USER_CREATED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
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
  let response;
  try {
    let user = await User.findOne({ accountId: req.body.id });

    if (user) {
      let d1 = {
        water: 0,
        fire: 0,
        air: 0,
        heat: 0,
      };

      user.resources = d1;
      await user.save();

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.USER_FETCHED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Endpoints related to squad data
 * /users/updateDefaultHouse:
 *   post:
 *     summary: Update default house by userId
 *     description: Use this endpoint to update default house by userId
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "63d7804aca0cd0ba12aae151"
 *               defaultHouse:
 *                 type: number
 *                 description: The number of the house
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully updated default house
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/users/updateDefaultHouse", async (req, res) => {
  let response;

  try {
    let user = await User.findById(req.body.id);

    if (user) {
      user.defaultHouse = req.body.defaultHouse;
      await user.save();

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.USER_FETCHED,
        null,
        user,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: Squad
 *   description: Endpoints related to squad data
 * /squad/getSquadDataByUser:
 *   post:
 *     summary: Get squad data by user
 *     description: Use this endpoint to get squad data by user ID
 *     tags: [Squad]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "63d7804aca0cd0ba12aae151"
 *     responses:
 *       200:
 *         description: Successfully retrieved squad data
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.post("/squad/getSquadDataByUser", async (req, res) => {
  let response;
  try {
    let user = await User.findById(req.body.id);
    if (user) {
      if (user.squadJoin.length > 0) {
        let squad = await Squad.findById(user.squadJoin);
        if (squad) {
          response = apiResponse(
            res,
            true,
            constants.STATUS_CODE_OK,
            constants.USER_FETCHED,
            null,
            squad,
            paginatedData,
            linksData
          );
          res.send(response);
        } else {
          response = apiResponse(
            res,
            false,
            constants.STATUS_CODE_NOT_FOUND,
            constants.DATA_NOT_FOUND,
            null,
            {},
            paginatedData,
            linksData
          );
          res.send(response);
        }
      } else {
        response = apiResponse(
          res,
          false,
          constants.STATUS_CODE_NOT_FOUND,
          constants.DATA_NOT_FOUND,
          null,
          {},
          paginatedData,
          linksData
        );
        res.send(response);
      }
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_BAD_REQUEST,
        constants.BAD_REQUEST,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * /squad/getSquadData:
 *   post:
 *     summary: Get squad data
 *     description: Use this endpoint to get squad data by ID
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved squad data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 squadData:
 *                   type: object
 *                   description: The squad data
 *       404:
 *         description: Squad not found
 */
router.post("/squad/getSquadData", async (req, res) => {
  let response;
  try {
    let squad = await Squad.findById(req.body.id);
    if (squad) {
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        squad,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.DATA_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
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
  let response;
  try {
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

      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_DELETED,
        null,
        user.squads,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * /user/userSquads:
 *   post:
 *     summary: Get all squads of an user
 *     description: Use this endpoint to fetch all the squads related to an user using user id
 *     tags: [USER]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data Fetched Successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 */
router.post("/user/userSquads", async (req, res) => {
  let response;

  try {
    let user = await User.findById(req.body.id);
    if (user) {
      if (!Array.isArray(user.squads)) {
        user.squads = [];
      }
      response = apiResponse(
        res,
        true,
        constants.STATUS_CODE_OK,
        constants.DATA_FOUND,
        null,
        user.squads,
        paginatedData,
        linksData
      );
      res.send(response);
    } else {
      response = apiResponse(
        res,
        false,
        constants.STATUS_CODE_NOT_FOUND,
        constants.USER_NOT_FOUND,
        null,
        {},
        paginatedData,
        linksData
      );
      res.send(response);
    }
  } catch (error) {
    response = apiResponse(
      res,
      false,
      constants.STATUS_CODE_BAD_REQUEST,
      constants.BAD_REQUEST,
      error.message,
      { error: error.message },
      paginatedData,
      linksData
    );
    res.send(response);
  }
});

/**
 * @swagger
 * tags:
 *   name: Eden
 *   description: Endpoints related to removing from Eden
 * /match/remove:
 *   get:
 *     summary: Remove from match from Eden
 *     description: Use this endpoint to remove match from Eden
 *     tags: [Eden]
 *     responses:
 *       200:
 *         description: Successfully removed match from Eden
 *       400:
 *         description: Bad request
 */
router.get("/match/remove", async (req, res) => {
  await Match.remove();
  await SquadMatch.remove();
  await Squad.remove();
  let user = await User.find({ deviceId: { $exists: true } });
  console.log(user.length + "   all users deleted");
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

/**
 * @swagger
 * tags:
 *   name: Eden
 *   description: Endpoints related to removing from Eden
 * /eden/remove:
 *   get:
 *     summary: Remove from Eden
 *     description: Use this endpoint to remove from Eden
 *     tags: [Eden]
 *     responses:
 *       200:
 *         description: Successfully removed from Eden
 *       400:
 *         description: Bad request
 */
router.get("/eden/remove", async (req, res) => {
  await Dome.remove();

  let user = await User.find({ deviceId: { $exists: true } });
  console.log(user.length + "   domesREMOVE");
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
