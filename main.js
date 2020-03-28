let bojo = {
  left: 575,
  top: 600
};

let looRolls = [];

let enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
  { left: 200, top: 250 },
  { left: 300, top: 250 },
  { left: 400, top: 250 },
  { left: 500, top: 250 },
  { left: 600, top: 250 },
  { left: 700, top: 250 },
  { left: 800, top: 250 },
  { left: 900, top: 250 }
];

document.onkeydown = e => {
  if (e.keyCode === 37) {
    // Left
    bojo.left = bojo.left - 10;
  }
  if (e.keyCode === 39) {
    // Right
    bojo.left = bojo.left + 10;
  }
  if (e.keyCode === 32) {
    // Spacebar (fire)
    looRolls.push({
      left: bojo.left + 20,
      top: bojo.top - 20
    });
    drawLooRolls();
  }
  drawBojo();
};

const drawBojo = () => {
  document.getElementById("bojo").style.left = bojo.left + "px";
  document.getElementById("bojo").style.top = bojo.top + "px";
};

const drawLooRolls = () => {
  document.getElementById("looRolls").innerHTML = "";
  for (var i = 0; i < looRolls.length; i++) {
    document.getElementById(
      "looRolls"
    ).innerHTML += `<div class='looRoll' style='left:${looRolls[i].left}px; top:${looRolls[i].top}px'></div>`;
  }
};

const moveLooRolls = () => {
  for (var i = 0; i < looRolls.length; i++) {
    looRolls[i].top = looRolls[i].top - 8;
  }
};

const drawEnemies = () => {
  document.getElementById("enemies").innerHTML = "";
  for (var i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemies"
    ).innerHTML += `<div class='covid' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
  }
};

const moveEnemies = () => {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].top = enemies[i].top + 1;
  }
};

const collisionDetection = () => {
  for (var covid = 0; covid < enemies.length; covid++) {
    for (var looRoll = 0; looRoll < looRolls.length; looRoll++) {
      if (
        looRolls[looRoll].left >= enemies[covid].left - 15 &&
        looRolls[looRoll].left <= enemies[covid].left + 40 &&
        looRolls[looRoll].top <= enemies[covid].top + 40 &&
        looRolls[looRoll].top >= enemies[covid].top
      ) {
        enemies.splice(covid, 1);
        looRolls.splice(looRoll, 1);
      }
    }
  }
};

const gameLoop = () => {
  setTimeout(gameLoop, 100);
  moveLooRolls();
  drawLooRolls();
  moveEnemies();
  drawEnemies();
  collisionDetection();
};

gameLoop();
