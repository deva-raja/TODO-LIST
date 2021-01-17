// import { endOfToday } from "date-fns";
// const today = new Date();

const addTaskBtn = document.querySelector("#add-task-container");
const addTaskForm = document.querySelector("#add-form");
const parentContainer = document.querySelector("#todo-container");
const deleteAll = document.querySelector(".deleteAll");
const todos = JSON.parse(localStorage.getItem("items")) || [];

addTaskBtn.addEventListener("click", showAddForm);
addTaskForm.addEventListener("submit", getTodo);
deleteAll.addEventListener("click", delLocal);
parentContainer.addEventListener("click", delTodo);

function delTodo(e) {
  let el = e.target;
  if (!el.matches(".deleteSvg")) return;
  let index = el.dataset.index;
  todos.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(todos));
  poppulateDisplay(todos, parentContainer);
}

function delLocal(e) {
  todos.splice(0, todos.length);
  localStorage.setItem("items", JSON.stringify(todos));
  poppulateDisplay(todos, parentContainer);
}

function showAddForm(e) {
  console.log("hello");
}

function getTodo(e) {
  e.preventDefault();
  let text = this.querySelector("input").value;
  let todo = {
    text,
    done: false,
  };
  todos.push(todo);
  localStorage.setItem("items", JSON.stringify(todos));
  poppulateDisplay(todos, parentContainer);
  this.reset();
}

function domAddTodo(item, parentContainer, index) {
  const li = document.createElement("li");
  li.classList.add("todo");
  li.setAttribute("data-index", index);

  const div = document.createElement("div");
  div.classList.add("circle");

  const innerImg = document.createElement("IMG");
  innerImg.classList.add("checkSvg");
  innerImg.src = "/images/check.svg";
  div.appendChild(innerImg);

  const para = document.createElement("p");
  para.textContent = `${item.text}`;

  const deleteImg = document.createElement("IMG");
  deleteImg.classList.add("deleteSvg");
  deleteImg.src = "/images/delete.svg";

  li.appendChild(div);
  li.appendChild(para);
  li.appendChild(deleteImg);
  return parentContainer.appendChild(li);
}

function poppulateDisplay(items = [], displayArea) {
  displayArea.textContent = "";
  items.forEach((item, i) => {
    return domAddTodo(item, displayArea, i);
  });
}

poppulateDisplay(todos, parentContainer);
