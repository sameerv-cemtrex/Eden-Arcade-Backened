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
              1000
        ).getTime(),
        rewards: item.craftingRewards,
      };

      // reducing the resources from the user
      item.craftingPrice.map((item) => {
        if (item.resource !== "time") {
          resources[item.resource] -= item.quantity;
        }
      });

      user.resources = resources;
      user.crafting.craftingInProgressItems = [
        ...user.crafting.craftingInProgressItems,
        itemInProgress,
      ];

      user.markModified("resources");
      user.markModified("crafting");
      await user.save();

      cb({
        status: 200,
        message: "Item crafting started",
        data: user.crafting,
      });

      // after the finishing time, emit user the item crafted and the rewards if any
      console.log(
        "finish crafting time",
        item.craftingPrice.find((i) => i.resource === "time").quantity * 1000
      );
      setTimeOut(async () => {
        console.log("finish crafting called");
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
          category: item.category,
          name: item.name,
          posX: 0,
          posY: 0,
          rot: 0,
          buyTime: itemInProgress.finishingTime,
          insurance: 0,
          extra: null,
          child: [],
        };

        user.crafting.craftingRewardsInventory = [
          ...user.crafting.craftingRewardsInventory,
          craftingInventoryItem,
        ];
        user.playerStat = itemRewards;

        user.markModified("playerStat");
        user.markModified("crafting");
        await user.save();

        io.to(user.socket_id).emit(constants.FINISH_CRAFTING, {
          craftingRewardsInventory: user.crafting.craftingRewardsInventory,
        });
      }, 30000);
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
