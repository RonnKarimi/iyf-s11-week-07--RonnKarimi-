const STORAGE_KEY = "todos";

// Load todos
function loadTodos() {
    return getFromStorage(STORAGE_KEY, []);
}

// Save todos
function saveTodos(todos) {
    saveToStorage(STORAGE_KEY, todos);
}

// Add Todo
function addTodo(text) {
    if (text.trim() === "") return;

    const todos = loadTodos();

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();
}

// Toggle Todo
function toggleTodo(id) {
    const todos = loadTodos();

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
    }

    saveTodos(todos);
    renderTodos();
}

// Delete Todo
function deleteTodo(id) {
    const todos = loadTodos().filter(todo => todo.id !== id);

    saveTodos(todos);
    renderTodos();
}

// Render Todos
function renderTodos() {
    const todoList = document.getElementById("todo-list");

    todoList.innerHTML = "";

    const todos = loadTodos();

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>

            <button onclick="toggleTodo(${todo.id})">
                ${todo.completed ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}

// Add Button
document.getElementById("add-btn").addEventListener("click", () => {

    const input = document.getElementById("todo-input");

    addTodo(input.value);

    input.value = "";
});

// Load when page opens
document.addEventListener("DOMContentLoaded", renderTodos);
