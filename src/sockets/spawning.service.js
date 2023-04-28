
const db = require("../_helpers/db");
const constants = require("../_helpers/constants");

const User = db.User;
const Items = db.Items;

const dronesJson = require("../jsons/drones");
const lootsJsonStealth = require("../jsons/loot");
const extractionJson = require("../jsons/extraction");
const gungeneration = require("./gun.service");
const { json } = require("express");

module.exports = {
    generateNewMap,
    generateLoots,
    generateDrones
    
};

function randomIntFromIntervalExclude(min, max) {
    return Math.floor(Math.random() * (max - min + 0) + min)
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


async function GenerateRandomNumersInList(maximumNumbers, requiredNumbers) {
    let randomFunction = []
    let requiredClusters = [];
    for (let i = 0; i < maximumNumbers; i++) {
        randomFunction.push(i);
    }
    while (requiredClusters.length < requiredNumbers) {
        let x = randomIntFromIntervalExclude(0, randomFunction.length);
        let index = randomFunction.findIndex(item => item == randomFunction[x]);
        requiredClusters.push(randomFunction[x]);
        randomFunction.splice(index, 1);
    }

    return requiredClusters;
}

async function generateLoots(bosses) {
    console.log("GENERATE LOOTS ")
    let allLoots = [];
    let lootsJson = lootsJsonStealth;
    for (let i = 0; i < lootsJson.crates.length; i++) {
        let totalCrates = randomIntFromInterval(lootsJson.crates[i].min, lootsJson.crates[i].max);
        let requiredCrates = await GenerateRandomNumersInList(lootsJson.crates[i].crates.length, totalCrates);
        for (let z = 0; z < requiredCrates.length; z++) {
            for (let a = 0; a < lootsJson.crates[i].crateTypes.length; a++) {
                if (lootsJson.crates[i].crates[requiredCrates[z]] === lootsJson.crates[i].crateTypes[a].name) {
                    let probability = randomIntFromInterval(1, 100);
                    let slotX = lootsJson.crates[i].crateTypes[a].slotSizeX;
                    let slotY = lootsJson.crates[i].crateTypes[a].slotSizeY;
                    let array = await createArray(slotX, slotY);
                    let categoryProb = randomIntFromInterval(1, 100);
                    let requiredCategory = 0;
                  /*   if (bosses.includes(lootsJson.crates[i].bossCluster[a])) {
                        for (let b = 0; b < lootsJson.crates[i].crateTypes[a].alternateCategoriesProbability.length; b++) {
                            if (categoryProb <= lootsJson.crates[i].crateTypes[a].alternateCategoriesProbability[b]) {
                                requiredCategory = b;
                                break;
                            }
                        }

                    }
                    else  */
                    {
                        for (let b = 0; b < lootsJson.crates[i].crateTypes[a].categoriesProbability.length; b++) {
                            if (categoryProb <= lootsJson.crates[i].crateTypes[a].categoriesProbability[b]) {
                                requiredCategory = b;
                                break;
                            }
                        }
                    }
                    // let loops = 0;
                    //   while (allLoots.length <= 3 && probability <= lootsJson.crates[i].crateTypes[a].probability[allLoots.length] && loops < 6)
             
             
             
                    //      let totalprobability = lootsJson.crates[i].crateTypes[a].probability[0] + lootsJson.crates[i].crateTypes[a].probability[1] +
               //         lootsJson.crates[i].crateTypes[a].probability[2];
                    for (let a1 = 0; a1 < lootsJson.crates[i].crateTypes[a].probability.length; a1++) {
                        //   loops++;
                        probability = randomIntFromInterval(1, 100);
                        // let rquiredCategoryItemProb = randomIntFromInterval(0, lootsJson.crates[i].crateTypes[a].categories[requiredCategory].items.length - 1);
                        // let requiredCategoryItems = lootsJson.crates[i].crateTypes[a].categories[requiredCategory].items[rquiredCategoryItemProb];

                        if (probability < lootsJson.crates[i].crateTypes[a].probability[a1]) {
                            let requiredItemsLength = await GenerateRandomNumersInList(lootsJson.crates[i].crateTypes[a].categories[requiredCategory].items.length,
                                lootsJson.crates[i].crateTypes[a].categories[requiredCategory].items.length);
                            for (let m = 0; m < requiredItemsLength.length; m++) {
                                let requiredCategoryItem = lootsJson.crates[i].crateTypes[a].categories[requiredCategory].items[requiredItemsLength[m]];
                                //  let item = await Items.findOne({ name: requiredCategoryItems.name });
                                //  let itemSizeX = item.sizeX;//
                                //  let itemSizeY = item.sizeY;//
                                let itemSizeX = requiredCategoryItem.sizeX //* requiredCategoryItem.quantity;//
                                let itemSizeY = requiredCategoryItem.sizeY //* requiredCategoryItem.quantity;//
                                let filledSlots = [];
                                       console.log("ITEM  "+requiredCategoryItem)
                                for (let k = 0; k < requiredCategoryItem.quantity; k++) {

                                    for (let i = 0; i < slotX; i++) {
                                        for (let y = 0; y < slotY; y++) {
                                            if (array[i][y] != 1 && (itemSizeX + i < slotX && itemSizeY + y < slotY)) {
                                                for (let j = i; j < itemSizeX + i; j++) {
                                                    let filled = 0;
                                                    for (let h = y; h < itemSizeY + y; h++) {
                                                        if (array[j][h] == 1) {
                                                            filled = 1;
                                                            filledSlots.length = 0
                                                            break;
                                                        }
                                                        else {
                                                            let d =
                                                            {
                                                                i: j,
                                                                y: h
                                                            }
                                                            filledSlots.push(d);
                                                        }

                                                    }
                                                    if (filled == 1) {
                                                        filledSlots.length = 0
                                                        break;
                                                    }
                                                }

                                            }
                                            if (filledSlots.length >= requiredCategoryItem.quantity) {
                                                break;
                                            }
                                        }
                                        if (filledSlots.length >= requiredCategoryItem.quantity) {
                                            break;
                                        }
                                    }



                                    for (let i = 0; i < filledSlots.length; i++) {
                                        array[filledSlots[i].i][filledSlots[i].y] = 1
                                    }
                                    let gun;

                                   // if (requiredCategoryItem=== "Gun") {
                                   //     gun = gungeneration.generateGun("A", requiredCategoryItem,"0",0);
                                  //  }

                                    if (filledSlots.length > 0) {
                                        let d =
                                        {
                                            name: requiredCategoryItem.name,
                                            startX: filledSlots[0].i,
                                            startY: filledSlots[0].y,
                                            sizeX: itemSizeX,
                                            sizeY: itemSizeY,
                                            crateName: lootsJson.crates[i].name,
                                            spawnId: requiredCrates[z],
                                            totalSlotX: slotX,
                                            totalSlotY: slotY,
                                            rot: 0,
                                            buyTime: Math.floor(new Date().getTime() / 1000),
                                            extra: gun,
                                            owner: "loot"
                                        }
                                        allLoots.push(d);

                                    }
                                    if (filledSlots.length >= requiredCategoryItem.quantity) {
                                        break;
                                    }

                                }
                                if (filledSlots.length >= requiredCategoryItem.quantity) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("ALLLOTTS  " + allLoots.length)
    for (let i = 0; i < allLoots.length; i++) {
        //    console.log("I " + i)
        console.log(allLoots[i]);
    }

    return allLoots;

}

async function generateDrones() {

    let allDrones = [];

    let totalBossDrones = randomIntFromInterval(dronesJson.minBossCluster, dronesJson.maxBossCluster);
    let totalNormalDrones = randomIntFromInterval(dronesJson.minMediumCluster, dronesJson.maxMediumCluster);
    let totalSmallDrones = randomIntFromInterval(dronesJson.minSmallCluster, dronesJson.maxSmallCluster);

    let requiredBossClusters = await GenerateRandomNumersInList(dronesJson.bossCluster.length, totalBossDrones);
    let requiredNormalClusters = await GenerateRandomNumersInList(dronesJson.totalMediumCluster, totalNormalDrones);
    let requiredSmallClusters = await GenerateRandomNumersInList(dronesJson.totalSmallCluster, totalSmallDrones);


    for (let z = 0; z < requiredBossClusters.length; z++) {
        let d = {
            clusterType: "boss",
            clusterId: requiredBossClusters[z],
            droneType: dronesJson.bossCluster[requiredBossClusters[z]].drones[0],
            spawnId: dronesJson.bossCluster[requiredBossClusters[z]].spawnpositions
        }
        allDrones.push(d);
        let normalDrones = randomIntFromInterval(dronesJson.bossCluster[requiredBossClusters[z]].minDrone,
            dronesJson.bossCluster[requiredBossClusters[z]].maxDrone);
        let spawnPositions = await GenerateRandomNumersInList(dronesJson.bossCluster[requiredBossClusters[z]].spawnpositions, normalDrones);
        let small = 0;
        for (let a = 0; a < spawnPositions.length; a++) {
            let droneType = 1;
            if (small >= 2) {
                droneType = 2;
            }
            let d = {
                clusterType: "boss",
                clusterId: requiredBossClusters[z],
                droneType: dronesJson.bossCluster[requiredBossClusters[z]].drones[droneType],
                spawnId: spawnPositions[a]
            }
            small++;
            allDrones.push(d);
        }
    }

    for (let z = 0; z < requiredNormalClusters.length; z++) {
        let normalDrones = randomIntFromInterval(dronesJson.mediumCluster.minDrone, dronesJson.mediumCluster.maxDrone);
        let spawnPositions = await GenerateRandomNumersInList(dronesJson.mediumCluster.spawnPositions, normalDrones);

        for (let a = 0; a < spawnPositions.length; a++) {
            let d = {
                clusterType: "medium",
                clusterId: requiredNormalClusters[z],
                droneType: dronesJson.mediumCluster.drones[0],
                spawnId: spawnPositions[a]
            }
            allDrones.push(d);
        }
    }


   

    for (let z = 0; z < requiredSmallClusters.length; z++) {
        let smallDrones = randomIntFromInterval(dronesJson.smallCluster.minDrone, dronesJson.smallCluster.maxDrone);
        let spawnPositions = await GenerateRandomNumersInList(dronesJson.smallCluster.spawnPositions, smallDrones);
        for (let a = 0; a < spawnPositions.length; a++) {
            let d = {
                clusterType: "small",
                clusterId: requiredSmallClusters[z],
                droneType: dronesJson.smallCluster.drones[0],
                spawnId: spawnPositions[a]
            }
            allDrones.push(d);
        }
    }
   console.log(JSON.stringify(allDrones))
    return allDrones;
}
async function generateExtractions(squadMatch) {
    let extractions = [];
    for (let i = 0; i < squadMatch.members.length; i++) {
        let b1 = Math.floor(Math.random() * (extractionJson.data[i].length - 0) + 0);
        let b2 = Math.floor(Math.random() * (extractionJson.data[i].length - 0) + 0);
        while (b2 == b1) {
            b2 = Math.floor(Math.random() * (extractionJson.data[i].length - 0) + 0);
        }
        let extractionData = {
            team: squadMatch.members[i].team,
            posId1: extractionJson.data[i][b2],
            posId2: extractionJson.data[i][b1]

        }
        extractions.push(extractionData);
    }
    return extractions;
}

async function generateNewMap(squadMatch, io) {

    let drones = await generateDrones();
    let bosses = [];
    for (let i = 0; i < drones.length; i++) {
        if (drones[i].clusterType == "boss") {
            bosses.push(drones[i].clusterId)
        }
    }
    let loots = await generateLoots(bosses);
    let extractions = await generateExtractions(squadMatch);

    let socketId = "";

    for (let i = 0; i < squadMatch.members.length; i++) {
        for (let j = 0; j < squadMatch.members[i].members.length; j++) {
            let user = await User.findById(squadMatch.members[i].members[j].id);
            if (user && user.is_online == 1) {
                found = 1;
                socketId = user.socket_id;
                break;
            }
        }
        if (found == 1) {
            break;
        }

    }

    let data = {
        drones: drones,
        loots: loots,
        extractions: extractions

    }
    io.to(socketId).emit(constants.DEPLOYLOOTANDDRONES, {
        data: data
    });
    squadMatch.inventoryInGame = loots;
    squadMatch.drones = drones;
    if (!Array.isArray(squadMatch.extractions)) {
        squadMatch.extractions = [];
    }
    squadMatch.extractions = extractions;
    await squadMatch.save();

}


async function createArray(x, y) {
    if (x == 1) {
        if (y == 1) {
            let items = [
                [0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0], [0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0], [0], [0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0], [0], [0], [0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0], [0], [0], [0], [0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0], [0], [0], [0], [0], [0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0], [0], [0], [0], [0], [0], [0]
            ];
            return items;
        }
    }

    else if (x == 2) {
        if (y == 1) {
            let items = [
                [0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0], [0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0], [0, 0], [0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0], [0, 0], [0, 0], [0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]
            ];
            return items;
        }
    }


    else if (x == 3) {
        if (y == 1) {
            let items = [
                [0, 0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0, 0], [0, 0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0, 0], [0, 0, 0], [0, 0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]
            ];
            return items;
        }
    }


    else if (x == 4) {
        if (y == 1) {
            let items = [
                [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0, 0, 0], [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]
            ];
            return items;
        }
    }
    else if (x == 5) {
        if (y == 1) {
            let items = [
                [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]
            ];
            return items;
        }
    }

    else if (x == 6) {
        if (y == 1) {
            let items = [
                [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]
            ];
            return items;
        }
    }
    else if (x == 7) {
        if (y == 1) {
            let items = [
                [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 2) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 3) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 4) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 5) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 6) {
            let items = [
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            ];
            return items;
        }
        else if (y == 7) {
            let items = [
                [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0]
            ];
            return items;
        }
    }

}

