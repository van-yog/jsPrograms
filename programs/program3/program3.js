let windowGame = document.querySelector(".window__game");
let shape = document.querySelector("#shape");

windowGame.addEventListener("click", e => {
  let x = e.offsetX ? e.layerX : e.offsetX;
  let y = e.offsetY ? e.layerY : e.offsetY;
  let gameField = windowGame.getBoundingClientRect();
  let spanField = e.target.getBoundingClientRect();

  if (e.target.tagName == "SPAN") {
    x = spanField.left - gameField.left + x;
    y = spanField.top - gameField.top + y;
  }

  //  Проверка выходет ли круг за границы игрового поля
  //  Очередность проверки  - левый край, верх, правый край, низ
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
});

// Функции удаления класса фигуры и добавление согласно кнопке
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
