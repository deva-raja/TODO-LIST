// import { endOfToday } from "date-fns";
// const today = new Date();

let addTaskBtn = document.querySelector("#add-task-container");
let addTaskForm = document.querySelector("#add-form");
let display = document.querySelector("#todo-container");
let todos = [];

addTaskBtn.addEventListener("click", showAddForm);
addTaskForm.addEventListener("submit", getTodo);

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
  poppulateDisplay(todos, display);
  this.reset();
}

function domAddTodo(item) {
  const li = document.createElement("li");
  li.classList.add("todo");
  const div = document.createElement("div");
  div.classList.add("check");
  const para = document.createElement("p");
  para.textContent = `${item.text}`;
  li.appendChild(div);
  li.appendChild(para);
  return display.appendChild(li);
}

function poppulateDisplay(items, displayArea) {
  items.map((item) => {
    return domAddTodo(item);
  });
}
