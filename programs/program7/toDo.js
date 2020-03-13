"use strict";

let toDo = document.querySelector("#toDo");
let toDoList = document.querySelector("#toDoList");
let btnForm = document.querySelector("#btnForm");
let formToDo = document.querySelector("#formToDo");
let btnUseFilter = document.querySelector("#useFilter");

let task = document.forms.formToDo.task;
let addToDo = document.forms.formToDo.addToDo;
let clearTasks = document.forms.formToDo.clearTasks;
let markTasks = document.forms.formToDo.markTasks;

showLocalStorage();

btnForm.addEventListener("click", () => {
  toDo.classList.toggle("open");

  let text = btnForm.innerText;
  let openText = "Open toDo";
  let closeText = "Close toDo";

  btnForm.innerText = text === openText ? closeText : openText;
});

document.body.addEventListener("keydown", ev => {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    console.log("Enter");

    createTask();
  }
});
addToDo.addEventListener("click", createTask);

clearTasks.addEventListener("click", clear);

markTasks.addEventListener("click", allDone);

toDoList.addEventListener("click", ev => workWithTasks(ev));

btnUseFilter.addEventListener("click", showFilteredTasks);

function showFilteredTasks() {
  let filter = document.querySelector("#filter").value;
  let task = document.querySelectorAll(".hide");

  let done = "showDone";
  let needToDo = "showNeedToDo";

  task.forEach(el => el.classList.remove("hide"));

  if (filter === done) {
    let list = document.querySelectorAll(".listStyle");

    list.forEach(el => {
      if (!el.classList.contains("done")) {
        el.classList.add("hide");
      }
    });
  } else if (filter === needToDo) {
    let needToDo = document.querySelectorAll(".done");

    needToDo.forEach(el => el.classList.add("hide"));
  }
}

function createTask() {
  console.dir(filter);
  let key = task.value;
  if (key === "") {
    console.log("Enter data");
  } else if (localStorage[key]) {
    console.log("Task already create");
  } else {
    addNewTask(key);
    task.value = "";
  }
  console.log(localStorage);
}

function addNewTask(task) {
  localStorage.setItem(task, "needToDo");

  let filter = document.querySelector("#filter").value;
  let li = document.createElement("li");
  li.innerText = task;

  addManagerButtons(li);

  if (filter === "showDone") li.classList.add("hide");

  toDoList.append(li);
}

function showLocalStorage() {
  console.log(localStorage);
  if (localStorage.length) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);

      // in localStorage can be data not from our toDo app, so we are check it
      if (localStorage[key] === "done" || localStorage[key] === "needToDo") {
        let li = document.createElement("li");
        li.innerText = key;

        addManagerButtons(li);

        if (localStorage[key] === "done") {
          li.classList.add("done");
        }

        toDoList.append(li);
      }
    }
  }
}

function clear() {
  console.log("clear");

  // in localStorage can be data not from our toDo app,
  // so we delete only data from toDo app
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let isToDo = localStorage[key];
    if (isToDo === "done" || isToDo === "needToDo") {
      console.log("Mi ydalyaem: " + key + "   " + localStorage[key]);
      localStorage.removeItem(key);
      i = -1;
    }
  }

  while (toDoList.firstChild) {
    toDoList.firstChild.remove();
  }

  console.log(localStorage);
}

function allDone() {
  console.log("allDone");
  let key;
  let isToDo;
  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    isToDo = localStorage[key];
    if (isToDo === "needToDo") {
      localStorage[key] = "done";
    }
  }
  let allLi = toDoList.querySelectorAll("li");

  allLi.forEach(item => item.classList.add("done"));

  console.log(localStorage);
}

function workWithTasks(ev) {
  let li = ev.path[2];
  let key = li.innerText;
  let select = ev.target;

  if (select.name === "delete") {
    localStorage.removeItem(key);
    li.remove();
  }

  if (select.localName === "li") {
    select.classList.toggle("done");
    key = ev.target.innerText;

    localStorage[key] = localStorage[key] === "done" ? "needToDo" : "done";
  }

  if (select.name === "done") {
    localStorage[key] = li.classList.contains("done") ? "needToDo" : "done";
    li.classList.toggle("done");
  }

  console.log(localStorage);
}

function addManagerButtons(li) {
  let doneImg = document.createElement("img");
  doneImg.setAttribute("src", "./src/done.png");
  doneImg.setAttribute("name", "done");

  let deleteImg = document.createElement("img");
  deleteImg.setAttribute("src", "./src/delete.png");
  deleteImg.setAttribute("name", "delete");

  let btnDel = document.createElement("button");
  btnDel.append(deleteImg);
  btnDel.classList.add("btn");
  btnDel.classList.add("btn-default");

  let btnEdit = document.createElement("button");
  btnEdit.append(doneImg);
  btnEdit.classList.add("btn");
  btnEdit.classList.add("btn-default");

  li.classList.add("listStyle");
  li.prepend(btnEdit);
  li.append(btnDel);
}
