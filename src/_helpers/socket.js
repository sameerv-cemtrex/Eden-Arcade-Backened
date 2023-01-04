const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const db = require("./db");

const user = require("../routers/user");
const squad = require("../sockets/squad.service");
const inventory = require("../sockets/inventory.service");
const dome = require("../sockets/dome.service");
const friend = require("../sockets/friends.service");
const { urlencoded } = require("express");
const { SquadMatch } = require("./db");
var constants = require('./constants');



const User = db.User;
const Matches = db.Match;
const Dome = db.Dome;
//const schedule = require('node-schedule');

async function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

module.exports = function (io) {
  console.log("daafvuv" + io);
  let all_users = {};
  io.on("connection", async function (socket) {
    //console.log(
    //   "Connected On Network" + socket.id + "   " + socket.handshake.query.token
    // );
    let secret = "amitscreatingthisprojectToManuplulate";
    let isRevoked = socket.handshake.query.token;
    try {
      // const decoded = jwt.verify(isRevoked.trim(), secret);
      //  all_users[socket.id] = decoded.sub;
      console.log(
        " On Network" + socket.id + "   " + isRevoked
      );
      let user = await User.findById(isRevoked);
      console.log(user + " found now");
      user.socket_id = socket.id;
      user.is_online = 1;
      await user.save();
      socket.emit("UPDATEDUSER", { status: 200, message: user });
      socket.join(isRevoked);
      console.log(" USER " + user);
    } catch (err) {
      console.log("errrr " + err);
      socket.emit("UnAuthorized", {
        response: "User not authorized",
      });
    }


    socket.on(constants.CREATESQUAD, async (obj, cb) => {
      await squad.createSquad(io, obj, cb, socket);
    });

    socket.on(constants.SQUADJOIN, async (obj, cb) => {
      await squad.joinSquad(io, obj, cb, socket);
    });

    socket.on(constants.JOINFRIENDSROOM, async (obj, cb) => {
      await squad.joinFriendsRoom(io, obj, cb, socket);
    });

    socket.on(constants.SENDCODEOFROOM, async (obj, cb) => {
      await squad.GetRoomCode(io, obj, cb, socket);
    });

    socket.on(constants.SQUADLEAVE, async (obj, cb) => {
      await squad.leaveSquad(io, obj, cb, socket);
    });

    socket.on(constants.SQUADSTART, async (obj, cb) => {
      await squad.readyForGame(io, obj, cb, socket);
    });

    socket.on(constants.STARTGAMENOW, async (obj, cb) => {
      await squad.startSquadGameNew(io, obj, cb, socket);
    });

    socket.on(constants.UPDATEPOINTS, async (obj, cb) => {
      await squad.updatePoints(io, obj, cb, socket);
    });

    socket.on(constants.ADDEVENTDATA, async (obj, cb) => {
      await squad.addEventData(io, obj, socket);
    });

    socket.on(constants.ADDZONE, async (obj, cb) => {
      await squad.addZone(obj);
    });

    socket.on(constants.GETINVENTORY, async (obj, cb) => {
      await inventory.getInevntory(obj, cb);
    });

    socket.on(constants.SETLOADOUT, async (obj, cb) => {
      await inventory.setLoadOut(obj, cb);
    });

    socket.on(constants.ADDITEMINVENTORY, async (obj, cb) => {
      await inventory.addItemInInventory(obj, cb);
    });

    socket.on(constants.DELETEITEMINVENTORY, async (obj, cb) => {
      await inventory.deleteItemInInventory(obj, cb);
    });

    socket.on(constants.SETCURRENTMATCH, async (obj, cb) => {
      await squad.setCurrentMatch(obj, cb, io);
    });

    socket.on(constants.GETHOUSESOFUSER, async (obj, cb) => {
      await dome.getHousesOfUser(obj, cb);
    });

    socket.on(constants.GETTOTALDOMES, async (obj, cb) => {
      await dome.getTotalDomesCOunt(obj, cb);
    });


    socket.on(constants.GETDOMEBYNUMBER, async (obj, cb) => {
      await dome.getDomeByNumber(obj, cb);
    });


    socket.on(constants.GETUNSOLDHOUSE, async (obj, cb) => {

      await dome.getUnsoldHouse(obj, cb);
    });

    socket.on(constants.BUYHOUSE, async (obj, cb) => {
      await dome.buyHouse(obj, cb, socket, io);
    });

    socket.on(constants.JOINDOME, async (obj, cb) => {
      await dome.joinDome(obj, cb, socket, io);
    });

    socket.on(constants.SEEHOUSE, async (obj, cb) => {
      await dome.seeHouse(obj, cb, socket, io);
    });

    socket.on(constants.LEAVEDOME, async (obj, cb) => {
      await dome.leaveDome(obj, cb);
    });

    socket.on(constants.REQUESTPASS, async (obj, cb) => {
      await dome.getnewRequestPass(obj, cb);
    });

    socket.on(constants.RECIEVEDPASS, async (obj, cb) => {
      await dome.getnewRecievedPass(obj, cb);
    });

    socket.on(constants.RECIVEDPASSESLIST, async (obj, cb) => {
      await dome.getListOfRecievedPasses(obj, cb);
    });

    socket.on(constants.REQUESTPASSESLIST, async (obj, cb) => {
      await dome.getListOfRequestedPasses(obj, cb);
    });

    socket.on(constants.USEPASS, async (obj, cb) => {
      await dome.usePass(obj, cb);
    });

    socket.on(constants.DECISIONPASS, async (obj, cb) => {
      await dome.decisionPass(obj, cb);
    });

    socket.on(constants.ACCEPTCALLREQUEST, async (obj, cb) => {
      await dome.acceptCallRequest(obj, cb, socket, io);
    });

    socket.on(constants.REJECTCALLREQUEST, async (obj, cb) => {
      await dome.cancelCallRequest(obj, cb, socket, io);
    });

    socket.on(constants.SENDCALLREQUEST, async (obj, cb) => {
      await dome.sendCallRequest(obj, cb, socket, io);
    });

    socket.on(constants.CUTCALL, async (obj, cb) => {
      await dome.cutCall(obj, cb, socket, io);
    });

    socket.on(constants.SENDFRIENDREQUEST, async (obj, cb) => {
      await friend.sendRequest(obj, cb, socket, io);
    });

    socket.on(constants.ACCEPTFRIENDREQUEST, async (obj, cb) => {
      await friend.acceptRequest(obj, cb, socket, io);
    });

    socket.on(constants.UPDATEPLAYERSTAT, async (obj, cb) => {
      await squad.updatePlayerStats(obj, cb, socket, io);
    });


    socket.on(constants.REJECTFRIENDREQUEST, async (obj, cb) => {
      await friend.rejectRequest(obj, cb, socket, io);
    });

    socket.on(constants.ADDLOOT, async (obj, cb) => {
      await squad.addLoot(obj, cb, io);
    });

    socket.on(constants.REMOVELOOT, async (obj, cb) => {
      await squad.removeLoot(obj, cb, io);
    });

    async function playerOffline(socket) {
      console.log(socket + " offline");
      let user = await User.findOne({ socket_id: socket });

      if (user) {
        user.code = "";
        user.socket_id = "";
        user.is_online = 0;

        if (user.joinedDome > 0) {
          let dome = await Dome.findOne({ domeNumber: user.joinedDome });
          if (dome) {
            if (!Array.isArray(dome.members)) {
              dome.members = [];
            }
            if (user.houseVisited > 0) {
              dome.houses[user.houseVisited - 1].inHouse = 0;
              dome.houses[user.houseVisited - 1].onCall = 0;
              dome.markModified("houses");
              io.to("DOME" + user.joinedDome).emit("DOMESTATUS", {
                house: dome.houses[user.houseVisited - 1],
                dome: user.joinedDome
              });
            }
            let index = dome.members.findIndex(item => item == user._id);
            dome.members.splice(index, 1);
            user.joinedDome = 0;
            await user.save();
            await dome.save();
          }
        }
        //  let inventoryToDelete = [];
        user.houseVisited = -1;
        console.log("match id " + user.matchId + "  team    " + user.team)
        if (user.matchId.length > 0) {

          if (user.team != 0) {
            let match = await SquadMatch.findById(user.matchId);
            if (match) {
              if (!Array.isArray(match.currentMembers)) {
                match.currentMembers = [];
              }
              let index = match.currentMembers.findIndex(item => item == user.team);
              match.currentMembers.splice(index, 1);
              user.team = 0;

              for (let i = 0; i < match.members.length; i++) {
                io.to(match.members[i].squadId).emit(constants.EVENTHAPPEN, {
                  matchId: user.matchId,
                  players: match.currentMembers.length
                });
              }
              if (match.currentMembers.length == 0) {
                match.end = 1;
              }


              /*  for (let i = 0; i < user.loadout.length; i++) {
                 if (user.loadout[i].insurance == 0) {
                   let found = 0;
                   for (let j = 0; j < user.inventory.length; j++) {
                     if (user.inventory[j].mainId.length == user.loadout[i].mainId.length
                       && user.inventory[j].id.length == user.loadout[i].id.length) {
                       for (let k = 0; k < user.inventory[j].mainId.length; k++) {
                         if (user.inventory[j].mainId[k] == user.loadout[i].mainId[k]
                           && user.inventory[j].id[k] == user.loadout[i].id[k]) {
                           user.inventory[j].quantity -= 1;
                           console.log("inventory Found " + user.inventory[j].quantity);
                           found = 1;
 
                           user.markModified("inventory");
                           if (user.inventory[j].quantity <= 0) {
                             console.log("inventory To Delete Added " + user.inventory[j].quantity);
                             inventoryToDelete.push(user.inventory[j]);
                           }
 
                           break;
                         }
                       }
                     }
                     if (found == 1) {
                       break;
                     }
                   }
                 }
               }
  */
              // while (user.loadout.length > 0) {
              //  user.loadout.pop();
              // }

              while (user.inventoryInGame.length > 0) {
                user.inventoryInGame.pop();
              }
              await match.save();
            }

          }
          else {
            let match = await Matches.findById(user.matchId);
            if (match) {


              if (!Array.isArray(match.members)) {
                match.members = [];
              }

              match.members = match.members - 1;
              match.roomFull = 0;
              await match.save();
            }
          }

        }

        user.matchId = "";
        // for (let m = 0; m < user.inventory.length; m++) {
        // console.log("LA%TEsdvc  FINAL INVENTORY " + user.inventory[m].quantity);
        // }
        user.markModified("inventory");
        await user.save();
        // for (let m = 0; m < inventoryToDelete.length; m++) {

        //  user.inventory.pull(inventoryToDelete[m]);

        //  }
        await user.save();
      }
    }

    socket.on("disconnect", function () {
      console.log(" has disconnected from the chat." + socket.id);
      playerOffline(socket.id);
      //  userService.setOfflineUsers(socket, all_users);
      delete all_users[socket.id];
      //  console.log(all_users);
    });
  });
};
