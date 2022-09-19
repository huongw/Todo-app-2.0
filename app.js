import handleLocalStorage from "./handleLocalStorage/handleLocalStorage.js";
import currentState from "./data/data.js";
import getDate from "./helpers/getDate.js";
import render from "./handleTodos/renderTodos.js";
import clearAndFilterTodoList from "./helpers/clearAndFilterTodoList.js"

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

    data.todos.push(todoObj)

    // filter null dates and dates that exist (1)
    const nullDates = data.todos.filter(todo  => !todo.dateTime.fullDate);
    const allDates = data.todos.filter(todo => todo.dateTime.fullDate).sort((a, b) => { 
      if (a.dateTime.daysLeft < b.dateTime.daysLeft) return -1 
      if (a.dateTime.daysLeft > b.dateTime.daysLeft) return 1
      return 0
    });

    // then concat the null dates to the end of the data.todos array (2)
    const newData = allDates.concat(nullDates);

    data.todos = newData; // new array is inserted

    saveToLocalStorage(data);
    renderTodos(data);
  }

})(currentState, handleLocalStorage, render, allInputs);