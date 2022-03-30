// Selectors

const userInput = document.querySelector("#user-input");
const submitBtn = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
// const filterOption = document.querySelector(".filter-choice");
// Event Listners

submitBtn.addEventListener("click", submitBtnHandler);
todoList.addEventListener("click", completeDeleteHandler);

// Functions

function submitBtnHandler(event) {
  event.preventDefault();

  if (userInput.value == "") {
    alert("Please Enter the Task !!");
    return;
  }

  //Creating Whole element
  const toDo = CreateNewTask();

  // Adding Whole Task with buttons to our toDoList Element
  todoList.append(toDo);

  // Adding whole Task to Local Storage
  addToLocalStorage(userInput.value);

  // to clear input tab
  userInput.value = null;
}

function CreateNewTask() {
  // Creating a New Task
  const toDo = document.createElement("div");
  toDo.className = "to-do";
  // Adding task details
  const newTask = document.createElement("li");
  newTask.className = "new-task complete";
  newTask.textContent = userInput.value;
  toDo.append(newTask);

  // Adding complete button for that specific task
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = "Complete";
  checkBtn.className = "complete-btn";
  toDo.append(checkBtn);

  // Adding delete button for that specific task
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "delete-btn";
  toDo.append(deleteBtn);

  return toDo;
}
function completeDeleteHandler(ev) {
  const classItem = ev.target;

  if (classItem.className == "delete-btn") {
    const wholeTask = classItem.parentElement;
    wholeTask.remove();
  }

  if (classItem.className == "complete-btn") {
    const items = todoList;
    const item = classItem.parentElement;
    const toMove = classItem.parentElement;
    item.classList.toggle("completed");
    item.remove();
    items.append(toMove);
  }
}

function addToLocalStorage(todo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.push(todo);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

localStorage.clear();
