const express = require("express");
const { apiResponse } = require("../_helpers/ApiResponse");
const ApiResponse = require("../_helpers/ApiResponse");
const constants = require("../_helpers/constants");
const db = require("../_helpers/db");
const NpcStatic = db.NpcStatic;
const WeaponStatic = db.WeaponStatic;
const ArmorStatic = db.ArmorStatic;
const AmmosStatic = db.AmmosStatic;
const BagPackStatic = db.BagPackStatic;
const TaskStatic = db.TaskStatic;
const AttributeStatic = db.AttributeStatic;
const GunStatic = db.GunStatic;
const User = db.User;


module.exports = {
  deleteData,
  editData,
  addAllData,
  addData,
  getData,
  getSingleData,
  deleteMoreData,
  getUserByAccountId,
  editUserByAccountId
};

let paginatedData = {}
let linksData = {}

async function getSingleData(req, res) {
  console.log(req.params + "   " + req.params.category + "   " + req.params._id)
  let response;
  if (req.params.category == "npcStatic") {
    let npc = await NpcStatic.findById(req.params._id);
    // apiResponse: (res, status, code, description = null, error = null, data = [], paginatedData = {}, linksData = {})
    if (npc) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, npc, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "weaponsStatic") {
    let weapons = await WeaponStatic.findById(req.params._id);
    if (weapons) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, weapons, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "ammosStatic") {
    let ammos = await AmmosStatic.findById(req.params._id);
    if (ammos) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, ammos, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "armorStatic") {
    let armor = await ArmorStatic.findById(req.params._id);
    if (armor) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, armor, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPack = await BagPackStatic.findById(req.params._id);
    if (bagPack) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, bagPack, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "taskStatic") {
    let task = await TaskStatic.findById(req.params._id);
    if (task) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, task, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "attributeStatic") {
    let attributes = await AttributeStatic.findById(req.params._id);
    if (attributes) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, attributes, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "gunSttaic") {
    let attributes = await GunStatic.findById(req.params._id);
    if (attributes) {
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, attributes, paginatedData, linksData)
    } else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else {
    response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
  }
}


async function getData(req, res) {
  let response;
  if (req.params.category == "npcStatic") {
    let npc = await NpcStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, npc, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "weaponsStatic") {
    let weapons = await WeaponStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, weapons, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "ammosStatic") {
    let ammos = await AmmosStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, ammos, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "armorStatic") {
    let armor = await ArmorStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, armor, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPack = await BagPackStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, bagPack, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "taskStatic") {
    let task = await TaskStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, task, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "attributeStatic") {
    let attributes = await AttributeStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, attributes, paginatedData, linksData)
    res.send(response);
  }
  else if (req.params.category == "gunStatic") {
    let attributes = await GunStatic.find({ name: { "$exists": true } });
    response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_FOUND, null, attributes, paginatedData, linksData)
    res.send(response);
  }
  
  else {
    response = apiResponse(res, true, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response);
  }
}

async function addData(req, res) {
  let response;

  if (req.params.category == "npcStatic") {

    let npcStatic = new NpcStatic();
    let count = await NpcStatic.find({ _id: { "$exists": true } }).count();
    npcStatic.id = count + 1;
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

    response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, npcStatic, paginatedData, linksData)
    res.send(response)

  }
  else if (req.params.category == "weaponsStatic") {
    let weaponsStatic = new WeaponStatic();
    if (weaponsStatic) {
      let count = await WeaponStatic.find({ _id: { "$exists": true } }).count();
      weaponsStatic.id = count + 1;
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
      let d = {
        air: 0,
        water: 0,
        heat: 0,
        fire: 0
      }

      weaponsStatic.resources = d;
      weaponsStatic.resources.air = req.body.air;
      weaponsStatic.resources.heat = req.body.heat;
      weaponsStatic.resources.fire = req.body.fire;
      weaponsStatic.resources.water = req.body.water;
      weaponsStatic.markModified("resources");


      await weaponsStatic.save();
     response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, weaponsStatic, paginatedData, linksData)
     res.send(response)
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = new AmmosStatic();
    if (ammosStatic) {
      let count = await AmmosStatic.find({ _id: { "$exists": true } }).count();
      ammosStatic.id = count + 1;

      ammosStatic.type = req.body.type;
      ammosStatic.weight = req.body.weight;
      ammosStatic.damage = req.body.damage;
      ammosStatic.name = req.body.name;
      ammosStatic.exp = req.body.exp;
      ammosStatic.desc = req.body.desc;
      let d = {
        air: 0,
        water: 0,
        heat: 0,
        fire: 0
      }

      ammosStatic.resources = d;
      ammosStatic.resources.air = req.body.air;
      ammosStatic.resources.heat = req.body.heat;
      ammosStatic.resources.fire = req.body.fire;
      ammosStatic.resources.water = req.body.water;
      ammosStatic.markModified("resources");
      await ammosStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, ammosStatic, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "armorStatic") {
    let armorStatic = new ArmorStatic();
    if (armorStatic) {
      let count = await ArmorStatic.find({ _id: { "$exists": true } }).count();
      armorStatic.id = count + 1;

      armorStatic.type = req.body.type;
      armorStatic.weight = req.body.weight;
      armorStatic.shield = req.body.shield;
      armorStatic.name = req.body.name;
      armorStatic.exp = req.body.exp;
      armorStatic.desc = req.body.desc;
      let d = {
        air: 0,
        water: 0,
        heat: 0,
        fire: 0
      }

      armorStatic.resources = d;
      armorStatic.resources.air = req.body.air;
      armorStatic.resources.heat = req.body.heat;
      armorStatic.resources.fire = req.body.fire;
      armorStatic.resources.water = req.body.water;
      armorStatic.markModified("resources");

      await armorStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, armorStatic, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = new BagPackStatic();
    if (bagPackStatic) {
      let count = await BagPackStatic.find({ _id: { "$exists": true } }).count();
      bagPackStatic.id = count + 1;


      bagPackStatic.type = req.body.type;
      bagPackStatic.capacity = req.body.capacity;
      bagPackStatic.name = req.body.name;
      bagPackStatic.exp = req.body.exp;
      bagPackStatic.desc = req.body.desc;
      let d = {
        air: 0,
        water: 0,
        heat: 0,
        fire: 0
      }

      bagPackStatic.resources = d;
      bagPackStatic.resources.air = req.body.air;
      bagPackStatic.resources.heat = req.body.heat;
      bagPackStatic.resources.fire = req.body.fire;
      bagPackStatic.resources.water = req.body.water;
      bagPackStatic.markModified("resources");
      await bagPackStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, bagPackStatic, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "taskStatic") {
    let taskStatic = new TaskStatic();
    if (taskStatic) {
      let count = await TaskStatic.find({ _id: { "$exists": true } }).count();
      taskStatic.id = count + 1;


      taskStatic.type = req.body.type;
      taskStatic.giver = req.body.giver;
      taskStatic.reward = req.body.reward;
      taskStatic.name = req.body.name;
      taskStatic.exp = req.body.exp;
      taskStatic.desc = req.body.desc;
      await taskStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, taskStatic, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "attributeStatic") {
    let attributesStatic = new AttributeStatic();
    if (attributesStatic) {
      attributesStatic.values = req.body.values;
      attributesStatic.name = req.body.name;
      await attributesStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, attributesStatic, paginatedData, linksData)
      res.send(response)
    }
  }
  else {
    response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
  }
}

async function addAllData(req, res) {
  let response;
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
      response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, npcStatic, paginatedData, linksData)
      res.send(response)
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

        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, weaponsStatic, paginatedData, linksData)
        res.send(response)

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
        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, ammosStatic, paginatedData, linksData)
        res.send(response)
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
        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, armorStatic, paginatedData, linksData)
        res.send(response)
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
        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, bagPackStatic, paginatedData, linksData)
        res.send(response)
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
        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, taskStatic, paginatedData, linksData)
        res.send(response)
      }
    }
  }

  else if (req.params.category == "attributeStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let attributesStatic = new AttributeStatic();
      if (attributesStatic) {
        attributesStatic.values = req.body.values;
        attributesStatic.name = req.body.name;
        await attributesStatic.save();
        response = apiResponse(res, true, constants.STATUS_CODE_CREATED, constants.DATA_CREATED, null, attributesStatic, paginatedData, linksData)
        res.send(response)
      }
    }
  } else{
    response = apiResponse(res, false, constants.STATUS_CODE_BAD_REQUEST, constants.BAD_REQUEST, null, {}, paginatedData, linksData)
    res.send(response)
  }
}


async function editData(req, res) {
  console.log(req.params);
  let response;

  if (req.params.category == "npcStatic") {
    let npcStatic = await NpcStatic.findById(req.params._id);
    if (npcStatic) {
      npcStatic.level = req.body.level? req.body.level: npcStatic.level;
      npcStatic.enemy = req.body.enemy? req.body.enemy: npcStatic.enemy;
      npcStatic.health = req.body.health? req.body.health: npcStatic.health;
      npcStatic.damage = req.body.damage? req.body.damage: npcStatic.damage;
      npcStatic.fireRate = req.body.fireRate? req.body.fireRate: npcStatic.fireRate;
      npcStatic.range = req.body.range? req.body.range: npcStatic.range;
      npcStatic.name = req.body.name? req.body.name: npcStatic.name;
      npcStatic.exp = req.body.exp? req.body.exp: npcStatic.exp;
      npcStatic.movementSpeed = req.body.movementSpeed? req.body.movementSpeed: npcStatic.movementSpeed;
      npcStatic.desc = req.body.desc? req.body.desc: npcStatic.desc;
      await npcStatic.save();

      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, npcStatic, paginatedData, linksData)
      
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    }
    res.send(response)
  }
  else if (req.params.category == "weaponsStatic") {
    let weaponsStatic = await WeaponStatic.findById(req.params._id);
    if (weaponsStatic) {
      weaponsStatic.id = req.body.id? req.body.id:weaponsStatic.id;
      weaponsStatic.type = req.body.type?req.body.type:weaponsStatic.type;
      weaponsStatic.weight = req.body.weight?req.body.weight:weaponsStatic.weight;
      weaponsStatic.damage = req.body.damage?req.body.damage:weaponsStatic.damage;
      weaponsStatic.fireSpread = req.body.fireSpread?req.body.fireSpread:weaponsStatic.fireSpread;
      weaponsStatic.gunFireMode = req.body.gunFireMode?req.body.gunFireMode:weaponsStatic.gunFireMode;
      weaponsStatic.name = req.body.name?req.body.name:weaponsStatic.name;
      weaponsStatic.exp = req.body.exp?req.body.exp:weaponsStatic.exp;
      weaponsStatic.screenShakeIntensity = req.body.screenShakeIntensity?req.body.screenShakeIntensity:weaponsStatic.screenShakeIntensity;
      weaponsStatic.desc = req.body.desc?req.body.desc:weaponsStatic.desc;
      weaponsStatic.screenShakeDuration = req.body.screenShakeDuration?req.body.screenShakeDuration:weaponsStatic.screenShakeDuration;
      weaponsStatic.magazineSize = req.body.magazineSize?req.body.magazineSize:weaponsStatic.magazineSize;
      weaponsStatic.gunShotIntensity = req.body.gunShotIntensity?req.body.gunShotIntensity:weaponsStatic.gunShotIntensity;
      weaponsStatic.shootingRange = req.body.shootingRange?req.body.shootingRange:weaponsStatic.shootingRange;
      weaponsStatic.muzzleFlashIntensity = req.body.muzzleFlashIntensity?req.body.muzzleFlashIntensity:weaponsStatic.muzzleFlashIntensity;
      weaponsStatic.recoil = req.body.recoil ? req.body.recoil : weaponsStatic.recoil;
      weaponsStatic.fireRate = req.body.fireRate ? req.body.fireRate : weaponsStatic.fireRate;
      weaponsStatic.reloadTime = req.body.reloadTime ? req.body.reloadTime : weaponsStatic.reloadTime;
      weaponsStatic.bulletShotAudioClip = req.body.bulletShotAudioClip ? req.body.bulletShotAudioClip : weaponsStatic.bulletShotAudioClip;
      weaponsStatic.bulletHolePrefab = req.body.bulletHolePrefab ? req.body.bulletHolePrefab : weaponsStatic.bulletHolePrefab;
      weaponsStatic.ammoType = req.body.ammoType ? req.body.ammoType : weaponsStatic.ammoType;
      weaponsStatic.resources.air = req.body.air ? req.body.air : weaponsStatic.resources.air;
      weaponsStatic.resources.heat = req.body.heat ? req.body.heat : weaponsStatic.resources.heat;
      weaponsStatic.resources.fire = req.body.fire ? req.body.fire : weaponsStatic.resources.fire;
      weaponsStatic.resources.water = req.body.water ? req.body.water : weaponsStatic.resources.water;
      weaponsStatic.markModified("resources");
      await weaponsStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, weaponsStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = await AmmosStatic.findById(req.params._id);
    if (ammosStatic) {
      ammosStatic.id = req.body.id ? req.body.id : ammosStatic.id;
      ammosStatic.type = req.body.type ? req.body.type : ammosStatic.type;
      ammosStatic.weight = req.body.weight ? req.body.weight : ammosStatic.weight;
      ammosStatic.damage = req.body.damage ? req.body.daman : ammosStatic.daman;
      ammosStatic.name = req.body.name ? req.body.name : ammosStatic.name;
      ammosStatic.exp = req.body.exp ? req.body.exp : ammosStatic.exp;
      ammosStatic.desc = req.body.desc ? req.body.desc : ammosStatic.desc;
      ammosStatic.resources.air = req.body.air ? req.body.air : ammosStatic.air;
      ammosStatic.resources.heat = req.body.heat ? req.body.heat : ammosStatic.resources.heat;
      ammosStatic.resources.fire = req.body.fire ? req.body.fire : ammosStatic.resources.fire;
      ammosStatic.resources.water = req.body.water ? req.body.water : ammosStatic.resources.water;
      ammosStatic.markModified("resources");
      await ammosStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, ammosStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "armorStatic") {
    console.log(req.body);
    let armorStatic = await ArmorStatic.findById(req.params._id);
    if (armorStatic) {

      armorStatic.id = req.body.id ? req.body.id : armorStatic.id;
      armorStatic.type = req.body.type ? req.body.type : armorStatic.type;
      armorStatic.weight = req.body.weight ? req.body.weight : armorStatic.weight;
      armorStatic.shield = req.body.shield ? req.body.shield : armorStatic.shield;
      armorStatic.name = req.body.name ? req.body.name : armorStatic.name;
      armorStatic.exp = req.body.exp ? req.body.exp : armorStatic.exp;
      armorStatic.desc = req.body.desc ? req.body.desc : armorStatic.desc;
      armorStatic.resources.air = req.body.air ? req.body.air : armorStatic.resources.air;
      armorStatic.resources.heat = req.body.heat ? req.body.heat : armorStatic.resources.heat;
      armorStatic.resources.fire = req.body.fire ? req.body.fire : armorStatic.resources.fire;
      armorStatic.resources.water = req.body.water ? req.body.water : armorStatic.resources.water;
      armorStatic.markModified("resources");
      await armorStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, armorStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = await BagPackStatic.findById(req.params._id);
    if (bagPackStatic) {
      bagPackStatic.id = req.body.id ? req.body.id : bagPackStatic.id;
      bagPackStatic.type = req.body.type ? req.body.type : bagPackStatic.type;
      bagPackStatic.capacity = req.body.capacity ? req.body.capacity : bagPackStatic.capacity;
      bagPackStatic.name = req.body.name ? req.body.name : bagPackStatic.name;
      bagPackStatic.exp = req.body.exp ? req.body.exp : bagPackStatic.exp;
      bagPackStatic.desc = req.body.desc ? req.body.desc : bagPackStatic.desc;
      bagPackStatic.resources.air = req.body.air ? req.body.air : bagPackStatic.resources.air;
      bagPackStatic.resources.heat = req.body.heat ? req.body.heat : bagPackStatic.resources.heat;
      bagPackStatic.resources.fire = req.body.fire ? req.body.fire : bagPackStatic.resources.fire;
      bagPackStatic.resources.water = req.body.water ? req.body.water : bagPackStatic.resources.water;
      bagPackStatic.markModified("resources");
      await bagPackStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, bagPackStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }

  else if (req.params.category == "taskStatic") {
    let taskStatic = await TaskStatic.findById(req.params._id);
    if (taskStatic) {
      taskStatic.id = req.body.id ? req.body.id : taskStatic.id;
      taskStatic.type = req.body.type ? req.body.body : taskStatic.body;
      taskStatic.giver = req.body.giver ? req.body.giver : taskStatic.giver;
      taskStatic.reward = req.body.reward ? req.body.reward : taskStatic.reward;
      taskStatic.name = req.body.name ? req.body.name : taskStatic.name;
      taskStatic.exp = req.body.exp ? req.body.exp : taskStatic.exp;
      taskStatic.desc = req.body.desc ? req.body.desc : taskStatic.desc;
      await taskStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, taskStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }

  else if (req.params.category == "attributeStatic") {
    let attributesStatic = await AttributeStatic.findById(req.params._id);
    if (attributesStatic) {
      attributesStatic.values = req.body.values ? req.body.values : attributesStatic.values;
      attributesStatic.name = req.body.name  ? req.body.name : attributesStatic.name;
      await attributesStatic.save();
      response = apiResponse(res, true, constants.STATUS_CODE_OK, constants.DATA_UPDATED, null, attributesStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else {
    response = apiResponse(res, false, constants.STATUS_CODE_BAD_REQUEST, constants.BAD_REQUEST, null, {}, paginatedData, linksData)
    res.send(response)
  }
}

async function deleteData(req, res) {
  let response;
  if (req.params.category == "npcStatic") {
    let npcStatic = await NpcStatic.findById(req.params._id);
    if (npcStatic) {
      await npcStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, npcStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else if (req.params.category == "weaponsStatic") {
    let weaponStatic = await WeaponStatic.findById(req.params._id);
    if (weaponStatic) {
      await weaponStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, weaponStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
    }
  }
  else if (req.params.category == "ammosStatic") {
    let ammosStatic = await AmmosStatic.findById(req.params._id);
    if (ammosStatic) {
      await ammosStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, ammosStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
    }
  }
  else if (req.params.category == "armorStatic") {
    let armorStatic = await ArmorStatic.findById(req.params._id);
    if (armorStatic) {
      await armorStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, armorStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
    }
  }
  else if (req.params.category == "bagPackStatic") {
    let bagPackStatic = await BagPackStatic.findById(req.params._id);
    if (bagPackStatic) {
      await bagPackStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, bagPackStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
    }
  }
  else if (req.params.category == "taskStatic") {
    let taskStatic = await TaskStatic.findById(req.params._id);
    if (taskStatic) {
      await taskStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, taskStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
    res.send(response)
    }
  }

  else if (req.params.category == "attributeStatic") {
    let attributeStatic = await AttributeStatic.findById(req.params._id);
    if (attributeStatic) {
      await attributeStatic.remove();
      response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, attributeStatic, paginatedData, linksData)
      res.send(response)
    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
    }
  }
  else {
    response = apiResponse(res, false, constants.STATUS_CODE_BAD_REQUEST, constants.BAD_REQUEST, null, {}, paginatedData, linksData)
    res.send(response)
  }
}

async function deleteMoreData(req, res) {
  let response
  if (req.params.category == "npcStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let npcStatic = await NpcStatic.findById(req.body.d1[i]);
      if (npcStatic) {
        await npcStatic.remove();
      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else if (req.params.category == "weaponsStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let weaponStatic = await WeaponStatic.findById(req.body.d1[i]);
      if (weaponStatic) {
        await weaponStatic.remove();
      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else if (req.params.category == "ammosStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let ammosStatic = await AmmosStatic.findById(req.body.d1[i]);
      if (ammosStatic) {
        await ammosStatic.remove();

      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else if (req.params.category == "armorStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let armorStatic = await ArmorStatic.findById(req.body.d1[i]);
      if (armorStatic) {
        await armorStatic.remove();

      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else if (req.params.category == "bagPackStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let bagPackStatic = await BagPackStatic.findById(req.body.d1[i]);
      if (bagPackStatic) {
        await bagPackStatic.remove();

      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else if (req.params.category == "taskStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let taskStatic = await TaskStatic.findById(req.body.d1[i]);
      if (taskStatic) {
        await taskStatic.remove();

      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }

  else if (req.params.category == "attributeStatic") {
    for (let i = 0; i < req.body.d1.length; i++) {
      let attributeStatic = await AttributeStatic.findById(req.body.d1[i]);
      if (attributeStatic) {
        await attributeStatic.remove();
      }
      else {
        response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.DATA_NOT_FOUND, null, {}, paginatedData, linksData)
        res.send(response)
      }
    }
    response = apiResponse(res, true, constants.STATUS_CODE_NO_CONTENT, constants.DATA_DELETED, null, {}, paginatedData, linksData)
    res.send(response)
  }
  else {
    response = apiResponse(res, true, constants.STATUS_CODE_BAD_REQUEST, constants.BAD_REQUEST, null, {}, paginatedData, linksData)
    res.send(response)
  }
}

async function getUserByAccountId(req, res) {
  let user = await User.findOne({ accountId: req.params.id });
  if (user) {
    // apiResponse: (res, status, code, description = null, error = null, data = [], paginatedData = {}, linksData = {})
    const response = ApiResponse.apiResponse(res, true, constants.STATUS_CODE_OK, constants.USER_FETCHED, null, user, paginatedData, linksData)
    res.send(response)
  }
  else {
    const response = ApiResponse.apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.USER_NOT_FOUND, null, [], paginatedData, linksData)
    res.send(response)

  }
}

async function editUserByAccountId(req, res) {
  let response;

  try {
    let user = await User.findOne({ accountId: req.params.id });
    if (user) {
      console.log("params " + req.body);
        user.playerStat.playerLevel = req.body.playerLevel ? req.body.playerLevel : user.playerStat.playerLevel;
        user.playerStat.strength = req.body.strength ? req.body.strength : user.playerStat.strength;
        user.playerStat.endurance = req.body.endurance ? req.body.endurance : user.playerStat.endurance;
        user.playerStat.vitality = req.body.vitality ? req.body.vitality : user.playerStat.vitality;
        user.playerStat.intelligence = req.body.intelligence ? req.body.intelligence : user.playerStat.intelligence;
        user.playerStat.gunMastery = req.body.gunMastery ? req.body.gunMastery : user.playerStat.gunMastery;
        user.playerStat.gunMarksmanship = req.body.gunMarksmanship ? req.body.gunMarksmanship : user.playerStat.gunMarksmanship;
        user.playerStat.gunHandling = req.body.gunHandling ? req.body.gunHandling : user.playerStat.gunHandling;
        user.playerStat.craftsmanship = req.body.craftsmanship ? req.body.craftsmanship : user.playerStat.craftsmanship;
        user.playerStat.knifeMastery = req.body.knifeMastery ? req.body.knifeMastery : user.playerStat.knifeMastery;
        user.markModified("playerStat");
  
      user.resources.air = req.body.air ? req.body.air : user.resources.air;
      user.resources.heat = req.body.heat ? req.body.heat : user.resources.heat;
      user.resources.fire = req.body.fire ? req.body.fire : user.resources.fire;
      user.resources.water = req.body.water ? req.body.water : user.resources.water;
      user.markModified("resources");
      //   user.inventory =req.body.inventory;
      await user.save();

      response = apiResponse(res, true, constants.STATUS_CODE_MULTIPLE_CHOICES, constants.DATA_UPDATED, null, user, paginatedData, linksData)
      res.send(response)

    }
    else {
      response = apiResponse(res, false, constants.STATUS_CODE_NOT_FOUND, constants.USER_NOT_FOUND, null, {}, paginatedData, linksData)
      res.send(response)
  
    }
  } catch (error) {
    response = apiResponse(res, false, constants.STATUS_CODE_BAD_REQUEST, constants.BAD_REQUEST, error.message,{}, paginatedData, linksData)
    res.send(response)
  }
}