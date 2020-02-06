let windowGame = document.querySelector(".window__game");
let shape = document.querySelector("#shape");
let body = document.querySelector("body");
let rect = windowGame.getBoundingClientRect();
console.log(`ширина ${rect.width} высота ${rect.height}`);

function circle() {
  let shape = document.querySelector("#shape");
  shape.classList.remove("square");
  shape.classList.remove("moon");
  shape.classList.add("circle");
}

function square() {
  let shape = document.querySelector("#shape");
  shape.classList.remove("circle");
  shape.classList.remove("moon");
  shape.classList.add("square");
}

function moon() {
  let shape = document.querySelector("#shape");
  shape.classList.remove("circle");
  shape.classList.remove("square");
  shape.classList.add("moon");
}

windowGame.addEventListener("click", e => {
  console.log(e.target);
  let x = e.offsetX == undefined ? e.layerX : e.offsetX;
  let y = e.offsetY == undefined ? e.layerY : e.offsetY;
  let gameField = windowGame.getBoundingClientRect();
  console.log(`ширина ${gameField.width} высота ${gameField.height}`);
  console.log(x + "x" + y);

  if (x < 30) {
    x = 30;
  }
  if (y < 30) {
    y = 30;
  }
  if (x + 30 > gameField.width) {
    x = gameField.width - 30;
  }
  if (y + 30 > gameField.height) {
    y = gameField.height - 30;
  }

  shape.style.top = y - 25 + "px";
  shape.style.left = x - 25 + "px";

  console.log(x + "x" + y);
});
