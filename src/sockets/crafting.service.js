const db = require("../_helpers/db");

const User = db.User;
const Items = db.Items;
const constants = require("../_helpers/constants");

const _ = require("lodash");

async function  startCraftingItem (socket, obj, cb, io)  {
 
  const user = await User.findById(obj.id);
  const item = await Items.findOne({ name: obj.itemName });
  console.log("Starting the crafting process " +user  + "    "+item);
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

      user.resources = resources;
     user.crafting.craftingInProgressItems = [
       ...user.crafting.craftingInProgressItems,
       itemInProgress,
      ];

      user.markModified("resources");
      user.markModified("crafting");
      await user.save();
      // const updatedUser = await User.findOneAndUpdate(
      //   { _id: user._id },
      //   {
      //     resources,
      //     crafting: {
      //       craftingInProgressItems: [
      //         ...user.crafting.craftingInProgressItems,
      //         itemInProgress,
      //       ],
      //     },
      //   },
      //   { new: true },
      //   function (err, user) {
      //     if (err) {
      //       cb({
      //         status: 401,
      //         message: err,
      //       });
      //     }
      //     // console.log("updated user ===>", user);
      //   }
      // );

      cb({
        status: 200,
        message: "Item crafting started",
        data: user.crafting,
      });
    
      // after the finishing time, emit user the item crafted and the rewards if any
      setTimeout(async () => {
        console.log("CRAFTING STARTED")
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
      },  item.craftingPrice.find((i) => i.resource === "time").quantity * 1000);
   
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
