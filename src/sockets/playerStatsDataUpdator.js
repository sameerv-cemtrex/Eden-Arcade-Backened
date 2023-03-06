exports.updateTotalRaidsData = async (user) => {
  const raidCount = user.stat.totalRaids ? user.stat.totalRaids : 0;
  user.stat.totalRaids = raidCount + 1;
  user.markModified("stat");
  await user.save();
};

exports.updateTotalSurvivedRaidsData = async (user) => {
  const totalRaids = user.stat.totalRaids;
  const survivedRaidsCount = user.stat.survivedRaids
    ? user.stat.survivedRaids
    : 0;
  user.stat.survivedRaids = survivedRaidsCount + 1;
  user.stat.survivalRate = (survivedRaidsCount / totalRaids) * 100;
  user.markModified("stat");
  await user.save();
};

exports.killsDataEventHandler = async (killType, user, obj) => {
  let totalKills = 0;
  //killType can be drone / weapon

  user.stat.totalKillsCount = user.stat.totalKillsCount
    ? user.stat.totalKillsCount
    : totalKills + 1;

  switch (killType) {
    case "drone":
      await updateDroneKillsData(user, obj.droneType);
      break;
    case "weapon":
      await updateWeaponKillsData(user, obj.weaponType);
      break;
    default:
      return;
  }
};

exports.updateDroneKillsData = async (user, droneType) => {
  const totalDronesKilledCount = user.stat.totalDronesKills;
  user.stat.totalDronesKills = totalDronesKilledCount
    ? totalDronesKilledCount + 1
    : 1;

  switch (droneType) {
    case "small":
      const smallDronesKilledCount = user.stat.smallDronesKills;
      user.stat.smallDronesKills = smallDronesKilledCount
        ? smallDronesKilledCount + 1
        : 1;
      user.markModified("stat");
      await user.save();
      break;
    case "medium":
      const mediumDronesKilledCount = user.stat.mediumDronesKills;
      user.stat.mediumDronesKills = smallDronesKilledCount
        ? smallDronesKilledCount + 1
        : 1;
      user.markModified("stat");
      await user.save();
      break;
    case "large":
      const largeDronesKilledCount = user.stat.largeDronesKills;
      user.stat.largeDronesKills = largeDronesKilledCount
        ? largeDronesKilledCount + 1
        : 1;
      user.markModified("stat");
      await user.save();
      break;
    default:
    // code block
  }
};
exports.updateWeaponKillsData = async (user, weaponType) => {
  const totalWeaponKillsCount = user.stat.totalDronesKills;
  user.stat.totalWeaponKills = totalWeaponKillsCount
    ? totalWeaponKillsCount + 1
    : 1;

  switch (weaponType) {
    case "gun":
      const gunKillsCount = user.stat.gunKills;
      user.stat.gunKills = gunKillsCount ? gunKillsCount + 1 : 1;
      user.markModified("stat");
      await user.save();
      break;
    case "knife":
      const knifeKillsCount = user.stat.knifeKills;
      user.stat.knifeKills = knifeKillsCount ? knifeKillsCount + 1 : 1;
      user.markModified("stat");
      await user.save();
      break;
    case "grenade":
      const grenadeKillsCount = user.stat.grenadeKills;
      user.stat.grenadeKills = grenadeKillsCount
        ? grenadeKillsCount + 1
        : 1;
      user.markModified("stat");
      await user.save();
      break;
    default:
      return;
  }
};
