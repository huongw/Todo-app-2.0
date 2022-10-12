import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import { data, allInputs } from "./data/data.js";
import getDate from "./helpers/getDate.js";
import renderTodos from "./handleTodos/renderTodos.js";
import validateDate from "./helpers/validateDate.js";
import saveAndReload from "./helpers/saveAndReload.js";

const { inputDate, inputText, filter, todoForm } = allInputs;
const {getFromLocalStorage, saveToLocalStorage} = handleLocalStorage;

initalLoad();

function initalLoad() {
  getFromLocalStorage(data)
  renderTodos(data.todos)
};

// ======================

window.addEventListener('DOMContentLoaded', () => {
  const windowReloaded = window.performance.getEntriesByType("navigation")[0].type;
  
  if (windowReloaded) {
    const dateArr = new Date().toLocaleDateString().split("/");

    inputDate.min = `${dateArr[2]}-${dateArr[0] < 10 ? "0" + dateArr[0] : dateArr[0]}-${dateArr[1] < 10 ? "0" + dateArr[1] : dateArr[1]}`;
    inputDate.value = "";
    inputText.value = "";
    filter.value = "all";
  }
});

// ======================

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!inputText.value.trim()) return alert("Add a task first!");

  const isValid = validateDate(inputDate.value)
  if (!isValid) return alert("Due date cannot be in the past!");
  
  addTodo(inputText.value, inputDate.value);
  saveAndReload(data, saveToLocalStorage)
  
  inputText.value = "";
  inputDate.value = "";
})
  
function addTodo(inputTextValue, inputDateValue) {
  const todoObj = {
    id: data.nextId++,
    task: inputTextValue.charAt(0).toUpperCase() + inputTextValue.slice(1),
    isComplete: false,
    message: "Incomplete",
    dateTime: getDate(inputDateValue.split("-"))
  }

  data.todos.push(todoObj)
};