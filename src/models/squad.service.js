
const db = require("../_helpers/db");
const mongoose = require("mongoose");
const UserPacks = db.UserPacks;
const User = db.User;
const Squad = db.Squad;
const Matches = db.Match;
const SquadMatch = db.SquadMatch;

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
    setCurrentMatch

};


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
        for (let i = 0; i < obj.friendIds.length; i++) {
            let u = await User.findById(obj.friendIds[i]);
            u.squads.push(squad._id);
            await u.save();
            socket.broadcast.to(u.socket_id).emit('SQUADREQUEST', {
                status: 200,
                squad: squad,
            });
        }
        socket.emit("SQUADREQUEST", {
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
                    io.to(squad._id).emit("ONSQUADJOINED", {
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
async function leaveSquad(io, obj, cb, socket) {
    let user = await User.findById(obj.id);
    if (user) {
        let squad = await Squad.findById(obj.squadId);
        if (squad) {
            if (!Array.isArray(squad.members)) {
                squad.members = [];
            }
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members.id == obj.id) {
                    squad.members[i].joined = 0;
                    squad.markModified("members");

                    await squad.save();
                    io.to(squad._id).emit("ONSQUADJOINED", {
                        status: 200,
                        squad,
                    });
                    socket.leave(squad._id);
                    break;

                }


            }
            if (!Array.isArray(user.squads)) {
                user.squads = [];
            }
            user.squads.pull(squad._id);
            user.squadJoin = "";
            await user.save();
        }

    }

}

async function setCurrentMatch(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        user.matchId = obj.matchId;
        let squadMatch = await SquadMatch.findById(obj.matchId);
        if (squadMatch) {
            if (!Array.isArray(squadMatch.currentMembers)) {
                squadMatch.currentMembers = [];
            }

            console.log("current members in squad " + user.team);
            squadMatch.currentMembers.push(user.team)

            let firstNumber = -1;
            let anotherPlayerFound = 0;
            for (let i = 0; i < squadMatch.currentMembers.length; i++) {
                if (firstNumber = -1) {
                    firstNumber = squadMatch.currentMembers[i];
                }
                else if (firstNumber != squadMatch.currentMembers[i]) {
                    anotherPlayerFound = 1;
                    break;
                }
            }

            if (anotherPlayerFound == 0) {
                console.log("DIC LENGTH " + anotherPlayerFound);
            }
            else {
                console.log("DIC LENGTH " + anotherPlayerFound);
            }
            await squadMatch.save();
        }
    }
}



async function addEventData(io, obj,socket) {
    console.log("match calling");
    let squadMatch = await SquadMatch.findById(obj.matchId);
    if (squadMatch) {

        console.log("match found" + obj.enemyId);
        if (!Array.isArray(squadMatch.eventData)) {
            squadMatch.eventData = [];
        }
        let d = {
            playerId: obj.playerId,
            enemyId: obj.enemyId,
            time: Math.floor(new Date().getTime() / 1000),
            extra: obj.extra,
            typeOfEvent: obj.typeOfEvent
        }
      
       
        squadMatch.eventDataByClient.push(d);
        if (obj.typeOfEvent == 1) {
            let user = await User.findById(obj.enemyId);
            if (user) {
                console.log("ENEMY KILLED");
                if (!Array.isArray(squadMatch.currentMembers)) {
                    squadMatch.currentMembers = [];
                }

                let player = await User.findById(obj.playerId);
                if(player)
                {
                    player.xp+=10;
                    await player.save();
                    socket.broadcast.to(player.socket_id).emit('SETXP', {
                   
                        message: player.xp,
                    });
                }
                
                let index = squadMatch.currentMembers.findIndex(item => item == user.team);
                squadMatch.currentMembers.splice(index, 1);
                // squadMatch.currentMembers.pull(user.team);
                user.matchId = "";
                user.team = 0;
                await user.save();


                let firstNumber = -1;
                let anotherPlayerFound = 0;
                for (let i = 0; i < squadMatch.currentMembers.length; i++) {
                    if (firstNumber == -1) {
                        firstNumber = squadMatch.currentMembers[i];
                    }
                    else if (firstNumber != squadMatch.currentMembers[i]) {
                        anotherPlayerFound = 1;
                        break;
                    }
                }

                if (anotherPlayerFound == 0) {

                    let finalData = [];

                    for (let i = 0; i < squadMatch.eventDataByClient.length; i++) {

                        let user = await User.findById(squadMatch.eventDataByClient[i].playerId);
                        let player = user.name;
                        let user2 = await User.findById(squadMatch.eventDataByClient[i].enemyId);
                        let enemy = user2.name;
                        let time = squadMatch.eventDataByClient[i].time - squadMatch.startTime - 60;
                        let d = {
                            player: player,
                            enemy: enemy,
                            time: time

                        }
                        finalData.push(d);

                    }

                    for (let i = 0; i < squadMatch.members.length; i++) {

                        for (let j = 0; j < squadMatch.members[i].members.length; j++) {
                            let user = await User.findById(squadMatch.members[i].members[j].id);
                            if (user) {
                                user.code = "";
                                user.squadJoin = "";
                                user.team = 0;
                                user.matchId = "";
                                //  if (!Array.isArray(user.squads)) {
                                //      user.squads = [];
                                //  }
                                //  user.squads.pop(squad._id);
                                await user.save();
                            }
                        }

                        {
                            io.to(squadMatch.members[i].squadId).emit("ENDGAME", {

                                eventData: finalData,
                                winner: firstNumber,

                            });
                        }

                    }

                }

            }
        }
        await squadMatch.save();

        for (let i = 0; i < squadMatch.members.length; i++) {
            io.to(squadMatch.members[i].squadId).emit("EVENTHAPPEN", {
                eventData: d,
            });
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
                    io.to(squad._id).emit("ONSQUADSTART", {
                        status: 200,
                        squad: squad,
                        id: user._id
                    });
                    break;
                }
            }
        }
    }
}


async function addZone(obj) {
    console.log("match calling");
    let squadMatch = await SquadMatch.findById(obj.matchId);
    if (squadMatch) {
        console.log("match found");
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
        // for (let i = 0; i < squadMatchNew.members.length; i++) {


        //   io.to(squadMatchNew.members[i].squadId).emit("SENDZONE", {
        //  });
        //  }

        let waitTime = 0;
        for (let i = 0; i < squadMatchNew.members.length; i++) {
            for (let j = 0; j < squadMatchNew.members[i].members.length; j++) {
                let user = await User.findById(squadMatchNew.members[i].members[j].id);
                if (user) {

                    io.to(user.socket_id).emit("SENDZONE", {
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
                    let pl =1;
                    for (let k = 0; k < 9; k++) {

                        io.to(user.socket_id).emit("DEPLOYLOOT", {
                            zone: k,
                            itemId: pl,
                            mainItemId: 1,
                            spawnPoint: spawn
                        });
                        pl++;
                        if(pl>3)
                        {
                            pl=1;
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
                    io.to(user.socket_id).emit("DEPLOYLOOT", {
                        zone: requiredZone,
                        itemId: 1,
                        mainItemId: 1,
                        spawnPoint: spawn
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




async function startSquadMatchAfterTime(io, squad) {
    let squadMatch = await SquadMatch.findOne({ finish: 0 });
    squadMatch.finish = 1;

    await squadMatch.save();

    for (let i = 0; i < squadMatch.members.length; i++) {

        for (let j = 0; j < squadMatch.members[i].members.length; j++) {
            let user = await User.findById(squadMatch.members[i].members[j].id);
            if (user) {
                user.code = "";
                user.squadJoin = "";
                user.team = squadMatch.members[i].team;
                if (!Array.isArray(user.squads)) {
                    user.squads = [];
                }
                user.squads.pop(squad._id);
                await user.save();
            }
        }
        if (squadMatch.members.length > 1) {
            io.to(squadMatch.members[i].squadId).emit("STARTGAME", {
                status: 200,
                squad: squadMatch.members[i],
                id: squadMatch.code,
                matchId: squadMatch._id
            });
        }
        else {
            io.to(squad._id).emit("STARTGAME", {
                status: 400,
                squad: squadMatch.members[i],
                id: squadMatch.code
            });
        }
    }

}
async function startSquadGameNew(io, obj, cb, socket) {
    let squad = await Squad.findById(obj.squadId);
    if (squad) {
        squad.started = 1;
        squad.code = obj.code;
        squad.inGame = 1;
        let squadMatch = await SquadMatch.findOne({ finish: 0 });
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
                membersArray.push(d);

            }
            let d1 = {
                members: membersArray,
                team: squad.team,
                squadId: squad._id
            }

            squadMatch.members.push(d1);
            io.to(squad._id).emit("SQUADSTARTTIME", {
                startTime: squadMatch.startTime,
                searchDuration: 60
            });

            await squadMatch.save();

        }
        else {
            let squadMatch = new SquadMatch();
            squadMatch.code = obj.code;
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
                membersArray.push(d);

            }
            let d1 = {
                members: membersArray,
                team: squad.team,
                squadId: squad._id
            }
            squadMatch.members.push(d1)
            squadMatch.startTime = Math.floor(new Date().getTime() / 1000);
            squadMatch.finish = 0;

            io.to(squad._id).emit("SQUADSTARTTIME", {
                startTime: squadMatch.startTime,
                searchDuration: 60
            });

            await squadMatch.save();
            setTimeout(async () => {//1
                startSquadMatchAfterTime(io, squad);
                setTimeout(async () => {//2

                    deployWeapon(squadMatch._id, io);

                    setTimeout(async () => {//3
                        sendZone(squadMatch._id, io);

                        setTimeout(async () => {//4
                            deployLoot(squadMatch._id, io);

                            
                        }, 3000);//4


                    }, 10000);//3

                }, 1000);//2

            }, 60000);//1
        }
    }
}





async function asyncGenerator() {
    // other code
    while (goOn) {
        // other code
        var fileList = await sleep(listFiles, nextPageToken);
        var parents = await requestParents(fileList);
        // other code
    }
    // other code
}





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

            io.to(squad._id).emit("STARTGAME", {
                status: 200,
                squad: squad,
                id: squadBefore.code
            });
            io.to(squadBefore._id).emit("STARTGAME", {
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
                    io.to(squad._id).emit("STARTGAME", {
                        status: 400,
                        squad: squad,
                        id: squad.code
                    });


                }

            }, 60000);


        }

    }

}









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
        socket.emit("STARTGAMEOFFRIEND", {
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

                io.to(m._id).emit("ONMATCHENDED", {
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
    io.to(match._id).emit("PLAYERADDEDMATCH", {
        status: 200,
        message: u
    });
    socket.emit("STARTGAMEOFFRIEND", {
        status: 200,
        id: codeId,
        matchId: match._id,
        endTime: 0

    });

}

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

                socket.emit("MAKEROOM", {
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

                    socket.emit("MAKEROOM", {
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
