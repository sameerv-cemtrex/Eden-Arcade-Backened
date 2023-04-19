
const db = require("../_helpers/db");
const mongoose = require("mongoose");
const constants = require("../_helpers/constants");

const GunGeneration = db.GunGeneration;
const GunAttachmentStatic = db.GunAttachmentStatic;
const GunStatic = db.GunStatic;
module.exports = {
    generateGun,
    updateKill,
    updateAttachment

};
async function updateAttachment(id, obj) {
    try {
        let gun = GunGeneration.findById(id);
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
        let gun = GunGeneration.findById(id);
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

async function generateGun(level, gunType, ownerId, buy) {
    try {
        let gun = new GunGeneration();
        gun.gunType = gunType;
        gun.level = level;
        console.log("GUNTYPE  " + gunType)
        let index = 1;
        if (level == "A") {
            index = 1;
        }
        if (level == "B") {
            index = 2;
        }
        if (level == "C") {
            index = 3;
        }
        if (level == "D") {
            index = 4;
        }
        if (level == "E") {
            index = 5;
        }
        gun.ownerId = ownerId;
        let gunStatic = await GunStatic.findOne({ name: gunType });

        if (gunStatic) {
            let accuracyRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.accuracy[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.accuracy[index - 1].min);
            gun.accuracyRating = accuracyRating;

            let damageRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.damage[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.damage[index - 1].min);
            gun.damageRating = damageRating;

            let ergonomicsRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.ergonomics[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.ergonomics[index - 1].min);
            gun.ergonomicsRating = ergonomicsRating;

            let fireRateRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.fireRate[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.fireRate[index - 1].min);
            gun.fireRateRating = fireRateRating;

            let firingSoundRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.firingSound[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.firingSound[index - 1].min);
            gun.firingSoundRating = firingSoundRating;

            let firingVFXRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.firingVFX[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.firingVFX[index - 1].min);
            gun.firingVFXRating = firingVFXRating;

            let rangeRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.range[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.range[index - 1].min);
            gun.rangeRating = rangeRating;

            let recoilRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.recoil[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.recoil[index - 1].min);
            gun.recoilRating = recoilRating;

            let reliabilityRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.reliability[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.reliability[index - 1].min);
            gun.reliabilityRating = reliabilityRating;

            let reloadSpeedRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.reloadSpeed[index - 1].max - 0) +
                gunStatic.specificGunValues.Ratings.reloadSpeed[index - 1].min);
            gun.reloadSpeedRating = reloadSpeedRating;

            let attachements = [];

            // let gunJson = 

            if (buy == 0) {


                let chanceOfScope = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfScope <= gunStatic.specificGunValues.Ratings.chance.scope) {
                    let a = await GunAttachmentStatic.find({ type: "Scope", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                        console.log("SCOPE  " + a.length + "   " + randomNumber)
                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture
                        }
                        attachements.push(d);
                    }

                }
                let chanceOfGrip = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfGrip <= gunStatic.specificGunValues.Ratings.chance.grip) {
                    let a = await GunAttachmentStatic.find({ type: "Grip", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;

                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture

                        }
                        attachements.push(d);
                    }

                }
                let chanceOfSilencer = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfSilencer <= gunStatic.specificGunValues.Ratings.chance.silencer) {
                    let a = await GunAttachmentStatic.find({ type: "Silencer", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;

                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture

                        }
                        attachements.push(d);
                    }

                }
                let chanceOfStock = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfStock <= gunStatic.specificGunValues.Ratings.chance.stock) {
                    let a = await GunAttachmentStatic.find({ type: "Stock", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;

                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture

                        }
                        attachements.push(d);
                    }

                }
                let chanceOfFlashlight = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfFlashlight <= gunStatic.specificGunValues.Ratings.chance.flashlight) {
                    let a = await GunAttachmentStatic.find({ type: "Flashlight", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;

                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture

                        }
                        attachements.push(d);
                    }

                }
                let chanceOfForeGrip = Math.floor(Math.random() * 100 - 0) + 0;
                if (chanceOfForeGrip <= gunStatic.specificGunValues.Ratings.chance.foregrip) {
                    let a = await GunAttachmentStatic.find({ type: "ForeGrip", name: gunType, texture: level });
                    if (a.length > 0) {
                        let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;

                        let d = {
                            name: a[randomNumber].name,
                            type: a[randomNumber].type,
                            buyTime: Math.floor(new Date().getTime() / 1000),
                            model: a[randomNumber].model,
                            texture: a[randomNumber].texture

                        }
                        attachements.push(d);
                    }

                }
            }
            gun.attachments = attachements;
            await gun.save();
            return gun;
        }


    }
    catch (error) {
        console.log(error)
    }
}

