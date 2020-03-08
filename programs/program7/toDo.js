"use strict";

let toDo = document.querySelector("#toDo");
let toDoList = document.querySelector("#toDoList");
let btnForm = document.querySelector("#btnForm");
let formToDo = document.querySelector("#formToDo");

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

function createTask() {
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

  let li = document.createElement("li");
  li.innerText = task;

  addManagerButtons(li);

  toDoList.append(li);
}

function showLocalStorage() {
  console.log(localStorage);
  if (localStorage.length) {
    for (let i = 0; i < localStorage.length; i++) {
      let li = document.createElement("li");
      let key = localStorage.key(i);
      li.innerText = key;

      addManagerButtons(li);

      if (localStorage[key] == "done") {
        li.classList.add("done");
      }

      toDoList.append(li);
    }
  }
}

function clear() {
  console.log("clear");

  localStorage.clear();

  while (toDoList.firstChild) {
    toDoList.firstChild.remove();
  }

  console.log(localStorage);
}

function allDone() {
  console.log("allDone");
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    localStorage[key] = "done";
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
  doneImg.setAttribute("src", "./done.png");
  doneImg.setAttribute("name", "done");

  let deleteImg = document.createElement("img");
  deleteImg.setAttribute("src", "./delete.png");
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
