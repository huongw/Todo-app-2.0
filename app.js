import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import currentState from "./data/data.js";
import getDate from "./helpers/getDate.js";
import render from "./handleTodos/renderTodos.js";
import clearAndFilterTodoList from "./helpers/clearAndFilterTodoList.js"
import concatNullDatesToEnd from "./helpers/concatNullDatesToEnd.js";
import validateDate from "./helpers/validateDate.js";

const allInputs = (function () {
  const inputDate = document.querySelector("#input__date");
  const inputText = document.querySelector("#input__text");
  const filter = document.querySelector(".select__container");

  return {inputDate, inputText, filter};
})();

window.addEventListener('DOMContentLoaded', () => {
  const windowReloaded = window.performance.getEntriesByType("navigation")[0].type;
  const { inputDate, inputText, filter } = allInputs;
  
  if (windowReloaded) {
    // const dateArr = new Date().toLocaleDateString().split("/");

    // inputDate.min = `${dateArr[2]}-${dateArr[0] < 10 ? "0" + dateArr[0] : dateArr[0]}-${dateArr[1] < 10 ? "0" + dateArr[1] : dateArr[1]}`;
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

(function filterTodos(data, {filter}, {todoList, renderTodos}) {

  filter.addEventListener("change", () => {
    if (filter.value === "complete") {
      if (data.todos.every((todo) => !todo.isComplete)) {
        todoList.innerHTML = "";
        return;
      }
      const filterCompleteTasks = data.todos.filter(todo => todo.isComplete);
      clearAndFilterTodoList(todoList, data, filterCompleteTasks);

    } else if (filter.value === "incomplete") {
      if (data.todos.every((todo) => todo.isComplete)) {
        todoList.innerHTML = ""
        return;
      }
      const filterIncompleteTasks = data.todos.filter(todo => !todo.isComplete)
      return clearAndFilterTodoList(todoList, data, filterIncompleteTasks);

    } else if (filter.value === "all") {
      todoList.innerHTML = "";
      renderTodos(data);
    }
  })
})(currentState, allInputs, render);

// ======================

(function SubmitTodo (data, {saveToLocalStorage}, {renderTodos}, {inputText, inputDate}) {
  const todoForm = document.querySelector("#todo__form");
  
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputText.value.trim()) return alert("Add a task first!");

    const isValid = validateDate(inputDate.value)
    if (!isValid) return alert("Date cannot be in the past!");
    
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

    data.todos = concatNullDatesToEnd(data.todos, todoObj);

    saveToLocalStorage(data);
    renderTodos(data);
  }

})(currentState, handleLocalStorage, render, allInputs);