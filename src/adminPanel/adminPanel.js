const express = require("express");
const db = require("../_helpers/db");
const NpcStatic = db.NpcStatic;
const WeaponStatic = db.WeaponStatic;
const ArmorStatic = db.ArmorStatic;
const AmmosStatic = db.AmmosStatic;
const BagPackStatic = db.BagPackStatic;
const TaskStatic = db.TaskStatic;
const AttributeStatic = db.AttributeStatic;



module.exports = {
  deleteData,
  editData,
  addAllData,
  addData,
  getData,
  getSingleData
};

async function getSingleData(req, res) {
  console.log(req.params +"   "+req.params.category +"   "+req.params._id)
  if (req.params.category == "npcStatic") {
    let npc = await NpcStatic.findById(req.params._id);
    res.status(200).send({
      message: npc
    });
  }
  else if (req.params.category == "weaponsStatic") {
    let weapons = await WeaponStatic.findById(req.params._id);
    res.status(200).send({
      message: weapons
    });
  }
  else if (req.params.category == "ammosStatic") {
    let ammos = await AmmosStatic.findById(req.params._id);
    res.status(200).send({
      message: ammos
    });
  }
  else if (req.params.category == "armorStatic") {
    let armor = await ArmorStatic.findById(req.params._id);
    res.status(200).send({
      message: armor
    });
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPack = await BagPackStatic.findById(req.params._id);
    res.status(200).send({
      message: bagPack
    });
  }
  else if (req.params.category == "taskStatic") {
    let task = await TaskStatic.findById(req.params._id);
    res.status(200).send({
      message: task
    });
  }
  else if (req.params.category == "attributeStatic") {
    let attributes = await AttributeStatic.findById(req.params._id);
    res.status(200).send({
      message: attributes
    });
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
}


async function getData(req, res) {
  if (req.params.category == "npcStatic") {
    let npc = await NpcStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: npc
    });
  }
  else if (req.params.category == "weaponsStatic") {
    let weapons = await WeaponStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: weapons
    });
  }
  else if (req.params.category == "ammosStatic") {
    let ammos = await AmmosStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: ammos
    });
  }
  else if (req.params.category == "armorStatic") {
    let armor = await ArmorStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: armor
    });
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPack = await BagPackStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: bagPack
    });
  }
  else if (req.params.category == "taskStatic") {
    let task = await TaskStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: task
    });
  }
  else if (req.params.category == "attributeStatic") {
    let attributes = await AttributeStatic.find({ name: { "$exists": true } });
    res.status(200).send({
      message: attributes
    });
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
}

async function addData(req, res) {
  if (req.params.category == "npcStatic") {
    let npcStatic = new NpcStatic();
    npcStatic.level = req.body.level;
    npcStatic.enemy = req.body.enemy;
    npcStatic.health = req.body.health;
    npcStatic.damage = req.body.damage;
    npcStatic.fireRate = req.body.fireRate;
    npcStatic.range = req.body.range;
    npcStatic.name = req.body.name;
    npcStatic.exp = req.body.exp;
    npcStatic.movementSpeed = req.body.movementSpeed;
    npcStatic.desc = req.body.desc;
    await npcStatic.save();
    res.status(200).send({
      status: 200,
      message: npcStatic
    });
  }
  else if (req.params.category == "weaponsStatic") {
    let weaponsStatic = new WeaponStatic();
    if (weaponsStatic) {
      weaponsStatic.id = req.body.id;
      weaponsStatic.type = req.body.type;
      weaponsStatic.weight = req.body.weight;
      weaponsStatic.damage = req.body.damage;
      weaponsStatic.fireSpread = req.body.fireSpread;
      weaponsStatic.gunFireMode = req.body.gunFireMode;
      weaponsStatic.name = req.body.name;
      weaponsStatic.exp = req.body.exp;
      weaponsStatic.screenShakeIntensity = req.body.screenShakeIntensity;
      weaponsStatic.desc = req.body.desc;
      weaponsStatic.screenShakeDuration = req.body.screenShakeDuration;
      weaponsStatic.magazineSize = req.body.magazineSize;
      weaponsStatic.gunShotIntensity = req.body.gunShotIntensity;
      weaponsStatic.shootingRange = req.body.shootingRange;
      weaponsStatic.muzzleFlashIntensity = req.body.muzzleFlashIntensity;
      weaponsStatic.recoil = req.body.recoil;
      weaponsStatic.fireRate = req.body.fireRate;
      weaponsStatic.reloadTime = req.body.reloadTime;
      weaponsStatic.bulletShotAudioClip = req.body.bulletShotAudioClip;
      weaponsStatic.bulletHolePrefab = req.body.bulletHolePrefab;
      weaponsStatic.ammoType = req.body.ammoType;
      await weaponsStatic.save();
      res.status(200).send({
        status: 200,
        message: weaponsStatic
      });
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = new AmmosStatic();
    if (ammosStatic) {
      ammosStatic.id = req.body.id;
      ammosStatic.type = req.body.type;
      ammosStatic.weight = req.body.weight;
      ammosStatic.damage = req.body.damage;
      ammosStatic.name = req.body.name;
      ammosStatic.exp = req.body.exp;
      ammosStatic.desc = req.body.desc;
      await ammosStatic.save();
      res.status(200).send({
        status: 200,
        message: ammosStatic
      });
    }
  }
  else if (req.params.category == "armorStatic") {
    let armorStatic = new ArmorStatic();
    if (armorStatic) {
      armorStatic.id = req.body.id;
      armorStatic.type = req.body.type;
      armorStatic.weight = req.body.weight;
      armorStatic.shield = req.body.shield;
      armorStatic.name = req.body.name;
      armorStatic.exp = req.body.exp;
      armorStatic.desc = req.body.desc;
      await armorStatic.save();
      res.status(200).send({
        status: 200,
        message: armorStatic
      });
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = new BagPackStatic();
    if (bagPackStatic) {
      bagPackStatic.id = req.body.id;
      bagPackStatic.type = req.body.type;
      bagPackStatic.capacity = req.body.capacity;
      bagPackStatic.name = req.body.name;
      bagPackStatic.exp = req.body.exp;
      bagPackStatic.desc = req.body.desc;
      await bagPackStatic.save();
      res.status(200).send({
        status: 200,
        message: bagPackStatic
      });
    }
  }
  else if (req.params.category == "taskStatic") {
    let taskStatic = new TaskStatic();
    if (taskStatic) {
      taskStatic.id = req.body.id;
      taskStatic.type = req.body.type;
      taskStatic.giver = req.body.giver;
      taskStatic.reward = req.body.reward;
      taskStatic.name = req.body.name;
      taskStatic.exp = req.body.exp;
      taskStatic.desc = req.body.desc;
      await taskStatic.save();
      res.status(200).send({
        status: 200,
        message: taskStatic
      });
    }
  }
  else if (req.params.category == "attributeStatic") {
    let attributesStatic = new AttributeStatic();
    if (attributesStatic) {
      taskStatic.values = req.body.values;
      taskStatic.name = req.body.name;
      await attributesStatic.save();
      res.status(200).send({
        status: 200,
        message: attributesStatic
      });
    }
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
}

async function addAllData(req, res) {
  if (req.params.category == "npcStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let npcStatic = new NpcStatic();
      npcStatic.level = req.body.level;
      npcStatic.enemy = req.body.enemy;
      npcStatic.health = req.body.health;
      npcStatic.damage = req.body.damage;
      npcStatic.fireRate = req.body.fireRate;
      npcStatic.range = req.body.range;
      npcStatic.name = req.body.name;
      npcStatic.exp = req.body.exp;
      npcStatic.movementSpeed = req.body.movementSpeed;
      npcStatic.desc = req.body.desc;
      await npcStatic.save();
      res.status(200).send({
        status: 200,
        message: npcStatic
      });
    }
  }

  else if (req.params.category == "weaponsStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let weaponsStatic = new WeaponStatic();
      if (weaponsStatic) {
        weaponsStatic.id = req.body.id;
        weaponsStatic.type = req.body.type;
        weaponsStatic.weight = req.body.weight;
        weaponsStatic.damage = req.body.damage;
        weaponsStatic.fireSpread = req.body.fireSpread;
        weaponsStatic.gunFireMode = req.body.gunFireMode;
        weaponsStatic.name = req.body.name;
        weaponsStatic.exp = req.body.exp;
        weaponsStatic.screenShakeIntensity = req.body.screenShakeIntensity;
        weaponsStatic.desc = req.body.desc;
        weaponsStatic.screenShakeDuration = req.body.screenShakeDuration;
        weaponsStatic.magazineSize = req.body.magazineSize;
        weaponsStatic.gunShotIntensity = req.body.gunShotIntensity;
        weaponsStatic.shootingRange = req.body.shootingRange;
        weaponsStatic.muzzleFlashIntensity = req.body.muzzleFlashIntensity;
        weaponsStatic.recoil = req.body.recoil;
        weaponsStatic.fireRate = req.body.fireRate;
        weaponsStatic.reloadTime = req.body.reloadTime;
        weaponsStatic.bulletShotAudioClip = req.body.bulletShotAudioClip;
        weaponsStatic.bulletHolePrefab = req.body.bulletHolePrefab;
        weaponsStatic.ammoType = req.body.ammoType;
        await weaponsStatic.save();
        res.status(200).send({
          status: 200,
          message: weaponsStatic
        });
      }
    }
  }
  else if (req.params.category == "ammosStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let ammosStatic = new AmmosStatic();
      if (ammosStatic) {
        ammosStatic.id = req.body.id;
        ammosStatic.type = req.body.type;
        ammosStatic.weight = req.body.weight;
        ammosStatic.damage = req.body.damage;
        ammosStatic.name = req.body.name;
        ammosStatic.exp = req.body.exp;
        ammosStatic.desc = req.body.desc;
        await ammosStatic.save();
        res.status(200).send({
          status: 200,
          message: ammosStatic
        });
      }
    }
  }

  else if (req.params.category == "armorStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let armorStatic = new ArmorStatic();
      if (armorStatic) {
        armorStatic.id = req.body.id;
        armorStatic.type = req.body.type;
        armorStatic.weight = req.body.weight;
        armorStatic.shield = req.body.shield;
        armorStatic.name = req.body.name;
        armorStatic.exp = req.body.exp;
        armorStatic.desc = req.body.desc;
        await armorStatic.save();
        res.status(200).send({
          status: 200,
          message: armorStatic
        });
      }
    }
  }
  else if (req.params.category == "bagPackStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let bagPackStatic = new BagPackStatic();
      if (bagPackStatic) {
        bagPackStatic.id = req.body.id;
        bagPackStatic.type = req.body.type;
        bagPackStatic.capacity = req.body.capacity;
        bagPackStatic.name = req.body.name;
        bagPackStatic.exp = req.body.exp;
        bagPackStatic.desc = req.body.desc;
        await bagPackStatic.save();
        res.status(200).send({
          status: 200,
          message: bagPackStatic
        });
      }
    }
  }

  else if (req.params.category == "taskStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let taskStatic = new TaskStatic();
      if (taskStatic) {
        taskStatic.id = req.body.id;
        taskStatic.type = req.body.type;
        taskStatic.giver = req.body.giver;
        taskStatic.reward = req.body.reward;
        taskStatic.name = req.body.name;
        taskStatic.exp = req.body.exp;
        taskStatic.desc = req.body.desc;
        await taskStatic.save();
        res.status(200).send({
          status: 200,
          message: taskStatic
        });
      }
    }
  }

  else if (req.params.category == "attributeStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let attributesStatic = new AttributeStatic();
      if (attributesStatic) {
        taskStatic.values = req.body.values;
        taskStatic.name = req.body.name;
        await attributesStatic.save();
        res.status(200).send({
          status: 200,
          message: attributesStatic
        });
      }
    }
  }
}


async function editData(req, res) {
  console.log(req.params);
  if (req.params.category == "npcStatic") {
    let npcStatic = await NpcStatic.findById(req.params._id);
    if (npcStatic) {
      npcStatic.level = req.body.level;
      npcStatic.enemy = req.body.enemy;
      npcStatic.health = req.body.health;
      npcStatic.damage = req.body.damage;
      npcStatic.fireRate = req.body.fireRate;
      npcStatic.range = req.body.range;
      npcStatic.name = req.body.name;
      npcStatic.exp = req.body.exp;
      npcStatic.movementSpeed = req.body.movementSpeed;
      npcStatic.desc = req.body.desc;
      await npcStatic.save();
      res.status(200).send({
        status: 200,
        message: npcStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "weaponsStatic") {
    let weaponsStatic = await WeaponStatic.findById(req.params._id);
    if (weaponsStatic) {
      weaponsStatic.id = req.body.id;
      weaponsStatic.type = req.body.type;
      weaponsStatic.weight = req.body.weight;
      weaponsStatic.damage = req.body.damage;
      weaponsStatic.fireSpread = req.body.fireSpread;
      weaponsStatic.gunFireMode = req.body.gunFireMode;
      weaponsStatic.name = req.body.name;
      weaponsStatic.exp = req.body.exp;
      weaponsStatic.screenShakeIntensity = req.body.screenShakeIntensity;
      weaponsStatic.desc = req.body.desc;
      weaponsStatic.screenShakeDuration = req.body.screenShakeDuration;
      weaponsStatic.magazineSize = req.body.magazineSize;
      weaponsStatic.gunShotIntensity = req.body.gunShotIntensity;
      weaponsStatic.shootingRange = req.body.shootingRange;
      weaponsStatic.muzzleFlashIntensity = req.body.muzzleFlashIntensity;
      weaponsStatic.recoil = req.body.recoil;
      weaponsStatic.fireRate = req.body.fireRate;
      weaponsStatic.reloadTime = req.body.reloadTime;
      weaponsStatic.bulletShotAudioClip = req.body.bulletShotAudioClip;
      weaponsStatic.bulletHolePrefab = req.body.bulletHolePrefab;
      weaponsStatic.ammoType = req.body.ammoType;
      await weaponsStatic.save();
      res.status(200).send({
        status: 200,
        message: weaponsStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = await AmmosStatic.findById(req.params._id);
    if (ammosStatic) {
      ammosStatic.id = req.body.id;
      ammosStatic.type = req.body.type;
      ammosStatic.weight = req.body.weight;
      ammosStatic.damage = req.body.damage;
      ammosStatic.name = req.body.name;
      ammosStatic.exp = req.body.exp;
      ammosStatic.desc = req.body.desc;
      await ammosStatic.save();
      res.status(200).send({
        status: 200,
        message: ammosStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "armorStatic") {
    console.log(req.body);
    let armorStatic = await ArmorStatic.findById(req.params._id);
    if (armorStatic) {
    
      armorStatic.id = req.body.id;
      armorStatic.type = req.body.type;
      armorStatic.weight = req.body.weight;
      armorStatic.shield = req.body.shield;
      armorStatic.name = req.body.name;
      armorStatic.exp = req.body.exp;
      armorStatic.desc = req.body.desc;
      await armorStatic.save();
      res.status(200).send({
        status: 200,
        message: armorStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = await BagPackStatic.findById(req.params._id);
    if (bagPackStatic) {
      bagPackStatic.id = req.body.id;
      bagPackStatic.type = req.body.type;
      bagPackStatic.capacity = req.body.capacity;
      bagPackStatic.name = req.body.name;
      bagPackStatic.exp = req.body.exp;
      bagPackStatic.desc = req.body.desc;
      await bagPackStatic.save();
      res.status(200).send({
        status: 200,
        message: bagPackStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }

  else if (req.params.category == "taskStatic") {
    let taskStatic = await TaskStatic.findById(req.params._id);
    if (taskStatic) {
      taskStatic.id = req.body.id;
      taskStatic.type = req.body.type;
      taskStatic.giver = req.body.giver;
      taskStatic.reward = req.body.reward;
      taskStatic.name = req.body.name;
      taskStatic.exp = req.body.exp;
      taskStatic.desc = req.body.desc;
      await taskStatic.save();
      res.status(200).send({
        status: 200,
        message: taskStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }

  else if (req.params.category == "attributeStatic") {
    let attributesStatic = await AttributeStatic.findById(req.params._id);
    if (attributesStatic) {
      taskStatic.values = req.body.values;
      taskStatic.name = req.body.name;
      await attributesStatic.save();
      res.status(200).send({
        status: 200,
        message: attributesStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
}

async function deleteData(req, res) {
  if (req.params.category == "npcStatic") {
    let npcStatic = await NpcStatic.findById(req.params._id);
    if (npcStatic) {
      await npcStatic.remove();
      res.status(200).send({
        status: 200,
        message: npcStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "weaponsStatic") {
    let weaponStatic = await WeaponStatic.findById(req.params._id);
    if (weaponStatic) {
      await weaponStatic.remove();
      res.status(200).send({
        status: 200,
        message: weaponStatic
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = await AmmosStatic.findById(req.params._id);
    if (ammosStatic) {
      await ammosStatic.remove();
      res.status(200).send({
        status: 200

      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "armorStatic") {
    let armorStatic = await ArmorStatic.findById(req.params._id);
    if (armorStatic) {
      await armorStatic.remove();
      res.status(200).send({
        status: 200

      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = await BagPackStatic.findById(req.params._id);
    if (bagPackStatic) {
      await bagPackStatic.remove();
      res.status(200).send({
        status: 200
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else if (req.params.category == "taskStatic") {
    let taskStatic = await TaskStatic.findById(req.params._id);
    if (taskStatic) {
      await taskStatic.remove();
      res.status(200).send({
        status: 200

      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }

  else if (req.params.category == "attributeStatic") {
    let attributeStatic = await AttributeStatic.findById(req.params._id);
    if (attributeStatic) {
      await attributeStatic.remove();
      res.status(200).send({
        status: 200
      });
    }
    else {
      res.status(400).send({
        message: "Not Found"
      });
    }
  }
  else {
    res.status(400).send({
      message: "Not Found"
    });
  }
}
