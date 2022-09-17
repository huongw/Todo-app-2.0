export function handleEditStyleChanges(id, todoItem, checkbox) {
  todoItem.contentEditable = true;
  todoItem.classList.add("editable");
  checkbox.classList.remove("active");
  
  const saveBtn = document.querySelector(`#id${id} .save`);
  saveBtn.classList.add("active");

  const editBtn = document.querySelector(`#id${id} .edit`);
  editBtn.classList.remove("active");

  const cancelBtn = document.querySelector(`#id${id} .cancel`);
  cancelBtn.classList.add("active");
};

export function handleSaveCancelStyleChanges(id, todoItem, checkbox) {
  todoItem.contentEditable = false;
  todoItem.classList.remove("editable");
  checkbox.classList.add("active");

  const saveBtn = document.querySelector(`#id${id} .save`);
  saveBtn.classList.remove("active");

  const editBtn = document.querySelector(`#id${id} .edit`);
  editBtn.classList.add("active");

  const cancelBtn = document.querySelector(`#id${id} .cancel`);
  cancelBtn.classList.remove("active");
}