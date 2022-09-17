import { handleEditStyleChanges, handleSaveCancelStyleChanges } from "./handleButtonStyles.js";
import completeTask from "./completeTask.js";

export default function createTodo(data, todo, todoList, saveToLocalStorage) {
  // Id
  const id = todo.id;
  
  // li element
  const li = document.createElement("li");
  li.setAttribute("id", `id${id}`);

  // Task container
  const taskContainer = document.createElement("span");
  taskContainer.setAttribute("class", "task__container");
  taskContainer.innerHTML = `
  <span class="todo__message" id="message${todo.id}">${todo.message}</span>
  <span class="todo__content">
    <input type="checkbox" class="checkbox active" ${todo.isComplete ? "checked" : ""}>
    <span class="todo">${todo.task}</span>
  </span>
  `
  li.appendChild(taskContainer)

  const checkbox = taskContainer.querySelector(".checkbox");
  checkbox.addEventListener("click", () => {
    completeTask(data, id, saveToLocalStorage);
    const todoMessage = taskContainer.querySelector(".todo__message");
    todoMessage.innerText = todo.message;

    const daysLeft = dateContainer.querySelector(".daysLeft");
    daysLeft.innerText = renderDaysLeft(todo.dateTime.daysLeft);
  })

  // Date container
  const dateContainer = document.createElement("span");
  dateContainer.setAttribute("class", "date__container");
  dateContainer.innerHTML = `
  <span class="due__date">
    ${todo.dateTime.fullDate ===  null ? "No Due Date" : "Due on " + todo.dateTime.fullDate}
  </span>
  <span class="daysLeft">
    ${renderDaysLeft(todo.dateTime.daysLeft)}
  </span>`
  taskContainer.appendChild(dateContainer)

  // Button container
  const btnsContainer = document.createElement("span");
  btnsContainer.setAttribute("class", "button__container");
  li.appendChild(btnsContainer)
  
  // Create edit button
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit active");
  editButton.innerText = "Edit";
  btnsContainer.appendChild(editButton)

  editButton.addEventListener("click", () => {
    const todoItem = document.querySelector(`#id${id} .todo`);
    handleEditStyleChanges(id, todoItem, checkbox)
  })
  
  // Create save button
  const saveButton = document.createElement("button");
  saveButton.setAttribute("class", "save");
  saveButton.innerText = "Save";
  btnsContainer.appendChild(saveButton)
  
  saveButton.addEventListener("click", () => {
    handleSaveCancelChanges(data, id, saveChanges, checkbox)
    saveToLocalStorage(data)
  })
  
  // Create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "cancel");
  cancelButton.innerText = "Cancel";
  btnsContainer.appendChild(cancelButton)
  
  cancelButton.addEventListener("click", () => {
    handleSaveCancelChanges(data, id, cancelChanges, checkbox)
  })

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  btnsContainer.appendChild(deleteButton)

  deleteButton.addEventListener("click", () => {
    data.todos = data.todos.filter((todo) => todo.id !== id);
    todoList.removeChild(li)
    saveToLocalStorage(data);
  })

  return li
};

function handleSaveCancelChanges(data, id, callback, checkbox) {
  const todoItem = document.querySelector(`#id${id} .todo`);
  handleSaveCancelStyleChanges(id, todoItem, checkbox);

  callback(data, id, todoItem);
}

function saveChanges(data, id, todoItem) {
  data.todos.map((todo) => {
    if (todo.id === id) {
      todo.task = todoItem.innerHTML;
    }
  });

}

function cancelChanges(data, id, todoItem) {
  data.todos.map((todo) => {
    if (todo.id === id) {
      todoItem.innerHTML = todo.task;
    }
  });
}

function renderDaysLeft(daysLeft) {
  if (daysLeft < 0) {
    return "(Overdue)"
  } 
  if (daysLeft === null) {
    return ""
  }
  if (daysLeft > 1) {
    return "(" + daysLeft + " day(s) left)"
  } 
  if (daysLeft === 0) {
    return "(Due Today)"
  }
  if (daysLeft === 1) {
    return "(Due Tomorrow)"
  }
}