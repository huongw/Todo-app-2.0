import handleLocalStorage from "./handleLocalStorage.js";
import createTodo from "./createTodo.js";

export default (function render({saveToLocalStorage}) {
  const todoList = document.querySelector("#todo__list");

  function renderTodos(data) {
    data.todos.map((todo) => todoList.append(createTodo(data, todo, todoList, saveToLocalStorage)));
  }
  
  function renderTodo(data, todo) {
    todoList.append(createTodo(data, todo, todoList, saveToLocalStorage))
  }

  return {todoList, renderTodos, renderTodo}

})(handleLocalStorage);