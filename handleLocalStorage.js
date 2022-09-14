import { updateDaysLeft } from "./getDate.js";

export default (function handleLocalStorage () {
  function getFromLocalStorage(data) {
    let storageData = JSON.parse(localStorage.getItem("todos"));
    
    if (storageData) {
      console.log("first", data)
      updateDaysLeft(data);
      console.log("fourth")
      data.todos = storageData.todos;
      console.log("fifth")
      data.nextId = storageData.nextId;
    }
  }

  function saveToLocalStorage(data) {
    localStorage.setItem("todos", JSON.stringify(data));
  }

  return {getFromLocalStorage, saveToLocalStorage}
})();