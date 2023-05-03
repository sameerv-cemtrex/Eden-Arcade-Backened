const express = require("express");
const db = require("../_helpers/db");
const router = express.Router();
const _ = require("lodash");

const User = db.User;

/**
 * `PUT` - update the user avatar
 */
router.put("/user/avatar/:accountId", async function (req, res) {
  const { accountId } = req.params;
  const { avatar } = req.body;
  try {
    const userFound = await User.findOne({ accountId: accountId });

    const newUser = _.assign(userFound, {
      avatar: avatar,
    });

    userFound.markModified("avatar");
    await userFound.save();

    res.status(200).json({
      status: true,
      message: "Avatar updated successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err,
    });
  }
});

/**
 * `PUT` - update the user character model
 */
router.put("/user/character-model/:accountId", async (req, res) => {
  const { accountId } = req.params;
  const { characterModel } = req.body;

  const user = await User.findOne({ accountId: accountId });
  const newUser = _.assign(user, {
    characterModel: characterModel,
  });

  user.markModified("characterModel");
  await user.save();

  res.status(200).json({
    status: true,
    message: "Character model has been updated",
    data: newUser,
  });
});

module.exports = router;
