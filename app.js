import handleLocalStorage from "./handleLocalStorage.js";
import currentState from "./data.js";
import getDate from "./getDate.js";
import render from "./renderTodos.js"

(function initalLoad(data, {getFromLocalStorage}, {renderTodos}) {
  getFromLocalStorage(data)
  renderTodos(data)
})(currentState, handleLocalStorage, render);

// ======================

(function SubmitTodo (data, {saveToLocalStorage}, {renderTodo}) {
  const todoForm = document.querySelector("#todo__form");
  
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = document.querySelector("#input__text");
    const inputDate = document.querySelector("#input__date");

    if (!inputText.value) return alert("Please add a task first!");
    
    addTodo(inputText.value, inputDate.value);
    
    inputText.value = "";
    inputDate.value = "";
  })
  
  function addTodo(inputTextValue, inputDateValue) {
    const todoObj = {
      id: data.nextId++,
      task: inputTextValue,
      isComplete: false,
      dateTime: getDate(inputDateValue.split("-")),
      message: "Incomplete"
    }
    data.todos.push(todoObj);
    
    saveToLocalStorage(data);
    renderTodo(data, todoObj)
  }

})(currentState, handleLocalStorage, render);