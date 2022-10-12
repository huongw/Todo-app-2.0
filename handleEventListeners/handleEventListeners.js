import completeTask from "../helpers/completeTask.js";
import updateDaysLeftText from "../helpers/updateDaysLeftText.js";
import handleLocalStorage from "../handleLocalStorage/handleLocalStorage.js";
import filterTodos from "../helpers/filterTodos.js";
import { data, allInputs } from "../data/data.js";

const { saveToLocalStorage } = handleLocalStorage;

const {filter} = allInputs;
filter.addEventListener("change", () => filterTodos(data));

export function handleCheckbox(id, taskContainer, dateContainer, editButton, todo) {
  const message = taskContainer.querySelector(".todo__message");
  completeTask(data, id, saveToLocalStorage, editButton, message);
  message.innerText = todo.message;

  const daysLeft = dateContainer.querySelector(".daysLeft");
  daysLeft.innerText = updateDaysLeftText(todo.dateTime.daysLeft);
}

export function handleSaveButton(id, checkbox, saveButton, cancelButton, editButton) {
  const todoItem = document.querySelector(`#id${id} .todo`);
  if (!todoItem.textContent.trim()) return alert("Input field cannot be empty!");

  handleSaveCancelChanges(id, saveChanges, checkbox, saveButton, cancelButton, editButton);
  saveToLocalStorage(data)
}

export function handleCancelButton(id, checkbox, saveButton, cancelButton, editButton) {
  handleSaveCancelChanges(id, cancelChanges, checkbox, saveButton, cancelButton, editButton);
}

export function handleDeleteButton(id, li, todoList) {
  data.todos = data.todos.filter((todo) => todo.id !== id);
  todoList.removeChild(li)
  saveToLocalStorage(data);
}

export function handleEditButton(id, checkbox, editButton, saveButton, cancelButton) {
  const todoItem = document.querySelector(`#id${id} .todo`);
  todoItem.contentEditable = true;
  todoItem.classList.add("editable");

  checkbox.classList.remove("active");

  saveButton.classList.add("active");
  cancelButton.classList.add("active");
  editButton.classList.remove("active");
}

function handleSaveCancelChanges(id, updateSaveCancelChanges, checkbox, saveButton, cancelButton, editButton) {
  const todoItem = document.querySelector(`#id${id} .todo`);
  todoItem.contentEditable = false;
  todoItem.classList.remove("editable");

  checkbox.classList.add("active");

  saveButton.classList.remove("active");
  cancelButton.classList.remove("active");
  editButton.classList.add("active");

  updateSaveCancelChanges(id, todoItem);
}

function saveChanges(id, todoItem) {
  data.todos.map((todo) => {
    if (todo.id === id) {
      todo.task = todoItem.innerHTML;
    }
  });

}

function cancelChanges(id, todoItem) {
  data.todos.map((todo) => {
    if (todo.id === id) {
      todoItem.innerHTML = todo.task;
    }
  });
}
