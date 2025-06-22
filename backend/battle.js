const classMap = {
  Militia: ["Spearmen", "LightCavalry"],
  Spearmen: ["LightCavalry", "HeavyCavalry"],
  LightCavalry: ["FootArcher", "CavalryArcher"],
  HeavyCavalry: ["Militia", "FootArcher", "LightCavalry"],
  CavalryArcher: ["Spearmen", "HeavyCavalry"],
  FootArcher: ["Militia", "CavalryArcher"],
};

function parsePlatoons(input) {
  return input.split(";").map((p) => {
    const [cls, count] = p.split("#");
    return { cls, count: parseInt(count) };
  });
}

function battleResult(me, enemy) {
  let myPower = me.count;
  let enemyPower = enemy.count;

  if (classMap[me.cls]?.includes(enemy.cls)) {
    myPower *= 2;
  } else if (classMap[enemy.cls]?.includes(me.cls)) {
    enemyPower *= 2;
  }

  if (myPower > enemyPower) {
    return "win";
  } else if (myPower === enemyPower) {
    return "draw";
  } else {
    return "lose";
  }
}

function permutations(arr) {
  if (arr.length === 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const permutation of permutations(remaining)) {
      result.push([current, ...permutation]);
    }
  }
  return result;
}

function finalWinningResult(myInput, enemyInput) {
  const myPlatoons = parsePlatoons(myInput);
  const enemyPlatoons = parsePlatoons(enemyInput);

  if (myPlatoons.length != 5 || enemyPlatoons.length != 5) {
    return "Error: Both sides must have exactly 5 platoons";
  }

  const allPermutations = permutations(myPlatoons);

  for (const permutation of allPermutations) {
    let winCount = 0;
    const battleLogs = [];

    for (let i = 0; i < 5; i++) {
      const result = battleResult(permutation[i], enemyPlatoons[i]);
      battleLogs.push({
        battle: `Battle ${i + 1}`,
        own: `${permutation[i].cls}#${permutation[i].count}`,
        enemy: `${enemyPlatoons[i].cls}#${enemyPlatoons[i].count}`,
        outcome: result,
      });

      if (result === "win") winCount++;
    }

    if (winCount >= 3) {
      return {
        winningResult: permutation.map((p) => `${p.cls}#${p.count}`).join(";"),
        battleLogs,
      };
    }
  }

  return "There is no chance of winning";
}

module.exports = { finalWinningResult };
