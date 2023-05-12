const { use } = require("../routers/user");
const db = require("../_helpers/db");
const User = db.User;
const gunGeneration = require("./gun.service");
const constants = require("../_helpers/constants");
const inventoryJson = require("../jsons/InitialInventory");
module.exports = {
  getInevntory,
  addItemInInventory,
  deleteInventory,
  deleteItemInInventory,
  setLoadOut,
  updateUserInventory,
  updateUserLoadOut,
  addItemUserInventory,
  consumeItemUserInventory,
  updateUserInsuranceItems,
  updateCraftingRewardsInventory,
  generateInitialInventory
};
async function generateInitialInventory() {

  let finalInventory = [];
  let buyTime = Date.now();
 
  for (let i = 0; i < inventoryJson.inventory.length; i++) {
    buyTime++;
    if(inventoryJson.inventory[i].category=== "Gun")
   {
      let inventory = inventoryJson.inventory[i];
      let gun = await gunGeneration.generateGun(1, inventoryJson.inventory[i].name, "", 0);
      inventory.extra = gun;
      inventory.buyTime = buyTime;
      finalInventory.push(inventory);
    
    }
    else {
      let inventory = inventoryJson.inventory[i];
      inventory.buyTime = buyTime
      finalInventory.push(inventory);
    }
  }
  return finalInventory;

}
async function deleteInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    while (user.inventory.length > 0) {
      user.inventory.pop();
    }
    await user.save();
  }
}

async function deleteItemInInventory(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    let d = {
      mainId: obj.mainId,
      id: obj.itemId,
    };
    user.inventory.pull(d);
    await user.save();
    cb({
      inventory: user.inventory,
    });
  }
}

async function getInevntory(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    cb({
      inventory: user.inventory,
      loadout: user.loadout,
    });
  }
}

async function addItemInInventory(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    /* let found = 0;
    for (let i = 0; i < user.inventory.length; i++) {
      if (user.inventory[i].mainId.length == obj.mainId.length
        && user.inventory[i].id.length == obj.itemId.length) {
        for (let j = 0; j < user.inventory[i].mainId.length; j++) {
          if (user.inventory[i].mainId[j] == obj.mainId[j]
            && user.inventory[i].id[j] == obj.itemId[j]) {
            user.inventory[i].quantity += 1;
            user.markModified("inventory");
            found = 1;
            break;
          }
        }
      }
      if (found == 1) {
        break;
      }
    } */
    //  if (found == 0) {
    let d = {
      mainId: obj.mainId,
      id: obj.itemId,
    };
    user.inventory.push(d);
    //  }
    await user.save();
    cb({
      inventory: user.inventory,
    });

    /*  x:obj.x,
     y:obj.y,
    rot:obj.rot */
  }
}

async function updateUserLoadOut(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    user.loadout = obj.loadout;
    await user.save();
    cb({
      loadout: user.loadout,
    });
  }
}

async function consumeItemUserInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    obj.inventory.buyTime = Math.floor(new Date().getTime() / 1000);
    user.inventory.push(obj.inventory);
    await user.save();
    cb({
      inventory: user.inventory,
    });
  }
}

async function setLoadOut(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    user.loadout = obj.loadout;
    await user.save();
    cb({
      loadout: user.loadout,
    });
  }
}

async function addItemUserInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    obj.inventory.buyTime = Math.floor(new Date().getTime() / 1000);
    console.log("obj  " + JSON.stringify(obj));
    if (obj.inventory.category === "Gun") {
      gun = await gungeneration.generateGun("A", obj.inventory.name, obj.id, 1);
      obj.inventory.extra = gun;
    }

    user.inventory.push(obj.inventory);
    await user.save();
    cb({
      inventory: user.inventory,
    });
  }
}

async function updateUserInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }
    user.inventory = obj.inventory;
    await user.save();
    cb({
      inventory: user.inventory,
    });
  }
}

async function updateCraftingRewardsInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.crafting.craftingRewardsInventory)) {
      user.crafting.craftingRewardsInventory = [];
    }
    user.crafting.craftingRewardsInventory = obj.inventory;
    await user.save();
    cb({
      inventory: user.crafting.craftingRewardsInventory,
    });
  }
}

async function updateUserInsuranceItems(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.insurance)) {
      user.insurance = [];
    }
    user.insurance = obj.insurance;
    await user.save();
    cb({
      insurance: user.insurance,
    });
  }
}

async function getStat(obj, socket, io) {
  let user = await User.findById(obj.id);

  if (user) {
    io.to(user.socket_id).emit(constants.GET_USER_STATS, {
      stats: user.stat,
    });
  }
}

async function getPlayerStat(obj, socket, io) {
  let user = await User.findById(obj.id);

  if (user) {
    io.to(user.socket_id).emit(constants.GET_PLAYERSTAT, {
      stats: user.playerStat,
    });
  }
}

async function getPlayerResources(obj, socket, io) {
  let user = await User.findById(obj.id);

  if (user) {
    io.to(user.socket_id).emit(constants.GET_PLAYERSTAT, {
      stats: user.resources,
    });
  }
}
