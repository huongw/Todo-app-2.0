export function handleEditStyleChanges(id, checkbox) {
  const todoItem = document.querySelector(`#id${id} .todo`);
  todoItem.contentEditable = true;
  todoItem.classList.add("editable");
  checkbox.style.display = "none";
  
  const saveBtn = document.querySelector(`#id${id} .save`);
  saveBtn.classList.add("active");

  const editBtn = document.querySelector(`#id${id} .edit`);
  editBtn.classList.remove("active");

  const cancelBtn = document.querySelector(`#id${id} .cancel`);
  cancelBtn.classList.add("active");
};

export function handleSaveCancelStyleChanges(id, todoItem, checkbox) {
  todoItem.contentEditable = false;
  checkbox.style.display = "block";

  todoItem.classList.remove("editable");

  const saveBtn = document.querySelector(`#id${id} .save`);
  saveBtn.classList.remove("active");

  const editBtn = document.querySelector(`#id${id} .edit`);
  editBtn.classList.add("active");

  const cancelBtn = document.querySelector(`#id${id} .cancel`);
  cancelBtn.classList.remove("active");
}