let score = 0;

let bojo = {
  left: 570,
  top: 525,
};

let looRolls = [];

let en = [
  { left: 95, top: -250 },
  { left: 195, top: -250 },
  { left: 295, top: -250 },
  { left: 395, top: -250 },
  { left: 495, top: -250 },
  { left: 595, top: -250 },
  { left: 695, top: -250 },
  { left: 795, top: -250 },
  { left: 895, top: -250 },
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
  { left: 95, top: 50 },
  { left: 195, top: 50 },
  { left: 295, top: 50 },
  { left: 395, top: 50 },
  { left: 495, top: 50 },
  { left: 595, top: 50 },
  { left: 695, top: 50 },
  { left: 795, top: 50 },
  { left: 895, top: 50 },
];

let enemies;

let h = [
  { left: 160, top: 400 },
  { left: 360, top: 400 },
  { left: 560, top: 400 },
  { left: 760, top: 400 },
  { left: 960, top: 400 },
];

let heroes;

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
    score = score - 1;
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
  document.getElementById("heroes").innerHTML = "";
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
};

const enemyCollisionDetection = () => {
  for (let looRoll = 0; looRoll < looRolls.length; looRoll++) {
    for (let covid = 0; covid < enemies.length; covid++) {
      if (
        looRolls[looRoll].left >= enemies[covid].left - 10 &&
        looRolls[looRoll].left <= enemies[covid].left + 30 &&
        looRolls[looRoll].top <= enemies[covid].top + 30 &&
        looRolls[looRoll].top >= enemies[covid].top
      ) {
        score = score + 4;
        enemies.splice(covid, 1);
        looRolls.splice(looRoll, 1);
        document.getElementById("getStuffed").play();
      }
    }
  }
};

const heroesCollisionDetection = () => {
  for (covid = 0; covid < enemies.length; covid++) {
    for (let nhs = 0; nhs < heroes.length; nhs++) {
      if (
        heroes[nhs].left >= enemies[covid].left - 15 &&
        heroes[nhs].left <= enemies[covid].left + 40 &&
        heroes[nhs].top <= enemies[covid].top + 40 &&
        heroes[nhs].top >= enemies[covid].top
      ) {
        enemies.splice(covid, 1);
        heroes.splice(nhs, 1);
        score = score - 10;
      }
    }
  }
};

const friendlyFire = () => {
  for (let looRoll = 0; looRoll < looRolls.length; looRoll++) {
    for (let nhs = 0; nhs < heroes.length; nhs++) {
      if (
        looRolls[looRoll].left >= heroes[nhs].left - 20 &&
        looRolls[looRoll].left <= heroes[nhs].left + 70 &&
        looRolls[looRoll].top <= heroes[nhs].top + 30 &&
        looRolls[looRoll].top >= heroes[nhs].top
      ) {
        heroes.splice(nhs, 1);
        looRolls.splice(looRoll, 1);
        score = score - 15;
        document.getElementById("blitheringIdiot").play();
      }
    }
  }
};

let direction = 4;

const changeDirection = () => {
  if (direction == 4) {
    direction = 1;
  } else direction++;
};

const winner = () =>
  alert("Congrats, Boris! You scored " + score + " political points!");
const loser = () => alert("You're shit Boris");

let removeAllFromPage = () => {
  looRolls.splice(0, looRolls.length);
  enemies.splice(0, enemies.length);
  heroes.splice(0, heroes.length);
};

const winGame = () => {
  if (enemies.length == 0) {
    removeAllFromPage();
    document.getElementById("button-container").className = "showButton";
    document.getElementById("lipSmacking").play();
    clearTimeout(timeLoop);
    setTimeout(winner, 200);
  } else {
    ("");
  }
};

const loseGame = () => {
  for (let covid = 0; covid < enemies.length; covid++) {
    if (
      (bojo.left >= enemies[covid].left - 40 &&
        bojo.left <= enemies[covid].left + 40 &&
        bojo.top <= enemies[covid].top + 40 &&
        bojo.top >= enemies[covid].top) ||
      enemies[covid].top >= sectionHeight
    ) {
      covid = 0;
      removeAllFromPage();
      document.getElementById("button-container").className = "showButton";
      document.getElementById("someDrugs").play();
      clearTimeout(timeLoop);
      setTimeout(loser, 200);
      break;
    } else {
      ("");
    }
  }
};

let timeLoop;

const gameLoop = () => {
  drawNHS();
  drawLooRolls();
  moveLooRolls();
  drawEnemies();
  moveEnemies();
  timeLoop = setTimeout(gameLoop, 100);
  heroesCollisionDetection();
  enemyCollisionDetection();
  friendlyFire();
  updateHtmlScore();
  winGame();
  loseGame();
};

toggleBtn = () => {
  if (document.getElementById("button-container").className == "hideButton")
    document.getElementById("button-container").className = "showButton";
  else document.getElementById("button-container").className = "hideButton";
};

startGame = () => {
  score = 0;
  document.getElementById("streetsSafer").play();
  heroes = [...h];
  // enemies = JSON.parse(JSON.stringify(en));
  enemies = en.map((obj) => ({ ...obj }));
  setInterval(changeDirection, 4000);
  direction = 4;
  gameLoop();
};

const updateHtmlScore = () => {
  document.getElementById("score").innerHTML =
    "<p>POLITICAL POINTS " + "<span>" + score + "</span>" + "</p>";
};

updateHtmlScore();

// early version of logic to move enemies

//   if (
//     enemies[enemies.length - 1].left <= sectionWidth - 120 &&
//     enemies[enemies.length - 1].top <= sectionHeight - 650
//   ) {
//     enemies.forEach((enemy) => {
//       enemy.left = enemy.left + 1;
//     });
//   } else if (enemies[enemies.length - 1].top <= sectionHeight - 650) {
//     enemies.forEach((enemy) => {
//       enemy.top = enemy.top + 1;
//     });
//   } else if (
//     enemies[enemies.length - 1].top <= sectionHeight - 575 &&
//     enemies[enemies.length - 1].left >= sectionWidth - 350
//   ) {
//     enemies.forEach((enemy) => {
//       enemy.left = enemy.left - 1;
//     });
//   } else if (enemies[enemies.length - 1].top <= sectionHeight - 575) {
//     enemies.forEach((enemy) => {
//       enemy.top = enemy.top + 1;
//     });
//   } else if (
//     enemies[enemies.length - 1].left <= sectionWidth - 120 &&
//     enemies[enemies.length - 1].top > sectionHeight - 1200
//   ) {
//     enemies.forEach((enemy) => {
//       enemy.left = enemy.left + 1;
//     });
//   } else if (enemies[enemies.length - 1].top <= sectionHeight - 500) {
//     enemies.forEach((enemy) => {
//       enemy.top = enemy.top + 1;
//     });
//   } else if (
//     enemies[enemies.length - 1].top <=
//     sectionHeight - 425
//     // enemies[enemies.length - 1].left >= sectionWidth - 350
//   ) {
//     enemies.forEach((enemy) => {
//       enemy.left = enemy.left - 1;
//     });
//   }
// };
