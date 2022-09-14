import {calculateDaysLeft} from "./calculateDate.js";

export default (function handleLocalStorage () {
  function getFromLocalStorage(data) {
    let storageData = JSON.parse(localStorage.getItem("todos"));
    
    if (storageData) {
      data.todos = storageData.todos;
      data.nextId = storageData.nextId;
      updateDaysLeft(data.todos);
    }
  }

  function saveToLocalStorage(data) {
    localStorage.setItem("todos", JSON.stringify(data));
  }

  function updateDaysLeft(todos) {
    todos.map((todo) => {
      todo.dateTime.daysLeft = calculateDaysLeft(todo.dateTime.fullDate, todo.dateTime.daysLeft);
    })
  }

  return {getFromLocalStorage, saveToLocalStorage}
})();