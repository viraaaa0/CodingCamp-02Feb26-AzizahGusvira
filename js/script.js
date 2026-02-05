const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterInput = document.getElementById("filterInput");
const statusFilter = document.getElementById("statusFilter");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

function renderTodo() {
    todoList.innerHTML = "";

    let filtered = todos.filter(todo =>
        todo.task.toLowerCase().includes(filterInput.value.toLowerCase())
    );

    if (statusFilter.value !== "all") {
        filtered = filtered.filter(todo => todo.status === statusFilter.value);
    }

    if (filtered.length === 0) {
        todoList.innerHTML = `<li class="empty">nothing here yet 🌱</li>`;
        return;
    }

    filtered.forEach((todo, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${todo.status === "done" ? "checked" : ""} 
                    onclick="toggleStatus(${index})">
                <div class="task-info">
                    <strong>${todo.task}</strong>
                    <span>📅 ${todo.date}</span>
                    <div class="badge ${todo.status}">
                        ${todo.status.toUpperCase()}
                    </div>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${index})">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert("fill task & date first ✨");
        return;
    }

    todos.push({ task, date, status: "pending" });
    taskInput.value = "";
    dateInput.value = "";

    renderTodo();
});

function toggleStatus(index) {
    todos[index].status =
        todos[index].status === "pending" ? "done" : "pending";
    renderTodo();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodo();
}

deleteAllBtn.addEventListener("click", () => {
    todos = [];
    renderTodo();
});

filterInput.addEventListener("input", renderTodo);
statusFilter.addEventListener("change", renderTodo);

renderTodo();
