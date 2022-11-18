const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const db = require("./db");

const user = require("../routers/user");
const squad = require("../models/squad.service");
const inventory = require("../models/inventory.service");
const dome = require("../models/dome.service");
const friend = require("../models/friends.service");
const { urlencoded } = require("express");
const { SquadMatch } = require("./db");

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









    socket.on("CREATESQUAD", async (obj, cb) => {
      //console.log({ obj });
      await squad.createSquad(io, obj, cb, socket);
    });

    socket.on("SQUADJOIN", async (obj, cb) => {
      //console.log({ obj });
      await squad.joinSquad(io, obj, cb, socket);
    });

    socket.on("JOINFRIENDSROOM", async (obj, cb) => {
      //console.log({ obj });
      await squad.joinFriendsRoom(io, obj, cb, socket);
    });
    socket.on("SENDCODEOFROOM", async (obj, cb) => {
      //console.log({ obj });
      await squad.GetRoomCode(io, obj, cb, socket);
    });


    socket.on("SQUADLEAVE", async (obj, cb) => {
      //console.log({ obj });
      await squad.leaveSquad(io, obj, cb, socket);
    });


    socket.on("SQUADSTART", async (obj, cb) => {
      //console.log({ obj });
      await squad.readyForGame(io, obj, cb, socket);
    });

    socket.on("STARTGAMENOW", async (obj, cb) => {
      //console.log({ obj });
      await squad.startSquadGameNew(io, obj, cb, socket);
    });

    socket.on("UPDATEPOINTS", async (obj, cb) => {
      //console.log({ obj });
      await squad.updatePoints(io, obj, cb, socket);
    });
    socket.on("ADDEVENTDATA", async (obj, cb) => {
      //console.log({ obj });
      await squad.addEventData(io, obj,socket);
    });

    socket.on("ADDZONE", async (obj, cb) => {
      //console.log({ obj });
      await squad.addZone(obj);
    });

    socket.on("GETINVENTORY", async (obj, cb) => {

      await inventory.getInevntory(obj, cb);
    });

    socket.on("SETLOADOUT", async (obj, cb) => {

      await inventory.setLoadOut(obj, cb);
    });
    socket.on("ADDITEMINVENTORY", async (obj, cb) => {

      await inventory.addItemInInventory(obj, cb);
    });
    socket.on("DELETEITEMINVENTORY", async (obj, cb) => {

      await inventory.deleteItemInInventory(obj, cb);
    });
    socket.on("SETCURRENTMATCH", async (obj, cb) => {

      await squad.setCurrentMatch(obj, cb);
    });


    socket.on("GETHOUSESOFUSER", async (obj, cb) => {

      await dome.getHousesOfUser(obj, cb);
    });

    socket.on("GETTOTALDOMES", async (obj, cb) => {

      await dome.getTotalDomesCOunt(obj, cb);
    });


    socket.on("GETDOMEBYNUMBER", async (obj, cb) => {

      await dome.getDomeByNumber(obj, cb);
    });


    socket.on("GETUNSOLDHOUSE", async (obj, cb) => {

      await dome.getUnsoldHouse(obj, cb);
    });
    socket.on("BUYHOUSE", async (obj, cb) => {

      await dome.buyHouse(obj, cb,socket,io);
    });

    socket.on("JOINDOME", async (obj, cb) => {

      await dome.joinDome(obj, cb,socket,io);
    });
    socket.on("SEEHOUSE", async (obj, cb) => {

      await dome.seeHouse(obj, cb,socket,io);
    });
    socket.on("LEAVEDOME", async (obj, cb) => {

      await dome.leaveDome(obj, cb);
    });
    socket.on("REQUESTPASS", async (obj, cb) => {

      await dome.getnewRequestPass(obj, cb);
    });
    socket.on("RECIEVEDPASS", async (obj, cb) => {

      await dome.getnewRecievedPass(obj, cb);
    });
    socket.on("RECIVEDPASSESLIST", async (obj, cb) => {

      await dome.getListOfRecievedPasses(obj, cb);
    });
    socket.on("REQUESTPASSESLIST", async (obj, cb) => {

      await dome.getListOfRequestedPasses(obj, cb);
    });
    socket.on("USEPASS", async (obj, cb) => {

      await dome.usePass(obj, cb);
    });
    socket.on("DECISIONPASS", async (obj, cb) => {

      await dome.decisionPass(obj, cb);
    });

    socket.on("ACCEPTCALLREQUEST", async (obj, cb) => {

      await dome.acceptCallRequest(obj, cb,socket,io);
    });

    socket.on("REJECTCALLREQUEST", async (obj, cb) => {

      await dome.cancelCallRequest(obj, cb,socket,io);
    });

    socket.on("SENDCALLREQUEST", async (obj, cb) => {

      await dome.sendCallRequest(obj, cb,socket,io);
    });
    socket.on("CUTCALL", async (obj, cb) => {

      await dome.cutCall(obj, cb,socket,io);
    });

    socket.on("SENDFRIENDREQUEST", async (obj, cb) => {

      await friend.sendRequest(obj, cb,socket,io);
    });

    socket.on("ACCEPTFRIENDREQUEST", async (obj, cb) => {

      await friend.acceptRequest(obj, cb,socket,io);
    });

    socket.on("UPDATEPLAYERSTAT", async (obj, cb) => {

      console.log("updtae player stats ")
      await squad.updatePlayerStats(obj, cb,socket,io);
    });


    socket.on("REJECTFRIENDREQUEST", async (obj, cb) => {

      await friend.rejectRequest(obj, cb,socket,io);
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
          if(user.houseVisited>0)
          {
            dome.houses[user.houseVisited-1].inHouse=0;
            dome.houses[user.houseVisited-1].onCall=0;
            dome.markModified("houses");
            io.to("DOME" + user.joinedDome).emit("DOMESTATUS", {
              house: dome.houses[user.houseVisited-1],
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

        user.houseVisited = -1;
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
