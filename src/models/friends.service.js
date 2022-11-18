const db = require("../_helpers/db");
const mongoose = require("mongoose");
const User = db.User;
const UserPacks = db.UserPacks;
module.exports = {
    acceptRequest,
    rejectRequest,
    sendRequest

};

async function acceptRequest(obj, cb, socket, io) {
    let requestUserPack = await UserPacks.findById(obj.requestId);
    let userPack = await UserPacks.findById(obj.id);

    if (userPack && requestUserPack) {

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
            cb({
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
            cb({
                message: userPack,
                status: 200
            });
            let requestUser = await User.findOne({ userPackId: obj.requestId });
            if (requestUser) {
                io.to(requestUser.socket_id).emit('FRIENDREQUESTACCEPTED', {
                    id: obj.id,
                    requestId: obj.requestId,
                    status: 200
                });
            }

        }
    }

}
async function rejectRequest(obj, cb, socket, io) {
    let requestUserPack = await UserPacks.findById(obj.requestId);
    let userPack = await UserPacks.findById(obj.id);

    if (userPack && requestUserPack) {

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
        cb({
            message: userPack,
            status: 200
        });
    }

}

async function sendRequest(obj, cb, socket, io) {
    let requestUserPack = await UserPacks.findById(obj.requestId);
    let userPack = await UserPacks.findById(obj.id);

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
            cb({
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
            cb({
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
            cb({
                message: "Request Send",
                status: 200
            });
            let requestUser = await User.findOne({ userPackId: obj.requestId });
            if (requestUser) {
                io.to(requestUser.socket_id).emit('FRIENDREQUESTRECEIVED', {
                    id: obj.id,
                    requestId: obj.requestId,
                    status: 200
                });
            }
        }

    }
}