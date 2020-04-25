"use strict";
console.log("Yes");

let show = document.querySelector(".show-name");

let name = show.innerText;
show.innerText = "";

setTimeout(() => {
  for (let i = 0; i < name.length; i++) {
    setTimeout(() => (show.innerText += name[i]), 80 * i);
  }
}, 1000);

let desktopNav = document.querySelector("#desktopNav");
let asideBar = document.querySelector("#asideBar");

setTimeout(() => {
  desktopNav.classList.add("visible", "animated", "fadeInLeft");
  asideBar.classList.add("visible", "animated", "fadeInRight");

  let vanillaJs = document.querySelectorAll(".vanilla-js");
  console.log("vanillaJs", vanillaJs);

  vanillaJs.forEach((elem, k) => {
    let name = elem.innerText;
    let length = name.length;
    let tempString = "";

    elem.innerText = "".padStart(length, "*");

    setTimeout(() => {
      for (let i = 0; i < name.length; i++) {
        setTimeout(() => {
          tempString += name[i];
          elem.innerText = tempString.padEnd(length, "*");
        }, 110 * i);
      }
    }, 500);
  });
}, 4000);
