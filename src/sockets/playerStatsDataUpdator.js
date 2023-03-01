exports.updateTotalRaidsData = async (user) => {
  const raidCount = user.playerStat.totalRaids ? user.playerStat.totalRaids : 0;
  user.playerStat.totalRaids = raidCount + 1;
  user.markModified("playerStat");
};

exports.updateTotalSurvivedRaidsData = async (user) => {
  const totalRaids = user.playerStat.totalRaids;
  const survivedRaidsCount = user.playerStat.survivedRaids
    ? user.playerStat.survivedRaids
    : 0;
  user.playerStat.survivedRaids = survivedRaidsCount + 1;
  user.playerStat.survivalRate = (survivedRaidsCount / totalRaids) * 100;
  user.markModified("playerStat");
};

exports.killsDataEventHandler = async (killType, user, obj) => {
  let totalKills = 0;
  //killType can be drone / weapon

  user.playerStat.totalKillsCount = user.playerStat.totalKillsCount
    ? user.playerStat.totalKillsCount
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
  const totalDronesKilledCount = user.playerStat.totalDronesKills;
  user.playerStat.totalDronesKills = totalDronesKilledCount
    ? totalDronesKilledCount + 1
    : 1;

  switch (droneType) {
    case "small":
      const smallDronesKilledCount = user.playerStat.smallDronesKills;
      user.playerStat.smallDronesKills = smallDronesKilledCount
        ? smallDronesKilledCount + 1
        : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    case "medium":
      const mediumDronesKilledCount = user.playerStat.mediumDronesKills;
      user.playerStat.mediumDronesKills = smallDronesKilledCount
        ? smallDronesKilledCount + 1
        : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    case "large":
      const largeDronesKilledCount = user.playerStat.largeDronesKills;
      user.playerStat.largeDronesKills = largeDronesKilledCount
        ? largeDronesKilledCount + 1
        : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    default:
    // code block
  }
};
exports.updateWeaponKillsData = async (user, weaponType) => {
  const totalWeaponKillsCount = user.playerStat.totalDronesKills;
  user.playerStat.totalWeaponKills = totalWeaponKillsCount
    ? totalWeaponKillsCount + 1
    : 1;

  switch (weaponType) {
    case "gun":
      const gunKillsCount = user.playerStat.gunKills;
      user.playerStat.gunKills = gunKillsCount ? gunKillsCount + 1 : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    case "knife":
      const knifeKillsCount = user.playerStat.knifeKills;
      user.playerStat.knifeKills = knifeKillsCount ? knifeKillsCount + 1 : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    case "grenade":
      const grenadeKillsCount = user.playerStat.grenadeKills;
      user.playerStat.grenadeKills = grenadeKillsCount
        ? grenadeKillsCount + 1
        : 1;
      user.markModified("playerStat");
      await user.save();
      break;
    default:
      return;
  }
};
