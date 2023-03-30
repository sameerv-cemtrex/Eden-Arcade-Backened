
const db = require("../_helpers/db");
const constants = require("../_helpers/constants");
const mongoose = require("mongoose");
const UserPacks = db.UserPacks;
const User = db.User;
const Squad = db.Squad;
const Matches = db.Match;
const SquadMatch = db.SquadMatch;
//const dronesJson = require("../jsons/drones");
//const lootsJsonStealth = require("../jsons/loot");
//const extractionJson = require("../jsons/extraction");
const {
    updateTotalRaidsData,
    updateTotalSurvivedRaidsData,
    killsDataEventHandler,
} = require("./playerStatsDataUpdator");
const spawning = require("./spawning.service");

module.exports = {
    createSquad,
    joinSquad,
    leaveSquad,
    readyForGame,
    startSquadGame,
    joinFriendsRoom,
    GetRoomCode,
    updatePoints,
    startSquadGameNew,
    addEventData,
    addZone,
    setCurrentMatch,
    updatePlayerStats,
    removeLoot,
    addLoot,
    notReadyForGame,


};



//player send this when he/she enters the gamescene.It indicates that player is able to go inside the game without any disconnection 
//issues
async function setCurrentMatch(socket, obj, cb, io) {
    console.log("SETTING CURRENT MATCH ")
    let user = await User.findById(obj.id);
    if (user) {
        user.matchId = obj.matchId;
        let squadMatch = await SquadMatch.findById(obj.matchId);
        if (squadMatch) {
            if (!Array.isArray(squadMatch.currentMembers)) {
                squadMatch.currentMembers = [];
            }
            if (!squadMatch.currentMembers.includes(user._id)) {
                squadMatch.currentMembers.push(user._id);
            }
            for (let i = 0; i < squadMatch.members.length; i++) {
                io.to(squadMatch.members[i].squadId).emit(constants.EVENTHAPPEN, {
                    matchId: obj.matchId,
                    players: squadMatch.currentMembers.length
                });
            }

            /*  if (!Array.isArray(user.loadout)) {
                 user.loadout = [];
             } 
             if (!Array.isArray(user.inventoryInGame)) {
                 user.inventoryInGame = [];
             }
 
              for (let i = 0; i < user.loadout.length; i++) {
                 squadMatch.currentInventoryId += 1;
                 let d =
                 {
                     id: user.loadout[i].id,
                     mainId: user.loadout[i].mainId,
                     realOwner: user._id,
                     currentOwner: user._id,
                     itemId: squadMatch.currentInventoryId
 
                 }
 
                 user.inventoryInGame.push(d);
             } */

            //     let inventoryToDelete = [];
            /*     for (let i = 0; i < user.loadout.length; i++) {
                    //   if (user.loadout[i].insurance == 0) 
                    {
                        let found = 0;
                        for (let j = 0; j < user.inventory.length; j++) {
                            if (user.inventory[j].mainId.length == user.loadout[i].mainId.length
                                && user.inventory[j].id.length == user.loadout[i].id.length) {
                                for (let k = 0; k < user.inventory[j].mainId.length; k++) {
                                    if (user.inventory[j].mainId[k] == user.loadout[i].mainId[k]
                                        && user.inventory[j].id[k] == user.loadout[i].id[k]) {
                                        user.inventory[j].quantity -= 1;
                                        found = 1;
                                        if (user.inventory[j].quantity <= 0) {
                                            console.log("inventoryToDelete added");
                                            inventoryToDelete.push(user.inventory[j]);
    
                                        }
                                        user.markModified("inventory");
                                        break;
                                    }
                                }
                            }
                            if (found == 1) {
                                break;
                            }
                        }
                    }
                } */
            await user.save();
            /*  for (let m = 0; m < inventoryToDelete.length; m++) {
 
                 user.inventory.pull(inventoryToDelete[m]);
 
             }
             await user.save();
             cb({
                 inventoryInGame: user.inventoryInGame,
             }); */
            await squadMatch.save();

        }
    }
}


async function updatePlayerStats(obj, cb, socket, io) {
    let user = await User.findById(obj.id);
    if (user) {
        user.playerStat.strength += obj.stat.strength;
        user.playerStat.endurance += obj.stat.stamina * 0.01;
        user.playerStat.vitality += (obj.stat.vitality.algaeMeal * 0.01) + (obj.stat.vitality.mre * 0.01) +
            (obj.stat.vitality.wastelandBottle * 0.01) + (obj.stat.vitality.edenBottle * 0.01) + (obj.stat.vitality.smallMediKit * 0.25) +
            (obj.stat.vitality.largeMediKit * 0.5) + (obj.stat.vitality.mediumMedikit * 0.35);


        for (let i = 0; i < obj.stat.lootBoxesOpen.length; i++) {
            user.playerStat.intelligence += obj.stat.lootBoxesOpen[i].amount * 0.25;
        }
        for (let i = 0; i < obj.stat.craftItems.length; i++) {
            user.playerStat.intelligence += obj.stat.craftItems[i].amount * 0.005;
        }



        for (let i = 0; i < obj.stat.craftItems.length; i++) {
            user.playerStat.craftsmanship += obj.stat.craftItems[i].amount * 0.25;
        }


        user.playerStat.gunHandling += obj.stat.shotFired * 0.05;

        for (let i = 0; i < obj.stat.drones.length; i++) {
            if (obj.stat.drones[i].level == 1) {
                if (obj.stat.drones[i].gunId > 0) {
                    user.playerStat.gunMastery += 1;
                    user.playerStat.playerLevel += 5;
                    if (obj.stat.drones[i].headshot == 1) {
                        user.playerStat.gunMarksmanship += 1;
                        user.playerStat.playerLevel += 2.5
                    }
                }
                else if (obj.stat.drones[i].knife == 1) {
                    user.playerStat.knifeMastery += 1;
                }

            }

            if (obj.stat.drones[i].level == 2) {
                if (obj.stat.drones[i].gunId > 0) {
                    user.playerStat.gunMastery += 5;
                    user.playerStat.playerLevel += 15;
                    if (obj.stat.drones[i].headshot == 1) {
                        user.playerStat.gunMarksmanship += 5;
                        user.playerStat.playerLevel += 7.5
                    }
                }
                else if (obj.stat.drones[i].knife == 1) {
                    user.playerStat.knifeMastery += 5;
                }

            }

            if (obj.stat.drones[i].level == 3) {
                if (obj.stat.drones[i].gunId > 0) {
                    user.playerStat.gunMastery += 10;
                    user.playerStat.playerLevel += 50;
                    if (obj.stat.drones[i].headshot == 1) {
                        user.playerStat.gunMarksmanship += 10;
                        user.playerStat.playerLevel += 25
                    }
                }
                else if (obj.stat.drones[i].knife == 1) {
                    user.playerStat.knifeMastery += 1;
                }

            }
        }

        for (let i = 0; i < obj.stat.players.length; i++) {
            if (obj.stat.players[i].gunId > 0) {
                user.playerStat.gunMastery += 3 + obj.stat.players[i].level;
                user.playerStat.playerLevel += 2 * obj.stat.players[i].level;
                if (obj.stat.players[i].headshot == 1) {
                    user.playerStat.gunMarksmanship += 3 + obj.stat.players[i].level;
                    user.playerStat.playerLevel += obj.stat.players[i].level
                }
            }
            else if (obj.stat.players[i].knife == 1) {
                user.playerStat.knifeMastery += 3 + obj.stat.players[i].level;
            }
        }

        user.markModified("playerStat");
        await user.save();
        cb({
            message: user.playerStat,
            status: 200
        });
    }

}

async function createSquad(io, obj, cb, socket) {
    console.log(obj);
    let user = await User.findById(obj.id);
    if (user) {
        let squad = new Squad();
        squad.started = 0;
        squad.startTime = Math.floor(new Date().getTime() / 1000);
        if (!Array.isArray(squad.members)) {
            squad.members = [];
        }
        let data = {
            creator: 1,
            id: user._id,
            joined: 1,
            started: 1

        };
        squad.members.push(data);
        if (!Array.isArray(user.squads)) {
            user.squads = [];
        }

        for (let i = 0; i < obj.friendIds.length; i++) {
            let u = await User.findById(obj.friendIds[i]);
            let data = {
                creator: 0,
                id: u._id,
                joined: 0,
                started: 0

            };
            squad.members.push(data);
            if (!Array.isArray(u.squads)) {
                u.squads = [];
            }
        }
        await squad.save();
        user.squads.push(squad._id);
        console.log(user.squads);
        user.squadJoin = squad._id;
        await user.save();
        socket.join(squad._id);
        io.to(squad._id).emit(constants.ONSQUADJOINED, {
            status: 200,
            squad: squad,
            id: user._id
        });
        for (let i = 0; i < obj.friendIds.length; i++) {
            let u = await User.findById(obj.friendIds[i]);
            u.squads.push(squad._id);
            await u.save();
            socket.broadcast.to(u.socket_id).emit(constants.SQUADREQUEST, {
                status: 200,
                squad: squad,
            });
        }
        socket.emit(constants.SQUADREQUEST, {
            status: 200,
            squad: squad,
        });

    }
}
async function joinSquad(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    if (user) {
        let squad = await Squad.findById(obj.squadId);
        if (squad) {
            if (!Array.isArray(squad.members)) {
                squad.members = [];
            }
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members[i].id == obj.id) {
                    squad.members[i].joined = 1;
                    squad.markModified("members");
                    socket.join(squad._id);
                    await squad.save();
                    io.to(squad._id).emit(constants.ONSQUADJOINED, {
                        status: 200,
                        squad: squad,
                        id: user._id
                    });
                    break;
                }
            }
            user.squadJoin = obj.squadId;
            await user.save();
        }
    }
}

async function readyForGame(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    if (user) {
        let squad = await Squad.findById(obj.squadId);
        if (squad) {
            if (!Array.isArray(squad.members)) {
                squad.members = [];
            }
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members[i].id == obj.id) {
                    squad.members[i].started = 1;
                    squad.markModified("members");
                    await squad.save();
                    io.to(squad._id).emit(constants.ONSQUADSTART, {
                        status: 200,
                        squad: squad,
                        id: user._id,
                        started: 1
                    });
                    break;
                }
            }
        }
    }
}

async function notReadyForGame(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    if (user) {
        let squad = await Squad.findById(obj.squadId);
        if (squad) {
            if (!Array.isArray(squad.members)) {
                squad.members = [];
            }
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members[i].id == obj.id) {
                    squad.members[i].started = 0;
                    squad.markModified("members");
                    await squad.save();
                    io.to(squad._id).emit(constants.ONSQUADSTART, {
                        status: 200,
                        squad: squad,
                        id: user._id,
                        started: 0
                    });
                    break;
                }
            }
        }
    }
}
async function leaveSquad(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    console.log(obj.id + "    " + obj.squadId);
    if (user) {
        let squad = await Squad.findById(obj.squadId);
        if (squad) {
            if (!Array.isArray(squad.members)) {
                squad.members = [];
            }
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members[i].id == obj.id) {
                    if (squad.members[i].creator == 1) {
                        console.log(obj.id + "  creator    " + obj.squadId);
                        for (let i = 0; i < squad.members.length; i++) {
                            let u = await User.findById(squad.members[i].id);
                            u.squadJoin = "";

                            const index = u.squads.indexOf(obj.squadId);
                            if (index > -1) {
                                u.squads.splice(index, 1);
                            }

                            await u.save();

                        }
                        io.to(squad._id).emit(constants.SQUADEND, {
                            status: 200,
                            squad,
                        });
                        await squad.delete();

                    }
                    else {
                        squad.members.pull(squad.members[i])
                        user.squadJoin = "";
                        const index = user.squads.indexOf(obj.squadId);
                        if (index > -1) {
                            user.squads.splice(index, 1);
                        }

                        squad.markModified("members");
                        io.to(squad._id).emit(constants.ONSQUADLEAVE, {
                            status: 200,
                            squad,
                        });
                        await user.save();
                        await squad.save();
                    }
                    socket.leave(obj.squadId);
                    break;
                }
            }
        }
    }
}




async function removeLoot(obj, cb, io) {
    let user = await User.findById(obj.id);
    if (user) {
        let squadMatch = await SquadMatch.findById(obj.matchId);
        if (squadMatch) {
            let d = {


            }
            for (let i = 0; i < user.inventoryInGame.length; i++) {
                if (obj.itemId == user.inventoryInGame[i].itemId) {
                    d = user.inventoryInGame[i];

                    break;
                }
            }
            user.inventoryInGame.pull(d);
            d.currentOwner = "game";
            squadMatch.inventoryInGame.push(d);
            user.inventoryInGame.pull(d);
            await user.save();
            await squadMatch.save();
        }
    }
}

async function addLoot(obj, cb, io) {
    let user = await User.findById(obj.id);
    if (user) {
        let squadMatch = await SquadMatch.findById(obj.matchId);
        if (squadMatch) {
            let d = {

            }

            for (let i = 0; i < squadMatch.inventoryInGame.length; i++) {
                if (obj.itemId == squadMatch.inventoryInGame[i].itemId) {
                    d = squadMatch.inventoryInGame[i];

                    break;
                }
            }

            squadMatch.inventoryInGame.pull(d);
            d.currentOwner = user._id;
            user.inventoryInGame.push(d);
            await user.save();
            await squadMatch.save();
        }
    }
}

async function generateEvents(squadMatch) {

    let finalData = [];
    for (let i = 0; i < squadMatch.eventDataByClient.length; i++) {
        let player = squadMatch.eventDataByClient[i].playerId;
        if (squadMatch.eventDataByClient[i].typeOfEvent != 3) {
            let user = await User.findById(squadMatch.eventDataByClient[i].playerId);
            player = user.name;
        }
        let enemy = squadMatch.eventDataByClient[i].enemyId;
        if (squadMatch.eventDataByClient[i].typeOfEvent != 4) {
            let user2 = await User.findById(squadMatch.eventDataByClient[i].enemyId);
            enemy = user2.name;
        }
        let time = squadMatch.eventDataByClient[i].time - squadMatch.startTime - 60;
        let d = {
            player: player,
            enemy: enemy,
            time: time,
            typeOfEvent: squadMatch.eventDataByClient[i].typeOfEvent
        }
        finalData.push(d);

    }
    return finalData;

}
async function addEventData(io, obj, socket) {
    console.log("match calling");
    let squadMatch = await SquadMatch.findById(obj.matchId);
    if (squadMatch) {
        if (!Array.isArray(squadMatch.eventData)) {
            squadMatch.eventData = [];
        }
        let d = {
        }

        if (obj.typeOfEvent == constants.KILLED_BY_PLAYER_EVENT) {
            let user = await User.findById(obj.enemyId);
            if (user) {
                if (!Array.isArray(squadMatch.currentMembers)) {
                    squadMatch.currentMembers = [];
                }
                d = {
                    playerId: obj.playerId,
                    enemyId: obj.enemyId,
                    time: Math.floor(new Date().getTime() / 1000),
                    extra: obj.extra,
                    typeOfEvent: obj.typeOfEvent
                }
                squadMatch.eventDataByClient.push(d);

                let index = squadMatch.currentMembers.findIndex(item => item == user._id);
                squadMatch.currentMembers.splice(index, 1);
                let team = user.team;
                user.matchId = "";
                user.team = 0;
                user.code = "";
                user.squadJoin = "";
                let finalData = await generateEvents(squadMatch);

                io.to(user.socket_id).emit(constants.YOULOSTSINGLE, {
                    eventData: finalData,
                    matchId: obj.matchId

                });


                /*   while (user.loadout.length > 0) {
                      user.loadout.pop();
                  }
  
                  while (user.inventoryInGame.length > 0) {
                      user.inventoryInGame.pop();
                  } */
                if (obj.killType)
                    await killsDataEventHandler(obj.killType, user, obj);
                await user.save();


            }
        }
        else if (obj.typeOfEvent == constants.RAID_SURVIVED_EVENT) {
            let user = await User.findById(obj.enemyId);
            if (user) {

                if (!Array.isArray(squadMatch.currentMembers)) {
                    squadMatch.currentMembers = [];
                }
                let index = squadMatch.currentMembers.findIndex(item => item == user._id);
                squadMatch.currentMembers.splice(index, 1);
                let team = user.team;
                user.matchId = "";
                user.team = 0;
                user.code = "";
                user.squadJoin = "";
                d = {
                    playerId: obj.enemyId,
                    enemyId: obj.enemyId,
                    time: Math.floor(new Date().getTime() / 1000),
                    extra: obj.extra,
                    typeOfEvent: obj.typeOfEvent
                }
                squadMatch.eventDataByClient.push(d);
                let finalData = await generateEvents(squadMatch);


                io.to(user.socket_id).emit(constants.EXTRACTED, {
                    eventData: finalData,
                    matchId: obj.matchId

                });
                /*   while (user.loadout.length > 0) {
                      user.loadout.pop();
                  }
  
                  for (let j = 0; j < user.inventoryInGame.length; j++) {
                      if (user.inventoryInGame[j].realOwner != user._id) {
                          let found = 0;
                          for (let i = 0; i < user.inventory.length; i++) {
                              if (user.inventory[i].mainId.length == user.inventoryInGame[j].mainId.length
                                  && user.inventory[i].id.length == user.inventoryInGame[j].id.length) {
                                  for (let k = 0; k < user.inventory[i].mainId.length; k++) {
                                      if (user.inventory[i].mainId[k] == user.inventoryInGame[j].mainId[j]
                                          && user.inventory[i].id[k] == user.inventoryInGame[j].id[j]) {
                                          user.inventory[i].quantity += 1;
                                          user.markModified("inventory");
                                          found = 1;
                                          break;
                                      }
                                  }
                              }
                              if (found == 1) {
                                  break;
                              }
                          }
                          if (found == 0) {
                              let d = {
                                  mainId: user.inventoryInGame[j].mainId,
                                  id: user.inventoryInGame[j].id,
                                  quantity: 1
                              }
                              user.inventory.push(d);
                          }
                      }
  
                  }
                  while (user.inventoryInGame.length > 0) {
                      user.inventoryInGame.pop();
                  } */
                await updateTotalSurvivedRaidsData(user);
                await user.save();
            }
        }
        else if (obj.typeOfEvent == constants.KILLED_BY_DRONE_EVENT) {
            let user = await User.findById(obj.enemyId);
            if (user) {
                if (!Array.isArray(squadMatch.currentMembers)) {
                    squadMatch.currentMembers = [];
                }
                d = {
                    playerId: obj.playerId,
                    enemyId: obj.enemyId,
                    time: Math.floor(new Date().getTime() / 1000),
                    extra: obj.extra,
                    typeOfEvent: obj.typeOfEvent
                }
                squadMatch.eventDataByClient.push(d);

                let index = squadMatch.currentMembers.findIndex(item => item == user._id);
                squadMatch.currentMembers.splice(index, 1);
                let team = user.team;
                user.matchId = "";
                user.team = 0;
                user.code = "";
                user.squadJoin = "";

                let finalData = await generateEvents(squadMatch);


                io.to(user.socket_id).emit(constants.YOULOSTSINGLE, {
                    eventData: finalData,
                    matchId: obj.matchId

                });


                /* while (user.loadout.length > 0) {
                    user.loadout.pop();
                }

                while (user.inventoryInGame.length > 0) {
                    user.inventoryInGame.pop();
                } */
                if (obj.killType)
                    await killsDataEventHandler(obj.killType, user, obj);
                await user.save();


            }
        }
        else if (obj.typeOfEvent == constants.DRONE_KILLED_EVENT) {
            let user = await User.findById(obj.playerId);
            if (user) {
                if (!Array.isArray(squadMatch.currentMembers)) {
                    squadMatch.currentMembers = [];
                }
                d = {
                    playerId: obj.playerId,
                    enemyId: obj.enemyId,
                    time: Math.floor(new Date().getTime() / 1000),
                    extra: obj.extra,
                    typeOfEvent: obj.typeOfEvent
                }
                squadMatch.eventDataByClient.push(d);
                await user.save();
            }
        }
        if (squadMatch.currentMembers.length == 0) {
            squadMatch.end = 1;
        }
        await squadMatch.save();
        for (let i = 0; i < squadMatch.members.length; i++) {
            io.to(squadMatch.members[i].squadId).emit(constants.EVENTHAPPEN, {
                eventData: d,
                matchId: obj.matchId,
                players: squadMatch.currentMembers.length
            });
        }

        let found = 0;
        if (squadMatch.currentMembers.length <= 0) {
            for (let i = 0; i < squadMatch.members.length; i++) {
                for (let j = 0; j < squadMatch.members[i].members.length; j++) {
                    let user = await User.findById(squadMatch.members[i].members[j].id);
                    if (user && user.is_online == 1) {
                        found = 1;
                        io.to(user.socket_id).emit(constants.DESTROYNPC, {
                            roomCode: squadMatch.code
                        });
                        break;
                    }
                }
                if (found == 1) {
                    break;
                }
            }
        }


    }
}



async function startSquadMatchAfterTime(io, squad,id) {
   // let squadMatch = await SquadMatch.findOne({ finish: 0 });
    let squadMatch = await SquadMatch.findById(id);
    if (squadMatch) {
        squadMatch.finish = 1;
        if (!Array.isArray(squadMatch.inventoryInGame)) {
            squadMatch.inventoryInGame = [];
        }

        await squadMatch.save();

        let team = 0;
        for (let i = 0; i < squadMatch.members.length; i++) {
            for (let j = 0; j < squadMatch.members[i].members.length; j++) {
                let user = await User.findById(squadMatch.members[i].members[j].id);
                if (user) {
                    team++;
                    user.code = "";
                    user.squadJoin = "";
                    user.team = team;//squadMatch.members[i].team;
                    if (!Array.isArray(user.squads)) {
                        user.squads = [];
                    }
                    user.squads.pop(squad._id);
                    await user.save();
                }
            }
            if (squadMatch.members.length >= 0) {
                io.to(squadMatch.members[i].squadId).emit(constants.STARTGAME, {
                    status: 200,
                    squad: squadMatch.members[i],
                    id: squadMatch.code,
                    matchId: squadMatch._id,
                    inventoryInGame: squadMatch.inventoryInGame
                });

            }
            else {
                io.to(squad._id).emit(constants.STARTGAME, {
                    status: 400,
                    squad: squadMatch.members[i],
                    id: squadMatch.code,
                    inventoryInGame: squadMatch.inventoryInGame
                });
            }
        }
        setTimeout(async () => {

            spawning.generateNewMap(squadMatch, io);
        }, 1000);
    }

}
async function startSquadGameNew(io, obj, cb, socket) {
    let squad = await Squad.findById(obj.squadId);
    if (squad) {
        squad.started = 1;
        squad.code = obj.code;
        squad.inGame = 1;
        let squadLevel = 0;

        for (let i = 0; i < squad.members.length; i++) {
            let user = await User.findById(squad.members[i].id);
            if (user) {
                squadLevel += user.playerStat.playerLevel;
            }
        }
        squadLevel = squadLevel / squad.members.length;

        let squadMatch = await SquadMatch.findOne({
            totalMemebersJoined: { $lt: 16 }, 
            mode: "Stealth",
            finish: 0, level: { $lt: squadLevel + 3, $gt: squadLevel - 3 }
        });
        if (squadMatch) {
            squad.team = squadMatch.members.length + 1;
            await squad.save();
            if (!Array.isArray(squadMatch.members)) {
                squadMatch.members = [];
            }
            let membersArray = [];
            for (let i = 0; i < squad.members.length; i++) {
                let d = {
                    id: squad.members[i].id,
                    score: 0,
                }
                squadMatch.totalMemebersJoined += 1;
                membersArray.push(d);
            }

            let d1 = {
                members: membersArray,
                team: squad.team,
                squadId: squad._id
            }

            squadMatch.members.push(d1);
            io.to(squad._id).emit(constants.SQUADSTARTTIME, {
                startTime: squadMatch.startTime,
                searchDuration: 60
            });

            await squadMatch.save();

        }
        else {
            let squadMatch = new SquadMatch();
            squadMatch.code = obj.code;
            squadMatch.mode = obj.mode;
            squad.team = squadMatch.members.length + 1;
            await squad.save();

            if (!Array.isArray(squadMatch.members)) {
                squadMatch.members = [];
            }
            let level = 0;
            let membersArray = [];
            for (let i = 0; i < squad.members.length; i++) {
                let d = {
                    id: squad.members[i].id,
                    score: 0,
                }
                let user = await User.findById(squad.members[i].id);
                if (user) {
                    await updateTotalRaidsData(user);
                    level += user.playerStat.playerLevel;
                }
                squadMatch.totalMemebersJoined += 1;
                membersArray.push(d);
            }
            squadMatch.level = level / squad.members.length;

            let d1 = {
                members: membersArray,
                team: squad.team,
                squadId: squad._id
            }
            squadMatch.members.push(d1)
            squadMatch.startTime = Math.floor(new Date().getTime() / 1000);
            squadMatch.finish = 0;

            let timer = 60000
            if (squadMatch.mode === "Single") {
                timer = 2000;
            }
            io.to(squad._id).emit(constants.SQUADSTARTTIME, {
                startTime: squadMatch.startTime,
                searchDuration: timer / 1000
            });

            await squadMatch.save();

            setTimeout(async () => {
                startSquadMatchAfterTime(io, squad,squadMatch._id);

            }, timer);
        }
    }
}

async function addZone(obj) {

    let squadMatch = await SquadMatch.findById(obj.matchId);
    if (squadMatch) {

        if (!Array.isArray(squadMatch.zone)) {
            squadMatch.zone = [];
        }
        squadMatch.zone.push(obj.zone);
        await squadMatch.save();
    }
}
async function sendZone(id, io) {
    let squadMatchNew = await SquadMatch.findById(id);
    if (squadMatchNew) {
        if (!Array.isArray(squadMatchNew.zone)) {
            squadMatchNew.zone = [];
        }
        while (squadMatchNew.zone.length > 0) {
            squadMatchNew.zone.pop();
        }

        let waitTime = 0;
        for (let i = 0; i < squadMatchNew.members.length; i++) {
            for (let j = 0; j < squadMatchNew.members[i].members.length; j++) {
                let user = await User.findById(squadMatchNew.members[i].members[j].id);
                if (user) {

                    io.to(user.socket_id).emit(constants.SENDZONE, {
                        waitTime: waitTime
                    });
                    waitTime = waitTime + 0.25;

                }
            }
        }
    }
}

async function deployWeapon(id, io) {
    let squadMatchNew = await SquadMatch.findById(id);
    if (squadMatchNew) {
        let spawn = 1;
        let found = 0;
        for (let i = 0; i < squadMatchNew.members.length; i++) {
            for (let j = 0; j < squadMatchNew.members[i].members.length; j++) {
                let user = await User.findById(squadMatchNew.members[i].members[j].id);
                if (user && user.is_online == 1) {
                    found = 1;
                    let pl = 1;
                    for (let k = 0; k < 9; k++) {

                        io.to(user.socket_id).emit(constants.DEPLOYLOOT, {
                            zone: k,
                            itemId: pl,
                            mainItemId: 1,
                            spawnPoint: spawn,
                            players: squadMatchNew.currentMembers.length
                        });
                        pl++;
                        if (pl > 3) {
                            pl = 1;
                        }
                    }
                    break;
                }
            }
            if (found == 1) {
                break;
            }
        }
    }
}

async function deployLoot(id, io) {
    let squadMatchNew = await SquadMatch.findById(id);
    if (squadMatchNew) {
        var dict = {};
        let requiredZone = -1;
        for (let i = 0; i < squadMatchNew.zone.length; i++) {
            if (dict.hasOwnProperty(squadMatchNew.zone[i])) {
                dict[squadMatchNew.zone[i]] += 1;
            }
            else {
                dict[squadMatchNew.zone[i]] = 1;
            }
        }

        for (let i = 1; i < 10; i++) {
            if (!dict.hasOwnProperty(i)) {
                requiredZone = i;
                break;
            }
        }

        if (requiredZone == -1) {
            let v = 1;
            for (var item in dict) {
                if (dict[item] == v) {
                    requiredZone = item;
                    break;
                }
                else {
                    v = v + 1;
                }
            }
        }
        let spawn = 1;
        let found = 0;
        for (let i = 0; i < squadMatchNew.members.length; i++) {
            for (let j = 0; j < squadMatchNew.members[i].members.length; j++) {
                let user = await User.findById(squadMatchNew.members[i].members[j].id);
                if (user && user.is_online == 1) {
                    found = 1;
                    io.to(user.socket_id).emit(constants.DEPLOYLOOT, {
                        zone: requiredZone,
                        itemId: 1,
                        mainItemId: 1,
                        spawnPoint: spawn,
                        players: squadMatchNew.currentMembers.length
                    });
                    break;
                }
            }
            if (found == 1) {
                break;
            }

        }


    }
}


//old implementation of squad game 
async function startSquadGame(io, obj, cb, socket) {
    let squad = await Squad.findById(obj.squadId);
    if (squad) {
        squad.started = 1;
        squad.code = obj.code;
        let squadBefore = await Squad.findOne({ inGame: 0, started: 1 });
        await squad.save();
        if (squadBefore) {
            squad.rival = squadBefore._id;
            squadBefore.rival = squad._id;
            squad.inGame = 1;
            squadBefore.inGame = 1;
            squadBefore.team = 1;
            squad.team = 2;
            await squad.save();
            await squadBefore.save();

            io.to(squad._id).emit(constants.STARTGAME, {
                status: 200,
                squad: squad,
                id: squadBefore.code
            });
            io.to(squadBefore._id).emit(constants.STARTGAME, {
                status: 200,
                squad: squadBefore,
                id: squadBefore.code
            });



            for (let i = 0; i < squad.members.length; i++) {
                let user = await User.findById(squad.members[i].id);
                if (user) {
                    user.code = "";
                    user.squadJoin = "";
                    if (!Array.isArray(user.squads)) {
                        user.squads = [];
                    }
                    user.squads.pop(squad._id);
                    await user.save();
                }
            }

            for (let i = 0; i < squadBefore.members.length; i++) {
                let user = await User.findById(squadBefore.members[i].id);
                if (user) {
                    user.code = "";
                    user.squadJoin = "";
                    if (!Array.isArray(user.squads)) {
                        user.squads = [];
                    }
                    user.squads.pop(squad._id);
                    await user.save();
                }
            }
        }


        else {

            setTimeout(async () => {
                let squad = await Squad.findById(obj.squadId);
                if (squad.inGame == 0) {
                    squad.inGame = 2;
                    for (let i = 0; i < squad.members.length; i++) {
                        let user = await User.findById(squad.members[i].id);
                        if (user) {
                            user.squadJoin = "";
                            user.code = "";
                            if (!Array.isArray(user.squads)) {
                                user.squads = [];
                            }
                            user.squads.pop(squad._id);
                            await user.save();
                        }
                    }
                    await squad.save();
                    io.to(squad._id).emit(constants.STARTGAME, {
                        status: 400,
                        squad: squad,
                        id: squad.code
                    });


                }

            }, 60000);

        }

    }

}

//response the code of room of friend....related to join friend room
async function GetRoomCode(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    if (user) {

        let match = new Matches();
        match.startTime = Math.floor(new Date().getTime() / 1000);
        match.code = obj.code;
        if (!Array.isArray(match.membersData)) {
            match.membersData = [];
        }
        match.maximumPlayers = 3;
        let d = {
            id: user.id,
            score: 0,
            startTime: Math.floor(new Date().getTime() / 1000),
            endTime: 0

        }
        match.members = match.members + 1;
        match.membersData.push(d);
        match.public = 1;
        await match.save();
        user.matchId = match._id;
        user.code = obj.code;
        socket.join(match._id);
        await user.save();
        socket.emit(constants.STARTGAMEOFFRIEND, {
            status: 200,
            id: match.code,
            matchId: match._id
        });
        setTimeout(async () => {

            let m = await Matches.findById(match._id);
            if (m) {
                if (!Array.isArray(m.membersData)) {
                    m.membersData = [];
                }
                m.finish = 1;

                io.to(m._id).emit(constants.ONMATCHENDED, {
                    status: 200,
                    match: m
                });
                for (let i = 0; i < m.membersData.length; i++) {
                    let user = await User.findById(m.membersData[i].id);
                    if (user) {
                        user.matchId = "";
                        await user.save();
                        //  user.socket.leave(m._id);
                    }
                }

                await m.save();
            }

        }, 300000);
    }

}

//finds the room which is empty ...related to join friend room
async function findRoom(io, match, cb, socket, u, codeId) {
    if (!Array.isArray(match.membersData)) {
        match.membersData = [];
    }
    let d = {
        id: u.id,
        score: 0,
        startTime: Math.floor(new Date().getTime() / 1000),
        endTime: 0,
        totaltime: 0
    }

    match.members = match.members + 1;
    match.membersData.push(d);
    if (match.members >= match.maximumPlayers) {
        match.roomFull = 1;
    }
    u.matchId = match._id;
    u.code = codeId;
    socket.join(match._id);
    await match.save();
    await u.save();
    io.to(match._id).emit(constants.PLAYERADDEDMATCH, {
        status: 200,
        message: u
    });
    socket.emit(constants.STARTGAMEOFFRIEND, {
        status: 200,
        id: codeId,
        matchId: match._id,
        endTime: 0

    });

}
//Calls when client clicks on join friend button.. Its not squad match
async function joinFriendsRoom(io, obj, cb, socket) {
    let user = await UserPacks.findById(obj.id);
    if (user) {
        let u = await User.findById(user.userId);
        if (!Array.isArray(user.friends)) {
            user.friends = [];
        }

        let friends = user.friends;
        var dict = {};

        for (let i = 0; i < friends.length; i++) {
            let f = await UserPacks.findById(friends[i]);
            let friend = await User.findById(f.userId);

            if (friend.code.length > 0) {
                let p = friend.code;
                if (dict.hasOwnProperty(p)) {
                    dict[p] += 1;
                }
                else {
                    dict[p] = 1;
                }
            }
        }

        if (Object.keys(dict).length == 0) {

            let match = await Matches.findOne({ roomFull: 0, finish: 0 })

            if (match) {
                findRoom(io, match, cb, socket, u, match.code);
            }
            else {

                socket.emit(constants.MAKEROOM, {
                    name: "name"
                });
            }

        }
        else {
            let codeId = "";
            let v = 0;
            for (var item in dict) {
                if (dict[item] >= v) {
                    v = dict[item];
                    codeId = item;
                }

            }
            let match = await Matches.findOne({ code: codeId, roomFull: 0, finish: 0 })
            if (match) {
                findRoom(io, match, cb, socket, u, codeId);
            }
            else {
                let match = await Matches.findOne({ roomFull: 0, finish: 0 })

                if (match) {
                    findRoom(io, match, cb, socket, u, match.code);
                }
                else {

                    socket.emit(constants.MAKEROOM, {
                        name: "name"
                    });
                }

            }

        }

    }

}

async function updatePoints(io, obj, cb, socket) {
    console.log(obj);
    let match = await Matches.findById(obj.matchId)
    if (match) {
        console.log("match found " + obj.score)
        if (!Array.isArray(match.membersData)) {
            match.membersData = [];
        }
        for (let i = 0; i < match.membersData.length; i++) {
            if (match.membersData[i].id == obj.id) {
                console.log("inside found " + obj.score)
                match.membersData[i].score += obj.score;

                break;
            }
        }
        match.markModified("membersData");
        await match.save();
    }
}
async function incrementCountOfServer(io, obj, cb, socket) {
    console.log(obj);
    let server = await Server.findOne({ country: obj.country });
    if (server) {

        if (!Array.isArray(server.servers)) {
            server.servers = [];
        }
        for (let i = 0; i < server.servers.length; i++) {
            if (server.servers[i].port == obj.port) {
                console.log("inside found " + obj.score)
                server.servers[i].team -= 1;
                server.markModified("servers");
                break;
            }
        }
        if (obj.port == 7777) {

        }
        else {
            for (let i = 0; i < server.servers.length; i++) {
                if (server.servers[i].port == 7777) {
                    console.log("inside found " + obj.score)
                    server.servers[i].team += 1;
                    server.markModified("servers");
                    break;
                }
            }
        }

        await server.save();
    }
}
async function connectToServer(io, obj, cb, socket) {
    console.log(obj);
    let server = await Server.findOne({ country: obj.country });
    if (server) {

        if (!Array.isArray(server.servers)) {
            server.servers = [];
        }

        if (obj.port == 7777) {
            let minIndex = 0;
            for (let i = 0; i < server.servers.length; i++) {

                if (server.servers[i].team <= server.servers[minIndex].team && server.servers[i].port != 7777) {
                    minIndex = i;
                }
                if (server.servers[i].port == obj.port) {
                    server.servers[i].team -= 1;
                }

            }

            cb({
                message: server.servers[minIndex].port,
                status: 200
            });
        }
        else {
            for (let i = 0; i < server.servers.length; i++) {
                if (server.servers[i].port == obj.port) {
                    server.servers[i].team -= 1;
                }
                if (server.servers[i].port == 7777) {
                    server.servers[i].team += 1;
                }

            }
            cb({
                message: 7777,
                status: 200
            });

        }
        await server.save();
    }
}

