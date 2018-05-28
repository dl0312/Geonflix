const app = document.getElementById("js-app");

app.innerHTML = `
<div class="js-grid">
  <h1 class="js-title">To Do App</h1>
  <div class="js-uncompleted">
    <h2 class="js-subtitle">Uncompleted</h2>
    <ul>
    </ul>
  </div>
  <div class="js-completed">
    <h2 class="js-subtitle">Completed</h2>
    <ul>
    </ul>
  </div>
  <form class="js-form">
    <input class="js-text" type="text" placeholder="Write to do" />
  </form>
  </div>
`;
const form = document.querySelector(".js-form"),
  input = form.querySelector("input[type='text']"),
  uncompleteList = document.querySelector(".js-uncompleted ul"),
  completeList = document.querySelector(".js-completed ul");

const createListItem = text => {
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  input.type = "checkbox";
  const label = document.createElement("span");
  label.innerHTML = text;
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.classList.add("js-edit");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.classList.add("js-delete");
  listItem.appendChild(input);
  listItem.appendChild(label);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  return listItem;
};

const completeToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
  listItem.classList.add("completed");
  completeList.prepend(listItem);
  addEvents(listItem, uncompleteToDo);
};

const uncompleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  listItem.classList.remove("completed");
  parentList.removeChild(listItem);
  uncompleteList.prepend(listItem);
  addEvents(listItem, completeToDo);
};

const deleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
};

const handleEditBtn = event => {
  event.preventDefault();
  const label = document.createElement("span");
  if (input.value === "") {
    return;
  } else {
    label.textContent = input.value;
  }
};

const editToDo = event => {
  const listItem = event.target.parentElement;
  const label = listItem.querySelector("span");
  const labelText = label.textContent;
  const form = document.createElement("form");
  form.classList.add("edit-form");
  const input = document.createElement("input");
  input.classList.add("edit-input");
  input.type = "text";
  input.value = labelText;
  form.append(input);
  console.log(listItem.children[1]);
  listItem.replaceChild(form, listItem.children[1]);
  form.addEventListener("submit", handleEditBtn);
  listItem.replaceChild(label, listItem.childNodes[1]);
};

const handleKeyPress = event => {
  const key = event.key;
  if (key === "Enter") {
    event.preventDefault();
    if (input.value === "") {
      alert("Cant input empty value");
      return;
    }
    const task = createListItem(input.value);
    uncompleteList.prepend(task);
    addEvents(task, completeToDo);
    input.value = "";
  }
};

input.onkeypress = handleKeyPress;

const addEvents = (listItem, checkboxFn) => {
  const editBtn = listItem.querySelector("button.js-edit");
  const deleteBtn = listItem.querySelector("button.js-delete");
  const checkBox = listItem.querySelector("input[type='checkbox']");
  editBtn.onclick = editToDo;
  deleteBtn.onclick = deleteToDo;
  checkBox.onclick = checkboxFn;
};
