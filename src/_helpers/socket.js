const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const db = require("./db");

const user = require("../routers/user");
const squad = require("../sockets/squad.service");
const inventory = require("../sockets/inventory.service");
const dome = require("../sockets/dome.service");
const friend = require("../sockets/friends.service");
const task = require("../sockets/tasks.service");
const { urlencoded } = require("express");
const { SquadMatch } = require("./db");
var constants = require("./constants");

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
      console.log(" On Network" + socket.id + "   " + isRevoked);
      let user = await User.findById(isRevoked);
      console.log(user + " found now");
      user.socket_id = socket.id;
      user.is_online = 1;

      //check if there is any resumable game going on
      const currentMatch = user.matchId;
      if (currentMatch.length > 0) {
        const matchInfo = await SquadMatch.findById(currentMatch);
        if (matchInfo && matchInfo.end != 1) {
          socket.emit(constants.RESUMEGAME, {
            matchId: user.matchId,
            team: user.team,
            code: matchInfo.code,
          });
          for (let i = 0; i < matchInfo.members.length; i++) {
            io.to(matchInfo.members[i].squadId).emit(constants.EVENTHAPPEN, {
              matchId: user.matchId,
              players: matchInfo.currentMembers.length,
            });
          }
        } else if (matchInfo && matchInfo.end === 1) {
          user.matchId = "";
          user.team = 0;
        }
      }

      await user.save();

      socket.join(isRevoked);
      socket.emit("UPDATEDUSER", { status: 200, message: user });
      await sendStatusOfFriend(user, 1, socket);
      console.log(" USER " + user);
    } catch (err) {
      console.log("errrr " + err);
      socket.emit("UnAuthorized", {
        response: "User not authorized",
      });
    }

    async function sendStatusOfFriend(user, online, socket) {
      if (!Array.isArray(user.friends)) {
        user.friends = [];
      }
      for (let i = 0; i < user.friends.length; i++) {
        let u = await User.findById(user.friends[i].id);

        /*  if(u!=null && u.socket_id!==null)
        {
        socket.broadcast.to(u.socket_id).emit(constants.FRIENDSTATUS, {
          status: 200,
          id: user._id,
          online: online

        }); 
      }*/
      }
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

    socket.on(constants.READYFORGAME, async (obj, cb) => {
      await squad.readyForGame(io, obj, cb, socket);
    });
    socket.on(constants.NOTREADYFORGAME, async (obj, cb) => {
      await squad.notReadyForGame(io, obj, cb, socket);
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
    socket.on(constants.UPDATEINVENTORY, async (obj, cb) => {
      await inventory.updateUserInventory(obj, cb);
    });
    socket.on(constants.UPDATEINSURANCE, async (obj, cb) => {
      await inventory.updateUserInsuranceItems(obj, cb);
    });
    socket.on(constants.ADDUSERITEMINVENTORY, async (obj, cb) => {
      await inventory.addItemUserInventory(obj, cb);
    });
    socket.on(constants.UPDATELOADOUT, async (obj, cb) => {
      await inventory.updateUserLoadOut(obj, cb);
    });
    socket.on(constants.DELETEITEMINVENTORY, async (obj, cb) => {
      await inventory.deleteItemInInventory(obj, cb);
    });

    socket.on(constants.SETCURRENTMATCH, async (obj, cb) => {
      await squad.setCurrentMatch(socket, obj, cb, io);
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

    socket.on(constants.UNFRIEND, async (obj, cb) => {
      await friend.unFriend(obj, cb, socket, io);
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

    socket.on(constants.DISPLAY_TASK, async (obj, cb) => {
      await task.fetchAvailableTasks(socket, obj, cb, io);
    });
    
    socket.on(constants.ACCEPT_TASK, async (obj, cb) => {
      await task.acceptTask(socket,obj, cb, io);
    });

    async function playerOffline(socket) {
      console.log(socket + " offline");
      let user = await User.findOne({ socket_id: socket });

      if (user) {
        await sendStatusOfFriend(user, 0, socket);
        // user.code = "";
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
              io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                house: dome.houses[user.houseVisited - 1],
                dome: user.joinedDome,
              });
            }
            let index = dome.members.findIndex((item) => item == user._id);
            dome.members.splice(index, 1);
            user.joinedDome = 0;
            await user.save();
            await dome.save();
          }
        }

        user.houseVisited = -1;

        /*i f (user.matchId.length > 0) {
          if (user.team != 0) {


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

        } */

        await user.save();
      }
    }

    socket.on("disconnect", function (reason) {
      console.log(" has disconnected from the chat." + socket.id);
      console.log(" has disconnected from the chat because : " + reason);
      playerOffline(socket.id);
      //  userService.setOfflineUsers(socket, all_users);
      delete all_users[socket.id];
    });
  });
};
