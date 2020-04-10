const windowHeight = window.innerHeight - 50;

let score = 0;

let bojo = {
  left: 570,
  bottom: 30,
};

let looRolls = [];

let en = [
  { left: 95, bottom: windowHeight + 150 },
  { left: 195, bottom: windowHeight + 150 },
  { left: 295, bottom: windowHeight + 150 },
  { left: 395, bottom: windowHeight + 150 },
  { left: 495, bottom: windowHeight + 150 },
  { left: 595, bottom: windowHeight + 150 },
  { left: 695, bottom: windowHeight + 150 },
  { left: 795, bottom: windowHeight + 150 },
  { left: 895, bottom: windowHeight + 150 },
  { left: 95, bottom: windowHeight + 75 },
  { left: 195, bottom: windowHeight + 75 },
  { left: 295, bottom: windowHeight + 75 },
  { left: 395, bottom: windowHeight + 75 },
  { left: 495, bottom: windowHeight + 75 },
  { left: 595, bottom: windowHeight + 75 },
  { left: 695, bottom: windowHeight + 75 },
  { left: 795, bottom: windowHeight + 75 },
  { left: 895, bottom: windowHeight + 75 },
  { left: 95, bottom: windowHeight },
  { left: 195, bottom: windowHeight },
  { left: 295, bottom: windowHeight },
  { left: 395, bottom: windowHeight },
  { left: 495, bottom: windowHeight },
  { left: 595, bottom: windowHeight },
  { left: 695, bottom: windowHeight },
  { left: 795, bottom: windowHeight },
  { left: 895, bottom: windowHeight },
  { left: 95, bottom: windowHeight - 75 },
  { left: 195, bottom: windowHeight - 75 },
  { left: 295, bottom: windowHeight - 75 },
  { left: 395, bottom: windowHeight - 75 },
  { left: 495, bottom: windowHeight - 75 },
  { left: 595, bottom: windowHeight - 75 },
  { left: 695, bottom: windowHeight - 75 },
  { left: 795, bottom: windowHeight - 75 },
  { left: 895, bottom: windowHeight - 75 },
  { left: 95, bottom: windowHeight - 150 },
  { left: 195, bottom: windowHeight - 150 },
  { left: 295, bottom: windowHeight - 150 },
  { left: 395, bottom: windowHeight - 150 },
  { left: 495, bottom: windowHeight - 150 },
  { left: 595, bottom: windowHeight - 150 },
  { left: 695, bottom: windowHeight - 150 },
  { left: 795, bottom: windowHeight - 150 },
  { left: 895, bottom: windowHeight - 150 },
];

let enemies;

let h = [
  { left: 160, bottom: 150 },
  { left: 360, bottom: 150 },
  { left: 560, bottom: 150 },
  { left: 760, bottom: 150 },
  { left: 960, bottom: 150 },
];

let heroes;

// const background = document.getElementById("background");
// const container = document.getElementById("enemies");

// const sectionWidth = background.clientWidth;
// const sectionHeight = background.clientHeight;

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
      bottom: bojo.bottom + 20,
    });
    document.getElementById("fire").play();
    score = score - 1;
    drawLooRolls();
  }
  drawBojo();
};

const drawBojo = () => {
  document.getElementById("bojo").style.left = bojo.left + "px";
  document.getElementById("bojo").style.bottom = bojo.bottom + "px";
};

const drawLooRolls = () => {
  document.getElementById("looRolls").innerHTML = "";
  for (let i = 0; i < looRolls.length; i++) {
    document.getElementById(
      "looRolls"
    ).innerHTML += `<div class='looRoll' style='left:${looRolls[i].left}px; bottom:${looRolls[i].bottom}px'></div>`;
  }
};

const moveLooRolls = () => {
  for (let i = 0; i < looRolls.length; i++) {
    looRolls[i].bottom = looRolls[i].bottom + 12;
  }
};

const drawNHS = () => {
  document.getElementById("heroes").innerHTML = "";
  for (let i = 0; i < heroes.length; i++) {
    document.getElementById(
      "heroes"
    ).innerHTML += `<div class='nhs' style='left:${heroes[i].left}px; bottom:${heroes[i].bottom}px'></div>`;
  }
};

const drawEnemies = () => {
  document.getElementById("enemies").innerHTML = "";
  for (let i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemies"
    ).innerHTML += `<div class='covid' style='left:${enemies[i].left}px; bottom:${enemies[i].bottom}px'></div>`;
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
        enemy.bottom = enemy.bottom - 1;
      });
  }
};

const enemyCollisionDetection = () => {
  for (let looRoll = 0; looRoll < looRolls.length; looRoll++) {
    for (let covid = 0; covid < enemies.length; covid++) {
      if (
        looRolls[looRoll].left + 30 >= enemies[covid].left &&
        looRolls[looRoll].left <= enemies[covid].left + 50 &&
        looRolls[looRoll].bottom + 50 >= enemies[covid].bottom
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
        (heroes[nhs].left <= enemies[covid].left + 50 &&
          heroes[nhs].bottom + 33 >= enemies[covid].bottom) ||
        (heroes[nhs].bottom + 33 >= enemies[covid].bottom &&
          heroes[nhs].left + 80 <= enemies[covid].left)
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
        looRolls[looRoll].bottom + 50 >= heroes[nhs].bottom
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
        bojo.bottom + 80 >= enemies[covid].bottom &&
        bojo.bottom <= enemies[covid].bottom) ||
      enemies[covid].bottom <= 0
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
