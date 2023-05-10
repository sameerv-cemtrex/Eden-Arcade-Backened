const db = require("../_helpers/db");
const constants = require("../_helpers/constants");
const mongoose = require("mongoose");
const achievementsData = require("../jsons/achievements.json");

const User = db.User;

const _ = require("lodash");

module.exports = {
  fetchUserAchievementsAndStats,
  updateUserAchievements,
};

//player gets achievements and stats data
async function fetchUserAchievementsAndStats(socket, obj, cb, io) {
  console.log("Fetching user achievements and general stats ");
  let responseObj = {};
  const userId = obj.id;
  let user;
  if (userId) {
    user = await User.findById(userId);
  } else {
    cb({
      status: 400,
      message: "Please provide valid user id",
      data: "",
    });
  }

  if (user) {
    const unlockedAchievements = user.achievements.unlockedAchievements;
    const currentAchievement = user.achievements.currentAchievement;
    const achievements = getAchievementsData(
      achievementsData,
      unlockedAchievements,
      currentAchievement
    );
    const generalStat = user.stat;

    if (achievements && generalStat) {
      responseObj = {
        achievements,
        generalStat,
      };

      cb({
        status: 200,
        message:
          "Achievements and general stats of given user found successfully",
        data: responseObj,
      });
    } else {
      cb({
        status: 404,
        message: constants.DATA_NOT_FOUND,
        data: {},
      });
    }
  }
}

//player updates achievements and stats data
async function updateUserAchievements(socket, obj, cb, io) {
  console.log("Updating user achievements and general stats ");
  let responseObj = {};
  const userId = obj.id;
  const setAchievement = obj.setAchievement;
  let user;
  if (userId) {
    user = await User.findById(userId);
  } else {
    cb({
      status: 400,
      message: "Please provide valid user id",
      data: "",
    });
  }

  if (user) {
    let unlockedAchievements = user.achievements.unlockedAchievements;
    let currentAchievement = user.achievements.currentAchievement;
    let result;
    if (currentAchievement && unlockedAchievements) {
      result = achievementsData.filter((item) => item.Title === setAchievement);

      if (result) {
        console.log("result =>", result);

        unlockedAchievements.map((i) => i.Title === setAchievement);
        if (unlockedAchievements) {
          const ca = result[0];
          user.achievements.currentAchievement = {
            Title: ca.Title,
            Value: ca.Value,
            Variable: ca.Variable,
          };
          user.markModified("achievements");
          await user.save();
        }
      } else {
        cb({
          status: 422,
          message: "Unprocessable Entity",
          data: "",
        });
      }
    }

    const unlockedData = user.achievements.unlockedAchievements;
    const currentData = user.achievements.currentAchievement;

    const achievements = getAchievementsData(
      achievementsData,
      unlockedData,
      currentData
    );

    responseObj = {
      achievements,
      generalStat: user.stat,
    };

    cb({
      status: 201,
      message: "Updated user achievement",
      data: responseObj,
    });
  } else {
    cb({
      status: 404,
      message: "Please provide valid user id",
      data: "",
    });
  }
}

const getAchievementsData = (
  allAchievements,
  unlockedAchievements,
  currentAchievement
) => {
  const updatedAchievements = allAchievements.map((achievement) => {
    const isUnlocked = unlockedAchievements.some(
      (unlocked) => unlocked.Title === achievement.Title
    );
    const isCurrent = currentAchievement.Title === achievement.Title;
    return { ...achievement, IsUnlocked: isUnlocked, IsCurrent: isCurrent };
  });
  return updatedAchievements;
};
