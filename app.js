import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import currentState from "./data/data.js";
import getDate from "./helpers/getDate.js";
import render from "./handleTodos/renderTodos.js";
import clearAndFilterTodoList from "./helpers/clearAndFilterTodoList.js"
import sortDueDates from "./helpers/sortDueDates.js";
import validateDate from "./helpers/validateDate.js";

const allInputs = {
  inputDate: document.querySelector("#input__date"),
  inputText: document.querySelector("#input__text"),
  filter: document.querySelector(".select__container")
};

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

    data.todos = sortDueDates(data.todos);

    saveToLocalStorage(data);
    renderTodos(data);
  }

})(currentState, handleLocalStorage, render, allInputs);