import handleLocalStorage from "../handleLocalStorage/handleLocalStorage.js";
import createTodo from "./createTodo.js";

export default (function render({saveToLocalStorage}) {
  const todoList = document.querySelector("#todo__list");

  function renderTodos(data) {
    todoList.innerHTML = "";
    data.todos.map((todo) => todoList.append(createTodo(data, todo, todoList, saveToLocalStorage)));
  }
  
  function renderFilteredTodos(data, todos) {
    todoList.innerHTML = "";
    todos.map((todo) => todoList.append(createTodo(data, todo, todoList, saveToLocalStorage)));
  }
  
  return {todoList, renderTodos, renderFilteredTodos}

})(handleLocalStorage);