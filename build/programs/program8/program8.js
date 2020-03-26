"use strict";

let cvs = document.querySelector("#canvas");
let ctx = cvs.getContext("2d");

// control buttons
let btnStartStop = document.querySelector("#btnStartStop");
let btnNewGame = document.querySelector("#btnNewGame");

//properties
let isPause;
let player = {};
let player1 = {};
let interval;
let speed;
let scoreGame;
let counter = 0;
// img
let spaceShip = new Image();
let spaceShip1 = new Image();
let bgSpace = new Image();
let crashLine = new Image();
let blockUp = new Image();
let blockDown = new Image();
let life = new Image();
let block = [];

let saturn = new Image();
let earth = new Image();
let moon = new Image();
let star = new Image();
let asteroid = new Image();
let coin = new Image();

let imagesLoad = 0;

let planet = [];
let coins = [];

let allPlanets = [saturn, earth, moon, star, asteroid];
// sound
let fly = new Audio();
let scoreAudio = new Audio();
let gameOver = new Audio();
let congratulations = new Audio();
let backgroundMusic = new Audio();
let beepStart = new Audio();

setStartProperties();

// backgroundMusic.onload = startGame;

btnStartStop.addEventListener("click", () => {
  let text = btnStartStop.innerText;

  isPause = text === "Pause" ? true : false;
  btnStartStop.innerText = text === "Pause" ? "Play" : "Pause";

  startGame();
});

btnNewGame.addEventListener("click", newGame);

cvs.addEventListener("click", moveUp);
document.body.addEventListener("keydown", ev => movePlayer(ev));

function newGame() {
  localStorage.setItem("lifes", 3);
  localStorage.setItem("sumScore", "0");
  isPause = true;
  location.reload();
}

function drawStatistic() {
  // draw foreground
  ctx.drawImage(crashLine, 0, cvs.height - crashLine.height);

  // draw lifes
  let xlife = 10;
  let ylife = cvs.height - 50;
  let lifes = Number(localStorage.getItem("lifes"));

  for (let i = 0; i < lifes; i++) {
    ctx.drawImage(life, xlife, ylife);
    xlife += 50;
  }

  // draw score, record
  let sumScore = Number(localStorage.getItem("sumScore"));
  let record = Number(localStorage.getItem("record"));

  ctx.fillStyle = "#ffd";
  ctx.font = "20px Verdana";
  ctx.fillText("Record:" + record, cvs.width - 130, cvs.height - 80);
  ctx.fillText("Sum: " + sumScore, cvs.width - 130, cvs.height - 50);
  ctx.fillText("Score: " + scoreGame, cvs.width - 130, cvs.height - 20);
}

function startGame() {
  if (!counter) beepStart.play();

  drawBackground();
  drawPlanets();
  drawCoins();
  checkCrash();
  checkCoinsTouch();
  drawBlocks();
  drawPlayer();
  drawStatistic();

  if (isPause) return;

  backgroundMusic.play();

  requestAnimationFrame(startGame);
}

function drawPlayer() {
  ctx.drawImage(spaceShip, player.x, player.y++);
  // ctx.drawImage(spaceShip1, player1.x, player1.y++);
}

function drawBackground() {
  ctx.drawImage(bgSpace, 0, 0);
}
function newY() {
  return Math.round(Math.random() * (cvs.height - crashLine.height - 50));
}
function newX() {
  return cvs.width + Math.round(Math.random() * cvs.width);
}
function randomNamePlanet() {
  let i = Math.round(Math.random() * 4);
  return allPlanets[i];
}

function drawCoins() {
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].x > -60) {
      ctx.drawImage(coin, coins[i].x--, coins[i].y);
    } else {
      coins[i].y = newY();
      coins[i].x = Math.round(Math.random() * cvs.width);
    }
  }
}

function drawPlanets() {
  counter++;
  for (let i = 0; i < planet.length; i++) {
    if (planet[i].x > -60) {
      if (planet[i].speed == 1 && counter % 2) {
        ctx.drawImage(planet[i].name, planet[i].x, planet[i].y);
      } else if (planet[i].speed == 2 && counter % 3) {
        ctx.drawImage(planet[i].name, planet[i].x, planet[i].y);
      } else {
        ctx.drawImage(planet[i].name, planet[i].x--, planet[i].y);
      }
    } else {
      planet[i].y = newY();
      planet[i].x = cvs.width + 10;
      planet[i].name = randomNamePlanet();
    }
  }
}

function drawBlocks() {
  for (let i = 0; i < block.length; i++) {
    if (block[i].x + blockUp.width >= 0) {
      let yDown = block[i].y + blockUp.height + interval;

      ctx.drawImage(blockUp, block[i].x, block[i].y);
      ctx.drawImage(blockDown, block[i].x, yDown);
      block[i].x -= speed;
    } else {
      // scoreGame++;
      // let sumScore = Number(localStorage.getItem("sumScore")) + 1;
      // localStorage.setItem("sumScore", sumScore);
      // scoreAudio.play();

      block[i].y = Math.floor(Math.random() * blockUp.height) - blockUp.height;
      block[i].x = cvs.width + 60;
      if (scoreGame > 10) speed = 2;
      if (scoreGame > 18) speed = 3;
      if (scoreGame > 26) speed = 4;
      if (scoreGame > 35) speed = 5;
    }
  }
}

function checkCrash() {
  if (isTouchBlock() || isFall()) endOfLife();
}

function isFall() {
  if (player.y + spaceShip.height >= cvs.height - crashLine.height) return true;
}

function checkCoinsTouch() {
  for (let i = 0; i < coins.length; i++) {
    let x = Math.abs(coins[i].x - player.x);
    let y = Math.abs(coins[i].y - player.y);
    let r = coin.width;
    if (x < r && y < r) {
      scoreGame++;
      let sumScore = Number(localStorage.getItem("sumScore")) + 1;
      localStorage.setItem("sumScore", sumScore);
      scoreAudio.play();

      coins[i].y = newY();
      coins[i].x = cvs.width / 2 + Math.round(Math.random() * cvs.width);
    }
  }
}

function isTouchBlock() {
  for (let i = 0; i < block.length; i++) {
    let x = block[i].x;
    let y = block[i].y;
    let inBlock = player.x + spaceShip.width >= x ? true : false;
    let inBlock2 = player.x <= x + blockUp.width ? true : false;

    if (
      inBlock &&
      inBlock2 &&
      (player.y <= y + blockUp.height ||
        player.y + spaceShip.height >= y + blockUp.height + interval)
    ) {
      return true;
    }
  }
}

function endOfLife() {
  backgroundMusic.pause();
  let lifes = Number(localStorage.getItem("lifes")) - 1;
  console.log("Lifes :", lifes);

  localStorage.setItem("lifes", lifes);

  if (lifes === 0) {
    gameOver.play().then(() => alert("Game Over"));

    checkRecord();
    newGame();
  }

  isPause = true;
  location.reload();

  // var playPromise = document.querySelector("video").play();

  // // In browsers that don’t yet support this functionality,
  // // playPromise won’t be defined.
  // if (playPromise !== undefined) {
  //   playPromise
  //     .then(function() {
  //       // Automatic playback started!
  //     })
  //     .catch(function(error) {
  //       // Automatic playback failed.
  //       // Show a UI element to let the user manually start playback.
  //     });
  // }
}

function setStartProperties() {
  isPause = true;

  // Create statistic
  if (!localStorage.lifes) {
    localStorage.setItem("lifes", 3);
  }
  if (!localStorage.record) {
    localStorage.setItem("record", 0);
  }

  if (!localStorage.sumScore) {
    localStorage.setItem("sumScore", 0);
  }
  console.log(localStorage);

  // set src of game images
  spaceShip1.src = "./src/img/spaceship1.png";
  spaceShip.src = "./src/img/spaceship.png";
  bgSpace.src = "./src/img/bgSpaceXXL.png";
  crashLine.src = "./src/img/crashLineXXL.png";
  blockUp.src = "./src/img/blockUp.png";
  blockDown.src = "./src/img/blockDown.png";
  life.src = "./src/img/life.png";
  saturn.src = "./src/img/saturn.png";
  earth.src = "./src/img/earth.png";
  moon.src = "./src/img/moon.png";
  star.src = "./src/img/star1.png";
  asteroid.src = "./src/img/asteroid.png";
  coin.src = "./src/img/coin.png";

  createPlanet();
  createPlanet(2);
  createPlanet(3);

  createCoin();
  createCoin();
  createCoin();
  createCoin();
  createCoin();
  createCoin();
  createCoin();

  createBlock();
  createBlock(Math.round((cvs.width * 2) / 3));

  // Start position of the player
  player = {
    x: 100,
    y: 150
  };

  player1 = {
    x: 100,
    y: 200
  };

  // set src of game sound
  fly.src = "./src/audio/rocket.mp3";
  scoreAudio.src = "./src/audio/score.mp3";
  backgroundMusic.src = "./src/audio/backgroundMusic.mp3";
  congratulations.src = "./src/audio/congratulations.mp3";
  gameOver.src = "./src/audio/gameOver.mp3";
  beepStart.src = "./src/audio/beepStart.mp3";

  interval = 140;
  speed = 1;
  scoreGame = 0;

  drawBackground();

  bgSpace.onload = drawBackground;
  setTimeout(drawPlayer, 500);
  crashLine.onload = drawStatistic;
}

function createCoin() {
  coins.push({
    x: Math.round(Math.random() * cvs.width),
    y: newY()
  });
}

function createPlanet(panetSpeed = 1) {
  planet.push({
    x: newX(),
    y: newY(),
    speed: panetSpeed,
    name: randomNamePlanet()
  });
}

function createBlock(dist = 0) {
  block.push({
    x: cvs.width + dist,
    y: Math.floor(Math.random() * blockUp.height) - blockUp.height
  });
}

function moveUp() {
  if (isPause) return;
  player.y -= 15;
  fly.play();
}

function checkRecord() {
  let record = Number(localStorage.getItem("record"));
  let score = Number(localStorage.getItem("sumScore"));

  if (record < score) {
    congratulations.play();
    alert(`Congratulations! New record : ${score}`);

    localStorage.setItem("record", score);
  }
}

function movePlayer(ev) {
  let key = ev.code;
  ev.preventDefault();

  console.log(ev);
  if (isPause) return;
  if (key === "KeyD" || key === "ArrowRight") player.x += 20;
  if (key === "KeyA" || key === "ArrowLeft") player.x -= 20;
  if (key === "KeyS" || key === "ArrowDown") player.y += 15;
  if (key === "KeyW" || key === "ArrowUp") {
    player.y -= 25;
    fly.play();
  }
  checkBorders();
}

function checkBorders() {
  if (player.x + spaceShip.width >= cvs.width)
    player.x = cvs.width - spaceShip.width;
  if (player.x <= 0) player.x = 0;
  if (player.y <= 0) player.y = 0;
}
