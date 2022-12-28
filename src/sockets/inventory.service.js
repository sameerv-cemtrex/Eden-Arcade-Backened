
const { use } = require("../routers/user");
const db = require("../_helpers/db");
const User = db.User;


module.exports = {
  getInevntory,
  addItemInInventory,
  deleteInventory,
  deleteItemInInventory,
  setLoadOut
};

async function setLoadOut(obj, cb) {
  console.log("get inventory" + obj);
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.loadout)) {
      user.loadout = [];
    }
    user.loadout = obj.loadout;
    await user.save();
    cb({
      loadout: user.loadout,
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
    }
    user.inventory.pull(d);
    await user.save();
    cb({
      inventory: user.inventory,
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
    let found = 0;
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
    }
    if (found == 0) {
      let d = {
        mainId: obj.mainId,
        id: obj.itemId,
        quantity: 1
      }
      user.inventory.push(d);
    }
    await user.save();
    cb({
      inventory: user.inventory,
    });

  }
}