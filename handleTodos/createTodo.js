import updateDaysLeftText from "../helpers/updateDaysLeftText.js";
import {handleCancelButton, handleDeleteButton, handleSaveButton, handleEditButton, handleCheckbox} from "../handleEventListeners/handleEventListeners.js";
import { allInputs } from "../data/data.js";

const {todoList} = allInputs;

export default function createTodo(todo) {
  // Id
  const id = todo.id;
  
  // li element
  const li = document.createElement("li");
  li.setAttribute("id", `id${id}`);

  // Task container
  const taskContainer = document.createElement("span");
  taskContainer.setAttribute("class", "task__container");
  taskContainer.innerHTML = `<span class="todo__message ${todo.isComplete ? "complete" : ""}">${todo.message}</span>`

  const todoEl = document.createElement("span");
  const todoContent = document.createElement("span");
  todoEl.setAttribute("class", "todo");
  todoContent.setAttribute("class", "todo__content");
  todoContent.innerHTML = `<input type="checkbox" class="checkbox active" ${todo.isComplete ? "checked" : ""}>`
  todoEl.textContent = todo.task
  
  todoContent.appendChild(todoEl)
  taskContainer.appendChild(todoContent)
  li.appendChild(taskContainer)

  const checkbox = taskContainer.querySelector(".checkbox");
  checkbox.addEventListener("click", () => handleCheckbox(id, taskContainer, dateContainer, editButton, todo))

  // Date container
  const dateContainer = document.createElement("span");
  dateContainer.setAttribute("class", "date__container");
  dateContainer.innerHTML = `
  <span class="due__date">
    ${todo.dateTime.fullDate ===  null ? "No Due Date" : "Due on " + todo.dateTime.fullDate}
  </span>
  <span class="${todo.dateTime.daysLeft < 0 ? "daysLeft overdue" : "daysLeft"}">
    ${updateDaysLeftText(todo.dateTime.daysLeft)}
  </span>`
  taskContainer.appendChild(dateContainer)

  // Button container
  const btnsContainer = document.createElement("span");
  btnsContainer.setAttribute("class", "button__container");
  li.appendChild(btnsContainer)
  
  // Create edit button
  const editButton = document.createElement("button");
  editButton.setAttribute("class", `edit ${!todo.isComplete ? "active" : ""}`);
  editButton.innerHTML = `<i class="fa fa-edit"></i>`;
  btnsContainer.appendChild(editButton)

  editButton.addEventListener("click", () => handleEditButton(id, checkbox, editButton, saveButton, cancelButton))
  
  // Create save button
  const saveButton = document.createElement("button");
  saveButton.setAttribute("class", "save");
  saveButton.innerHTML = `<i class="fa fa-save"></i>`;
  btnsContainer.appendChild(saveButton);
  
  saveButton.addEventListener("click", () => handleSaveButton(id, checkbox, saveButton, cancelButton, editButton))
  
  // Create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "cancel");
  cancelButton.innerHTML = `<i class="material-icons">&#xe5cd;</i>`;
  btnsContainer.appendChild(cancelButton);
  
  cancelButton.addEventListener("click", () => handleCancelButton(id, checkbox, saveButton, cancelButton, editButton))

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa fa-trash-o"></i>`;
  btnsContainer.appendChild(deleteButton)

  deleteButton.addEventListener("click", () => handleDeleteButton(id, li, todoList))

  return li
};
