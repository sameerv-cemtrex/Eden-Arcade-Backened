
const db = require("../_helpers/db");
const mongoose = require("mongoose");
const constants = require("../_helpers/constants");
const gunJson = require("../jsons/gun");

const Gun = db.Gun;

module.exports = {
    generateGun,
    updateKill,
    updateAttachment

};
async function updateAttachment(id, obj) {
    try {
        let gun = Gun.findById(id);
        if (gun) {
            
            await gun.save();
        }
        else {

        }

    }
    catch (error) {

    }
}
async function updateKill(id, kills) {
    try {
        let gun = Gun.findById(id);
        if (gun) {
            gun.playersKilled += kills;
            await gun.save();
        }
        else {

        }

    }
    catch (error) {

    }
}

async function generateGun(level, gunType) {
    try {
        let gun = new Gun();
        gun.gunType = gunType;
        let accuracyRating = Math.floor(Math.random() * (gunJson["accuracyRating"][level - 1]["max"] - 0) +
            gunJson["accuracyRating"][level - 1]["min"]);
        gun.accuracyRating = accuracyRating;

        let damageRating = Math.floor(Math.random() * (gunJson["damageRating"][level - 1]["max"] - 0) +
            gunJson["damageRating"][level - 1]["min"]);
        gun.damageRating = damageRating;

        let ergonomicsRating = Math.floor(Math.random() * (gunJson["ergonomicsRating"][level - 1]["max"] - 0) +
            gunJson["ergonomicsRating"][level - 1]["min"]);
        gun.ergonomicsRating = ergonomicsRating;

        let fireRateRating = Math.floor(Math.random() * (gunJson["fireRateRating"][level - 1]["max"] - 0) +
            gunJson["fireRateRating"][level - 1]["min"]);
        gun.fireRateRating = fireRateRating;

        let firingSoundRating = Math.floor(Math.random() * (gunJson["firingSoundRating"][level - 1]["max"] - 0) +
            gunJson["firingSoundRating"][level - 1]["min"]);
        gun.firingSoundRating = firingSoundRating;

        let firingVFXRating = Math.floor(Math.random() * (gunJson["firingVFXRating"][level - 1]["max"] - 0) +
            gunJson["firingVFXRating"][level - 1]["min"]);
        gun.firingVFXRating = firingVFXRating;

        let rangeRating = Math.floor(Math.random() * (gunJson["rangeRating"][level - 1]["max"] - 0) +
            gunJson["rangeRating"][level - 1]["min"]);
        gun.rangeRating = rangeRating;

        let recoilRating = Math.floor(Math.random() * (gunJson["recoilRating"][level - 1]["max"] - 0) +
            gunJson["recoilRating"][level - 1]["min"]);
        gun.recoilRating = recoilRating;

        let reliabilityRating = Math.floor(Math.random() * (gunJson["reliabilityRating"][level - 1]["max"] - 0) +
            gunJson["reliabilityRating"][level - 1]["min"]);
        gun.reliabilityRating = reliabilityRating;

        let reloadSpeedRating = Math.floor(Math.random() * (gunJson["reloadSpeedRating"][level - 1]["max"] - 0) +
            gunJson["reloadSpeedRating"][level - 1]["min"]);
        gun.reloadSpeedRating = reloadSpeedRating;

        let attachements = {
            scope: {},
            grip: {},
            silencer: {},
            stock: {},
            flashlight: {},
        }
        gun.attachments = attachements;

        let chanceOfScope = Math.floor(Math.random() * 100 - 0) + 0;
        if (chanceOfScope <= gunJson["chanceOfScope"]) {

        }
        let chanceOfGrip = Math.floor(Math.random() * 100 - 0) + 0;
        if (chanceOfGrip <= gunJson["chanceOfGrip"]) {

        }
        let chanceOfSilencer = Math.floor(Math.random() * 100 - 0) + 0;
        if (chanceOfSilencer <= gunJson["chanceOfSilencer"]) {

        }
        let chanceOfStock = Math.floor(Math.random() * 100 - 0) + 0;
        if (chanceOfStock <= gunJson["chanceOfStock"]) {

        }
        let chanceOfFlashlight = Math.floor(Math.random() * 100 - 0) + 0;
        if (chanceOfFlashlight <= gunJson["chanceOfFlashlight"]) {

        }
        await gun.save();
        return gun;


    }
    catch (error) {

    }
}

