// додатково зробила лічильник, фільтри і очистити виконане.
const input = document.getElementById("input"),
  addBtn = document.getElementById("addBtn"),
  list = document.getElementById("list"),
  counter = document.getElementById("counter"),
  error = document.getElementById("error"),
  clearBtn = document.getElementById("clearBtn"),
  filters = document.querySelectorAll(".filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [],
  currentFilter = "all";

const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateCounter = () => {
  const total = todos.length;
  const active = todos.filter((t) => !t.done).length;
  counter.textContent = "Total: " + total + " | Active: " + active;
};

const render = () => {
  list.innerHTML = "";
  let visible = todos;
  if (currentFilter === "active") visible = todos.filter((t) => !t.done);
  if (currentFilter === "done") visible = todos.filter((t) => t.done);

  visible.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;

    span.onclick = () => {
      todo.done = !todo.done;
      save();
      render();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      save();
      render();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCounter();
};

const addTodo = () => {
  const text = input.value.trim();

  if (text === "") {
    error.textContent = "You should enter a task!";
    input.classList.add("error-input");
    return;
  }

  error.textContent = "";
  input.classList.remove("error-input");

  todos.push({ text: text, done: false });
  input.value = "";
  save();
  render();
};

addBtn.onclick = addTodo;

input.onkeydown = (e) => {
  if (e.key === "Enter") addTodo();
};

input.oninput = () => {
  error.textContent = "";
  input.classList.remove("error-input");
};

filters.forEach((btn) => {
  btn.onclick = () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  };
});

clearBtn.onclick = () => {
  todos = todos.filter((t) => !t.done);
  save();
  render();
};

render();
