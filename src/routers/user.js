const express = require("express");
const db = require("../_helpers/db");
const router = express.Router();
//const { customAlphabet } = require('nanoid');
//const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
const { sendVerificationMail } = require("../email/mail");
const userPacks = require("../models/userpacks.service");
const validator = require("validator");
const { ResumeToken } = require("mongodb");
const User = db.User;
const UserPacks = db.UserPacks;
const Match = db.Match;
const Squad = db.Squad;
const SquadMatch = db.SquadMatch;
const EpicLogin = db.EpicLogin;
const Dome = db.Dome;


const Verification = require("../models/verification.modal");

const weaponsStaticData = require("../models/weapons");
const armorStaticData = require("../models/armor");
const bagpackStaticData = require("../models/bagPack");
const ammosStaticData = require("../models/ammos");
const xpStaticData = require("../models/xp");

//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
//var config = require('../config');
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

router.get("/basic/currentTime", async (req, res) => {
  let cur = Math.floor(new Date().getTime() / 1000);
  res.status(200).send({
    message: cur,
  });

});

router.post("/basic/getUserPackById", async (req, res) => {
  let user = await UserPacks.findById(req.body.id);
  if (user) {
    res.status(200).send({
      message: user,
      status: 200
    });
  }

});

router.post("/basic/getUserByUserPackId", async (req, res) => {
  let user = await User.findOne({ userPackId: req.body.id });
  if (user) {
    let d = {
      _id: user._id,
      name: user.name,
      avatar:user.avatar,
      is_online:user.is_online,
      userPackId:user.userPackId

    }
    res.status(200).send({
      message: d,
      status: 200
    });
  }

});

router.post("/basic/getUserById", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    let d = {
      _id: user._id,
      name: user.name,
      avatar:user.avatar,
      is_online:user.is_online,
      userPackId:user.userPackId

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
      avatar:user.avatar,
      is_online:user.is_online,
      userPackId:user.userPackId

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

router.post("/friend/acceptRequest", async (req, res) => {
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

});

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

router.get("/basic/getStaticData", async (req, res) => {
  let d =
  {
    armorData: armorStaticData,
    weaponsdata: weaponsStaticData,
    bagPackdata: bagpackStaticData,
    ammosdata: ammosStaticData,
    xpData:xpStaticData
  }

  res.status(200).send({
    message: d,
  });
});

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

router.post("/user/deleteAllSquads", async (req, res) => {
  let user = await User.findById(req.body.id);
  if (user) {
    if (!Array.isArray(user.squads)) {
      user.squads = [];
    }
    for (let i = 0;  i < user.squads.length; i++) {
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
  console.log(user.length + "   user")
  for (let i = 0; i < user.length; i++) {
    user[i].squadJoin = "";
    user[i].matchId = "";
    user[i].team = 0;

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
