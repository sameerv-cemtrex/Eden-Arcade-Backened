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
      // object for the item started crafting
      const itemInProgress = {
        itemName: item.name,
        finishingTime: new Date(
          new Date().getTime() +
            item.craftingPrice.find((i) => i.resource === "time").quantity *
              60000
        ).getTime(),
        rewards: item.craftingRewards,
      };

      // reducing the resources from the user
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

      // after the finishing time, emit user the item crafted and the rewards if any
      setTimeOut(async () => {
        const playerStatReward = {};

        // updating the player stats after crafting
        item.craftingRewards.map((i) => {
          playerStatReward[i.resource] = user.playerStat[i.resource]
            ? user.playerStat[i.resource] + i.quantity
            : i.quantity;
        });
        const itemRewards = _.assign(user.playerStat, playerStatReward);

        // removing the item crafting
        user.crafting.craftingInProgressItems.splice(
          _.indexOf(itemInProgress),
          1
        );

        // crafting inventory
        const craftingInventoryItem = {
          mainId: item.category,
          itemId: item.name,
          posX: 0,
          posY: 0,
          rot: 0,
          buyTime: itemInProgress.finishingTime,
          insurance: 0,
          extra: null,
          child: [],
        };

        await User.findOneAndUpdate(
          { _id: user._id },
          {
            crafting: {
              craftingInProgressItems: user.crafting.craftingInProgressItems,
              craftingRewardsInventory: [
                ...user.crafting.craftingRewardsInventory,
                craftingInventoryItem,
              ],
            },
            playerStat: itemRewards,
          }
        );

        io.to(user.socket_id).emit(constants.FINISH_CRAFTING, {
          craftingRewardsInventory: user.crafting.craftingRewardsInventory,
        });
      }, item.craftingPrice.find((i) => i.resource === "time").quantity * 60000);
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
