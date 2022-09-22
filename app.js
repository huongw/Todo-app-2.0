import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import currentState from "./data/data.js";
import getDate from "./helpers/getDate.js";
import render from "./handleTodos/renderTodos.js";
import validateDate from "./helpers/validateDate.js";
import saveAndReload from "./helpers/saveAndReload.js";
import checkFilter from "./helpers/checkFilter.js";
import {allInputs} from "./data/data.js"

initalLoad();

function initalLoad() {
  const data = currentState;
  const {getFromLocalStorage} = handleLocalStorage;
  const {renderTodos} = render;

  getFromLocalStorage(data)
  renderTodos(data)
};

// ======================

{
  allInputs.filter.addEventListener("change", () => checkFilter(currentState));
}

// ======================

window.addEventListener('DOMContentLoaded', () => {
  const windowReloaded = window.performance.getEntriesByType("navigation")[0].type;
  const { inputDate, inputText, filter } = allInputs;
  
  if (windowReloaded) {
    const dateArr = new Date().toLocaleDateString().split("/");

    inputDate.min = `${dateArr[2]}-${dateArr[0] < 10 ? "0" + dateArr[0] : dateArr[0]}-${dateArr[1] < 10 ? "0" + dateArr[1] : dateArr[1]}`;
    inputDate.value = "";
    inputText.value = "";
    filter.value = "all";
  }
});

// ======================

(function SubmitTodo (data, {saveToLocalStorage}, {inputText, inputDate}) {
  const todoForm = document.querySelector("#todo__form");
  
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputText.value.trim()) return alert("Add a task first!");

    const isValid = validateDate(inputDate.value)
    if (!isValid) return alert("Due date cannot be in the past!");
    
    addTodo(inputText.value, inputDate.value);
    
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
    saveAndReload(data, saveToLocalStorage)
  }

})(currentState, handleLocalStorage, allInputs);