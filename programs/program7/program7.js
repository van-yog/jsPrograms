"use strict";
let menu = document.querySelector(".menu");
let dataFromServer = document.querySelector("#dataFromServer");
let btnSend = document.querySelector("#sendRequest");
let btnFetch = document.querySelector("#sendFetch");
let btnReset = document.querySelector("#reset");
let btnForm = document.querySelector("#localStorage");
let btnSave = document.querySelector("#saveLocalStorage");
let formLocalStorage = document.querySelector("#formLocalStorage");

let urlUsers = "https://jsonplaceholder.typicode.com/users";
let urlPosts = "https://jsonplaceholder.typicode.com/posts";
let urlComments = "https://jsonplaceholder.typicode.com/comments";

btnFetch.addEventListener("click", () => {
  clearAll(dataFromServer);
  fetch(urlUsers)
    .then(response => response.json())
    .then(response => createUsers(response))
    .then(() => fetch(urlPosts))
    .then(response => response.json())
    .then(response => createPosts(response))
    .then(() => fetch(urlComments))
    .then(response => response.json())
    .then(response => createComments(response));
});

btnReset.addEventListener("click", () => {
  clearAll(dataFromServer);
});

btnSend.addEventListener("click", () => {
  clearAll(dataFromServer);
  xhr("GET", urlUsers).then(res => usersLoad(res));
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

btnForm.addEventListener("click", () => {
  formLocalStorage.classList.toggle("open");
});

btnSave.addEventListener("click", ev => {
  ev.preventDefault();
  let myForm = document.forms.formLocalStorage;
});

function xhr(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    console.log(xhr);
    xhr.onload = () => resolve(xhr);
    xhr.oneerror = reject;
  });
}

function usersLoad(xhrObj = {}) {
  console.log(xhrObj);

  if (xhrObj.status !== 200) {
    console.log(`Error ${xhrObj.status}: ${xhrObj.statusText}`);
  } else {
    console.log(`Done, load ${xhrObj.response.length} elements`);
    createUsers(xhrObj.response);

    xhr("GET", urlPosts)
      .then(res => postsLoad(res))
      .then(() => console.log("PROMISE ETO TEMA"));
  }
}

function postsLoad(xhrObj = {}) {
  if (xhrObj.status !== 200) {
    console.log(`Error ${xhrObj.status}: ${xhrObj.statusText}`);
  } else {
    console.log(`Done, load ${xhrObj.response.length} elements`);
    createPosts(xhrObj.response);

    xhr("GET", urlComments).then(res => commentsLoad(res));
  }
}

function commentsLoad(xhrObj = {}) {
  if (xhrObj.status !== 200) {
    console.log(`Error ${xhrObj.status}: ${xhrObj.statusText}`);
  } else {
    console.log(`Done, load ${xhrObj.response.length} elements`);
    createComments(xhrObj.response);
  }
}

function createUsers(response) {
  console.log(response);
  response.forEach(user => {
    let li = document.createElement("li");
    let ul = document.createElement("ul");
    ul.classList.add("submenu");
    li.classList.add("menu__item");
    li.setAttribute("data-id", user.id);
    li.innerText = user.name;
    li.append(ul);
    dataFromServer.append(li);
  });
}

function createPosts(response) {
  console.log(response);
  response.forEach(post => {
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

function createComments(response) {
  console.log(response);
  response.forEach(comment => {
    let post = document.querySelector(`[data-post-id="${comment.postId}"]`);
    let ul = post.querySelector("ul");
    let li = document.createElement("li");
    li.innerText = `${comment.name} / ${comment.body}`;
    ul.append(li);
  });
}

function clearAll(data) {
  while (data.firstChild) {
    data.firstChild.remove();
  }
}
