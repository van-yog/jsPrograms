"use strict";

let cvs = document.querySelector("#canvas");
let ctx = cvs.getContext("2d");

// control buttons
let btnStartStop = document.querySelector("#btnStartStop");
let btnNewGame = document.querySelector("#btnNewGame");

//properties
let isPause;
let player = {};
let interval;
let speed;
let scoreGame;
// img
let spaceShip = new Image();
let bgSpace = new Image();
let crashLine = new Image();
let blockUp = new Image();
let blockDown = new Image();
let life = new Image();
let block = [];
let saturn = new Image();
let planet = [];
// sound
let fly = new Audio();
let scoreAudio = new Audio();
let gameOver = new Audio();
let congratulations = new Audio();
let backgroundMusic = new Audio();

setStartProperties();

blockDown.onload = startGame;

btnStartStop.addEventListener("click", () => {
  let text = btnStartStop.innerText;

  isPause = text === "Pause" ? true : false;
  btnStartStop.innerText = text === "Pause" ? "Play" : "Pause";

  startGame();
});

btnNewGame.addEventListener("click", newGame);

cvs.addEventListener("click", moveUp);
document.body.addEventListener("keypress", ev => {
  if (!isPause) {
    if (ev.key === "d") player.x += 5;
    if (ev.key === "a") player.x -= 5;
    if (ev.key === "s") player.y += 5;
    if (ev.key === "w") {
      player.y -= 15;
      fly.play();
    }
    checkBorders();
  }
});
function checkBorders() {
  if (player.x + spaceShip.width >= cvs.width)
    player.x = cvs.width - spaceShip.width;
  if (player.x <= 0) player.x = 0;
  if (player.y <= 0) player.y = 0;
}

function newGame() {
  localStorage.setItem("lifes", 3);
  localStorage.setItem("score", 0);
  localStorage.setItem("sumScore", "0");
  isPause = true;

  startPosition();

  startGame();
}

function startPosition() {
  drawLifes();
  drawStatistic();

  player = {
    x: 10,
    y: 150,
    gravitation: 1
  };

  btnStartStop.innerText = "Play";

  location.reload();
}

function drawLifes() {
  let xlife = 10;
  let ylife = cvs.height - 50;
  let lifes = localStorage.getItem("lifes");

  for (let i = 0; i < lifes; i++) {
    ctx.drawImage(life, xlife, ylife);
    xlife += 50;
  }
}

function drawStatistic() {
  let sumScore = Number(localStorage.getItem("sumScore"));
  let record = Number(localStorage.getItem("record"));

  ctx.fillStyle = "#ffd";
  ctx.font = "20px Verdana";
  ctx.fillText("Record:" + record, cvs.width - 130, cvs.height - 80);
  ctx.fillText("Sum: " + sumScore, cvs.width - 130, cvs.height - 50);
  ctx.fillText("Score: " + scoreGame, cvs.width - 130, cvs.height - 20);
}

function startGame() {
  drawGameField();
  drawLifes();
  checkScore();
  drawStatistic();
  if (isPause) return;

  backgroundMusic.play();

  requestAnimationFrame(startGame);
}

function checkScore() {
  let score = 0;

  for (let i = 0; i < block.length; i++) {
    if (!block[i].isVisible) score++;
  }

  if (score >= scoreGame + 1) {
    scoreGame++;
    let b = Number(localStorage.getItem("sumScore")) + 1;
    localStorage.setItem("sumScore", b);
    scoreAudio.play();
  }
}

function drawGameField() {
  ctx.drawImage(bgSpace, 0, 0);

  // let start = block.length > 2 ? block.length - 2 : 0;

  for (let i = 0; i < block.length; i++) {
    replaceBlock(i);
    if (birdCrash(i)) {
      ctx.drawImage(crashLine, 0, cvs.height - crashLine.height);
      drawLifes();
      drawStatistic();
      return startPosition();
    }
    let x = block[i].x;
    if (x == 75) createNewBlock();

    if (x + blockUp.width <= 0) block[i].isVisible = false;
  }
  ctx.drawImage(spaceShip, player.x, player.y);
  ctx.drawImage(crashLine, 0, cvs.height - crashLine.height);

  player.y += player.gravitation;
}

function replaceBlock(i) {
  let x1 = planet[i].x;
  let y1 = planet[i].y;
  ctx.drawImage(saturn, x1, y1);
  planet[i].x--;

  let x = block[i].x;
  let y = block[i].y;
  let yBottom = block[i].y + blockUp.height + interval;

  ctx.drawImage(blockUp, x, y);
  ctx.drawImage(blockDown, x, yBottom);
  // increase speed
  block[i].x -= speed;
}

function createNewBlock() {
  block.push({
    x: cvs.width,
    y: Math.floor(Math.random() * blockUp.height) - blockUp.height,
    isVisible: true
  });

  planet.push({
    x: cvs.width + Math.floor(Math.random() * cvs.width),
    y: Math.floor(Math.random() * cvs.height)
  });

  //increase speed before every 4 blocks
  if (!(block.length % 4)) speed++;
}

function birdCrash(i) {
  let x = block[i].x;
  let y = block[i].y;

  let inBlock = player.x + spaceShip.width >= x ? true : false;
  let inBlock2 = player.x <= x + blockUp.width ? true : false;

  // check: is spaceShip touch block
  if (
    inBlock &&
    inBlock2 &&
    (player.y <= y + blockUp.height ||
      player.y + spaceShip.height >= y + blockUp.height + interval)
  ) {
    endOfLife();
    return true;
  }

  // check: is spaceShip touch ground
  if (player.y + spaceShip.height >= cvs.height - crashLine.height) {
    endOfLife();
    return true;
  }
}

function endOfLife() {
  backgroundMusic.pause();

  let lifes = Number(localStorage.getItem("lifes")) - 1;

  localStorage.setItem("lifes", lifes);

  if (lifes === 0) {
    gameOver.play();

    ctx.drawImage(crashLine, 0, cvs.height - crashLine.height);
    drawLifes();
    drawStatistic();

    alert("Game Over");

    checkRecord();

    newGame();
  }
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
  spaceShip.src = "./src/img/spaceship1.png";
  bgSpace.src = "./src/img/bgSpace.png";
  crashLine.src = "./src/img/crashLine.png";
  blockUp.src = "./src/img/blockUp.png";
  blockDown.src = "./src/img/blockDown.png";
  life.src = "./src/img/life.png";
  saturn.src = "./src/img/saturn.png";

  createNewBlock();

  // Start position of the player
  player = {
    x: 10,
    y: 150,
    gravitation: 1
  };

  // set src of game sound
  fly.src = "./src/audio/rocket.mp3";
  scoreAudio.src = "./src/audio/score.mp3";
  backgroundMusic.src = "./src/audio/backgroundMusic.mp3";
  congratulations.src = "./src/audio/congratulations.mp3";
  gameOver.src = "./src/audio/gameOver.mp3";

  interval = 130;
  speed = 1;
  scoreGame = 0;
}

function moveUp() {
  if (!isPause) {
    player.y -= 10;
    fly.play();
  }
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
