const db = require("../_helpers/db");

const User = db.User;
const Items = db.Items;

const _ = require("lodash");

const startCraftingItem = async (socket, obj, cb, io) => {
  console.log("Starting the crafting process ");
  const user = await User.findById(obj.id);
  const item = await Items.findOne({ name: obj.itemName });

  if (user && item) {
    const resources = user.resources;

    try {
      const itemInProgress = {
        itemName: item.name,
        finishingTime: new Date(
          new Date().getTime() +
            item.craftingPrice.find((i) => i.resource === "time").quantity *
              60000
        ).getTime(),
        rewards: item.craftingRewards,
      };

      item.craftingPrice.map((item) => {
        if (item.resource !== "time") {
          resources[item.resource] -= item.quantity;
        }
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          resources,
          crafting: {
            craftingInProgressItems: [
              ...user.crafting.craftingInProgressItems,
              itemInProgress,
            ],
          },
        },
        { new: true },
        function (err, user) {
          if (err) {
            cb({
              status: 401,
              message: err,
            });
          }
          // console.log("updated user ===>", user);
        }
      );

      cb({
        status: 200,
        message: "Item crafting started",
        data: itemInProgress,
      });
    } catch (err) {
      cb({
        status: 500,
        message: err.message,
      });
    }
  }
};

module.exports = {
  startCraftingItem,
};
