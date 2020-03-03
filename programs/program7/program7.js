"use strict";
let menu = document.querySelector(".menu");
let XMLHttp = document.querySelector("#XMLHttpRequest");
let btnSend = document.querySelector("#sendRequest");
let btnReset = document.querySelector("#reset");

btnReset.addEventListener("click", () => {
  while (XMLHttp.firstChild) {
    XMLHttp.firstChild.remove();
  }
});

btnSend.addEventListener("click", () => {
  xhr("GET", "https://jsonplaceholder.typicode.com/users", usersLoad);

  xhr("GET", "https://jsonplaceholder.typicode.com/posts", postsLoad);

  setTimeout(
    xhr("GET", "https://jsonplaceholder.typicode.com/comments", commentsLoad),
    1000
  );
});

menu.addEventListener("click", event => {
  let { target } = event;
  let submenu = target.querySelector(".submenu");
  let closeAll = menu.querySelectorAll(".submenu.open");
  let className = submenu.parentElement.classList.value;

  // Check first item of menu, click on this item must close all submenu
  if (className === "menu__item") {
    for (let i = 0; i < closeAll.length; i++) {
      if (submenu === closeAll[i]) {
        continue;
      }
      closeAll[i].classList.remove("open");
    }
  }

  // If you click on submenu than open or close it ( use toggle )
  if (submenu) {
    submenu.classList.toggle("open");
  }
});

function xhr(method, url, onload, body = null) {
  let xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.send();

  xhr.responseType = "json";

  xhr.onload = onload;

  xhr.onprogress = function(event) {
    if (event.lenghtComputable) {
      console.log(`Loaded ${event.loaded} from ${event.total} byte`);
    } else {
      console.log(`Loaded ${event.loaded} byte`);
    }
  };

  xhr.onerror = () => {
    console.log("Error");
  };
}

function usersLoad() {
  if (this.status != 200) {
    console.log(`Error ${this.status}: ${this.statusText}`);
  } else {
    console.log(`Done, load ${this.response.length} elements`);
    this.response.forEach(element => {
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      ul.classList.add("submenu");
      li.setAttribute("data-id", element.id);
      li.innerText = `${element.name} `;
      li.classList.add("menu__item");
      li.append(ul);
      XMLHttp.append(li);
    });
  }
}

function postsLoad() {
  if (this.status != 200) {
    console.log(`Error ${this.status}: ${this.statusText}`);
  } else {
    console.log(`Done, load ${this.response.length} elements`);
    this.response.forEach(post => {
      let user = document.querySelector(`[data-id="${post.userId}"]`);
      let ul = user.querySelector("ul");
      let li = document.createElement("li");
      li.setAttribute("data-post-id", post.id);
      li.innerText = post.title;
      ul.append(li);
      let ulPost = document.createElement("ul");
      ulPost.classList.add("submenu");
      li.append(ulPost);
    });
  }
}

function commentsLoad() {
  if (this.status != 200) {
    console.log(`Error ${this.status}: ${this.statusText}`);
  } else {
    console.log(`Done, load ${this.response.length} elements`);
    this.response.forEach(comment => {
      let post = document.querySelector(`[data-post-id="${comment.postId}"]`);
      let ul = post.querySelector("ul");
      let li = document.createElement("li");
      li.innerHTML = `<small><b>${comment.name}</b> / ${comment.body} </small>`;
      ul.append(li);
    });
  }
}
