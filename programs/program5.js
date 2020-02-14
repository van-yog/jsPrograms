"use strict";

let btn = document.querySelector("#button");
let btnStop = document.querySelector("#button-stop");
let btnClose = document.querySelector("#button-close");
let menu = document.querySelector(".menu");
let timerId;

btn.addEventListener("click", event => {
  menu.classList.toggle("open");
  let isOpen = menu.classList.contains("open");

  if (isOpen) {
    let elem = menu.querySelector(".submenu");
    timerId = setTimeout(openMenu, 500, elem);
  } else {
    closeOpenItems(menu.querySelectorAll(".open"));
  }
});

btnStop.addEventListener("click", event => {
  console.log("efsfd");
  clearTimeout(timerId);
});

btnClose.addEventListener("click", event => {
  let isOpen = menu.classList.contains("open");
  console.log(isOpen);
  console.log("efsfd");
  if (isOpen) {
    let elem = menu.querySelectorAll(".open");
    timerId = setTimeout(closeMenu, 500, elem);
  }
});

menu.addEventListener("click", event => {
  let { target } = event;
  let submenu = target.querySelector(".submenu");
  let closeAll = menu.querySelectorAll(".submenu.open");
  let className = submenu.parentElement.classList.value;

  if (className === "menu__item") {
    console.log("eeee");
    for (let i = 0; i < closeAll.length; i++) {
      if (submenu === closeAll[i]) {
        continue;
      }
      closeAll[i].classList.remove("open");
    }
  }

  if (submenu) {
    submenu.classList.toggle("open");
  }
});

function openMenu(element) {
  if (!element) {
    return;
  }
  element.classList.add("open");
  console.log(element.childNodes);
  let nextElement = element.children[0].querySelector(".submenu");
  console.log(nextElement);
  timerId = setTimeout(openMenu, 500, nextElement);
}

function closeOpenItems(closeAll) {
  for (let i = 0; i < closeAll.length; i++) {
    closeAll[i].classList.remove("open");
  }
}

function closeMenu(elem) {
  let last = elem.length - 1;

  if (last == -1) {
    menu.classList.remove("open");
    return;
  }

  elem[last].classList.remove("open");

  let e = menu.querySelectorAll(".open");
  timerId = setTimeout(closeMenu, 500, e);
}
