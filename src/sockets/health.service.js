const db = require("../_helpers/db");
const _ = require("lodash");
const User = db.User;

const healthUpdate = async (socket, obj, cb, io) => {
  try {
    const user = await User.findById(obj.id);
    _.assign(user.health, obj.health);
    await user.save();

    cb({
      status: 200,
      message: "health updated",
      data: user.health,
    });
  } catch (err) {
    cb({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = {
  healthUpdate,
};
