const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

function saveState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("appState");

    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

function render() {
    console.log(state);
}

function setState(updates) {
    Object.assign(state, updates);

    saveState();

    render();
}

function setFilter(filter) {
    setState({
        filter: filter
    });
}

function addStateTodo(text) {

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    setState({
        todos: [...state.todos, newTodo]
    });

}

function toggleStateTodo(id) {

    setState({
        todos: state.todos.map(todo =>

            todo.id === id
                ? {
                    ...todo,
                    completed: !todo.completed
                }
                : todo

        )
    });

}

loadState();
render();
