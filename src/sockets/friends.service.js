const db = require("../_helpers/db");
const mongoose = require("mongoose");
const constants = require("../_helpers/constants");
const User = db.User;
module.exports = {
    acceptRequest,
    rejectRequest,
    sendRequest,
    unFriend
};

async function unFriend(obj, cb, socket, io) {
    let requestUser = await User.findById(obj.requestId);
    let user = await User.findById(obj.id);

    if (user && requestUser) {
        if (!Array.isArray(requestUser.friends)) {
            requestUser.friends = [];
        }
        if (!Array.isArray(user.friends)) {
            user.friends = [];
        }
        let d ={
            id:user._id,
            time:obj.time

        }
        requestUser.friends.pull(d);
        let d1 ={
            id:requestUser._id,
            time:obj.time

        }
        user.friends.pull(d1);
        await user.save();
        await requestUser.save();
        cb({
            message: user,
            status: 200
        });
    }
}

async function acceptRequest(obj, cb, socket, io) {
    let requestUser = await User.findById(obj.requestId);
    let user = await User.findById(obj.id);

    if (user && requestUser) {

        if (!Array.isArray(requestUser.notificationRequest)) {
            requestUser.notificationRequest = [];
        }
        if (!Array.isArray(user.requestsSend)) {
            user.requestsSend = [];

        }
        if (!Array.isArray(user.friends)) {
            user.friends = [];
        }

        let alreadyFriend = false
        for (let i = 0; i < user.friends.length; i++) {
            if (JSON.stringify(user.friends[i]) == JSON.stringify(requestUser._id)) {
                alreadyFriend = true;
                break;
            }
        }
        if (alreadyFriend) {
            user.notificationRequest.pull(requestUser._id);
            requestUser.requestsSend.pull(user._id);
            await user.save();
            await requestUser.save();
            cb({
                message: "Already A Friend",
                status: 200
            });

        }

        if (!alreadyFriend) {
            let t =Date.now();
            let d={
                id:requestUser._id,
                time:t
            }
            user.friends.push(d);
            let d1={
                id:user._id,
                time:t
            }
            requestUser.friends.push(d1);

            requestUser.notificationRequest.pull(user._id);
            user.requestsSend.pull(requestUser._id);
            await user.save();
            await requestUser.save();

            cb({
                message: user,
                status: 200
            });
          //  let requestUser = await User.findOne({ userPackId: obj.requestId });
           // if (requestUser) {
                io.to(requestUser.socket_id).emit(constants.FRIENDREQUESTACCEPTED, {
                    id: obj.id,
                    requestId: obj.requestId,
                    status: 200
                });
          //  }

        }
    }

}
async function rejectRequest(obj, cb, socket, io) {
    let requestUser = await User.findById(obj.requestId);
    let user = await User.findById(obj.id);

    if (user && requestUser) {

        if (!Array.isArray(requestUser.notificationRequest)) {
            requestUser.notificationRequest = [];
        }
        if (!Array.isArray(user.requestsSend)) {
            user.requestsSend = [];

        }

        requestUser.notificationRequest.pull(user._id);
        user.requestsSend.pull(requestUser._id);
        await user.save();
        await requestUser.save();
        cb({
            message: user,
            status: 200
        });
    }

}

async function sendRequest(obj, cb, socket, io) {
    let requestUser = await User.findById(obj.requestId);
    let user = await User.findById(obj.id);

    if (user && requestUser) {
        if (!Array.isArray(user.friends)) {
            user.friends = [];
        }
        let alreadyFriend = false;
        let alreadyFriendRequestSend = false;

        if (!Array.isArray(user.requestsSend)) {
            user.requestsSend = [];

        }

        for (let i = 0; i < user.friends.length; i++) {
            if (JSON.stringify(user.friends[i]) == JSON.stringify(requestUser._id)) {
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
            for (let i = 0; i < user.requestsSend.length; i++) {
                if (JSON.stringify(user.requestsSend[i]) == JSON.stringify(requestUser._id)) {

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
            if (!Array.isArray(requestUser.notificationRequest)) {
                requestUser.notificationRequest = [];
            }
            user.requestsSend.push(requestUser._id);
            requestUser.notificationRequest.push(user._id);
            await user.save();
            await requestUser.save();
            cb({
                message: "Request Send",
                status: 200
            });
         //   let requestUser = await User.findOne({ userPackId: obj.requestId });
          //  if (requestUserPack) {
                io.to(requestUser.socket_id).emit(constants.FRIENDREQUESTRECEIVED, {
                    id: obj.id,
                    requestId: obj.requestId,
                    status: 200
                });
          //  }
        }

    }
}