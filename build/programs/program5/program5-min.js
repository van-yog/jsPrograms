"use strict";const ONE_SECOND=1e3;let timerId,delay=1e3,btnOpen=document.querySelector("#button-open"),btnStop=document.querySelector("#button-stop"),btnClose=document.querySelector("#button-close"),menu=document.querySelector(".menu-list");function openMenu(e){if(!e)return;e.classList.add("open");let n=e.children[0].querySelector(".submenu");timerId=setTimeout(openMenu,delay,n)}function closeMenu(e){let n=e.length-1;if(-1===n)return void menu.classList.remove("open");e[n].classList.remove("open");let t=menu.querySelectorAll(".open");timerId=setTimeout(closeMenu,delay,t)}function closeOpenItems(e){for(let n=0;n<e.length;n++)e[n].classList.remove("open")}btnOpen.addEventListener("click",()=>{if(menu.classList.toggle("open"),menu.classList.contains("open")){btnOpen.innerHTML="Hide";let e=menu.querySelector(".submenu");timerId=setTimeout(openMenu,delay,e)}else{btnOpen.innerHTML="Open",closeOpenItems(menu.querySelectorAll(".open"))}}),btnStop.addEventListener("click",()=>{clearTimeout(timerId)}),btnClose.addEventListener("click",()=>{if(menu.classList.contains("open")){let e=menu.querySelectorAll(".open");timerId=setTimeout(closeMenu,delay,e),"Hide"===btnOpen.innerHTML&&(btnOpen.innerHTML="Open")}}),menu.addEventListener("click",e=>{let{target:n}=e,t=n.querySelector(".submenu"),l=menu.querySelectorAll(".submenu.open");if("menu"===t.parentElement.classList.value)for(let e=0;e<l.length;e++)t!==l[e]&&l[e].classList.remove("open");t&&t.classList.toggle("open")});