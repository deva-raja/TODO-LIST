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
parentContainer.addEventListener("click", allTodo);

// Event Delegation
function allTodo(e) {
  let el = e.target;
  if (el.matches(".finished")) return;
  if (el.matches(".checkSvg")) return crossTodo(e);
  if (el.matches(".deleteSvg")) return delTodo(e);
  return;
}

function delTodo(e) {
  let el = e.target;
  let index = el.dataset.index;
  todos.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(todos));
  poppulateDisplay(todos, parentContainer);
}

function crossTodo(e) {
  let el = e.target;
  let index = el.parentNode.parentNode.dataset.index;
  let value = todos[index];
  value.done = true;
  todos.splice(index, 1);
  todos.push(value);
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

function domAddTodo(item, parentContainer, index, done) {
  const li = document.createElement("li");
  li.classList.add("todo");
  li.classList.add(`${done ? "done" : "not-done"}`);
  li.setAttribute("data-index", index);

  const div = document.createElement("div");
  div.classList.add("circle");

  const innerImg = document.createElement("IMG");
  innerImg.classList.add("checkSvg");
  innerImg.src = "/images/check.svg";
  innerImg.classList.add(`${done ? "finished" : "not-done"}`);
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
  let newItems = items.filter((item) => item.done === false);
  let oldItems = items.filter((item) => item.done === true);
  let sortedArray = newItems.concat(oldItems);
  sortedArray.forEach((item, i) => {
    return domAddTodo(item, displayArea, i, item.done);
  });
}

poppulateDisplay(todos, parentContainer);
