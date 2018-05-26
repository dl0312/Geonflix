const app = document.getElementById("js-app");

app.innerHTML = `
<h1>To Do App</h1>
  <form class="js-form">
    <input type="text" placeholder="Write to do" />
    <input type="submit" value="Add to do"/>
  </form>
  <div class="js-uncompleted">
    <h2>Uncompleted</h2>
    <ul>
    </ul>
  </div>
  <div class="js-completed">
    <h2>Completed</h2>
    <ul>
    </ul>
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
  const label = document.createElement("label");
  label.innerHTML = text;
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  listItem.appendChild(input);
  listItem.appendChild(label);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  return listItem;
};

const handleFormSubmit = e => {
  e.preventDefault();
  const task = createListItem(input.value);
  uncompleteList.appendChild(task);
  input.value = "";
};

form.addEventListener("submit", handleFormSubmit);
