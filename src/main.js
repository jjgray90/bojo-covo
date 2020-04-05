let bojo = {
  left: 570,
  top: 525,
};

let looRolls = [];

let enemies = [
  { left: 95, top: -175 },
  { left: 195, top: -175 },
  { left: 295, top: -175 },
  { left: 395, top: -175 },
  { left: 495, top: -175 },
  { left: 595, top: -175 },
  { left: 695, top: -175 },
  { left: 795, top: -175 },
  { left: 895, top: -175 },
  { left: 95, top: -100 },
  { left: 195, top: -100 },
  { left: 295, top: -100 },
  { left: 395, top: -100 },
  { left: 495, top: -100 },
  { left: 595, top: -100 },
  { left: 695, top: -100 },
  { left: 795, top: -100 },
  { left: 895, top: -100 },
  { left: 95, top: -25 },
  { left: 195, top: -25 },
  { left: 295, top: -25 },
  { left: 395, top: -25 },
  { left: 495, top: -25 },
  { left: 595, top: -25 },
  { left: 695, top: -25 },
  { left: 795, top: -25 },
  { left: 895, top: -25 },
];

let heroes = [
  { left: 160, top: 400 },
  { left: 360, top: 400 },
  { left: 560, top: 400 },
  { left: 760, top: 400 },
  { left: 960, top: 400 },
];

const background = document.getElementById("background");
const container = document.getElementById("enemies");

const sectionWidth = background.clientWidth;
const sectionHeight = background.clientHeight;

document.onkeydown = (e) => {
  if (e.keyCode === 37) {
    bojo.left = bojo.left - 10;
  }
  if (e.keyCode === 39) {
    bojo.left = bojo.left + 10;
  }
  if (e.keyCode === 32) {
    looRolls.push({
      left: bojo.left + 20,
      top: bojo.top - 20,
    });
    document.getElementById("fire").play();
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
  for (let i = 0; i < looRolls.length; i++) {
    document.getElementById(
      "looRolls"
    ).innerHTML += `<div class='looRoll' style='left:${looRolls[i].left}px; top:${looRolls[i].top}px'></div>`;
  }
};

const moveLooRolls = () => {
  for (let i = 0; i < looRolls.length; i++) {
    looRolls[i].top = looRolls[i].top - 12;
  }
};

const drawNHS = () => {
  document.getElementById("heroes").innherHTML = "";
  for (let i = 0; i < heroes.length; i++) {
    document.getElementById(
      "heroes"
    ).innerHTML += `<div class='nhs' style='left:${heroes[i].left}px; top:${heroes[i].top}px'></div>`;
  }
};

const drawEnemies = () => {
  document.getElementById("enemies").innerHTML = "";
  for (let i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemies"
    ).innerHTML += `<div class='covid' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
  }
};

const moveEnemies = () => {
  switch (direction) {
    case 2:
      enemies.forEach((enemy) => {
        enemy.left = enemy.left - 4;
      });
      break;
    case 4:
      enemies.forEach((enemy) => {
        enemy.left = enemy.left + 4;
      });
      break;
    default:
      enemies.forEach((enemy) => {
        enemy.top = enemy.top + 1;
      });
  }

  // early version of logic to move enemies

  // if (
  //   enemies[enemies.length - 1].left <= sectionWidth - 120 &&
  //   enemies[enemies.length - 1].top <= sectionHeight - 650
  // ) {
  //   enemies.forEach((enemy) => {
  //     enemy.left = enemy.left + 1;
  //   });
  // } else if (enemies[enemies.length - 1].top <= sectionHeight - 650) {
  //   enemies.forEach((enemy) => {
  //     enemy.top = enemy.top + 1;
  //   });
  // } else if (
  //   enemies[enemies.length - 1].top <= sectionHeight - 575 &&
  //   enemies[enemies.length - 1].left >= sectionWidth - 350
  // ) {
  //   enemies.forEach((enemy) => {
  //     enemy.left = enemy.left - 1;
  //   });
  // } else if (enemies[enemies.length - 1].top <= sectionHeight - 575) {
  //   enemies.forEach((enemy) => {
  //     enemy.top = enemy.top + 1;
  //   });
  // } else if (
  //   enemies[enemies.length - 1].left <= sectionWidth - 120 &&
  //   enemies[enemies.length - 1].top > sectionHeight - 1200
  // ) {
  //   enemies.forEach((enemy) => {
  //     enemy.left = enemy.left + 1;
  //   });
  // } else if (enemies[enemies.length - 1].top <= sectionHeight - 500) {
  //   enemies.forEach((enemy) => {
  //     enemy.top = enemy.top + 1;
  //   });
  // } else if (
  //   enemies[enemies.length - 1].top <=
  //   sectionHeight - 425
  //   // enemies[enemies.length - 1].left >= sectionWidth - 350
  // ) {
  //   enemies.forEach((enemy) => {
  //     enemy.left = enemy.left - 1;
  //   });
  // }
};

const enemyCollisionDetection = () => {
  for (let looRoll = 0; looRoll < looRolls.length; looRoll++) {
    for (let covid = 0; covid < enemies.length; covid++) {
      if (
        looRolls[looRoll].left >= enemies[covid].left - 15 &&
        looRolls[looRoll].left <= enemies[covid].left + 40 &&
        looRolls[looRoll].top <= enemies[covid].top + 40 &&
        looRolls[looRoll].top >= enemies[covid].top
      ) {
        enemies.splice(covid, 1);
        looRolls.splice(looRoll, 1);
        document.getElementById("getStuffed").play();
      }
    }
  }
};

// const heroesCollisionDetection = () => {
//   for (covid = 0; covid < enemies.length; covid++) {
//     for (let nhs = 0; nhs < heroes.length; nhs++) {
//       if (
//         heroes[nhs].left >= enemies[covid].left - 15 &&
//         heroes[nhs].left <= enemies[covid].left + 40 &&
//         heroes[nhs].top <= enemies[covid].top + 40 &&
//         heroes[nhs].top >= enemies[covid].top
//       ) {
//         enemies.splice(covid, 1);
//         heroes.splice(nhs, 1);
//       }
//     }
//   }
// };

let direction = 4;

const changeDirection = () => {
  if (direction == 4) {
    direction = 1;
  } else direction++;
};

setInterval(changeDirection, 4000);

const gameLoop = () => {
  setTimeout(gameLoop, 100);
  // drawNHS();
  moveLooRolls();
  drawLooRolls();
  drawEnemies();
  moveEnemies();
  // heroesCollisionDetection();
  enemyCollisionDetection();
};

gameLoop();
