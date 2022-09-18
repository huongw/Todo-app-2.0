import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import currentState from "./data/data.js";
import getDate from "./helpers/getDate.js";
import render from "./handleTodos/renderTodos.js"

const allInputs = (function () {
  const inputDate = document.querySelector("#input__date");
  const inputText = document.querySelector("#input__text");
  const filter = document.querySelector(".select__container");

  return {inputDate, inputText, filter};
})();

window.addEventListener('DOMContentLoaded', () => {
  const windowReloaded = window.performance.getEntriesByType("navigation")[0].type;
  
  if (windowReloaded) {
    const { inputDate, inputText, filter } = allInputs;

    inputDate.value = "";
    inputText.value = "";
    filter.value = "all";
  }
});

// ======================

(function initalLoad(data, {getFromLocalStorage}, {renderTodos}) {
  getFromLocalStorage(data)
  renderTodos(data)
})(currentState, handleLocalStorage, render);

// ======================

(function filterTodos(data, {filter}) {
  filter.addEventListener("change", () => {

    data.todos.map(todo => {
      const todoItem = document.getElementById(`id${todo.id}`);

      if (filter.value === "complete") {
           if (todo.isComplete) {
            todoItem.style.display = "flex";
          } else {
            todoItem.style.display = "none";
          }
        } else if (filter.value === "incomplete") {
          if (!todo.isComplete) {
            todoItem.style.display = "flex";
          } else {
            todoItem.style.display = "none";
          }
        } else {
            todoItem.style.display = "flex";
        }
    })
  })
})(currentState, allInputs);

// ======================

(function SubmitTodo (data, {saveToLocalStorage}, {renderTodo}, {inputText, inputDate}) {
  const todoForm = document.querySelector("#todo__form");
  
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputText.value) return alert("Please add a task first!");
    
    addTodo(inputText.value, inputDate.value);
    
    inputText.value = "";
    inputDate.value = "";
  })
  
  function addTodo(inputTextValue, inputDateValue) {
    const todoObj = {
      id: data.nextId++,
      task: inputTextValue.charAt(0).toUpperCase() + inputTextValue.slice(1),
      isComplete: false,
      dateTime: getDate(inputDateValue.split("-")),
      message: "Incomplete"
    }
    data.todos.push(todoObj);
    
    saveToLocalStorage(data);
    renderTodo(data, todoObj)
  }

})(currentState, handleLocalStorage, render, allInputs);