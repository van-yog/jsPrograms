"use strict";

let cvs = document.querySelector("#canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "./img/bird.png";
bg.src = "./img/bg.png";
fg.src = "./img/fg.png";
pipeUp.src = "./img/pipeUp.png";
pipeBottom.src = "./img/pipeBottom.png";

// Position of bird
let xPos = 10;
let yPos = 150;
let grav = 1;

// sound
let fly = new Audio();
let score_audio = new Audio();

fly.src = "./audio/fly.mp3";
score_audio.src = "./audio/score.mp3";

let gap = 130;

document.addEventListener("click", moveUp);

let score = 0;
// Block creation
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

function moveUp() {
  console.log("blin");
  yPos -= 30;
  fly.play();
}

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if (
      xPos + bird.width >= pipe[i].x &&
      xPos <= pipe[i].x + pipeUp.width &&
      (yPos <= pipe[i].y + pipeUp.height ||
        yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
    ) {
      alert("Crash");
      location.reload();
    }
    if (yPos + bird.height >= cvs.height - fg.height) {
      console.log("Проверка на достижения дна");
      location.reload();
    }

    if (pipe[i].x + pipeUp.width == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
