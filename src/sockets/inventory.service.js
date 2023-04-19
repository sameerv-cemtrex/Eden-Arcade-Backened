const { use } = require("../routers/user");
const db = require("../_helpers/db");
const User = db.User;
const gungeneration = require("./gun.service");

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
};

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
    if(obj.inventory.category==="Gun")
    {
   //   gun = gungeneration.generateGun("A", obj.inventory.name);
     // obj.inventory.extra = gun;
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

// temporary
async function updateCraftingRewardsInventory(obj, cb) {
  let user = await User.findById(obj.id);
  if (user) {
    if (!Array.isArray(user.crafting.craftingRewardsInventory)) {
      user.crafting.craftingRewardsInventory = [];
    }
    user.crafting.craftingRewardsInventory.push(obj.inventory);
    await user.save();
    cb({
      inventory: user.inventory,
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
