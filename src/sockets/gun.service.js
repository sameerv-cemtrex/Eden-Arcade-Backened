
const db = require("../_helpers/db");
const mongoose = require("mongoose");
const constants = require("../_helpers/constants");

const Gun = db.Gun;
const GunAttachmentStatic = db.GunAttachmentStatic;
const GunStatic = db.GunStatic;
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
        gun.level = level;
        let gunStatic = await GunStatic.findOne({ name: gunType });
        console.log("values  " + gunStatic.specificGunValues.Ratings.accuracy[level - 1].max);
        if (gunStatic) {
            let accuracyRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.accuracy[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.accuracy[level - 1].min);
            gun.accuracyRating = accuracyRating;

            let damageRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.damage[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.damage[level - 1].min);
            gun.damageRating = damageRating;

            let ergonomicsRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.ergonomics[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.ergonomics[level - 1].min);
            gun.ergonomicsRating = ergonomicsRating;

            let fireRateRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.fireRate[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.fireRate[level - 1].min);
            gun.fireRateRating = fireRateRating;

            let firingSoundRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.firingSound[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.firingSound[level - 1].min);
            gun.firingSoundRating = firingSoundRating;

            let firingVFXRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.firingVFX[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.firingVFX[level - 1].min);
            gun.firingVFXRating = firingVFXRating;

            let rangeRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.range[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.range[level - 1].min);
            gun.rangeRating = rangeRating;

            let recoilRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.recoil[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.recoil[level - 1].min);
            gun.recoilRating = recoilRating;

            let reliabilityRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.reliability[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.reliability[level - 1].min);
            gun.reliabilityRating = reliabilityRating;

            let reloadSpeedRating = Math.floor(Math.random() * (gunStatic.specificGunValues.Ratings.reloadSpeed[level - 1].max - 0) +
            gunStatic.specificGunValues.Ratings.reloadSpeed[level - 1].min);
            gun.reloadSpeedRating = reloadSpeedRating;

            let attachements = [];
          
            // let gunJson = 

            let chanceOfScope = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfScope <=   gunStatic.specificGunValues.Ratings.chance.scope) {
                let a = await GunAttachmentStatic.find({ part: "Scope" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "scope",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

            }
            let chanceOfGrip = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfGrip <=   gunStatic.specificGunValues.Ratings.chance.grip) {
                let a = await GunAttachmentStatic.find({ part: "Grip" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "grip",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

            }
            let chanceOfSilencer = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfSilencer <=  gunStatic.specificGunValues.Ratings.chance.silencer) {
                let a = await GunAttachmentStatic.find({ part: "Silencer" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "silencer",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

            }
            let chanceOfStock = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfStock <=   gunStatic.specificGunValues.Ratings.chance.stock) {
                let a = await GunAttachmentStatic.find({ part: "Stock" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "stock",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

            }
            let chanceOfFlashlight = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfFlashlight <=   gunStatic.specificGunValues.Ratings.chance.flashlight) {
                let a = await GunAttachmentStatic.find({ part: "Flashlight" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "flashlight",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

            }
            let chanceOfForeGrip = Math.floor(Math.random() * 100 - 0) + 0;
            if (chanceOfForeGrip <=   gunStatic.specificGunValues.Ratings.chance.foregrip) {
                let a = await GunAttachmentStatic.find({ part: "ForeGrip" });
                let randomNumber = Math.floor(Math.random() * a.length - 0) + 0;
                let d = {
                    name: "foregrip",
                    itemId: a[randomNumber].attachmentId

                }
                attachements.push(d);

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

