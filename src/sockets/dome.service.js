const db = require("../_helpers/db");
const mongoose = require("mongoose");
const constants = require("../_helpers/constants");

const User = db.User;
const Dome = db.Dome;

module.exports = {
    getDomeByNumber,
    getUnsoldHouse,
    buyHouse,
    getTotalDomesCOunt,
    getHousesOfUser,
    joinDome,
    leaveDome,
    getnewRequestPass,
    getnewRecievedPass,
    getListOfRecievedPasses,
    getListOfRequestedPasses,
    usePass,
    decisionPass,
    seeHouse,
    sendCallRequest,
    acceptCallRequest,
    cancelCallRequest,
    cutCall,
    updateHouses

};
async function getListOfRecievedPasses(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        cb({
            message: user.recievedPasses
        });
    }
}

async function getListOfRequestedPasses(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        cb({
            message: user.requestPasses
        });
    }
}
async function decisionPass(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        let friend = await User.findById(obj.friendId);
        if (friend) {
            if (!Array.isArray(user.requestPasses)) {
                user.requestPasses = [];
            }
            if (!Array.isArray(friend.recievedPasses)) {
                friend.recievedPasses = [];
            }
            let d = {
                domeId: obj.domeId,
                houseId: obj.houseId,
                userId: obj.friendId

            }
            user.requestPasses.pull(d);
            if (obj.accept == 1) {
                let d1 = {
                    domeId: obj.domeId,
                    houseId: obj.houseId,
                    userId: obj.id

                }
                friend.recievedPasses.push(d1);
                await friend.save();
            }
            await user.save();

            cb({
                status: 200
            });
        }

    }
    else {
        cb({
            status: 400
        });
    }

}


async function usePass(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        let friend = await User.findById(obj.friendId);
        if (friend) {
            if (!Array.isArray(user.recievedPasses)) {
                user.recievedPasses = [];
            }

            let d = {
                domeId: obj.domeId,
                houseId: obj.houseId,
                userId: obj.friendId

            }
            user.recievedPasses.pull(d);
            await user.save();

            cb({
                status: 200
            });
        }

    }
    else {
        cb({
            status: 400
        });
    }

}

async function getnewRecievedPass(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        let friend = await User.findById(obj.friendId);
        if (friend) {
            if (!Array.isArray(friend.recievedPasses)) {
                friend.recievedPasses = [];
            }
            let found = 0;
            for (let i = 0; i < friend.recievedPasses.length; i++) {

                if (friend.recievedPasses[i].domeId == obj.domeId &&
                    friend.recievedPasses[i].houseId == obj.houseId &&
                    friend.recievedPasses[i].userId == obj.id
                ) {
                    found = 1;
                    break;

                }
            }
            if (found == 0) {
                let d = {
                    domeId: obj.domeId,
                    houseId: obj.houseId,
                    userId: obj.id

                }
                friend.recievedPasses.push(d);
                await friend.save();
            }
            cb({
                status: 200
            });
        }

    }
    else {
        cb({
            status: 400
        });
    }

}

async function getnewRequestPass(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        let friend = await User.findById(obj.friendId);
        if (friend) {
            if (!Array.isArray(friend.requestPasses)) {
                friend.requestPasses = [];
            }
            let found = 0;
            for (let i = 0; i < friend.requestPasses.length; i++) {

                if (friend.requestPasses[i].domeId == obj.domeId &&
                    friend.requestPasses[i].houseId == obj.houseId &&
                    friend.requestPasses[i].userId == obj.id
                ) {
                    found = 1;
                    break;

                }
            }
            if (found == 0) {
                let d = {
                    domeId: obj.domeId,
                    houseId: obj.houseId,
                    userId: obj.id

                }
                friend.requestPasses.push(d);
                await friend.save();
            }
            cb({
                status: 200
            });
        }

    }
    else {
        cb({
            status: 400
        });
    }

}

async function getHousesOfUser(obj, cb) {
    console.log(" GETHOUSE OF USER " + obj.id);
    let user = await User.findById(obj.id);
    if (user) {

        cb({
            houses: user.houses,
        });
    }

}
async function getDomeByNumber(obj, cb) {
    let dome = await Dome.findOne({ domeNumber: obj.domeId });
    if (dome) {
        cb({
            dome: dome,
        });
    }
}

async function pushToTalk(obj, cb, io) {
    let user = await User.findById(obj.id);
    if (user) {
        let dome = await Dome.findOne({ domeNumber: user.joinedDome });
        if (dome) {
            if (!Array.isArray(dome.members)) {
                dome.members = [];
            }
            dome.members.pull(obj.id);
            user.joinedDome = 0;
            await user.save();
            await dome.save();
            cb({
                domes: count,
            });
        }
    }

}

async function leaveDome(obj, cb) {
    let user = await User.findById(obj.id);
    if (user) {
        let dome = await Dome.findOne({ domeNumber: user.joinedDome });
        if (dome) {
            if (!Array.isArray(dome.members)) {
                dome.members = [];
            }
            dome.members.pull(obj.id);
            user.joinedDome = 0;
            await user.save();
            await dome.save();
            cb({
                domes: count,
            });
        }
    }

}

async function updateHouses(obj, cb, socket, io) {
    let user = await User.findById(obj.id);
    if (user) {
        user.houses.length = 0;
        for (let i = 0; i < obj.houses.length; i++) {
            let dome = await Dome.findOne({ domeNumber: obj.houses[i].domeId });
            if (dome) {
                if (!Array.isArray(dome.houses)) {
                    dome.houses = [];
                }
                for (let i = 0; i < dome.houses.length; i++) {

                    if (dome.houses[i].houseId == obj.houses[i].houseId) {
                        dome.houses[i].owner = obj.id

                        dome.markModified("houses");

                        io.to("DOME" + obj.houses[i].domeId).emit(constants.ONHOUSEBUY, {
                            dome: dome
                        });
                        let d = {
                            dome: obj.houses[i].domeId,
                            house: obj.houses[i].houseId,
                            soldTime: Math.floor(new Date().getTime() / 1000)
                        }
                        user.houses.push(d);
                        await dome.save();

                        break;

                    }
                }

            }

        }
        await user.save();
    }
}

async function joinDome(obj, cb, socket, io) {
    let user = await User.findById(obj.id);
    if (user) {
        let dome = await Dome.findOne({ domeNumber: obj.domeId });
        if (dome) {
            if (!Array.isArray(dome.members)) {
                dome.members = [];
            }
            let found = 0;
            for (let i = 0; i < dome.members.length; i++) {
                if (dome.members[i] == obj.id) {
                    found = 1;
                    break;
                }

            }
            if (found == 0) {

                dome.members.push(obj.id);

                if (user.joinedDome > 0) {
                    if (user.houseVisited > 0) {
                        let dome2 = await Dome.findOne({ domeNumber: user.joinedDome });
                        dome2.houses[user.houseVisited - 1].inHouse = 0;
                        dome2.markModified("houses");
                        io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                            house: dome2.houses[user.houseVisited - 1],
                            dome: user.joinedDome
                        });
                        await dome2.save();
                    }
                    socket.leave("DOME" + user.joinedDome)
                }
                user.houseVisited = -1;
                user.joinedDome = obj.domeId;
                socket.join("DOME" + obj.domeId);
                await user.save();
                await dome.save();
                cb({
                    message: 200,
                    id: obj.id
                });
            }
            else {




                if (user.joinedDome > 0) {
                    if (user.houseVisited > 0) {
                        let dome2 = await Dome.findOne({ domeNumber: user.joinedDome });
                        dome2.houses[user.houseVisited - 1].inHouse = 0;
                        dome2.markModified("houses");
                        io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                            house: dome2.houses[user.houseVisited - 1],
                            dome: user.joinedDome
                        });
                        await dome2.save();
                    }
                    socket.leave("DOME" + user.joinedDome)
                }
                user.houseVisited = -1;
                user.joinedDome = obj.domeId;
                socket.join("DOME" + obj.domeId);
                await user.save();
                await dome.save();
                cb({
                    message: 200,
                    id: obj.id
                });
            }

        }
    }

}

async function acceptCallRequest(obj, cb, socket, io) {
    let user = await User.findById(obj.user);
    if (user) {
        let callUser = await User.findById(obj.callUser);
        if (callUser) {

            io.to(callUser.socket_id).emit(constants.CALLRESPONSE, {
                response: 1,
                message: user.callRequest
            });
            callUser.incall = 1;
            let dome = await Dome.findOne({ domeNumber: user.joinedDome });
            if (dome) {
                dome.houses[user.houseVisited - 1].onCall = 1;
                io.to("DOME" + callUser.joinedDome).emit(constants.DOMESTATUS, {
                    house: dome.houses[user.houseVisited - 1],
                    dome: user.joinedDome
                });

                await dome.save();
            }

            await callUser.save();


        }
    }
}


async function cutCall(obj, cb, socket, io) {
    let user = await User.findById(obj.user);
    if (user) {
        let callUser = await User.findById(obj.callUser);
        if (callUser) {

            io.to(user.socket_id).emit(constants.CUTCALLRESPONSE, {
                response: 0,

            });
            io.to(callUser.socket_id).emit(constants.CUTCALLRESPONSE, {
                response: 0,

            });
            if (user.houseVisited > 0) {
                let dome = await Dome.findOne({ domeNumber: user.joinedDome });
                //    dome.houses[user.houseVisited - 1].inHouse = 0;
                dome.houses[user.houseVisited - 1].onCall = 0;
                dome.markModified("houses");
                io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                    house: dome.houses[user.houseVisited - 1],
                    dome: user.joinedDome
                });
                await dome.save();
            }
            if (callUser.houseVisited > 0) {
                let dome = await Dome.findOne({ domeNumber: callUser.joinedDome });
                //  dome.houses[callUser.houseVisited - 1].inHouse = 0;
                dome.houses[callUser.houseVisited - 1].onCall = 0;
                dome.markModified("houses");
                io.to("DOME" + callUser.joinedDome).emit(constants.DOMESTATUS, {
                    house: dome.houses[callUser.houseVisited - 1],
                    dome: callUser.joinedDome
                });
                await dome.save();
            }
            callUser.callRequest = null;
            user.callRequest = null;
            await callUser.save();
            await user.save();


        }
    }
}
async function cancelCallRequest(obj, cb, socket, io) {
    let user = await User.findById(obj.user);
    if (user) {
        let callUser = await User.findById(obj.callUser);
        if (callUser) {

            io.to(user.socket_id).emit(constants.CUTCALLRESPONSE, {
                response: 0,

            });
            io.to(callUser.socket_id).emit(constants.CUTCALLRESPONSE, {
                response: 0,

            });
            callUser.callRequest = null;
            user.callRequest = null;
            await callUser.save();
            await user.save();

        }
    }
}

async function sendCallRequest(obj, cb, socket, io) {

    let user = await User.findById(obj.user);
    if (user) {
        let callUser = await User.findById(obj.callUser);
        if (callUser) {
            if (callUser.callRequest == null) {

                let d = {
                    user: obj.user,
                    callUser: obj.callUser,
                    incall: 0,
                    houseId: obj.houseId

                }

                io.to(callUser.socket_id).emit(constants.CALLREQUEST, {

                    message: d
                });
                callUser.callRequest = d;
                await callUser.save();
            }
            else {
                io.to(user.socket_id).emit(constants.CUTCALLRESPONSE, {
                    response: 0,

                });
            }

        }
    }
}

async function seeHouse(obj, cb, socket, io) {
    console.log("see house   " + obj.id + "  " + obj.domeId + "   " + obj.houseId);
    let user = await User.findById(obj.id);
    if (user) {
        let dome = await Dome.findOne({ domeNumber: obj.domeId });
        if (dome) {
            if (!Array.isArray(dome.members)) {
                dome.members = [];
            }
            let found = 0;
            for (let i = 0; i < dome.members.length; i++) {
                if (dome.members[i] == obj.id) {
                    found = 1;
                    break;
                }

            }
            if (found == 0) {
                console.log("DOME FOUND")
                dome.members.push(obj.id);


                if (!Array.isArray(dome.houses)) {
                    dome.houses = [];
                }
                for (let i = 0; i < dome.houses.length; i++) {

                    if (dome.houses[i].houseId == obj.houseId) {
                        if (dome.houses[i].owner == obj.id) {
                            dome.houses[i].inHouse = 1;
                            user.houseVisited = obj.houseId
                            dome.markModified("houses");

                            io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                                house: dome.houses[i],
                                dome: user.joinedDome
                            });
                        }
                        break;

                    }
                }

                //   if (user.joinedDome > 0) {
                //       socket.leave("DOME" + user.joinedDome)
                //   }

                {
                    //   user.joinedDome = obj.domeId+obj.houseId;
                    //   socket.join("DOME" +  user.joinedDome );
                }


                await user.save();
                await dome.save();
                cb({
                    message: 200,
                    id: obj.id
                });
            }
            else {

                if (!Array.isArray(dome.houses)) {
                    dome.houses = [];
                }
                for (let i = 0; i < dome.houses.length; i++) {
                    console.log("DOME NOT FOUND" + user.joinedDome)
                    if (dome.houses[i].houseId == obj.houseId) {
                        if (dome.houses[i].owner == obj.id) {
                            dome.houses[i].inHouse = 1;
                            user.houseVisited = obj.houseId
                            dome.markModified("houses");
                            io.to("DOME" + user.joinedDome).emit(constants.DOMESTATUS, {
                                house: dome.houses[i],
                                dome: user.joinedDome
                            });
                        }
                        break;
                    }
                }
                //   if (user.joinedDome > 0) {
                //socket.leave("DOME" + user.joinedDome)
                //  }
                // user.joinedDome = obj.domeId+obj.houseId;
                // socket.join("DOME" +  user.joinedDome);
                await user.save();
                await dome.save();
                cb({
                    message: 200,
                    id: obj.id
                });
            }


        }
    }

}
async function getTotalDomesCOunt(obj, cb) {

    let count = await Dome.find({ domeNumber: { $gt: 0 } }).count();
    cb({
        domes: count,
    });

}

async function getUnsoldHouse(obj, cb) {
    let dome = await Dome.findOne({ soldHouses: { $lt: 64 } });
    if (dome) {
        cb({
            dome: dome,
        });
    }
    else {
        await createDomes(50);
        let dome = await Dome.findOne({ soldHouses: { $lt: 64 } });
        if (dome) {
            cb({
                dome: dome,
            });
        }
    }
}


async function createDomes(domesToCreate) {
    let count = await Dome.find({ domeNumber: { $gt: 0 } }).count();
    for (let j = 1; j <= domesToCreate; j++) {
        let dome = new Dome();
        if (!Array.isArray(dome.houses)) {
            dome.houses = [];
        }
        for (let i = 1; i <= 64; i++) {
            let d = {
                owner: "",
                houseId: i,
                inHouse: 0,
                onCall: 0,
                items: []

            }
            dome.houses.push(d);

        }
        dome.soldHouses = 0;
        dome.domeNumber = count + j;
        await dome.save();


    }

}

async function buyHouse(obj, cb, socket, io) {
    let user = await User.findById(obj.id);
    if (user) {
        let dome = await Dome.findOne({ domeNumber: obj.domeId });
        if (dome) {
            if (!Array.isArray(dome.houses)) {
                dome.houses = [];
            }
            let changeHappen = 0;
            for (let i = 0; i < dome.houses.length; i++) {
                if (dome.houses[i].owner.length == 0 && obj.houseId == dome.houses[i].houseId) {
                    dome.houses[i].owner = obj.id;
                    dome.markModified("houses");
                    if (!Array.isArray(user.houses)) {
                        user.houses = [];
                    }
                    let d = {
                        dome: obj.domeId,
                        house: obj.houseId,
                        soldTime: Math.floor(new Date().getTime() / 1000)
                    }
                    changeHappen = 1;
                    if (user.houses.length == 0) {
                        user.defaultHouse = 0;
                    }
                    user.houses.push(d);

                    await user.save();
                    dome.soldHouses += 1;
                    let domenew = await Dome.findOne({ domeNumber: 1 });
                    if (domenew) {
                        domenew.totalSoldHouses += 1;

                        if (domenew.totalSoldHouses % 64 == 0) {
                            await createDomes(1);
                        }
                        await domenew.save();
                    }

                    break;
                }
            }
            if (changeHappen == 1) {
                await dome.save();
                io.to("DOME" + obj.domeId).emit(constants.ONHOUSEBUY, {
                    dome: dome
                });
            }
            cb({
                dome: dome,
            });
        }
    }
}

