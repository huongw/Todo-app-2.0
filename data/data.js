export default (function currentState () {
  const data = {
    todos: [],
    nextId: 1
  }
  
  return data
})();

export const allInputs = {
  inputDate: document.querySelector("#input__date"),
  inputText: document.querySelector("#input__text"),
  filter: document.querySelector(".select__container")
};